import dotenv from 'dotenv-defaults';
import { google } from 'googleapis';
import fs from 'fs';

import { getDiscordUser, addRoleToMember } from '../utils/dc-helper';
import config from '../utils/config';
import { encryptState, decryptState } from '../utils/state';

dotenv.config();

const CLIENT_SECRETS_FILE = '../../../client_secret.json';
const SCOPES = ['https://www.googleapis.com/auth/youtube.force-ssl']

const { 
  web: {
    client_id,
    client_secret,
    redirect_uris
  } 
} = JSON.parse(fs.readFileSync(__dirname + '/' + CLIENT_SECRETS_FILE));
const youtube = google.youtube('v3');

function generateOAuth2URL(state) {
  const oauth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  const url = oauth2Client.generateAuthUrl({
    access_type: 'online',
    prompt: 'consent',
    state: encryptState(state),
    scope: SCOPES
  });
  return url;
}

async function getMemberOnlyVideoComments({ code, state }) {
  try {
    const { userId, guildId, ytChannelAlias } = decryptState(state);
    const responsePrefix = `Your membership verification of \`${ytChannelAlias}\` `;
    console.log(userId);
    console.log(guildId);
    console.log(ytChannelAlias);
    
    const channel = config.channels.find(channel => channel.alias === ytChannelAlias);
    const user = await getDiscordUser(userId);
    if (!channel) {
      return user.send(responsePrefix + 'failed.');
    }
    
    const oauth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    youtube.commentThreads.list({
      auth: oauth2Client,
      part: 'id',
      videoId: channel.memberOnlyVideoId
    }, async function(err, response) {
      if (err) {
        console.log(response);
        return user.send(responsePrefix + 'failed.');
      }

      await addRoleToMember(userId, guildId, channel.roleId);
      return user.send(responsePrefix + 'succeeded.');
    });
  }
  catch (error) {
    console.log(error);
  }
}

export { generateOAuth2URL, getMemberOnlyVideoComments };