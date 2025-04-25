import Image from 'next/image';

const PaperCard = ({ title, value }: { title?: string; value?: string }) => {
  return (
    <div className='bg-white p-4 flex-1'>
      {title && (
        <div className='flex flex-col gap-3 flex-1'>
          <div className='flex gap-3'>
            <Image src='/calendar.png' alt='' width={16} height={16} />
            <h1 className='text-lg font-semibold'>{value}</h1>
          </div>
          <div className='text-sm font-semibold text-gray-500'>{title}</div>
        </div>
      )}
    </div>
  );
};

export default PaperCard;
