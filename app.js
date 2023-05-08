const express = require("express");
const router = require("./router/router");
const cors = require("cors");
const { urlencoded } = require("express");

const app = express();
const port = 3000;

// Middlewares
app.use(urlencoded());
app.use(express.json());
app.use(express.text());
app.use(cors());

//router
app.use("/", router);

// Server
app.listen(port, () => console.log(`App listening on port ${port}!`));
