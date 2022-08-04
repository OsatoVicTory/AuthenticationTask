const jwt = require("jsonwebtoken");
require("dotenv").config();
const { MYLITTLESECRET } = process.env;

exports.authUser = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(401).json({ message: "Authorization header required" })
    }
    let splittedHeader = req.headers.authorization.split(" ");
    if(splittedHeader[0] !== "Bearer") {
        return res.status(401).json({ message: "Authorization format is bearer token" })
    }

    let token = splittedHeader[1];

    jwt.verify(token, MYLITTLESECRET, (err, decodedToken) => {
        if(err) res.status(500).json({ message: err });

        if(!decodedToken) {
            return res.status(401).json({ message: "Invalid Authorization Token" });
        }
        req.user = decodedToken;
        next();
    })
}