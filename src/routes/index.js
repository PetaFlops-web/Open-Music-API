import { Router } from "express";
import {
  createAlbumHandler,
  getAlbumsByIdHandler,
  editAlbumHandler,
  deleteAlbumHandler,
} from "../music/controller/controllersMusic.js";
import {
  createSongHandler,
  getSongsHandler,
  getSongsByIdHandler,
  editSongByIdHandler,
  deleteSongByIdHandler,
} from "../song/controller/controllerSongs.js";
import {
  postPlaylistHandler,
  getPlaylistsHandler,
  addSongToPlaylistHandler,
  getSongsInPlaylistHandler,
  deleteSongInPlaylistHandler,
  deletePlaylistHandler,
} from "../playlists/controller/playlist-controller.js";
import { exportPlaylistHandler } from "../export/controller/export-controller.js";
import { addAlbumSchema, editAlbumSchema } from "../music/validation/schema.js";
import { addSongSchema, editSongSchema } from "../song/validation/schema.js";
import {
  postPlaylistSchema,
  addSongToPlaylistSchema,
} from "../playlists/validation/schema.js";
import {
  addUserHandler,
  loginHandler,
  logoutHandler,
  refreshTokenHandler,
} from "../auth/controller/authController.js";
import {
  addUserSchema,
  loginUserSchema,
  refreshTokenSchema,
} from "../auth/validation/schema.js";
import validate from "../middleware/validate.js";
import authenticateToken from "../middleware/auth.js";
import { exportPayloadSchema } from "../export/validation/schema.js";

const router = Router();

// router albums
router.post("/albums", validate(addAlbumSchema), createAlbumHandler);
router.get("/albums/:albumId", getAlbumsByIdHandler);
router.put("/albums/:albumId", validate(editAlbumSchema), editAlbumHandler);
router.delete("/albums/:albumId", deleteAlbumHandler);

// router songs
router.post("/songs", validate(addSongSchema), createSongHandler);
router.get("/songs", getSongsHandler);
router.get("/songs/:songId", getSongsByIdHandler);
router.put("/songs/:songId", validate(editSongSchema), editSongByIdHandler);
router.delete("/songs/:songId", deleteSongByIdHandler);

// router users
router.post("/users", validate(addUserSchema), addUserHandler);

// router authentications
router.post("/authentications", validate(loginUserSchema), loginHandler);
router.put(
  "/authentications",
  validate(refreshTokenSchema),
  refreshTokenHandler,
);
router.delete("/authentications", validate(refreshTokenSchema), logoutHandler);

// router playlists
router.post(
  "/playlists",
  authenticateToken,
  validate(postPlaylistSchema),
  postPlaylistHandler,
);
router.get("/playlists", authenticateToken, getPlaylistsHandler);
router.post(
  "/playlists/:playlistId/songs",
  authenticateToken,
  validate(addSongToPlaylistSchema),
  addSongToPlaylistHandler,
);
router.get(
  "/playlists/:playlistId/songs",
  authenticateToken,
  getSongsInPlaylistHandler,
);
router.delete(
  "/playlists/:playlistId/songs",
  authenticateToken,
  deleteSongInPlaylistHandler,
);
router.delete(
  "/playlists/:playlistId",
  authenticateToken,
  deletePlaylistHandler,
);

// export router
router.post(
  "/export/playlists/:playlistId",
  authenticateToken,
  validate(exportPayloadSchema),
  exportPlaylistHandler,
);
export default router;
