exports.showUser = (req, res) => {
    res.status(200).json({ message : `Welcome user ${req.user.firstname}`})
}

exports.showStaff = (req, res) => {
    res.status(200).json({ message : `Welcome staff ${req.user.firstname}`})
}

exports.showAdmin = (req, res) => {
    res.status(200).json({ message : `Welcome admin ${req.user.firstname}`})
}

exports.showManager = (req, res) => {
    res.status(200).json({ message : `Welcome manger ${req.user.firstname}`})
}