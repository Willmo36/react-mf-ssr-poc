import React from "react";
import { FragmentLoader } from "./FragmentLoader";

const PROFILE_URL = "http://localhost:3001";

export const Html = () => {
  return (
    <>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <FragmentLoader url={PROFILE_URL} />
      </body>
    </>
  );
};
