import React, {useState, useContext} from 'react';
import Modal from './Modal';
import FileDropZone from './FileDropZone';
import Cross from '../assets/cross.svg';
import { uploadDemandeurs } from '../api/demandeur';
import { UserContext } from '../context/UserContext';

const ImportModal = ({show, toggleShow, toggleReload}) => {
  const {handler} = useContext(UserContext);
  const [file, setFile] = useState(null);

  const handleUpload =  async () => {
    await handler({fn:uploadDemandeurs, param:file})
    toggleReload();
  }

  return (
    <Modal extra='flex flex-col gap-8 items-center justify-center w-[28rem] h-[25rem] bg-gray-300 rounded-lg overflow-hidden p-10 bg-opacity-50 shadow-sm' toggle={show}>
        <img src={Cross} alt="close modal" onClick={toggleShow}/>

        <FileDropZone file={file} setFile={setFile}/>
        {
          file &&
          (<button className='rounded-lg text-lg green-bg px-3 py-2 hover:bg-pink-400' onClick={handleUpload}>Valider</button>)
        }
    </Modal>
  )
}

export default ImportModal