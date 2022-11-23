import express from "express";
import React from "react";
import { fragmentHandler, jsRouter } from "server-shared";
import { Html } from "../components/Html";

const app = express();
const port = process.env.WEBSITE_PORT ?? "No port passed";

jsRouter(app);

app.use(express.static("public"));

app.get(
  "/",
  fragmentHandler(() => <Html />)
);

app.listen(port, () => {
  console.log(`Website on port ${port}`);
});
