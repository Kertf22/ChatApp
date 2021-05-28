import { constants } from "./constans.js"

export default class SocketBuilder {
    constructor({socketUrl}){
        this.socketUrl = socketUrl
        this.onUserConnected = () => {}
        this.onUserDisconneted = () => {}
    }

    setOnUserConnected(fn){
        this.onUserConnected = fn

        return this
    }
    setOnUserDisconneted(fn){
        this.onUserDisconneted = fn

        return this
    }

    build(){
        const socket = globalThis.io(this.socketUrl)

        socket.on(constants.events.USER_CONNECT,this.onUserConnected)
        socket.on(constants.events.User_DISCONNECT,this.onUserDisconneted)

        return socket
    }
}