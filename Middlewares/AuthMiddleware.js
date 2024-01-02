const jwt = require('jsonwebtoken')
const User = require("../models/user")

module.exports.userVerification = (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        console.log('cannot find the token write now!')
        return res.json({ status: false, message: 'cannot find the token write now!' })
    }
    jwt.verify(token, "1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z", async (err, data) => {
        if (err) {
            return res.json({ status: false, message: 'something error occuring' })
        } else {
            const user = await User.findById(data.id)
            if (user) {
                console.log('user verified: ',user.emailID)
                return res.json({ status: true, message: "User verified Successfully ", user: user })
            }
            else return res.json({ status: false, message: "Cannot find the user right now!" })
        }
    })
}

module.exports.currentUserData = (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        console.log('cannot find the token write now!')
        return res.json({ status: false, message: 'cannot find the token write now!' })
    }
    jwt.verify(token, "1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z", async (err, data) => {
        if (err) {
            return res.json({ status: false, message: 'something error occuring' })
        } else {
            const user = await User.findById(data.id)
            if (user) {
                console.log('user verified: ',user.emailID)
                return res.json({ status: true, message: "User verified Successfully ", user: user })
            }
            else return res.json({ status: false, message: "Cannot find the user right now!" })
        }
    })
}
