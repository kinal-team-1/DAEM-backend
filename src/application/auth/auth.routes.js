import { Router } from "express";
import { body } from "express-validator";
import { message } from "../../utils/message.js";
import { validateChecks } from "../../middleware/validate-checks.js";
import { login, signup, validateToken } from "./auth.controllers.js";
import { custom } from "../../middleware/custom.js";
import { User } from "../user/user.model.js";
import { UserAlreadyExistsError } from "../user/user.errors.js";
import { validateJwt } from "../../middleware/validate-jwt.js";

const router = Router();

router.post(
  "/login",
  [
    body(
      "email",
      message((LL) => LL.AUTH.ROUTE.EMAIL_REQUIRED()),
    ).isEmail(),
    body(
      "password",
      message((LL) => LL.AUTH.ROUTE.PASSWORD_REQUIRED()),
    )
      .isString()
      .isStrongPassword({
        minSymbols: 0,
        minNumbers: 1,
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
      }),
    validateChecks,
  ],
  login,
);

router.post(
  "/signup",
  [
    body(
      "email",
      message((LL) => LL.AUTH.ROUTE.EMAIL_REQUIRED()),
    )
      .isString()
      .isEmail(),
    body(
      "password",
      message((LL) => LL.AUTH.ROUTE.PASSWORD_REQUIRED()),
    )
      .isString()
      .isStrongPassword({
        minSymbols: 0,
        minNumbers: 1,
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
      }),
    body(
      "name",
      message((LL) => LL.AUTH.ROUTE.NAME_REQUIRED()),
    )
      .isString()
      .isLength({ min: 2 }),
    body(
      "lastname",
      message((LL) => LL.AUTH.ROUTE.LASTNAME_REQUIRED()),
    )
      .isString()
      .isLength({ min: 2 }),
    body(
      "DPI",
      message((LL) => LL.AUTH.ROUTE.DPI_REQUIRED()),
    )
      .isString()
      .isLength({ min: 13, max: 13 }),
    body(
      "phone_number",
      message((LL) => LL.AUTH.ROUTE.PHONE_NUMBER_REQUIRED()),
    )
      .isString()
      .isLength({ min: 8 }),
    validateChecks,
    custom(async (req, LL) => {
      const { email } = req.body;

      const userFound = await User.findOne({
        email,
        tp_status: true,
      });

      if (userFound) {
        throw new UserAlreadyExistsError(LL.USER.ERROR.EMAIL_ALREADY_EXISTS());
      }
    }),
  ],
  signup,
);

router.get("/token", validateJwt, validateToken);

export default router;
