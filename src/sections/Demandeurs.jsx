
import React, { useMemo, useEffect, useState, useContext } from 'react';
import MaterialReactTable from 'material-react-table';
import { getDemandeurs, deleteDemandeurs, updateDemandeur } from '../api/demandeur';
import { createGroupe } from '../api/groupe';
import { ImportModal, SectionHeader, CustomButton, DemandeurForm } from '../components';
import { Button } from '@mui/material';
import TableSvg from '../assets/table.svg';
import ImportSvg from '../assets/import.svg';
import CreateSvg from '../assets/create..svg';
import { ApplicationContext } from '../context/ApplicationContext';

const msgIrreversible = "Action irréversible!, Vous voulez toujours continuer?";

const Demandeurs = () => {
  const {handler} = useContext(ApplicationContext);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [reload, setReload] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [showImport, setShowImport] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const toggleMode = () => setIsFullScreen(prev => !prev);
  const toggleReload = () => setReload(prev => !prev);
  const toggleShowImport = () => setShowImport(prev => !prev);
  const toggleShowForm = () => setShowForm(prev => !prev);
  
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
        const data = await handler({fn: getDemandeurs, out:true});
        setDataList(data?.demandeurs);
    }
  
    fetchData();
  }, [reload])

  return (
    <div className='flex flex-col gap-5'>
      <SectionHeader text="Demandeur"/>

      <div className='flex gap-4 items-end'>
        <CustomButton handler={toggleMode} icon={TableSvg} text='Données Demandeurs' />
        <CustomButton handler={() => setShowImport(true)} icon={ImportSvg} text='Importer la liste des demandeurs(.xls, .csv)'/>
        <CustomButton handler={() => setShowForm(true)}  icon={CreateSvg}  text='créer un demandeur'/>
      </div>

      {!isFullScreen && showImport && (
        <ImportModal show={showImport} toggleShow={toggleShowImport}  />
      )}

      {!isFullScreen && showForm && (
        <DemandeurForm toggle={showForm} toggleShow={toggleShowForm}  />
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

        const getIdArray = (table) => table.getSelectedRowModel().flatRows.map(row => row.getValue('id'));

        const handleDelete = async () => {
          
          if(confirm(msgIrreversible)) {
            let demandeurs = getIdArray(table);

            await handler({fn:deleteDemandeurs, param:{demandeurs}, show:true});
          }
         
        };
        
        const handleUpdate = async () => {
          alert('Fonctionnalité Pas Encore Prise En Compte');
        };

        const handleCreateGroupe = async () => {
          let demandeurs = getIdArray(table)

          await handler({fn:createGroupe, param:{demandeurs}, show:true});
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