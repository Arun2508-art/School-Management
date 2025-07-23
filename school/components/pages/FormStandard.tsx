'use client';

import Input from '@/components/Input';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createClass } from '@/store/Slices/Class';
import { fetchTeacher } from '@/store/Slices/TeacherSlice';
import { useEffect } from 'react';
import Button from '../Button/Button';
import Select from '../Select';

const FormStandard = () => {
  const dispatch = useAppDispatch();
  const { teachers } = useAppSelector((st) => st.teacher);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get('class') as string;
      const supervisor = formData.get('supervisor') as string;
      const capacityStr = formData.get('capacity') as string;

      const capacity = parseInt(capacityStr);
      await dispatch(createClass({ name, supervisor, capacity }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchTeacher());
  }, [dispatch]);

  const optionData = teachers.map((t) => {
    if (typeof t.user === 'object') {
      return {
        value: t.user.name,
        label: t.user.name
      };
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-4'>
        <Input placeholder='Name' label='Name' name='class' />
      </div>
      <div className='flex gap-4 flex-col sm:flex-row mb-4'>
        <Select list={optionData} name='supervisor' label='supervisor' />
        <Input
          placeholder='Capacity'
          label='Capacity'
          name='capacity'
          type='number'
        />
      </div>
      <Button>Save</Button>
    </form>
  );
};

export default FormStandard;
