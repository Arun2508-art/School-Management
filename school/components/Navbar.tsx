import Image from 'next/image';
import FormSearch from './FormSearch';

const Navbar = () => {
  return (
    <div className='flex items-center justify-between p-4'>
      <FormSearch />
      <div className='flex gap-4  lg:gap-5 items-center'>
        <div className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer'>
          <Image src='/message.png' alt='' width={20} height={20} />
        </div>
        <div className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative'>
          <Image src='/announcement.png' alt='' width={20} height={20} />
          <div className='absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center rounded-full px-1 text-xs bg-purple-500 text-white'>
            1
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='font-medium text-xs leading-3'>John Doe</div>
          <div className='text-gray-500 text-[10px] text-right'>Admin</div>
        </div>
        <div>
          <button className='bg-red-500 text-white rounded-full w-7 h-7'>
            A
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
