const axios = require("axios");
const router = require("express").Router();

router.get("bookSearch", (req, res) => {
  axios
    .get(
      "https://www.googleapis.com/books/v1/volumes?q=" +
        { params: req.query } +
        "&callback=handleResponse"
    )
    .then(({ data: { results } }) => res.json(results))
    .catch(err => res.status(400).json(err));
});
