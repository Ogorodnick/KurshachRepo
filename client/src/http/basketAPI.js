import {$authHost} from "./index"

export const getBasket = async () => {
    const {data} = await $authHost.get('api/basket')
    return data
}

export const addToBasket = async (deviceId) => {
    console.log("Отправляем deviceId:", deviceId); // Логирование
    const { data } = await $authHost.post('api/basket', { deviceId });
    console.log("Полученные данные:", data); // Логирование
    return data;
};

export const removeFromBasket = async (id) => {
    const {data} = await $authHost.delete('api/basket/' + id)
    return data
}

export const fetchBasket = async () => {
    try {
        const { data } = await $authHost.get('api/basket');
        if (!data?.success) {
            throw new Error(data?.message || "Ошибка сервера");
        }
        return data.basket_devices || []; // Всегда возвращаем массив
    } catch (e) {
        console.error("Ошибка fetchBasket:", e);
        return []; // Возвращаем пустой массив при ошибке
    }
};