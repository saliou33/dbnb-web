import React, { useMemo, useEffect, useState } from 'react'
import { SectionHeader } from '../components';
import { getQrcodes } from '../api/qrcode';
import MaterialReactTable from 'material-react-table';

const Details = () => {

  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const {data} = await getQrcodes();
      console.log(data);
      setDataList(data?.qrcodes);
    } 

    fetchData();
  }, [])

  const columns = useMemo(
    () => [
      {
        id: 'id',
        accessorKey: 'id',
        header: 'ID',
        size: 80
      },
      {
        accessorKey: 'owner',
        header: 'Type',
      },
      {
        accessorKey: 'url',
        header: 'Lien'
      },
      {
        accessorKey: 'created_at',
        header: 'Date'
      }
    ]
  )

  return (
    <div className='flex flex-col gap-5'>
      <SectionHeader text="Détails"/>


      <MaterialReactTable 
        columns={columns}
        data={dataList}
        enableColumnOrdering
        enableGrouping
        enablePinning
        enableRowActions
        enableRowSelection
        initialState={{ showColumnFilters: false }}
              
      />
    </div>
  )
}

export default Details