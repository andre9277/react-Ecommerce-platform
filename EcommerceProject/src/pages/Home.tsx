import { useEffect, useState } from "react";

interface Item {
  _id: string;
  title: string;
  price: number;
  imgURL: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Home = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${apiUrl}/api/items/`);
        if (response.ok) {
          const data = await response.json();
          setItems(data);
        } else {
          console.error("Failed to fetch items");
        }
      } catch (error) {
        console.error("An error occurred while fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <div>
        {items.map((item) => (
          <div key={item._id}>
            <p>Title: {item.title}</p>
            <p>Price: {item.price}</p>
            <img src={item.imgURL} alt={item.title} />
            <p>Created At: {item.createdAt}</p>
            <p>Updated At: {item.updatedAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
