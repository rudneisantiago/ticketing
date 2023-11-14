import express from "express";
import { json } from "body-parser";

import {
  currentUserRouter,
  signinRouter,
  signoutRouter,
  signupRouter,
} from "./routes";

const app = express();
app.use(json());

app.use([currentUserRouter, signinRouter, signoutRouter, signupRouter]);

app.listen(3000, () => {
  console.log("Listen on port 3000");
});
