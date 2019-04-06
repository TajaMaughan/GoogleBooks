import React, { Component } from "react";
// import Jumbotron from "react-bootstrap/Jumbotron";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Search";

class Books extends Component {
  state = {
    results: [],
    searchTerm: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state.searchTerm);
    API.searchBooks(this.state.searchTerm).then(res => {
      this.setState({
        results: res.data
      });
    });
    this.setState({ searchTerm: "" });
  };

  handleSaveClick = event => {
    event.preventDefault();
    console.log(event.currentTarget.getAttribute("data-i"));
    let index = parseInt(event.currentTarget.getAttribute("data-i"));
    let info = this.state.results[index].volumeInfo;
    API.saveBook({
      title: info.title,
      authors: info.authors,
      description: info.description,
      link: info.infoLink,
      image: info.imageLinks.smallThumbnail
    });
  };

  render() {
    return (
      <Container fluid>
        <Row>
        <Col size="sm-12">  
        <Jumbotron>
          <h1>Google Books search</h1>
        </Jumbotron>
        <form>
          <Input
            value={this.state.searchTerm}
            onChange={this.handleInputChange}
            name="searchTerm"
            placeholder="Search Term"
          />
          <FormBtn
            disabled={!this.state.searchTerm}
            onClick={this.handleFormSubmit}
          >
            Search Google Books
          </FormBtn>
        </form>
        </Col>
        </Row>
        {this.state.results.length ? (
          <List>
            {this.state.results.map((result, index) => (
              <ListItem key={result.id}>
                <a
                  href={result.volumeInfo.infoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <strong>
                    {result.volumeInfo.title} by {result.volumeInfo.authors}
                  </strong>
                </a>
                <p>{result.volumeInfo.description}</p>
                <button onClick={this.handleSaveClick} data-i={index}>
                  Save
                </button>
              </ListItem>
            ))}
          </List>
        ) : (
          <h3>No Results to Display</h3>
        )}
      </Container>
    );
  }
}

export default Books;
