'use client';
import Input from '@/components/Input';
import { useAppDispatch } from '@/store/hooks';
import { createTeacher, TeachersProps } from '@/store/Slices/TeacherSlice';

export interface FormTeacherProps {
  onSuccess: () => void;
}

const FormTeacher = ({ onSuccess }: FormTeacherProps) => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);

      const studentData: TeachersProps = {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string | undefined,
        gender: formData.get('gender') as 'Male' | 'Female' | 'Other',
        dateOfBirth: formData.get('dateOfBirth')
          ? new Date(formData.get('dateOfBirth')!.toString())
          : undefined,
        email: formData.get('email') as string,
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
          <Input placeholder='Teacher ID' label='Teacher ID' name='staffID' />
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

export default FormTeacher;
