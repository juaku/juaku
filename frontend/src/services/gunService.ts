// src/services/gunService.ts
import Gun from 'gun';

export const initializeGun = () => {
	if (typeof window !== 'undefined') {
		const gunInstance = Gun();
		return gunInstance;
	}
	return null;
};
