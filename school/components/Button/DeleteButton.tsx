import { useAppDispatch } from '@/store/hooks';
import { deleteParent } from '@/store/Slices/ParentSlice';
import { deleteStudent } from '@/store/Slices/Student';
import { deleteTeacher } from '@/store/Slices/Teacher';
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
    } else if (type === 'parent') {
      dispatch(deleteParent(id));
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
