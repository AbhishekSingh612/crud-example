import { handleRequest as handleItemsRequest } from './controller/ItemController.js';

export async function routeRequest(request) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/items')) {
        return handleItemsRequest(request);
    }
    return new Response("Not Found", { status: 404 });
}
