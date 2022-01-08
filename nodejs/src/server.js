import express from 'express';
import dotenv from 'dotenv-defaults';
import './discord/bot';

import { getMemberOnlyVideoComments } from './discord/utils/youtube';

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 8080

app.get('/oauth2callback', async(req, res) => {
  res.send("<script>window.close();</script>");
  await getMemberOnlyVideoComments(req.query);
});

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}!`);
});