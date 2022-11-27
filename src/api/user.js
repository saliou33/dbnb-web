import { remote } from '../utils/api';

export const login = async (data) => {
  const result = await remote.post('/login', data);
  return result;
};
