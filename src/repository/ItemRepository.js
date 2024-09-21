import { log } from "../utility/logger";

const KV = crud_namespace;

export async function putItem(id, data) {
    return KV.put(id, JSON.stringify(data));
}

export async function getItemById(id) {
    const item = await KV.get(id);
    return item ? JSON.parse(item) : null;
}

export async function getAll() {
    const list = await KV.list();
    const items = [];
    for (const key of list.keys) {
        const item = await KV.get(key.name);
        items.push({ id: key.name, ...JSON.parse(item) });
    }
    return items;
}

export async function updateItemInDb(id, data) {
    log("Updating KV", { id, data });
    return KV.put(id, JSON.stringify(data));
}

export async function deleteItemFromDb(id) {
    return KV.delete(id);
}
