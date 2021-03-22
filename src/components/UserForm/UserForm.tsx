import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Props, { FormData } from './types';
import { User } from 'features/users/types';
import {
  Box,
  TextField,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

function UserForm({ onSubmit, initData }: Props) {
  const { register, control, handleSubmit, errors } = useForm<User>({
    defaultValues: initData,
  });

  const sharedValidators = {
    required: 'Обязательное поле!',
  };

  return (
    <form id="userForm" onSubmit={handleSubmit((data: FormData) => onSubmit(data))}>
      <Box>
        <TextField
          name="name"
          label="ФИО"
          error={!!errors.name}
          inputRef={register({
            ...sharedValidators,
            maxLength: {
              value: 100,
              message: 'Максимум 100 символов!',
            },
          })}
          fullWidth
          autoFocus
        />
        {errors.name && <FormHelperText error>{errors.name.message}</FormHelperText>}
      </Box>
      <Box mt={2}>
        <TextField
          name="mail"
          label="Почта"
          error={!!errors.mail}
          inputRef={register({
            ...sharedValidators,
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Неверный формат!',
            },
          })}
          fullWidth
        />
        {errors.mail && <FormHelperText error>{errors.mail.message}</FormHelperText>}
      </Box>
      <Box mt={2}>
        <FormControl error={!!errors.gender} fullWidth>
          <InputLabel id="gender-select-label">Пол</InputLabel>
          <Controller
            name="gender"
            defaultValue=""
            control={control}
            rules={sharedValidators}
            as={(
              <Select labelId="gender-select-label">
                <MenuItem value="male">Мужской</MenuItem>
                <MenuItem value="female">Женский</MenuItem>
                <MenuItem value="other">Другой</MenuItem>
              </Select>
          )}
          />
        </FormControl>
        {errors.gender && <FormHelperText error>{errors.gender.message}</FormHelperText>}
      </Box>
    </form>
  );
}

export default UserForm;
