// src/components/Table/Table.tsx
import React from 'react';
import { Product } from '@app-types';

interface TableProps {
  data: Product[];
  columns: { key: keyof Product; label: string }[];
  onEdit?: (item: Product) => void;
  onDelete?: (id: number) => void;
}

const Table: React.FC<TableProps> = ({ data, columns, onEdit, onDelete }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((column) => (
            <th 
              key={column.key} 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {column.label}
            </th>
          ))}
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                {item[column.key] as string}
              </td>
            ))}
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              {onEdit && (
                <button 
                  onClick={() => onEdit(item)}
                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  Editar
                </button>
              )}
              {onDelete && (
                <button 
                  onClick={() => onDelete(item.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Eliminar
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
