'use client';
import Input from '@/components/Input';
import { useAppDispatch } from '@/store/hooks';
import { createStudent, StudentsProps } from '@/store/Slices/StudentSlice';

export interface FormStudentProps {
  onSuccess: () => void;
}

const FormStudent = ({ onSuccess }: FormStudentProps) => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);

      const studentData: StudentsProps = {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string | undefined,
        gender: formData.get('gender') as 'Male' | 'Female' | 'Other',
        dateOfBirth: formData.get('dateOfBirth')
          ? new Date(formData.get('dateOfBirth')!.toString())
          : undefined,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string | undefined,
        class: formData.get('class') as string,
        rollNumber: formData.get('rollNumber') as string,
        address: formData.get('address') as string | undefined
      };

      const { payload } = await dispatch(createStudent(studentData));

      if (payload.message === 'Student Added' && payload.status === 201) {
        onSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='flex gap-8 mb-4'>
          <Input
            placeholder='First Name...'
            label='First Name'
            name='firstName'
          />
          <Input placeholder='Last Name...' label='Last Name' name='lastName' />
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
          <Input
            placeholder='Student ID'
            label='Student ID'
            name='rollNumber'
          />
        </div>
        <div className='flex gap-8 mb-4'>
          <Input placeholder='Gender' label='Gender' name='gender' />
          <Input
            placeholder='DOB'
            label='Date of Birth'
            name='dateOfBirth'
            type='date'
          />
        </div>
        <div className='flex gap-8 mb-4'>
          <Input placeholder='Phone No' label='Phone No' name='phone' />
          <Input placeholder='Address' label='Address' name='address' />
        </div>

        <button className='ring-1 ring-blue-600 bg-blue-600 text-white p-2 rounded-md cursor-pointer'>
          Submit
        </button>
      </form>
    </>
  );
};

export default FormStudent;
