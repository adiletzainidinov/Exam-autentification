import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { signUp } from '../store/authSlice/authThunk';
import { useNavigate } from 'react-router-dom';

const INPUT_FIELD = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
  },
  {
    name: 'password',
    label: 'Пароль',
    type: 'password',
  },
  {
    name: 'userName',
    label: 'Имя пользователя',
    type: 'text',
  },
  {
    name: 'photo',
    label: 'Фото (URL)',
    type: 'text',
  },
];

const schema = yup.object().shape({
  email: yup.string().email('Неверная почта').required('Напишите email'),
  password: yup
    .string()
    .min(6, 'Пароль должен быть больше 6 символов')
    .max(16, 'Пароль должен быть меньше 16 символов')
    .required('Напишите пароль!'),
  userName: yup
    .string()
    .required('Введите имя пользователя')
    .min(3, 'Имя пользователя должно быть больше 3 символов'),
  photo: yup.string().url('Введите корректный URL').required('Введите URL фото'),
}).required();

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data, 'data');
    dispatch(signUp({ data, navigate }));
  };

  return (
    <Box
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      {INPUT_FIELD.map((item) => (
        <div key={item.name}>
          <TextField
            name={item.name}
            label={item.label}
            type={item.type}
            placeholder={item.label}
            {...register(item.name)}
            error={!!errors[item.name]}
            helperText={errors[item.name]?.message}
            fullWidth
          />
        </div>
      ))}
      <Button type="submit" variant="contained" size="large">
        Добавить
      </Button>
    </Box>
  );
};

export default SignUp;
