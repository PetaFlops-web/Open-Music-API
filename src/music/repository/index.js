import { Pool } from "pg";
import { nanoid } from "nanoid";

class AlbumRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async addAlbums(album) {
    const id = `album-${nanoid(16)}`;

    const query = {
      text: `INSERT INTO albums VALUES($1, $2, $3) RETURNING id, name, year `,
      values: [id, album.name, album.year],
    };

    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async getAlbumsById(id) {
    const query = {
      text: `SELECT * FROM albums WHERE id = $1`,
      values: [id],
    };
    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async updateAlbumsById(id, album) {
    const query = {
      text: `UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id, name, year `,
      values: [album.name, album.year, id],
    };
    const result = await this.pool.query(query);
    return result.rows[0]?.id;
  }

  async deleteAlbumsById(id) {
    const query = {
      text: `DELETE FROM albums WHERE id = $1 RETURNING id`,
      values: [id],
    };
    const result = await this.pool.query(query);
    return result.rows[0]?.id;
  }
}

export default new AlbumRepositories();
