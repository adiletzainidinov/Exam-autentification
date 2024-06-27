import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { signIn, signUp } from '../store/authSlice/authThunk';
import { useNavigate } from 'react-router-dom';

const INPUT_FIELD = [
  {
    name: 'email',
    label: 'email',
    type: 'email',
  },
  {
    name: 'password',
    label: 'password',
    type: 'password',
  },
];

const schema = yup
  .object()
  .shape({
    email: yup.string().email('Неверная почта').required('Напишите email'),
    password: yup
      .string()
      .min(6, 'Пороль должен быть больше 6')
      .max(16, 'Пороль должен быть меньше 16ти')
      .required('Напишите пороль!'),
  })
  .required();

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data, 'data');
    dispatch(signIn({ data, navigate }));
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
            {...register(`${item.name}`)}
            defaultValue={''}
            error={!!errors[item.name]}
            helperText={errors[item.name]?.message}
            fullWidth
          />
        </div>
      ))}
      <Button type="submit" variant="contained" size="large">
        Add
      </Button>
    </Box>
  );
};

export default SignIn;
