import BigCalendar from '@/components/BigCalender';
import EventCalendar from '@/components/EventCalendar';
import Paper from '@/components/Paper';
import Announcements from '@/components/pages/Announcements';

const StudentPage = () => {
  return (
    <div className='p-4 grid grid-cols-1 md:grid-cols-[75%_25%]'>
      <div className='mr-2 flex flex-col gap-4'>
        <Paper title='Schedule (4A)'>
          <BigCalendar />
        </Paper>
      </div>
      <div className='ml-2'>
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;
