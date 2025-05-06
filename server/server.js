const express = require("express");
const cors = require("cors");
const { createServer } = require('node:http');
const http = require("http");
const { Server } = require('socket.io');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { makeid } = require('./utils');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173","https://krijak.github.io"], // Allow requests from this origin and my frontend port = 5173
        methods: ["GET", "POST"], // Allow these HTTP methods
    },
});


const uri =process.env.DB_CONNECTIONSTRING;

//"mongodb+srv://kristinajakobsen:ornF1lcqsEYFg6js@mastermindcluster.wh0kpgp.mongodb.net/?retryWrites=true&w=majority&appName=MastermindCluster";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

//     const db = client.db("sample_guides");
// const coll = db.collection("planets");
// // find code goes here
// const cursor = coll.find({ hasRings: true });

    const db_gamestates = client.db("Mastermind").collection("GameState");
    const gameState = db_gamestates.find({roomId: '12345'});
    console.log(gameState);
    // await gameState.map(item => console.log(item));
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);




const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "kristinajakobsn@gmail.com",
      pass: process.env.MAIL_PSWRD,
    },
  });

let mailOptions = {
    from: 'kristinajakobsn@gmail.com',
    to: 'kristina.jakobsen@gmail.com',
    subject: 'Mastermind',
    html: ''
};

let gameState = {};
let pinsState = {};
let codeState = {};
let allRooms = {};
scheduleReset();

io.on("connection", (socket) => {
    console.log("A user connected", socket.id[0] + socket.id[1]);
    
    const handleNewGame = (code, game, pins) => {
        console.log("newGame");
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
        console.log("joinRoom ", roomId);
        const room = io.sockets.adapter.rooms.get(roomId);
        console.log(allRooms);
        // console.log(allRooms[socket.id] == roomId);
        console.log(Object.values(allRooms).includes(roomId));

        if (room){
            console.log("join room", roomId, socket.id);
            socket.join(roomId);
            allRooms[socket.id] = roomId;
            socket.emit("joinRoom", true);
            socket.emit("roomId", roomId);

            console.log("code", codeState[roomId]);
            console.log("game", gameState[roomId]);
            io.to(roomId).emit("game", gameState[roomId]);
            io.to(roomId).emit("code", codeState[roomId]);
            io.to(roomId).emit("pins", pinsState[roomId]);
            console.log("emitted on join");


        } else if (Object.values(allRooms).includes(roomId)){
            socket.emit("roomId", roomId);
            socket.join(roomId);
            io.to(roomId).emit("game", gameState[roomId]);
            io.to(roomId).emit("code", codeState[roomId]);
            io.to(roomId).emit("pins", pinsState[roomId]);
            console.log("reopened room", roomId);
            console.log(io.sockets.adapter.rooms);
            
        } else {
            mailOptions.html = `
            <p><b>Kunne ikke finne rommet: </b> ${roomId}</p>
            <br>
            <p>Data, allRooms: </p>
            ${JSON.stringify(allRooms)}`;
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            socket.emit("joinRoom", false)
        }
    });

    

   socket.on("game", (roomId, game) => {
    console.log("game");
        gameState[roomId]= game;
       io.to(roomId).emit("game", game);
       console.log(roomId, gameState[roomId], socket.id[0] + socket.id[1]);

   });

   socket.on("pins", (roomId, pins) => {
    console.log("pins");
        pinsState[roomId] = pins;
       io.to(roomId).emit("pins", pins);
       console.log(roomId, pinsState[roomId], socket.id[0] + socket.id[1]);
   });

   socket.on("code", (roomId, code) => {
    console.log("code");
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

function scheduleReset() {
    let reset = new Date();
    const now = Date.now()
    reset.setHours(4, 0, 0, 0);
    if (now >= reset) {
        reset.setDate(reset.getDate() + 1);
      }
    let t = reset.getTime() - now;

    setTimeout(function() {
        gameState = {};
        pinsState = {};
        codeState = {};
        allRooms = {};
        console.log("reset matermind states");
        mailOptions.html = `
        <p><b>Reset all states. AllRooms: </b> ${JSON.stringify(allRooms)}</p>`;
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        scheduleReset();
    }, t);
}
