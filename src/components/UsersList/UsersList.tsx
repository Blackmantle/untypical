import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { actions, selectors } from 'features';
import { User, UserFilters } from 'features/users/types';
import { State } from 'store';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Link,
  IconButton,
  Tooltip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddIcon from '@material-ui/icons/Add';
import UserForm from 'components/UserForm';

function UsersList() {
  const [filters, setFilters] = useState<UserFilters>({ gender: 'all' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const filteredUsers = useSelector((state: State) => selectors.filteredUsers(state, filters));
  const dispatch = useDispatch();

  function changeFilterValue(name: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (e: any) => {
      setFilters((prev) => ({ ...prev, [name]: e.target.value }));
    };
  }

  function openDialog() {
    setIsDialogOpen(true);
  }

  function closeDialog() {
    setIsDialogOpen(false);
  }

  const addUser = (data: User) => {
    dispatch(actions.addUser(data));
    closeDialog();
  };

  const deleteUser = (id: number) => {
    dispatch(actions.deleteUser(id));
  };

  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={openDialog}
          fullWidth
        >
          Добавить пользователя
        </Button>
      </Box>
      <Box mt={2}>
        <FormControl fullWidth>
          <InputLabel id="gender-select-label">Пол</InputLabel>
          <Select
            value={filters.gender}
            onChange={changeFilterValue('gender')}
            labelId="gender-select-label"
          >
            <MenuItem value="all">Любой</MenuItem>
            <MenuItem value="male">Мужской</MenuItem>
            <MenuItem value="female">Женский</MenuItem>
            <MenuItem value="other">Другой</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Dialog open={isDialogOpen}>
        <DialogTitle>Добавить пользователя</DialogTitle>
        <DialogContent>
          <Box pb={3}>
            <UserForm onSubmit={addUser} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={closeDialog}>Отмена</Button>
          <Button
            type="submit"
            form="userForm"
            variant="contained"
            color="primary"
          >
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
      <Box mt={4}>
        {!filteredUsers.length
          ? <Typography align="center">Нет пользователей</Typography>
          : filteredUsers.map(({ id, name }) => (
            <React.Fragment key={id}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mt={2}
              >
                <Link
                  component={RouterLink}
                  to={`/id${id}`}
                  style={{ wordBreak: 'break-word' }}
                >
                  {name}
                </Link>
                <Tooltip title="Удалить">
                  <IconButton color="primary" onClick={() => deleteUser(id)}>
                    <DeleteForeverIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Divider />
            </React.Fragment>
          ))}
      </Box>
    </Box>
  );
}

export default UsersList;
