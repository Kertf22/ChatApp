export default class UserFun {
    constructor({ LocalStorage }) {
        this.storage = LocalStorage
    }

    async HasUser(user, Haspassword = false) {
        const { username, password } = user
        const blue = { username, password }
        const UserExist = await this.storage.find(blue, Haspassword)
        return UserExist
    }

    async Create(user) {
        const UserExist = await this.HasUser(user)
        if (!UserExist)
        {
            console.log("Criando usuario:", user.username)
            return await this.storage.create(user)
        }

        console.log("Usuário Já existe")
        return false
    }
}