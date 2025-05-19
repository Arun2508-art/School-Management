'use client';

import Input from '@/components/Input';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { LoginAPI } from '@/store/Slices/AuthSlice';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Loading from '../Loading';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { user, error } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const success = await dispatch(LoginAPI({ email, password }));
      if (LoginAPI.fulfilled.match(success)) {
        const user = success.payload;

        switch (user.role) {
          case 'admin':
            router.push('/admin');
            break;
          case 'teacher':
            router.push('/teacher');
            break;
          case 'student':
            router.push('/student');
            break;
          case 'parent':
            router.push('/parent');
            break;
          default:
            console.warn('Unknown role:', user.role);
            break;
        }
      } else {
        console.error('Login failed:', success);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (status === 'succeeded' && user?.role) {
  //     if (user.role === 'admin') {
  //       router.push('/admin');
  //     } else if (user.role === 'teacher') {
  //       router.push('/teacher');
  //     } else if (user.role === 'student') {
  //       router.push('/student');
  //     } else if (user.role === 'parent') {
  //       router.push('/parent');
  //     }
  //   }
  // }, [status, user?.role, router]);

  if (user) {
    return <Loading />;
  }

  return (
    <div>
      <div className='flex flex-col items-center gap-4 mb-4'>
        <h3 className='font-bold text-2xl text-blue'>Login to your account</h3>
        <div className='font-normal text-sm text-blue/80 hidden md:block'>
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

        {error && <div className='text-red-600 text-sm mt-2'>{error}</div>}

        <button
          type='submit'
          disabled={loading}
          className='bg-blue text-white rounded py-2 mt-4 cursor-pointer disabled:cursor-default disabled:bg-gray-400'
        >
          {loading ? 'Logging in....' : 'Login'}
        </button>
      </form>
      <div className='my-8 text-center relative text-sm hidden lg:block'>
        <div className='border-t border-gray-300'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-blue'>
          Or continue with
        </div>
      </div>
      <div className='w-full mt-6 hidden lg:block'>
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
