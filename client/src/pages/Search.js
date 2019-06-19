import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import API from "../utils/API";
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
      image: info.imageLinks.thumbnail
    });
  };

  listItem = (result, index) => (
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
      <Image
        src={result && result.volumeInfo && result.volumeInfo.imageLinks && result.volumeInfo.imageLinks.thumbnail}
        className="float-left mr-4"
      />
      <p>{result.volumeInfo.description}</p>
      <button className="btn" onClick={this.handleSaveClick} data-i={index}>
        Save
      </button>
    </ListItem>
  )

  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            <Col>
              <Jumbotron className="jumbotron">
                <h1 className="text-center">Google Books Search</h1>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col xs={10}>
              <Input
                value={this.state.searchTerm}
                onChange={this.handleInputChange}
                name="searchTerm"
                placeholder="Search Term"
                onSubmit={this.handleFormSubmit}
              />
            </Col>
            <Col xs={2}>
              <FormBtn
                disabled={!this.state.searchTerm}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </Col>
          </Row>
          {this.state.results.length ? (
            <List>
              {this.state.results.map(this.listItem)}
            </List>
          ) : (
            <h3 className="text-center">No Results to Display</h3>
          )}
        </Container>
      </div>
    );
  }
}

export default Books;
