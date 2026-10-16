import { makeAutoObservable } from "mobx";
import { ProductStore } from "./ProductStore";

export class RootStore {
    productStore: ProductStore

    constructor() {
        makeAutoObservable(this)

        this.productStore = new ProductStore()
    }
}

export const rootStore = new RootStore()