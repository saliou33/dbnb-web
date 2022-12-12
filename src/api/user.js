import { remote } from '../utils/api';

export const login = async (data) => {
  const result = await remote.post('/users/login', data);
  return result;
};

export const verify = async (token) => {
  const result = await remote.get('/users/verify');
  return result;
};

export const updateUser = async (data) => {
  const result = await remote.put('/users/', data);
  return result;
};
