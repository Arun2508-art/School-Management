export interface ButtonProps {
  children: string;
}

const Button = ({ children }: ButtonProps) => {
  return (
    <button className='ring-1 ring-blue-600 bg-blue-600 text-white px-4 py-2 rounded-sm cursor-pointer'>
      {children}
    </button>
  );
};

export default Button;
