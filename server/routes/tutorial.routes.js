module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller");

    let router = require("express").Router();

    router.get("/", tutorials.findAll);
    router.post("/", tutorials.create);
    router.get("/pub", tutorials.findAllPublished);

    router.get("/:id", tutorials.findOne);
    router.put("/:id", tutorials.update);
    router.delete("/:id", tutorials.delete);

    app.use("/api/tutorials", router);
};