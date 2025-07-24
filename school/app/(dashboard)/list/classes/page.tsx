'use client';
import EmptyText from '@/components/EmptyText';
import FormModal from '@/components/FormModal';
import FormSearch from '@/components/FormSearch';
import Loading from '@/components/Loading';
import Pagination from '@/components/Pagination';
import Paper from '@/components/Paper';
import Table from '@/components/Table';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteClass, fetchClass, StandardProps } from '@/store/Slices/Class';
import { IconEye, IconTrash } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const columns = [
  {
    header: 'Standard',
    accessor: 'standard',
    sort: true
  },
  {
    header: 'Capacity',
    accessor: 'capacity',
    className: 'hidden md:table-cell'
  },
  {
    header: 'Supervisor',
    accessor: 'supervisor',
    className: 'hidden md:table-cell'
  },
  {
    header: 'Actions',
    accessor: 'action'
  }
];

const ClassesPage = () => {
  const dispacth = useAppDispatch();
  const { standard, status } = useAppSelector((state) => state.class);
  const [sortedData, setSortedData] = useState<StandardProps[]>(standard);

  const handleDelete = (id: string) => {
    dispacth(deleteClass(id));
  };

  useEffect(() => {
    dispacth(fetchClass());
  }, [dispacth]);

  useEffect(() => {
    setSortedData(standard);
  }, [standard]);

  if (status === 'loading') {
    return <Loading />;
  }

  const handleSort = (key: 'asc' | 'desc' | 'default') => {
    if (key === 'asc') {
      const sorted = [...standard].sort((a, b) => a.name.localeCompare(b.name));
      setSortedData(sorted);
    } else if (key === 'desc') {
      const sorted = [...standard].sort((a, b) => b.name.localeCompare(a.name));
      setSortedData(sorted);
    } else {
      setSortedData(standard);
    }
  };

  return (
    <div className='mx-4'>
      <Paper>
        <div className=''>
          <div className='flex gap-5 justify-between items-center'>
            <h1 className='hidden md:block text-lg font-semibold'>Classes</h1>
            <div className='flex items-center gap-4'>
              <div>
                <FormSearch />
              </div>
              <div className='rounded-full bg-Yellow w-8 h-8 flex items-center justify-center'>
                <Image src='/filter.png' alt='filter' width={16} height={16} />
              </div>
              <div className='rounded-full bg-Yellow w-8 h-8 flex items-center justify-center'>
                <Image src='/sort.png' alt='sort' width={16} height={16} />
              </div>
              <FormModal type='Class' />
            </div>
          </div>
          {sortedData.length > 0 ? (
            <div className='mt-8'>
              <Table columns={columns} onClick={handleSort}>
                {sortedData?.map((item) => (
                  <tr
                    key={item._id}
                    className='border-b border-gray-200 even:bg-slate-50 text-base odd:hover:bg-PurpleLight/30 even:hover:bg-YellowLight/30'
                  >
                    <td className='py-4'>
                      <h3 className='font-semibold'>{item.name}</h3>
                    </td>
                    <td className='hidden md:table-cell py-4'>
                      {item.capacity ? item.capacity : '-'}
                    </td>
                    <td className='hidden md:table-cell py-4'>
                      {item.supervisor ? item.supervisor : '-'}
                    </td>
                    <td className='py-4'>
                      <div className='flex items-center justify-center gap-2'>
                        <Link href={`/list/teachers/${item._id}`}>
                          <button className='w-7 h-7 flex items-center justify-center rounded-full text-blue-600 hover:bg-Sky'>
                            <IconEye stroke={1.5} width={20} height={20} />
                          </button>
                        </Link>

                        <button
                          className='w-7 h-7 flex items-center justify-center rounded-full text-red-600 hover:bg-Purple cursor-pointer'
                          onClick={() => {
                            handleDelete(item._id!);
                          }}
                        >
                          <IconTrash stroke={1.5} width={20} height={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </Table>
            </div>
          ) : (
            <EmptyText title='No Classes to display' />
          )}
          <Pagination count={[1, 2, 3]} />
        </div>
      </Paper>
    </div>
  );
};

export default ClassesPage;
