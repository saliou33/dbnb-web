import { remote } from '../utils/api';

export const createQrcode = async (data) => {
  const result = await remote.post('/qrcodes/', data);
  return result;
};

export const getQrcodes = async (data) => {
  const result = await remote.get('/qrcodes/');
  return result;
}
