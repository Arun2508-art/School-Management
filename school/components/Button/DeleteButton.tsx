import { useAppDispatch } from '@/store/hooks';
import { deleteStudent } from '@/store/Slices/StudentSlice';
import { deleteTeacher } from '@/store/Slices/TeacherSlice';
import { IconTrash } from '@tabler/icons-react';

export interface DeleteButtonProps {
  id: string;
  type: 'student' | 'teacher' | 'parent' | 'class' | 'subject';
}

const DeleteButton = ({ id, type }: DeleteButtonProps) => {
  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    if (type === 'student') {
      dispatch(deleteStudent(id));
    } else if (type === 'teacher') {
      dispatch(deleteTeacher(id));
    }
  };

  return (
    <button
      className='w-7 h-7 flex items-center justify-center rounded-full text-red-600 hover:bg-Purple cursor-pointer'
      onClick={() => {
        handleDelete(id);
      }}
    >
      <IconTrash stroke={2} width={16} height={16} />
    </button>
  );
};

export default DeleteButton;
