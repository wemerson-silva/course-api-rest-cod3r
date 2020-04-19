module.exports = app => {
    app.route('/articles')
        .post(app.src.controllers.articleController.save)
        .get(app.src.controllers.articleController.get)

    app.route('/articles/:id')
        .put(app.src.controllers.articleController.save)
        .delete(app.src.controllers.articleController.remove)
        .get(app.src.controllers.articleController.getById)

    app.route('/categories/:id/articles')
        .get(app.src.controllers.articleController.getByCategory)
}