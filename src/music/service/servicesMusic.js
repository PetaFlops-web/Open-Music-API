import AlbumRepositories from "../repository/index.js";

import {
  InvariantError,
  NotFoundError,
  AuthorizationError,
} from "../../exceptions/index.js";

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

const addLikeAlbum = async (userId, albumId) => {
  if (!userId) throw new AuthorizationError("No Authorization");

  const album = await AlbumRepositories.getAlbumsById(albumId);

  if (!album) throw new NotFoundError("Album tidak ditemukan");

  const albumDuplicateLike = await AlbumRepositories.checkDuplicateLike(
    userId,
    albumId,
  );

  if (albumDuplicateLike)
    throw new AuthorizationError("Anda sudah menyukai album ini");

  const result = await AlbumRepositories.likeAlbum(userId, albumId);
  return result;
};

const countLikeAlbum = async (albumId) => {
  const result = await AlbumRepositories.countLike(albumId);
  return result;
};

const unlikeAlbum = async (userId, albumId) => {
  if (!userId) throw new AuthorizationError("No Authorization");

  const album = await AlbumRepositories.getAlbumsById(albumId);

  if (!album) throw new NotFoundError("Album tidak ditemukan");

  const result = await AlbumRepositories.deleteLike(userId, albumId);
  return result;
};

export {
  addAlbums,
  getAlbumsById,
  editAlbumsById,
  deleteAlbumsById,
  addLikeAlbum,
  countLikeAlbum,
  unlikeAlbum,
};
