const jwt = require('jsonwebtoken');
const { BASE_URL } = require('../../config/constants')
// require("dotenv").config();
const JWT_SECRET_KEY = 'hkudhkhdkhkjdjdhuyrekjjeueyiueyueyiu3465836454khdvkdjvhjdhjjshgfj674674yesgf35'

/* JWT Tokens */

/* on-login valid customer */
/* token-payload parameter (customer-id, -username, -phone) */
/* secret/public key must be same on verify jwt */
/* Token expiresTime */
exports.jwtTokens = async (data) => {
    const createToken = await jwt.sign({ id: data.id, name: data.name, email: data.email, phone: data.phone }, JWT_SECRET_KEY/* , { expiresIn: '60s' } */);
    return createToken;
}

/* Verify-Token */
/* Token pass from Header Key- authorization --> Value [Bearer xyzTokens] */
/* Add decode tokenInfo in request object */
exports.verifyToken = async (request, response, next) => {
    try {
        const otpUrl = request.path.split("/").pop();
        let otpUpdate = null;
        if (request.path.substring(0, request.path.lastIndexOf('/')) === '/api/users/otp') {
            otpUpdate = Number.isInteger(parseInt(otpUrl)) ? `/api/users/otp/${otpUrl}` : null;
        }

        const nonSecurePaths = ['/api/users/login', '/api/users/reset-password', '/api/users/forgotpassword', otpUpdate, '/api/users/resendotp'];
        if (nonSecurePaths.includes(request.path)) return next();
        const verifyToken = request.headers.authorization.split(" ")[1]; // Bearer & token split by ' ' -->[ ]
        const decode = jwt.verify(verifyToken, JWT_SECRET_KEY);
       // console.log("actualData",decode);
        request.tokenData = decode;
        next();
    } catch (error) {
       response.status(401).json({ error: 'Invalid token1' });
      // next(error);
    }
}