import React, { useMemo, useEffect, useState, useContext } from 'react'
import { SectionHeader } from '../components';
import { getQrcodes } from '../api/qrcode';
import MaterialReactTable from 'material-react-table';
import { UserContext } from '../context/UserContext';
import FilledLink from '../assets/FilledLink.svg';

const Details = () => {

  const {handler} = useContext(UserContext);
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const {data} = await getQrcodes();
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
        header: 'Lien',
        Cell: ({ cell }) => {
          // TODO: change to icon
          return <a target='_blank' href={cell.getValue()} className="font-bold text-xl"><img src={FilledLink} alt="Lien vers les qrcodes"/></a>
        },
      },
      {
        accessorKey: 'created_at',
        header: 'Date',
        Cell: ({ cell }) => {
          return <div>{cell.getValue().replace(/T/, ' ').replace(/\..+/, '')}</div>
        },
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