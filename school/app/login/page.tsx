import LoginForm from '@/components/pages/LoginForm';
import Image from 'next/image';

const SignInpage = () => {
  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='relative hidden bg-muted lg:block'>
        <Image
          src='/frambanner.jpg'
          alt='Image'
          className='object-cover dark:brightness-[0.7]'
          fill
          sizes='100%'
        />
      </div>
      <div className='flex flex-1 items-center justify-center'>
        <div className='w-full max-w-md'>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default SignInpage;
