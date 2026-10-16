import type { Product } from "../types/product"
import { Link } from "react-router"

export const ProductCard = ({product}: {product: Product}) => {
    const {title, thumbnail, price, id} = product
    return <div className="product-card">
        <img src={thumbnail} alt={title} />
        <div className="product-card-info">
            <Link className="product-card-title" to={`/product/${id}`}>{title}</Link>
            <div className="product-card-price">{price}</div>
        </div>
    </div>
}