import { Link, useLoaderData } from 'react-router-dom';
import { formatPrice } from '../utils';

const ProductsGrid = () => {
  const { products } = useLoaderData();
  
  return (
    <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {products.map((product) => {
        const {title, price, image } = product.attributes;
        const eurAmount = formatPrice(price);
        return <Link 
          to={`/products/${product.id}`} 
          key={product.id}
          className='card w-full shadowxl hover:shadow-2xl transition duration-300'
          >
          <figure className='px-4 pt-4'>
            <img src={image} alt={title} className='rounded-xl h-64 md:h-48 w-full object-cover' />
          </figure>
          <div className='card-body items-center text-center'>
            <h2 className='card-title capitalize tracking-wider'>{title}</h2>
            <p className='text-secondary'>{eurAmount}</p>
          </div>    
        </Link> 
      })}
    </div>
  )
}

export default ProductsGrid