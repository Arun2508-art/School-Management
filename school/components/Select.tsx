import classNames from 'classnames';

export type OptionProps =
  | {
      value: string;
      label: string;
    }
  | undefined;

export interface SelectProps {
  list: OptionProps[];
  label?: string;
  name?: string;
  multiple?: boolean;
  className?: string;
}

const Select = ({ list, label, name, multiple, className }: SelectProps) => {
  const SelectClasses = classNames(
    'select p-2 w-full h-fit rounded-sm ring-1 ring-blue-200 focus:outline-blue-300',
    className,
    {}
  );
  return (
    <div className='flex flex-col gap-2 w-full'>
      {label && (
        <label htmlFor={name} className='text-sm font-semibold capitalize'>
          {label}
        </label>
      )}
      <select
        name={name}
        id={name}
        multiple={multiple}
        className={SelectClasses}
      >
        <option value=''>Please select</option>
        {list.map((item) => (
          <option key={item?.value} value={item?.value}>
            {item?.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
