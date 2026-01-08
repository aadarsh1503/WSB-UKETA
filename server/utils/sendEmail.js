import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.titan.email',
    port: 465,
    secure: true, 
    auth: {
      user: process.env.EMAIL_USER, // root@khaleeji.app
      pass: process.env.EMAIL_PASS, // 1*y)6Hk?gwKn&~]
    },
  });

  const mailOptions = {
    from: `"UK EETA System" <${process.env.EMAIL_FROM}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;