import {
  addAlbums,
  getAlbumsById,
  editAlbumsById,
  deleteAlbumsById,
} from "../service/servicesMusic.js";
import response from "../../utils/responses.js";

const createAlbumHandler = async (req, res) => {
  try {
    const data = req.validate;

    const result = await addAlbums(data);

    return response(res, 201, "Albums added successfully", {
      albumId: result.id,
    });
  } catch (error) {
    if (error.name === "InvariantError") {
      return response(res, 400, error.message);
    }
    return response(res, 500, "Terjadi kesalahan pada server");
  }
};

const getAlbumsByIdHandler = async (req, res) => {
  try {
    const { albumId } = req.params;
    const result = await getAlbumsById(albumId);
    return response(res, 200, "Albums retrieved successfully", {
      album: result,
    });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return response(res, 404, error.message);
    }

    return response(res, 500, "Terjadi kesalahan pada server");
  }
};

const editAlbumHandler = async (req, res) => {
  try {
    const { albumId } = req.params;
    const data = req.validate;

    await editAlbumsById(albumId, data);

    return response(res, 200, "Albums updated successfully");
  } catch (error) {
    if (error.name === "InvariantError") {
      return response(res, 400, error.message);
    }

    if (error.name === "NotFoundError") {
      return response(res, 404, error.message);
    }

    return response(res, 500, "Terjadi kesalahan pada server");
  }
};

const deleteAlbumHandler = async (req, res) => {
  try {
    const { albumId } = req.params;
    await deleteAlbumsById(albumId);
    return response(res, 200, "Albums deleted successfully");
  } catch (error) {
    if (error.name === "InvariantError") {
      return response(res, 400, error.message);
    }

    if (error.name === "NotFoundError") {
      return response(res, 404, error.message);
    }
    return response(res, 500, "Terjadi kesalahan pada server");
  }
};

export {
  createAlbumHandler,
  getAlbumsByIdHandler,
  editAlbumHandler,
  deleteAlbumHandler,
};
