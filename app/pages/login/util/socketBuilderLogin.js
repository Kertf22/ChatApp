import { constants } from "../../_shered/constans.js";
import SocketBuilder from "../../_shered/socketBuilder.js";

export default class SocketBuilderLogin extends SocketBuilder{
    constructor({socketUrl}){
        super({socketUrl})
        this.onUserLogged = () => {}
        this.onUserCadastro = () => {}
    }

    setOnUserCadastro(fn) {
        this.onUserCadastro = fn

        return this
    }

    setOnUserLogged(fn) {
        this.onUserLogged = fn

        return this
    }
    
    build(){
        const socket = super.build()

        socket.on(constants.events.SING_IN_USER,this.onUserLogged)
        socket.on(constants.events.ON_ADD_NEW_USER,this.onUserCadastro)

        return socket
    }

}