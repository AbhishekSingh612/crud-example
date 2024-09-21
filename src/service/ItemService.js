import { putItem, getItemById, getAll, updateItemInDb, deleteItemFromDb } from '../repository/ItemRepository.js';
import { log } from '../utility/logger.js';

export async function createItem(request) {
    const data = await request.json();
    const id = crypto.randomUUID();
    await putItem(id, data);
    log("Item Created", { id, data });
    return new Response(JSON.stringify({ id, ...data }), { status: 201 });
}

export async function getItem(id) {
    const item = await getItemById(id);
    if (!item) {
        log("Item Not Found", { id });
        return new Response("Item Not Found", { status: 404 });
    }
    log("Item Retrieved", { id, item });
    return new Response(item, { status: 200 });
}

export async function getAllItems() {
    const items = await getAll();
    log("All Items Retrieved", { items });
    return new Response(JSON.stringify(items), { status: 200 });
}

export async function updateItem(request, id) {
    const existing = await getItemById(id);
    if (!existing) {
        log("Item Not Found for Update", { id });
        return new Response("Item Not Found", { status: 404 });
    }
    const data = await request.json();
    await updateItemInDb(id, data);
    log("Item Updated", { id, data });
    return new Response(JSON.stringify({ id, ...data }), { status: 200 });
}

export async function deleteItem(id) {
    await deleteItemFromDb(id);
    log("Item Deleted", { id });
    return new Response("Item Deleted", { status: 204 });
}
