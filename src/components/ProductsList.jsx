import { Link, useLoaderData } from 'react-router-dom';
import { formatPrice } from '../utils';

const ProductsList = () => {
  const { products } = useLoaderData();
  
  return (
    <div className='pt-12 grid gap-y-8'>
      {products.map((product) => {
        const {title, price, image, company } = product.attributes;
        const eurAmount = formatPrice(price);
        return <Link 
          to={`/products/${product.id}`} 
          key={product.id}
          className='rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap bg-base-100 shadow-xl hover:shadow-2xl transition duration-300 group'
          >
          <img src={image} alt={title} className='rounded-xl h-24 w-24 sm:h-32 sm:w-32 object-cover group-hover group-hover:scale-105 transition duration-300' />
          
          <div className='ml-0 sm:ml-16'>
            <h3 className='capitalize font-medium text-lg'>{title}</h3>
            <h4 className='capitalize text-md text-neutral-content'>{company}</h4>
          </div> 
          <p className='font-medium ml-10 sm:ml-auto text-lg'>{eurAmount}</p>   
        </Link> 
      })}
    </div>
  )
}

export default ProductsList
