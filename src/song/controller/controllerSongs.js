import {
  addSong,
  getSongs,
  getSongById,
  editSongById,
  deleteSongById,
} from "../service/serviceSongs.js";
import response from "../../utils/responses.js";

const createSongHandler = async (req, res) => {
  try {
    const data = req.validate;
    const result = await addSong(data);
    return response(res, 201, "Song added successfully", {
      songId: result.id,
    });
  } catch (error) {
    if (error.name === "InvariantError") {
      return response(res, 400, error.message);
    }

    return response(res, 500, "Terjadi kesalahan pada server");
  }
};

const getSongsHandler = async (req, res) => {
  try {
    const result = await getSongs();

    return response(res, 200, "Songs retrieved successfully", {
      songs: result,
    });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return response(res, 404, error.message);
    }

    return response(res, 500, "Terjadi kesalahan pada server");
  }
};

const getSongsByIdHandler = async (req, res) => {
  try {
    const { songId } = req.params;
    const result = await getSongById(songId);

    return response(res, 200, "Song retrieved successfully", { song: result });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return response(res, 404, error.message);
    }

    return response(res, 500, "Terjadi kesalahan pada server");
  }
};

const editSongByIdHandler = async (req, res) => {
  try {
    const { songId } = req.params;
    const data = req.validate;

    await editSongById(songId, data);

    return response(res, 200, "Song updated successfully");
  } catch (error) {
    if (error.name === "NotFoundError") {
      return response(res, 404, error.message);
    }
    if (error.name === "InvariantError") {
      return response(res, 400, error.message);
    }
    return response(res, 500, "Terjadi kesalahan pada server");
  }
};

const deleteSongByIdHandler = async (req, res) => {
  try {
    const { songId } = req.params;

    await deleteSongById(songId);

    return response(res, 200, "Song deleted successfully");
  } catch (error) {
    if (error.name === "NotFoundError") {
      return response(res, 404, error.message);
    }

    return response(res, 500, "Terjadi kesalahan pada server");
  }
};

export {
  createSongHandler,
  getSongsHandler,
  getSongsByIdHandler,
  editSongByIdHandler,
  deleteSongByIdHandler,
};
