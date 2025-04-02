import axios from "axios";

// Definir tipos para las funciones
type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

// Método GET
export const getData = async (
  setDrinks: SetState<any[]>,
  setFoods: SetState<any[]>,
  setError: SetState<string | null>
) => {
  try {
    const response = await axios.get("http://localhost:3000/menu");
    setDrinks(response.data.resultDR || []);
    setFoods(response.data.resultFD || []);
  } catch (error) {
    setError("Error fetching items");
    console.log(error);
  }
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
