const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./models");
const app = express();
const PORT = process.env.PORT || 3600;

db.sequelize.sync();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require("./routes/tutorial.routes")(app);

app.listen(PORT, () => {
    console.log(`running in port ${PORT}`);
});