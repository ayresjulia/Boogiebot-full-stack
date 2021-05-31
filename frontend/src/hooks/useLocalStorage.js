import { useState, useEffect } from "react";

/** Custom hook to keep state data synced with localStorage using passed-in key. Defaults to firstValue if nothing in localStorage. Used with saving user token. */

function useLocalStorage (key, firstValue = null) {
	const initialValue = localStorage.getItem(key) || firstValue;

	const [ item, setItem ] = useState(initialValue);

	useEffect(
		function setKeyInLocalStorage () {
			if (item === null) {
				localStorage.removeItem(key);
			} else {
				localStorage.setItem(key, item);
			}
		},
		[ key, item ]
	);

	return [ item, setItem ];
}

export default useLocalStorage;
