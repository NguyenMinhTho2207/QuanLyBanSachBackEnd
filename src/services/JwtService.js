import jwt from "jsonwebtoken";
const dotenv = require("dotenv");
dotenv.config();

export const generalAccessToken = async (payload) => {
    let access_token = jwt.sign({
        payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '30s' });

    return access_token;
}

export const generalRefreshToken = async (payload) => {
    let refresh_token = jwt.sign({
        payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '7d' });

    return refresh_token;
}

export const refreshTokenJwtService = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    resolve({
                        status: "ERROR",
                        message: "The authentication"
                    });
                }
                let { payload } = user
                let access_token = await generalAccessToken({
                    id: payload.id,
                    is_admin: payload.is_admin
                });

                resolve({
                    status: "OK",
                    message: "Success",
                    access_token: access_token
                });
            });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    generalAccessToken,
    generalRefreshToken,
    refreshTokenJwtService
}