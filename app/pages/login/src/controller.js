import UserDb from "../../_shered/userDb.js"

export class LoginController {
    constructor({socketBuilder, view }) {
        this.socket = {}
        this.user = {}
        this.socketBuilder = socketBuilder
        this.View = view
    }

    static async init(deps){
        return new LoginController(deps)._init()
    }

    async _init() {
        this.socket = this._stupSocket()
        this._stupView(this.socket)
    }

    _stupSocket() {
        const socket = this.socketBuilder
                .setOnUserCadastro(this.onUserCadastro())
                .setOnUserLogged(this.onUserLogged())
                .build()

        return socket
    }
    _stupView(socket){
        return this.View.init(socket)
    }
    onUserLogged() {
        return (user) => {
            if (!user){
                console.log("Username ou senha estão errados!")
                this.View.UserNotFound()
                return
            }
            console.log(user.id,"logou")
            UserDb.insert(user)
            this.View.readirectToChat()
        }
    }
    onUserCadastro() {
        return (user) => {
            if(!user){                
                console.log("Esse username já foi utilizado!")
                this.View.UserAlreadyExist()
                return
            }
            console.log(user,"cadastrou")
            UserDb.insert(user)
            this.View.readirectToChat()
        }
    }
}