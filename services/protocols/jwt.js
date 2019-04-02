const jwt = require('jsonwebtoken');

class JwtToken {

    static generateToken(payload, secret) {
        return jwt.sign(
            payload,
            secret,
            {
                expiresIn: '1h'
            }
        );
    }

    static verifyToken(token, secret, next) {
        try {
            jwt.verify(token, secret, next);
        } catch (e) {
            next(e, null);
        }
    }
}

module.exports = JwtToken;
