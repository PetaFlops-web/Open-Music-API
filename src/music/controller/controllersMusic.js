import {
  addAlbums,
  getAlbumsById,
  editAlbumsById,
  deleteAlbumsById,
  uploadCover,
  addLikeAlbum,
  countLikeAlbum,
  unlikeAlbum,
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

const uploadCoverHandler = async (req, res) => {
  try { 
     const { albumId } = req.params;
     const cover = await uploadCover(req.file, albumId)
     return response(res, 201, "Sampul album berhasil diunggah", cover);
  } catch(error) {
    console.error(error)

    if (error.code == 'LIMIT_FILE_SIZE') {
      return response(res, 413, "Ukuran file terlalu besar. Maksimal 512KB");
    }

    if(error.name === 'InvariantError' || error.name === 'ClientError') {
      return response(res, 400, error.message)
    }


    return response(res, 500,"Terjadi Kesalahan pada server")
  }
}

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

const addLikeAlbumHandler = async (req, res) => {
  try {
    const { albumId } = req.params;
    const { id: owner } = req.user;
    await addLikeAlbum(owner, albumId);
    return response(res, 201, "Albums liked successfully");
  } catch (error) {
    if (error.name === "NotFoundError") {
      return response(res, 404, error.message);
    }

    if (error.name === "AuthorizationError") {
      return response(res, 400, error.message);
    }

    return response(res, 500, "Terjadi kesalahan pada server");
  }
};

const countLikeAlbumHandler = async (req, res) => {
  try {
    const { albumId } = req.params;
    const result = await countLikeAlbum(albumId);

    res.header("X-Data-Source", result.source);

    return response(res, 200, "Albums retrieved successfully", {
      likes: Number(result.likes),
    });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return response(res, 404, error.message);
    }
  }
};

const unlikeAlbumHandler = async (req, res) => {
  try {
    const { albumId } = req.params;
    const { id: owner } = req.user;
    await unlikeAlbum(owner, albumId);
    return response(res, 200, "Albums unliked successfully");
  } catch (error) {
    if (error.name === "NotFoundError") {
      return response(res, 404, error.message);
    }

    if (error.name === "AuthorizationError") {
      return response(res, 400, error.message);
    }

    return response(res, 500, "Terjadi kesalahan pada server");
  }
};

export {
  createAlbumHandler,
  getAlbumsByIdHandler,
  editAlbumHandler,
  deleteAlbumHandler,
  uploadCoverHandler
  addLikeAlbumHandler,
  countLikeAlbumHandler,
  unlikeAlbumHandler,
};
