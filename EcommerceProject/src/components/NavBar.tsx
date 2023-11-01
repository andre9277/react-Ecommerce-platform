import {Container,Button, Nav,Navbar as NavBarBts} from "react-bootstrap";
import {NavLink} from "react-router-dom"; 

const NavBar = () => {
  return (
    <NavBarBts className="bg-white shadow-sm mb-3">
        <Container>
            <Nav className="me-auto"> {/* style to keep nav options on the right side */}
                <Nav.Link to="/" as ={NavLink}>
                    Home
                </Nav.Link>
                <Nav.Link to="/store" as ={NavLink}>
                    Store
                </Nav.Link>
                <Nav.Link to="/about" as ={NavLink}>
                    About
                </Nav.Link>
            </Nav>
            <Button></Button>
        </Container>
    </NavBarBts>
  )
}

export default NavBar