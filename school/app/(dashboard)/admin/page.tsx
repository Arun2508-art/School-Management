import AttendanceChart from '@/components/AttendanceChart';
import BigCalender from '@/components/BigCalender';
import Card from '@/components/Card';
import CountChart from '@/components/CountChart';
import FinanceChart from '@/components/FinanceChart';
import Paper from '@/components/Paper';

const AdminPage = () => {
  return (
    <div className='p-4 grid grid-cols-1 md:grid-cols-[75%_25%]'>
      <div className='mr-2 flex flex-col gap-4'>
        <div className='flex gap-4 justify-between flex-wrap'>
          <Card type='Students' />
          <Card type='Teachers' />
          <Card type='Parents' />
          <Card type='Staffs' />
        </div>
        <div className='flex gap-4 flex-col lg:flex-row'>
          <div className='w-full lg:w-1/3 h-[450px]'>
            <Paper title='Students'>
              <CountChart />
              <div className='flex justify-center gap-16'>
                <div className='flex flex-col gap-1'>
                  <div className='w-5 h-5 bg-Sky rounded-full' />
                  <h1 className='font-bold'>1000</h1>
                  <h2 className='text-xs text-gray-300'>Boys 1000</h2>
                </div>
                <div className='flex flex-col gap-1'>
                  <div className='w-5 h-5 bg-Yellow rounded-full' />
                  <h1 className='font-bold'>1000</h1>
                  <h2 className='text-xs text-gray-300'>Girls 1221</h2>
                </div>
              </div>
            </Paper>
          </div>
          <div className='w-full lg:w-2/3 h-[450px]'>
            <Paper title='Attendance'>
              <AttendanceChart />
            </Paper>
          </div>
        </div>
        <div className='w-full h-[500px]'>
          <FinanceChart />
        </div>
      </div>
      <div className='ml-2'>
        <Paper>
          <BigCalender data={[]} />
        </Paper>
      </div>
    </div>
  );
};

export default AdminPage;
