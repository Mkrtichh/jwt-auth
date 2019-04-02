((model) => {
    const user = require('./user');
    model.init = (orm) => {
        const User = user(orm);
    }
})(module.exports);
