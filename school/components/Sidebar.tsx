import { menuItems } from '@/utills/sidebarData';
import Image from 'next/image';
import Link from 'next/link';

const role = 'admin';

const Sidebar = () => {
  return (
    <div className='mt-4 text-sm'>
      {menuItems.map((list) => (
        <div key={list.title} className='flex flex-col gap-3'>
          <div className='hidden lg:block text-gray-400 font-light my-4'>
            {list.title}
          </div>
          {list.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className='flex gap-3 items-center text-gray-500 py-2 md:px-2 rounded-md hover:bg-SkyLight'
                >
                  <div>
                    <Image
                      src={item.icon}
                      width={20}
                      height={20}
                      alt={item.label}
                    />
                  </div>
                  <div className='hidden lg:block'>{item.label}</div>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
