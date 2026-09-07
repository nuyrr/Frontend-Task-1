import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products?limit=100"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Failed to load home products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Flash sale products
  const flashSaleProducts = [...products]
    .sort(
      (a, b) =>
        b.discountPercentage - a.discountPercentage
    )
    .slice(0, 4);

  // Trending products
  const trendingProducts = products.slice(0, 8);

  // Categories
  const categories = [
    ...new Set(products.map((product) => product.category)),
  ].slice(0, 8);

  // Brands
  const brands = [
    ...new Set(
      products
        .map((product) => product.brand)
        .filter(Boolean)
    ),
  ].slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= HERO ================= */}
      <section className="bg-gray-900">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24">

          <div className="text-white">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-400">
              Welcome to SuperMart
            </p>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Everything you need.
              <span className="block text-blue-400">
                All in one place.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-gray-300">
              Discover amazing products, exclusive deals, and
              everyday essentials at great prices.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Shop Now
              </Link>

              <Link
                to="/products"
                className="rounded-xl border border-gray-500 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-gray-900"
              >
                Explore Products
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative flex h-72 w-full max-w-md items-center justify-center overflow-hidden rounded-3xl bg-white/10 p-8 backdrop-blur-sm sm:h-80">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-widest text-blue-300">
                  Special Offer
                </p>

                <p className="mt-3 text-6xl font-black text-white">
                  50%
                </p>

                <p className="mt-2 text-xl font-semibold text-white">
                  OFF
                </p>

                <p className="mt-3 text-sm text-gray-300">
                  On selected products
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= FLASH SALE ================= */}
      <section className="mx-auto max-w-7xl px-4 py-12">

        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-red-500">
              Limited Time
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-900">
              Flash Sale ⚡
            </h2>
          </div>

          <Link
            to="/products"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-96 animate-pulse rounded-2xl bg-white shadow-sm"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {flashSaleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="bg-white py-12">

        <div className="mx-auto max-w-7xl px-4">

          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Explore
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-900">
              Shop By Category
            </h2>

            <p className="mt-2 text-gray-500">
              Find what you're looking for quickly.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">

            {categories.map((category) => (
              <Link
                key={category}
                to={`/products?category=${encodeURIComponent(category)}`}
                className="group rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center transition hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm transition group-hover:scale-110">
                  🛍️
                </div>

                <h3 className="mt-4 font-semibold capitalize text-gray-900">
                  {category.replace("-", " ")}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Shop now →
                </p>
              </Link>
            ))}

          </div>
        </div>

      </section>

      {/* ================= TRENDING PRODUCTS ================= */}
      <section className="mx-auto max-w-7xl px-4 py-12">

        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Popular Now
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-900">
              Trending Products
            </h2>
          </div>

          <Link
            to="/products"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="h-96 animate-pulse rounded-2xl bg-white shadow-sm"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trendingProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

      </section>

      {/* ================= BRAND STRIP ================= */}
      <section className="border-y border-gray-200 bg-white py-10">

        <div className="mx-auto max-w-7xl px-4">

          <h2 className="mb-6 text-center text-xl font-bold text-gray-900">
            Popular Brands
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {brands.map((brand) => (
              <Link
                key={brand}
                to={`/products?brand=${encodeURIComponent(brand)}`}
                className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
              >
                {brand}
              </Link>
            ))}

            {brands.length === 0 && (
              <>
                <span className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-600">
                  Popular Brands
                </span>

                <span className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-600">
                  Best Sellers
                </span>

                <span className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-600">
                  Featured
                </span>
              </>
            )}
          </div>

        </div>

      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="bg-gray-900 px-4 py-16">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Stay Updated
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            Get the latest deals
          </h2>

          <p className="mt-3 text-gray-400">
            Subscribe to our newsletter and never miss an
            exclusive offer.
          </p>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              alert("Thanks for subscribing!");
            }}
            className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="flex-1 rounded-xl border border-gray-700 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>

        </div>

      </section>

    </div>
  );
}

export default Home;