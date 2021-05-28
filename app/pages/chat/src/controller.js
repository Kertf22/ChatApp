import { constants } from "../../_shered/constans.js"


export default class ChatController {
    constructor({ user, socketBuilder, view,room }) {
        this.socket = {}
        this.user = user
        this.socketBuilder = socketBuilder
        this.View = view
        this.roomId = room 
    }

    static async init(deps){
        return new ChatController(deps).init()
    }
    async init() {
        this.socket = this._stupSocket()
        this._stupView()
        const blue =  {
            user:this.user,
            roomId:this.roomId
        }
        this.socket.emit(constants.events.JOIN_ROOM,blue)
    }

    _stupSocket() {
        const socket = this.socketBuilder
            .setOnUserConnected(this.onUserConnected())
            .setOnUserDisconneted(this.onUserDisconnected())
            .setOnUpdateMessages(this.onUpdateMessages())
            .build()

        return socket
    }

    SendMessages() {
        const socket = this.socket

        this.View.Chat(socket, this.user)
    }

    _stupView() {
        this.SendMessages()
    }
    onUserDisconnected() {
        return (data) => {
            console.log(data.username, "disconned")
            this.View.redirectToLogin()
        }
    }

    onUserConnected() {
        return (data) => {
            const user = this.user
            const { messages } = data
            this.View.reciveAllMessages({ user, messages })
        }
    }
    onUpdateMessages() {
        return (messages) => { 
            this.View.updateMessages(messages,this.user)
        }
    }

}