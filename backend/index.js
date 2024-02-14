const express = require("express");
var cors = require('cors')
const { sequelize } = require("./config/db");
const app = express();

app.use(express.json());

app.use(cors())

const {user} = require("./routes/userRoutes")
const {coinPost}= require("./routes/postRouter");

app.use("/user", user);
app.use("/post",coinPost)

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
