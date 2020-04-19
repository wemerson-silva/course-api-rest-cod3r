const AdminValidation = require('../utils/adminValidator');
module.exports = app => {
    app.route('/categories')
        .post(app.src.middlewares.passport.authenticate(), AdminValidation(app.src.controllers.categoryController.save))
        .get(app.src.controllers.categoryController.get)

    app.route('/categories/tree')
        .get(app.src.middlewares.passport.authenticate(),app.src.controllers.categoryController.getTree)

    app.route('/categories/:id')
        .put(app.src.middlewares.passport.authenticate(), AdminValidation(app.src.controllers.categoryController.save))
        .delete(app.src.middlewares.passport.authenticate(), AdminValidation(app.src.controllers.categoryController.remove))
        .get(app.src.middlewares.passport.authenticate(),app.src.controllers.categoryController.getById)
}