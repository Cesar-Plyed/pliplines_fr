import axios from "axios";
import type { Item } from "../components/ui/card";

// Alias para coherencia con ui/card
export type MenuItem = Item;

export type MenuData = {
  drinks: MenuItem[];
  foods: MenuItem[];
};

// Método GET — retorna datos tipados directamente
export const getData = async (): Promise<MenuData> => {
  const response = await axios.get("http://localhost:3000/menu");
  return {
    drinks: response.data.resultDR || ([] as MenuItem[]),
    foods: response.data.resultFD || ([] as MenuItem[]),
  };
};

// Método POST
export const createNew = async (formData: FormData, type: string) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/new/${type}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading image", error);
    throw error;
  }
};

// Componente de error
type ErrorProps = {
  error: string | null;
};

export const Error: React.FC<ErrorProps> = ({ error }) => {
  return error ? <p>{error}</p> : null;
};
