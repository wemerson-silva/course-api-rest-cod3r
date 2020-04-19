const AdminValidation = require('../utils/adminValidator');
module.exports = app => {
    app.route('/users')
        .post(app.src.controllers.userController.save)
        .get(app.src.controllers.userController.get)

    app.route('/users/:id')
        .put(app.src.middlewares.passport.authenticate(),
            AdminValidation(app.src.controllers.userController.save))
        .get(app.src.middlewares.passport.authenticate(),
            AdminValidation(app.src.controllers.userController.getById))
        .delete(app.src.middlewares.passport.authenticate(),
            AdminValidation(app.src.controllers.userController.remove))

}