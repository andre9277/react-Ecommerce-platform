import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import Store from "./pages/Store";
import About from "./pages/About";
import NavBar from "./components/NavBar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { ItemsContextProvider } from "./context/ItemContext";
import AddItem from "./pages/AddItem";

//Responsible for routing and generic code
function App() {
  return (
    <ItemsContextProvider>
      <ShoppingCartProvider>
        <NavBar />
        <Container className="mb-4">
          {" "}
          {/* add a margin  */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/additem" element={<AddItem />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Container>
      </ShoppingCartProvider>
    </ItemsContextProvider>
  );
}

export default App;
