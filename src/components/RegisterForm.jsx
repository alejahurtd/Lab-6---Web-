import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { registerUser } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';

const RegisterForm = () => {
	// aquí guardo los datos del formulario
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		username: '',
		birthDate: '',
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

	// aquí intento registrar al usuario
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		const { email, password, username, birthDate } = formData;

		try {
			const user = await registerUser(email, password, username, birthDate);

			// guardo los datos en Redux
			dispatch(loginSuccess({ uid: user.uid, email: user.email }));
			localStorage.setItem('uid', user.uid);

			// redirijo al dashboard
			navigate('/dashboard');
		} catch (err) {
			setError('Error al registrar: ' + err.message);
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
					Crear cuenta
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
					<TextField
						fullWidth
						required
						label='Nombre de usuario'
						name='username'
						value={formData.username}
						onChange={handleChange}
						margin='normal'
					/>
					<TextField
						fullWidth
						required
						label='Fecha de nacimiento'
						name='birthDate'
						type='date'
						InputLabelProps={{ shrink: true }}
						value={formData.birthDate}
						onChange={handleChange}
						margin='normal'
					/>
					{error && (
						<Typography color='error' sx={{ mt: 1 }}>
							{error}
						</Typography>
					)}
					<Button type='submit' fullWidth variant='contained' sx={{ mt: 2 }}>
						Registrarse
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default RegisterForm;
