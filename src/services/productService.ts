import { Product, ApiResponse } from '../types';

const API_BASE_URL = 'http://localhost:8081/api';

export const productService = {
  getAllProducts: async (): Promise<ApiResponse<Product[]>> => {
    const response = await fetch(`${API_BASE_URL}/products`);
    return response.json();
  },

  getProductById: async (id: number): Promise<ApiResponse<Product>> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return response.json();
  },

  createProduct: async (product: Omit<Product, 'id'>): Promise<ApiResponse<Product>> => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    return response.json();
  },

  updateProduct: async (id: number, product: Partial<Product>): Promise<ApiResponse<Product>> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    return response.json();
  },

  deleteProduct: async (id: number): Promise<ApiResponse<void>> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};
