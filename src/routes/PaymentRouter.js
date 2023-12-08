import express from "express";
const routes = express.Router();
let dotenv = require("dotenv");
dotenv.config();

routes.get('/config', (req, res) => {
    return res.status(200).json({
        status: 'OK',
        data: process.env.CLIENT_ID
    })
} );

module.exports = routes;