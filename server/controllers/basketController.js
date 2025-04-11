const {Basket, BasketDevice, Device} = require('../models/models')
const ApiError = require('../error/ApiError')

class BasketController {
    async getBasket(req, res) {
        try {
            const [basket] = await Basket.findOrCreate({
                where: { userId: req.user.id },
                defaults: { userId: req.user.id },
                include: [{
                    model: BasketDevice,
                    as: 'basket_devices',
                    include: [Device],
                    required: false
                }]
            });
            
            res.json({
                success: true,
                id: basket.id,
                createdAt: basket.createdAt,
                updatedAt: basket.updatedAt,
                userId: basket.userId,
                basket_devices: basket.basket_devices || [] 
            });
            
        } catch (e) {
            console.error("Ошибка получения корзины:", e);
            res.status(500).json({
                success: false,
                message: "Ошибка сервера",
                basket_devices: []
            });
        }
    }
    

    async addToBasket(req, res, next) {
        try {
            const { deviceId } = req.body;
            const { id: userId } = req.user;
            
            const [basket] = await Basket.findOrCreate({
                where: { userId },
                defaults: { userId }
            });
            
            await BasketDevice.create({ basketId: basket.id, deviceId });
            
            const fullBasket = await Basket.findOne({
                where: { userId },
                include: [{
                    model: BasketDevice,
                    include: [Device] 
                }]
            });
            
            res.json(fullBasket);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    

    async removeFromBasket(req, res, next) {
        try {
            const {id} = req.params
            await BasketDevice.destroy({where: {id}})
            return res.json({message: 'Товар удален из корзины'})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new BasketController()