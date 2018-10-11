const path = require("path");
const app = require("express")();

// Setup parcel bundler /w entry index
const Bundler = require("parcel-bundler");
const entry = path.resolve(__dirname, "src/index.html");

// Setup the lowdb database
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync(".data/db.json");

const db = low(adapter);

db.defaults({ data: [], search_data: [], updated: "" }).write();

if (!db.get("updated").value()) {
  const FTP = require("ftp");
  const client = new FTP();

  const file = "/ldo/data/LIC_5203-P.txt";
  client.on("ready", () => {
    client.lastMod(file, (err, lastModified) => {
      if (err) {
        throw err;
      }
      console.info("Last modified ", lastModified);
      db.set("updated", lastModified).write();
    });

    client.get(file, false, (err, stream) => {
      if (err) {
        throw err;
      }

      const chunks = [];

      stream.on("data", chunk => {
        chunks.push(chunk.toString());
      });
      stream.on("error", err => {
        throw err;
      });
      stream.on("end", () => {
        const data = chunks
          .join("")
          .split("\n")
          .map(line => {
            // split the line by the delimeter
            let array = line.split("|");

            // We dont need pro code or pro name as we are only looking at 5203 - licensed mental health conselors
            array.shift();
            array.shift();

            // We also dont need the "Rank Code"
            array.splice(3, 1);

            return array;
          });

        db.set("data", data).write();

        db.set(
          "search_data",
          data.slice(1).map(counselor => ({
            id: counselor[0],
            text: counselor.join(" "),
            node: counselor
          }))
        ).write();

        console.log(
          "file written. ",
          data.length - 1,
          " entries written to db"
        );
        delete chunks;
        client.end();
      });
    });
  });
  client.connect({ host: "ftppub.doh.state.fl.us" });
}

// add db to app context
app.use((req, res, next) => {
  req.db = db;
  next();
});

console.log("Starting server...");

const bundler = new Bundler(entry);

//Provide data when requested
app.use("/data", require("./routes/data"));

app.use(bundler.middleware());

//the server object listens on port 3000
app.listen(3000);

console.log("Server started at 3000");
