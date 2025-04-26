'use client';
import FormModal from '@/components/FormModal';
import FormSearch from '@/components/FormSearch';
import Pagination from '@/components/Pagination';
import Paper from '@/components/Paper';
import Table from '@/components/Table';
import { studentsData } from '@/utills/data';
import { IconEye, IconPlus, IconTrash } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const columns = [
  {
    header: 'Info',
    accessor: 'info'
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
    header: 'Grade',
    accessor: 'grade',
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
  useEffect(() => {
    const fecthAll = async () => {
      const response = await fetch('http://localhost:3000/api/student', {
        method: 'GET'
      });
      const data = await response.json();
      console.log(data);
    };

    // const fecthAll = async () => {
    //   const response = await fetch('http://localhost:3000/api/student', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       firstName: 'Joe',
    //       lastName: 'Rio',
    //       gender: 'Female',
    //       role: 'student'
    //     })
    //   });
    //   const data = await response.json();
    //   return data;
    // };

    fecthAll();
  }, []);

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
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
                  <Image
                    src='/filter.png'
                    alt='filter'
                    width={16}
                    height={16}
                  />
                </div>
                <div className='rounded-full bg-Yellow w-8 h-8 flex items-center justify-center'>
                  <Image src='/sort.png' alt='sort' width={16} height={16} />
                </div>

                <div
                  className='rounded-full bg-Yellow w-8 h-8 flex items-center justify-center'
                  onClick={openModal}
                >
                  <IconPlus width={20} height={20} />
                </div>
              </div>
            </div>
            <div>
              <Table columns={columns}>
                {studentsData.map((item) => (
                  <tr
                    key={item.id}
                    className='border-b border-gray-200 even:bg-slate-50 text-sm odd:hover:bg-PurpleLight even:hover:bg-YellowLight'
                  >
                    <td className='flex items-center gap-4 p-4'>
                      <Image
                        src={item.photo}
                        alt=''
                        width={40}
                        height={40}
                        className='md:hidden xl:block w-10 h-10 rounded-full object-cover'
                      />
                      <div className='flex flex-col'>
                        <h3 className='font-semibold'>{item.name}</h3>
                        <p className='text-xs text-gray-500'>{item?.email}</p>
                      </div>
                    </td>
                    <td className='hidden md:table-cell'>{item.studentId}</td>
                    <td className='hidden md:table-cell'>{item.class}</td>
                    <td className='hidden md:table-cell'>{item.grade}</td>
                    <td className='hidden md:table-cell'>{item.phone}</td>
                    <td className='hidden md:table-cell'>{item.address}</td>
                    <td>
                      <div className='flex items-center gap-2'>
                        <Link href={`/list/teachers/${item.id}`}>
                          <button className='w-7 h-7 flex items-center justify-center rounded-full text-blue-600 hover:bg-Sky'>
                            <IconEye stroke={2} width={16} height={16} />
                          </button>
                        </Link>

                        <button className='w-7 h-7 flex items-center justify-center rounded-full text-red-600 hover:bg-Purple'>
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
      <FormModal isOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};

export default StudentPage;
