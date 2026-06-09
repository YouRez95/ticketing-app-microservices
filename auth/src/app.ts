import express from "express";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import cookieSession from "cookie-session";
import { NODE_ENV } from "./config/env";

const app = express();

// Middleware
app.set("trust proxy", true);
app.use(express.json());

app.use(
  cookieSession({
    secure: NODE_ENV !== "test",
    signed: false,
  }),
);

// Routes

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all("/{*splat}", (req, res, next) => {
  next(new NotFoundError());
});

//Error handler
app.use(errorHandler);

export default app;
