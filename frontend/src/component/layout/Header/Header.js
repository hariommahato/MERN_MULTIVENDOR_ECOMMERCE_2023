import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useAlert } from "react-alert";
function Header() {
  const { user } = useSelector((state) => state.user);
  const [keyword, setKeyword] = useState();
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
      setKeyword("");
    } else {
      navigate(`/products`);
    }
  };
  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logout Successfully");
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to=".">
          EasyLink
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/products">
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            {user?.isseller ? (
              <>
                <Nav.Link as={Link} to="/user/dashboard">
                  Dashboard
                </Nav.Link>
              </>
            ) : (
              <></>
            )}
            {/* 
            {user ? (
              <>
                <Nav.Link as={Link} to="/myproduct">
                  MyProduct
                </Nav.Link>
              </>
            ) : (
              ""
            )} */}
          </Nav>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "0",
            }}
          >
            <Form className="d-flex" onSubmit={searchSubmitHandler}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </div>

          {user ? (
            <>
              <Button variant="outlined" as={Link} onClick={logoutHandler}>
                Logout
              </Button>
            </>
          ) : (
            <Button variant="outlined" as={Link} to="/login">
              LogIn
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
