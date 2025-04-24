import Image from 'next/image';
import { ReactNode } from 'react';

const Paper = ({
  title,
  more,
  children
}: {
  title?: string;
  more?: boolean;
  children: ReactNode;
}) => {
  return (
    <div className='bg-white rounded-xl w-full h-full p-4'>
      {title && (
        <div className='flex items-center justify-between gap-4'>
          <div className='text-lg font-semibold'>{title}</div>
          {more && <Image src='/moreDark.png' alt='' width={20} height={20} />}
        </div>
      )}
      {children}
    </div>
  );
};

export default Paper;
