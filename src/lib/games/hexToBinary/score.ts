import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const localKey = 'hexToBinary_score';

const initial = browser ? parseInt(localStorage.getItem(localKey) || '0') : 0;

const score = writable(initial);

if (browser) {
	score.subscribe((value) => {
		localStorage.setItem(localKey, value.toString());
	});
}

export default score;
