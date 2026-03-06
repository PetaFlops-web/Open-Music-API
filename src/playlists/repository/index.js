import { Pool } from "pg";
import { nanoid } from "nanoid";

class PlaylistRepository {
  constructor() {
    this.pool = new Pool();
  }

  async addPlaylist(payload) {
    const { name, owner } = payload;

    const id = `playlist-${nanoid(16)}`;

    const query = {
      text: "INSERT INTO playlists(id, name, owner) VALUES($1, $2, $3) RETURNING id",
      values: [id, name, owner],
    };

    const result = await this.pool.query(query);
    return result.rows[0].id;
  }

  async getPlaylists(owner) {
    const query = {
      text: "SELECT playlists.id, playlists.name, users.username FROM playlists JOIN users ON playlists.owner = users.id WHERE playlists.owner = $1",
      values: [owner],
    };

    const result = await this.pool.query(query);
    return result.rows;
  }

  async addSongToPlaylist(playlistId, songId) {
    const id = `playlist_song-${nanoid(16)}`;
    const query = {
      text: "INSERT INTO playlist_songs(id, playlist_id, song_id) VALUES($1, $2, $3) RETURNING id",
      values: [id, playlistId, songId],
    };
    const result = await this.pool.query(query);
    return result.rows[0].id;
  }

  async verifyPlaylistOwner(playlistId, ownerId) {
    const query = {
      text: "SELECT owner FROM playlists WHERE id = $1",
      values: [playlistId],
    };
    const result = await this.pool.query(query);

    if (!result.rows.length) {
      return false;
    }

    const playlist = result.rows[0];

    if (playlist.owner !== ownerId) {
      return false;
    }
    return true;
  }

  async getSongsInPlaylist(playlistId) {
    const queryPlaylist = {
      text: "SELECT playlists.id, playlists.name, users.username FROM playlists JOIN users ON playlists.owner = users.id WHERE playlists.id = $1",
      values: [playlistId],
    };

    const resultPlaylist = await this.pool.query(queryPlaylist);

    if (!resultPlaylist.rows.length) {
      return null;
    }

    let playlist = resultPlaylist.rows[0];

    const querySongs = {
      text: "SELECT songs.id, songs.title, songs.performer FROM playlist_songs JOIN songs ON playlist_songs.song_id = songs.id WHERE playlist_songs.playlist_id = $1",
      values: [playlistId],
    };

    const resultSongs = await this.pool.query(querySongs);

    playlist.songs = resultSongs.rows;

    return playlist;
  }
  async getPlaylistById(id) {
    const result = await this.pool.query(
      "SELECT owner FROM playlists WHERE id = $1",
      [id],
    );
    return result.rows[0];
  }
  async deleteSongInPlaylist(playlistId, songId) {
    const query = {
      text: "DELETE FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2 RETURNING id",
      values: [playlistId, songId],
    };

    const result = await this.pool.query(query);
    return result.rows[0]?.id;
  }

  async deletePlaylist(playlistId) {
    const query = {
      text: "DELETE FROM playlists WHERE id = $1 RETURNING id",
      values: [playlistId],
    };
    const result = await this.pool.query(query);
    return result.rows[0]?.id;
  }
}

export default new PlaylistRepository();
