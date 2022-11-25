import express from "express";
import React from "react";
import { fragmentHandler } from "server-shared";
import { Html } from "../components/Html";

const app = express();
app.get("/", fragmentHandler(() => {
	console.log("Website::/ hit!");
	return <Html />;
}));

module.exports = app;