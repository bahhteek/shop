export type Product = {
    id: number,
    title: string,
    price: number,
    category: string,
    thumbnail: string,
    rating: number,
    stock: number,
    description: string,
    images: string[],
    brand?: string
}

export type ProductsResponse = {
    products: Product[],
    total: number,
    skip: number,
    limit: number
}