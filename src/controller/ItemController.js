import { Router, withContent } from 'itty-router';
import {
  createItem,
  getItem,
  getAllItems,
  updateItem,
  deleteItem,
} from '../service/ItemService.js';
import { log } from '../utility/logger.js';

const itemRouter = Router();

itemRouter.get("/api/items", async () => {
  return await getAllItems();
});

itemRouter.get("/api/items/:id", async ({ params }) => {
  const id = params.id;
  return await getItem(id);
});

itemRouter.post("/api/items", async (request) => {
  log("Create Item request: ", {request});
  return await createItem(request);
});

itemRouter.put("/api/items/:id", withContent, async ({ content, params }) => {
  log("Update controller: ", { content, params });
  const id = params.id;
  return await updateItem(content, id);
});

itemRouter.delete("/api/items/:id", async ({ params }) => {
  const id = params.id;
  return await deleteItem(id);
});

// Fallback for unsupported methods
itemRouter.all("*", () => new Response("Method Not Allowed", { status: 405 }));

export default itemRouter;