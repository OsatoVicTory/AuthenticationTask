let User = require("../models/models.js");
const bcrypt = require("bcrypt");

exports.getNewPassword = async (req, res) => {
    const { username, password } = req.body
    try {
        let userAccount = await User.findOne({ username });
        if(!userAccount) {
            return res.status(401).json({ message: "Incorrect Username" });
        }
        let newPassword = await bcrypt.hash(password, 10);
        userAccount.password = newPassword;
        await userAccount.save();
        res.status(200).json({ 
            message: "Password Recovery Successful. You Can Log In With Your New Password Now"
        });
    } catch (err) {
        res.status(500).json({ message: err });
    }
}