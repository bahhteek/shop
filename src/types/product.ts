export type Product = {
    id: number,
    title: string,
    price: number,
    category: string,
    thumbnail: string,
    rating: number,
    stock: number
}

export type ProductsResponse = {
    products: Product[],
    total: number,
    skip: number,
    limit: number
}