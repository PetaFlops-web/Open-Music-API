import { Pool } from "pg";
import { nanoid } from "nanoid";
import CacheService from "../../cache/redis-service.js";

class AlbumRepositories {
  constructor() {
    this.pool = new Pool();
    this.cache = new CacheService();
    this.expired = 1800;
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

  async likeAlbum(userId, albumId) {
    const id = `user_album_likes-${nanoid(16)}`;
    const query = {
      text: `INSERT INTO user_album_likes(id, user_id, album_id) VALUES($1, $2, $3) RETURNING id, user_id, album_id`,
      values: [id, userId, albumId],
    };

    const result = await this.pool.query(query);

    await this.cache.delete(`likes:${albumId}`);

    return result.rows[0];
  }

  async checkDuplicateLike(userId, albumId) {
    const query = {
      text: "SELECT COUNT(*) FROM user_album_likes WHERE user_id = $1 AND album_id = $2",
      values: [userId, albumId],
    };

    const result = await this.pool.query(query);

    return result.rows[0].count > 0;
  }

  async countLike(albumId) {
    const cacheKey = `likes:${albumId}`;

    try {
      const cache = await this.cache.get(cacheKey);

      if (cache) {
        return {
          source: "cache",
          likes: JSON.parse(cache),
        };
      }

      return cache ? parseInt(cache) : 0;
    } catch {
      const query = {
        text: "SELECT COUNT(*) FROM user_album_likes WHERE album_id = $1 ",
        values: [albumId],
      };

      const result = await this.pool.query(query);

      await this.cache.set(
        `likes:${albumId}`,
        JSON.stringify(result.rows[0].count),
        this.expired,
      );

      return {
        source: "database",
        likes: result.rows[0].count,
      };
    }
  }

  async deleteLike(userId, albumId) {
    const query = {
      text: "DELETE FROM user_album_likes WHERE user_id = $1 AND album_id = $2 RETURNING id",
      values: [userId, albumId],
    };
    const result = await this.pool.query(query);

    if (result.rows[0]) await this.cache.delete(`likes:${albumId}`);

    return result.rows[0]?.id;
  }
}

export default new AlbumRepositories();
