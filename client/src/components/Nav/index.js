import React from "react";
import Nav from "react-bootstrap/Nav";

const Navbar = () => {
  return (
    <Nav>
      <Nav.Item>
        <Nav.Link href="/">Search</Nav.Link>
        <Nav.Link>Saved</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Navbar;
