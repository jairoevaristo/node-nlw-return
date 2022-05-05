import nodemailer from 'nodemailer';

export const transport = nodemailer.createTransport({
  host: process.env.MAIL_PROVIDER_HOST,
  port: 2525,
  auth: {
    user: process.env.MAIL_PROVIDER_AUTH,
    pass: process.env.MAIL_PROVIDER_PASS
  }
});