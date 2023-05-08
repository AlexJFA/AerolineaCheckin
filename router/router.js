const express = require("express");
const router = express.Router();
const controler = require("../controler/controler");

// routes
router.get("/flights/:id/passengers", controler.sumulation);

module.exports = router;
