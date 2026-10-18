import { makeAutoObservable, runInAction } from "mobx"
import type { Product } from "../types/product"

export class ProductStore {
    product: Product | null = null
    loading: boolean = false
    error: string | null = null
    controller: AbortController | null = null

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    loadProduct = async (id: string) => {
        if (!id) return
        this.controller?.abort()

        const controller = new AbortController()
        this.controller = controller
        const { signal } = this.controller

        this.loading = true
        this.error = null
        this.product = null

        try {
            const response = await fetch(`https://dummyjson.com/products/${id}`, {signal})
            
            const data = await response.json()

            if (!response.ok) throw new Error(data.message)

            if (signal.aborted) return

            runInAction(() => {
                this.product = {...data}
                this.loading = false;
                this.error = null
            })
        } catch (e) {
            if (!(e instanceof Error)) return
            if (e.name === "AbortError") return
            
            runInAction(() => {
                this.loading = false;
                this.error = e.message
            })
        }
    }
}