import UserService from '../services/UserService';
import JwtService from '../services/JwtService';

let createUser = async (req, res) => {
    try {
        let { email, password, confirmPassword } = req.body;
        let regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        let isCheckEmail = regex.test(email);

        if (!email || !password || !confirmPassword) {
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
                message: "Password and Confirm Password does not match"
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
        let { email, password } = req.body;
        let regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        let isCheckEmail = regex.test(email);

        if (!email || !password) {
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

        let response = await UserService.loginUser(req.body);
        let { refresh_token, ...newResponse } = response; // không trả access_token
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true, // chỉ lấy dc refresh_token thông qua http (ko lấy được qua js)
            secure: false, // bảo mật phía client
            sameSite: 'strict'
        });
        return res.status(200).json(newResponse);
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
        let token = req.cookies.refresh_token;
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

let logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({
            status: "OK",
            message: 'Logout seccessfully'
        });
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
    refreshToken,
    logoutUser
}