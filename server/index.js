const path = require("path");
const app = require("express")();

// Setup parcel bundler /w entry index
const Bundler = require("parcel-bundler");
const entry = path.resolve(__dirname, "../src/index.html");

//setup db
const setupDatabase = require("./lib/db");

const db = setupDatabase();
// add db to app context
app.use((req, res, next) => {
  req.db = db;
  next();
});

console.log("Starting server...");

const bundler = new Bundler(entry);

//Provide data when requested
app.use("/data", require("./routes/data"));

// The bundler listens for requests and returns the bundled html content
app.use(bundler.middleware());

//the server object listens on port 3000
app.listen(3000);

console.log("Server started at 3000");
