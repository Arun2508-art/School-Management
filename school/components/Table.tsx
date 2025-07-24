import {
  IconSortAscending2Filled,
  IconSortDescending2Filled
} from '@tabler/icons-react';
import classNames from 'classnames';
import { ReactNode, useState } from 'react';

export interface Tableprops {
  columns: {
    header: string;
    accessor: string;
    className?: string;
    sort?: boolean;
  }[];
  children: ReactNode;
  onClick?: (key: 'asc' | 'desc' | 'default') => void;
}

const Table = ({ columns, children, onClick }: Tableprops) => {
  const [sortKey, setSortKey] = useState<'asc' | 'desc' | 'default'>('default');

  const handleClick = () => {
    let nextSortKey: 'asc' | 'desc' | 'default';

    if (sortKey === 'asc') {
      nextSortKey = 'desc';
    } else if (sortKey === 'desc') {
      nextSortKey = 'default';
    } else {
      nextSortKey = 'asc';
    }

    setSortKey(nextSortKey);
    onClick?.(nextSortKey);
  };
  return (
    <table className='w-full mt-4 text-center'>
      <thead className='bg-gray-100'>
        <tr className='text-gray-500 text-sm'>
          {columns.map((col) => (
            <th
              key={col.accessor}
              className={classNames('py-2 px-1', col.className)}
            >
              {col.sort ? (
                <div className='flex items-center justify-center gap-2'>
                  <div>{col.header}</div>

                  <div
                    className='hover:bg-gray-300 hover:rounded-sm cursor-pointer'
                    onClick={handleClick}
                  >
                    {sortKey === 'asc' ? (
                      <IconSortAscending2Filled
                        stroke={1.5}
                        width={20}
                        height={20}
                        color='#fb2c36'
                      />
                    ) : sortKey === 'desc' ? (
                      <IconSortDescending2Filled
                        stroke={1.5}
                        width={20}
                        height={20}
                        color='#fb2c36'
                      />
                    ) : (
                      <IconSortAscending2Filled
                        stroke={1.5}
                        width={20}
                        height={20}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <>{col.header}</>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
