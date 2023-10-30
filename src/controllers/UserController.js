import UserService from '../services/UserService';
import JwtService from '../services/JwtService';

let createUser = async (req, res) => {
    try {
        let { email, name, phone_number, password, confirmPassword } = req.body;
        let regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        let isCheckEmail = regex.test(email);

        if (!email || !name || !phone_number || !password || !confirmPassword) {
            return res.status(200).json({
                status: "ERROR",
                message: "The input is required"
            });
        }
        else if (!isCheckEmail) {
            return res.status(200).json({
                status: "ERROR",
                message: "The input is email"
            });
        }
        else if (password !== confirmPassword) {
            return res.status(200).json({
                status: "ERROR",
                message: "The password is equal confirmPassword"
            });
        }

        let response = await UserService.createUser(req.body);
        return res.status(200).json(response);

    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let loginUser = async (req, res) => {
    try {
        let { email, name, phone_number, password, confirmPassword } = req.body;
        let regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        let isCheckEmail = regex.test(email);

        if (!email || !name || !phone_number || !password || !confirmPassword) {
            return res.status(200).json({
                status: "ERROR",
                message: "The input is required"
            });
        }
        else if (!isCheckEmail) {
            return res.status(200).json({
                status: "ERROR",
                message: "The input is email"
            });
        }
        else if (password !== confirmPassword) {
            return res.status(200).json({
                status: "ERROR",
                message: "The password is equal confirmPassword"
            });
        }

        let response = await UserService.loginUser(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let updateUser = async (req, res) => {
    try {
        let userId = req.params.id;
        let data = req.body;
        if (!userId) {
            return res.status(200).json({
                status: "ERROR",
                message: "The userId is require"
            });
        }

        let response = await UserService.updateUser(userId, data);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let deleteUser = async (req, res) => {
    try {
        let userId = req.params.id;
        if (!userId) {
            return res.status(200).json({
                status: "ERROR",
                message: "The userId is require"
            });
        }

        let response = await UserService.deleteUser(userId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let getAllUser = async (req, res) => {
    try {
        let response = await UserService.getAllUser();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let getDetailUser = async (req, res) => {
    try {
        let userId = req.params.id;
        if (!userId) {
            return res.status(200).json({
                status: "ERROR",
                message: "The userId is require"
            });
        }

        let response = await UserService.getDetailUser(userId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let refreshToken = async (req, res) => {
    try {
        let token = req.headers.token.split(' ')[1];
        if (!token) {
            return res.status(200).json({
                status: "ERROR",
                message: "The token is require"
            });
        }

        let response = await JwtService.refreshTokenJwtService(token);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser,
    refreshToken
}