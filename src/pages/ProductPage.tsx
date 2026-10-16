import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { useParams } from "react-router"
import { rootStore } from "../stores/RootStore"
import { Link } from "react-router"

export const ProductPage = observer(() => {
    const { id } = useParams()
    const {productStore} = rootStore
    const {loadProduct, product, loading, error} = productStore

    useEffect(() => {
        if (!id) return

        loadProduct(id)
    }, [])

    if (loading) return <div>Загрузка</div>

    if (error) return <div>Ошибка: {error}</div>

    return <div className="product">
        <div className="product-image">
            <img src={product?.images[0]} alt={product?.title} />
        </div>
        <div className="product-title">{product?.title}</div>
        {product?.brand && <div className="product-brand">{product?.brand}</div>}
        <div className="product-descr">{product?.description}</div>
        <div className="product-price">{product?.price}</div>
        <Link to="/catalog">В каталог</Link>
    </div>
})