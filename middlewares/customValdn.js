var AuthKey= require('../config/constants')
var ClientServiceKey= require('../config/constants')
var app = require('../app');
var bin=require('../bin/www')
const customValdn = async (req, res, next) => {
    try {
        const customAuth = req.headers.auth_key
        const customClient = req.headers.client_service;
        if (AuthKey.AUTH_KEY == customAuth && ClientServiceKey.CLIENT_SERVICE_KEY == customClient) {
            next();
        }
        else {
            return res.status(401).json({ data: null, message: "Unauthorized", code: 401 })
        }
    } catch (error) {
        return res.status(500).json({ data: null, message: "Custom middleware error", code: 500 });
    }
}
module.exports = { customValdn }