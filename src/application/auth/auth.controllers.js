import { getTranslationFunctions } from "../../utils/get-translations-locale.js";
import { logger } from "../../utils/logger.js";
import { handleResponse } from "../../utils/handle-response.js";
import { User } from "../user/user.model.js";
import { UserNotFoundError } from "../user/user.errors.js";
import bcryptjs from "bcryptjs";
import { AuthInvalidCredentialsError } from "./auth.errors.js";
import { StatusCodes } from "http-status-codes";
import { generateToken } from "../../utils/generate-token.js";

export const login = async (req, res) => {
  const LL = getTranslationFunctions(req.locale);
  try {
    logger.info("Login started");

    const { email, password } = req.body;

    const user = await User.findOne({
      email,
      tp_status: true,
    });

    if (!user) {
      throw new UserNotFoundError(LL.USER.ERROR.NOT_FOUND());
    }

    if (!(await bcryptjs.compare(password, user.password))) {
      throw new AuthInvalidCredentialsError(
        LL.AUTH.ERROR.INVALID_CREDENTIALS(),
      );
    }

    const { _id } = user.toJSON();
    const token = await generateToken({ email, _id });

    res.status(StatusCodes.OK).json({
      data: user,
      message: LL.AUTH.CONTROLLER.LOGIN_SUCCESS(),
      token,
    });

    logger.info("User logged in successfully");
  } catch (error) {
    logger.error("Failed attempt to log in. Error of type " + error.name);

    handleResponse(res, error, LL);
  }
};

export const signup = async (req, res) => {
  const LL = getTranslationFunctions(req.locale);
  try {
    logger.info("Signup started");

    const { email, password, name, lastname, DPI, phone_number } = req.body;

    const user = new User({
      email,
      password: await bcryptjs.hash(password, 10),
      name,
      lastname,
      DPI,
      phone_number,
    });

    await user.save();

    res.status(StatusCodes.CREATED).json({
      data: user,
      message: LL.AUTH.CONTROLLER.REGISTER_SUCCESS(),
    });

    logger.info("User registered successfully");
  } catch (error) {
    logger.error("Failed attempt to register. Error of type " + error.name);

    handleResponse(res, error, LL);
  }
};

export const validateToken = async (req, res) => {
  const LL = getTranslationFunctions(req.locale);
  try {
    logger.info("Token validation endpoint start");

    res.status(200).json({
      message: LL.AUTH.CONTROLLER.SUCCESS_TOKEN_VALIDATION(),
      data: req.loggedUser,
    });

    logger.info("Token validation successful");
  } catch (error) {
    logger.error("Error validating token and getting virtuals: ", error.name);

    handleResponse(res, error, LL);
  }
};
