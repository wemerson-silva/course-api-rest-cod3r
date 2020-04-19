module.exports = app => {
    app.post('/signup',app.src.controllers.userController.save)
    app.post('/signin', app.src.middlewares.auth.signin)
    app.post('/validateToken', app.src.middlewares.auth.validateToken)
}