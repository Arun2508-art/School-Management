import FormSearch from '@/components/FormSearch';
import Pagination from '@/components/Pagination';
import Paper from '@/components/Paper';
import Table from '@/components/Table';
import { announcementsData } from '@/utills/data';
import { IconEye, IconTrash } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

const columns = [
  {
    header: 'Class',
    accessor: 'class'
  },
  {
    header: 'Title',
    accessor: 'title',
    className: 'hidden md:table-cell'
  },
  {
    header: 'Date',
    accessor: 'date',
    className: 'hidden md:table-cell'
  },
  {
    header: 'Actions',
    accessor: 'action'
  }
];

const page = () => {
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
              <div className='rounded-full bg-Yellow w-8 h-8 flex items-center justify-center'>
                <Image src='/sort.png' alt='sort' width={16} height={16} />
              </div>
            </div>
          </div>
          <div className='mt-8'>
            <Table columns={columns}>
              {announcementsData.map((item) => (
                <tr
                  key={item.id}
                  className='border-b border-gray-200 even:bg-slate-50 text-sm odd:hover:bg-PurpleLight even:hover:bg-YellowLight'
                >
                  <td className='flex items-center gap-4 p-4'>
                    <h3 className='font-semibold'>{item.class}</h3>
                  </td>
                  <td className='hidden md:table-cell'>{item.title}</td>
                  <td className='hidden md:table-cell'>{item.date}</td>
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

export default page;
