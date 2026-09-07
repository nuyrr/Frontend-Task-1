// // // // function ProductCard({ product }) {
// // // //   return (
// // // //     <div>
// // // //       <img
// // // //         src={product.thumbnail}
// // // //         alt={product.title}
// // // //       />

// // // //       <h2>{product.title}</h2>

// // // //       <p>${product.price}</p>

// // // //       <p>Rating: {product.rating}</p>

// // // //       <button>Add to Cart</button>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default ProductCard;
// // // import { Heart, ShoppingCart, Star } from "lucide-react";
// // // import {Link} from "react-router-dom";
// // // <Link to={`/product/${product.id}`}>
// // //   {/* Product Image */}
// // //   <div>
// // //     <img
// // //       src={product.thumbnail}
// // //       alt={product.title}
// // //     />
// // //   </div>

// // //   {/* Product Information */}
// // //   <div>
// // //     <h2>{product.title}</h2>
// // //     <p>${product.price}</p>
// // //   </div>
// // // </Link>

// // // function ProductCard({ product }) {
// // //   const discount = Math.round(
// // //     product.discountPercentage || 0
// // //   );

// // //   const originalPrice =
// // //     product.price / (1 - discount / 100);

// // //   return (
// // //     <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      
// // //       {/* Wishlist */}
// // //       <button
// // //         className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-gray-100"
// // //         aria-label="Add to wishlist"
// // //       >
// // //         <Heart
// // //           size={20}
// // //           className="text-gray-600 transition group-hover:text-red-500"
// // //         />
// // //       </button>

// // //       {/* Discount */}
// // //       {discount > 0 && (
// // //         <span className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
// // //           -{discount}%
// // //         </span>
// // //       )}

// // //       {/* Product Image */}
// // //       <div className="flex h-56 items-center justify-center overflow-hidden bg-gray-50 p-5">
// // //         <img
// // //           src={product.thumbnail}
// // //           alt={product.title}
// // //           className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
// // //         />
// // //       </div>

// // //       {/* Product Information */}
// // //       <div className="p-4">

// // //         {/* Rating */}
// // //         <div className="mb-2 flex items-center gap-1">
// // //           <Star
// // //             size={16}
// // //             className="fill-yellow-400 text-yellow-400"
// // //           />

// // //           <span className="text-sm font-medium text-gray-700">
// // //             {product.rating?.toFixed(1)}
// // //           </span>

// // //           <span className="text-xs text-gray-400">
// // //             ({product.reviews?.length || 0} reviews)
// // //           </span>
// // //         </div>

// // //         {/* Title */}
// // //         <h2 className="mb-2 line-clamp-2 min-h-48px text-base font-semibold text-gray-800 transition group-hover:text-blue-600">
// // //           {product.title}
// // //         </h2>

// // //         {/* Brand */}
// // //         {product.brand && (
// // //           <p className="mb-3 text-sm text-gray-500">
// // //             {product.brand}
// // //           </p>
// // //         )}

// // //         {/* Price */}
// // //         <div className="mb-4 flex items-center gap-2">
// // //           <span className="text-xl font-bold text-gray-900">
// // //             ${product.price.toFixed(2)}
// // //           </span>

// // //           {discount > 0 && (
// // //             <span className="text-sm text-gray-400 line-through">
// // //               ${originalPrice.toFixed(2)}
// // //             </span>
// // //           )}
// // //         </div>

// // //         {/* Add to Cart */}
// // //         <button
// // //           className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 active:scale-95"
// // //         >
// // //           <ShoppingCart size={18} />
// // //           Add to Cart
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default ProductCard;
// // import { Link } from "react-router-dom";
// // import { Heart, ShoppingCart, Star } from "lucide-react";
// // import { useDispatch } from "react-redux";
// // import { addToCart } from "../store/cartSlice";
// // function ProductCard({ product }) {
// //   const dispatch = useDispatch();
// //   const handleAddToCart = () => {
// //   dispatch(
// //     addToCart({
// //       id: product.id,
// //       title: product.title,
// //       price: product.price,
// //       thumbnail: product.thumbnail,
// //       quantity: 1,
// //       color: "Default",
// //       size: "Default",
// //     })
// //   );
// // };
// //   const discount = Math.round(product.discountPercentage || 0);

// //   const originalPrice =
// //     discount > 0
// //       ? product.price / (1 - discount / 100)
// //       : product.price;

// //   return (
// //     <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

// //       {/* Wishlist Button */}
// //       <button
// //         className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-gray-100"
// //         aria-label="Add to wishlist"
// //       >
// //         <Heart
// //           size={20}
// //           className="text-gray-600 transition group-hover:text-red-500"
// //         />
// //       </button>

// //       {/* Discount */}
// //       {discount > 0 && (
// //         <span className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
// //           -{discount}%
// //         </span>
// //       )}

// //       {/* CLICKABLE PRODUCT AREA */}
// //       <Link to={`/product/${product.id}`}>

// //         {/* Product Image */}
// //         <div className="flex h-56 items-center justify-center overflow-hidden bg-gray-50 p-5">
// //           <img
// //             src={product.thumbnail}
// //             alt={product.title}
// //             className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
// //           />
// //         </div>

// //         {/* Product Information */}
// //         <div className="p-4">

// //           {/* Rating */}
// //           <div className="mb-2 flex items-center gap-1">
// //             <Star
// //               size={16}
// //               className="fill-yellow-400 text-yellow-400"
// //             />

// //             <span className="text-sm font-medium text-gray-700">
// //               {product.rating?.toFixed(1)}
// //             </span>

// //             <span className="text-xs text-gray-400">
// //               ({product.reviews?.length || 0} reviews)
// //             </span>
// //           </div>

// //           {/* Product Title */}
// //           <h2 className="mb-2 min-h-48px text-base font-semibold text-gray-800 transition group-hover:text-blue-600">
// //             {product.title}
// //           </h2>

// //           {/* Brand */}
// //           {product.brand && (
// //             <p className="mb-3 text-sm text-gray-500">
// //               {product.brand}
// //             </p>
// //           )}

// //           {/* Price */}
// //           <div className="mb-4 flex items-center gap-2">
// //             <span className="text-xl font-bold text-gray-900">
// //               ${product.price.toFixed(2)}
// //             </span>

// //             {discount > 0 && (
// //               <span className="text-sm text-gray-400 line-through">
// //                 ${originalPrice.toFixed(2)}
// //               </span>
// //             )}
// //           </div>

// //         </div>
// //       </Link>

// //       {/* Add To Cart */}
// //       <div className="px-4 pb-4">
// //         <button
// //         onClick={handleAddToCart}
// //           className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 active:scale-95"
// //         >
// //           <ShoppingCart size={18} />
// //           Add to Cart
// //         </button>
// //       </div>

// //     </div>
// //   );
// // }

// // export default ProductCard;
// // import { Link } from "react-router-dom";
// // import { useWishlist } from "../context/WishlistContext";
// // 
// // function ProductCard({ product }) {
//   // const {
//     // toggleWishlist,
//     // isInWishlist,
//   // } = useWishlist();
// // 
//   // const favorite = isInWishlist(product.id);
// // 
//   // return (
//     // <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-lg">
// {/*  */}
//       Wishlist Button
//       {/* <button */}
//         // onClick={() => toggleWishlist(product)}
//         // className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110"
//         // aria-label={
//           // favorite
//             // ? "Remove from wishlist"
//             // : "Add to wishlist"
//         // }
//       // >
//         {/* <span */}
//           // className={
//             // favorite
//               // ? "text-xl text-red-500"
//               // : "text-xl text-gray-400"
//           // }
//         // >
//           {/* {favorite ? "♥" : "♡"} */}
//         {/* </span> */}
//       {/* </button> */}
// {/*  */}
//       Product Image
//       {/* <Link to={`/product/${product.id}`}> */}
//         {/* <div className="flex h-64 items-center justify-center bg-gray-50 p-5"> */}
//           {/* <img */}
//             // src={product.thumbnail}
//             // alt={product.title}
//             // className="h-full w-full object-contain transition duration-300 hover:scale-105"
//           // />
//         {/* </div> */}
//       {/* </Link> */}
// {/*  */}
//       Product Information
//       {/* <div className="p-5"> */}
// {/*  */}
//         Rating
//         {/* <div className="mb-2 flex items-center gap-1 text-sm"> */}
//           {/* <span className="text-yellow-500"> */}
//             {/* ★ */}
//           {/* </span> */}
// {/*  */}
//           {/* <span className="text-gray-500"> */}
//             {/* {product.rating} */}
//           {/* </span> */}
//         {/* </div> */}
// {/*  */}
//         Title
//         {/* <Link to={`/product/${product.id}`}> */}
//           {/* <h2 className="line-clamp-2 min-h-3rem font-semibold text-gray-900 hover:text-blue-600"> */}
//             {/* {product.title} */}
//           {/* </h2> */}
//         {/* </Link> */}
// {/*  */}
//         Category
//         {/* <p className="mt-2 text-sm capitalize text-gray-400"> */}
//           {/* {product.category} */}
//         {/* </p> */}
// {/*  */}
//         Price
//         {/* <div className="mt-3"> */}
//           {/* <span className="text-xl font-bold text-gray-900"> */}
//             {/* ${product.price} */}
//           {/* </span> */}
//         {/* </div> */}
// {/*  */}
//         Add to Cart
//         {/* <button */}
//           // className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
//         // >
//           {/* Add to Cart */}
//         {/* </button> */}
// {/*  */}
//       {/* </div> */}
//     {/* </div> */}
//   // );
// // }
// // 
// // export default ProductCard;
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useWishlist } from "../context/WishlistContext";
import { addToCart } from "../store/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  const favorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
      })
    );
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-lg">

      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110"
        aria-label={
          favorite
            ? "Remove from wishlist"
            : "Add to wishlist"
        }
      >
        <span
          className={
            favorite
              ? "text-xl text-red-500"
              : "text-xl text-gray-400"
          }
        >
          {favorite ? "♥️" : "♡"}
        </span>
      </button>

      {/* Product Image */}
      <Link to={`/product/${product.id}`}>
        <div className="flex h-64 items-center justify-center bg-gray-50 p-5">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-contain transition duration-300 hover:scale-105"
          />
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-5">

        {/* Rating */}
        <div className="mb-2 flex items-center gap-1 text-sm">
          <span className="text-yellow-500">
            ★
          </span>

          <span className="text-gray-500">
            {product.rating}
          </span>
        </div>

        {/* Title */}
        <Link to={`/product/${product.id}`}>
          <h2 className="line-clamp-2 min-h-3rem font-semibold text-gray-900 hover:text-blue-600">
            {product.title}
          </h2>
        </Link>

        {/* Category */}
        <p className="mt-2 text-sm capitalize text-gray-400">
          {product.category}
        </p>

        {/* Price */}
        <div className="mt-3">
          <span className="text-xl font-bold text-gray-900">
            ${product.price}
          </span>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>

      </div>
    </div>
  );
}

export default ProductCard;