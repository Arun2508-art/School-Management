import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Image from 'next/image';
import Link from 'next/link';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex h-screen'>
      <div className='w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4'>
        <Link
          href='/'
          className='flex items-center justify-center lg:justify-start gap-2 focus-visible:outline-0'
        >
          <Image src='/logo.png' alt='logo' width={32} height={32} />
          <h1 className='hidden lg:block font-bold'>Mathi School</h1>
        </Link>
        <Sidebar />
      </div>
      <div className='w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-auto flex flex-col'>
        <Navbar />
        {children}
      </div>
    </div>
  );
}
