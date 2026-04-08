// Local storage service using IndexedDB
// Replaces localStorage for project persistence — no 5MB quota limit
// Compatible: Chrome, Firefox, Safari 10.1+, Edge

const LocalDB = (() => {
    const DB_NAME = 'pixelEditorDB';
    const DB_VERSION = 1;
    const STORE = 'projects';

    function open() {
        return new Promise((resolve, reject) => {
            const req = indexedDB.open(DB_NAME, DB_VERSION);
            req.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(STORE)) {
                    db.createObjectStore(STORE, { keyPath: 'name' });
                }
            };
            req.onsuccess = (e) => resolve(e.target.result);
            req.onerror = () => reject(req.error);
        });
    }

    async function saveProject(projectData) {
        try {
            const db = await open();
            return new Promise((resolve, reject) => {
                const tx = db.transaction(STORE, 'readwrite');
                const req = tx.objectStore(STORE).put({
                    ...projectData,
                    lastModified: new Date().toISOString()
                });
                req.onsuccess = () => resolve({ success: true });
                req.onerror = () => reject(req.error);
            });
        } catch (e) {
            return { success: false, error: e.message };
        }
    }

    async function loadProject(name) {
        try {
            const db = await open();
            return new Promise((resolve, reject) => {
                const tx = db.transaction(STORE, 'readonly');
                const req = tx.objectStore(STORE).get(name);
                req.onsuccess = () => resolve({ success: true, data: req.result || null });
                req.onerror = () => reject(req.error);
            });
        } catch (e) {
            return { success: false, error: e.message };
        }
    }

    async function getAllProjects() {
        try {
            const db = await open();
            return new Promise((resolve, reject) => {
                const tx = db.transaction(STORE, 'readonly');
                const req = tx.objectStore(STORE).getAll();
                req.onsuccess = () => {
                    const projects = (req.result || []).sort((a, b) =>
                        new Date(b.lastModified) - new Date(a.lastModified)
                    );
                    resolve({ success: true, data: projects });
                };
                req.onerror = () => reject(req.error);
            });
        } catch (e) {
            return { success: false, error: e.message };
        }
    }

    async function deleteProject(name) {
        try {
            const db = await open();
            return new Promise((resolve, reject) => {
                const tx = db.transaction(STORE, 'readwrite');
                const req = tx.objectStore(STORE).delete(name);
                req.onsuccess = () => resolve({ success: true });
                req.onerror = () => reject(req.error);
            });
        } catch (e) {
            return { success: false, error: e.message };
        }
    }

    return { saveProject, loadProject, getAllProjects, deleteProject };
})();

window.localDB = LocalDB;
