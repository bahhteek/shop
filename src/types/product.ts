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

export type CartItem = Pick<Product, "id" | "title" | "price" | "thumbnail"> & { count: number }

export type Category = {
    slug: string,
    name: string,
    url: string
}