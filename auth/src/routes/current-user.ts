import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  if (!req.session || !req.session.jwt) {
    return res.send({ currentUser: null });
  }

  const currentUser = jwt.decode(req.session.jwt);
  res.send({ currentUser });
});

export { router as currentUserRouter };
