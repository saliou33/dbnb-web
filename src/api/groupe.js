import { remote } from '../utils/api';

export const getGroupes = async (data) => {
  const result = await remote.get('/groupes', data);
  return result;
};

export const getGroupe = async (id) => {
  const result = await remote.get(`/groupes/${id}`);
  return result;
};

export const createGroupe = async (data) => {
  const result = await remote.post('/groupes/', data);
  return result;
};
