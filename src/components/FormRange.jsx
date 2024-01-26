import { useState } from 'react';
import { formatPrice } from '../utils';


const FormRange = ({label, name, size}) => {
  const step = 1000;
  const maxPrice = 1000000;
  const [selectedPrice, setSelectedPrice] = useState(0);
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
        <span className="text-gray-400 ml-1">Rp. {formatPrice(selectedPrice)}</span>
      </label>
      <input 
        name={name} 
        type="range" 
        min={0} 
        max={maxPrice} 
        value={selectedPrice}
        step={step} 
        onChange= {(e) => setSelectedPrice(e.target.value)}
        className={`range range-primary ${size}`} 
      />
      <div className='w-full flex justify-between text-xs px-2 mt-2'>
        <span className='font-bold text-md'>0</span>
        <span className='font-bold text-md'>{formatPrice(maxPrice)}</span>
      </div>
      
    </div>
  );
};

export default FormRange;