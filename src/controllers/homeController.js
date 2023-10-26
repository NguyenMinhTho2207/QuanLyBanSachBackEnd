import db from "../models/index"

let getUser = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getUser: getUser,   
}