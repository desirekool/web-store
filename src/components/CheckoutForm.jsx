import {Form, redirect} from "react-router-dom";
import { FormInput, SubmitButton } from ".";
import { customFetch, formatPrice } from "../utils";
import { toast } from "react-toastify";
import { clearCart } from "../redux/cart/cartSlice";

export const action = (store, queryClient) => async ({request}) => {
  const formData = await request.formData();
  const {name, address} = Object.fromEntries(formData);
  const user = store.getState().user.user;
  const {cartItems, orderTotal, numItemsInCart} = store.getState().cart;

  const info = {
    name,
    address,
    chargeTotal: orderTotal,
    orderTotal: formatPrice(orderTotal),
    cartItems,
    numItemsInCart,
    user
  };

  try {
    await customFetch.post(
      '/orders', 
      {data: info},
      { headers: { Authorization: `Bearer ${user.token}`, },}
    );
    queryClient.removeQueries(['orders']);
    store.dispatch(clearCart());
    toast.success('Order placed successfully');
    return redirect('/orders');
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message || 'please double check your credentials';
    
    toast.error(errorMessage);
    if(error?.response?.status === 401 || error?.response?.status === 403) return redirect('/login');
    
    return null;    
  }
}

const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">      
      <h3 className="font-medium text-xl">Shipping Info</h3>
      <FormInput 
        label="First Name" 
        type="text" 
        name="name"           
      />
      <FormInput 
        label="Address" 
        type="text" 
        name="address"           
      />
      <div className="mt-4">
          <SubmitButton text="Place Order" />          
      </div>        
    </Form>
  );
};

export default CheckoutForm;