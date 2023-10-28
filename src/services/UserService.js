import db from "../models/index"
import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(10);

let createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkUser = await db.User.findOne({
                where: {
                    email: data.email
                }
            });

            if (checkUser !== null) {
                resolve({
                    status: "OK",
                    message: "The email is already",
                });
            }

            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            let userData = await db.User.create({
                email: data.email,
                name: data.name,
                phone_number: data.phone_number,
                password: hashPasswordFromBcrypt,
                is_admin: data.is_admin
            });

            if (userData) {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: userData
                });
            }
        } catch (error) {
            reject(error);
        }
    });
}

let loginUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkUser = await db.User.findOne({
                where: {
                    email: data.email
                }
            });

            if (checkUser === null) {
                resolve({
                    status: "OK",
                    message: "The user is not defined",
                });
            }

            let comparePassword = bcrypt.compareSync(data.password, checkUser.password);

            if (!comparePassword) {
                resolve({
                    status: "OK",
                    message: "The password or user is incorrect",
                });
            }
        
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: checkUser
            });
        } catch (error) {
            reject(error);
        }
    });
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(e);
        }
    });
}

module.exports = {
    createUser,
    loginUser
}