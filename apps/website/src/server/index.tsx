import express from 'express';
import React from 'react';
import {renderToPipeableStream, renderToReadableStream} from "react-dom/server"
import { Html } from '../components/Html';

const app = express();
const port = process.env.PORT ?? "No port passed";

app.get("/", (req, res) => {
  const comp = <Html />
  const htmlStream = renderToPipeableStream(comp);
  htmlStream.pipe(res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
