import { beforeEach, describe, expect, it } from 'vitest';
import { CartStore } from './CartStore';
import type { Product } from '../types/product';

function makeProduct(overrides: Pick<Product, "id" | "title" | "price">): Product {
    return { 
        id: overrides.id, 
        title: overrides.title, 
        price: overrides.price,
        thumbnail: "", 
        images: [""], 
        category: "", 
        rating: 1, 
        stock: 1, 
        description: ""
    }
}

describe('CartStore', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it("Один товар добавлен дважды, одна позиция с count 2", () => {
        let cartStore: CartStore = new CartStore()
        const productExample: Product = makeProduct({id: 1, title: "Essence Mascara Lash Princess", price: 10}) 

        expect(cartStore.items).toEqual([])
        cartStore.addProduct(productExample)
        expect(cartStore.items).toEqual([{id: 1, title: "Essence Mascara Lash Princess", price: 10, thumbnail: "", count: 1}])
        cartStore.addProduct(productExample)
        expect(cartStore.items).toEqual([{id: 1, title: "Essence Mascara Lash Princess", price: 10, thumbnail: "", count: 2}])
    })

    it("в позиции нет лишних полей", () => {
        let cartStore: CartStore = new CartStore()
        const productExample: Product = makeProduct({id: 1, title: "Essence Mascara Lash Princess", price: 10})

        cartStore.addProduct(productExample)
        const currentProduct = cartStore.items.find(item => item.id === 1)
        expect(currentProduct).not.toHaveProperty("description")
    })

    it("increase у первой позиции не меняет порядок", () => {
        let cartStore: CartStore = new CartStore()

        const productExample: Product = makeProduct({id: 1, title: "Essence Mascara Lash Princess", price: 10})
        const productExample2: Product = makeProduct({id: 2, title: "Test 2", price: 12})

        cartStore.addProduct(productExample)
        cartStore.addProduct(productExample2)

        cartStore.increase(1)

        expect(cartStore.items[0]).toEqual({id: 1, title: "Essence Mascara Lash Princess", price: 10, thumbnail: "", count: 2})
    })

    it("decrease на единице удаляет позицию", () => {
        let cartStore: CartStore = new CartStore()

        const productExample: Product = makeProduct({id: 1, title: "Essence Mascara Lash Princess", price: 10})

        cartStore.addProduct(productExample)

        cartStore.increase(1)
        cartStore.increase(1)

        expect(cartStore.items).toEqual([{id: 1, title: "Essence Mascara Lash Princess", price: 10, thumbnail: "", count: 3}])

        cartStore.decrease(1)
        cartStore.decrease(1)
        cartStore.decrease(1)

        expect(cartStore.items).toEqual([])
    })

    it("totalPrice для товара за 0.79 равен '0.79', а для 9.99 × 3 — '29.97'", () => {
        let cartStore: CartStore = new CartStore()

        const productExample: Product = makeProduct({id: 1, title: "Essence Mascara Lash Princess", price: 0.79})
        
        cartStore.addProduct(productExample)

        expect(cartStore.totalPrice).toEqual("0.79")

        cartStore.clear()
        
        const productExample2: Product = makeProduct({id: 1, title: "Essence Mascara Lash Princess", price: 9.99})

        cartStore.addProduct(productExample2)

        cartStore.increase(1)
        cartStore.increase(1)

        expect(cartStore.totalCount).toEqual(3)
        expect(cartStore.totalPrice).toEqual("29.97")
    })
})