import { routeRequest } from './router.js';

addEventListener("fetch", event => {
	event.respondWith(routeRequest(event.request));
});
