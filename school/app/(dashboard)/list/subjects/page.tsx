'use client';

import EmptyText from '@/components/EmptyText';
import FormModal from '@/components/FormModal';
import FormSearch from '@/components/FormSearch';
import Loading from '@/components/Loading';
import Paper from '@/components/Paper';
import Table from '@/components/Table';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteSubject, fecthSubject } from '@/store/Slices/Subject';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

const columns = [
  {
    header: 'Subject',
    accessor: 'subjectName'
  },
  {
    header: 'Teachers',
    accessor: 'teacherId',
    className: 'hidden md:table-cell'
  },
  {
    header: 'Actions',
    accessor: 'action'
  }
];

const SubjectPage = () => {
  const { subject, status } = useAppSelector((state) => state.subject);
  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteSubject(id));
  };

  useEffect(() => {
    dispatch(fecthSubject());
  }, [dispatch]);

  if (status === 'loading') {
    return <Loading />;
  }

  return (
    <div className='mx-4'>
      <Paper>
        <div>
          <div className='flex gap-5 justify-between items-center'>
            <h1 className='hidden md:block text-lg font-semibold'>
              All Subjects
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
              <FormModal type='Subject' />
            </div>
          </div>
          <div>
            {subject.length > 0 ? (
              <Table columns={columns}>
                {subject?.map((item) => (
                  <tr
                    key={item._id}
                    className='border-b border-gray-200 even:bg-slate-50 text-sm odd:hover:bg-PurpleLight even:hover:bg-YellowLight'
                  >
                    <td className='flex items-center gap-4 px-1 py-4'>
                      <h3 className='font-semibold'>{item.name}</h3>
                    </td>
                    <td className='hidden md:table-cell'>
                      {item.teacher &&
                        item.teacher.map((t) => (
                          <span className='px-1' key={t}>
                            {t}
                          </span>
                        ))}
                    </td>
                    <td>
                      <div className='flex items-center gap-2'>
                        <Link href={`/list/teachers/${item._id}`}>
                          <button className='w-7 h-7 flex items-center justify-center rounded-full text-blue-600 hover:bg-Sky'>
                            <IconEdit stroke={2} width={16} height={16} />
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
            ) : (
              <EmptyText title='Add New Subject' />
            )}
          </div>
          {/* <Pagination count={[1, 2, 3]} /> */}
        </div>
      </Paper>
    </div>
  );
};

export default SubjectPage;
