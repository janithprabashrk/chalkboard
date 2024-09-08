const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyparser =  require("body-parser");
const app = express();
require("dotenv").config();
const path = require('path');

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const URL = process.env.MONGODB_URL;
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Connected to MongoDB");

})

const AdminRouter = require("./routes/admin.js");
app.use("/admin",AdminRouter);//http://localhost:8070/admin

app.listen(PORT, () =>{
    console.log(`Server Runs on ${PORT} PORT `);

})
