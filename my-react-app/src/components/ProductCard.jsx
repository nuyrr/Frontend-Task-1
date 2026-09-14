import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useWishlist } from "../context/WishlistContext";
import { addToCart } from "../store/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  const favorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
      })
    );
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-lg">

      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110"
        aria-label={
          favorite
            ? "Remove from wishlist"
            : "Add to wishlist"
        }
      >
        <span
          className={
            favorite
              ? "text-xl text-red-500"
              : "text-xl text-gray-400"
          }
        >
          {favorite ? "♥️" : "♡"}
        </span>
      </button>

      {/* Product Image */}
      <Link to={`/product/${product.id}`}>
        <div className="flex h-64 items-center justify-center bg-gray-50 p-5">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-contain transition duration-300 hover:scale-105"
          />
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-5">

        {/* Rating */}
        <div className="mb-2 flex items-center gap-1 text-sm">
          <span className="text-yellow-500">
            ★
          </span>

          <span className="text-gray-500">
            {product.rating}
          </span>
        </div>

        {/* Title */}
        <Link to={`/product/${product.id}`}>
          <h2 className="line-clamp-2 min-h-3rem font-semibold text-gray-900 hover:text-blue-600">
            {product.title}
          </h2>
        </Link>

        {/* Category */}
        <p className="mt-2 text-sm capitalize text-gray-400">
          {product.category}
        </p>

        {/* Price */}
        <div className="mt-3">
          <span className="text-xl font-bold text-gray-900">
            ${product.price}
          </span>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>

      </div>
    </div>
  );
}

export default ProductCard;