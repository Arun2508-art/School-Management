import Input from '@/components/Input';
import { useAppDispatch } from '@/store/hooks';
import { createSubject } from '@/store/Slices/SubjectSlice';
import React from 'react';

// export interface FormProps {}

const FormSubject = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);

      const subject = formData.get('subject') as string;
      const teacherName = formData.get('teacher') as string;

      dispatch(createSubject({ subject, teacherName }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='flex gap-8 mb-4'>
        <Input placeholder='subject...' label='Subject' name='subject' />
        <Input placeholder='Teacher handling' label='Teacher' name='teacher' />
      </div>
      <div className='w-full flex justify-end'>
        <button className='ring-1 ring-blue-600 bg-blue-600 text-white p-2 rounded-md cursor-pointer'>
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormSubject;
