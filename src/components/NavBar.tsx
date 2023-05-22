import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { User } from "../models/user";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";

interface NavBarProps {
    loggedInUser: User | null,
    onLoginClicked: () => void,
    onLogoutSuccessful: () => void,
}

const NavBar = ({ loggedInUser, onLoginClicked, onLogoutSuccessful }: NavBarProps) => {
    return (
        <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    スキケン
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link as={Link} to="/privacy">
                            Privacy
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        {loggedInUser
                            ? <NavBarLoggedInView user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful} />
                            : <NavBarLoggedOutView onLoginClicked={onLoginClicked} />
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;