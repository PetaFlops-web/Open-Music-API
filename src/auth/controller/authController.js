import response from "../../utils/responses.js";
import {
  addUser,
  login,
  refreshToken,
  logout,
} from "../service/authServices.js";

const addUserHandler = async (req, res) => {
  try {
    const data = req.validate;
    const result = await addUser(data);

    return response(res, 201, "User added successfully", {
      userId: result,
    });
  } catch (error) {
    if (error.name === "InvariantError") {
      return response(res, 400, error.message);
    }

    if (error.name === "NotFoundError") {
      return response(res, 404, error.message);
    }

    return response(res, 500, "Terjadi kesalahan pada server");
  }
};

const loginHandler = async (req, res) => {
  try {
    const { username, password } = req.validate;
    const result = await login({ username, password });

    return response(res, 201, "User logged in successfully", {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
  } catch (error) {
    if (error.name === "InvariantError") {
      return response(res, 401, error.message);
    }

    if (error.name === "NotFoundError") {
      return response(res, 404, error.message);
    }

    return response(res, 500, "Terjadi kesalahan pada server");
  }
};

const refreshTokenHandler = async (req, res) => {
  try {
    const { refreshToken: token } = req.validate;
    const result = await refreshToken(token);

    return response(res, 200, "Refresh token generated successfully", {
      accessToken: result.accessToken,
    });
  } catch (error) {
    if (error.name === "InvariantError") {
      return response(res, 400, error.message);
    }

    if (error.name === "NotFoundError") {
      return response(res, 404, error.message);
    }

    return response(res, 500, "Terjadi kesalahan pada server");
  }
};

const logoutHandler = async (req, res) => {
  try {
    const { refreshToken } = req.validate;

    await logout(refreshToken);

    return response(res, 200, "User logged out successfully");
  } catch (error) {
    if (error.name === "InvariantError") {
      return response(res, 400, error.message);
    }

    if (error.name === "NotFoundError") {
      return response(res, 404, error.message);
    }

    return response(res, 500, "Terjadi kesalahan pada server");
  }
};

export { addUserHandler, loginHandler, refreshTokenHandler, logoutHandler };
