import { useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useSelector } from "react-redux";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { wishlist } = useWishlist();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="text-xl font-bold text-gray-900 sm:text-2xl"
        >
          SuperMart
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">

          {/* Products */}
          <Link
            to="/products"
            className="font-medium text-gray-700 transition hover:text-blue-600"
          >
            Products
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative flex items-center text-gray-700 transition hover:text-red-500"
          >
            <span className="text-2xl">♡</span>

            {wishlist.length > 0 && (
              <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            aria-label="Shopping Cart"
            className="relative flex items-center text-xl text-gray-700 transition hover:text-blue-600"
          >
            🛒

            {cartCount > 0 && (
              <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Account */}
          <Link
  to="/account"
  aria-label="Account"
  title="Account"
  className="flex items-center text-gray-700 transition hover:text-blue-600"
>
  <span className="text-2xl">👤</span>
</Link>

          {/* Login */}
          <Link
            to="/login"
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Login
          </Link>

          {/* Signup */}
          <Link
            to="/signup"
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          className="rounded-lg p-2 text-2xl text-gray-700 transition hover:bg-gray-100 md:hidden"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t bg-white px-4 py-4 shadow-sm md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">

            {/* Products */}
            <Link
              to="/products"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-100 hover:text-blue-600"
            >
              🛍️ Products
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              onClick={closeMenu}
              className="flex items-center justify-between rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
            >
              <span>♡ Wishlist</span>

              {wishlist.length > 0 && (
                <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              onClick={closeMenu}
              className="flex items-center justify-between rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
            >
              <span>🛒 Cart</span>

              {cartCount > 0 && (
                <span className="rounded-full bg-blue-600 px-2 py-1 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              to="/account"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-100 hover:text-blue-600"
            >
              👤 Account
            </Link>

            {/* Login */}
            <Link
              to="/login"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              Login
            </Link>

            {/* Signup */}
            <Link
              to="/signup"
              onClick={closeMenu}
              className="rounded-xl bg-blue-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
            >
              Sign Up
            </Link>

          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;