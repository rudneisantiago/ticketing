import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

import {
  currentUserRouter,
  signinRouter,
  signoutRouter,
  signupRouter,
} from "./routes";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };