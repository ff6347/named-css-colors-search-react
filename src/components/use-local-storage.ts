import { useState, useEffect } from "react";
type StorageValue = string[];

function getStorageValue(key: string, defaultValue: StorageValue) {
	const saved = window.localStorage.getItem(key);
	if (!saved) {
		return defaultValue;
	}
	try {
		const initial = JSON.parse(saved);
		return initial || defaultValue;
	} catch (error) {
		console.error("Error parsing localStorage value", error);
		return defaultValue;
	}
}

export const useLocalStorage = (key: string, defaultValue: StorageValue) => {
	const [value, setValue] = useState(() => {
		return getStorageValue(key, defaultValue);
	});

	useEffect(() => {
		try {
			window.localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.error("Error setting localStorage value", error);
		}
	}, [key, value]);

	return [value, setValue];
};
