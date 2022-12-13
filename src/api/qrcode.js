import { remote } from '../utils/api';

export const createQrcode = async (data) => {
  const result = await remote.post('/qrcodes', data);
  return result;
};
