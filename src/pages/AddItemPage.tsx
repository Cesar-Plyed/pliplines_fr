import { useState } from "react";
import { useParams } from "react-router-dom";
import { handleImageChange, handleSubmit } from "../utils/ImageUtils";

// Definir la interfaz Params para tipar los parámetros de la URL
interface Params extends Record<string, string | undefined> {
    type?: string;
}

export default function AddItemPage() {
    const { type = "" } = useParams<Params>();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(e, type, name, price, description, image);
    };

    return (
        <div>
            <h1>Upload {type}</h1>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    id="nameItem"
                    name="nameItem"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    id="price"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    title="image"
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageChange(setImage)}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
