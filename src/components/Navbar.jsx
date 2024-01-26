import {BsCart3, BsMoonFill, BsSunFill} from 'react-icons/bs';
import {FaBarsStaggered} from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
import NavLinks from './NavLinks.jsx';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/user/userSlice.js';

const themes = {
  winter: 'winter', 
  dracula: 'dracula'	
};

const getThemeFromLocalStorage = () => {
  return  localStorage.getItem('theme') || themes.winter;  
};

const Navbar = () => {
  const theme = getThemeFromLocalStorage();
  
  const cart = useSelector(state => state.cart);
  const numItemsInCart = cart.numItemsInCart;
  const dispatch = useDispatch();
  
  const handleTheme = () => {
    dispatch(toggleTheme());    
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <nav className="bg-base-200">
      <div className="navbar align-element">
        <div className="navbar-start">
          <NavLink to="/" className="hidden lg:flex btn btn-primary text-3xl items-center">
            <div className="logo">WebStore</div>
          </NavLink>
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content z-[1]  mt-3 p-2 shadow bg-base-200 rounded-box w-52">
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">nav links</ul>
        </div>
        <div className="navbar-end">
          <label className='swap swap-rotate'>
            <input type="checkbox" onChange={handleTheme}/>
            <BsSunFill className="swap-on h4-w-4" />

            <BsMoonFill className="swap-off h-4 w-4" />
          </label>
          <NavLink to="cart" className="btn btn-ghost btn-md btn-circle ml-4">
            <div className="indicator">
              <BsCart3 className="h-6 w-6" />
              { numItemsInCart > 0 && <span className="badge badge-sm badge-primary indicator-item">{numItemsInCart}</span>}
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar