import classNames from 'classnames';

interface InputProps {
  label?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  id?: string;
  className?: string;
  value?: string;
  max?: string;
}

const Input = ({
  label,
  type = 'text',
  name,
  placeholder,
  id,
  className,
  value,
  max
}: InputProps) => {
  const inputClass = classNames(
    'ring-1 ring-blue-200 p-2 rounded-md focus:outline-blue-300',
    className,
    {}
  );
  return (
    <div className='flex flex-col gap-2'>
      {label && (
        <label htmlFor={id} className='text-sm font-semibold'>
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        id={id}
        className={inputClass}
        value={value}
        max={max}
        autoComplete='off'
      />
    </div>
  );
};

export default Input;
