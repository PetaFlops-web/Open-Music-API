import { Pool } from "pg";

class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylist(playlistId) {
    const queryPlaylist = {
      text: "SELECT playlists.id, playlists.name, users.username FROM playlists JOIN users ON playlists.owner = users.id WHERE playlists.id = $1",
      values: [playlistId],
    };

    const resultPlaylist = await this._pool.query(queryPlaylist);

    if (!resultPlaylist.rows.length) {
      return null;
    }

    let playlist = resultPlaylist.rows[0];

    const querySongs = {
      text: "SELECT songs.id, songs.title, songs.performer FROM playlist_songs JOIN songs ON playlist_songs.song_id = songs.id WHERE playlist_songs.playlist_id = $1",
      values: [playlistId],
    };

    const resultSongs = await this._pool.query(querySongs);

    playlist.songs = resultSongs.rows;

    return playlist;
  }
}

export default PlaylistService;
