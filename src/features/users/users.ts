import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { User, UserData } from './types';
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
      UsersAdapter.addOne(state, { id, isDeleted: false, ...action.payload });
    },
  },
});

const usersSelectors = UsersAdapter.getSelectors((state: State) => state.users);
const userSelector = usersSelectors.selectById;
const usersSelector = usersSelectors.selectAll;

export const selectors = {
  user: userSelector,
  users: usersSelector,
};

export const { actions } = usersSlice;

export default usersSlice.reducer;
