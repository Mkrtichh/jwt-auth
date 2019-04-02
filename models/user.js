const Sequelize = require('sequelize');
module.exports = (sequelize) => {
    return sequelize.define('User', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: Sequelize.STRING,
            email: Sequelize.STRING,
            hash: Sequelize.TEXT,
            salt: Sequelize.TEXT,
        },
        {
            indexes: [
                // Create a unique index on email
                {
                    unique: true,
                    fields: ['email']
                }
            ]
        }
    );
};
