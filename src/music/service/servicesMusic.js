import AlbumRepositories from "../repository/index.js";
import { InvariantError, NotFoundError } from "../../exceptions/index.js";

const addAlbums = async (data) => {
  const albums = await AlbumRepositories.addAlbums(data);

  if (!albums) {
    throw new InvariantError("Album gagal ditambahkan");
  }

  return albums;
};

const getAlbumsById = async (id) => {
  const result = await AlbumRepositories.getAlbumsById(id);
  if (!result) {
    throw new NotFoundError("Album tidak ditemukan");
  }

  return result;
};

const editAlbumsById = async (id, data) => {
  if (!data.name || !data.year) {
    throw new InvariantError(
      "Gagal memperbarui album. Mohon isi nama dan tahun.",
    );
  }

  if (id === undefined) {
    throw new NotFoundError("ID tidak ditemukan");
  }
  const result = await AlbumRepositories.updateAlbumsById(id, data);

  if (!result) {
    throw new NotFoundError("Album tidak ditemukan");
  }

  return result;
};

const deleteAlbumsById = async (id) => {
  const result = await AlbumRepositories.deleteAlbumsById(id);

  if (!result) {
    throw new NotFoundError("Album tidak ditemukan");
  }

  return result;
};

const uploadCover = async (file, albumId) => {
    if(!file) {
      throw new InvariantError('No cover uploaded');
    }

    const filename = file.filename;

    const host = process.env.HOST || 'localhost';
    const port = process.env.PORT || 5000;

    const encodedFilename = encodeURIComponent(filename);
    const fileLocation = `http://${host}:${port}/uploads/${encodedFilename}`;

    const cover = await AlbumRepositories.addCoverAlbumById(albumId, fileLocation)

    return cover;
}

export { addAlbums, getAlbumsById, editAlbumsById, deleteAlbumsById, uploadCover };
