import express from "express";
import bodyParser from "body-parser";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import PostRoute from "./Routes/PostRoute.js";
import UploadRoute from "./Routes/UploadRoute.js";
import CommentRoute from './Routes/CommentRoute.js';
import ProfileRoute from './Routes/ProfileRoute.js';
import ChatRoute from './Routes/ChatRoute.js';
import MessageRoute from './Routes/MessageRoute.js'
import AuthAdminRoute from './Routes/AuthAdminRoute.js';
import AdminRoute from './Routes/AdminRoute.js'

import {createServer} from 'http';
import {Server} from 'socket.io'

//Routes

const app = express();

//To serve images for public
app.use(express.static("public"));
app.use("/images", express.static("images"));
app.use("/videos", express.static("videos"));

//Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({origin:["https://amico.netlify.app","http://localhost:3000"]}));

dotenv.config();

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log("DATABASE CONNECTED")
    ).catch((error) => {
    console.log(error);
  });

//usage of routes


app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/upload", UploadRoute);
app.use("/posts", PostRoute);
app.use('/comment',CommentRoute);
app.use('/profile',ProfileRoute);
app.use('/chat',ChatRoute);
app.use('/message',MessageRoute);




//Admin
app.use('/auth-admin',AuthAdminRoute)
app.use('/admin',AdminRoute)




const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000","https://amico.netlify.app"],
  },
});



let activeUsers = [];

io.on('connection', (socket) => {

    //add new User
    socket.on('new-user-add', (newUserId) => {
        //if user is not added previously
        if (!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({
                userId: newUserId,
                socketId: socket.id
            })
        }
        console.log('Connected Users',activeUsers)
        io.emit('get-users', activeUsers)
    })


    //send Message
    socket.on('send-message',(data)=>{
        const {receiverId}=data;
        const user=activeUsers.find((user)=>user.userId===receiverId);
        console.log('Sending from socket to: ',receiverId);
        console.log('Data',data);
        if(user){
            io.to(user.socketId).emit('receive-message',data)
        }
    })

    socket.on('disconnect', () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
        console.log('User Disconnected',activeUsers)
        io.emit('get-users', activeUsers)

    })
})



httpServer.listen(process.env.PORT, () =>
      console.log(`Listening at ${process.env.PORT}`)
)