// // import { Link } from "react-router-dom";
// // import { useSelector } from "react-redux";
// // import { ShoppingCart } from "lucide-react";

// // function Navbar() {
// //   const cartItems = useSelector((state) => state.cart.items);

// //   const cartCount = cartItems.reduce(
// //     (total, item) => total + item.quantity,
// //     0
// //   );

// //   return (
// //     <nav className="border-b bg-white shadow-sm">
// //       <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

// //         {/* Logo */}
// //         <Link
// //           to="/products"
// //           className="text-2xl font-bold text-gray-900"
// //         >
// //           SuperMart
// //         </Link>

// //         {/* Navigation */}
// //         <div className="flex items-center gap-6">

// //           <Link
// //             to="/products"
// //             className="font-medium text-gray-700 transition hover:text-blue-600"
// //           >
// //             Products
// //           </Link>

// //           {/* Cart */}
// //           <Link
// //             to="/cart"
// //             className="relative flex items-center text-gray-700 transition hover:text-blue-600"
// //           >
// //             <ShoppingCart size={24} />

// //             {cartCount > 0 && (
// //               <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
// //                 {cartCount}
// //               </span>
// //             )}
// //           </Link>

// //         </div>

// //       </div>
// //     </nav>
// //   );
// // }

// // export default Navbar;
// // import { Link } from "react-router-dom";
// // import { useWishlist } from "../context/WishlistContext";
// // 
// // function Navbar() {
//   // const { wishlist } = useWishlist();
// // 
//   // return (
//     // <nav className="border-b bg-white">
//       {/* <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4"> */}
// {/*  */}
//         Logo
//         {/* <Link */}
//           // to="/products"
//           // className="text-xl font-bold text-gray-900"
//         // >
//           {/* SuperMart */}
//         {/* </Link> */}
// {/*  */}
//         Navigation
//         {/* <div className="flex items-center gap-5"> */}
// {/*  */}
//           Products
//           {/* <Link */}
//             // to="/products"
//             // className="font-medium text-gray-700 transition hover:text-blue-600"
//           // >
//             {/* Products */}
//           {/* </Link> */}
// {/*  */}
//           Wishlist
//           {/* <Link */}
//             // to="/wishlist"
//             // className="relative font-medium text-gray-700 transition hover:text-red-500"
//           // >
//             {/* <span className="text-xl"> */}
//               {/* ♡ */}
//             {/* </span> */}
// {/*  */}
//             {/* {wishlist.length > 0 && ( */}
//               // <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
//                 {/* {wishlist.length} */}
//               {/* </span> */}
//             // )}
//           {/* </Link> */}
// {/*  */}
//           Cart
//           {/* <Link */}
//             // to="/cart"
//             // className="text-xl text-gray-700 transition hover:text-blue-600"
//           // >
//             {/* 🛒 */}
//           {/* </Link> */}
// {/*  */}
//         {/* </div> */}
// {/*  */}
//       {/* </div> */}
//     {/* </nav> */}
//   // );
// // }
// // 
// // export default Navbar;
// import { Link } from "react-router-dom";
// import { useWishlist } from "../context/WishlistContext";
// import { useSelector } from "react-redux";

// function Navbar() {
//   const { wishlist } = useWishlist();

//   // Get cart items from Redux
//   const cartItems = useSelector((state) => state.cart.items);

//   // Calculate total quantity
//   const cartCount = cartItems.reduce(
//     (total, item) => total + item.quantity,
//     0
//   );

//   return (
//     <nav className="border-b bg-white shadow-sm">
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

//         {/* Logo */}
//         <Link
//           to="/products"
//           className="text-xl font-bold text-gray-900"
//         >
//           SuperMart
//         </Link>

//         {/* Navigation */}
//         <div className="flex items-center gap-5">

//           {/* Products */}
//           <Link
//             to="/products"
//             className="font-medium text-gray-700 transition hover:text-blue-600"
//           >
//             Products
//           </Link>

//           {/* Wishlist */}
//           <Link
//             to="/wishlist"
//             className="relative flex items-center text-gray-700 transition hover:text-red-500"
//           >
//             <span className="text-2xl">
//               ♡
//             </span>

//             {wishlist.length > 0 && (
//               <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
//                 {wishlist.length}
//               </span>
//             )}
//           </Link>

//           {/* Cart */}
//           <Link
//             to="/cart"
//             className="relative flex items-center text-xl text-gray-700 transition hover:text-blue-600"
//           >
//             🛒

//             {cartCount > 0 && (
//               <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
//                 {cartCount}
//               </span>
//             )}
//           </Link>

//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useSelector } from "react-redux";

function Navbar() {
  const { wishlist } = useWishlist();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

        {/* Logo */}
        <Link
          to="/products"
          className="text-xl font-bold text-gray-900"
        >
          SuperMart
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-5">

          {/* Products */}
          <Link
            to="/products"
            className="font-medium text-gray-700 transition hover:text-blue-600"
          >
            Products
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative flex items-center text-gray-700 transition hover:text-red-500"
          >
            <span className="text-2xl">
              ♡
            </span>

            {wishlist.length > 0 && (
              <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center text-xl text-gray-700 transition hover:text-blue-600"
          >
            🛒

            {cartCount > 0 && (
              <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;