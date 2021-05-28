import { constants } from "../../_shered/constans.js"


const sing_in = document.getElementById("sing_in")
const sing_up =document.getElementById("sing_up")
const sing_in_div = document.getElementById("sing_in_box")
const sing_up_div = document.getElementById("sing_up_box")
const sing_up_submit = document.getElementById("sing_up_submit_btn")
const sing_in_submit = document.getElementById("sing_in_submit_btn")

const sing_in_username = document.getElementById("sing_in_input_username")
const sing_in_password = document.getElementById("sing_in_input_password")
const sing_up_username = document.getElementById("sing_up_input_username")
const sing_up_password = document.getElementById("sing_up_input_password")
const p = document.createElement('p')

export default class ViewLogin {
    static init(socket) {
        ViewLogin.Login_Cadastro(socket)
        ViewLogin.submit(socket)
    }

    static Cadastrar(socket) {
        return () => {
            const id = Date.now().toString(36) + Math.random().toString(36).substring(2)

            const users = {
                id,
                username:  sing_up_username.value,
                password:  sing_up_password.value,
            }

            socket.emit(constants.events.ON_ADD_NEW_USER, users)
        }
    }

    static Logar(socket) {
        return () => {
            const user = {
                username: sing_in_username.value,
                password: sing_in_password.value
            }
            socket.emit(constants.events.SING_IN_USER, user)
        }
    }
    static UserNotFound() {
        const p = document.createElement('p')
        p.innerHTML = "Usuario ou senha inexistentes ou Usuario já está conectado "
        p.className = "warnning_p"
        sing_in_div.appendChild(p)
    }

    static UserAlreadyExist() {
        p.innerHTML = "Esse username já foi utilizado"
        p.className = "warnning_p"
        sing_up_div.appendChild(p)
    }

    static Login_Cadastro(socket){
        sing_in.addEventListener("click",() => {
            sing_up_div.style.display = 'none'
            sing_in_div.style.display = 'flex'
        })
    
        sing_up.addEventListener("click",() => {
            sing_up_div.style.display = 'flex'
            sing_in_div.style.display = 'none'
        })
    } 

    static submit(socket) {
        sing_up_submit.addEventListener("click", ViewLogin.Cadastrar(socket))
        sing_in_submit.addEventListener("click", ViewLogin.Logar(socket))
    }

    static readirectToChat() {
        window.location = "../chat"
    }
}

