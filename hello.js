const express = require("express");
const app = express();
require('dotenv').config()


app.use("/", express.static("./public"));


app.listen(process.env.APP_PORT, process.env.APP_IP);
app.listen((err) => {
    if (err) {
        return console.log("something bad happened", err);
    }
    console.log(`server is listening ${process.env.APP_IP},${process.env.APP_PORT}`);
});
