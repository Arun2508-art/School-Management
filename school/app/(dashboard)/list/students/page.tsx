'use client';
import DeleteButton from '@/components/Button/DeleteButton';
import EmptyText from '@/components/EmptyText';
import FormModal from '@/components/FormModal';
import FormSearch from '@/components/FormSearch';
import Loading from '@/components/Loading';
import Pagination from '@/components/Pagination';
import Paper from '@/components/Paper';
import Table from '@/components/Table';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchStudent } from '@/store/Slices/Student';
import { IconEye } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

const columns = [
  {
    header: 'Info',
    accessor: 'info',
    className: 'text-left'
  },
  {
    header: 'Student ID',
    accessor: 'studentId',
    className: 'hidden md:table-cell'
  },
  {
    header: 'Class',
    accessor: 'class',
    className: 'hidden md:table-cell'
  },
  {
    header: 'Gender',
    accessor: 'gender',
    className: 'hidden md:table-cell'
  },
  {
    header: 'Phone',
    accessor: 'phone',
    className: 'hidden lg:table-cell'
  },
  {
    header: 'Address',
    accessor: 'address',
    className: 'hidden lg:table-cell'
  },
  {
    header: 'Actions',
    accessor: 'action'
  }
];

const StudentPage = () => {
  const dispatch = useAppDispatch();
  const { status, students } = useAppSelector((state) => state.student);

  useEffect(() => {
    dispatch(fetchStudent());
  }, [dispatch]);

  if (status === 'loading') {
    return <Loading />;
  }

  console.log(students);

  return (
    <div className='mx-4'>
      <Paper>
        <div>
          <div className='flex gap-5 justify-between items-center'>
            <h1 className='hidden md:block text-lg font-semibold'>
              All Students
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
              <FormModal type='Student' />
            </div>
          </div>
          <div>
            {students.length > 0 ? (
              <Table columns={columns}>
                {students.map((item) => (
                  <tr
                    key={item._id}
                    className='border-b border-gray-200 even:bg-slate-50 text-sm odd:hover:bg-PurpleLight even:hover:bg-YellowLight'
                  >
                    <td className='flex items-center gap-4 px-1 py-4 text-left'>
                      <Image
                        src='/avatar.png'
                        alt=''
                        width={40}
                        height={40}
                        className='md:hidden lg:block w-10 h-10 rounded-full object-cover'
                      />
                      <div className='flex flex-col'>
                        <h3 className='font-semibold'>
                          {typeof item.user === 'object' && item.user.name}
                        </h3>
                        <p className='text-xs text-gray-500'>
                          {typeof item.user === 'object' && item.user.email}
                        </p>
                      </div>
                    </td>
                    <td className='hidden md:table-cell px-1'>
                      {item.rollNumber}
                    </td>
                    <td className='hidden md:table-cell px-1'>
                      {typeof item.class === 'object'
                        ? item.class === null
                          ? '-'
                          : item.class.name
                        : '-'}
                    </td>
                    <td className='hidden md:table-cell px-1'>{item.gender}</td>
                    <td className='hidden lg:table-cell px-1'>{item.phone}</td>
                    <td className='hidden lg:table-cell px-1'>
                      {item.address}
                    </td>
                    <td>
                      <div className='flex items-center gap-2'>
                        <Link href={`/list/teachers/${item._id}`}>
                          <button className='w-7 h-7 flex items-center justify-center rounded-full text-blue-600 hover:bg-Sky'>
                            <IconEye stroke={2} width={16} height={16} />
                          </button>
                        </Link>

                        {item._id && (
                          <DeleteButton id={item._id} type='student' />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </Table>
            ) : (
              <EmptyText title='Add New Student' />
            )}
          </div>
          <Pagination count={[1, 2, 3]} />
        </div>
      </Paper>
    </div>
  );
};

export default StudentPage;
