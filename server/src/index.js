import { createServer } from 'http'
import { Server } from 'socket.io'
import express from "express";
import { constants } from '../_shared/constans.js';
import Storage from '../repository/db.js';
import UserFun from '../service/FindUser.js';
import { on } from 'events';
const file = "../server/database/users.json"

const port = 3000
const app = express()
const server = createServer((req, res) => {
    res.writeHead(200, {
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Methods': "OPTIONS,POST,GET"
    })

    res.end("hey there!!")
})


const io = new Server(server,{
    cors: {
        origin: "*",
        credentials: false
    }});


const messages = [];
const usersOnRoom = []

io.on("connection", (socket) => {
    // Sala de login

// Cadastro
    socket.on(constants.events.ON_ADD_NEW_USER,async (user) => {
        console.log(user)
        const depencies = {
            LocalStorage: new Storage({file}),
        }
        const db = new UserFun(depencies)
        const newUserid = await db.Create(user)

        socket.emit(constants.events.ON_ADD_NEW_USER,newUserid)
        
        socket.emit(constants.events.USER_CONNECT,object)
    })
    console.log("Connected", socket.id)
    const object = {
        socketId: socket.id,
        messages
    }
    socket.emit(constants.events.USER_CONNECT,object)

//Login
    socket.on(constants.events.SING_IN_USER,async (user) => {
        const depencies = {
            LocalStorage: new Storage({file}),
        }
        const db = new UserFun(depencies)
        const connectedUser = await db.HasUser(user)

        const ExisteUser = usersOnRoom.find(({username}) => user.username === username)
        if(ExisteUser){
            socket.emit(constants.events.SING_IN_USER,!connectedUser)
            return
        } 
        socket.emit(constants.events.SING_IN_USER,connectedUser)
    })

    socket.on(constants.events.JOIN_ROOM,({user,roomId}) => {
        socket.join('chat')        
        const blue = usersOnRoom.find(({username}) => user.username === username) 
        if(!blue){
            usersOnRoom.push(user)
            return
        }
    })


//Mandando menssagens

    socket.on(constants.events.SEND_MESSAGES, (message) => {
        console.log("mensasagem recebida", message)
        messages.push(message)
        io.emit(constants.events.UPDATE_MESSAGES, message)
    })
})
  //                                                                                                                                                                                                                                                                                            socket.emit(constants.events.User_DISCONNECT,)
server.listen(port, () => {
    console.log("Server Back-end rodando na porta http://localhost:3000")
})


export { io }