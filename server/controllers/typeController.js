const {Type} = require('../models/models')
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

    async delete(req, res) {
        try {
            const {id} = req.params
            await Type.destroy({where: {id}})
            return res.json({message: 'Категория удалена'})
        } catch (e) {
            return ApiError.internal(e.message)
        }
    }

}

module.exports = new TypeController()
