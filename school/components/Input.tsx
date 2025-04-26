import classNames from 'classnames';

interface InputProps {
  label?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  id?: string;
  className?: string;
}

const Input = ({
  label,
  type = 'text',
  name,
  placeholder,
  id,
  className
}: InputProps) => {
  const inputClass = classNames(
    'ring-1 ring-blue-400 p-2 rounded-md',
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
      />
    </div>
  );
};

export default Input;
