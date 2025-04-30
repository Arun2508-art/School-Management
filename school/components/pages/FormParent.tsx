import Input from '@/components/Input';

const FormParent = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //   const formData = new FormData(e.currentTarget);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex gap-8 mb-4'>
        <Input placeholder='First Name...' label='First Name' />
        <Input placeholder='Last Name...' label='Last Name' />
      </div>
      <div className='flex gap-8 mb-4'>
        <Input placeholder='Email...' label='Email' type='email' />
        <Input placeholder='Password...' label='Password' type='password' />
      </div>
      <div className='flex gap-8 mb-4'>
        <Input placeholder='Student Name' label='Student Name' />
        <Input placeholder='Relationship' label='Relationship' />
      </div>
      <div className='flex gap-8 mb-4'>
        <Input placeholder='Phone No' label='Phone No' />
        <Input placeholder='Address' label='Address' />
      </div>

      <button className='ring-1 ring-blue-600 bg-blue-600 text-white p-2 rounded-md cursor-pointer'>
        Submit
      </button>
    </form>
  );
};

export default FormParent;
