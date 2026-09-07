             
import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { useDispatch,  useSelector } from "react-redux";
import { clearCart } from "../store/cartSlice";
function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [error, setError] = useState("");

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
  event.preventDefault();

  const {
    fullName,
    email,
    phone,
    address,
    city,
    postalCode,
  } = formData;

  if (
    !fullName.trim() ||
    !email.trim() ||
    !phone.trim() ||
    !address.trim() ||
    !city.trim() ||
    !postalCode.trim()
  ) {
    setError("Please fill in all required fields.");
    return;
  }

  setError("");

  const order = {
    orderNumber: `ORD-${Date.now()}`,
    customer: {
      fullName,
      email,
      phone,
      address,
      city,
      postalCode,
    },
    items: cartItems,
    total: subtotal,
    status: "Confirmed",
  };

  localStorage.setItem("lastOrder", JSON.stringify(order));

  dispatch(clearCart());

  navigate("/order-confirmation");
};

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-10 text-center shadow-sm">

          <h1 className="mb-3 text-2xl font-bold text-gray-900">
            Your cart is empty
          </h1>

          <p className="mb-6 text-gray-500">
            Add a product before proceeding to checkout.
          </p>

          <Link
            to="/products"
            className="inline-block rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
          >
            Continue Shopping
          </Link>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Page Heading */}
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Checkout
        </h1>

        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">

          {/* ================================================= */}
          {/* SHIPPING FORM */}
          {/* ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-6 shadow-sm"
          >

            <h2 className="mb-6 text-xl font-bold text-gray-900">
              Shipping Information
            </h2>

            {/* Error Message */}
            {error && (
              <p className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <div className="space-y-5">

              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>

                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                />
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter your shipping address"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                />
              </div>

              {/* City + Postal Code */}
              <div className="grid gap-5 sm:grid-cols-2">

                {/* City */}
                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>

                  <input
                    id="city"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                  />
                </div>

                {/* Postal Code */}
                <div>
                  <label
                    htmlFor="postalCode"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Postal Code
                  </label>

                  <input
                    id="postalCode"
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="Postal code"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                  />
                </div>

              </div>

            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              className="mt-8 w-full rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-600 active:scale-[0.98]"
            >
              Place Order
            </button>

          </form>

          {/* ================================================= */}
          {/* ORDER SUMMARY */}
          {/* ================================================= */}

          <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            {/* Cart Items */}
            <div className="space-y-4">

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4"
                >

                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-16 w-16 rounded-lg bg-gray-50 object-contain"
                  />

                  <div className="min-w-0 flex-1">

                    <p className="truncate text-sm font-semibold text-gray-900">
                      {item.title}
                    </p>

                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>

                    <p className="text-sm text-gray-500">
                      {item.color} / {item.size}
                    </p>

                  </div>

                  <p className="text-sm font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                </div>
              ))}

            </div>

            {/* Divider */}
            <div className="my-6 border-t border-gray-200" />

            {/* Subtotal */}
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>

              <span>
                ${subtotal.toFixed(2)}
              </span>
            </div>

            {/* Shipping */}
            <div className="mt-3 flex justify-between text-gray-600">
              <span>Shipping</span>

              <span>Free</span>
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-gray-200" />

            {/* Total */}
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>

              <span>
                ${subtotal.toFixed(2)}
              </span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Checkout;