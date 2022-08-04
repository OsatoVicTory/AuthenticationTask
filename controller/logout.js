exports.logout = (req, res) => {
    res.status(200).json({ message : `User Logged Out`});
}