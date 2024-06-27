import { Router } from "express";
import { body, oneOf } from "express-validator";
import { message } from "../../utils/message.js";
import { validateChecks } from "../../middleware/validate-checks.js";
import { login } from "./auth.controllers.js";

const router = Router();

router.post(
  "/login",
  [
    // either username or email is required
    oneOf(
      [
        [
          body("username").isString().isLength({ min: 3 }),
          body("email").isEmpty(),
        ],
        [body("email").isEmail(), body("username").isEmpty()],
      ],
      {
        message: message((LL) =>
          LL.AUTH.ROUTE.EITHER_USERNAME_OR_EMAIL_REQUIRED(),
        ),
      },
    ),
    body(
      "password",
      message((LL) => LL.AUTH.ROUTE.PASSWORD_REQUIRED()),
    )
      .isString()
      .isLength({ min: 8 }),
    validateChecks,
  ],
  login,
);

export default router;
