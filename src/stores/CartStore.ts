import { makeAutoObservable, reaction } from 'mobx';
import { type CartItem, type Product } from './../types/product';

export class CartStore {
    items: CartItem[] = JSON.parse(localStorage.getItem("cart-items") ?? "[]")

    constructor(){
        makeAutoObservable(this, {}, {autoBind: true})

        reaction(
            () => this.items, 
            (items: CartItem[]) => {
                localStorage.setItem("cart-items", JSON.stringify(items))
            }
        )
    }

    addProduct(product: Product) {        
        if (!this.items.find(item => item.id === product.id)) {
            this.items = [...this.items, {id: product.id, title: product.title, price: product.price, thumbnail: product.thumbnail, count: 1}]
            return
        }

        this.increase(product.id)
    }

    increase(id: number) {
        this.items = this.items.map(item => id === item.id ? {...item, count: item.count + 1} : item)
    }

    decrease(id: number) {
        if (this.items.find(item => item.id === id)?.count === 1) {
            this.remove(id)
            return
        }

        this.items = this.items.map(item => id === item.id ? {...item, count: item.count - 1} : item)
    }

    remove(id: number) {
        this.items = this.items.filter(item => item.id !== id)
    }

    clear() {
        this.items = []
    }

    get totalCount() {
        return this.items.reduce((acc, item) => acc + item.count, 0)
    }

    get totalPrice() {
        return this.items.reduce((acc, item) => acc + item.count * item.price, 0).toFixed(2)
    }
}