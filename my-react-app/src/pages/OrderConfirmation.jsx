// import { Link } from "react-router-dom";

// function OrderConfirmation() {
//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-10">
//       <div className="mx-auto max-w-2xl">

//         <div className="rounded-2xl bg-white p-8 text-center shadow-sm">

//           {/* Success Icon */}
//           <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
//             <span className="text-4xl text-green-600">
//               ✓
//             </span>
//           </div>

//           {/* Heading */}
//           <h1 className="mb-3 text-3xl font-bold text-gray-900">
//             Order Confirmed!
//           </h1>

//           {/* Message */}
//           <p className="mb-8 text-gray-500">
//             Thank you for your purchase. Your order has been placed
//             successfully.
//           </p>

//           {/* Order Information */}
//           <div className="mb-8 rounded-xl bg-gray-50 p-5 text-left">

//             <h2 className="mb-4 text-lg font-bold text-gray-900">
//               Order Details
//             </h2>

//             <div className="space-y-3 text-sm">

//               <div className="flex justify-between">
//                 <span className="text-gray-500">
//                   Order Status
//                 </span>

//                 <span className="font-semibold text-green-600">
//                   Confirmed
//                 </span>
//               </div>

//               <div className="flex justify-between">
//                 <span className="text-gray-500">
//                   Payment Status
//                 </span>

//                 <span className="font-semibold text-gray-900">
//                   Pending
//                 </span>
//               </div>

//               <div className="flex justify-between">
//                 <span className="text-gray-500">
//                   Shipping
//                 </span>

//                 <span className="font-semibold text-gray-900">
//                   Free
//                 </span>
//               </div>

//             </div>

//           </div>

//           {/* Continue Shopping */}
//           <Link
//             to="/products"
//             className="inline-block rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
//           >
//             Continue Shopping
//           </Link>

//         </div>

//       </div>
//     </div>
//   );
// }

// export default OrderConfirmation;
import { Link } from "react-router-dom";

function OrderConfirmation() {
  const savedOrder = localStorage.getItem("lastOrder");

  const order = savedOrder
    ? JSON.parse(savedOrder)
    : null;

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-10 text-center shadow-sm">

          <h1 className="mb-3 text-2xl font-bold text-gray-900">
            No Order Found
          </h1>

          <p className="mb-6 text-gray-500">
            We couldn't find a recent order.
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
      <div className="mx-auto max-w-3xl">

        {/* Success Card */}
        <div className="rounded-2xl bg-white p-8 shadow-sm">

          {/* Success Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <span className="text-4xl text-green-600">
              ✓
            </span>
          </div>

          {/* Heading */}
          <div className="text-center">

            <h1 className="mb-3 text-3xl font-bold text-gray-900">
              Order Confirmed!
            </h1>

            <p className="text-gray-500">
              Thank you for your purchase, {order.customer.fullName}.
            </p>

          </div>

          {/* Order Number */}
          <div className="mt-8 rounded-xl bg-gray-50 p-5">

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

              <span className="text-sm text-gray-500">
                Order Number
              </span>

              <span className="font-semibold text-gray-900">
                {order.orderNumber}
              </span>

            </div>

          </div>

          {/* Items */}
          <div className="mt-8">

            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Order Items
            </h2>

            <div className="space-y-4">

              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-xl border border-gray-100 p-4"
                >

                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-20 w-20 rounded-lg bg-gray-50 object-contain"
                  />

                  <div className="min-w-0 flex-1">

                    <h3 className="font-semibold text-gray-900">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>

                    <p className="text-sm text-gray-500">
                      {item.color} / {item.size}
                    </p>

                  </div>

                  <p className="font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Customer Information */}
          <div className="mt-8 rounded-xl bg-gray-50 p-5">

            <h2 className="mb-4 text-lg font-bold text-gray-900">
              Shipping Information
            </h2>

            <div className="space-y-2 text-sm text-gray-600">

              <p>
                <strong>Name:</strong>{" "}
                {order.customer.fullName}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {order.customer.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {order.customer.phone}
              </p>

              <p>
                <strong>Address:</strong>{" "}
                {order.customer.address}
              </p>

              <p>
                <strong>City:</strong>{" "}
                {order.customer.city}
              </p>

              <p>
                <strong>Postal Code:</strong>{" "}
                {order.customer.postalCode}
              </p>

            </div>

          </div>

          {/* Summary */}
          <div className="mt-8 border-t border-gray-200 pt-6">

            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="mt-3 flex justify-between text-xl font-bold text-gray-900">
              <span>Total</span>

              <span>
                ${order.total.toFixed(2)}
              </span>
            </div>

          </div>

          {/* Status */}
          <div className="mt-6 flex justify-between rounded-xl bg-green-50 p-4">

            <span className="text-sm text-gray-600">
              Order Status
            </span>

            <span className="text-sm font-semibold text-green-600">
              {order.status}
            </span>

          </div>

          {/* Continue Shopping */}
          <div className="mt-8 text-center">

            <Link
              to="/products"
              className="inline-block rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}

export default OrderConfirmation;