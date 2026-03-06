import PlaylistRepository from "../repository/index.js";
import SongsRepositorys from "../../song/repository/index.js";
import {
  InvariantError,
  NotFoundError,
  AuthorizationError,
} from "../../exceptions/index.js";
const addPlaylist = async (payload) => {
  const { name, owner } = payload;
  const playlistId = await PlaylistRepository.addPlaylist({ name, owner });

  if (!playlistId) {
    throw new InvariantError("Playlist gagal ditambahkan");
  }

  return playlistId;
};

const getPlaylists = async (owner) => {
  const playlists = await PlaylistRepository.getPlaylists(owner);

  if (!playlists) {
    throw new NotFoundError("Playlist tidak ditemukan");
  }

  return playlists;
};

const addSongToPlaylist = async (playlistId, songId, owner) => {
  const song = await SongsRepositorys.getSongById(songId);
  if (!song) {
    throw new NotFoundError("Lagu tidak ditemukan");
  }

  const playlistOwner = await PlaylistRepository.verifyPlaylistOwner(
    playlistId,
    owner,
  );

  if (!playlistOwner) {
    throw new AuthorizationError("Anda tidak memiliki akses ke playlist ini");
  }

  const result = await PlaylistRepository.addSongToPlaylist(playlistId, songId);

  if (!result) {
    throw new InvariantError("Gagal menambahkan lagu ke playlist");
  }

  return result;
};

const getSongsInPlaylist = async (playlistId, owner) => {
  const playlist = await PlaylistRepository.getPlaylistById(playlistId);

  if (!playlist) {
    throw new NotFoundError("Playlist tidak ditemukan");
  }

  const playlistOwner = await PlaylistRepository.verifyPlaylistOwner(
    playlistId,
    owner,
  );

  if (!playlistOwner) {
    throw new AuthorizationError("Anda tidak memiliki akses ke playlist ini");
  }

  const result = await PlaylistRepository.getSongsInPlaylist(playlistId);

  return result;
};

const deleteSongInPlaylist = async (playlistId, songId, owner) => {
  const playlistOwner = await PlaylistRepository.verifyPlaylistOwner(
    playlistId,
    owner,
  );

  if (!playlistOwner) {
    throw new AuthorizationError("Anda tidak memiliki akses ke playlist ini");
  }

  // kenapa harus menggunakan InvariantError?
  const result = await PlaylistRepository.deleteSongInPlaylist(
    playlistId,
    songId,
  );

  if (!result) {
    throw new InvariantError("Song tidak ditemukan di playlist");
  }

  return result;
};

const deletePlaylist = async (playlistId, owner) => {
  const playlistOwner = await PlaylistRepository.verifyPlaylistOwner(
    playlistId,
    owner,
  );

  if (!playlistOwner) {
    throw new AuthorizationError("Anda tidak memiliki akses ke playlist ini");
  }

  const result = await PlaylistRepository.deletePlaylist(playlistId);

  if (!result) {
    throw new InvariantError("Playlist tidak ditemukan");
  }
  return result;
};

export {
  addPlaylist,
  getPlaylists,
  addSongToPlaylist,
  getSongsInPlaylist,
  deleteSongInPlaylist,
  deletePlaylist,
};
