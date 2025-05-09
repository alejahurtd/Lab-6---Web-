import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { loginUser } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';

const LoginForm = () => {
	// aquí guardo email y contraseña
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [error, setError] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// aquí actualizo los valores al escribir
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	// aquí intento iniciar sesión
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		const { email, password } = formData;

		try {
			const user = await loginUser(email, password);

			// guardo datos en Redux
			dispatch(loginSuccess({ uid: user.uid, email: user.email }));
			localStorage.setItem('uid', user.uid);

			// redirijo al dashboard
			navigate('/dashboard');
		} catch (err) {
			setError('Error al iniciar sesión: ' + err.message);
		}
	};

	return (
		<Container maxWidth='xs'>
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Typography component='h1' variant='h5'>
					Iniciar sesión
				</Typography>
				<Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<TextField
						fullWidth
						required
						label='Correo electrónico'
						name='email'
						type='email'
						value={formData.email}
						onChange={handleChange}
						margin='normal'
					/>
					<TextField
						fullWidth
						required
						label='Contraseña'
						name='password'
						type='password'
						value={formData.password}
						onChange={handleChange}
						margin='normal'
					/>
					{error && (
						<Typography color='error' sx={{ mt: 1 }}>
							{error}
						</Typography>
					)}
					<Button type='submit' fullWidth variant='contained' sx={{ mt: 2 }}>
						Iniciar sesión
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default LoginForm;
