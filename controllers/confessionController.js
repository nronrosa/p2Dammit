const db = require('../models')

module.exports = {
    findAll: function (req, res) {
        var query = {};
        if (req.query.user_id) {
            query.UserId = req.query.user_id;
        }
        db.Confession.findAll({
            where: query,
            include: [db.User]
        }).then(function (dbConfession) {
            res.json(dbConfession);
        });
    },
    findOne: function (req, res) {
        db.Confession.findOne({
            where: {
                id: req.params.id
            },
            include: [db.User]
        }).then(function (dbConfession) {
            res.json(dbConfession);
        });
    },
    delete: function (req, res) {
        db.Confession.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbConfession) {
            res.json(dbConfession);
        });
    },
    create: function (req, res) {
        db.Confession.create(req.body).then(function (dbConfession) {
            res.json(dbConfession);
        });
    },
    update: function (req, res) {
        db.Confession.update(
            req.body, {
                where: {
                    id: req.body.id
                }
            }).then(function (dbConfession) {
            res.json(dbConfession);
        });
    }
};