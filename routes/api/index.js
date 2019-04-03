const router = require("express").Router();
const bookRoutes = require("./g-books");

// Book routes
router.use("/books", bookRoutes);

module.exports = router;