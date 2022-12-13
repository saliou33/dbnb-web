import React, {useCallback, useState} from 'react';
import { useDropzone } from 'react-dropzone';

const FileDropZone = ({file, setFile}) => {

  const onDrop = useCallback(files => {
    if(files) {

      setFile(files[0])
    } else {
      alert('Cliquer pour choisir le fichier!');
    }
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls']
    },
    multiple: false,
    maxFiles: 1,
  })

  return (
    <div {...getRootProps()} className="bg-gray-200 border-dashed border-2 border-gray-600 hover:bg-gray-300 cursor-pointer rounded-lg p-10 text-center">
      <input {...getInputProps()} name='file' id='file'/>
      { 
        isDragActive ?
          <p className='text-pink-400'>Déposer le fichier ici ...</p> :
          <p className='text-gray-700'>Déposer un fichier, ou <span  className='underline'>cliquer</span> pour sélectionner</p>
      }
      {file && <p className='font-semibold text-gray-800 mt-2'>Fichier: {file.name}</p>}
    </div>
  )
}

export default FileDropZone