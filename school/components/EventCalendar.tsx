'use client';
import Image from 'next/image';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// TEMPORARY
const events = [
  {
    id: 1,
    title: 'Lorem ipsum dolor',
    time: '12:00 PM - 2:00 PM',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    id: 2,
    title: 'Lorem ipsum dolor',
    time: '12:00 PM - 2:00 PM',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    id: 3,
    title: 'Lorem ipsum dolor',
    time: '12:00 PM - 2:00 PM',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  }
];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className='bg-white rounded-xl p-2 mb-4'>
      <Calendar onChange={onChange} value={value} />
      <div className='flex items-center justify-between my-3'>
        <h1 className='text-xl font-semibold'>Events</h1>
        <Image src='/moredark.png' alt='more' width={20} height={20} />
      </div>
      <div>
        {events.map((item) => (
          <div
            key={item.id}
            className='flex flex-col gap-3 border border-gray-200 mb-4 p-2 border-t-2 odd:border-t-Sky even:border-t-Yellow'
          >
            <div className='flex items-center justify-between gap-5'>
              <h1 className='font-semibold'>{item.title}</h1>
              <div className='text-xs text-gray-400'>{item.time}</div>
            </div>
            <div className='text-sm text-gray-600'>{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
