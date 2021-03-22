export type User = {
  name: string;
  mail: string;
  gender: 'male' | 'female' | 'other';
};

export type UserData = User & {
  id: number;
};

export type UserFilters = {
  gender: 'all' | Pick<User, 'gender'>;
};
