const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
});

export const sendBulkEmail = async ({
  subject,
  body,
  receivers,
}: {
  subject: string;
  body: string;
  receivers: string[];
}) => {
  for (const receiverEmailAddress of receivers) {
    const unsubscribeLink = `${process.env.WEBSITE_URL}/unsubscribe?email=${receiverEmailAddress}`;

    await transporter.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: receiverEmailAddress,
      subject,
      html: `
      <h1>Perfecto</h1>
      
      <h3>${subject}</h3>
      
      <p>${body}</p>

      <p>Click <a href=${unsubscribeLink}>here</a> to unsubscribe</p>
    `,
    });
  }

  transporter.close();
};
