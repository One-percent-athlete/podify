import * as yup from "yup";
import { isValidObjectId } from "mongoose";

export const CreateUserSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is missing...")
    .min(3, "Name is too short!!")
    .max(20, "Name is too long!!"),

  email: yup.string().required("Email is missing...").email("Invalid email..."),

  password: yup
    .string()
    .trim()
    .required("Password is missing...")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

export const TokenAndIdValidation = yup.object().shape({
  token: yup.string().trim().required("Invalid email"),
  userId: yup
    .string()
    .transform(function (value) {
      if (this.isType(value) && isValidObjectId(value)) {
        return value;
      } else {
        return "";
      }
    })
    .required("Invalid user id."),
});

export const UpdatePasswordSchema = yup.object().shape({
  token: yup.string().trim().required("Invalid email"),
  userId: yup
    .string()
    .transform(function (value) {
      if (this.isType(value) && isValidObjectId(value)) {
        return value;
      } else {
        return "";
      }
    })
    .required("Invalid user id."),

  password: yup
    .string()
    .trim()
    .required("Password is missing...")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

export const SignInValidationSchema = yup.object().shape({
  email: yup.string().required("Email is missing...").email("Invalid email..."),
  password: yup.string().trim().required("Password is missing..."),
});
