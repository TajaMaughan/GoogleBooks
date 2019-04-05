import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import { Link } from "react-router-dom";
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
      console.log("reached");
    });
    // if (this.state.title && this.state.author) {
    //   API.saveBook({
    //     title: this.state.title,
    //     author: this.state.author,
    //     synopsis: this.state.synopsis
    //   })
    //     .then(res => this.loadBooks())
    //     .catch(err => console.log(err));
    // }
  };

  render() {
    return (
      <Container fluid>
            <Jumbotron>
              <h1>Google Books search</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.searchTerm}
                onChange={this.handleInputChange}
                name="searchTerm"
                placeholder="Title (required)"
              />
              <FormBtn
                disabled={!this.state.searchTerm}
                onClick={this.handleFormSubmit}
              >
                Search Google Books
              </FormBtn>
            </form>

            {this.state.results.length ? (
              <List>
                {this.state.results.map(result => (
                  <ListItem key={result.id}>
                    <strong>
                      {result.volumeInfo.title} by {result.volumeInfo.authors}
                    </strong>
                    <DeleteBtn onClick={() => this.deleteBook()} />
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
