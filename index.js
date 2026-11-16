const express = require("express");
const _ = require("lodash");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  const data = _.shuffle(["sbom", "test", "app"]);
  res.json({ message: "SBOM test app running", data });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
