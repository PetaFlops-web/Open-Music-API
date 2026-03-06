import SongsRepositorys from "../repository/index.js";
import { InvariantError, NotFoundError } from "../../exceptions/index.js";

const addSong = async (data) => {
  if (!data.title || !data.year || !data.performer || !data.genre) {
    throw new InvariantError(
      "Gagal menambahkan lagu. Mohon isi judul, tahun, penyanyi, dan genre lagu, dan performer.",
    );
  }

  const result = await SongsRepositorys.addSong(data);
  if (!result) {
    throw new InvariantError("Lagu gagal ditambahkan");
  }
  return result;
};

const getSongs = async () => {
  const result = await SongsRepositorys.getSongs();

  return result;
};

const getSongById = async (id) => {
  const result = await SongsRepositorys.getSongById(id);

  if (!result) {
    throw new NotFoundError("Lagu tidak ditemukan");
  }

  return result;
};

const editSongById = async (id, data) => {
  const result = await SongsRepositorys.updateSongById(id, data);
  if (!result) {
    throw new NotFoundError("Song tidak ditemukan");
  }

  return result;
};

const deleteSongById = async (id) => {
  const result = await SongsRepositorys.deleteSongById(id);

  if (!result) {
    throw new NotFoundError("Song tidak ditemukan");
  }

  return result;
};

export { addSong, getSongs, getSongById, editSongById, deleteSongById };
