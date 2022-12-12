
import React, { useMemo, useEffect, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import CustomButton from './CustomButton';
import { getDemandeurs } from '../api/demandeur';
import { Button } from '@mui/material';
import TableSvg from '../assets/table.svg';
import ImportSvg from '../assets/import.svg';
import CreateSvg from '../assets/create..svg';

const Demandeurs = () => {

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const toggleMode = () => setIsFullScreen(prev => !prev);
  
  const columns = useMemo(
    () => [
      {
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
  }, [])

  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-3xl font-bold'>Demandeurs</h1>
      <span className='border-b-2 max-w-64 h-1 border-gray-400 block'></span>

      <div className='flex gap-2 items-end'>
        <CustomButton handler={toggleMode} icon={TableSvg} text='Demandeurs' />

        <CustomButton icon={ImportSvg} text='Importer la liste des demandeurs(.xls, .csv)'/>

        <CustomButton icon={CreateSvg}  text='créer un demandeur'/>
      </div>

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
        const handleDeactivate = () => {
          table.getSelectedRowModel().flatRows.map((row) => {
            alert('deactivating ' + row.getValue('name'));
          });
        };

        const handleActivate = () => {
          table.getSelectedRowModel().flatRows.map((row) => {
            alert('activating ' + row.getValue('name'));
          });
        };

        const handleContact = () => {
          table.getSelectedRowModel().flatRows.map((row) => {
            alert('contact ' + row.getValue('name'));
          });
        };

        return (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button
              color="warning"
              disabled={table.getSelectedRowModel().flatRows.length === 0}
              onClick={handleDeactivate}
              variant="contained"
            >
              Sélectionner
            </Button>

            <Button
              color="success"
              disabled={table.getSelectedRowModel().flatRows.length === 0}
              onClick={handleActivate}
              variant="contained"
            >
              Déselectionner
            </Button>

            <Button
              color="error"
              disabled={table.getSelectedRowModel().flatRows.length === 0}
              onClick={handleContact}
              variant="contained"
            >
              Supprimer
            </Button>

            <Button
              color="primary"
              disabled={table.getSelectedRowModel().flatRows.length === 0}
              onClick={handleContact}
              variant="contained"
            >
              Générer Qrcode
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