import { makeAutoObservable, reaction, runInAction } from "mobx"
import type { Category, Product, ProductsResponse } from "../types/product"
import { buildProductsUrl } from "../utils/buildProductsUrl";

const api = "https://dummyjson.com"

export class CatalogStore {
  products: Product[] = [];
  loading: boolean = false;
  error: string | null = null;
  search: string = "";
  category: string = "";
  categories: Category[] = []
  controller: AbortController | null = null

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    reaction(() => buildProductsUrl({search: this.search, category: this.category}), () => {
      this.loadProducts()
    })
  }

  setCategory(value: string) {
    this.category = value
  }

  setSearch(value: string) {
    this.search = value
  }

  get visibleProducts() {
    if (!this.category || !this.search) return this.products
    return this.products.filter(item => item.category.toLowerCase() === this.category.toLowerCase())
  }

  loadCategories = async () => {
    try {
      const response = await fetch(`${api}/products/categories`)
      const data = await response.json()

      if (!response.ok) throw new Error(`HTTP error: ${response.statusText}`)

      runInAction(() => {
        this.categories = data
      })
    } catch (e) {
      if (!(e instanceof Error)) return

      console.log(e)
    }
  }

  loadProducts = async () => {
    this.controller?.abort()

    const controller = new AbortController()
    this.controller = controller
    const { signal } = this.controller
    this.loading = true;
    this.error = null;
    

    try {
      const url = buildProductsUrl({category: this.category, search: this.search})

      const response = await fetch(`${api}/${url}`, {signal});

      const data: ProductsResponse = await response.json();

      if (signal.aborted) return

      if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

      runInAction(() => {
        this.products = [...data.products];
        this.loading = false;
      });
    } catch (e) {
      if (!(e instanceof Error)) return;
      if (e.name === "AbortError") return;
      runInAction(() => {
        this.loading = false;
        this.error = e.message;
      });
    }
  };
}