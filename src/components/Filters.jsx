import {Form, useLoaderData, Link} from 'react-router-dom'; 
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormRange from './FormRange';
import FormCheckbox from './FormCheckbox';

const Filters = () => {
  const { meta, params } = useLoaderData();
  const { search, company, category, shipping, order, price } = params;

  return (
    <Form className='bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center'>
      <FormInput 
        label='Search product' 
        type='search' 
        name='search' 
        size="input-sm"
        defaultValue={search}
      />
      <FormSelect           
        label='select category'
        name='category'
        size='select-sm'
        list={meta.categories}
        defaultValue={category}
      />
      <FormSelect           
        label='select company'
        name='company'
        size='select-sm'
        list={meta.companies}
        defaultValue={company}
      />
      <FormSelect           
        label='sort by'
        name='order'
        size='select-sm'
        list={['a-z', 'z-a', 'high', 'low']}
        defaultValue={order}
      />
      <FormRange name='price' label='select price' size='range-sm' />
      <FormCheckbox name='shipping' label='free shipping' size='checkbox-sm' defaultValue={shipping}/>
      <button type='submit' className='btn btn-primary btn-sm'>Search</button>
      <Link to='/products' className='btn btn-accent btn-sm'>reset</Link>      
    </Form>
  )
}

export default Filters;