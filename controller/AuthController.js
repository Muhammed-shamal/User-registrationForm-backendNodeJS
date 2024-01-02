const { createSecretToken } = require("../SecretTokens");
const User = require('../models/user')
const bcrypt = require('bcrypt')


module.exports.SignUp = async (req, res, next) => {
    try {
        const { fname, rollNo, phoneNumber, emailID, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ emailID });
        if (existingUser) {
            return res.status(401).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const userData = new User({
            fname,
            rollNo,
            phoneNumber,
            emailID,
            password: hashedPassword,
        });

        // Save the user to the database
        await userData.save();


        res.status(201).json({ success: true, message: 'User registered successfully' });
        next();
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.Login = async (req, res, next) => {
    try {
        const { emailID, password } = req.body;

        if (!emailID || !password) {
            return res.json({ message: 'All fields are required' })
        }
        const userData = await User.findOne({ emailID });

        if (!userData) {
            return res.json({ message: 'Incorrect password or email' })
        }
        const auth = await bcrypt.compare(password, userData.password)
        if (!auth) {
            return res.json({ message: 'Incorrect password or email' })
        }

        let convert_to_string = userData._id.toString()
        const token = createSecretToken(convert_to_string);
        res.cookie("token", token, {
            httpOnly: false,
            sameSite: "Lax",
        });
        res.status(201).json({ message: "User logged in successfully", success: true, user: userData });
        next()
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports.UpdateData = async (req, res, next) => {
    try {
        const userId = req.body.id; // Assuming the user ID is sent in the request body


        const updateData = {
            fname: req.body.fname,
            emailID: req.body.emailID,
            rollNo: req.body.rollNo,
            phoneNumber: req.body.phoneNumber,
        };

        // Use updateOne to update a single document
        const result = await User.updateOne({ _id: userId }, { $set: updateData });

        if (result.nModified === 1) {
            // The update was successful
            res.status(200).json({ message: 'User updated successfully' });
        } else {
            // The user with the given ID was not found
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}

// return new Promise((resolve, reject) => {
//     db.get()
//         .connection.collection(collection.PRODUCT_COLLECTION)
//         .updateOne(
//             { _id: new ObjectId(productId) },
//             {
//                 $set: {
//                     Name: productData.Name,
//                     Descrption: productData.Descrption,
//                     price: productData.price,
//                 },
//             }
//         )
//         .then(() => {
//             resolve();
//         });
// });