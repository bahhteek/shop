import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { rootStore } from "../stores/RootStore"
import { ProductCard } from "../components/ProductCard"

export const CatalogPage = observer(() => {
    const {productStore} = rootStore

    const {loadProducts, products, loading, error} = productStore

    useEffect(() => {
        loadProducts()
    }, [])

    if (loading) return <div>Загрузка...</div>
    if (error) return <div>Ошибка: {error}</div>
    
    return <div>
        <div className="products-grid">
            {products.map(item => <ProductCard product={item} key={item.id}/>)}
        </div>
    </div>
})