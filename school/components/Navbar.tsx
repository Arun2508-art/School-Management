'use client';
import { IconLogout, IconSettings, IconUser } from '@tabler/icons-react';
import Image from 'next/image';
import { useState } from 'react';
import FormSearch from './FormSearch';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  return (
    <div className='flex items-center justify-between p-4'>
      <FormSearch />
      <div className='flex gap-4  lg:gap-5 items-center'>
        <div className='bg-white w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-Purple rounded-md'>
          <Image src='/message.png' alt='' width={20} height={20} />
        </div>
        <div className='bg-white w-7 h-7 flex items-center justify-center cursor-pointer relative hover:bg-Purple rounded-md'>
          <Image src='/announcement.png' alt='' width={20} height={20} />
          <div className='absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center rounded-full px-1 text-xs bg-purple-500 text-white'>
            1
          </div>
        </div>
        <div
          className='cursor-pointer relative'
          onClick={() => setActiveMenu((prev) => !prev)}
        >
          <div className='hover:bg-Purple p-2 rounded-md flex gap-2'>
            <div className='flex flex-col'>
              <div className='font-medium text-xs leading-3'>John Doe</div>
              <div className='text-gray-500 text-[10px] text-right'>Admin</div>
            </div>
            <button className='bg-red-500 text-white rounded-full w-7 h-7'>
              A
            </button>
          </div>
          {activeMenu && (
            <div className='absolute bg-Purple p-2 top-full right-0 rounded-md flex flex-col gap-2 mt-2 min-w-36'>
              <div className='flex gap-2 text-sm py-2 px-1 hover:bg-PurpleLight rounded-md'>
                <IconUser width={16} height={16} />
                MyProfile
              </div>
              <div className='flex gap-2 text-sm py-2 px-1 hover:bg-PurpleLight rounded-md'>
                <IconSettings width={16} height={16} />
                Setting
              </div>
              <div className='flex gap-2 text-sm py-2 px-1 hover:bg-PurpleLight rounded-md'>
                <IconLogout width={16} height={16} />
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
