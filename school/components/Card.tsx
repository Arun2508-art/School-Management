import { getDateAndYear } from '@/utills/helper';

interface CardProps {
  count?: number;
  type?: string;
}

const Card = ({ type, count = 1221 }: CardProps) => {
  return (
    <div className='rounded-2xl odd:bg-red/80 even:bg-blue/80 p-4 flex-1 min-w-[130px] text-white'>
      <div className='flex justify-between items-center'>
        <span className='text-[10px] bg-white px-2 py-1 rounded-full text-green-600'>
          {getDateAndYear()}
        </span>
        {/* <Image src='/more.png' alt='' width={20} height={20} /> */}
      </div>
      <h1 className='text-2xl font-semibold my-4'>{count}</h1>
      <h2 className='capitalize text-sm font-medium text-white'>{type}</h2>
    </div>
  );
};

export default Card;
