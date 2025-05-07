'use client';
import Input from '@/components/Input';
import { useAppDispatch } from '@/store/hooks';
import { createStudent, StudentsProps } from '@/store/Slices/StudentSlice';
import { useEffect, useState } from 'react';

export interface FormStudentProps {
  onSuccess: () => void;
}

const FormStudent = ({ onSuccess }: FormStudentProps) => {
  const [today, setToday] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);

      const studentData: StudentsProps = {
        name: formData.get('name') as string,
        gender: formData.get('gender') as 'Male' | 'Female' | 'Other',
        dateOfBirth: formData.get('dateOfBirth')
          ? new Date(formData.get('dateOfBirth')!.toString())
          : undefined,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string | undefined,
        class: formData.get('class') as string,
        rollNumber: formData.get('rollNumber') as string,
        address: formData.get('address') as string | undefined,
        password: formData.get('password') as string
      };

      const { payload } = await dispatch(createStudent(studentData));

      if (payload.message === 'Student Added' && payload.status === 201) {
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
          <Input
            placeholder='Student ID'
            label='Student ID'
            name='rollNumber'
          />
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
          <Input placeholder='Address' label='Address' name='address' />
          <Input placeholder='Phone No' label='Phone No' name='phone' />
        </div>
        <div className='flex gap-8 mb-4'>
          <Input
            placeholder='DOB'
            label='Date of Birth'
            name='dateOfBirth'
            type='date'
            max={today}
          />
        </div>

        <button className='ring-1 ring-blue-600 bg-blue-600 text-white p-2 rounded-md cursor-pointer'>
          Submit
        </button>
      </form>
    </>
  );
};

export default FormStudent;
