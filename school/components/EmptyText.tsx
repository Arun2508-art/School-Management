const EmptyText = ({ title }: { title: string }) => {
  return (
    <div className='h-[calc(100vh-141px)] w-full text-blue-400 text-xl leading-1 font-semibold flex items-center justify-center'>
      {title}
    </div>
  );
};

export default EmptyText;
