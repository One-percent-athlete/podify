import { createAudio, getLastestUploads, updateAudio } from "#/controllers/audio";
import { isVerified, mustAuth } from "#/middlewear/auth";
import fileParser from "#/middlewear/fileParser";
import { validate } from "#/middlewear/validator";
import { AudioValidationSchema } from "#/utils/validationSchema";
import { Router } from "express";

const router = Router();

router.post(
  "/create",
  mustAuth,
  isVerified,
  fileParser,
  validate(AudioValidationSchema),
  createAudio
);

router.patch(
  "/:audioId",
  mustAuth,
  isVerified,
  fileParser,
  validate(AudioValidationSchema),
  updateAudio
);

router.get("/latest", getLastestUploads);

export default router;
