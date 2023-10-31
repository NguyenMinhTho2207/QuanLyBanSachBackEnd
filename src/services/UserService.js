import db from "../models/index"
import bcrypt from "bcrypt";
import { generalAccessToken, generalRefreshToken } from './JwtService';
const salt = bcrypt.genSaltSync(10);

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
                    message: "Success",
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

            let access_token = await generalAccessToken({
                id: checkUser.id,
                is_admin: checkUser.is_admin
            });

            let refresh_token = await generalRefreshToken({
                id: checkUser.id,
                is_admin: checkUser.is_admin
            });
        
            resolve({
                status: "OK",
                message: "Success",
                access_token,
                refresh_token
            });
        } catch (error) {
            reject(error);
        }
    });
}

let updateUser = (userId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkUser = await db.User.findOne({
                where: {
                    id: userId
                },
                raw: true
            });

            if (checkUser) {
                data.password = await hashUserPassword(data.password);
                data.updatedAt = new Date();
                
                await db.User.update(
                    data, 
                    {
                    where: {
                        id: userId
                    }
                });

                let updatedUser = await db.User.findOne({
                    where: {
                        id: userId
                    },
                    raw: true
                })

                resolve({
                    status: "OK",
                    message: "Success",
                    data: updatedUser
                });
            }
            else {
                resolve({
                    status: "OK",
                    message: "The user is not defined",
                });
            }   
        } catch (error) {
            reject(error);
        }
    });
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkUser = await db.User.findOne({
                where: {
                    id: userId
                },
                raw: true
            });

            if (checkUser) {
                await db.User.destroy({
                    where: {
                        id: userId
                    }
                });1

                resolve({
                    status: "OK",
                    message: "Delete user success",
                });
            }
            else {
                resolve({
                    status: "OK",
                    message: "The user is not defined",
                });
            }
        
            
        } catch (error) {
            reject(error);
        }
    });
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allUser = await db.User.findAll();

            resolve({
                status: "OK",
                message: "Success",
                data: allUser
            });
        } catch (error) {
            reject(error);
        }
    });
}

let getDetailUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: userId
                },
                raw: true
            });

            if (user) {
                resolve({
                    status: "OK",
                    message: "Success",
                    data: user
                });
            }
            else {
                resolve({
                    status: "OK",
                    message: "The user is not defined",
                });
            }
        
            
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser
}