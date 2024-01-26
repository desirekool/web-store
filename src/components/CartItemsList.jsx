import { useSelector } from "react-redux"
import CartItem  from "./CartItem"
import { nanoid } from "nanoid"

const CartItemsList = () => {
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  
  return (
    <div>
      {cartItems.map(cartItem => {
        return <CartItem key={nanoid()} cartItem={cartItem} />
      })}
    </div>
  )
}

export default CartItemsList