const express = require("express")
const app = express();
const http = require("http");
const cors = require("cors")
const {Server} = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server,{
    cors: {
        origin: "http://localhost:5173",
        methods: ['GET', 'POST'],
        credentials:true
    },
});

io.on("connection",(socket)=>{
    console.log(`User connected : ${socket.id}`)

    socket.on("send-message", (message)=>{
        
        //Broadcast the recieved message
        io.emit("recieved-message",message)
        console.log(message)
    })
    socket.on("disconnected", ()=> console.log("user is disconnected"))
})

server.listen(5000,()=>console.log("Server is running at port 5000"))