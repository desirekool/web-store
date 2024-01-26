import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/user/userSlice';
import { clearCart } from '../redux/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';



export const Header = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    navigate('/');
    dispatch(logoutUser());
    dispatch(clearCart());
    queryClient.removeQueries();
  }

  return (
    <section className='bg-neutral py-2 text-neutral-content'>
      <div className='align-element flex justify-center sm:justify-end'>
        <div className='flex justify-center gap-x-6 items-center'>
          {user === null ? (
            <>
              <Link to='/login' className='link link-hover text-xs sm:text-sm'>
                Sign in / Guest 
              </Link>
              <Link to='/register' className='link link-hover text-xs sm:text-sm'>
                Create Account
              </Link>
            </>
            ) : (
              <div className='flex gap-x-2 sm:gap:x-8 items-center'>
                <p className='text-xs sm:text-sm'>Hello, {user.username}</p>
                <button onClick={handleLogout} className='btn btn-xs btn-outline btn-primary'>
                  Logout
                </button>
              </div>
            )}          
        </div>
      </div>
    </section>
  )
}

export default Header;