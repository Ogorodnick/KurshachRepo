import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {};
        // Проверяем токен при инициализации
        const token = localStorage.getItem('token');
        if (token) {
            this._isAuth = true;
        }
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
}
