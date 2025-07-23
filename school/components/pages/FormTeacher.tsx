'use client';
import Input from '@/components/Input';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchClass } from '@/store/Slices/Class';
import { fecthSubject } from '@/store/Slices/Subject';
import { createTeacher, TeachersProps } from '@/store/Slices/TeacherSlice';
import { createUser, UserType } from '@/store/Slices/User';
import { useEffect, useState } from 'react';
import Select from '../Select';

export interface FormTeacherProps {
  onSuccess: () => void;
}

const FormTeacher = ({ onSuccess }: FormTeacherProps) => {
  const dispatch = useAppDispatch();
  const { subject } = useAppSelector((state) => state.subject);
  const { standard } = useAppSelector((st) => st.class);

  const [toady, setToday] = useState('');

  useEffect(() => {
    dispatch(fecthSubject());
    dispatch(fetchClass());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);

      const UserData: UserType = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        role: 'TEACHER'
      };

      const userResult = await dispatch(createUser(UserData));
      if (createUser.fulfilled.match(userResult)) {
        const userId = userResult.payload.NewUser._id;

        const rawClasses = formData.getAll('class') as string[];
        const rawSubjects = formData.getAll('subject') as string[];

        const filteredClasses = rawClasses.filter((c) => c.trim() !== '');
        const filteredSubjects = rawSubjects.filter((s) => s.trim() !== '');

        const studentData: TeachersProps = {
          user: userId,
          gender: formData.get('gender') as 'Male' | 'Female' | 'Other',
          dateOfBirth: formData.get('dateOfBirth')
            ? new Date(formData.get('dateOfBirth')!.toString())
            : undefined,
          phone: formData.get('phone') as string | undefined,
          teacherId: formData.get('staffID') as string,
          address: formData.get('address') as string | undefined,
          classes: filteredClasses,
          subjects: filteredSubjects
        };

        const result = await dispatch(createTeacher(studentData));
        if (createTeacher.fulfilled.match(result)) {
          onSuccess();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const options = subject.map((item) => ({
    value: item.name,
    label: item.name
  }));

  const classOptionList = standard.map((c) => ({
    value: c.name,
    label: c.name
  }));

  useEffect(() => {
    const date = new Date().toISOString().split('T')[0];
    setToday(date);
  }, []);

  const optionData = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex gap-4 mb-4'>
        <Input
          containerClass='flex-1'
          placeholder='Name...'
          label='Name'
          name='name'
        />
        <Input
          containerClass='flex-1'
          placeholder='Teacher ID'
          label='Teacher ID'
          name='staffID'
        />
      </div>
      <div className='flex gap-4 mb-4'>
        <Input
          containerClass='flex-1'
          placeholder='Email...'
          label='Email'
          type='email'
          name='email'
        />
        <Input
          containerClass='flex-1'
          placeholder='Password...'
          label='Password'
          type='password'
          name='password'
        />
      </div>
      <div className='flex gap-4 mb-4'>
        <Select list={optionData} name='gender' label='Gender' />
        <Select list={classOptionList} label='class' name='class' />
      </div>
      <div className='flex gap-4 mb-4'>
        <Select list={options} label='Subject' name='subject' />

        <Input
          containerClass='flex-1'
          placeholder='Phone No'
          label='Phone No'
          name='phone'
        />
      </div>
      <div className='flex gap-4 mb-4'>
        <Input
          containerClass='flex-1'
          placeholder='DOB'
          label='Date of Birth'
          name='dateOfBirth'
          type='date'
          max={toady}
        />
        <Input
          containerClass='flex-1'
          placeholder='Address'
          label='Address'
          name='address'
        />
      </div>

      <button className='ring-1 ring-blue-600 bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer'>
        Submit
      </button>
    </form>
  );
};

export default FormTeacher;
