import Input from '@/components/Input';
import { useAppDispatch } from '@/store/hooks';
import { createSubject } from '@/store/Slices/SubjectSlice';
import React from 'react';
import Button from '../Button/Button';

const FormSubject = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);

      const subject = formData.get('subject') as string;
      const allTeacherName = formData.get('teacher') as string;

      const teacherName = allTeacherName.split(',').map((t) => t.trim());

      dispatch(createSubject({ subject, teacherName }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-4 mb-4'>
        <Input placeholder='subject...' label='Subject' name='subject' />
        <Input placeholder='Teacher handling' label='Teacher' name='teacher' />
      </div>
      <div className='w-full flex justify-end'>
        <Button>Save</Button>
      </div>
    </form>
  );
};

export default FormSubject;
