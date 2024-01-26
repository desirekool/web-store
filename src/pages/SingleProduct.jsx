import { Link, useLoaderData } from "react-router-dom";
import { formatPrice, customFetch, generateAmountOptions } from "../utils";
import {useState} from 'react';
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cart/cartSlice";

const SingleProductQuery = (id) => {
  return {
    queryKey: ['singleProduct', id],
    queryFn: () => customFetch(`/products/${id}`),
  };
}


export const loader = (queryClient) => async ({ params }) => {
  const response = await queryClient.ensureQueryData(
    SingleProductQuery(params.id)
  );
 return { product: response.data.data };
};

function SingleProduct() {
  const dispatch = useDispatch();
  const { product } = useLoaderData();
  console.log(product);
  const {image, title, price, description, colors, company } = product.attributes;
  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);
  const cartProduct = {
    cartID: product.id + productColor,
    productID: product.id,
    image,
    title,
    price,
    amount,
    productColor,
    company,
  }

  const addToCart = () => {    
    dispatch(addItem({product: cartProduct}));
  }

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  }
  
  return <section>
    <div className="text-md breadcrumbs">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
      </ul>
    </div>
    <div className='mt-6 grid gap-y-8 lg:grid-cols-2  lg:gap-x-16'>
      <img src={image} alt={title} className="w-96 h-96 rounded-lg lg:w-full object-cover" />
      <div>
        <h1 className="capitalize text-3xl font-bold">
          {title}
        </h1>
        <h4 className="text-xl text-neutral-content font-bold mt-2">{company}</h4>
        <p className="leading-8 mt-6">{formatPrice(price)}</p>
        <p className="mt-3 text-xl">{description}</p>
        <div className="mt-6">
          <h4 className="text-md font-medium tracking-wider capitalize">colors</h4>
          <div className="mt-2 gap-2 flex">
            {colors.map((color) => {
              return <button key={nanoid()} onClick={() => setProductColor(color)} className={`badge w-6 h-6 rounded-full ${color === productColor ? 'ring-2 ring-secondary' : ''}`} style={{backgroundColor: color}}></button>
            })}
          </div>
        </div>
        <div className="form-control w-full max-w-xs">
          <label htmlFor="" className="label">
            <h4 className="text-md font-medium -tracking-wider capitalize">
              amount
            </h4>            
          </label>
          <select value={amount} name="" id="" className="select select-secondary select-bordered"  onChange={handleAmount}>
           {generateAmountOptions(3)}
          </select>
        </div>
        <div className="mt-10">
          <button className="btn btn-secondary btn-lg" onClick={addToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  </section>
      
}

export default SingleProduct