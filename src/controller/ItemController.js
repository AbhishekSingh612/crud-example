import { createItem, getItem, getAllItems, updateItem, deleteItem } from '../service/ItemService.js';

export async function handleRequest(request) {
  const url = new URL(request.url);
  const match = url.pathname.match(/^\/api\/items(?:\/([^\/]+))?\/?$/);

  if (!match) {
    return new Response("Not Found", { status: 404 });
  }

  const id = match[1];

  switch (request.method) {
    case 'POST':
      return createItem(request);
    case 'GET':
      return id ? getItem(id) : getAllItems();
    case 'PUT':
      return id ? updateItem(request, id) : new Response("ID required for PUT", { status: 400 });
    case 'DELETE':
      return id ? deleteItem(id) : new Response("ID required for DELETE", { status: 400 });
    default:
      return new Response("Method Not Allowed", { status: 405 });
  }
}
