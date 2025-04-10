import { makeAutoObservable, toJS } from "mobx";

export default class BasketStore {
    constructor() {
        this._basket = [];
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setBasket(items) {
        this._basket = items.map(item => ({ 
            ...item,
            device: toJS(item.device)
        }));
    }

    // Добавляем метод для удаления элемента из корзины
    removeItem(id) {
        this._basket = this._basket.filter(item => item.id !== id);
    }

    get basket() {
        return this._basket;
    }

    get totalPrice() {
        return this.basket.reduce((sum, item) => 
            sum + (item.device?.price || 0), 0);
    }
}