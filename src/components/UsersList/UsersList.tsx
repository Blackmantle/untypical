import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { actions, selectors } from 'features';
import { User } from 'features/users/types';
import {
  Box,
  Button,
  Link,
  IconButton,
  Tooltip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddIcon from '@material-ui/icons/Add';
import UserForm from 'components/UserForm';

function UsersList() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const users = useSelector(selectors.users);
  const dispatch = useDispatch();

  function onDialogOpen() {
    setIsDialogOpen(true);
  }

  function onDialogClose() {
    setIsDialogOpen(false);
  }

  const handleSubmit = (data: User) => {
    dispatch(actions.addUser(data));
    onDialogClose();
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        mt={2}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onDialogOpen}
        >
          Добавить пользователя
        </Button>
      </Box>
      <Dialog open={isDialogOpen}>
        <DialogTitle>Добавить пользователя</DialogTitle>
        <DialogContent>
          <Box pb={3}>
            <UserForm onSubmit={handleSubmit} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onDialogClose}>Отмена</Button>
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
        {users.map(({ id, name }) => (
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
                <IconButton color="primary" onClick={() => {}}>
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
