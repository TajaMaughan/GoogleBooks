import React from "react";
import Nav from "react-bootstrap/Nav";

function Navbar() {
  return (
    <Nav className="navbar navbar-expand-lg justify-content-end">
      <Nav.Item>
        <Nav.Link className="nav-text" href="/">
          Search
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className="nav-text" href="/books">
          Saved
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Navbar;
