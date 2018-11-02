// Setup the lowdb database
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { PractitionerSchema } from "./practitioner-schema";

const adapter = new FileSync(".data/db.json");

export default () => {
  const db = low(adapter);

  // Sets the defaults for the lowdb if the file does not contain data.
  db.defaults({ data: [], search_data: [], updated: "" }).write();

  // If the db is empty, seed database with latest data from the ftp server
  if (!db.get("updated").value()) {
    const FTP = require("ftp");
    const client = new FTP();

    const file = "/ldo/data/LIC_5203-P.txt";

    // Setup our actions when the ftp client is ready.
    client.on("ready", () => {
      // Get the last modified date of the file and save it to the db.
      client.lastMod(file, (err, lastModified) => {
        if (err) {
          throw err;
        }
        console.info("Last modified ", lastModified);
        db.set("updated", lastModified).write();
      });

      // Get the file containing the | delimited list of all mental health counselors
      client.get(file, false, (err, stream) => {
        if (err) {
          throw err;
        }

        const chunks: string[] = [];

        // WHen the stream recieves data, save it to an array
        stream.on("data", chunk => {
          chunks.push(chunk.toString());
        });

        // If the stream errors, just throw.
        stream.on("error", err => {
          throw err;
        });

        // When the stream ends, join our chunks together and process it.
        stream.on("end", () => {
          const data = chunks
            .join("") // Join the array together as chunks may be split at any point -- even in the middle of a line or word
            .split("\n") // Split the textual data by newline as that is how each row is separated.
            .map(line => {
              // split each line by the | delimeter
              const array = line.split("|");

              // We dont need "pro code" or "pro name" as we are only looking at 5203 - licensed mental health counselors
              array.shift();
              array.shift();

              // We also dont need the "Rank Code," whatever that is.
              array.splice(3, 1);

              return new PractitionerSchema(array);
            });

          //drop the headers
          data.shift();

          db.set("data", data).write();

          /**
           * Process the data for easier searching.
           * Combines each data point into a 'text' field which is used for a regex search
           * Retain the original array of data in a 'node' field.
           *
           * @TODO: Deprecate this in favor of category searching
           * https://github.com/Redmega/licensed-mental-health-counselors-browser/issues/5
           *
           * */
          db.set(
            "search_data",
            data.slice(1).map(counselor => ({
              id: counselor.licId,
              text: JSON.stringify(counselor),
              node: counselor
            }))
          ).write();

          console.log(
            "file written. ",
            data.length - 1,
            " entries written to db"
          );

          // Shut down the ftp client, as we are done here.
          client.end();
        });
      });
    });

    // Connect to the ftp client
    client.connect({ host: "ftppub.doh.state.fl.us" });
  }

  return db;
};
