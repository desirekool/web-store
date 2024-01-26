import { useSelector } from "react-redux";
import { CheckoutForm, SectionTitle, CartTotals} from "../components";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const loader = (store) => async () => {
  const user = store.getState().user.user;
  if(user === null || user === undefined) {
    toast.warn('Please login to place an order');
    return redirect('/login');
  }

  return null;
}


const Checkout = () => {
  const cartTotal = useSelector((state) => state.cart.cartTotal);
  if(cartTotal < 1) {
    return <SectionTitle title='Your cart is empty' />      
  }

  return (
    <>
      <SectionTitle title='Checkout' />
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  );
};

export default Checkout;