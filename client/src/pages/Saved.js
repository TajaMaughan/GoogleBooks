import React, { Component } from "react";
import API from "../utils/API";
import { List, ListItem } from "../components/List";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

class Saved extends Component {
  state = {
    books: [],
    title: "",
    authors: "",
    description: "",
    link: "",
    image: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({
          books: res.data,
          title: "",
          author: "",
          description: ""
        })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <Jumbotron className="text-center">
              <h1>Google Books Search</h1>
              <h2>Saved Books</h2>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <strong>
                      <a
                        href={book.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {book.title} by {book.authors}
                      </a>
                    </strong>
                    <Image src={book.image} className="float-left mr-4"/>
                    <p>{book.description}</p>
                    <Button className="btn" onClick={() => this.deleteBook(book._id)}>Delete</Button>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3 className="text-center">No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Saved;
