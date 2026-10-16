import './App.css'
import { Link, Route, Routes } from 'react-router'
import { Catalog } from './pages/Catalog'
import { Product } from './pages/Product'
import { Cart } from './pages/Cart'

function App() {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Catalog</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App
