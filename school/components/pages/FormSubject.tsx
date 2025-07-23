import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createSubject } from '@/store/Slices/Subject';
import { fetchTeacher } from '@/store/Slices/TeacherSlice';
import React, { useEffect } from 'react';
import Input from '../Input';
import Select from '../Select';

const FormSubject = () => {
  const dispatch = useAppDispatch();
  const { teachers } = useAppSelector((state) => state.teacher);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);

      const name = formData.get('subjectName') as string;
      // const allTeacherName = formData.get('teacher') as string;

      // const teacherName = allTeacherName.split(',').map((t) => t.trim());

      dispatch(createSubject({ name, teacher: [] }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchTeacher());
  }, [dispatch]);

  const teacherOptions = teachers.map((t) => {
    if (typeof t.user === 'object') {
      return {
        value: t.user.name,
        label: t.user.name
      };
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-4 mb-4'>
        <Input placeholder='subject...' label='Name' name='subjectName' />
        <Select list={teacherOptions} label='Teacher' name='teacher' />
      </div>
      {/* <Button>Save</Button> */}
      <button className='ring-1 ring-blue-600 bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer'>
        Submit
      </button>
    </form>
  );
};

export default FormSubject;
