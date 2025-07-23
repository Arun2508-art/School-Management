'use client';
import Input from '@/components/Input';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchClass } from '@/store/Slices/Class';
import { createStudent, StudentsProps } from '@/store/Slices/Student';
import { createUser, UserType } from '@/store/Slices/User';
import { useEffect, useState } from 'react';
import Select from '../Select';

export interface FormStudentProps {
  onSuccess: () => void;
}

const optionData = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' }
];

const FormStudent = ({ onSuccess }: FormStudentProps) => {
  const [today, setToday] = useState('');
  const dispatch = useAppDispatch();
  const { standard } = useAppSelector((state) => state.class);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);

      const UserData: UserType = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        role: 'STUDENT'
      };

      const userResult = await dispatch(createUser(UserData));
      if (createUser.fulfilled.match(userResult)) {
        const userId = userResult.payload.NewUser._id;

        const studentData: StudentsProps = {
          user: userId,
          gender: formData.get('gender') as 'Male' | 'Female' | 'Other',
          dateOfBirth: formData.get('dateOfBirth')
            ? new Date(formData.get('dateOfBirth')!.toString())
            : undefined,
          phone: formData.get('phone') as string | undefined,
          class: formData.get('class') as string,
          rollNumber: formData.get('rollNumber') as string,
          address: formData.get('address') as string | undefined,
          parent: []
        };

        const result = await dispatch(createStudent(studentData));

        if (createStudent.fulfilled.match(result)) {
          onSuccess();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const date = new Date().toISOString().split('T')[0];
    setToday(date);
  }, []);

  useEffect(() => {
    dispatch(fetchClass());
  }, [dispatch]);

  const classOption = standard.map((c) => ({
    value: c._id!,
    label: c.name
  }));

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col sm:flex-row gap-4 mb-4'>
        <Input
          placeholder='Name...'
          label='Name'
          name='name'
          containerClass='flex-1'
        />
        <Input
          placeholder='Student ID'
          label='Student ID'
          name='rollNumber'
          containerClass='flex-1'
        />
      </div>
      <div className='flex flex-col sm:flex-row gap-4 mb-4'>
        <Input
          placeholder='Email...'
          label='Email'
          type='email'
          name='email'
          containerClass='flex-1'
        />
        <Input
          placeholder='Password...'
          label='Password'
          type='password'
          name='password'
          containerClass='flex-1'
        />
      </div>
      <div className='flex flex-col sm:flex-row gap-4 mb-4'>
        <Select list={classOption} label='class' name='class' />
        <Select list={optionData} name='gender' label='Gender' />
      </div>
      <div className='flex flex-col sm:flex-row gap-4 mb-4'>
        <Input
          placeholder='Address'
          label='Address'
          name='address'
          containerClass='flex-1'
        />
        <Input
          placeholder='Phone No'
          label='Phone No'
          name='phone'
          containerClass='flex-1'
        />
      </div>
      <div className='flex mb-4 w-full sm:w-1/2 pr-0 sm:pr-2'>
        <Input
          placeholder='DOB'
          label='Date of Birth'
          name='dateOfBirth'
          type='date'
          max={today}
          containerClass='flex-1'
        />
      </div>

      <button className='ring-1 ring-blue-600 bg-blue-600 text-white p-2 rounded-md cursor-pointer'>
        Submit
      </button>
    </form>
  );
};

export default FormStudent;
