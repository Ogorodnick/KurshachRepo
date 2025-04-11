import {makeAutoObservable} from "mobx";
import {deleteBrand, deleteDevice, deleteType} from "../http/deviceAPI";


export default class DeviceStore {
    constructor() {
        this._types = []
        this._brands = []
        this._devices = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setDevices(devices) {
        this._devices = devices
    }

    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this.setPage(1)
        this._selectedBrand = brand
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get devices() {
        return this._devices
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }

    async deleteDevice(id) {
        try {
            await deleteDevice(id)
            this._devices = this._devices.filter(d => d.id !== id)
        } catch (e) {
            console.error("Delete error:", e)
        }
    }

    async deleteBrand(id) {
        try {
            await deleteBrand(id)
            this._brands = this._brands.filter(b => b.id !== id)
        } catch (e) {
            console.error("Delete error:", e)
        }
    }

    async deleteType(id) {
        try {
            await deleteType(id)
            this._types = this._types.filter(t => t.id !== id)
        } catch (e) {
            console.error("Delete error:", e)
        }
    }

}
