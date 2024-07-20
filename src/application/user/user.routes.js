import { Router } from "express";
import { pagination } from "../../middleware/pagination.js";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "./user.controller.js";
import { param } from "express-validator";
import { message } from "../../utils/message.js";
import { validateChecks } from "../../middleware/validate-checks.js";
import { custom } from "../../middleware/custom.js";
import { User } from "./user.model.js";
import { UserNotFoundError } from "./user.errors.js";

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
export default router;
