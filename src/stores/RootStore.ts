import { ProductStore } from "./ProductStore";
import { CatalogStore } from "./CatalogStore";
import { CartStore } from "./CartStore";

export class RootStore {
    productStore: ProductStore
    catalogStore: CatalogStore
    cartStore: CartStore

    constructor() {
        this.productStore = new ProductStore()
        this.catalogStore = new CatalogStore()
        this.cartStore = new CartStore()
    }
}

export const rootStore = new RootStore()