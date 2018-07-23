// Deoendencies 
var express = require("express");
var bodyParser = require("body-parser");


var app = express();
var path = require("path");

var PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Allows acces to app file
app.use(express.static(path.join(__dirname, "app")));

//Routes
require("./app/routing/apiRoutes")(app);
require('./app/routing/htmlRoutes')(app);


//Deploys Server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
