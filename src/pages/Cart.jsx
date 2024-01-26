import { useSelector } from 'react-redux';
import { CartItemsList, CartTotals, SectionTitle } from '../components';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Cart = () => {  
  const cart = useSelector(state => state.cart);
  const numItemsInCart = cart.numItemsInCart;
  const [user, setUser] = useState(null);
  if(numItemsInCart === 0) {
    return (<SectionTitle text="Your cart is empty" />);
  }

  return (
    <>
      <SectionTitle text="Your cart" />
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="lg:col-span-8">
          <CartItemsList />
        </div>
        <div className='lg:col-span-4 lg:pl-4'>
          <CartTotals />
          {user ? (
            <div className="mt-6">
              <Link to="/checkout" className="btn btn-primary btn-block">Proceed to checkout</Link>
            </div>
          ) : (
            <div className="mt-6">
              <Link to="/login" className="btn btn-primary btn-block">Login</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;