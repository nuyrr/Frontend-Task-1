import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

function Wishlist() {
  const {
    wishlist,
    removeFromWishlist,
  } = useWishlist();

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
                className="overflow-hidden rounded-2xl bg-white shadow-sm"
              >

                {/* Image */}
                <Link to={`/product/${product.id}`}>
                  <div className="flex h-64 items-center justify-center bg-gray-50 p-5">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-contain"
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
                  <div className="mt-5 flex gap-3">

                    <Link
                      to={`/product/${product.id}`}
                      className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                    >
                      View Product
                    </Link>

                    <button
                      onClick={() =>
                        removeFromWishlist(product.id)
                      }
                      className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                    >
                      Remove
                    </button>

                  </div>

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