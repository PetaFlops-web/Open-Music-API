import response from "../../utils/responses.js";
import ExportService from "../service/export-service.js";

const exportPlaylistHandler = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { targetEmail } = req.validate;
    const { id: owner } = req.user;

    const message = {
      playlistId,
      targetEmail,
    };

    await ExportService.sendMessage(
      "export:playlists",
      JSON.stringify(message),
      owner,
      playlistId,
    );

    return response(res, 201, "Permintaan ekspor playlist sedang diproses");
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

export { exportPlaylistHandler };
