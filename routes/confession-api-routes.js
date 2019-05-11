var confessionRouter = require("express").Router();
// var confessionController = require("../controllers/confessionController");
var confessionController = require("../controllers/confessionController");

confessionRouter.route("/confessions")
  .get(confessionController.findAll)
  .post(confessionController.create)
  .put(confessionController.update);

confessionRouter.route("/confessions/:id")
  .get(confessionController.findOne)
  .delete(confessionController.delete);

module.exports = confessionRouter;
