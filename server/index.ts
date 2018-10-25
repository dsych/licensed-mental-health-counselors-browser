import path from "path";
import Bundler from "parcel-bundler";

import setupDatabase from "./lib/db";
import dataRoutes from "./routes/data";

import express from "express";
import { Request } from "../types/custom";

const app = express();

// Setup parcel bundler /w entry index
const entry = path.resolve(__dirname, "../src/index.html");

//setup db
const db = setupDatabase();

// add db to req context
app.use((req: Request, res, next) => {
  req.db = db;
  next();
});

console.log("Starting server...");

const bundler = new Bundler(entry);

//Provide data when requested
app.use("/data", dataRoutes);

// The bundler listens for requests and returns the bundled html content
app.use(bundler.middleware());

//the server object listens on port 3000
app.listen(3000);

console.log("Server started at 3000");
