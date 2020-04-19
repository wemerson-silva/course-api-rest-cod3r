const schedule = require('node-schedule');

module.exports = app => {
    schedule.scheduleJob('0-59/5 * * * * *', async function () {
        const userCount = await app.dataBase('users').count('id').whereNull('deletedAt').first();
        const categoriesCount = await app.dataBase('categories').count('id').first();
        const articlesCount = await app.dataBase('articles').count('id').first()

        const { Stats } = app.src.controllers.stats;


        const lastStat = await Stats.findOne({}, {},
            { sort: { 'createdAt': -1 } });

        const stat = new Stats({
            users: userCount.count,
            categories: categoriesCount.count,
            articles: articlesCount.count,
            createdAt: new Date()
        });

        const changeUsers = !lastStat || stat.users !== lastStat.users;
        const changeCategories = !lastStat || stat.categories !== lastStat.categories;
        const changeArticles = !lastStat || stat.articles !== lastStat.articles;

        if (changeUsers || changeCategories || changeArticles) {
            stat.save().then(() => { 
                console.warn(" "), 
                console.warn("\x1b[43m", "Stats Sincronizado com sucesso!", "\x1b[0m") 
            })
        }
    })
}