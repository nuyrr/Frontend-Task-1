import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState("Medium");

  const [activeTab, setActiveTab] = useState("description");
  const [showImageZoom, setShowImageZoom] = useState(false);

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://dummyjson.com/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        setProduct(data);
        setSelectedImage(data.images?.[0] || data.thumbnail);
      } catch  {
        setError("Unable to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Fetch related products
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product?.category) return;

      try {
        setRelatedLoading(true);

        const response = await fetch(
          `https://dummyjson.com/products/category/${product.category}?limit=8`
        );

        if (!response.ok) {
          throw new Error("Unable to load related products");
        }

        const data = await response.json();

        setRelatedProducts(
          data.products.filter(
            (item) => item.id !== product.id
          )
        );
      } catch  {
        setRelatedProducts([]);
      } finally {
        setRelatedLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [product]);

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity((current) => current + 1);
    }
  };

  const decreaseQuantity = () => {
    setQuantity((current) =>
      current > 1 ? current - 1 : 1
    );
  };

  const handleAddToCart = () => {
    if (!product || product.stock <= 0) return;

    dispatch(
      addToCart({
        ...product,
        quantity,
        selectedColor,
        selectedSize,
      })
    );
  };

  const handleBuyNow = () => {
    if (!product || product.stock <= 0) return;

    dispatch(
      addToCart({
        ...product,
        quantity,
        selectedColor,
        selectedSize,
      })
    );

    navigate("/cart");
  };

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="mb-6 h-10 w-40 rounded-xl bg-gray-200" />

            <div className="grid gap-8 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2">
              <div className="h-500px rounded-2xl bg-gray-200" />

              <div className="space-y-5 p-4">
                <div className="h-5 w-24 rounded bg-gray-200" />
                <div className="h-10 w-3/4 rounded bg-gray-200" />
                <div className="h-6 w-32 rounded bg-gray-200" />
                <div className="h-10 w-40 rounded bg-gray-200" />
                <div className="h-24 w-full rounded bg-gray-200" />
                <div className="h-12 w-full rounded-xl bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-7xl text-center">
          <div className="rounded-2xl bg-white p-10 shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl">
              ⚠️
            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              Product Not Found
            </h2>

            <p className="mt-2 text-gray-500">
              {error || "This product could not be found."}
            </p>

            <button
              onClick={() => navigate("/products")}
              className="mt-6 rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  const images =
    product.images?.length > 0
      ? product.images
      : [product.thumbnail];

  const favorite = isInWishlist(product.id);

  const specifications = [
    ["Brand", product.brand || "Not specified"],
    ["Category", product.category],
    ["SKU", product.sku || `SM-${product.id}`],
    ["Weight", product.weight ? `${product.weight} g` : "Not specified"],
    [
      "Dimensions",
      product.dimensions
        ? `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth}`
        : "Not specified",
    ],
    [
      "Warranty",
      product.warrantyInformation || "Not specified",
    ],
    [
      "Shipping",
      product.shippingInformation || "Standard shipping",
    ],
    [
      "Return Policy",
      product.returnPolicy || "Standard return policy",
    ],
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:py-10">
      <div className="mx-auto max-w-7xl">

        {/* Breadcrumb / Back */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link
            to="/"
            className="transition hover:text-blue-600"
          >
            Home
          </Link>

          <span>›</span>

          <Link
            to="/products"
            className="transition hover:text-blue-600"
          >
            Products
          </Link>

          <span>›</span>

          <span className="capitalize text-gray-900">
            {product.title}
          </span>
        </div>

        {/* Main Product Section */}
        <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-2">

            {/* Product Gallery */}
            <div>
              <div className="relative flex h-350px items-center justify-center overflow-hidden rounded-2xl bg-gray-50 p-6 sm:h-450px">
                <img
                  src={selectedImage}
                  alt={product.title}
                  onClick={() => setShowImageZoom(true)}
                  className="h-full w-full cursor-zoom-in object-contain transition duration-300 hover:scale-105"
                />

                <button
                  onClick={() => setShowImageZoom(true)}
                  className="absolute bottom-4 right-4 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-md transition hover:bg-gray-900 hover:text-white"
                >
                  🔍 Zoom
                </button>

                {product.discountPercentage > 0 && (
                  <span className="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                    -{Math.round(product.discountPercentage)}%
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    onClick={() =>
                      handleThumbnailClick(image)
                    }
                    className={`flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 bg-gray-50 p-2 transition ${
                      selectedImage === image
                        ? "border-blue-600 ring-2 ring-blue-100"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div className="flex flex-col">

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
                    {product.category}
                  </p>

                  <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                    {product.title}
                  </h1>
                </div>

                <button
                  onClick={() => toggleWishlist(product)}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-2xl shadow-sm transition hover:scale-105 hover:border-red-200"
                  aria-label={
                    favorite
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                >
                  <span
                    className={
                      favorite
                        ? "text-red-500"
                        : "text-gray-400"
                    }
                  >
                    {favorite ? "♥" : "♡"}
                  </span>
                </button>
              </div>

              {/* Rating */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 rounded-lg bg-yellow-50 px-3 py-2">
                  <span className="text-yellow-500">
                    ★
                  </span>

                  <span className="font-bold text-gray-900">
                    {product.rating}
                  </span>
                </div>

                <span className="text-sm text-gray-500">
                  Customer rating
                </span>

                <span className="text-gray-300">
                  •
                </span>

                <span className="text-sm text-gray-500">
                  {product.reviews?.length || 0} reviews
                </span>
              </div>

              {/* Price */}
              <div className="mt-6 flex flex-wrap items-end gap-3">
                <span className="text-4xl font-black text-gray-900">
                  ${product.price.toFixed(2)}
                </span>

                {product.discountPercentage > 0 && (
                  <span className="mb-1 text-lg text-gray-400 line-through">
                    $
                    {(
                      product.price /
                      (1 - product.discountPercentage / 100)
                    ).toFixed(2)}
                  </span>
                )}
              </div>

              {product.discountPercentage > 0 && (
                <p className="mt-2 text-sm font-semibold text-green-600">
                  You save {product.discountPercentage.toFixed(0)}%
                  on this product
                </p>
              )}

              {/* Description */}
              <p className="mt-6 leading-7 text-gray-600">
                {product.description}
              </p>

              <div className="my-6 border-t border-gray-100" />

              {/* Color */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-sm font-bold text-gray-900">
                    Color
                  </label>

                  <span className="text-sm text-gray-500">
                    {selectedColor}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {["Black", "White", "Blue", "Red"].map(
                    (color) => (
                      <button
                        key={color}
                        onClick={() =>
                          setSelectedColor(color)
                        }
                        className={`rounded-xl border px-5 py-2 text-sm font-medium transition ${
                          selectedColor === color
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-gray-200 text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        {color}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Size */}
              <div className="mt-5">
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-sm font-bold text-gray-900">
                    Size
                  </label>

                  <span className="text-sm text-gray-500">
                    {selectedSize}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {["Small", "Medium", "Large", "XL"].map(
                    (size) => (
                      <button
                        key={size}
                        onClick={() =>
                          setSelectedSize(size)
                        }
                        className={`rounded-xl border px-5 py-2 text-sm font-medium transition ${
                          selectedSize === size
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-gray-200 text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        {size}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Stock */}
              <div className="mt-6">
                {product.stock > 0 ? (
                  <p className="text-sm font-semibold text-green-600">
                    ✓ In stock — {product.stock} available
                  </p>
                ) : (
                  <p className="text-sm font-semibold text-red-600">
                    ✕ Out of stock
                  </p>
                )}
              </div>

              {/* Quantity + Cart */}
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <div className="flex h-12 w-full items-center justify-between rounded-xl border border-gray-300 sm:w-36">
                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="h-full w-12 text-xl text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300"
                  >
                    −
                  </button>

                  <span className="font-bold text-gray-900">
                    {quantity}
                  </span>

                  <button
                    onClick={increaseQuantity}
                    disabled={
                      product.stock <= 0 ||
                      quantity >= product.stock
                    }
                    className="h-full w-12 text-xl text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="h-12 flex-1 rounded-xl bg-gray-900 px-6 font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  {product.stock > 0
                    ? `Add ${quantity} to Cart`
                    : "Out of Stock"}
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className="mt-3 h-12 w-full rounded-xl border-2 border-gray-900 bg-white font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
              >
                Buy Now
              </button>

              {/* Product Benefits */}
              <div className="mt-6 grid gap-3 border-t border-gray-100 pt-6 sm:grid-cols-3">
                <div className="rounded-xl bg-gray-50 p-4 text-center">
                  <div className="text-xl">🚚</div>
                  <p className="mt-2 text-xs font-semibold text-gray-700">
                    Fast Shipping
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4 text-center">
                  <div className="text-xl">↩️</div>
                  <p className="mt-2 text-xs font-semibold text-gray-700">
                    Easy Returns
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4 text-center">
                  <div className="text-xl">🔒</div>
                  <p className="mt-2 text-xs font-semibold text-gray-700">
                    Secure Payment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-8 rounded-2xl bg-white shadow-sm">
          <div className="flex overflow-x-auto border-b border-gray-200">
            {[
              ["description", "Description"],
              ["specifications", "Specifications"],
              ["reviews", "Reviews"],
            ].map(([tab, label]) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap border-b-2 px-5 py-4 text-sm font-semibold transition sm:px-8 ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8">

            {/* Description Tab */}
            {activeTab === "description" && (
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Product Description
                </h2>

                <p className="mt-4 max-w-4xl leading-8 text-gray-600">
                  {product.description}
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-gray-50 p-5">
                    <p className="text-sm text-gray-500">
                      Availability
                    </p>
                    <p className="mt-1 font-semibold text-gray-900">
                      {product.availabilityStatus ||
                        (product.stock > 0
                          ? "In Stock"
                          : "Out of Stock")}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-5">
                    <p className="text-sm text-gray-500">
                      Minimum Order
                    </p>
                    <p className="mt-1 font-semibold text-gray-900">
                      {product.minimumOrderQuantity || 1} item
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === "specifications" && (
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Specifications
                </h2>

                <div className="mt-5 overflow-hidden rounded-xl border border-gray-200">
                  {specifications.map(
                    ([label, value], index) => (
                      <div
                        key={label}
                        className={`grid gap-2 px-5 py-4 sm:grid-cols-3 ${
                          index % 2 === 0
                            ? "bg-gray-50"
                            : "bg-white"
                        }`}
                      >
                        <span className="text-sm font-semibold text-gray-700">
                          {label}
                        </span>

                        <span className="text-sm capitalize text-gray-600 sm:col-span-2">
                          {value}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div>
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-5xl font-black text-gray-900">
                      {product.rating}
                    </p>

                    <div className="mt-2 text-yellow-500">
                      {"★".repeat(
                        Math.round(product.rating)
                      )}
                      <span className="text-gray-300">
                        {"★".repeat(
                          5 - Math.round(product.rating)
                        )}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                      Overall product rating
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  {product.reviews?.length > 0 ? (
                    product.reviews.map(
                      (review, index) => (
                        <div
                          key={`${review.reviewerName}-${index}`}
                          className="rounded-xl border border-gray-200 p-5"
                        >
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="font-semibold text-gray-900">
                                {review.reviewerName ||
                                  "Verified Customer"}
                              </p>

                              <div className="mt-1 text-yellow-500">
                                {"★".repeat(
                                  review.rating || 5
                                )}
                                <span className="text-gray-300">
                                  {"★".repeat(
                                    5 -
                                      (review.rating || 5)
                                  )}
                                </span>
                              </div>
                            </div>

                            <span className="text-xs text-gray-400">
                              {review.date || ""}
                            </span>
                          </div>

                          <p className="mt-4 leading-7 text-gray-600">
                            {review.comment}
                          </p>
                        </div>
                      )
                    )
                  ) : (
                    <div className="rounded-xl bg-gray-50 p-8 text-center">
                      <p className="text-gray-500">
                        No reviews available for this product yet.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-10">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                You May Also Like
              </p>

              <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                Related Products
              </h2>
            </div>

            <Link
              to={`/products?category=${encodeURIComponent(
                product.category
              )}`}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View All →
            </Link>
          </div>

          {relatedLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-96 animate-pulse rounded-2xl bg-white shadow-sm"
                />
              ))}
            </div>
          ) : relatedProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts
                .slice(0, 4)
                .map((item) => (
                  <ProductCard
                    key={item.id}
                    product={item}
                  />
                ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <p className="text-gray-500">
                No related products available.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Image Zoom Modal */}
      {showImageZoom && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setShowImageZoom(false)}
        >
          <div
            className="relative flex max-h-[90vh] max-w-5xl items-center justify-center rounded-2xl bg-white p-4"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              onClick={() => setShowImageZoom(false)}
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-xl text-white transition hover:bg-red-500"
              aria-label="Close image zoom"
            >
              ×
            </button>

            <img
              src={selectedImage}
              alt={product.title}
              className="max-h-[80vh] max-w-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;