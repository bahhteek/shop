import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { useParams } from "react-router"
import { rootStore } from "../stores/RootStore"
import { Link } from "react-router"

export const ProductPage = observer(() => {
    const { id } = useParams()
    const {productStore, cartStore} = rootStore
    const {loadProduct, product, loading, error} = productStore
    const {addProduct} = cartStore

    useEffect(() => {
        if (!id) return

        loadProduct(id)
    }, [id])

    if (loading) return <div>Загрузка</div>

    if (error) return <div>Ошибка: {error}</div>

    if (!product) return null

    const {images, title, brand, description, price} = product

    return <div className="product">
        <div className="product-image">
            <img src={images[0]} alt={title} />
        </div>
        <div className="product-title">{title}</div>
        {brand && <div className="product-brand">{brand}</div>}
        <div className="product-descr">{description}</div>
        <div className="product-price">{price}</div>
        <button onClick={() => addProduct(product)}>В корзину</button>
        <Link to="/">В каталог</Link>
    </div>
})