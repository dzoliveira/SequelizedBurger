var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var db = require("./models");

var port = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
// Middleware
//Use of "static" makes our public folder inaccessible via the browser
app.use(express.static(process.cwd() + "/public"));
// app.use("/static/", express.static(path.join(__dirname, "/public/")));

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller.js");

app.use("/", routes);

db.sequelize.sync({ force: false }).then( function(data, error) {
  app.listen(port, function() {
    console.log("App listening on PORT " + port);
  });
});
