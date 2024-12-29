import nodemailer from 'nodemailer';
import config from '../config';

const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // true for port 465, false for other ports
    auth: {
      user: 'mdsujon258549@gmail.com',
      pass: 'kbla tjpt goaf suwr',
    },
  });

  await transporter.sendMail({
    from: 'mdsujon258549@gmail.com', // sender address
    to: `${to}`, // list of receivers
    subject: 'Reset Your Password with 10mins', // Subject line
    text: 'Reset Your Password with 10mins', // plain text body
    html: `${html}`, // html body
  });
};

export default sendEmail;
