import jwt from "jsonwebtoken";
const dotenv = require("dotenv");
dotenv.config();

const authMiddleWare = (req, res, next) => {
    if (req.headers.token) {
        let token = req.headers.token.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
            if (err) {
                return res.status(404).json({
                    status: "ERROR",
                    message: "The authentication",
                });
            }
    
            if (user.is_admin) {
                next();
            }
            else {
                return res.status(404).json({
                    status: "ERROR",
                    message: "The authentication",
                });
            }
    
        });
    }
    else {
        return res.status(404).json({
            status: "ERROR",
            message: "Token is missing in the headers",
        });
    }
}

const authUserMiddleWare = (req, res, next) => {
    if (req.headers.token) {
        let token = req.headers.token.split(" ")[1];
        let userId = req.params.id;
        
        jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
            if (err) {
                return res.status(404).json({
                    status: "ERROR",
                    message: "The authentication",
                });
            }

            if (user || user.id === userId) {
                next();
            }
            else {
                return res.status(404).json({
                    status: "ERROR",
                    message: "The authentication",
                });
            }
    
        });
    }
    else {
        return res.status(404).json({
            status: "ERROR",
            message: "Token is missing in the headers",
        });
    }
}

module.exports = {
    authMiddleWare,
    authUserMiddleWare
}