import axios from "axios";
import { nanoid } from "nanoid";

const productionUrl = 'https://strapi-store-server.onrender.com/api';

export const customFetch = axios.create({
  baseURL: productionUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const formatPrice = (number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format((number / 100).toFixed(2));
}


export const generateAmountOptions = (max) => {
  return Array.from({ length: max }, (_, index) => {
    const amount = index + 1;
    return (<option key={nanoid()} value={amount}>{amount}</option>);
  });
}