import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  saveForLater,
  moveToCart,
  removeSavedItem,
  applyCoupon,
  removeCoupon,
} from "../store/cartSlice";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();

  const { items: cartItems, savedItems, coupon } = useSelector(
    (state) => state.cart
  );

  const [couponInput, setCouponInput] = useState("");
  const [couponMessage, setCouponMessage] = useState("");

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Shipping
  const shipping = subtotal === 0 ? 0 : subtotal >= 50 ? 0 : 5;

  // Tax
  const tax = subtotal * 0.05;

  // Coupon discount
  const discount = coupon
    ? subtotal * coupon.discount
    : 0;

  // Final total
  const total = subtotal + shipping + tax - discount;

  // Apply coupon
  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();

    if (!code) {
      setCouponMessage("Please enter a coupon code.");
      return;
    }

    // Demo coupons for the internship project
    const coupons = {
      SAVE10: {
        code: "SAVE10",
        discount: 0.1,
      },
      SAVE20: {
        code: "SAVE20",
        discount: 0.2,
      },
      WELCOME15: {
        code: "WELCOME15",
        discount: 0.15,
      },
    };

    if (coupons[code]) {
      dispatch(applyCoupon(coupons[code]));
      setCouponMessage(
        `${code} applied successfully!`
      );
      setCouponInput("");
    } else {
      setCouponMessage(
        "Invalid coupon. Try SAVE10, SAVE20 or WELCOME15."
      );
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    setCouponMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Shopping Cart
          </h1>

          <p className="mt-2 text-gray-500">
            {cartItems.length}{" "}
            {cartItems.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 && savedItems.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <div className="mb-4 text-5xl">
              🛒
            </div>

            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Your cart is empty
            </h2>

            <p className="text-gray-500">
              Add some products to your cart to see them here.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-8">

            {/* Main Cart Layout */}
            {cartItems.length > 0 && (
              <div className="grid gap-8 lg:grid-cols-[1fr_350px]">

                {/* =========================
                    CART ITEMS
                ========================== */}

                <div className="space-y-4">

                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl bg-white p-4 shadow-sm sm:p-5"
                    >
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                        {/* Product Image */}
                        <Link
                          to={`/product/${item.id}`}
                          className="shrink-0"
                        >
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="h-28 w-full rounded-xl bg-gray-50 object-contain sm:h-24 sm:w-24"
                          />
                        </Link>

                        {/* Product Information */}
                        <div className="min-w-0 flex-1">

                          <Link
                            to={`/product/${item.id}`}
                            className="font-semibold text-gray-900 transition hover:text-blue-600"
                          >
                            {item.title}
                          </Link>

                          <p className="mt-1 text-sm text-gray-500">
                            Color: {item.color || "N/A"}
                          </p>

                          <p className="text-sm text-gray-500">
                            Size: {item.size || "N/A"}
                          </p>

                          <p className="mt-2 font-semibold text-gray-900">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>

                        {/* Quantity + Actions */}
                        <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">

                          {/* Quantity */}
                          <div className="flex items-center gap-3">

                            <button
                              onClick={() =>
                                dispatch(
                                  decreaseQuantity(item.id)
                                )
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 transition hover:bg-gray-100"
                              aria-label={`Decrease quantity of ${item.title}`}
                            >
                              −
                            </button>

                            <span className="min-w-5 text-center font-semibold">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                dispatch(
                                  increaseQuantity(item.id)
                                )
                              }
                              disabled={item.quantity>=item.stock}
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 transition hover:bg-gray-100"
                              aria-label={`Increase quantity of ${item.title}`}
                            >
                              +
                            </button>

                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-4">

                            <button
                              onClick={() =>
                                dispatch(
                                  saveForLater(item.id)
                                )
                              }
                              className="text-sm font-medium text-blue-600 transition hover:text-blue-800"
                            >
                              Save for later
                            </button>

                            <button
                              onClick={() =>
                                dispatch(
                                  removeFromCart(item.id)
                                )
                              }
                              className="text-sm font-medium text-red-500 transition hover:text-red-700"
                            >
                              Remove
                            </button>

                          </div>

                        </div>
                      </div>
                    </div>
                  ))}

                </div>

                {/* =========================
                    ORDER SUMMARY
                ========================== */}

                <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">

                  <h2 className="mb-6 text-xl font-bold text-gray-900">
                    Order Summary
                  </h2>

                  {/* Coupon */}
                  <div className="mb-6">

                    <label
                      htmlFor="coupon"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Coupon Code
                    </label>

                    {coupon ? (
                      <div className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 p-3">

                        <div>
                          <p className="font-semibold text-green-700">
                            {coupon.code}
                          </p>

                          <p className="text-xs text-green-600">
                            {(coupon.discount * 100).toFixed(0)}% discount applied
                          </p>
                        </div>

                        <button
                          onClick={handleRemoveCoupon}
                          className="text-sm font-medium text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>

                      </div>
                    ) : (
                      <>
                        <div className="flex gap-2">

                          <input
                            id="coupon"
                            type="text"
                            value={couponInput}
                            onChange={(event) =>
                              setCouponInput(event.target.value)
                            }
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                handleApplyCoupon();
                              }
                            }}
                            placeholder="Enter coupon"
                            className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />

                          <button
                            onClick={handleApplyCoupon}
                            className="rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                          >
                            Apply
                          </button>

                        </div>

                        <p className="mt-2 text-xs text-gray-400">
                          Try SAVE10, SAVE20 or WELCOME15
                        </p>
                      </>
                    )}

                    {couponMessage && !coupon && (
                      <p className="mt-2 text-xs text-red-500">
                        {couponMessage}
                      </p>
                    )}

                    {couponMessage && coupon && (
                      <p className="mt-2 text-xs text-green-600">
                        {couponMessage}
                      </p>
                    )}

                  </div>

                  {/* Subtotal */}
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  {/* Shipping */}
                  <div className="mt-4 flex justify-between text-gray-600">
                    <span>Shipping</span>

                    <span>
                      {shipping === 0
                        ? "FREE"
                        : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  {/* Tax */}
                  <div className="mt-4 flex justify-between text-gray-600">
                    <span>Tax (5%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  {/* Discount */}
                  {discount > 0 && (
                    <div className="mt-4 flex justify-between font-medium text-green-600">
                      <span>Discount</span>
                      <span>
                        −${discount.toFixed(2)}
                      </span>
                    </div>
                  )}

                  {/* Free Shipping Message */}
                  {subtotal > 0 && subtotal < 50 && (
                    <p className="mt-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-600">
                      Add $
                      {(50 - subtotal).toFixed(2)}
                      {" "}
                      more to get free shipping.
                    </p>
                  )}

                  {/* Divider */}
                  <div className="my-5 border-t border-gray-200" />

                  {/* Total */}
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>

                    <span>
                      ${Math.max(total, 0).toFixed(2)}
                    </span>
                  </div>

                  {/* Checkout Button */}
                  <Link
                    to="/checkout"
                    className="mt-6 block w-full rounded-xl bg-gray-900 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-600"
                  >
                    Proceed to Checkout
                  </Link>

                  {/* Continue Shopping */}
                  <Link
                    to="/products"
                    className="mt-3 block text-center text-sm font-medium text-gray-500 transition hover:text-blue-600"
                  >
                    Continue Shopping
                  </Link>

                </div>
              </div>
            )}

            {/* =========================
                SAVED FOR LATER
            ========================== */}

            {savedItems.length > 0 && (
              <section>

                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Saved for Later
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {savedItems.length} saved{" "}
                      {savedItems.length === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">

                  {savedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm"
                    >

                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="h-24 w-24 shrink-0 rounded-xl bg-gray-50 object-contain"
                      />

                      <div className="min-w-0 flex-1">

                        <Link
                          to={`/product/${item.id}`}
                          className="line-clamp-2 font-semibold text-gray-900 hover:text-blue-600"
                        >
                          {item.title}
                        </Link>

                        <p className="mt-2 font-bold text-gray-900">
                          ${item.price.toFixed(2)}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-3">

                          <button
                            onClick={() =>
                              dispatch(moveToCart(item.id))
                            }
                            className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                          >
                            Move to Cart
                          </button>

                          <button
                            onClick={() =>
                              dispatch(
                                removeSavedItem(item.id)
                              )
                            }
                            className="text-sm font-semibold text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>

                        </div>

                      </div>
                    </div>
                  ))}

                </div>
              </section>
            )}

          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;