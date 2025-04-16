const express = require("express");
const cors = require("cors");
const { createServer } = require('node:http');
const http = require("http");
// const Server = require("socket.io").Server;
const { Server } = require('socket.io');

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



io.on("connection", (socket) => {
    console.log("A user connected");

   socket.on("game", game => {
       io.emit("game", game);
       console.log(game);
   });

   socket.on("pins", pins => {
       io.emit("pins", pins);
       console.log(pins);
   });

   socket.on("code", code => {
        io.emit("code", code);
       console.log(code);
   });

   socket.on("setUseSameDevice", bool => {
       io.emit("setUseSameDevice", bool);
       console.log("setUseSameDevice", bool);
   });

    socket.on("disconnect", () => {
        console.log("disconnected");
    });
});

server.listen(8080, () => {
    console.log("server started on port 8080");
});
