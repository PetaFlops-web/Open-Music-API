import { Pool } from "pg";
import { nanoid } from "nanoid";
class SongsRepositorys {
  constructor() {
    this.pool = new Pool();
  }

  async addSong(song) {
    const id = `song-${nanoid(16)}`;

    const query = {
      text: `INSERT INTO songs(id, title, year, genre, performer, duration, "albumId") 
           VALUES($1, $2, $3, $4, $5, $6, $7) 
           RETURNING id`,
      values: [
        id,
        song.title,
        song.year,
        song.genre,
        song.performer,
        song.duration,
        song.albumId,
      ],
    };

    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async getSongs() {
    const query = {
      text: `SELECT id, title, performer FROM songs`,
    };

    const result = await this.pool.query(query);

    return result.rows;
  }

  async getSongById(id) {
    const query = {
      text: `SELECT * FROM songs WHERE id = $1`,
      values: [id],
    };

    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async updateSongById(id, song) {
    const query = {
      text: `UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, "albumId" = $6 
           WHERE id = $7 RETURNING id`,
      values: [
        song.title,
        song.year,
        song.genre,
        song.performer,
        song.duration,
        song.albumId,
        id,
      ],
    };

    const result = await this.pool.query(query);
    return result.rows[0]?.id;
  }

  async deleteSongById(id) {
    const query = {
      text: `DELETE FROM songs WHERE id = $1 RETURNING id`,
      values: [id],
    };

    const result = await this.pool.query(query);
    return result.rows[0]?.id;
  }
}

export default new SongsRepositorys();
