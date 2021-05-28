import { constants } from "../../_shered/constans.js"


const text_box = document.getElementById(`text_box`)
const submit_btn = document.getElementById("submit_btn")
const message_box = document.getElementById("chat-message")
const userNameText = document.getElementById("user-name")


export default class View {

    static init(socket, user) {
        this.reciveAllMessages(socket, data)
        this.Chat(socket, user)

    };

    static reciveAllMessages({ user, messages }) {
        const username = user.username
        userNameText.innerHTML = username
        console.log(messages)
        messages.forEach(data => {
            this.AddText(data,username)
        })
    };
    static SubmitClick({ socket, user }) {
        return () => {
            const username = user.username
            const date = new Date()
            const formatDate = `${date.getDate()}/${date.getMonth() + 1}-----${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            const data = {

                username,
                message: text_box.value,
                date: formatDate
            }

            this.AddText(data,username)
            socket.emit(constants.events.SEND_MESSAGES, data)
        }
    }

    static Chat(socket, user) {
        console.log("chat")
        submit_btn.addEventListener("click", View.SubmitClick({ socket, user }))
    }

    static updateMessages(data, user) {
        console.log("cade")
        if (data.username != user.username)
        {
            this.AddText(data)
        }
    }

    static AddText(data,username) {
        const Talk_box = document.createElement("div")
        Talk_box.className = "Talk_box"
        if(data.username != username){
            console.log("sim")
            Talk_box.className = "Talk_box right"
        }
        const template =  `

        <div class="Talk">
                <p class="User_Title">${data.username} : </p>
                <p class="User_message">${data.message}</p>
                <span class="Date">${data.date}</span>  
        </div>    
        `
        Talk_box.innerHTML = template
        message_box.appendChild(Talk_box)
    };
    static redirectToLogin() {
        window.location = '../login'
    }

}



