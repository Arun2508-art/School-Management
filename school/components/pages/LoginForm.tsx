'use client';

import Input from '@/components/Input';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { LoginAPI } from '@/store/Slices/LoginSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { user, status } = useAppSelector((state) => state.login);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      dispatch(LoginAPI(email));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (status === 'succeeded' && user) {
      if (user.role === 'admin') {
        router.push('/admin');
      } else if (user.role === 'teacher') {
        router.push('/teacher');
      } else if (user.role === 'student') {
        router.push('/student');
      } else if (user.role === 'parent') {
        router.push('/parent');
      }
    }
  }, [status, user, router]);

  return (
    <div>
      <div className='flex flex-col items-center gap-4 mb-4'>
        <h3 className='font-bold text-2xl text-blue'>Login to your account</h3>
        <div className='font-normal text-sm text-blue/80'>
          Enter your email below to login to your account
        </div>
      </div>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <Input
          type='email'
          name='email'
          placeholder='m@example.com'
          id='req_email'
          label='Email'
        />
        <Input
          type='password'
          name='password'
          id='req_password'
          label='Password'
          placeholder='Password'
        />
        <button
          type='submit'
          disabled={status === 'loading'}
          className='bg-blue text-white rounded py-2 mt-4 cursor-pointer'
        >
          {status === 'loading' ? 'Loging in....' : 'Login'}
        </button>
      </form>
      <div className='my-8 text-center relative text-sm'>
        <div className='border-t border-gray-300'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-blue'>
          Or continue with
        </div>
      </div>
      <div className='w-full mt-6'>
        <button className='w-full rounded py-2 mt-4 ring-1 ring-gray-400'>
          Login with Google
        </button>
      </div>
      <div className='w-full text-center mt-6 text-sm'>
        Don&apos;t have an account?
        <span className='text-blue-600 underline cursor-pointer pl-2 hover:font-semibold'>
          Sign Up
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
