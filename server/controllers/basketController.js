const {Basket, BasketDevice, Device} = require('../models/models')
const ApiError = require('../error/ApiError')

class BasketController {
    async getBasket(req, res) {
        try {
            const basket = await Basket.findOne({
                where: { userId: req.user.id },
                include: [{
                    model: BasketDevice,
                    include: [Device],
                    required: false // Разрешаем пустую корзину
                }]
            });
            
            // Гарантируем возврат массива
            const basketDevices = basket?.BasketDevices || [];
            
            res.json({
                success: true,
                basket_devices: basketDevices
            });
        } catch (e) {
            console.error("Ошибка получения корзины:", e);
            res.status(500).json({
                success: false,
                message: "Ошибка сервера",
                basket_devices: [] // Всегда возвращаем массив
            });
        }
    }
    

    async addToBasket(req, res, next) {
        try {
            const { deviceId } = req.body;
            const { id: userId } = req.user;
            
            // 1. Находим или создаём корзину
            const [basket] = await Basket.findOrCreate({
                where: { userId },
                defaults: { userId }
            });
            
            // 2. Добавляем устройство
            await BasketDevice.create({ basketId: basket.id, deviceId });
            
            // 3. Возвращаем ПОЛНУЮ корзину с устройствами
            const fullBasket = await Basket.findOne({
                where: { userId },
                include: [{
                    model: BasketDevice,
                    include: [Device] // Важно: включаем связанные устройства
                }]
            });
            
            res.json(fullBasket); // ← Возвращаем всю корзину с данными устройств
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