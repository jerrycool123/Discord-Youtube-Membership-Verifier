import base64url from 'base64url';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_SECRET = crypto.randomBytes(32).toString('hex');

function encryptState(payload) {
  const token = jwt.sign(payload, JWT_SECRET);
  return base64url.encode(token);
}

function decryptState(token) {
  const payload = jwt.verify(base64url.decode(token), JWT_SECRET);
  return payload;
}

export { encryptState, decryptState };