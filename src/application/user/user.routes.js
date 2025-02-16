import { Router } from "express";
import { pagination } from "../../middleware/pagination.js";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "./user.controller.js";
import { body, param } from "express-validator";
import { message } from "../../utils/message.js";
import { validateChecks } from "../../middleware/validate-checks.js";
import { custom } from "../../middleware/custom.js";
import { User } from "./user.model.js";
import { UserNotFoundError } from "./user.errors.js";
import { AuthInvalidCredentialsError } from "../auth/auth.errors.js";
import bcryptjs from "bcryptjs";

const router = Router();

router.route("/").get([...pagination, validateChecks], getAllUsers);

router
  .route("/:id")
  .put(
    [
      param(
        "id",
        message((LL) => LL.USER.ROUTE.USER_ID_REQUIRED()),
      ).isMongoId(),
      body(
        "password",
        message((LL) => LL.USER.ROUTE.PASSWORD_REQUIRED()),
      ).isString(),
      body(
        "phone_number",
        message((LL) => LL.USER.ROUTE.PHONE_NUMBER_REQUIRED()),
      ).isString(),

      validateChecks,
      custom(async (req, LL) => {
        const { id } = req.params;
        const { password } = req.body;

        const userFound = await User.findOne({
          _id: id,
          tp_status: true,
        });

        if (userFound._id !== req.loggedUser._id) {
          throw new AuthInvalidCredentialsError(
            LL.AUTH.ERROR.INVALID_CREDENTIALS(),
          );
        }

        if (!userFound) {
          throw new UserNotFoundError(LL.USER.ERROR.NOT_FOUND());
        }

        const isSamePassword = await bcryptjs.compare(
          password,
          userFound.password,
        );

        if (!isSamePassword) {
          throw new AuthInvalidCredentialsError(
            LL.AUTH.ERROR.INVALID_CREDENTIALS(),
          );
        }
      }),
    ],
    updateUserById,
  )
  .delete(
    [
      param(
        "id",
        message((LL) => LL.USER.ROUTE.USER_ID_REQUIRED()),
      ).isMongoId(),
      validateChecks,
      custom(async (req, LL) => {
        const { id } = req.params;

        const userFound = await User.findOne({
          _id: id,
          tp_status: true,
        });

        if (!userFound) {
          throw new UserNotFoundError(LL.USER.ERROR.NOT_FOUND());
        }
      }),
    ],
    deleteUserById,
  )
  .get(
    [
      param(
        "id",
        message((LL) => LL.USER.ROUTE.USER_ID_REQUIRED()),
      ).isMongoId(),
      validateChecks,
    ],
    getUserById,
  );

router.put("/as-admin/:id", [
  param(
    "id",
    message((LL) => LL.USER.ROUTE.USER_ID_REQUIRED()),
  ).isMongoId(),
  body(
    "password",
    message((LL) => LL.USER.ROUTE.PASSWORD_REQUIRED()),
  ).isString(),
  body(
    "phone_number",
    message((LL) => LL.USER.ROUTE.PHONE_NUMBER_REQUIRED()),
  ).isString(),

  validateChecks,
  custom(async (req, LL) => {
    const { userLogged } = req;
    const { password } = req.body;

    const isSamePassword = await bcryptjs.compare(
      password,
      userLogged.password,
    );

    if (!isSamePassword) {
      throw new AuthInvalidCredentialsError(
        LL.AUTH.ERROR.INVALID_CREDENTIALS(),
      );
    }
  }),
]);
export default router;
