'use client';
import Input from '@/components/Input';
import { useAppDispatch } from '@/store/hooks';
import { createTeacher, TeachersProps } from '@/store/Slices/TeacherSlice';
import bcrypt from 'bcryptjs';
import { useEffect, useState } from 'react';

export interface FormTeacherProps {
  onSuccess: () => void;
}

const FormTeacher = ({ onSuccess }: FormTeacherProps) => {
  const [toady, setToday] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);

      const password = await bcrypt.hash(
        formData.get('password') as string,
        10
      );

      const studentData: TeachersProps = {
        name: formData.get('name') as string,
        gender: formData.get('gender') as 'Male' | 'Female' | 'Other',
        dateOfBirth: formData.get('dateOfBirth')
          ? new Date(formData.get('dateOfBirth')!.toString())
          : undefined,
        email: formData.get('email') as string,
        password: password,
        phone: formData.get('phone') as string | undefined,
        classes: formData.get('class') as string,
        teacherId: formData.get('staffID') as string,
        address: formData.get('address') as string | undefined
      };

      const { payload } = await dispatch(createTeacher(studentData));
      if (
        payload.message === 'Teacher Added Successfully' &&
        payload.status === 201
      ) {
        onSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const date = new Date().toISOString().split('T')[0];
    setToday(date);
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='flex gap-8 mb-4'>
          <Input placeholder='Name...' label='Name' name='name' />
          <Input placeholder='Teacher ID' label='Teacher ID' name='staffID' />
        </div>
        <div className='flex gap-8 mb-4'>
          <Input
            placeholder='Email...'
            label='Email'
            type='email'
            name='email'
          />
          <Input
            placeholder='Password...'
            label='Password'
            type='password'
            name='password'
          />
        </div>
        <div className='flex gap-8 mb-4'>
          <Input placeholder='class' label='class' name='class' />
          <Input placeholder='Gender' label='Gender' name='gender' />
        </div>
        <div className='flex gap-8 mb-4'>
          <Input placeholder='Phone No' label='Phone No' name='phone' />
          <Input placeholder='Address' label='Address' name='address' />
        </div>
        <div className='flex gap-8 mb-4'>
          <Input
            placeholder='DOB'
            label='Date of Birth'
            name='dateOfBirth'
            type='date'
            max={toady}
          />
        </div>

        <button className='ring-1 ring-blue-600 bg-blue-600 text-white p-2 rounded-md cursor-pointer'>
          Submit
        </button>
      </form>
    </>
  );
};

export default FormTeacher;
