'use strict';

const SHARE_REDIRECT_RESPONSE = Response.redirect('/', 303);

self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    const { request } = event;
    if (request.method === 'POST') {
        const url = new URL(request.url);
        if (url.pathname === '/') {
            event.respondWith(handleShareTarget(event));
        }
    }
});

async function handleShareTarget(event) {
    try {
        const formData = await event.request.formData();
        const files = formData.getAll('files').filter(Boolean);

        if (files.length === 0) {
            return SHARE_REDIRECT_RESPONSE;
        }

        const processedFiles = [];
        for (const file of files) {
            const data = await file.text();
            processedFiles.push({ name: file.name, data });
        }

        await notifyClientsWithFiles(processedFiles);
        return SHARE_REDIRECT_RESPONSE;
    } catch (error) {
        console.error('[SW] Erreur gestion share target:', error);
        return SHARE_REDIRECT_RESPONSE;
    }
}

async function notifyClientsWithFiles(files) {
    const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });

    if (clients.length > 0) {
        clients[0].focus();
        clients[0].postMessage({ type: 'SHARED_FILE', files });
        return;
    }

    const client = await self.clients.openWindow('/?from=share');
    if (client) {
        // Attendre que la page soit prête à recevoir le message
        await new Promise(resolve => setTimeout(resolve, 500));
        client.postMessage({ type: 'SHARED_FILE', files });
    }
}
