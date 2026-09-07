import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

function Account() {
  const { wishlist } = useWishlist();

  const orders = [
    {
      id: "SM-1001",
      date: "September 5, 2026",
      status: "Delivered",
      total: 149.99,
    },
    {
      id: "SM-1002",
      date: "September 2, 2026",
      status: "Processing",
      total: 89.5,
    },
  ];

  const addresses = [
    {
      id: 1,
      type: "Home",
      name: "Your Name",
      address: "123 Main Street",
      city: "Lahore",
      country: "Pakistan",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Account
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your profile, orders, wishlist and addresses.
          </p>
        </div>

        {/* Profile Card */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
              U
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Welcome back!
              </h2>

              <p className="mt-1 text-gray-500">
                Manage your SuperMart account
              </p>
            </div>

            <Link
              to="/products"
              className="sm:ml-auto rounded-xl bg-gray-900 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-600"
            >
              Continue Shopping
            </Link>

          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid gap-8 lg:grid-cols-3">

          {/* Orders */}
          <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">

            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Order History
              </h2>

              <span className="text-sm text-gray-500">
                {orders.length} orders
              </span>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-xl border border-gray-200 p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                      <p className="font-semibold text-gray-900">
                        {order.id}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {order.date}
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p className="font-bold text-gray-900">
                        ${order.total.toFixed(2)}
                      </p>

                      <span
                        className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Quick Links */}
          <div className="space-y-4">

            <Link
              to="/wishlist"
              className="block rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-gray-900">
                    Wishlist
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Your saved products
                  </p>
                </div>

                <span className="text-2xl text-red-500">
                  ♥
                </span>
              </div>

              <p className="mt-4 text-2xl font-bold text-gray-900">
                {wishlist.length}
              </p>
            </Link>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="font-bold text-gray-900">
                Account Settings
              </h2>

              <div className="mt-4 space-y-3">
                <button className="w-full rounded-xl border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                  Profile Settings
                </button>

                <button className="w-full rounded-xl border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                  Change Password
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Saved Addresses */}
        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              Saved Addresses
            </h2>

            <button className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600">
              + Add Address
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="rounded-xl border border-gray-200 p-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">
                    {address.type}
                  </h3>

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
                    Default
                  </span>
                </div>

                <p className="mt-3 font-medium text-gray-800">
                  {address.name}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {address.address}
                </p>

                <p className="text-sm text-gray-500">
                  {address.city}, {address.country}
                </p>

                <div className="mt-4 flex gap-3">
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                    Edit
                  </button>

                  <button className="text-sm font-medium text-red-500 hover:text-red-600">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

        </section>

      </div>
    </div>
  );
}

export default Account;