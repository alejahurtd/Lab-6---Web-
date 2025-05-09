import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

//  Crear perfil por primera vez
export const createUserProfile = async (uid, data) => {
	await setDoc(doc(db, 'users', uid), data);
};

// Obtener perfil del usuario por su uid
export const getUserProfile = async (uid) => {
	const userDoc = await getDoc(doc(db, 'users', uid));
	return userDoc.exists() ? userDoc.data() : null;
};

//Actualizar perfil
export const updateUserProfile = async (uid, data) => {
	await updateDoc(doc(db, 'users', uid), data);
};
