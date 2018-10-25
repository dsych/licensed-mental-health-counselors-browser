import { Router } from "express";
import bodyParser from "body-parser";

const router = Router();

router.get("/", (req, res, next) => {
  res.json({
    data: req.db.get("data").value(),
    updated: req.db.get("updated").value()
  });
  res.end();
});

router.search("/", bodyParser.json(), (req, res, next) => {
  const { query } = req.body;
  if (!query) {
    res.statusMessage = "Query is missing from search request";
    res.status(400).end();
  }

  // Sanitize input for use with regex
  // @TODO: Implement search by column
  const regex = new RegExp(
    "" +
      query
        .replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1")
        .replace(/\x08/g, "\\x08") +
      "",
    "ig"
  );

  const results = req.db
    .get("search_data")
    .value()
    .filter(({ text }) => text.match(regex))
    .map(({ node }) => node);

  // @FIXME: Fuzzy search won't work for now. Weird issue where, when searching for MIAMI, results with MIAMI are ranking below others without it
  // const results = fuzzysort.go(query, req.db.get("search_data").value(), {
  //   limit: 10000,
  //   threshold: -1000,
  //   key: "text"
  // });

  // results.map(result =>
  //   console.log(
  //     "id",
  //     result.obj.node[0],
  //     "Matched target:",
  //     result.target.slice(
  //       result.indexes[0],
  //       result.indexes[result.indexes.length - 1]
  //     ),
  //     "Score: ",
  //     result.score
  //   )
  // );

  res.json(results);

  res.end();
});

export default router;
