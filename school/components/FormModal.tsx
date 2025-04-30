'use client';

import FormParent from '@/pages/FormParent';
import FormStandard from '@/pages/FormStandard';
import FormStudent from '@/pages/FormStudent';
import FormSubject from '@/pages/FormSubject';
import FormTeacher from '@/pages/FormTeacher';
import { IconPlus, IconX } from '@tabler/icons-react';
import { useState } from 'react';

export interface FormModalProps {
  type: 'Student' | 'Teacher' | 'Admin' | 'Parent' | 'Class' | 'Subject';
}

const FormModal = ({ type }: FormModalProps) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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
                {type === 'Class' && <FormStandard />}
                {type === 'Student' && <FormStudent onSuccess={closeModal} />}
                {type === 'Subject' && <FormSubject />}
                {type === 'Parent' && <FormParent />}
                {type === 'Teacher' && <FormTeacher onSuccess={closeModal} />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
