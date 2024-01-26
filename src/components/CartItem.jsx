import { formatPrice, generateAmountOptions } from "../utils";
import {removeItem, editItem} from '../redux/cart/cartSlice';
import { useDispatch } from "react-redux";

const CartItem = ({cartItem}) => {
  const dispatch = useDispatch();
  

  const {cartID, title, price, image, amount, company, productColor } = cartItem;
  const removeItemFromTheCart = () => {
    dispatch(removeItem({cartID}));
  }

  const handleAmount = (e) => {
    const newAmount = parseInt(e.target.value);
    dispatch(editItem({cartID, amount: newAmount}));
  }

  return (
    <article key={cartID} className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-v-0">      
      <img src={image} alt={title} className="w-24 h-24 rounded-lg object-cover sm:w-32 sm:h-32" />
      <div className="sm:ml-16 sm:w-48">
        <h3 className="capitalize font-medium">{title}</h3>
        <h4 className="mt-2 capitalize text-neutral-content text-sm">{company}</h4>
        <p className="mt-4 capitalize text-sm flex items-center gap-x-2">color:
          <span className="badge badge-sm" style={{backgroundColor: productColor}}></span>
        </p>
        <div className="form-control max-w-xs">
          <label className="label p-0" htmlFor="amount">
            <span className="label-text">Amount</span>
          </label>
          <select 
            name="amount"
            id="amount"
            value={amount} 
            onChange={handleAmount} 
            className="select select-base select-bordered select-xs mt-2"
          >
            {generateAmountOptions(amount + 5)}
            
          </select>                
        </div>
        <button onClick={removeItemFromTheCart} className="mt-2 link link-primary link-hover text-sm">Remove</button>
      </div>
      <p className="font-medium sm:ml-auto">{formatPrice(price)}</p>
    </article>
  );
};

export default CartItem;
