import { useSelector } from "react-redux";
import ViewCart from "./ViewCart";
import ViewLensCart from "./ViewLensCart";
import { Link } from "react-router-dom";

const CartPageWrapper = () => {
  const cartItems = useSelector((state) => state.cart.items || []);

  const contactLensCategoryId = "6915735feeb23fa59c7d532b";

  if (cartItems.length === 0) {
    return (
      <div className="text-center text-[#f00000] mt-8 mb-8">
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

  const lensItems = cartItems.filter(
    (item) => item?.cat_id === contactLensCategoryId
  );

  const normalItems = cartItems.filter(
    (item) => item?.cat_id !== contactLensCategoryId
  );

  const hideCheckout = lensItems.length > 0 && normalItems.length > 0;


  return (
    <div className="container mx-auto px-4 py-10 space-y-10">
      <h2 className="text-3xl font-bold mb-8">Your Shopping Cart</h2>
      {normalItems.length > 0 && <ViewCart items={normalItems} hideCheckout={hideCheckout} />}
      {lensItems.length > 0 && <ViewLensCart items={lensItems} hideCheckout={hideCheckout} />}

      {hideCheckout && (
        <div className="flex justify-end ">
          <Link to="/checkout">
            <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-900 transition">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPageWrapper;
