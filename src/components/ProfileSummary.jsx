import React from 'react';
import { Box, Card, CardContent, Typography, Avatar, Chip, Stack } from '@mui/material';

const ProfileSummary = ({ profile }) => {
	const {
		username,
		email,
		birthDate,
		avatar, //
		description, //
		interests = [],
	} = profile;

	return (
		<Box display='flex' justifyContent='center'>
			<Card sx={{ maxWidth: 400, p: 2 }}>
				<CardContent>
					{avatar && (
						<Box display='flex' justifyContent='center' mb={2}>
							<Avatar alt='Avatar del usuario' src={`/avatars/${avatar}`} sx={{ width: 80, height: 80 }} />
						</Box>
					)}

					<Typography variant='h6' align='center'>
						{username}
					</Typography>

					<Typography variant='body2' align='center' color='text.secondary'>
						{email}
					</Typography>

					<Typography variant='body2' align='center' mt={1}>
						Fecha de nacimiento: {birthDate}
					</Typography>

					{description && (
						<Typography variant='body2' mt={2}>
							<strong>Sobre mí:</strong> {description}
						</Typography>
					)}

					{interests.length > 0 && (
						<>
							<Typography variant='body2' mt={2}>
								<strong>Intereses:</strong>
							</Typography>
							<Stack direction='row' spacing={1} flexWrap='wrap' mt={1}>
								{interests.map((item, index) => (
									<Chip key={index} label={item} />
								))}
							</Stack>
						</>
					)}
				</CardContent>
			</Card>
		</Box>
	);
};

export default ProfileSummary;
