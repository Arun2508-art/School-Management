export interface ButtonProps {
  children: string;
}

const Button = ({ children }: ButtonProps) => {
  return (
    <button className='ring-1 ring-blue-600 bg-blue-600 text-white p-2 rounded-md cursor-pointer'>
      {children}
    </button>
  );
};

export default Button;
