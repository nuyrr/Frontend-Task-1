import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import OrderConfirmation from "./pages/OrderConfirmation";
import { WishlistProvider } from "./context/WishlistContext";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import Footer from "./components/Footer";
function App() {
  return (
    <WishlistProvider>
    <BrowserRouter>
    <Navbar/>
      <Routes>
         <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> 
           <Route path="/signup" element={<Signup />} />  
         <Route path="/account" element={<Account />} /> 
         <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} /> 
         <Route path="/cart" element={<Cart />}/> 
          <Route path="/wishlist"element={<Wishlist />}/> 
           <Route path="/checkout" element={<Checkout />} /> 
         <Route path="/order-confirmation"element={<OrderConfirmation />}

/>
      </Routes>
    <Footer/>
    </BrowserRouter>
    </WishlistProvider>
  );
}

export default App;