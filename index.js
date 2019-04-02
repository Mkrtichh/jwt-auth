(function (auth) {
    const config = require('./config');
    const Utils = require('./utils');
    const Sequelize = require('sequelize');
    const bcrypt = require('bcrypt');
    const protocols = require('./services/protocols');

    const SqlMethods = require('./services/queryRequester');
    const Models = require('./models');
    var sequelize = null;

    auth.initDb = (options = {
        database: 'db_name',
        username: 'username',
        password: null,
        dialect: 'postgres',
        host: "localhost",
        port: 5432,
    }) => {
        sequelize = new Sequelize(options);
        sequelize && Models.init(sequelize)
        sequelize && SqlMethods.init(sequelize);

    };

    auth.signUpUser = async (model = {
        username: 'username',
        email: 'example@gmail.com',
        password: null
    }, next) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(model.password, salt);
        const {password, ...user} = model;
        try {
            const createdUser = await SqlMethods.create('User', {...user, hash, salt});
            next(null, {success: !!createdUser})
        } catch (e) {
            next(e, null)
        }
    };

    auth.loginUser = async (model = {}, next) => {

        if (!model) throw new Error('No username or password');

        const isEmail = Utils.validateEmail(model.email || model.username);
        const query = isEmail ? {email: model.email} : {username: model.username};

        const user = await SqlMethods.select('User', query, false);
        if (!user) {
            throw new Error('user not found');
        }

        const hash = bcrypt.hashSync(model.password, user.salt);
        if (user.hash !== hash) {
            throw new Error('Incorect username or password');
        }
        const payload = {
            sub: user.email || user.username,
            iat: Date.now(),
            email: user.email || user.username
        };
        try {
            const jwt = protocols.jwt.generateToken(payload, config.secret);
            next(null, jwt);
        } catch (e) {
            next(e, null);
        }
    }

    auth.authenticate = (req, res, next) => {

        let token = req.headers['x-access-token'] || req.headers['authorization'];
        if (req.headers && token) {
            let parts = token.split(' ');
            if (parts.length === 2 && parts[0] === "Bearer") {
                token = parts[1];
            }
        }
        if (token) {
            return protocols.jwt.verifyToken(token, config.secret, (err, decoded) => {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Token is not valid'
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.json({
                success: false,
                message: 'Auth token is not supplied'
            });
        }
    }

})(module.exports);

