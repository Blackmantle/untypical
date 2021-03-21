import { User } from 'features/users/types';

export type FormData = User;

export default interface UserFormProps {
  initData?: User;
  onSubmit: (data: User) => void;
}
