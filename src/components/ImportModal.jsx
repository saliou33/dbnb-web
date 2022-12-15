import React, {useState, useContext} from 'react';
import Modal from './Modal';
import { uploadDemandeurs } from '../api/demandeur';
import FileDropZone from './FileDropZone';
import { ApplicationContext } from '../context/ApplicationContext';

const ImportModal = ({show, toggleShow, toggleReload}) => {
  const {handler} = useContext(ApplicationContext);
  const [file, setFile] = useState(null);

  const handleUpload =  async () => {
    await handler({fn:uploadDemandeurs, param:file})
    toggleReload();
  }

  return (
    <Modal extra='flex flex-col gap-8 items-center justify-center w-[25rem] h-[25rem] bg-white rounded-full p-10 overflow-hidden bg-opacity-80' toggle={show}>
        <span className='text-red-500 text-3xl' onClick={toggleShow}>X</span>
        <FileDropZone file={file} setFile={setFile}/>
        {
          file &&
          (<button className='rounded-lg text-lg green-bg px-3 py-2 hover:bg-pink-400' onClick={handleUpload}>Valider</button>)
        }
    </Modal>
  )
}

export default ImportModal