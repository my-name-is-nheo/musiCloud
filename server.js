var express = require("express");
var app = express();
var path = require("path");
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/BoardViewer.html"));
});

app.listen(9000);
