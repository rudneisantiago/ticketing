import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

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
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    const { email, password } = req.body;

    console.log("Creating a user...");

    res.send({});
  }
);

export { router as signupRouter };
