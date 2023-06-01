//Create JWT token
const jwt = require('jsonwebtoken');

exports.createJWT = (payload, secretKey, expireTime) => {
    const token = jwt.sign(payload, secretKey, {
        expiresIn: expireTime
    });

    return token;
}