import { Row, Col } from "react-bootstrap";
import StoreItem from "../components/StoreItem";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useEffect } from "react";

const Store = () => {
  useEffect(() => {
    fetchItems();
  }, []);

  /* use Context to acces functions */
  const { items, fetchItems } = useShoppingCart();

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
