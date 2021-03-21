export type User = {
  name: string;
  mail: string;
  gender: string;
};

export type UserData = User & {
  id: number;
};
