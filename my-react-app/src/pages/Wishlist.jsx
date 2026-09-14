import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import  {useWishlist} from "../context/WishlistContext";
import { addToCart } from "../store/cartSlice";

function Wishlist() {
  const dispatch = useDispatch();

  const {
    wishlist,
    removeFromWishlist,
  } = useWishlist();

  const handleMoveToCart = (product) => {
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
      })
    );

    removeFromWishlist(product.id);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Wishlist
          </h1>

          <p className="mt-2 text-gray-500">
            Products you saved for later.
          </p>
        </div>

        {/* Empty Wishlist */}
        {wishlist.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <div className="mb-4 text-5xl">
              ♡
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              Your wishlist is empty
            </h2>

            <p className="mt-2 text-gray-500">
              Save products you like and find them here later.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md"
              >
                {/* Image */}
                <Link to={`/product/${product.id}`}>
                  <div className="flex h-64 items-center justify-center bg-gray-50 p-5">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-contain transition duration-300 hover:scale-105"
                    />
                  </div>
                </Link>

                {/* Information */}
                <div className="p-5">
                  <p className="text-sm capitalize text-gray-400">
                    {product.category}
                  </p>

                  <Link to={`/product/${product.id}`}>
                    <h2 className="mt-2 font-semibold text-gray-900 hover:text-blue-600">
                      {product.title}
                    </h2>
                  </Link>

                  <p className="mt-3 text-xl font-bold text-gray-900">
                    ${product.price}
                  </p>

                  {/* Buttons */}
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <Link
                      to={`/product/${product.id}`}
                      className="rounded-xl border border-gray-300 px-3 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                    >
                      View Product
                    </Link>

                    <button
                      onClick={() => handleMoveToCart(product)}
                      disabled={product.stock <= 0}
                      className="rounded-xl bg-blue-600 px-3 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                      {product.stock > 0
                        ? "Move to Cart"
                        : "Out of Stock"}
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="mt-3 w-full rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                  >
                    Remove from Wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;