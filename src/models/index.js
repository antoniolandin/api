const pathModels = (process.env.ENGINE_DB === 'nosql') ? './nosql' : './mysql'

const models = {
    commerceModel : require(`${pathModels}/commerces`),
    userModel : require(`${pathModels}/users`),
}

module.exports = models
