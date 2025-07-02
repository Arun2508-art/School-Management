'use client';
import FormModal from '@/components/FormModal';
import FormSearch from '@/components/FormSearch';
import Loading from '@/components/Loading';
import Pagination from '@/components/Pagination';
import Paper from '@/components/Paper';
import Table from '@/components/Table';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteClass, fetchClass } from '@/store/Slices/ClassSlice';
import { IconEye, IconTrash } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

const columns = [
  {
    header: 'Classes',
    accessor: 'classes'
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

  const handleDelete = (id: string) => {
    dispacth(deleteClass(id));
  };

  useEffect(() => {
    dispacth(fetchClass());
  }, [dispacth]);

  if (status === 'loading') {
    return <Loading />;
  }

  return (
    <div className='mx-4'>
      <Paper>
        <div className=''>
          <div className='flex gap-5 justify-between items-center'>
            <h1 className='hidden md:block text-lg font-semibold'>
              All Classes
            </h1>
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
          <div className='mt-8'>
            <Table columns={columns}>
              {standard?.map((item) => (
                <tr
                  key={item._id}
                  className='border-b border-gray-200 even:bg-slate-50 text-sm odd:hover:bg-PurpleLight even:hover:bg-YellowLight'
                >
                  <td className='flex items-center gap-4 py-4'>
                    <h3 className='font-semibold'>{item.name}</h3>
                  </td>
                  <td className='hidden md:table-cell'>{item.capacity}</td>
                  <td className='hidden md:table-cell'>{item.supervisor}</td>
                  <td>
                    <div className='flex items-center gap-2'>
                      <Link href={`/list/teachers/${item._id}`}>
                        <button className='w-7 h-7 flex items-center justify-center rounded-full text-blue-600 hover:bg-Sky'>
                          <IconEye stroke={2} width={16} height={16} />
                        </button>
                      </Link>

                      <button
                        className='w-7 h-7 flex items-center justify-center rounded-full text-red-600 hover:bg-Purple cursor-pointer'
                        onClick={() => {
                          handleDelete(item._id!);
                        }}
                      >
                        <IconTrash stroke={2} width={16} height={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </Table>
          </div>
          <Pagination count={[1, 2, 3]} />
        </div>
      </Paper>
    </div>
  );
};

export default ClassesPage;
