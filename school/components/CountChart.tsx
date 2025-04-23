'use client';
import Image from 'next/image';
import { RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Total',
    count: 1000,
    fill: 'white'
  },
  {
    name: 'Girls',
    count: 500,
    fill: '#FAE27C'
  },
  {
    name: 'Boys',
    count: 500,
    fill: '#C3EBFA'
  }
];
const CountChart = () => {
  return (
    <div className='relative w-full h-[75%]'>
      <ResponsiveContainer>
        <RadialBarChart
          cx='50%'
          cy='50%'
          innerRadius='40%'
          outerRadius='100%'
          barSize={32}
          data={data}
        >
          <RadialBar background dataKey='count' />
        </RadialBarChart>
      </ResponsiveContainer>
      <Image
        src='/maleFemale.png'
        alt=''
        width={50}
        height={50}
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
      />
    </div>
  );
};

export default CountChart;
