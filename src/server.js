import 'core-js/stable';
import 'regenerator-runtime';
import express from 'express';
import dotenv from 'dotenv-defaults';
import fs from 'fs';
import https from 'https';
import './discord/bot';

import { getMemberOnlyVideoComments } from './discord/utils/youtube';

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 8080
const httpsCredentials = {
  key: fs.readFileSync(__dirname + '/../ssl/key.pem'),
  cert: fs.readFileSync(__dirname + '/../ssl/cert.pem')
};

app.get('/oauth2callback', async(req, res) => {
  const { code, state } = req.query;
  if (!code || !state) return res.status(404).send('');
  res.send("<script>window.close();</script>");
  await getMemberOnlyVideoComments(req.query);
});

https.createServer(httpsCredentials, app).listen(PORT, () => {
  console.log(`Server listening at port ${PORT}!`);
});