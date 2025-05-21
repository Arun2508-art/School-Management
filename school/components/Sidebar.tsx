'use client';
import { menuItems } from '@/utills/sidebarData';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const role = 'admin';

const Sidebar = () => {
  const currentPath = usePathname();
  console.log(currentPath);

  function isActive(
    label: string,
    href: string,
    currentPath: string,
    userRole: 'admin' | 'teacher' | 'student' | 'parent'
  ) {
    if (label === 'Home') {
      // Map role to actual "home" path
      const homePaths = {
        admin: '/admin',
        teacher: '/teacher',
        student: '/student',
        parent: '/parent'
      };
      return currentPath.startsWith(homePaths[userRole] || '/');
    }

    return currentPath.startsWith(href);
  }

  return (
    <div className='mt-4 text-sm'>
      {menuItems.map((list, index) => (
        <div key={index} className='flex flex-col gap-3'>
          {list.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className={`flex items-center gap-3 py-2 md:px-2 rounded-md text-gray-500 hover:bg-sky-100 ${
                    isActive(item.label, item.href, currentPath, role)
                      ? 'bg-blue-100'
                      : ''
                  }`}
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
