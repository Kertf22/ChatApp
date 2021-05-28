export default class User {
    constructor({username,id}){
        this.username = username
        this.id = id || username + Date.now()
    }

}