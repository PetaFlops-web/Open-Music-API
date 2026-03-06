import {
  addPlaylist,
  getPlaylists,
  addSongToPlaylist,
  getSongsInPlaylist,
  deleteSongInPlaylist,
  deletePlaylist,
} from "../service/playlist-service.js";
import response from "../../utils/responses.js";

const postPlaylistHandler = async (req, res) => {
  try {
    const { name } = req.validate;
    const { id: owner } = req.user;
    const playlistId = await addPlaylist({ name, owner });
    return response(res, 201, "Playlist berhasil ditambahkan", { playlistId });
  } catch (error) {
    if (error.name === "InvariantError") {
      return response(res, 400, error.message);
    }

    if (error.name === "NotFoundError") {
      return response(res, 404, error.message);
    }

    return response(res, 500, error.message);
  }
};

const getPlaylistsHandler = async (req, res) => {
  try {
    const { id: owner } = req.user;

    const playlists = await getPlaylists(owner);

    return response(res, 200, "Playlists retrieved successfully", {
      playlists,
    });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return response(res, 404, error.message);
    }
    return response(res, 500, "Terjadi kesalahan pada server");
  }
};

const addSongToPlaylistHandler = async (req, res) => {
  const { playlistId } = req.params;
  const { songId } = req.validate;
  const { id: owner } = req.user;

  try {
    const result = await addSongToPlaylist(playlistId, songId, owner);
    return response(res, 201, "Lagu berhasil ditambahkan ke playlist", {
      result,
    });
  } catch (error) {
    if (error.name === "InvariantError") {
      return response(res, 400, error.message);
    }

    if (error.name === "AuthorizationError") {
      return response(res, 403, error.message);
    }

    if (error.name === "NotFoundError") {
      return response(res, 404, error.message);
    }

    return response(res, 500, "Terjadi kesalahan pada server");
  }
};

const getSongsInPlaylistHandler = async (req, res) => {
  const { playlistId } = req.params;
  const { id: owner } = req.user;

  try {
    const songs = await getSongsInPlaylist(playlistId, owner);
    return response(res, 200, "Lagu dalam playlist retrieved successfully", {
      playlist: songs,
    });
  } catch (error) {
    if (error.name === "AuthorizationError") {
      return response(res, 403, error.message);
    }
    if (error.name === "NotFoundError") {
      return response(res, 404, error.message);
    }
    return response(res, 500, "Terjadi kesalahan pada server");
  }
};

const deleteSongInPlaylistHandler = async (req, res) => {
  const { playlistId } = req.params;
  const { songId } = req.body;
  const { id: owner } = req.user;

  try {
    const result = await deleteSongInPlaylist(playlistId, songId, owner);
    return response(res, 200, "Lagu berhasil dihapus dari playlist", {
      result,
    });
  } catch (error) {
    if (error.name === "InvariantError") {
      return response(res, 400, error.message);
    }

    if (error.name === "AuthorizationError") {
      return response(res, 403, error.message);
    }

    if (error.name === "NotFoundError") {
      return response(res, 404, error.message);
    }

    return response(res, 500, "Terjadi kesalahan pada server");
  }
};

const deletePlaylistHandler = async (req, res) => {
  const { playlistId } = req.params;
  const { id: owner } = req.user;

  try {
    const result = await deletePlaylist(playlistId, owner);
    return response(res, 200, "Playlist berhasil dihapus", {
      result,
    });
  } catch (error) {
    if (error.name === "AuthorizationError") {
      return response(res, 403, error.message);
    }

    if (error.name === "NotFoundError") {
      return response(res, 404, error.message);
    }

    return response(res, 500, "Terjadi kesalahan pada server");
  }
};

export {
  postPlaylistHandler,
  getPlaylistsHandler,
  addSongToPlaylistHandler,
  getSongsInPlaylistHandler,
  deleteSongInPlaylistHandler,
  deletePlaylistHandler,
};
