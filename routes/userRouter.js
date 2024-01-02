const express = require("express");
const router = express.Router();
const { SignUp, Login, UpdateData } = require('../controller/AuthController')
const { userVerification } = require("../Middlewares/AuthMiddleware");


router.post('/register', SignUp)
router.post('/login', Login);
router.post('/', userVerification)
router.post('/updateData', UpdateData)

module.exports = router;


  