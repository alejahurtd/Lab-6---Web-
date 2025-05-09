import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

//  Crear cuenta con Firebase
export const registerUser = async (email, password, username, birthDate) => {
	const userCredential = await createUserWithEmailAndPassword(auth, email, password);
	const user = userCredential.user;

	// Guardar datos  Firestore
	await setDoc(doc(db, 'users', user.uid), {
		uid: user.uid,
		email,
		username,
		birthDate,
		profileCompleted: false,
	});

	return user;
};

//  Iniciar sesión
export const loginUser = async (email, password) => {
	const userCredential = await signInWithEmailAndPassword(auth, email, password);
	return userCredential.user;
};

//  Cerrar sesión
export const logoutUser = async () => {
	await signOut(auth);
};

//  Obtener perfil
export const getUserProfile = async (uid) => {
	const userDoc = await getDoc(doc(db, 'users', uid));
	return userDoc.exists() ? userDoc.data() : null;
};
