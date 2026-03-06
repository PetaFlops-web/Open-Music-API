import AuthRepository from "../repository/index.js";
import TokenManager from "../../security/token-manager.js";
import { InvariantError } from "../../exceptions/index.js";
const addUser = async (payload) => {
  const checkUsername = await AuthRepository.newUsernameExist(payload.username);

  if (checkUsername) {
    throw new InvariantError(
      "Gagal menambahkan user. Username sudah digunakan.",
    );
  }

  const user = await AuthRepository.addUser(payload);

  if (!user) {
    throw new InvariantError("User gagal ditambahkan");
  }

  return user;
};

const login = async (payload) => {
  const { username, password } = payload;

  // Verify the username and password
  const userId = await AuthRepository.verifyUserCredential({
    username,
    password,
  });

  if (!userId) {
    throw new InvariantError("Kredensial yang Anda berikan salah");
  }

  // Generate access token and refresh token
  const accessToken = TokenManager.generateAccessToken({ id: userId });
  const refreshToken = TokenManager.generateRefreshToken({ id: userId });

  // Add refresh token to the database
  await AuthRepository.addRefreshToken(refreshToken);

  return { accessToken, refreshToken };
};

const refreshToken = async (refreshToken) => {
  const result = await AuthRepository.verifyRefreshToken(refreshToken);

  if (!result) {
    throw new InvariantError("Refresh token tidak valid");
  }

  const { id } = TokenManager.verifyRefreshToken(refreshToken);
  const accessToken = TokenManager.generateAccessToken({ id });

  return { accessToken };
};

const logout = async (refreshToken) => {
  const verify = await AuthRepository.verifyRefreshToken(refreshToken);

  if (!verify) {
    throw new InvariantError("Refresh token tidak valid");
  }

  const result = await AuthRepository.deleteRefreshToken(refreshToken);

  return result;
};

export { addUser, login, refreshToken, logout };
