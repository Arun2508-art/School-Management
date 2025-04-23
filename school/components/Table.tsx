import { ReactNode } from 'react';

export interface Tableprops {
  columns: { header: string; accessor: string; className?: string }[];
  children: ReactNode;
}

const Table = ({ columns, children }: Tableprops) => {
  return (
    <table className='w-full mt-4'>
      <thead>
        <tr className='text-left text-gray-500 text-sm'>
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
