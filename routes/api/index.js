const router = require("express").Router();
const bookRoutes = require("./api-routes");

// Book routes
router.use("/books", bookRoutes);

module.exports = router;
