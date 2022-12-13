
import React, { useMemo, useEffect, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import CustomButton from './CustomButton';
import { getDemandeurs, deleteDemandeurs, updateDemandeur } from '../api/demandeur';
import { createGroupe } from '../api/groupe';
import ImportModal from './ImportModal';
import Modal from './Modal';
import { Button } from '@mui/material';
import TableSvg from '../assets/table.svg';
import ImportSvg from '../assets/import.svg';
import CreateSvg from '../assets/create..svg';


const msgIrreversible = "Action irréversible!, Vous voulez toujours continuer?"

const Demandeurs = () => {

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [reload, setReload] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [showImport, setShowImport] = useState(false);

  const toggleMode = () => setIsFullScreen(prev => !prev);
  const toggleReload = () => setReload(prev => !prev);
  const toggleShowImport = () => setShowImport(prev => !prev);

  const getIdArray = (rows) => rows.map((table) => table.getSelectedRowModel().flatRows.map(row => row.getValue('id')));
  
  const columns = useMemo(
    () => [
      {
        id: 'id',
        accessorKey: 'id',
        header: 'ID',
        enableColumnOrdering: false,
        enableEditing: false,
        enableSorting: false,
        size: 80,
      },
      {
        accessorFn: (row) => `${row.prenom} ${row.nom}`,
        header: 'Nom',
      },
      {
        accessorKey: 'cni',
        header: 'CNI'
      },
      {
        accessorKey: 'tel',
        header: 'Tel'
      },
      {
        accessorKey: 'categorie_sociale',
        header: 'Catégorie Social'
      },
      {
        accessorKey: 'is_selected',
        header: 'Sélectionné',
        Cell: ({ cell }) => {
          return <div>{cell.getValue()? 'Oui': 'Non'}</div>;
        },
      },
      {
        accessorKey: 'selection_expiration_date',
        header: 'Date Expiration',
        show: false,
      }
  
    ]
    )
  
  useEffect(() => {
    const fetchData = async() => {
        const {data} = await getDemandeurs();
        setDataList(data?.demandeurs);
    }
  
    fetchData();
  }, [reload])

  return (
    <div className='flex flex-col gap-5'>
      <h1 className='text-3xl font-bold'>Demandeurs</h1>
      <span className='border-b-2 max-w-64 h-1 border-gray-400 block'></span>

      <div className='flex gap-4 items-end'>
        <CustomButton handler={toggleMode} icon={TableSvg} text='Données Demandeurs' />
        <CustomButton handler={() => setShowImport(true)} icon={ImportSvg} text='Importer la liste des demandeurs(.xls, .csv)'/>
        <CustomButton icon={CreateSvg}  text='créer un demandeur'/>
      </div>

      {!isFullScreen && showImport && (
        <ImportModal show={showImport} toggleShow={toggleShowImport}  />
      )}

     {isFullScreen && (
       <MaterialReactTable 
       columns={columns} 
       data={dataList} 
       enableColumnFilters
       enableColumnOrdering
       enableGrouping
       enablePinning
       enableRowActions
       enableRowSelection
       initialState={{ showColumnFilters: false, isFullScreen: isFullScreen }}
       onIsFullScreenChange={() => {
        if(isFullScreen) {
          toggleMode();
          return true;
        } else return false;
       }}

       renderTopToolbarCustomActions={({ table }) => {

        const handleDelete = async () => {
          
          if(prompt(msgIrreversible)) {
            const ids = getIdArray(table);

            const {data} = await deleteDemandeurs({demandeurs: ids});
            alert(data?.msg);
          }
         
        };
        const handleUpdate = async () => {
          alert('Fonctionnalité Pas Encore Prise En Compte');
        };

        const handleCreateGroupe = async () => {
          alert(ids);

          // const ids = getIdArray(table);

          // const {data} = await deleteDemandeurs({demandeurs: ids});
          // alert(data?.msg);
        };

        return (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            
            <Button
              color="success"
              disabled={table.getSelectedRowModel().flatRows.length === 0}
              onClick={handleCreateGroupe}
              variant="contained"
            >
              Créer Un groupe
            </Button>

            <Button
              color="error"
              disabled={table.getSelectedRowModel().flatRows.length === 0}
              onClick={handleDelete}
              variant="contained"
            >
              Supprimer
            </Button>

            <Button
              color="secondary"
              disabled={table.getSelectedRowModel().flatRows.length != 1}
              onClick={handleUpdate}
              variant="contained"
            >
              Modifier
            </Button>

          
          </div>
        );
      }}
       />
     )}
    </div>
  )
}

export default Demandeurs