import { Pool } from "pg";
import { nanoid } from "nanoid";
import bcrypt from "bcryptjs";

class AuthRepository {
  constructor() {
    this.pool = new Pool();
  }

  async addUser(payload) {
    const { username, password, fullname } = payload;
    const idUser = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: "INSERT INTO users(id, username, password, fullname) VALUES($1, $2, $3, $4) RETURNING id",
      values: [idUser, username, hashedPassword, fullname],
    };
    const result = await this.pool.query(query);
    return result.rows[0].id;
  }

  async getUserByUsername(username) {
    const query = {
      text: "SELECT id, username, fullname FROM users WHERE username = $1",
      values: [username],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async verifyUserCredential({ username, password }) {
    const query = {
      text: "SELECT id, password FROM users WHERE username = $1",
      values: [username],
    };
    const result = await this.pool.query(query);
    if (!result.rows.length) {
      return false;
    }

    const { id, password: hashedPassword } = result.rows[0];
    const match = await bcrypt.compare(password, hashedPassword);
    if (!match) {
      return false;
    }

    return id;
  }

  async newUsernameExist(username) {
    const query = {
      text: "SELECT username FROM users WHERE username = $1",
      values: [username],
    };
    const result = await this.pool.query(query);
    return result.rowCount > 0;
  }

  async addRefreshToken(token) {
    const query = {
      text: "INSERT INTO authentications VALUES($1)",
      values: [token],
    };
    await this.pool.query(query);
  }

  async deleteRefreshToken(token) {
    const query = {
      text: "DELETE FROM authentications WHERE token = $1",
      values: [token],
    };
    await this.pool.query(query);
  }

  async verifyRefreshToken(token) {
    const query = {
      text: "SELECT token FROM authentications WHERE token = $1",
      values: [token],
    };

    const result = await this.pool.query(query);
    if (!result.rows.length) {
      return false;
    }

    return result.rows[0]?.token;
  }
}

export default new AuthRepository();
