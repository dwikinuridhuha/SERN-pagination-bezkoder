const express = require("express");
const cors = require("cors");

const db = require("./models");
const app = express();
const PORT = process.env.PORT || 3600;

db.sequelize.sync();

app.use(cors());

require("./routes/tutorial.routes")(app);

app.listen(PORT, () => {
    console.log(`running in port ${PORT}`);
});