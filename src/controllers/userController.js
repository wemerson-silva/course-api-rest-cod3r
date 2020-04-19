const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError, emptyArray } = app.src.utils.validator

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = { ...req.body };
        if (req.params.id) user.id = req.params.id

        if (!req.originalUrl.startsWith('/users')) user.admin = false
        if (!req.user || !req.user.admin) user.admin = false

        try {
            existsOrError(user.name, { error: 'Nome não informado' })
            existsOrError(user.email, { error: 'E-mail não informado' })
            existsOrError(user.password, { error: 'Senha não informada' })
            existsOrError(user.confirmPassword, { error: 'Confirmação de Senha inválida' })
            equalsOrError(user.password, user.confirmPassword,
                { error: 'Senhas não conferem' })

            const userFromDB = await app.dataBase('users')
                .where({ email: user.email }).first()
            if (!user.id) {
                notExistsOrError(userFromDB, { error: 'Email já cadastrado' })
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if (user.id) {
            app.dataBase('users')
                .update(user)
                .where({ id: user.id })
                .whereNull('deletedAt')
                .then(_ => res.status(204).send({ sucess: 'Atualizado com sucesso.' }))
                .catch(err => res.status(500).send(err))
        } else {
            app.dataBase('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.dataBase('users')
            .select('id', 'name', 'email', 'admin')
            .whereNull('deletedAt')
            .orderBy('id', 'asc')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = async (req, res) => {


        await app.dataBase('users')
            .select('id', 'name', 'email', 'admin')
            .where({ id: req.params.id })
            .whereNull('deletedAt')
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const articles = await app.dataBase('articles')
                .where({ userId: req.params.id });
            notExistsOrError(articles, 'Usuário possui artigos no Banco de dados.');

            const rowsUpdate = await app.dataBase('users')
                .update({ deletedAt: new Date() })
                .where({ id: req.params.id });

            existsOrError(rowsUpdate, 'User not Foud!');

            res.status(204).send();
        } catch (err) {
            res.status(400).send(err);
        }
    }


    return { save, get, getById, remove }
}