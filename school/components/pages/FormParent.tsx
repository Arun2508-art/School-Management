import Input from '@/components/Input';
import { useAppDispatch } from '@/store/hooks';
import { createParent, ParentsProps } from '@/store/Slices/ParentSlice';

export interface FormParentProps {
  onSuccess: () => void;
}

const FormParent = ({ onSuccess }: FormParentProps) => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);

      const parentData: ParentsProps = {
        name: formData.get('name') as string,
        dateOfBirth: formData.get('dateOfBirth')
          ? new Date(formData.get('dateOfBirth')!.toString())
          : undefined,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string | undefined,
        address: formData.get('address') as string | undefined,
        password: formData.get('password') as string
      };
      const success = await dispatch(createParent(parentData));

      if (createParent.fulfilled.match(success)) {
        onSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex gap-8 mb-4'>
        <Input placeholder='Name...' label='Name' name='name' />
      </div>
      <div className='flex gap-8 mb-4'>
        <Input placeholder='Email...' label='Email' type='email' name='email' />
        <Input
          placeholder='Password...'
          label='Password'
          type='password'
          name='password'
        />
      </div>
      <div className='flex gap-8 mb-4'>
        <Input placeholder='Student Name' label='Student Name' />
        <Input placeholder='Relationship' label='Relationship' />
      </div>
      <div className='flex gap-8 mb-4'>
        <Input placeholder='Phone No' label='Phone No' name='phone' />
        <Input placeholder='Address' label='Address' name='address' />
      </div>

      <button className='ring-1 ring-blue-600 bg-blue-600 text-white p-2 rounded-md cursor-pointer'>
        Submit
      </button>
    </form>
  );
};

export default FormParent;
