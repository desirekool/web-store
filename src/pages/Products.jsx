import { Filters, PaginationContainer, ProductsContainer } from "../components"
import { customFetch } from "../utils";

const url = '/products';
const allProductsQuery = (queryParams) => {
  const {search, page, category, company, sort, price, shipping} = queryParams;
  return {
    queryKey: ['products', 
      search ?? '',
      page ?? 1,
      category ?? 'all',
      company ?? 'all',
      sort ?? 'a-z',
      price ?? 100000,
      shipping ?? false
    ],
    queryFn: () => customFetch(url, {params: queryParams}),
  };
};

export const loader = (queryClient) => async ({ request }) => {
  const params = Object.fromEntries([
    new URL(request.url).searchParams.entries(), 
  ]);
  const response = await queryClient.ensureQueryData(
    allProductsQuery(params)
  );
  
  const products = response.data.data;
  const meta = response.data.meta;
  return {products, meta, params};
}

const Products = () => {
  return <>
    <Filters />
    <ProductsContainer />
    <PaginationContainer />
  </>  
}

export default Products