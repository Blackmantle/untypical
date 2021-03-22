import React, { useState } from 'react';
import { useParams, useLocation, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { actions, selectors } from 'features';
import { User } from 'features/users/types';
import { State } from 'store';
import { UserParams, LocationState } from './types';
import {
  Box,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import CreateIcon from '@material-ui/icons/Create';
import UserForm from 'components/UserForm';

const genderConverter = {
  male: 'Мужской',
  female: 'Женский',
  other: 'Другой',
};

function UserProfile() {
  const { id } = useParams<UserParams>();
  const location = useLocation<LocationState>();
  const history = useHistory();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const user = useSelector((state: State) => selectors.user(state, id));
  const dispatch = useDispatch();

  if (!user) {
    return <Redirect to="/" />;
  }

  const goBack = () => {
    const from = location.state?.from;
    history.push(from || '/');
  };

  const openDialog = () => setIsDialogOpen(true);

  const closeDialog = () => setIsDialogOpen(false);

  const changeUserData = (data: User) => {
    dispatch(actions.changeUserData({ ...user, ...data }));
    closeDialog();
  };

  const { name, mail, gender } = user;

  return (
    <Box>
      <Box>
        <Box mb={3}>
          <Button startIcon={<ArrowBack />} onClick={goBack}>Назад</Button>
        </Box>
        <Box pb={2}>
          <Typography variant="h5">Данные пользователя:</Typography>
        </Box>
        <Divider />
        <Box py={2}>
          <Typography>{`ФИО: ${name}`}</Typography>
        </Box>
        <Divider />
        <Box py={2}>
          <Typography>{`Почта: ${mail}`}</Typography>
        </Box>
        <Divider />
        <Box py={2}>
          <Typography>{`Пол: ${genderConverter[gender]}`}</Typography>
        </Box>
        <Divider />
      </Box>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<CreateIcon />}
          onClick={openDialog}
          fullWidth
        >
          Изменить
        </Button>
      </Box>
      <Dialog open={isDialogOpen}>
        <DialogTitle>Изменить данные пользователя</DialogTitle>
        <DialogContent>
          <Box pb={3}>
            <UserForm initData={user} onSubmit={changeUserData} />
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
            Изменить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UserProfile;
