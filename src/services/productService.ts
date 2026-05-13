import type { Product } from '../types';

export const PRODUCTS_API_URL = "https://fakestoreapi.com/products";

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function fetchProducts(): Promise<Product[]> {
  return fetchJson<Product[]>(PRODUCTS_API_URL);
}

export function fetchProductById(id: number): Promise<Product> {
  return fetchJson<Product>(`${PRODUCTS_API_URL}/${id}`);
}

export function fetchCategories(): Promise<string[]> {
  return fetchJson<string[]>(`${PRODUCTS_API_URL}/categories`);
}