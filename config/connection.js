const mongoose = require('mongoose')
//requre("dotenv").config()
//const {Mongo_URL}  = procces.env

const url = 'mongodb://127.0.0.1:27017'


mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Registration-form"
});

const db = mongoose.connection;

db.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});

db.once("open", () => {
    console.log("Connected to MongoDB");
});

module.exports = mongoose