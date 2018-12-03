import crypto from 'crypto';

import config from '../config/config';

export function createPass(pass){
  return crypto.createHmac('sha1', config.secret)
    .update(pass)
    .diggest('hex');
}

export function comparePass(user, pass){
  const checkPass = createPass(pass);
  return (checkPass === pass);
}