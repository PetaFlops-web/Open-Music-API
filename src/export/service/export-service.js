import amqp from "amqplib";
import PlaylistRepository from "../../playlists/repository/index.js";
import { AuthorizationError, NotFoundError } from "../../exceptions/index.js";

const ExportService = {
  sendMessage: async (queue, message, owner, playlistId) => {
    const playlist = await PlaylistRepository.getPlaylistById(playlistId);

    if (!playlist) {
      throw new NotFoundError("Playlist tidak ditemukan");
    }

    const playListOwner = await PlaylistRepository.verifyPlaylistOwner(
      playlistId,
      owner,
    );

    if (!playListOwner) {
      throw new AuthorizationError("Anda tidak berhak mengakses resource ini");
    }

    const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
    const channel = await connection.createChannel();
    await channel.assertQueue("export:playlists", {
      durable: true,
    });

    await channel.sendToQueue(queue, Buffer.from(message));

    setTimeout(() => {
      connection.close();
    }, 1000);
  },
};

export default ExportService;
