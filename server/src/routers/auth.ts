import { Router } from "express";
import { validate } from "#/middlewear/validator";
import {
  CreateUserSchema,
  SignInValidationSchema,
  TokenAndIdValidation,
  UpdatePasswordSchema,
} from "#/utils/validationSchema";
import {
  create,
  generateForgetPasswordLink,
  grantValid,
  logOut,
  sendProfile,
  sendReverificationToken,
  signIn,
  updatePassword,
  updateProfile,
  verifyEmail,
} from "#/controllers/auth";
import { isValidPasswordResetToken, mustAuth } from "#/middlewear/auth";

const router = Router();

router.post("/create", validate(CreateUserSchema), create);
router.post("/verify-email", validate(TokenAndIdValidation), verifyEmail);
router.post("/reverify-email", sendReverificationToken);
router.post("/forget-password", generateForgetPasswordLink);
router.post(
  "/verify-password-reset-token",
  validate(TokenAndIdValidation),
  isValidPasswordResetToken,
  grantValid
);
router.post(
  "/update-password",
  validate(UpdatePasswordSchema),
  isValidPasswordResetToken,
  updatePassword
);
router.post("/sign-in", validate(SignInValidationSchema), signIn);
router.get("/is-auth", mustAuth, sendProfile);

router.get("/public", (req, res) => {
  res.json({
    message: "You are in public page.",
  });
});
router.get("/private", mustAuth, (req, res) => {
  res.json({
    message: "You are in private page.",
  });
});

import fileParser from "#/middlewear/fileParser";

router.post("/update-profile", mustAuth, fileParser, updateProfile);

router.post("/log-out", mustAuth, logOut);

export default router;
