import Image from 'next/image';

const FormSearch = () => {
  return (
    <div className='hidden md:flex items-center gap-2 ring-1 ring-gray-300 p-1 pl-3 rounded-full text-sm'>
      <Image src='/search.png' alt='' width={14} height={14} />
      <input
        type='search'
        className='focus:outline-0'
        placeholder='Search...'
      />
    </div>
  );
};

export default FormSearch;
