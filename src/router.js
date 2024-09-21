import { Router } from 'itty-router';
import itemRouter from './controller/ItemController.js';
import { log, error } from './utility/logger.js';

const router = Router();

router.all('/api/items/*', async (e) => {
    try {
        log("Routing to itemRouter for:", e.url);
        const response = await itemRouter.fetch(e);
        log("itemRouter response:", response);
        return response;
    } catch (error) {
        error("Error in router:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
});

router.all('*', () => new Response('Not Found', { status: 404 }));

export default router;
