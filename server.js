var express = require("express");
var app = express();
const port = process.env.PORT || 4000;
var path = require("path");
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/BoardViewer.html"));
});

app.listen(port);
