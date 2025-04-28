'use client';
import { useAppDispatch } from '@/store/hooks';
import { createClass } from '@/store/Slices/ClassSlice';
import { IconPlus, IconX } from '@tabler/icons-react';
import React, { useState } from 'react';
import Input from './Input';

export interface FormModalProps {
  type: 'Student' | 'Teacher' | 'Admin' | 'Parent' | 'Class';
}

const FormModal = ({ type }: FormModalProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const standard = formData.get('class') as string;
      const grade = formData.get('grade') as string;
      const supervisor = formData.get('supervisor') as string;

      const res = await dispatch(createClass({ standard, grade, supervisor }));
      console.log(res.payload.status);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className='rounded-full bg-Yellow w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-green-500'
        onClick={openModal}
      >
        <IconPlus width={20} height={20} />
      </div>
      {isModalOpen && (
        <div className='fixed inset-0 bg-black/50'>
          <div className='bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 z-50 shadow-2xl rounded-md'>
            <div className='flex flex-col gap-3'>
              <div className='flex justify-between items-center'>
                <h1 className='text-xl font-semibold text-blue-400 capitalize'>
                  Add {type}
                </h1>
                <div
                  className='hover:text-red-600 hover:bg-red-100 p-1 rounded-md cursor-pointer'
                  onClick={closeModal}
                >
                  <IconX width={24} height={24} />
                </div>
              </div>
              <div>
                <form onSubmit={handleSubmit}>
                  {type === 'Class' ? (
                    <>
                      <div className='flex gap-8 mb-4'>
                        <Input
                          placeholder='Class Name'
                          label='Class Name'
                          name='class'
                        />
                        <Input
                          placeholder='Capacity'
                          label='Capacity'
                          name='capacity'
                          type='number'
                        />
                      </div>
                      <div className='flex gap-8 mb-4'>
                        <Input placeholder='Grade' label='Grade' name='grade' />
                        <Input
                          placeholder='Supervisor'
                          label='Supervisor'
                          name='supervisor'
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='flex gap-8 mb-4'>
                        <Input placeholder='First Name...' label='First Name' />
                        <Input placeholder='Last Name...' label='Last Name' />
                      </div>
                      <div className='flex gap-8 mb-4'>
                        <Input
                          placeholder='Email...'
                          label='Email'
                          type='email'
                        />
                        <Input
                          placeholder='Password...'
                          label='Password'
                          type='password'
                        />
                      </div>
                      <div className='flex gap-8 mb-4'>
                        <Input placeholder='class' label='class' />
                        <Input
                          placeholder={`${type} ID`}
                          label={`${type} ID`}
                        />
                      </div>
                      <div className='flex gap-8 mb-4'>
                        <Input placeholder='Gender' label='Gender' />
                        <Input placeholder='DOB' label='Date of Birth' />
                      </div>
                      <div className='flex gap-8 mb-4'>
                        <Input placeholder='Phone No' label='Phone No' />
                        <Input placeholder='Address' label='Address' />
                      </div>
                    </>
                  )}

                  <button className='ring-1 ring-blue-600 bg-blue-600 text-white p-2 rounded-md cursor-pointer'>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
