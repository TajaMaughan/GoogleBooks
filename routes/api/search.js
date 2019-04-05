const router = require("express").Router();
const axios = require("axios");

router.route("/").get(function(req, res) {
  console.log(req.query.q);
  let bookTitle = req.query.q.replace(/\s/g, "+");
  axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}`
    )
    .then(response => {
      res.json(response.data.items);
    })
    .catch(err => {
      console.log(err);
    });
  //   .catch(err => res.status(400).json(err));
});

module.exports = router;
