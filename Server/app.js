const express = require("express");
const cors = require("cors");
const config_routes = require("./routes/config_routes");
require("./db/mongoConnection");
const {config}= require("./config/secret")
const PORT = config.PORT || 3000;
const HOST_NAME = config.HOST_NAME || '127.0.0.1';
const app = express();

app.use(cors());
app.use(express.json());
app.use("", config_routes);

app.listen(PORT, () => {
  console.log(`Server running on http://${HOST_NAME}:${PORT}`);
});