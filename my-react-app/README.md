# SuperMart - Multi-Vendor E-Commerce Marketplace

A modern, responsive multi-vendor e-commerce marketplace built with React.js, Vite, Tailwind CSS, React Router, Redux Toolkit, and Context API.

The project provides a complete shopping experience including product discovery, search, filtering, wishlist management, cart management, checkout, authentication UI, and order confirmation.

---

## 🚀 Live Demo

[View Live Demo](https://vercel.com/team-5369/frontend-task-1-q7eg/8MFuhVZFiAPmgGnxWGWNgax8Ponk)

## 📦 GitHub Repository

[View Source Code](https://github.com/nuyrr/Frontend-Task-1)

---

## ✨ Features

### 🏠 Home Page
- Hero section
- Product categories
- Flash sale section
- Trending products
- Brand section
- Newsletter section
- Responsive layout

### 🛍️ Product Listing
- Product search
- Search suggestions
- Category filtering
- Brand filtering
- Price range filtering
- Rating filtering
- Availability filtering
- Product sorting
- Grid/List view
- Load More functionality
- Applied filter chips
- Empty search state
- Skeleton loading UI

### 🔎 Product Search
- Debounced search
- Instant product suggestions
- Search by product title
- Search by description
- Search by brand
- Search by category
- Search and filter state preserved in URL

### 📦 Product Details
- Product image gallery
- Image zoom
- Product information
- Product variants
- Quantity selector
- Product description
- Specifications
- Reviews
- Related products
- Wishlist functionality
- Add to Cart
- Buy Now
- Delivery information

### 🛒 Shopping Cart
- Add products to cart
- Increase/decrease quantity
- Remove products
- Stock limit handling
- Price breakdown
- Subtotal calculation
- Coupon functionality
- Save for later
- Move saved products back to cart
- Cart persistence using localStorage

### ❤️ Wishlist
- Add products to wishlist
- Remove products from wishlist
- Wishlist count
- Move wishlist products to cart
- Wishlist persistence using localStorage

### 💳 Checkout
- Multi-step checkout
- Address information
- Shipping selection
- Payment information
- Order review
- Form validation
- Coupon discount
- Order data persistence

### ✅ Order Confirmation
- Order summary
- Order information
- Estimated delivery
- Tracking reference
- Continue shopping option

### 👤 Account
- Account dashboard
- Order history
- Wishlist access
- Saved addresses
- Profile settings

### 🔐 Authentication
- Login page
- Signup page
- Form validation
- Password visibility controls
- Social login UI

### 📱 Responsive Design
The application is designed for:
- Mobile devices
- Tablets
- Laptops
- Desktop screens

---

## 🛠️ Technologies Used

- React.js
- Vite
- React Router
- Tailwind CSS
- Redux Toolkit
- React Redux
- Context API
- JavaScript (ES6+)
- Lucide React
- DummyJSON API
- LocalStorage

---

## 📁 Project Structure

```text
src/
│
├── assets/
│
├── components/
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   └── Footer.jsx
│
├── context/
│   └── WishlistContext.jsx
│
├── hooks/
│   └── useDebounce.js
│
├── pages/
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── ProductDetails.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── OrderConfirmation.jsx
│   ├── Wishlist.jsx
│   ├── Account.jsx
│   ├── Login.jsx
│   └── Signup.jsx
│
├── services/
│   └── productApi.js
│
├── store/
│   ├── cartSlice.js
│   └── store.js
│
├── App.jsx
├── main.jsx
├── App.css
└── index.css