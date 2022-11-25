import React from "react"
import { Html } from "../components/Html";
import type {VercelRequest, VercelResponse} from "@vercel/node";
import { renderToPipeableStream } from "react-dom/server";

export default (_req: VercelRequest, res: VercelResponse) => {
	 renderToPipeableStream(<Html />).pipe(res)
}