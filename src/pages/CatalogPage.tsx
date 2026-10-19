import { observer } from "mobx-react-lite"
import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { rootStore } from "../stores/RootStore"
import { ProductCard } from "../components/ProductCard"
import clsx from "clsx"

export const CatalogPage = observer(() => {
    const {catalogStore} = rootStore
    const {loadProducts, visibleProducts, loading, error, categories, loadCategories, category, setCategory, setSearch, search} = catalogStore
    const [searchValue, setSearchValue] = useState(search)
    const timerId = useRef<ReturnType<typeof setTimeout>>(undefined)

    useEffect(() => {
        loadProducts()
        loadCategories()
    }, [])

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timerId.current)
        setSearchValue(e.target.value)
        timerId.current = setTimeout(() => {
            setSearch(e.target.value)
        }, 1000)
    }

    const clearSearch = () => {
        clearTimeout(timerId.current)
        setSearch("")
        setSearchValue("")
    }
    
    return <div>
        <div className="search">
            <input onChange={onSearchChange} value={searchValue} />
            <span className="search-clear" onClick={clearSearch}>Clear</span>
        </div>
        {!!categories.length && <div className="categories">
            <div className={clsx("categories-item", !category && "active")} onClick={() => setCategory("")}>All</div>
            {categories.map(item => <div className={clsx("categories-item", item.slug === category && "active")} key={item.slug} onClick={() => setCategory(item.slug)}>{item.name}</div>)}
        </div>}
        {loading ? <div className="loading">
            <div className="loading-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader preview-icon"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>
            </div>
        </div> : <div className="products-body">
            {error ? <div>Ошибка: {error}</div> :
            visibleProducts.length ? <div className="products-grid">{visibleProducts.map(item => <ProductCard product={item} key={item.id}/>)}</div> : <div className="product-not-found">Ничего не найдено</div>
            }
        </div>
        }
    </div>
})