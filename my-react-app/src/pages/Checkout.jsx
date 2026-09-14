import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store/cartSlice";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const coupon = useSelector((state) => state.cart.coupon);

  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [shippingMethod, setShippingMethod] = useState("standard");

  const [paymentMethod, setPaymentMethod] = useState("card");

  const [cardData, setCardData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discount = coupon
    ? subtotal * coupon.discount
    : 0;

  const discountedSubtotal = subtotal - discount;

  const shippingCost =
    shippingMethod === "express"
      ? 10
      : discountedSubtotal >= 50
        ? 0
        : 5;

  const tax = discountedSubtotal * 0.05;

  const total = discountedSubtotal + shippingCost + tax;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handleCardChange = (event) => {
    const { name, value } = event.target;

    setCardData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const validateAddress = () => {
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
      setError("Please fill in all required address fields.");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid phone number.");
      return false;
    }

    return true;
  };

  const validatePayment = () => {
    if (paymentMethod === "cod") {
      return true;
    }

    const {
      cardName,
      cardNumber,
      expiry,
      cvv,
    } = cardData;

    if (
      !cardName.trim() ||
      !cardNumber.trim() ||
      !expiry.trim() ||
      !cvv.trim()
    ) {
      setError("Please complete all payment details.");
      return false;
    }

    const cleanCardNumber = cardNumber.replace(/\s/g, "");

    if (!/^\d{16}$/.test(cleanCardNumber)) {
      setError("Card number must contain 16 digits.");
      return false;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      setError("Expiry date must use MM/YY format.");
      return false;
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      setError("Please enter a valid CVV.");
      return false;
    }

    return true;
  };

  const goToNextStep = () => {
    setError("");

    if (currentStep === 1) {
      if (!validateAddress()) return;
    }

    if (currentStep === 2) {
      if (!shippingMethod) {
        setError("Please select a shipping method.");
        return;
      }
    }

    if (currentStep === 3) {
      if (!validatePayment()) return;
    }

    setCurrentStep((step) => Math.min(step + 1, 4));
  };

  const goToPreviousStep = () => {
    setError("");
    setCurrentStep((step) => Math.max(step - 1, 1));
  };

  const handlePlaceOrder = () => {
    setError("");

    const order = {
      orderNumber: `ORD-${Date.now()}`,

      customer: {
        ...formData,
      },

      shipping: {
        method: shippingMethod,
        cost: shippingCost,
      },

      payment: {
        method: paymentMethod,
      },

      items: cartItems,

      pricing: {
        subtotal,
        discount,
        shipping: shippingCost,
        tax,
        total,
      },

      total,

      status: "Confirmed",

      estimatedDelivery:
        shippingMethod === "express"
          ? "2–3 business days"
          : "4–7 business days",

      trackingReference: `TRK-${Date.now()
        .toString()
        .slice(-8)}`,
    };

    localStorage.setItem(
      "lastOrder",
      JSON.stringify(order)
    );

    dispatch(clearCart());

    navigate("/order-confirmation");
  };

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-10 text-center shadow-sm">
          <div className="mb-4 text-5xl">🛒</div>

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

  const steps = [
    {
      number: 1,
      title: "Address",
    },
    {
      number: 2,
      title: "Shipping",
    },
    {
      number: 3,
      title: "Payment",
    },
    {
      number: 4,
      title: "Review",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Secure Checkout
          </p>

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Checkout
          </h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex min-w-520px items-center justify-between rounded-2xl bg-white p-4 shadow-sm sm:p-6">

            {steps.map((step, index) => {
              const completed = currentStep > step.number;
              const active = currentStep === step.number;

              return (
                <div
                  key={step.number}
                  className="flex flex-1 items-center"
                >
                  <div className="flex items-center gap-3">

                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition ${
                        completed || active
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {completed ? "✓" : step.number}
                    </div>

                    <div>
                      <p
                        className={`text-sm font-semibold ${
                          active || completed
                            ? "text-blue-600"
                            : "text-gray-400"
                        }`}
                      >
                        Step {step.number}
                      </p>

                      <p
                        className={`text-sm font-medium ${
                          active
                            ? "text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        {step.title}
                      </p>
                    </div>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`mx-3 h-px flex-1 ${
                        currentStep > step.number
                          ? "bg-blue-600"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}

          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

          {/* Main Checkout */}
          <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600"
              >
                {error}
              </div>
            )}

            {/* ==========================================
                STEP 1 — ADDRESS
            ========================================== */}
            {currentStep === 1 && (
              <section>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Delivery Address
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Enter the address where you'd like your order delivered.
                  </p>
                </div>

                <div className="space-y-5">

                  <div>
                    <label
                      htmlFor="fullName"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Full Name *
                    </label>

                    <input
                      id="fullName"
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Email *
                      </label>

                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Phone *
                      </label>

                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="03XX XXXXXXX"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Street Address *
                    </label>

                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="4"
                      placeholder="House number, street, area..."
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">

                    <div>
                      <label
                        htmlFor="city"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        City *
                      </label>

                      <input
                        id="city"
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Your city"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="postalCode"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Postal Code *
                      </label>

                      <input
                        id="postalCode"
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        placeholder="Postal code"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                  </div>

                </div>
              </section>
            )}

            {/* ==========================================
                STEP 2 — SHIPPING
            ========================================== */}
            {currentStep === 2 && (
              <section>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Shipping Method
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Choose how quickly you'd like to receive your order.
                  </p>
                </div>

                <div className="space-y-4">

                  <label
                    className={`flex cursor-pointer items-center gap-4 rounded-xl border p-5 transition ${
                      shippingMethod === "standard"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value="standard"
                      checked={shippingMethod === "standard"}
                      onChange={(event) =>
                        setShippingMethod(event.target.value)
                      }
                      className="h-5 w-5 accent-blue-600"
                    />

                    <div className="flex-1">
                      <div className="flex flex-col justify-between gap-2 sm:flex-row">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Standard Shipping
                          </h3>

                          <p className="mt-1 text-sm text-gray-500">
                            Estimated delivery: 4–7 business days
                          </p>
                        </div>

                        <p className="font-bold text-gray-900">
                          {discountedSubtotal >= 50
                            ? "FREE"
                            : "$5.00"}
                        </p>
                      </div>
                    </div>
                  </label>

                  <label
                    className={`flex cursor-pointer items-center gap-4 rounded-xl border p-5 transition ${
                      shippingMethod === "express"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value="express"
                      checked={shippingMethod === "express"}
                      onChange={(event) =>
                        setShippingMethod(event.target.value)
                      }
                      className="h-5 w-5 accent-blue-600"
                    />

                    <div className="flex-1">
                      <div className="flex flex-col justify-between gap-2 sm:flex-row">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Express Shipping
                          </h3>

                          <p className="mt-1 text-sm text-gray-500">
                            Estimated delivery: 2–3 business days
                          </p>
                        </div>

                        <p className="font-bold text-gray-900">
                          $10.00
                        </p>
                      </div>
                    </div>
                  </label>

                </div>
              </section>
            )}

            {/* ==========================================
                STEP 3 — PAYMENT
            ========================================== */}
            {currentStep === 3 && (
              <section>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Payment Method
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Select your preferred payment method.
                  </p>
                </div>

                <div className="mb-6 grid gap-4 sm:grid-cols-2">

                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod("card");
                      setError("");
                    }}
                    className={`rounded-xl border p-5 text-left transition ${
                      paymentMethod === "card"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="mb-2 text-2xl">💳</div>

                    <h3 className="font-semibold text-gray-900">
                      Credit / Debit Card
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Pay securely with your card.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod("cod");
                      setError("");
                    }}
                    className={`rounded-xl border p-5 text-left transition ${
                      paymentMethod === "cod"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="mb-2 text-2xl">💵</div>

                    <h3 className="font-semibold text-gray-900">
                      Cash on Delivery
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Pay when your order arrives.
                    </p>
                  </button>

                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-5 rounded-xl border border-gray-200 p-5">

                    <div>
                      <label
                        htmlFor="cardName"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Name on Card *
                      </label>

                      <input
                        id="cardName"
                        type="text"
                        name="cardName"
                        value={cardData.cardName}
                        onChange={handleCardChange}
                        placeholder="Cardholder name"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="cardNumber"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Card Number *
                      </label>

                      <input
                        id="cardNumber"
                        type="text"
                        inputMode="numeric"
                        name="cardNumber"
                        value={cardData.cardNumber}
                        onChange={(event) => {
                          const value = event.target.value
                            .replace(/\D/g, "")
                            .slice(0, 16);

                          setCardData((current) => ({
                            ...current,
                            cardNumber: value,
                          }));

                          setError("");
                        }}
                        placeholder="1234567890123456"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">

                      <div>
                        <label
                          htmlFor="expiry"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          Expiry *
                        </label>

                        <input
                          id="expiry"
                          type="text"
                          name="expiry"
                          value={cardData.expiry}
                          onChange={(event) => {
                            let value = event.target.value
                              .replace(/\D/g, "")
                              .slice(0, 4);

                            if (value.length > 2) {
                              value =
                                value.slice(0, 2) +
                                "/" +
                                value.slice(2);
                            }

                            setCardData((current) => ({
                              ...current,
                              expiry: value,
                            }));

                            setError("");
                          }}
                          placeholder="MM/YY"
                          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="cvv"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          CVV *
                        </label>

                        <input
                          id="cvv"
                          type="password"
                          inputMode="numeric"
                          name="cvv"
                          value={cardData.cvv}
                          onChange={(event) => {
                            const value = event.target.value
                              .replace(/\D/g, "")
                              .slice(0, 4);

                            setCardData((current) => ({
                              ...current,
                              cvv: value,
                            }));

                            setError("");
                          }}
                          placeholder="123"
                          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>

                    </div>
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                    <h3 className="font-semibold text-green-800">
                      Cash on Delivery selected
                    </h3>

                    <p className="mt-1 text-sm text-green-700">
                      You'll pay for your order when it is delivered.
                    </p>
                  </div>
                )}
              </section>
            )}

            {/* ==========================================
                STEP 4 — REVIEW
            ========================================== */}
            {currentStep === 4 && (
              <section>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Review Your Order
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Check your information before placing the order.
                  </p>
                </div>

                <div className="space-y-5">

                  {/* Address */}
                  <div className="rounded-xl border border-gray-200 p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-bold text-gray-900">
                        Delivery Address
                      </h3>

                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                    </div>

                    <p className="font-medium text-gray-900">
                      {formData.fullName}
                    </p>

                    <p className="mt-1 text-sm text-gray-600">
                      {formData.address}
                    </p>

                    <p className="text-sm text-gray-600">
                      {formData.city}, {formData.postalCode}
                    </p>

                    <p className="mt-2 text-sm text-gray-600">
                      {formData.email} · {formData.phone}
                    </p>
                  </div>

                  {/* Shipping */}
                  <div className="rounded-xl border border-gray-200 p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-bold text-gray-900">
                        Shipping
                      </h3>

                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                    </div>

                    <p className="font-medium capitalize text-gray-900">
                      {shippingMethod === "express"
                        ? "Express Shipping"
                        : "Standard Shipping"}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {shippingMethod === "express"
                        ? "2–3 business days"
                        : "4–7 business days"}
                    </p>
                  </div>

                  {/* Payment */}
                  <div className="rounded-xl border border-gray-200 p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-bold text-gray-900">
                        Payment
                      </h3>

                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                    </div>

                    <p className="font-medium text-gray-900">
                      {paymentMethod === "card"
                        ? "Credit / Debit Card"
                        : "Cash on Delivery"}
                    </p>

                    {paymentMethod === "card" && (
                      <p className="mt-1 text-sm text-gray-500">
                        Card ending in{" "}
                        {cardData.cardNumber.slice(-4)}
                      </p>
                    )}
                  </div>

                  {/* Products */}
                  <div className="rounded-xl border border-gray-200 p-5">
                    <h3 className="mb-4 font-bold text-gray-900">
                      Items
                    </h3>

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
                            <p className="font-semibold text-gray-900">
                              {item.title}
                            </p>

                            <p className="text-sm text-gray-500">
                              Qty: {item.quantity}
                            </p>
                          </div>

                          <p className="font-semibold text-gray-900">
                            $
                            {(
                              item.price * item.quantity
                            ).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </section>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-between">

              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  ← Back
                </button>
              ) : (
                <Link
                  to="/cart"
                  className="rounded-xl border border-gray-200 px-6 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  ← Back to Cart
                </Link>
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={goToNextStep}
                  className="rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
                >
                  Place Order
                </button>
              )}

            </div>
          </div>

          {/* ==========================================
              ORDER SUMMARY
          ========================================== */}
          <aside className="h-fit lg:sticky lg:top-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <h2 className="mb-6 text-xl font-bold text-gray-900">
                Order Summary
              </h2>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-16 w-16 shrink-0 rounded-lg bg-gray-50 object-contain"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {item.title}
                      </p>

                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="text-sm font-semibold text-gray-900">
                      $
                      {(
                        item.price * item.quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="my-6 border-t border-gray-200" />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>
                      Discount{" "}
                      {coupon?.code
                        ? `(${coupon.code})`
                        : ""}
                    </span>

                    <span>
                      −${discount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>

                  <span>
                    {shippingCost === 0
                      ? "FREE"
                      : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Tax (5%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="my-5 border-t border-gray-200" />

              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {discountedSubtotal < 50 &&
                shippingMethod === "standard" && (
                  <p className="mt-4 rounded-xl bg-blue-50 p-3 text-sm text-blue-600">
                    Add $
                    {(50 - discountedSubtotal).toFixed(2)}
                    {" "}
                    more for free standard shipping.
                  </p>
                )}

              <div className="mt-6 rounded-xl bg-gray-50 p-4">
                <div className="flex gap-3 text-sm text-gray-600">
                  <span>🔒</span>
                  <span>Secure checkout</span>
                </div>

                <div className="mt-3 flex gap-3 text-sm text-gray-600">
                  <span>🚚</span>
                  <span>Reliable delivery</span>
                </div>

                <div className="mt-3 flex gap-3 text-sm text-gray-600">
                  <span>↩️</span>
                  <span>Easy returns</span>
                </div>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

export default Checkout;