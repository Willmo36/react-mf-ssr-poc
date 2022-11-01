"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const react_1 = __importDefault(require("react"));
const server_1 = require("react-dom/server");
const Profile_1 = require("../components/Profile");
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : "No port passed";
app.get("/", (req, res) => {
    const comp = react_1.default.createElement(Profile_1.Profile, { name: "Max Willmott" });
    const html = (0, server_1.renderToString)(comp);
    res.send(html);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
