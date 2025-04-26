import { IconX } from '@tabler/icons-react';
import Input from './Input';

export interface FormModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const FormModal = ({ isOpen, closeModal }: FormModalProps) => {
  if (!isOpen) return null;
  return (
    <div className='fixed inset-0 bg-black/50'>
      <div className='bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 z-50 shadow-2xl rounded-md'>
        <div className='flex flex-col gap-3'>
          <div className='flex justify-between items-center'>
            <h1 className='text-xl font-semibold text-blue-400'>Add Student</h1>
            <div
              className='text-red-600 hover:bg-red-100 p-1 rounded-md'
              onClick={closeModal}
            >
              <IconX width={24} height={24} />
            </div>
          </div>
          <div>
            <form action=''>
              <div className='flex gap-8 mb-4'>
                <Input placeholder='First Name...' label='First Name' />
                <Input placeholder='Last Name...' label='Last Name' />
              </div>
              <div className='flex gap-8 mb-4'>
                <Input placeholder='Email...' label='Email' type='email' />
                <Input
                  placeholder='Password...'
                  label='Password'
                  type='password'
                />
              </div>
              <div className='flex gap-8 mb-4'>
                <Input placeholder='class' label='class' />
                <Input placeholder='Student ID' label='Student ID' />
              </div>
              <div className='flex gap-8 mb-4'>
                <Input placeholder='Gender' label='Gender' />
                <Input placeholder='DOB' label='Date of Birth' />
              </div>

              <button className='ring-1 ring-blue-600 bg-blue-600 text-white p-2 rounded-md'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
