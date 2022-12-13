import React, {useState} from 'react';
import Modal from './Modal';
import { uploadDemandeurs } from '../api/demandeur';
import FileDropZone from './FileDropZone';

const ImportModal = ({show, toggleShow}) => {
  const [file, setFile] = useState(null);

  const handleUpload =  async () => {
    let formData = new FormData();

    const {data} = await uploadDemandeurs(file);
    console.log(data);
  }

  return (
    <Modal extra='flex flex-col gap-8 items-center justify-center w-[25rem] h-[25rem] bg-white rounded-full p-10 overflow-hidden bg-opacity-80' toggle={show}>
        <span className='text-red-500 text-3xl' onClick={toggleShow}>X</span>
        <FileDropZone file={file} setFile={setFile}/>
        {
          file &&
          (<button className='rounded-lg text-lg green-bg px-3 py-2 hover:bg-blue-600' onClick={handleUpload}>Valider</button>)
        }
    </Modal>
  )
}

export default ImportModal