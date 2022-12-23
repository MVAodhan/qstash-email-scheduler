import { Client } from '@upstash/qstash';

const qstashClient = new Client({
  token: process.env.QSTASH_TOKEN,
});

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(404).end();

  const qstashResponse = await qstashClient.publishJSON({
    url: `https://${request.headers.host}/api/notify`,
    body: request.body,
    notBefore: request.query.timestamp,
  });

  response.status(201).send(qstashResponse);
}
