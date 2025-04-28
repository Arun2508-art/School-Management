'use client';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

const AttendanceChart = () => {
  return (
    <ResponsiveContainer width='100%' height='90%'>
      <BarChart width={500} height={300} data={data} barSize={20}>
        <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#ddd' />
        <XAxis
          dataKey='name'
          axisLine={false}
          tick={{ fill: '#6a7282' }}
          tickLine={false}
        />
        <YAxis axisLine={false} tick={{ fill: '#6a7282' }} tickLine={false} />
        <Tooltip
          contentStyle={{ borderRadius: '10px', borderColor: 'lightgray' }}
        />
        <Legend
          align='left'
          verticalAlign='top'
          wrapperStyle={{ paddingTop: '20px', paddingBottom: '40px' }}
        />
        <Bar
          dataKey='pv'
          fill='#009AB4'
          legendType='circle'
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey='uv'
          fill='#E63A1C'
          legendType='circle'
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AttendanceChart;
