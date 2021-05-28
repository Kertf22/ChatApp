import { constants } from '../../_shered/constans.js'
import SocketBuilderLogin from '../util/socketBuilderLogin.js'
import { LoginController } from './controller.js'
import ViewLogin from './view.js'

const socketUrl = constants.socketUrl
const dependencies = {
        socketBuilder:new SocketBuilderLogin({socketUrl}),
        view: ViewLogin
}

await LoginController.init(dependencies)






