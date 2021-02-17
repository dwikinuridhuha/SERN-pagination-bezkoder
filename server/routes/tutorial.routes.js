module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller");

    let router = require("express").Router();

    router.get("/", tutorials.findAll);
    router.get("/pub", tutorials.findAllPublished);

    router.get("/:id", tutorials.findOne);
    router.put("/:id", tutorials.update);
    router.put("/:id", tutorials.delete);

    app.use("/api/tutorials", router);
}