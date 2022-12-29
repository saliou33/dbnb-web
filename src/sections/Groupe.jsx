import React, { useMemo, useEffect, useState, useContext} from 'react';
import MaterialReactTable from 'material-react-table';
import { SectionHeader } from '../components';
import { deselectDemandeurs, selectDemandeurs } from '../api/demandeur';
import { getGroupes } from '../api/groupe';
import { Button } from '@mui/material';
import { createQrcode  } from '../api/qrcode';
import { UserContext } from '../context/UserContext';


const Groupe = () => {
  const {handler} = useContext(UserContext);
  const [dataList, setDataList] = useState([]);
  const [reload, setReload] = useState(false);

  const columns = useMemo(
    () => [
      {
        id: 'id',
        accessorKey: 'id',
        header: 'ID',
        enableColumnOrdering: false,
        enableEditing: false,
        enableSorting: false,
        size: 80
      },
      {
        accessorFn: (row) => row.demandeurs.length,
        header: 'demandeurs'
      },
      {
        accessorKey: 'created_at',
        header: 'Date'
      }
    ]
  )


  useEffect(() => {
    const fetchData = async() => {
        const data = await handler({fn:getGroupes, show:false, out:true})
        setDataList(data?.groupes);
    }
  
    fetchData();
  }, [reload])

  return (
    <div className='flex flex-col gap-5'>
      <SectionHeader text="Groupe"/>

      <MaterialReactTable
        columns={columns}
        data={dataList}
        enableColumnOrdering
        enableRowActions
        enableRowSelection

        renderTopToolbarCustomActions={({table}) => {
          
        const getIdArray = (table) => table.getSelectedRowModel().flatRows.map(row => row.getValue('id'));

        const handleSelect = async () => {
          let demandeurs = getIdArray(table);

          await handler({fn: selectDemandeurs, param: {demandeurs},show:true});
        }

        const handleDeselect = async () => {
          let demandeurs = getIdArray(table);

          await handler({fn:deselectDemandeurs, param:{demandeurs}, show: true})
        }

        const handleGenerate = async () => {
          let groupe = getIdArray(table);

          await handler({fn:createQrcode, param:{owner: 'groupe', owner_id: groupe[0]}, show:true})
        }

        return (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            
            <Button
              color="success"
              disabled={table.getSelectedRowModel().flatRows.length != 1}
              onClick={handleSelect}
              variant="contained"
            >
              Sélectionner
            </Button>

            <Button
              color="warning"
              disabled={table.getSelectedRowModel().flatRows.length != 1}
              onClick={handleDeselect}
              variant="contained"
            >
              Désélectionner 
            </Button>

            <Button
              color="info"
              disabled={table.getSelectedRowModel().flatRows.length != 1}
              onClick={handleGenerate}
              variant="contained"
            >
              Générer Qrcode 
            </Button>

          </div>
        )

      }}
      />
    </div>
  )
}

export default Groupe