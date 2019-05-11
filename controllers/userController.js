const db = require("../models");


module.exports = {
    findAll: function (req, res) {
        db.User.findAll({
        }).then(function (dbUser) {
            res.json(dbUser);
        });
    },
    findOne: function (req, res) {
        db.User.findOne({
            where: {
                id: req.params.id
            },
            // include: [db.Confession]
        }).then(function (dbUser) {
            res.json(dbUser);
        });
    },
    delete: function (req, res) {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbUser) {
            res.json(dbUser);
        });
    },
    create: function (req, res) {
        console.log(req.body)
        db.User.create(req.body).then(function (dbUser) {
            res.json(dbUser);
        });
    }
};
