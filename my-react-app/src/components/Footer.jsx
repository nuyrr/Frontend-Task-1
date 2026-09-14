import { Link } from "react-router-dom";

function Footer() {
  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <footer className="border-t bg-gray-900 text-gray-300">
      {/* Newsletter */}
      <div className="border-b border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Stay in the loop
            </h2>

            <p className="mt-2 max-w-xl text-sm text-gray-400">
              Subscribe to our newsletter for new products, exclusive deals,
              and special offers.
            </p>
          </div>

          <form
            onSubmit={handleNewsletterSubmit}
            className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              aria-label="Email address"
              className="min-w-0 flex-1 rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500"
            />

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}
        <div>
          <Link
            to="/"
            className="text-2xl font-bold text-white"
          >
            SuperMart
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
            Your trusted online marketplace for quality products, great deals,
            and a simple shopping experience.
          </p>

          {/* Social Icons */}
          <div className="mt-6 flex gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-sm font-bold transition hover:bg-blue-600 hover:text-white"
            >
              f
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-sm font-bold transition hover:bg-pink-600 hover:text-white"
            >
              ◎
            </a>

            <a
              href="#"
              aria-label="Twitter"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-sm font-bold transition hover:bg-blue-500 hover:text-white"
            >
              𝕏
            </a>

            <a
              href="#"
              aria-label="YouTube"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-sm font-bold transition hover:bg-red-600 hover:text-white"
            >
              ▶
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white">
            Quick Links
          </h3>

          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link
                to="/"
                className="transition hover:text-white"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/products"
                className="transition hover:text-white"
              >
                Products
              </Link>
            </li>

            <li>
              <Link
                to="/wishlist"
                className="transition hover:text-white"
              >
                Wishlist
              </Link>
            </li>

            <li>
              <Link
                to="/cart"
                className="transition hover:text-white"
              >
                Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-semibold text-white">
            Customer Service
          </h3>

          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a
                href="#"
                className="transition hover:text-white"
              >
                Help Center
              </a>
            </li>

            <li>
              <a
                href="#"
                className="transition hover:text-white"
              >
                Shipping Information
              </a>
            </li>

            <li>
              <a
                href="#"
                className="transition hover:text-white"
              >
                Returns & Refunds
              </a>
            </li>

            <li>
              <a
                href="#"
                className="transition hover:text-white"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="font-semibold text-white">
            My Account
          </h3>

          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link
                to="/account"
                className="transition hover:text-white"
              >
                My Account
              </Link>
            </li>

            <li>
              <Link
                to="/login"
                className="transition hover:text-white"
              >
                Login
              </Link>
            </li>

            <li>
              <Link
                to="/signup"
                className="transition hover:text-white"
              >
                Create Account
              </Link>
            </li>

            <li>
              <Link
                to="/order-confirmation"
                className="transition hover:text-white"
              >
                Order Tracking
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-center text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>
            © {new Date().getFullYear()} SuperMart. All rights reserved.
          </p>

          <div className="flex justify-center gap-5 sm:justify-end">
            <a
              href="#"
              className="transition hover:text-white"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="transition hover:text-white"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;