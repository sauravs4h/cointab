const express = require("express");
const { sequelize } = require("./config/db");
const app = express();

app.use(express.json());

const user = require("./routes/userRoutes");

app.use("/user", user);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "hello" });
});

app.listen(8080, async() => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log("connected")
        console.log("running on 8080");

    } catch (error) {
        console.log(error)
    }
});
