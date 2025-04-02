import { Buffer } from "buffer";
import { createNew } from "../api/api";

// Tipo para el evento de cambio de imagen
type ImageChangeEvent = React.ChangeEvent<HTMLInputElement>;

// setImage
export const handleImageChange = (setImage: React.Dispatch<React.SetStateAction<File | null>>) => (e: ImageChangeEvent) => {
  if (e.target.files && e.target.files[0]) {
    setImage(e.target.files[0]);
  }
};

// getImage
export const bufferToBase64 = (buffer: ArrayBuffer): string => {
  return `data:image/jpeg;base64,${Buffer.from(buffer).toString("base64")}`;
};

// Tipo para el evento de envío del formulario
type FormSubmitEvent = React.FormEvent<HTMLFormElement>;

// handleSubmit
export const handleSubmit = async (
  e: FormSubmitEvent,
  type: string,
  name: string,
  price: string,
  description: string,
  image: File | null
) => {
  e.preventDefault();
  if (!image) {
    console.error("Image is required");
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price);
  formData.append("description", description);
  formData.append("image", image);

  try {
    await createNew(formData, type);
  } catch (error) {
    console.error("Error uploading image", error);
  }
};