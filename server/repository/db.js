import { readFile, writeFile } from 'fs/promises'

export default class Storage {
    constructor({ file }) {
        this.file = file
    }

    async _currentFileContent() {
        return JSON.parse(await readFile(this.file))
    }

    async find(item, Haspassword = false) {
        const all = await this._currentFileContent()
        if (!item) return all
        if (Haspassword == true)
        {
            const result = all.find(({ username, password }) => item.username == username && item.password == password)
            return result
        };

        const result = all.find(({ username }) => item.username == username)
        return result
    }

    async create(data) {
        const currentFile = await this._currentFileContent()
        currentFile.push(data)

        await writeFile(this.file, JSON.stringify(currentFile))

        return data
    }
}