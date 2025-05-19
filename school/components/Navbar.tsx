'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Logout } from '@/store/Slices/AuthSlice';
import { IconLogout, IconSettings, IconUser } from '@tabler/icons-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import FormSearch from './FormSearch';
import Loading from './Loading';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, status } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    const success = await dispatch(Logout());
    if (Logout.fulfilled.match(success)) router.push('/login');
  };

  useEffect(() => {
    setName(localStorage.getItem('name') || '');
    setRole(localStorage.getItem('role') || '');
  }, []);

  if (status === 'loading' || !user) {
    return (
      <div className='fixed inset-0 bg-black/20 cursor-not-allowed'>
        <Loading />
      </div>
    );
  }

  return (
    <div className='flex items-center justify-between p-4'>
      <FormSearch />
      <div className='flex gap-4  lg:gap-5 items-center'>
        <div className='bg-white w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-Purple rounded-md'>
          <Image src='/message.png' alt='' width={20} height={20} />
        </div>
        <div className='bg-white w-7 h-7 flex items-center justify-center cursor-pointer relative hover:bg-Purple rounded-md'>
          <Image src='/announcement.png' alt='' width={20} height={20} />
          <div className='absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center rounded-full px-1 text-xs bg-red-500 text-white'>
            1
          </div>
        </div>
        <div
          className='cursor-pointer relative'
          onClick={() => setActiveMenu((prev) => !prev)}
        >
          <div className='hover:bg-Purple p-2 rounded-md flex items-center gap-2'>
            <div className='flex flex-col'>
              <div className='font-medium text-xs leading-3'>{name}</div>
              <div className='text-gray-500 text-[10px] text-right capitalize'>
                {role}
              </div>
            </div>
            <div className='text-white rounded-full relative w-7 h-7 flex items-center justify-center'>
              <Image src='/noAvatar.png' alt='' fill />
            </div>
          </div>
          {activeMenu && (
            <div className='absolute bg-Purple p-2 top-full right-0 rounded-md flex flex-col gap-2 mt-2 min-w-36'>
              <div className='flex gap-2 text-sm py-2 px-1 hover:bg-PurpleLight rounded-md cursor-not-allowed'>
                <IconUser width={16} height={16} />
                MyProfile
              </div>
              <div className='flex gap-2 text-sm py-2 px-1 hover:bg-PurpleLight rounded-md cursor-not-allowed'>
                <IconSettings width={16} height={16} />
                Setting
              </div>
              <div
                className='flex gap-2 text-sm py-2 px-1 hover:bg-PurpleLight rounded-md'
                onClick={handleLogout}
              >
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
