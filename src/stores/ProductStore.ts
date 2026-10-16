import { makeAutoObservable, runInAction } from "mobx"
import type { Product, ProductsResponse } from "../types/product"

export class ProductStore {
    products: Product[] = []
    loading: boolean = false
    error: string | null = null

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    loadProducts = async () => {
        this.loading = true
        this.error = null

        try {
            const response = await fetch("https://dummyjson.com/products?limit=20")

            if (!response.ok) throw new Error("Error")

            const data: ProductsResponse = await response.json()

            runInAction(() => {
                this.products = [...data.products]
                this.loading = false
            })
        } catch (e) {
            if (!(e instanceof Error)) return
            runInAction(() => {
                this.loading = false
                this.error = e.message
            })
        }
    }
}