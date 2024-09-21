import { handleRequest } from './router.js';

addEventListener("fetch", event => {
	event.respondWith(handleRequest(event.request));
});
