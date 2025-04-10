import {$authHost} from "./index"

export const getBasket = async () => {
    const {data} = await $authHost.get('api/basket')
    return data
}

// basketAPI.js
export const fetchBasket = async () => {
    try {
        const { data } = await $authHost.get('api/basket');
        return data.basket_devices || [];
    } catch (e) {
        console.error("Ошибка fetchBasket:", e);
        return [];
    }
};

export const addToBasket = async (deviceId) => {
    const { data } = await $authHost.post('api/basket', { deviceId });
    return data;
};

export const removeFromBasket = async (id) => {
    const {data} = await $authHost.delete('api/basket/' + id)
    return data
}