import React, {useState} from 'react';
import ButtonSubmit from './ButtonSubmit';
import InputGroup from './InputGroup';
import { createDemandeur } from '../api/demandeur';
import Modal from './Modal';

const DemandeurForm = ({toggle, toggleShow}) => {

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [cni, setCni] = useState('')
    const [tel, setTel] = useState('');
    const [categorie_sociale, setCs] = useState('');
    const [enqueteur, setEnq] = useState('')
    const [numero_depot, setNumDepot] = useState('')

    const handleSubmit = async () => {
        const {data} = await createDemandeur({
            categorie_sociale,
            numero_depot,
            enqueteur,
            prenom,
            nom,
            cni,
            tel,
        });

        console.log(data);
    }

  return (
    <>
    {
       toggle && (
         <Modal toggle={toggle} extra='p-3 flex flex-col gap-8 w-[60rem] p-8 bg-white bg-opacity-90 '>
            <h3 className='text-3xl font-bold text-center '>Créer un demandeur</h3>
            <form className='flex flex-col gap-1 p-6 bg-gray-300 w-[30rem] rounded-lg' >
                <InputGroup  id='nom' label='Nom' type='text' handler={setNom} />
                <InputGroup  id='prenom' label='Prénom' type='text' handler={setNom} />
                <InputGroup  id='cni' label='CNI' type='text' handler={setNom} />
                <InputGroup  id='tel' label='Téléphone' type='text' handler={setNom} />
                <InputGroup  id='enqueteur' label='Nom' type='text' handler={setNom} />
                <InputGroup  id='categorie_sociale' label='Catégorie Sociale' type='text' handler={setNom} />
                <InputGroup  id='numero_depot' label='Nom' type='text' handler={setNom} />
                
                <ButtonSubmit  handler={handleSubmit} text='Créer' style='sm:p-3 p-2 rounded-md text-xl
     font-bold bg-green-400 hover:bg-green-500 w-full'/>
            </form>
        </Modal>)
    }
    </>
  )
}

export default DemandeurForm