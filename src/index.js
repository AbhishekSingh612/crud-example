import router from './router.js';
import { log, error } from "./utility/logger.js";

addEventListener("fetch", event => {
  log("Received request:", event.request.url);  // Log when request is received
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  try {
    log("Handling request:", request.url);  // Log before routing
    const response = await router.fetch(request);
    log("Response generated:", response);  // Log if response is generated
    if (!response) {
      log("No response from router, returning 404");
      return new Response("Not Found", { status: 404 });
    }
    return response;
  } catch (error) {
    error("Error in handleRequest:", error);  // Log the error
    return new Response("Internal Server Error", { status: 500 });
  }
}
