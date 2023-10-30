import jwt from "jsonwebtoken";
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (req, res, next) => {
    if (req.headers.token) {
        let token = req.headers.token.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
            if (err) {
                return res.status(404).json({
                    status: "ERROR",
                    message: "The authentication",
                });
            }
    
            let { payload } = user;
    
            if (payload.is_admin) {
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

const authUserMiddleware = (req, res, next) => {
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
    
            let { payload } = user;
    
            if (payload.is_admin || payload.id === userId) {
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
    authMiddleware,
    authUserMiddleware
}