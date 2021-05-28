import { constants } from "../../_shered/constans.js";
import SocketBuilder from "../../_shered/socketBuilder.js";


export default class SocketBuilderChat extends SocketBuilder{
    constructor({socketUrl}) {
        super({socketUrl})
        this.onUpdateMessages = () => {}
    }

    setOnUpdateMessages(fn){
        this.onUpdateMessages = fn

        return this
    }
    build(){

        const socket = super.build()

        socket.on(constants.events.UPDATE_MESSAGES,this.onUpdateMessages)

        return socket
    }

}