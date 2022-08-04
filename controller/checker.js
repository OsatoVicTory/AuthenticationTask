exports.checkUser = (req, res, next) => {
    if(req.user.role !== "user") {
        return res.status(401).json({ message: "This Route is Strictly for Regular User" });
    }
    next();
}

exports.checkStaff = (req, res, next) => {
    if(req.user.role !== "staff") {
        return res.status(401).json({ message: "Not a Staff" });
    }
    next();
}

exports.checkAdmin = (req, res, next) => {
    if(req.user.role !== "admin") {
        return res.status(401).json({ message: "Not an Admin" });
    }
    next();
}

exports.checkManager = (req, res, next) => {
    if(req.user.role !== "manager") {
        return res.status(401).json({ message: "Not a Manager" });
    }
    next();
}
