import { log } from '../utility/logger.js';
import {
    putItem,
    getItemById,
    getAll,
    updateItemInDb,
    deleteItemFromDb,
} from '../repository/ItemRepository.js';

export async function createItem(request) {
    try {
        const data = await request.json();
        const id = crypto.randomUUID();
        await putItem(id, data);
        log("Item Created", { id, data });
        return new Response(JSON.stringify({ id, ...data }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        log("Error Creating Item", { error });
        return new Response("Internal Server Error", { status: 500 });
    }
}

export async function getItem(id) {
    try {
        const item = await getItemById(id);
        if (!item) {
            log("Item Not Found", { id });
            return new Response("Item Not Found", { status: 404 });
        }
        log("Item Retrieved", { id, item });
        return new Response(JSON.stringify(item), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        log("Error Retrieving Item", { error });
        return new Response("Internal Server Error", { status: 500 });
    }
}

export async function getAllItems() {
    try {
        const items = await getAll();
        log("All Items Retrieved", { items });
        return new Response(JSON.stringify(items), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        log("Error Retrieving All Items", { error });
        return new Response("Internal Server Error", { status: 500 });
    }
}

export async function updateItem(content, id) {
    try {
        log("Update Item Service", { id, content });
        const existing = await getItemById(id);
        if (!existing) {
            log("Item Not Found for Update", { id });
            return new Response("Item Not Found", { status: 404 });
        }
        log("Existing Item : ", { existing });
        await updateItemInDb(id, content);
        log("Item Updated", { id, content });
        return new Response(JSON.stringify({ id, ...content }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        log("Error Updating Item", { error });
        return new Response("Internal Server Error", { status: 500 });
    }
}

export async function deleteItem(id) {
    try {
        await deleteItemFromDb(id);
        log("Item Deleted", { id });
        return new Response(null, { status: 204 });
    } catch (error) {
        log("Error Deleting Item", { error });
        return new Response("Internal Server Error", { status: 500 });
    }
}
