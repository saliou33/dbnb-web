import { remote } from '../utils/api';

export const createDemandeur = async (data) => {
  const result = await remote.post('/demandeurs/', data);
  return result;
};

export const getDemandeurs = async () => {
  const result = await remote.get('/demandeurs/');
  return result;
};

export const getDemandeur = async (id) => {
  const result = await remote.get(`/demandeurs/${id}`);
  return result;
};

export const uploadDemandeurs = async (file) => {
  const result = await remote.post(
    '/demandeurs/upload',
    { file },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return result;
};

export const uploadDemandeursCheck = async (file) => {
  const result = await remote.post(
    '/demandeurs/upload_check',
    { file },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return result;
};

export const selectDemandeurs = async (data) => {
  const result = await remote.post('/demandeurs/select', data);
  return result;
};

export const deselectDemandeurs = async (data) => {
  const result = await remote.post('/demandeurs/deselect', data);
  return result;
};

export const deleteDemandeur = async (id) => {
  const result = await remote.delete(`/demandeurs/${id}`);
  return result;
};
