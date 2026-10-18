import './App.css'
import { Link, Route, Routes } from 'react-router'
import { CatalogPage } from './pages/CatalogPage'
import { ProductPage } from './pages/ProductPage'
import { CartPage } from './pages/CartPage'
import { observer } from 'mobx-react-lite'
import { rootStore } from './stores/RootStore'

const App = observer(() => {
  const { cartStore } = rootStore
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Catalog</Link>
          <Link to="/cart">Cart({cartStore.totalCount})</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
})

export default App
