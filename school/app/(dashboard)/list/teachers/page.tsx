'use client';

import DeleteButton from '@/components/Button/DeleteButton';
import EmptyText from '@/components/EmptyText';
import FormModal from '@/components/FormModal';
import FormSearch from '@/components/FormSearch';
import Pagination from '@/components/Pagination';
import Paper from '@/components/Paper';
import Table from '@/components/Table';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchTeacher } from '@/store/Slices/Teacher';
import { IconEdit, IconEye } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

const columns = [
  {
    header: 'Info',
    accessor: 'info'
  },
  {
    header: 'Teacher ID',
    accessor: 'teacherId',
    className: 'hidden md:table-cell'
  },
  {
    header: 'Gender',
    accessor: 'gender',
    className: 'hidden md:table-cell'
  },
  {
    header: 'Subjects',
    accessor: 'subjects',
    className: 'hidden md:table-cell'
  },
  {
    header: 'Supervisor Class',
    accessor: 'classes',
    className: 'hidden md:table-cell'
  },
  {
    header: 'Actions',
    accessor: 'action'
  }
];

const TeacherPage = () => {
  const dispatch = useAppDispatch();
  const { status, teachers } = useAppSelector((state) => state.teacher);

  useEffect(() => {
    dispatch(fetchTeacher());
  }, [dispatch]);

  if (status === 'loading') {
    // return <Loading />;
  }

  console.log(teachers);

  return (
    <div className='mx-4'>
      <Paper>
        <div>
          <div className='flex gap-5 justify-between items-center'>
            <h1 className='hidden md:block text-lg font-semibold'>
              All Teachers
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
              <FormModal type='Teacher' />
            </div>
          </div>
          <div>
            {teachers.length > 0 ? (
              <Table columns={columns}>
                {teachers?.map((item) => (
                  <tr
                    key={item._id}
                    className='border-b border-gray-200 even:bg-slate-50 text-sm odd:hover:bg-PurpleLight even:hover:bg-YellowLight'
                  >
                    <td className='flex items-center gap-4 py-4 px-1 text-left'>
                      <Image
                        src='/avatar.png'
                        alt=''
                        width={40}
                        height={40}
                        className='md:hidden lg:block w-10 h-10 rounded-full object-cover'
                      />
                      <div className='flex flex-col'>
                        <h3 className='font-semibold'>
                          {typeof item.user !== 'string' && item.user.name}
                        </h3>
                        <p className='text-xs text-gray-500'>
                          {typeof item.user === 'object' &&
                            'email' in item.user &&
                            item.user.email}
                        </p>
                      </div>
                    </td>
                    <td className='hidden md:table-cell py-4 px-1'>
                      {item.teacherId}
                    </td>
                    <td className='hidden md:table-cell py-4 px-1'>
                      {item.gender}
                    </td>
                    <td className='hidden md:table-cell py-4 px-1'>
                      {Array.isArray(item.subjects) && item.subjects.length > 0
                        ? item.subjects
                            ?.map((subj) =>
                              typeof subj === 'string' ? subj : subj.name
                            )
                            .join(', ')
                        : '-'}
                    </td>
                    <td className='hidden md:table-cell py-4 px-1'>
                      {Array.isArray(item.classes) && item.classes.length > 0
                        ? item.classes
                            ?.map((cls) =>
                              typeof cls === 'string' ? cls : cls.name
                            )
                            .join(', ')
                        : '-'}
                    </td>

                    <td>
                      <div className='flex items-center justify-center gap-1'>
                        <button className='w-7 h-7 flex items-center justify-center rounded-full text-blue-600 hover:bg-Sky'>
                          <IconEdit stroke={2} width={16} height={16} />
                        </button>

                        <Link href={`/list/teachers/${item._id}`}>
                          <button className='w-7 h-7 flex items-center justify-center rounded-full text-blue-600 hover:bg-Sky'>
                            <IconEye stroke={2} width={16} height={16} />
                          </button>
                        </Link>

                        {item._id && (
                          <DeleteButton id={item._id} type='teacher' />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </Table>
            ) : (
              <EmptyText title='Add New Teacher' />
            )}
          </div>
          <Pagination count={[1, 2, 3]} />
        </div>
      </Paper>
    </div>
  );
};

export default TeacherPage;
