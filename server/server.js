const express = require("express");
const cors = require("cors");
const { createServer } = require('node:http');
const http = require("http");
// const Server = require("socket.io").Server;
const { Server } = require('socket.io');
const { makeid } = require('./utils');

const app = express();

// Use CORS middleware to enable cross-origin requests
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

const server = createServer(app);
// const io = new Server(server);



// Create an HTTP server using the Express app
// const server = http.createServer(app);

// Initialize a new instance of Socket.IO by passing the HTTP server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Allow requests from this origin and my frontend port = 5173
        methods: ["GET", "POST"], // Allow these HTTP methods
    },
});

let gameState = {};
let pinsState = {};
let codeState = {};
let allRooms = {};


io.on("connection", (socket) => {
    console.log("A user connected", socket.id[0] + socket.id[1]);
    
    const handleNewGame = (code, game, pins) => {
        const roomId = makeid(5);
        allRooms[socket.id] = roomId;
        socket.emit("roomId", roomId);

        socket.join(roomId);
        codeState[roomId] = code;
        gameState[roomId] = game;
        pinsState[roomId] = pins;
        console.log(socket.id);
        console.log(roomId);
        console.log(io.sockets.adapter.rooms);

        console.log("handle new game", roomId, code);
    }

    socket.on("newGame", handleNewGame);

    socket.on("joinRoom", roomId => {
        console.log("join room ", roomId);
        const room = io.sockets.adapter.rooms.get(roomId);
        if (room){
            socket.join(roomId);
            allRooms[socket.id] = roomId;
            socket.emit("joinRoom", true);
            socket.emit("roomId", roomId);

            console.log("code", codeState[roomId]);
            console.log("game", gameState[roomId]);
            // socket.emit("initGame", roomId);
            io.to(roomId).emit("game", gameState[roomId]);
            io.to(roomId).emit("code", codeState[roomId]);
            io.to(roomId).emit("pins", pinsState[roomId]);




        } else {
            socket.emit("joinRoom", false)
        }
    })

   socket.on("game", (roomId, game) => {
    console.log(roomId);
    console.log(game);
    console.log(socket.id[0] + socket.id[1]);
    console.log(io.sockets.adapter.rooms.get(roomId));

        gameState[roomId]= game;
        console.log("gamestate ", gameState[roomId]);
       io.to(roomId).emit("game", game);
       console.log(roomId, gameState[roomId], socket.id[0] + socket.id[1]);
   });

   socket.on("pins", (roomId, pins) => {
        pinsState[roomId] = pins;
       io.to(roomId).emit("pins", pins);
       console.log(pins);
   });

   socket.on("code", (roomId, code) => {
        codeState[roomId] = code;
        io.to(roomId).emit("code", code);
       console.log(roomId, codeState[roomId], socket.id[0] + socket.id[1]);
   });

    socket.on("disconnect", () => {
        console.log("disconnected", socket.id[0]+socket.id[1]);
    });
});

server.listen(8080, () => {
    console.log("server started on port 8080");
});
