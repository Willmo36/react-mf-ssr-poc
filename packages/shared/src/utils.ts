import type { Handler } from "express";
import {
  renderToPipeableStream,
  renderToStaticNodeStream,
} from "react-dom/server";

export const delayHandler: Handler = (_rq, _rs, next) => {
  setTimeout(next, Number(process.env.DELAY) ?? 0);
};

export const renderMethod =
  process.env.RENDER_TYPE === "stream"
    ? renderToPipeableStream
    : renderToStaticNodeStream;
