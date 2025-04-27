import FormModal from '@/components/FormModal';
import FormSearch from '@/components/FormSearch';
import Pagination from '@/components/Pagination';
import Paper from '@/components/Paper';
import Table from '@/components/Table';
import { parentsData } from '@/utills/data';
import { IconEye, IconTrash } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

const columns = [
  {
    header: 'Info',
    accessor: 'info'
  },
  {
    header: 'Students',
    accessor: 'studentId',
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

const ParentPage = () => {
  return (
    <div className='mx-4'>
      <Paper>
        <div>
          <div className='flex gap-5 justify-between items-center'>
            <h1 className='hidden md:block text-lg font-semibold'>
              All Parents
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
              <FormModal type='parent' />
            </div>
          </div>
          <div>
            <Table columns={columns}>
              {parentsData.map((item) => (
                <tr
                  key={item.id}
                  className='border-b border-gray-200 even:bg-slate-50 text-sm odd:hover:bg-PurpleLight even:hover:bg-YellowLight'
                >
                  <td className='flex items-center gap-4 p-4'>
                    <div className='flex flex-col'>
                      <h3 className='font-semibold'>{item.name}</h3>
                      <p className='text-xs text-gray-500'>{item?.email}</p>
                    </div>
                  </td>
                  <td className='hidden md:table-cell'>
                    {item.students.join(',')}
                  </td>
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
  );
};

export default ParentPage;
