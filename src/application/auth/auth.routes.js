import { Router } from "express";
import { body, oneOf } from "express-validator";
import { message } from "../../utils/message.js";
import { validateChecks } from "../../middleware/validate-checks.js";
import { login } from "./auth.controllers.js";
import { custom } from "../../middleware/custom.js";
import { User } from "../user/user.model.js";
import { UserAlreadyExistsError } from "../user/user.errors.js";

const router = Router();

router.post(
  "/login",
  [
    // either username or email is required
    body(
      "username",
      message((LL) => LL.AUTH.ROUTE.USERNAME_OPTIONAL()),
    )
      .optional()
      .isString()
      .isLength({ min: 3 }),
    body(
      "email",
      message((LL) => LL.AUTH.ROUTE.EMAIL_OPTIONAL()),
    )
      .optional()
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
    // either username or email is required, but not both
    oneOf(
      [
        [body("username").exists(), body("email").not().exists()],
        [body("email").exists(), body("username").not().exists()],
      ],
      {
        message: message((LL) =>
          LL.AUTH.ROUTE.EITHER_USERNAME_OR_EMAIL_REQUIRED(),
        ),
      },
    ),
    validateChecks,
  ],
  login,
);

router.post("/signup", [
  body(
    "username",
    message((LL) => LL.AUTH.ROUTE.USERNAME_REQUIRED()),
  )
    .isString()
    .isLength({ min: 3 }),

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
  validateChecks,
  custom(async (req, LL) => {
    const { username, email } = req.body;

    // check if username is already taken
    const userFound = await User.findOne({
      $or: [{ username }, { email }],
      tp_status: true,
    });

    if (!userFound) return;

    if (userFound.username === username) {
      throw new UserAlreadyExistsError(LL.USER.ERROR.USERNAME_ALREADY_EXISTS());
    }

    if (userFound.email === email) {
      throw new UserAlreadyExistsError(LL.USER.ERROR.EMAIL_ALREADY_EXISTS());
    }
  }),
]);

export default router;
