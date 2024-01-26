import { useSelector } from "react-redux";  
import { formatPrice } from "../utils";

const CartTotals = () => {
  const cart = useSelector(state => state.cart);
  const {cartTotal, shipping, tax, orderTotal} = cart;

  return (
    <div className="card bg-base-200">
      {/* Your code here */}
      <div className="card-body">
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Subtotal</span>
          <span className="font-medium">{formatPrice(cartTotal)}</span>
        </p>
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>shipping</span>
          <span className="font-medium">{formatPrice(shipping)}</span>
        </p>
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Tax</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </p>
        <p className="flex justify-between text-sm mt-4 pb-2">
          <span className="font-bold">Order Total</span>
          <span className="font-bold">{formatPrice(cartTotal + shipping + tax)}</span>
        </p>
      </div>
    </div>
  );
};

export default CartTotals;
