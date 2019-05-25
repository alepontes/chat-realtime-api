const mensagens = []
let contas = [
    {
        name: "Ale",
        pass: "123",
        token: "tokenlll"
    },
    {
        name: "Lorem",
        pass: "123",
    }
]

const db = {
    get: () => {
        return mensagens
    },
    add: (item) => {
        mensagens.push(item)
    },
    rm: () => { },
}

const account = {
    login: (name, pass, callback) => {

        const conta = contas.find(item => item.name == name && item.pass == pass)

        if (!conta)
            return callback("Conta Inexistente", null)

        // Criar Token

        callback(false, conta.token)

    },
    valid: (token, callback) => {


        contas.find(item => item.token == token)

        if (!conta)
            return callback("Erro", null)


        callback(false, true)
    },
}

module.exports = { db, account }