const { authSecret } = require('./../../.env');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({error: "Preencha todos os campos!"})
        }
        const user = await app.dataBase('users')
            .where({ email: req.body.email })
            .first()
        if (!user) return res.status(400).send({error: "Usuario não encontrado!"})

        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        if (!isMatch) return res.status(401).send({error: "Senha Inválida!"})

        const dateNow = Math.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: dateNow + (60 * 60 * 24 * 3)
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }

    const validateToken = async (req, res) => {
        const userDate = req.body || null
        try {
            if (userDate) {
                const token = jwt.decode(userDate.token, authSecret)
                if (new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch (err) {
            return res.send(500).send(err)
        }
        res.send(false)
    }
    return {signin, validateToken}
}