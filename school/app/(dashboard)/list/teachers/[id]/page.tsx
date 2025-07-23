import PaperCard from '@/components/PaperCard';
import Image from 'next/image';

const page = () => {
  return (
    <div className='p-4 grid grid-cols-1 md:grid-cols-[70%_30%]'>
      <div className='mr-2 flex flex-col gap-4 rounded-md'>
        <div className='flex flex-col gap-4'>
          <div className='w-full'>
            <div className='flex gap-4 p-4'>
              <div className='flex items-center'>
                <Image
                  src='/Avatar.png'
                  alt=''
                  width={144}
                  height={144}
                  className='w-36 h-36 rounded-md object-cover'
                />
              </div>
              <div className='flex flex-col gap-4 p-4'>
                <h1 className='text-xl font-semibold'>Kumaravel</h1>
                <p className='text-sm text-gray-500'>
                  Great designer in the world right now
                </p>
                <div className='flex items-center justify-between gap-4 flex-wrap text-xs font-medium'>
                  <div className='flex items-center gap-2'>
                    <Image src='/blood.png' alt='' width={14} height={14} />
                    <span>O+</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Image src='/date.png' alt='' width={14} height={14} />
                    <span>7/7/2007</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Image src='/mail.png' alt='' width={14} height={14} />
                    <span>Kumaravel@gmail.com</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Image src='/phone.png' alt='' width={14} height={14} />
                    <span>+65 54568651</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex gap-4 flex-wrap w-full p-4'>
          <PaperCard title='Attendance' value='90%' />
          <PaperCard title='Branches' value='2' />
          <PaperCard title='Lessons' value='12' />
          <PaperCard title='Classes' value='14' />
        </div>
      </div>
      {/* <div className='ml-2'>
        <Paper title='Shortcuts'>
          <div className='flex gap-4 flex-wrap'>
            <div className='rounded-2xl odd:bg-PurpleLight even:bg-YellowLight p-4 flex-1 min-w-[130px]'>
              <h2 className='capitalize text-sm font-medium text-gray-500'>
                Teacher
              </h2>
            </div>
            <div className='rounded-2xl odd:bg-PurpleLight even:bg-YellowLight p-4 flex-1 min-w-[130px]'>
              <h2 className='capitalize text-sm font-medium text-gray-500'>
                Teacher
              </h2>
            </div>
            <div className='rounded-2xl odd:bg-PurpleLight even:bg-YellowLight p-4 flex-1 min-w-[130px]'>
              <h2 className='capitalize text-sm font-medium text-gray-500'>
                Teacher
              </h2>
            </div>
          </div>
        </Paper>
      </div> */}
    </div>
  );
};

export default page;
