import { describe, expect, it } from "vitest";
import { buildProductsUrl } from "./buildProductsUrl";

describe("buildProductsUrl", () => {
    it("Без category и search", () => {
        expect(buildProductsUrl({})).toEqual("/products?limit=20")
    })

    it("С saerch", () => {
        expect(buildProductsUrl({search: "phone"})).toEqual("/products/search?q=phone&limit=20")
    })

    it("С category", () => {
        expect(buildProductsUrl({category: "beauty"})).toEqual("/products/category/beauty?limit=20")
    })

    it("Тест кодирования", () => {
        expect(buildProductsUrl({search: "red phone"})).toEqual("/products/search?q=red%20phone&limit=20")
        expect(buildProductsUrl({search: "salt & pepper"})).toEqual("/products/search?q=salt%20%26%20pepper&limit=20")
        expect(buildProductsUrl({search: "телефон"})).toEqual("/products/search?q=%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD&limit=20")
    })
})