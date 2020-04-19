module.exports = app => {
    app.get('/stats', app.src.controllers.stats.Get)
   
}