import nodemailer from 'nodemailer';
import { verifySignature } from '@upstash/qstash/nextjs';

export const config = {
  api: { bodyParser: false },
};

export default verifySignature(handler, {
  currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY,
  nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY,
});

async function handler(request, response) {
  const emailAccount = await nodemailer.createTestAccount();

  const transport = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    auth: emailAccount,
  });

  await transport.sendMail({
    from: '"qStash" <qstash@upstash.com>',
    to: 'hamilton.aodhan@gmail.com',
    subject: 'Notification from qStash',
    text: request.body,
  });

  response.send();
}
