'use client';

import Input from '@/components/Input';
import { useAppDispatch } from '@/store/hooks';
import { createClass } from '@/store/Slices/ClassSlice';

const FormStandard = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const standard = formData.get('class') as string;
      const grade = formData.get('grade') as string;
      const supervisor = formData.get('supervisor') as string;
      const capacityStr = formData.get('capacity') as string;

      const capacity = parseInt(capacityStr);

      const res = await dispatch(
        createClass({ standard, grade, supervisor, capacity })
      );
      console.log(res.payload.status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex gap-8 mb-4'>
        <Input placeholder='Class Name' label='Class Name' name='class' />
        <Input
          placeholder='Capacity'
          label='Capacity'
          name='capacity'
          type='number'
        />
      </div>
      <div className='flex gap-8 mb-4'>
        <Input placeholder='Grade' label='Grade' name='grade' />
        <Input placeholder='Supervisor' label='Supervisor' name='supervisor' />
      </div>

      <button className='ring-1 ring-blue-600 bg-blue-600 text-white p-2 rounded-md cursor-pointer'>
        Submit
      </button>
    </form>
  );
};

export default FormStandard;
