import React from "react";
import { App } from "./App";

export const Html = () => {
  return (
    <>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="/js/bundle.js"></script>
        <link rel="stylesheet" href="/css/normalize.css"/>
        <link rel="stylesheet" href="/css/skeleton.css"/>
        <link rel="stylesheet" href="/css/custom.css"/>
      </head>
      <body className="">
        <div id="app"><App /></div>
      </body>
    </>
  );
};
