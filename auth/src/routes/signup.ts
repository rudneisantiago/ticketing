// node imports
import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
// app imports
import { BadRequestError, validateRequest } from "@rgsticketing/common";
import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Digite um e-mail válido"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Senha precisa ter entre 4 e 20 caracteres"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email already in use");
    }

    const user = User.build({
      email,
      password,
    });
    await user.save();

    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
