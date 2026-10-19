export function buildProductsUrl(params:{category?: string, search?: string}) {
    if (params.search?.trim()) {
      return `/products/search?q=${encodeURIComponent(params.search.trim())}&limit=20`
    } else if (params.category?.trim()) {
      return `/products/category/${encodeURIComponent(params.category.trim())}?limit=20`
    }

    return "/products?limit=20"
}