const express = require("express");
const path = requre("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/nytreact"
);

const db = mongoose.connection;
db.on('error', function (err) {
  console.log("-----Mongoose error: -----\n" + err);
});
db.once('open', function () {
  console.log("Mongoose connected successfully");
});

//Import API Routes
const apiRoutes = require("./routes/apiRoutes.js");
const searchRoutes = require("./routes/searchRoutes.js");
app.use("/api", apiRoutes);
app.use("/search", searchRoutes);

//React routing
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
