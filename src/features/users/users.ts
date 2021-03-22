import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
  createSelector,
} from '@reduxjs/toolkit';
import { User, UserData, UserFilters } from './types';
import { State } from 'store';

const UsersAdapter = createEntityAdapter<UserData>();

const initialState = UsersAdapter.getInitialState();

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      const lastId = state.ids[state.ids.length - 1] || 0;
      const id = lastId as number + 1;
      UsersAdapter.addOne(state, { id, ...action.payload });
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      UsersAdapter.removeOne(state, action.payload);
    },
    changeUserData: (state, action: PayloadAction<UserData>) => {
      const { id, ...changes } = action.payload;
      UsersAdapter.updateOne(state, { id, changes });
    },
  },
});

const usersSelectors = UsersAdapter.getSelectors((state: State) => state.users);
const userSelector = usersSelectors.selectById;
const usersSelector = usersSelectors.selectAll;
const filteredUsersSelector = createSelector(
  usersSelector,
  (_: State, filters: UserFilters) => filters,
  (users, filters) => (
    Object.entries(filters).reduce((filteredUsers, [key, value]) => {
      switch (key) {
        case 'gender': {
          if (value === 'all') {
            return filteredUsers;
          }
          // @ts-ignore
          return filteredUsers.filter((user) => user[key] === value);
        }
        default: return filteredUsers;
      }
    }, users)
  ),
);

export const selectors = {
  user: userSelector,
  users: usersSelector,
  filteredUsers: filteredUsersSelector,
};

export const { actions } = usersSlice;

export default usersSlice.reducer;
