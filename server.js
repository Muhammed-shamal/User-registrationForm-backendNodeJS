const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const userRouter = require('./routes/userRouter')
var cookieParser = require("cookie-parser");


const app = express();
const PORT = 5000;

//using the funtions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));
app.use(cookieParser());

app.use(userRouter)

//starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

