module.exports = app => {
    const Stats = app.mongoDB.model('Stat', {
        users: Number,
        categories: Number,
        articles: Number,
        createdAt: Date
    });

    const Get = (req, res) => {
        Stats.findOne({}, {}, { sort: { 'createdAt': -1 } })
            .then(stat => {
                const defaultStat = {
                    users: 0,
                    categories: 0,
                    articles: 0
                }
                res.json( stat || defaultStat )
            })
    }
    return { Stats, Get }
}