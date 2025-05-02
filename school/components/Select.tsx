export type OptionProps = {
  value: string;
  label: string;
};

export interface SelectProps {
  list: OptionProps[];
  label?: string;
}

const Select = ({ list, label }: SelectProps) => {
  return (
    <div className='flex flex-col gap-2'>
      {label && <label className='text-sm font-semibold'>{label}</label>}
      <select
        name='select'
        id=''
        className='w-full h-fit p-2 rounded-md ring-1 ring-blue-200 focus:outline-blue-300'
      >
        {list.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
