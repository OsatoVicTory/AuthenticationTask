let User = require("../models/models.js");
const bcrypt = require("bcrypt");

exports.signupUser = async (req, res) => {
    const { username, password } = req.body;

    //user role would have been specified in req.body;
    try {
        const existingUser = await User.findOne({ username });
        if(existingUser) {
            return res.status(400).json({ 
                message: "User with this username already exists. Try another Name" 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            ...req.body,
            password: hashedPassword
        })
        await newUser.save();
        res.status(200).json({ message: "User Created. Now You Can Log In" });     
    } catch (err) {
        res.status(500).json({ message: err });
    }
}