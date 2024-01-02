import {
  createPlaylist,
  getAudios,
  getPlaylistByProfile,
  removePlaylist,
  updatePlaylist,
} from "#/controllers/playlist ";
import { isVerified, mustAuth } from "#/middlewear/auth";
import { validate } from "#/middlewear/validator";
import {
  NewPlaylistValidationSchema,
  OldPlaylistValidationSchema,
} from "#/utils/validationSchema";
import { Router } from "express";

const router = Router();

router.post(
  "/create",
  mustAuth,
  isVerified,
  validate(NewPlaylistValidationSchema),
  createPlaylist
);

router.patch(
  "/",
  mustAuth,
  validate(OldPlaylistValidationSchema),
  updatePlaylist
);

router.delete("/", mustAuth, removePlaylist);

router.get("/by-profile", mustAuth, getPlaylistByProfile);

router.get("/:playlistId", mustAuth, getAudios);

export default router;
