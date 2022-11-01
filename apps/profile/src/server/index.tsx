import express from 'express';
import React from 'react';
import {renderToString} from "react-dom/server"
import { Profile } from '../components/Profile';

const app = express();
const port = process.env.PORT ?? "No port passed";

app.get("/", (req, res) => {
  const comp = <Profile name="Max Willmott"/>
  const html = renderToString(comp);
  res.send(html);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
