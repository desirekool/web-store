import {useLoaderData, redirect} from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { OrdersList, PaginationContainer, SectionTitle } from "../components";

export const ordersQuery = (params, user) => {
  return {
    queryKey: ['orders', user.username, params.page ? parseInt(params.page) : 1],
    queryFn: () => customFetch.get('/orders', {
      params,
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }),
  };
}

export const loader = (store, queryClient) => async ({request}) => {
  const user = store.getState().user.user;
  if(!user) {
    toast.warn('Please login to place an order');
    return redirect('/login');
  }
  
  const params = Object.fromEntries([...new URLSearchParams(request.url.search)]);
  try {
    const response = await queryClient.ensureQueryData(ordersQuery(params, user));
    return {orders: response.data.data, meta: response.data.meta};
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message || 'please double check your credentials';
    
    toast.error(errorMessage);
    if(error?.response?.status === 401 || error?.response?.status === 403) return redirect('/login');
    return null;    
  }
}

const Orders = () => {
  const { meta } = useLoaderData();
  if(meta.pagination.total < 1) {
    return <SectionTitle title='You have no orders' />      
  }

  return <>
      <SectionTitle title='Orders'/>
      <OrdersList />
      <PaginationContainer />
    </>    
};

export default Orders;
