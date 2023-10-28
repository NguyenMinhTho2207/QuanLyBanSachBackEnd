import UserService from '../services/UserService'

let createUser = async (req, res) => {
    try {
        let { email, name, phone_number, password, confirmPassword } = req.body;
        let regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        let isCheckEmail = regex.test(email);

        if (!email || !name || !phone_number || !password || !confirmPassword) {
            return res.status(200).json({
                status: "ERR",
                message: "The input is required"
            });
        }
        else if (!isCheckEmail) {
            return res.status(200).json({
                status: "ERR",
                message: "The input is email"
            });
        }
        else if (password !== confirmPassword) {
            return res.status(200).json({
                status: "ERR",
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
                status: "ERR",
                message: "The input is required"
            });
        }
        else if (!isCheckEmail) {
            return res.status(200).json({
                status: "ERR",
                message: "The input is email"
            });
        }
        else if (password !== confirmPassword) {
            return res.status(200).json({
                status: "ERR",
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

module.exports = {
    createUser,
    loginUser
}