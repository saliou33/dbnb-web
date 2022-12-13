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

export const updateDemandeur = async (data) => {
  const result = await remote.get('/demandeurs/', data);
  return result;
};

export const uploadDemandeurs = async (file) => {
  let formData = new FormData();
  formData.append('file', file);

  const result = await remote.post('/demandeurs/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return result;
};

export const uploadDemandeursCheck = async (file) => {
  let formData = new FormData();
  formData.append('file', file);

  const result = await remote.post('/demandeurs/upload_check', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
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
export const deleteDemandeurs = async (data) => {
  const result = await remote.post('/demandeurs/delete', data);
  return result;
};
