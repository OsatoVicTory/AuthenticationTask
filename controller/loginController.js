let User = require("../models/models.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { MYLITTLESECRET } = process.env;
const expiryTime = "8h";

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const userAccount = await User.findOne({ username })
        if(!userAccount) {
            return res.status(404).json({ message: "Incorrect Username" });
        }

        //compare password
        let match = await bcrypt.compare(password, userAccount.password);
        if(!match) {
            return res.status(401).json({ message: "Incorrect Password" });
        }

        //create token
        const token = await jwt.sign({
            id: userAccount._id,
            username: userAccount.userName,
            firstname: userAccount.firstname,
            lastname: userAccount.lastname,
            password: userAccount.password,
            role: userAccount.role
        }, MYLITTLESECRET, {
            expiresIn: expiryTime
        })

        res.status(200).json({ 
            message: "User Registered Successfully",
            token
        })
    } catch (err) {
        res.status(500).json({ message: err });
    }
}
