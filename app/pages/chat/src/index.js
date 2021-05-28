
import { constants } from "../../_shered/constans.js";
import UserDb from "../../_shered/userDb.js";
import SocketBuilderChat from "../util/SocketBuilderChat.js";
import ChatController from "./controller.js";
import View from "./view.js";


const user = UserDb.get()
if(!Object.keys(user).length){
    View.redirectToLogin()
}

const socketUrl = constants.socketUrl

const depencies = {
    user,
    room:1,
    socketBuilder: new SocketBuilderChat({socketUrl}),
    view:View
}

ChatController.init(depencies)

