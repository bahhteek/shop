import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { rootStore } from "../stores/RootStore"
import { ProductCard } from "../components/ProductCard"

export const Catalog = observer(() => {
    const {productStore} = rootStore

    const {loadProducts, products} = productStore

    useEffect(() => {
        loadProducts()
    }, [])

    if (!products) return <div>Загрузка...</div>
    
    return <div>
        <div className="products-grid">
            {products.map(item => <ProductCard product={item} key={item.id}/>)}
        </div>
    </div>
})