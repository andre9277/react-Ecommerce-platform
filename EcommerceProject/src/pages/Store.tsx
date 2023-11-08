import { Row, Col } from "react-bootstrap";
import StoreItem from "../components/StoreItem";
import { useEffect } from "react";
import { useItemsContext } from "../hooks/useItemsContext";

const Store = () => {
  const { items, dispatch } = useItemsContext();

  useEffect(() => {
    //Fetch data from database
    const fetchItems = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${apiUrl}/api/items/`);
        const data = await response.json();
        if (response.ok) {
          dispatch({ type: "SET_ITEMS", payload: data });
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
    <>
      <h1>Store</h1>
      {/* for medium, small and large screen sizes, with gap of 3 */}
      <Row md={2} xs={1} lg={3} className="g-3">
        {items.map((item) => (
          <Col key={item._id}>
            {" "}
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Store;
