// src/pages/Products.tsx
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { productService } from '../services/productService';
import Table from '@molecules/Table';
import Form from '@molecules/Form';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productService.getAllProducts();
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleCreate = async (product: Omit<Product, 'id'>) => {
    try {
      const response = await productService.createProduct(product);
      setProducts([...products, response.data]);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleUpdate = async (product: Product) => {
    try {
      const response = await productService.updateProduct(product.id, product);
      setProducts(products.map(p => p.id === product.id ? response.data : p));
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await productService.deleteProduct(id);
        setProducts(products.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleSave = (product: Product) => {
    if (editingProduct) {
      handleUpdate(product);
    } else {
      handleCreate(product);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Cargando...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Nuevo Producto
        </button>
      </div>

      {showForm ? (
        <div className="mb-6">
          <Form
            initialData={editingProduct || undefined}
            onSubmit={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
          />
        </div>
      ) : null}

      <Table
        data={products}
        columns={[
          { key: 'name', label: 'Nombre' },
          { key: 'description', label: 'Descripción' },
          { key: 'price', label: 'Precio' },
        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ProductsPage;
