import { useState } from "react";

const ItemForm = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // prevents the page to refresh
    e.preventDefault();

    const item = { title, price, imgURL };

    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const response = await fetch(`${apiUrl}/api/items`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setTitle("");
      setPrice("");
      setImgURL("");
      setError(null);
      console.log("New Item Added", json);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3> Add a New Item</h3>

      <label>Item Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Item Price:</label>
      <input
        type="text"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />

      <label>Item Image URL:</label>
      <input
        type="text"
        onChange={(e) => setImgURL(e.target.value)}
        value={imgURL}
      />

      <button>Add Item</button>
      {error && <div className="error">{error} </div>}
    </form>
  );
};

export default ItemForm;
