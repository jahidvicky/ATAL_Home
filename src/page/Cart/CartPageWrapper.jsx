import { useSelector } from "react-redux";
import ViewCart from "./ViewCart";
import ViewLensCart from "./ViewLensCart";
import { Link } from "react-router-dom";

const CartPageWrapper = () => {
  const cartItems = useSelector((state) => state.cart.items);

  //  Handle empty cart
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="text-center text-red-600 mt-8 mb-8">
          Your cart is empty.
          <Link
            to="/"
            className="text-blue-600 ml-2 hover:underline hover:cursor-pointer"
          >
            Continue Shopping
          </Link>
        </div>
    );
  }

  // Check if all items are contact lenses
  const isLensCart = cartItems.every(
    (item) =>
      item?.subcategory?.toLowerCase()?.includes("contact lenses") ||
      item?.subCategoryName?.toLowerCase()?.includes("contact lenses")
  );


  return (
    <div className="container mx-auto px-4 py-10">
      {isLensCart ? <ViewLensCart /> : <ViewCart />}
    </div>
  );
};

export default CartPageWrapper;
