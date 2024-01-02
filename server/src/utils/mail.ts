import nodemailer from "nodemailer";
import path from "path";

import {
  MAILTRAP_PASS,
  MAILTRAP_USER,
  PASSWORD_RESET_LINK,
  SIGN_IN_URL,
  VERIFICATION_EMAIL,
} from "#/utils/variables";
import { generateTemplate } from "#/mail/template";

const generateMailTranspoter = () => {
  return nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: MAILTRAP_USER,
      pass: MAILTRAP_PASS,
    },
  });
};

interface Profile {
  name: string;
  email: string;
  userId: string;
}

export const sendVerificationMail = async (token: string, profile: Profile) => {
  const transport = generateMailTranspoter();

  const { name, email, userId } = profile;

  transport.sendMail({
    from: VERIFICATION_EMAIL, // sender address
    to: email, // list of receivers
    subject: "EMAIL VARIFICATION", // Subject line
    html: generateTemplate({
      title: "Welcome to Podify!!",
      message: `Hi, ${name}, welcome to Podify!!`,
      logo: "cid:logo",
      banner: "cid:welcome",
      link: "#",
      btnTitle: token,
    }),
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, "../mail/logo.png"),
        cid: "logo",
      },
      {
        filename: "welcome.png",
        path: path.join(__dirname, "../mail/welcome.png"),
        cid: "welcome",
      },
    ],
  });
};

interface Options {
  email: string;
  link: string;
}
export const sendForgetPasswordLink = async (options: Options) => {
  const transport = generateMailTranspoter();

  const { email, link } = options;

  transport.sendMail({
    from: VERIFICATION_EMAIL, // sender address
    to: email, // list of receivers
    subject: "RESET PASSWORD", // Subject line
    html: generateTemplate({
      title: "Forget Password",
      message: `Please go to this link below to create a new password`,
      logo: "cid:logo",
      banner: "cid:forget_password",
      link,
      btnTitle: "Reset Password",
    }),
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, "../mail/logo.png"),
        cid: "logo",
      },
      {
        filename: "forget_password.png",
        path: path.join(__dirname, "../mail/forget_password.png"),
        cid: "forget_password",
      },
    ],
  });
};

export const sendPassResetSuccessEmail = async (
  name: string,
  email: string
) => {
  const transport = generateMailTranspoter();

  transport.sendMail({
    from: VERIFICATION_EMAIL, // sender address
    to: email, // list of receivers
    subject: "PASSWORD UPDATED", // Subject line
    html: generateTemplate({
      title: "Password updated",
      message: `Your password has been changed successfully.`,
      logo: "cid:logo",
      banner: "cid:forget_password",
      link: SIGN_IN_URL,
      btnTitle: "Log in",
    }),
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, "../mail/logo.png"),
        cid: "logo",
      },
      {
        filename: "forget_password.png",
        path: path.join(__dirname, "../mail/forget_password.png"),
        cid: "forget_password",
      },
    ],
  });
};
