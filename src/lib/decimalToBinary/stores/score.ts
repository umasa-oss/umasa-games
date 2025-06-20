// src/lib/stores/score.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const localKey = 'decimalToBinary_score';

const initial = browser
	? parseInt(localStorage.getItem(localKey) || '0')
	: 0;

const score = writable(initial);

// Nur im Browser speichern
if (browser) {
	score.subscribe((value) => {
		localStorage.setItem(localKey, value.toString());
	});
}

export default score;
