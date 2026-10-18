import { observer } from "mobx-react-lite";
import { rootStore } from "../stores/RootStore";

export const CartPage = observer(() => {
    const {cartStore} = rootStore
    const {items, decrease, increase, remove, clear, totalCount, totalPrice} = cartStore

    if (!items.length) return <div>Корзина пуста</div>

    return <div className="cart">
        <div className="cart-items">
            {items.map(item => <div className="cart-item" key={item.id}>
                <div className="cart-item-img">
                    <img src={item.thumbnail} alt={item.title} />
                </div>
                <div>
                    <p>{item.title}</p>
                    <p>{item.price}</p>
                    <p>{item.count}</p>
                </div>
                <div className="pult">
                    <button onClick={() => increase(item.id)}>+</button>
                    <button onClick={() => decrease(item.id)}>-</button>
                    <button onClick={() => remove(item.id)}>remove</button>
                </div>
            </div>)}
        </div>
        <div>Количество {totalCount}</div>
        <div>Стоимость {totalPrice}</div>
        <button onClick={() => clear()}>clear</button>
    </div>
})