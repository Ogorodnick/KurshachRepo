import {makeAutoObservable} from "mobx";
import {deleteBrand, deleteDevice, deleteType, fetchDevices} from "../http/deviceAPI";


export default class DeviceStore {
    constructor() {
        this._types = []
        this._brands = []
        this._devices = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 2
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
        if (this._selectedType && this._selectedType.id === type?.id) {
          this._selectedType = {};
        } else {
          this._selectedType = type;
        }
        this.setPage(1);
      }
      
      setSelectedBrand(brand) {
        if (this._selectedBrand && this._selectedBrand.id === brand?.id) {
          this._selectedBrand = {};
        } else {
          this._selectedBrand = brand;
        }
        this.setPage(1);
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

    async fetchDevices() {
        try {
          const data = await fetchDevices(
            this.selectedType.id || null,
            this.selectedBrand.id || null,
            this.page,
            this.limit
          );
          this.setDevices(data.rows);
          this.setTotalCount(data.count);
        } catch (e) {
          console.error("Ошибка при загрузке устройств:", e);
        }
      }
      

}
