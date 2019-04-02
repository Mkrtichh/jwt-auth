(function (sqlMethods) {

    sqlMethods.init = (sequelize) => {

        sqlMethods.select = (modelName, data, many = true) => {
            return new Promise((resolve, reject) =>
                sequelize.models[modelName][many ? 'findAll' : 'findOne'](data)
                    .then(response => resolve(response.dataValues))
                    .catch(reject))
        };

        sqlMethods.create = (modelName, data) => {
            return new Promise((resolve, reject) =>
                sequelize.models[modelName]["create"](data)
                    .then(response => resolve(response.dataValues))
                    .catch(reject))
        };

        sqlMethods.update = (modelName, data, valueToSet) => {
            return new Promise((resolve, reject) =>
                sequelize[modelName]['update'](valueToSet, {where: data})
                    .then(response => resolve(response.dataValues))
                    .catch(reject))

        };

        sqlMethods.delete = (modelName, data) => {
            return new Promise((resolve, reject) =>
                sequelize[modelName]['destroy']({where: data})
                    .then(response => resolve(response.dataValues))
                    .catch(reject))
        }
    }


})(module.exports);
