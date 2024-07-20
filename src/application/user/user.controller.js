import { getTranslationFunctions } from "../../utils/get-translations-locale.js";
import { logger } from "../../utils/logger.js";
import { handleResponse } from "../../utils/handle-response.js";
import { User } from "./user.model.js";
import { StatusCodes } from "http-status-codes";
import { UserNotFoundError } from "./user.errors.js";

export const getAllUsers = async (req, res) => {
  const LL = getTranslationFunctions(req.locale);
  try {
    logger.info("Getting all users");

    const { page = 1, limit = 0 } = req.query;

    const [total, users] = await Promise.all([
      User.countDocuments({ tp_status: true }),
      User.find({ tp_status: true })
        .skip((page - 1) * limit)
        .limit(limit),
    ]);

    res.status(StatusCodes.OK).json({
      data: users,
      message: LL.USER.CONTROLLER.GET_ALL_USERS_SUCCESS(),
      total,
      page,
      limit,
    });

    logger.info("All users fetched successfully");
  } catch (error) {
    logger.error("Failed to retrieve all users. Error of type " + error.name);

    handleResponse(res, error, LL);
  }
};

export const getUserById = async (req, res) => {
  const LL = getTranslationFunctions(req.locale);
  try {
    logger.info("Getting user by id");

    const { id } = req.params;
    const user = await User.findOne({ _id: id, tp_status: true });

    if (!user) {
      throw new UserNotFoundError(LL.USER.ERROR.NOT_FOUND());
    }

    res.status(StatusCodes.OK).json({
      data: user,
      message: LL.USER.CONTROLLER.GET_USER_SUCCESS(),
    });

    logger.info("User successfully retrieved");
  } catch (error) {
    logger.error("Failed to retrieve user. Error of type " + error.name);

    handleResponse(res, error, LL);
  }
};

export const updateUserById = async (req, res) => {
  const LL = getTranslationFunctions(req.locale);
  try {
    logger.info("Updating user by id");
    const { phone_number } = req.body;

    const { id } = req.params;
    const user = await User.findOneAndUpdate(
      id,
      {
        phone_number,
      },
      { new: true },
    );

    res.status(StatusCodes.OK).json({
      data: user,
      message: LL.USER.CONTROLLER.UPDATE_USER_SUCCESS(),
    });

    logger.info("User updated successfully");
  } catch (error) {
    logger.error("Failed to update user. Error of type " + error.name);

    handleResponse(res, error, LL);
  }
};

export const deleteUserById = async (req, res) => {
  const LL = getTranslationFunctions(req.locale);
  try {
    logger.info("Deleting user by id");

    const { id } = req.params;

    const user = await User.findOneAndUpdate(
      {
        _id: id,
        tp_status: true,
      },
      {
        tp_status: false,
      },
    );

    res.status(StatusCodes.OK).json({
      data: user,
      message: LL.USER.CONTROLLER.DELETE_USER_SUCCESS(),
    });

    logger.info("User deleted successfully");
  } catch (error) {
    logger.error("Failed to delete user. Error of type " + error.name);

    handleResponse(res, error, LL);
  }
};
