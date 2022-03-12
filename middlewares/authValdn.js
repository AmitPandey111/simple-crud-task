var jwt = require('jsonwebtoken');
const {verifyToken}=require('../utils/jsonWebToken/jwt')
const authValdn = async (req, res, next) => {
    try {
        verifyToken(req,res);
    } catch (error) {
        res.status(500).json({ data: null, message: "Unauthorized", code: 500, }); 
    }  
}
module.exports = { authValdn }