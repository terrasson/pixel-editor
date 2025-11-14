let currentColor = '#000000';
let isDrawing = false;
let frames = [[]];
let currentFrame = 0;
let isErasing = false; // Pour la gomme
let modifiedPixels = [new Set()]; // Pour suivre les pixels modifiés
let clipboard = null; // Pour le copier-coller
let copiedFrame = null;
let customColors = []; // Palette de couleurs personnalisées
const maxCustomColors = 8; // Nombre maximum de couleurs personnalisées
const CUSTOM_COLOR_REMOVE_DELAY = 2000; // Délai avant affichage de la croix de suppression
let customPalette = null; // Palette personnalisée des couleurs compactes pour le projet
let pendingColor = null; // Couleur en attente de validation
let customColorModalElements = null;
let customColorModalState = {
    currentHex: '#000000',
    h: 0,
    s: 100,
    l: 50,
    escapeHandler: null,
    pointerUV: null
};
let animationFPS = 24; // FPS par défaut (cinéma)
let autoSaveProjects = []; // Projets sauvegardés automatiquement en local
const maxAutoSaveProjects = 10; // Nombre maximum de projets auto-sauvegardés
const GRID_SIZE = 32;
let currentUserProfile = null;
let profileModalContext = 'prompt';
let profileModalInitialized = false;
let profilePromptHasBeenShown = false;
let profileFeatureAvailable = true;
const PROFILE_PROMPT_DISMISSED_KEY = 'pixelEditor_profile_prompt_dismissed';

const PROFILE_SKIP_KEY = 'pixelEditorProfileSkip_v1';
const PROFILE_ROLE_OPTIONS = Object.freeze([
    { value: 'hobbyist', label: 'Hobbyiste / passionné(e)' },
    { value: 'student', label: 'Étudiant(e)' },
    { value: 'freelance', label: 'Pro indépendant(e)' },
    { value: 'studio', label: 'Studio / Entreprise' },
    { value: 'teacher', label: 'Enseignant(e)' },
    { value: 'other', label: 'Autre' }
]);
const PROFILE_EXPERIENCE_OPTIONS = Object.freeze([
    { value: 'beginner', label: 'Débutant(e)' },
    { value: 'intermediate', label: 'Intermédiaire' },
    { value: 'advanced', label: 'Avancé(e)' }
]);
const PROFILE_USAGE_OPTIONS = Object.freeze([
    { value: 'personal', label: 'Animations personnelles' },
    { value: 'social', label: 'Réseaux sociaux / streaming' },
    { value: 'game', label: 'Jeu vidéo / prototypage' },
    { value: 'marketing', label: 'Marketing / marque' },
    { value: 'education', label: 'Apprentissage / formation' },
    { value: 'other', label: 'Autre projet' }
]);

let userProfile = null;
let userProfileFetched = false;

function createEmptyFrame(width = GRID_SIZE, height = GRID_SIZE) {
    const totalPixels = width * height;
    return Array.from({ length: totalPixels }, () => ({
        color: '#FFFFFF',
        isEmpty: true
    }));
}

function normalisePixel(pixel) {
    if (!pixel || typeof pixel !== 'object') {
        return { color: '#FFFFFF', isEmpty: true };
    }
    return {
        color: pixel.color || '#FFFFFF',
        isEmpty: pixel.isEmpty !== false ? true : false
    };
}

function normaliseFrames(rawFrames) {
    let framesArray = rawFrames;

    if (rawFrames && typeof rawFrames === 'object' && !Array.isArray(rawFrames)) {
        if (Array.isArray(rawFrames.frames)) {
            framesArray = rawFrames.frames;
        } else if (Array.isArray(rawFrames.data)) {
            framesArray = rawFrames.data;
        } else {
            framesArray = Object.values(rawFrames).find(Array.isArray) || [];
        }
    }

    if (typeof framesArray === 'string') {
        try {
            framesArray = JSON.parse(framesArray);
        } catch {
            framesArray = [];
        }
    }

    if (!Array.isArray(framesArray) || framesArray.length === 0) {
        return [createEmptyFrame()];
    }

    return framesArray.map(frame => {
        if (frame && typeof frame === 'object' && !Array.isArray(frame) && Array.isArray(frame.pixels)) {
            frame = frame.pixels;
        }

        if (!Array.isArray(frame)) {
            return createEmptyFrame();
        }
        if (frame.length !== GRID_SIZE * GRID_SIZE) {
            const normalised = createEmptyFrame();
            frame.slice(0, normalised.length).forEach((pixel, idx) => {
                normalised[idx] = normalisePixel(pixel);
            });
            return normalised;
        }
        return frame.map(normalisePixel);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function ensureAuthenticatedUser(retries = 10, delay = 200) {
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            await window.authService.init();
        } catch (error) {
            console.warn('Auth init attempt failed:', error);
        }

        if (window.authService.isAuthenticated && window.authService.isAuthenticated()) {
            return true;
        }

        await sleep(delay);
    }

    throw new Error('User not authenticated');
}

async function logUsageEvent(eventName, payload = {}) {
    if (!window.dbService?.logUsageEvent) return;

    try {
        await window.dbService.logUsageEvent(eventName, payload);
    } catch (error) {
        console.warn('Usage event log failed:', error.message);
    }
}

// Variables pour l'animation
let isAnimationPlaying = false;
let animationInterval = null;

// Variables pour l'historique undo/redo
let history = []; // Historique des changements de pixels
let historyIndex = -1; // Index actuel dans l'historique
const maxHistorySize = 50; // Nombre maximum d'étapes dans l'historique
let currentActionPixels = new Set(); // Pixels modifiés dans l'action actuelle
let actionStartState = null; // État de la grille au début de l'action

// Initialisation de la grille
function initGrid() {
    const grid = document.getElementById('pixelGrid');
    for (let i = 0; i < 32 * 32; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel empty';
        pixel.addEventListener('mousedown', startDrawing);
        pixel.addEventListener('mouseover', draw);
        pixel.addEventListener('mouseup', stopDrawing);
        grid.appendChild(pixel);
    }
    
    grid.addEventListener('mousedown', e => e.preventDefault());
}

// Fonctions de dessin
function startDrawing(e) {
    // Sauvegarder l'état de la grille au début de l'action
    const pixels = document.querySelectorAll('.pixel');
    actionStartState = Array.from(pixels).map(pixel => ({
        color: pixel.style.backgroundColor || '#FFFFFF',
        isEmpty: pixel.classList.contains('empty')
    }));
    
    // Réinitialiser les pixels de l'action actuelle
    currentActionPixels.clear();
    
    isDrawing = true;
    draw(e);
}

function draw(e) {
    if (!isDrawing) return;
    
    // Vérification stricte : le pixel doit être dans la grille ET être un élément pixel valide
    const pixelGrid = document.getElementById('pixelGrid');
    if (e.target.classList.contains('pixel') && 
        pixelGrid && 
        pixelGrid.contains(e.target) &&
        !e.target.classList.contains('previous-pixel-marker') &&
        !e.target.classList.contains('next-pixel-marker-1') &&
        !e.target.classList.contains('next-pixel-marker-2')) {
        
        // Récupérer l'index du pixel
        const pixels = document.querySelectorAll('.pixel');
        const pixelIndex = Array.from(pixels).indexOf(e.target);
        
        // Enregistrer ce pixel comme modifié dans l'action actuelle
        currentActionPixels.add(pixelIndex);
        
        if (isErasing) {
            // Mode gomme
            e.target.style.backgroundColor = '#FFFFFF';
            e.target.classList.add('empty');
        } else {
            // Mode dessin normal
            e.target.style.backgroundColor = currentColor;
            e.target.classList.remove('empty');
        }
        saveCurrentFrame();
    }
}

function stopDrawing() {
    console.log('🛑 stopDrawing appelé', { 
        isDrawing, 
        currentActionPixelsSize: currentActionPixels.size, 
        actionStartStateExists: !!actionStartState 
    });
    
    isDrawing = false;
    
    // Sauvegarder l'action complète dans l'historique si des pixels ont été modifiés
    if (currentActionPixels.size > 0 && actionStartState) {
        console.log('✅ Sauvegarde de l\'action dans l\'historique', { 
            pixelsModifiés: currentActionPixels.size 
        });
        saveActionToHistory(actionStartState, currentActionPixels);
    } else {
        console.log('❌ Action NON sauvegardée', { 
            raison: currentActionPixels.size === 0 ? 'Aucun pixel modifié' : 'actionStartState manquant' 
        });
    }
    
    // Réinitialiser pour la prochaine action
    currentActionPixels.clear();
    actionStartState = null;
}

// Gestion des couleurs
function toggleEraser() {
    setEraserState(!isErasing);
}

function setEraserState(active) {
    isErasing = active;
    const pixelGrid = document.getElementById('pixelGrid');
    if (pixelGrid) {
        pixelGrid.classList.toggle('eraser-mode', active);
    }
    document.querySelectorAll('#eraserBtn').forEach(btn => {
        btn.classList.toggle('active', active);
    });
}

function getColorPickers() {
    return Array.from(document.querySelectorAll('#colorPicker'));
}

function getActiveColorPicker() {
    const pickers = getColorPickers();
    return pickers.find(picker => picker.offsetParent !== null) || pickers[0] || null;
}

function openNativeColorPicker() {
    const picker = getActiveColorPicker();
    if (picker) {
        picker.focus?.({ preventScroll: true });
        picker.click();
    }
}

function syncColorPickers(color) {
    getColorPickers().forEach(picker => {
        if (picker.value !== color) {
            picker.value = color;
        }
    });
}

// Fonctions pour gérer les couleurs personnalisées
function loadCustomColors() {
    const saved = localStorage.getItem('pixelEditor_customColors');
    if (saved) {
        customColors = JSON.parse(saved);
    }
}

function adjustForOrientation() {
    requestAnimationFrame(() => {
        updateFramesList();
        if (customPalette) {
            updateCompactPalette();
        }
    });
}

function saveCustomColors() {
    localStorage.setItem('pixelEditor_customColors', JSON.stringify(customColors));
}

// Fonctions Supabase pour la sauvegarde en ligne
let currentProjectId = null; // ID du projet actuel pour les mises à jour

async function loadSupabaseProjects() {
    try {
        await ensureAuthenticatedUser();

        const result = await window.dbService.getAllProjects();
        if (!result.success || !Array.isArray(result.data)) {
            throw new Error(result.error || 'Réponse Supabase invalide');
        }
        autoSaveProjects = result.data;
        console.log(`📱 ${autoSaveProjects.length} projets chargés depuis Supabase`);
    } catch (error) {
        console.error('Erreur chargement projets:', error);
        loadAutoSaveProjects();
    }
}

// Auto-save function removed - now using manual save only

// Fallback localStorage (au cas où Supabase ne fonctionne pas)
function loadAutoSaveProjects() {
    const saved = localStorage.getItem('pixelEditor_autoSaveProjects');
    if (saved) {
        autoSaveProjects = JSON.parse(saved);
    }
}

function autoSaveProjectLocal(name) {
    const projectName = name || `Local ${new Date().toLocaleDateString('fr-FR')} ${new Date().toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}`;
    
    const projectData = {
        id: Date.now().toString(),
        name: projectName,
        frames: frames,
        currentFrame: currentFrame,
        customColors: customColors,
        customPalette: customPalette,
        fps: animationFPS || 24,
        signature: 'pixel-art-editor-v2',
        dateCreated: new Date().toISOString(),
        lastModified: new Date().toISOString()
    };
    
    autoSaveProjects.unshift(projectData);
    
    if (autoSaveProjects.length > maxAutoSaveProjects) {
        autoSaveProjects = autoSaveProjects.slice(0, maxAutoSaveProjects);
    }
    
    localStorage.setItem('pixelEditor_autoSaveProjects', JSON.stringify(autoSaveProjects));
    console.log(`Projet sauvé localement : ${projectName}`);
}

async function showLocalProjects() {
    console.log('🔍 showLocalProjects appelée - Loading from Supabase');

    // Load projects from Supabase (cloud storage)
    try {
        const result = await window.dbService.getAllProjects();

        if (!result.success) {
            alert('❌ Erreur lors du chargement: ' + result.error);
            return;
        }

        const projects = result.data;
        console.log('📱 Projets trouvés:', projects.length);

        if (projects.length === 0) {
            alert('📱 Aucun projet trouvé.\n\nCommencez à dessiner et sauvegardez votre premier projet ! 🎨');
            return;
        }

        // Use the loaded projects instead of localStorage
        autoSaveProjects = projects;
    } catch (error) {
        console.error('Error loading projects:', error);
        alert('❌ Erreur lors du chargement des projets.');
        return;
    }
    
    // Créer une liste interactive pour mobile (compatible Supabase et localStorage)
    const projectsList = autoSaveProjects.map((p, index) => {
        const projectId = p.id || p.project_id || index;
        const projectName = p.name || 'Projet sans nom';
        const lastModified = p.lastModified || p.updated_at || p.created_at;
        const deviceInfo = p.device_info ? ` 📱 ${p.device_info.includes('iPhone') ? 'iPhone' : p.device_info.includes('Android') ? 'Android' : 'Web'}` : '';
        
        return `<div class="project-item" data-project-id="${projectId}" data-index="${index}">
            <div class="project-name">${projectName}${deviceInfo}</div>
            <div class="project-date">${new Date(lastModified).toLocaleDateString('fr-FR')} à ${new Date(lastModified).toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}</div>
        </div>`;
    }).join('');

    const dialog = createMobileDialog('🌐 Mes projets', `
        <div style="margin-bottom: 12px; padding: 8px; background: rgba(255, 255, 255, 0.1); border-radius: 8px;">
            <p style="margin: 0; font-size: 0.9rem; color: rgba(255, 255, 255, 0.8);">
                👆 <strong>Cliquez sur un projet</strong> pour le sélectionner, puis utilisez les boutons ci-dessous.
            </p>
        </div>
        <div class="projects-list">
            ${projectsList}
        </div>
        <div style="margin-top: 16px; display: flex; gap: 8px;">
            <button id="loadLocalProject" class="dialog-button" disabled>📂 Charger</button>
            <button id="deleteLocalProject" class="dialog-button secondary" disabled>🗑️ Supprimer</button>
            <button id="cancelLocalLoad" class="dialog-button secondary">❌ Fermer</button>
        </div>
    `);

    let selectedProject = null;
    const loadBtn = dialog.querySelector('#loadLocalProject');
    const deleteBtn = dialog.querySelector('#deleteLocalProject');

    // Gérer la sélection
    dialog.querySelectorAll('.project-item').forEach(item => {
        item.addEventListener('click', () => {
            // Désélectionner les autres
            dialog.querySelectorAll('.project-item').forEach(p => p.classList.remove('selected'));
            
            // Sélectionner celui-ci
            item.classList.add('selected');
            selectedProject = {
                id: item.dataset.projectId,
                index: parseInt(item.dataset.index)
            };
            
            loadBtn.disabled = false;
            deleteBtn.disabled = false;
        });
    });

    // Charger le projet sélectionné
    loadBtn.addEventListener('click', async () => {
        if (!selectedProject) {
            return;
        }

        const projectMeta = autoSaveProjects[selectedProject.index];
        try {
            const result = await window.dbService.loadProject(projectMeta.name);

            if (!result.success) {
                alert('❌ Erreur lors du chargement du projet: ' + (result.error || 'inconnue'));
                return;
            }

            const data = result.data;
            console.log('📥 Projet Supabase chargé depuis dialog', {
                name: data.name,
                current: data.current_frame,
                hasFrames: !!data.frames,
                type: typeof data.frames
            });

            frames = normaliseFrames(data.frames);
            currentFrame = data.current_frame ?? data.currentFrame ?? 0;
            if (currentFrame >= frames.length) {
                currentFrame = Math.max(0, frames.length - 1);
            }

            const colors = data.custom_colors || data.customColors;
            customColors = [];
            if (colors) {
                const projectColors = typeof colors === 'string' ? JSON.parse(colors) : colors;
                if (Array.isArray(projectColors)) {
                    projectColors.forEach(color => addCustomColor(color));
                }
            }

            if (data.custom_palette || data.customPalette) {
                const paletteSource = data.custom_palette || data.customPalette;
                const paletteArray = typeof paletteSource === 'string' ? JSON.parse(paletteSource) : paletteSource;
                if (Array.isArray(paletteArray)) {
                    customPalette = paletteArray;
                    updateCompactPalette();
                }
            }

            if (data.fps) {
                setAnimationFPSValue(data.fps);
            }
            
            const title = document.getElementById('projectTitle');
            if (title) {
                title.textContent = data.name || data.projectTitle || projectMeta.name;
            }
            
            updateFramesList();
            loadFrame(currentFrame);
            logUsageEvent('project_loaded', {
                name: data.name || projectMeta.name,
                frames: frames.length,
                fps: animationFPS
            });

            dialog.remove();
            alert(`✅ Projet "${data.name || projectMeta.name}" chargé avec succès !`);
        } catch (error) {
            console.error('Erreur chargement projet Supabase:', error);
            alert('❌ Erreur inattendue lors du chargement du projet. Consultez la console pour plus de détails.');
        }
    });

    // Supprimer le projet sélectionné
    deleteBtn.addEventListener('click', async () => {
        if (selectedProject && confirm('Supprimer ce projet définitivement ?')) {
            const project = autoSaveProjects[selectedProject.index];

            try {
                // Delete from Supabase using the database service
                const result = await window.dbService.deleteProjectById(project.id);

                if (result.success) {
                    console.log('✅ Projet supprimé de Supabase');
                    alert('✅ Projet supprimé avec succès !');
                    dialog.remove();
                    showLocalProjects(); // Refresh the list
                } else {
                    alert('❌ Erreur lors de la suppression: ' + result.error);
                }

            } catch (error) {
                console.error('Erreur suppression:', error);
                alert('❌ Erreur lors de la suppression. Veuillez réessayer.');
            }
        }
    });

    dialog.querySelector('#cancelLocalLoad').addEventListener('click', () => {
        dialog.remove();
    });
}

function isPredefinedColor(color) {
    const hexColor = color.startsWith('#') ? color : rgbToHex(color);
    const defaultColors = ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
    return defaultColors.includes(hexColor.toUpperCase());
}

function addCustomColor(color) {
    // Convertir en hex si nécessaire
    const hexColor = color.startsWith('#') ? color : rgbToHex(color);
    
    // Ne pas ajouter si c'est une couleur de base
    if (isPredefinedColor(hexColor)) {
        return;
    }
    
    // Ne pas ajouter si la couleur existe déjà dans les personnalisées
    if (customColors.includes(hexColor)) {
        return;
    }
    
    // Ajouter la nouvelle couleur au début
    customColors.unshift(hexColor);
    
    // Limiter le nombre de couleurs personnalisées (6 pour ne pas surcharger)
    const maxPersonalizedColors = 6;
    if (customColors.length > maxPersonalizedColors) {
        customColors = customColors.slice(0, maxPersonalizedColors);
    }
    
    // Sauvegarder et mettre à jour l'affichage
    saveCustomColors();
    updateColorPalette();
}

function updateColorPalette() {
    const presetColors = document.querySelector('.preset-colors');
    if (!presetColors) return;

    presetColors.innerHTML = '';

    // TOUJOURS afficher les couleurs de base d'abord
    const defaultColors = ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

    defaultColors.forEach(color => {
        const btn = document.createElement('button');
        btn.className = 'color-btn default-color';
        btn.style.backgroundColor = color;
        btn.title = 'Couleur de base';
        btn.addEventListener('click', () => {
            currentColor = color;
            updateCurrentColorDisplay();
            setEraserState(false);
        });
        presetColors.appendChild(btn);
    });

    // Ajouter les couleurs personnalisées en plus (limitées à 6 pour ne pas surcharger)
    const maxPersonalizedColors = 6;
    customColors.slice(0, maxPersonalizedColors).forEach(color => {
        const normalizedColor = normalizeColor(color);

        // Ne pas ajouter si c'est déjà une couleur de base
        if (!defaultColors.includes(normalizedColor)) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'color-btn custom-color';
            btn.dataset.color = normalizedColor;
            btn.style.backgroundColor = normalizedColor;
            btn.title = `Couleur personnalisée : ${normalizedColor}`;
            btn.addEventListener('click', () => {
                currentColor = normalizedColor;
                updateCurrentColorDisplay();
                setEraserState(false);
            });

            const badge = document.createElement('span');
            badge.className = 'color-badge';
            badge.textContent = '★';
            badge.setAttribute('role', 'button');
            badge.setAttribute('tabindex', '0');
            badge.setAttribute('aria-label', 'Supprimer cette couleur personnalisée');
            badge.setAttribute('title', 'Supprimer cette couleur personnalisée');
            btn.appendChild(badge);

            const removeDelay = CUSTOM_COLOR_REMOVE_DELAY;

            const clearRemoveTimer = () => {
                if (btn._removeTimer) {
                    clearTimeout(btn._removeTimer);
                    btn._removeTimer = null;
                }
            };

            const showRemoveState = () => {
                btn.classList.add('show-remove');
                clearRemoveTimer();
                btn._removeTimer = setTimeout(() => {
                    btn.classList.remove('show-remove');
                }, removeDelay);
            };

            badge.addEventListener('click', (e) => {
                e.stopPropagation();
                customColors = customColors.filter(c => normalizeColor(c) !== normalizedColor);
                saveCustomColors();
                updateColorPalette();
            });

            badge.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    customColors = customColors.filter(c => normalizeColor(c) !== normalizedColor);
                    saveCustomColors();
                    updateColorPalette();
                }
            });

            btn.addEventListener('mouseenter', showRemoveState);
            btn.addEventListener('mouseleave', clearRemoveTimer);
            btn.addEventListener('focus', showRemoveState);
            btn.addEventListener('blur', clearRemoveTimer);

            presetColors.appendChild(btn);
        }
    });

    applyPaletteScrollState(presetColors);
}

function applyPaletteScrollState(presetColors) {
    const colorPalette = document.querySelector('.color-palette');
    if (!colorPalette) return;

    const totalButtons = presetColors.children.length;
    const columns = 4;
    const rows = Math.ceil(totalButtons / columns);
    const hasScroll = rows > 2;

    let hint = colorPalette.querySelector('.palette-scroll-hint');
    if (hasScroll) {
        if (!hint) {
            hint = document.createElement('p');
            hint.className = 'palette-scroll-hint';
            hint.textContent = 'Glissez pour voir les autres couleurs →';
            colorPalette.appendChild(hint);
        }
    } else if (hint) {
        hint.remove();
    }
}

function removeCustomColor(color) {
    const normalized = normalizeColor(color);
    const initialLength = customColors.length;

    customColors = customColors.filter(existing => normalizeColor(existing) !== normalized);

    if (customColors.length !== initialLength) {
        saveCustomColors();
        updateColorPalette();
        console.log('🗑️ Couleur personnalisée supprimée:', normalized);
    }
}

function showConfirmDialog({ 
    title = 'Confirmation', 
    message = '', 
    confirmText = 'Oui', 
    cancelText = 'Annuler',
    danger = false 
} = {}) {
    return new Promise(resolve => {
        const overlay = document.createElement('div');
        overlay.className = 'confirm-dialog-overlay';

        const dialogId = `confirm-dialog-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        overlay.innerHTML = `
            <div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="${dialogId}-title" tabindex="-1">
                <h3 id="${dialogId}-title">${title}</h3>
                <p>${message}</p>
                <div class="confirm-dialog-actions">
                    <button class="dialog-button ${danger ? 'danger' : ''} confirm-btn">${confirmText}</button>
                    <button class="dialog-button secondary cancel-btn">${cancelText}</button>
                </div>
            </div>
        `;

        const confirmBtn = overlay.querySelector('.confirm-btn');
        const cancelBtn = overlay.querySelector('.cancel-btn');
        const dialog = overlay.querySelector('.confirm-dialog');

        const cleanup = (result) => {
            overlay.removeEventListener('click', handleBackdropClick);
            overlay.removeEventListener('keydown', handleKeydown, true);
            overlay.remove();
            resolve(result);
        };

        const handleBackdropClick = (event) => {
            if (event.target === overlay) {
                cleanup(false);
            }
        };

        const handleKeydown = (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                cleanup(false);
            }
        };

        overlay.addEventListener('click', handleBackdropClick);
        overlay.addEventListener('keydown', handleKeydown, true);

        confirmBtn.addEventListener('click', () => cleanup(true));
        cancelBtn.addEventListener('click', () => cleanup(false));

        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
            dialog.focus();
            confirmBtn.focus();
        });
    });
}

// Fonction améliorée pour gérer la gomme avec les couleurs personnalisées
function updateValidateButton(color) {
    const validateBtn = document.getElementById('validateColorBtn');
    if (!validateBtn) return;

    if (color && !isPredefinedColor(color)) {
        validateBtn.disabled = false;
        validateBtn.title = `Valider la couleur ${color}`;
    } else if (color) {
        validateBtn.disabled = true;
        validateBtn.title = 'Couleur déjà dans la palette';
    } else {
        validateBtn.disabled = true;
        validateBtn.title = 'Choisissez une couleur puis validez';
    }
}

function setPendingColor(color, { updateValidate = true, retainPointer = false } = {}) {
    if (!color) {
        pendingColor = null;
        if (updateValidate) {
            updateValidateButton(null);
        }
        if (!retainPointer) {
            customColorModalState.pointerUV = null;
        }
        if (isCustomColorModalOpen()) {
            updateCustomColorModal(currentColor);
        }
        return;
    }

    const normalized = normalizeColor(color);
    pendingColor = normalized;
    currentColor = normalized;
    setEraserState(false);
        updateCurrentColorDisplay();
    if (updateValidate) {
        updateValidateButton(normalized);
    }
    if (!retainPointer) {
        customColorModalState.pointerUV = null;
    }
    if (isCustomColorModalOpen()) {
        updateCustomColorModal(normalized);
    }
}

function hexToRgbObject(hex) {
    if (!hex) return null;
    const normalized = normalizeColor(hex);
    if (!/^#[0-9A-F]{6}$/i.test(normalized)) return null;
    return {
        r: parseInt(normalized.slice(1, 3), 16),
        g: parseInt(normalized.slice(3, 5), 16),
        b: parseInt(normalized.slice(5, 7), 16)
    };
}

function rgbComponentsToHex(r, g, b) {
    const clamp = (value) => Math.min(255, Math.max(0, Number(value) || 0));
    const components = [clamp(r), clamp(g), clamp(b)];
    return `#${components.map(component => component.toString(16).padStart(2, '0')).join('')}`.toUpperCase();
}

function rgbToHslFromRgbObject(rgb) {
    if (!rgb) return null;
    let r = rgb.r / 255;
    let g = rgb.g / 255;
    let b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

function hslToHex(h, s, l) {
    const hue = ((Number(h) % 360) + 360) % 360;
    const sat = Math.min(100, Math.max(0, Number(s)))/100;
    const lig = Math.min(100, Math.max(0, Number(l)))/100;

    if (sat === 0) {
        const grey = Math.round(lig * 255);
        return rgbComponentsToHex(grey, grey, grey);
    }

    const q = lig < 0.5 ? lig * (1 + sat) : lig + sat - lig * sat;
    const p = 2 * lig - q;
    const hk = hue / 360;

    const t = [hk + 1/3, hk, hk - 1/3].map(value => {
        if (value < 0) value += 1;
        if (value > 1) value -= 1;
        if (value < 1/6) return p + (q - p) * 6 * value;
        if (value < 1/2) return q;
        if (value < 2/3) return p + (q - p) * (2/3 - value) * 6;
        return p;
    });

    return rgbComponentsToHex(Math.round(t[0] * 255), Math.round(t[1] * 255), Math.round(t[2] * 255));
}

function clampValue(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

function isCustomColorModalOpen() {
    return !!customColorModalElements && customColorModalElements.overlay.style.display !== 'none';
}

function updateCustomColorModal(color) {
    if (!customColorModalElements || !customColorModalElements.preview) return;
    const targetHex = normalizeColor(color || pendingColor || currentColor);
    const rgb = hexToRgbObject(targetHex);
    const hsl = rgbToHslFromRgbObject(rgb);
    if (!rgb || !hsl) return;

    customColorModalState.currentHex = targetHex;
    customColorModalState.h = hsl.h;
    customColorModalState.s = hsl.s;
    customColorModalState.l = hsl.l;

    customColorModalElements.preview.style.backgroundColor = targetHex;
    if (customColorModalElements.hexValue) {
        customColorModalElements.hexValue.textContent = targetHex;
    }

    if (customColorModalElements.swatches?.length) {
        customColorModalElements.swatches.forEach(btn => {
            const swatchColor = btn.dataset.color ? normalizeColor(btn.dataset.color) : null;
            if (swatchColor && swatchColor === targetHex) {
                btn.classList.add('selected');
        } else {
                btn.classList.remove('selected');
            }
        });
    }

    drawCustomColorSpectrum();

    if (customColorModalElements.applyBtn) {
        customColorModalElements.applyBtn.disabled = false;
    }
}

function drawCustomColorSpectrum() {
    if (!customColorModalElements?.canvas || !customColorModalElements?.ctx) return;

    const { canvas, ctx } = customColorModalElements;
    const displayWidth = Math.max(canvas.clientWidth, 1);
    const displayHeight = Math.max(canvas.clientHeight, 1);
    const pixelRatio = window.devicePixelRatio || 1;
    const renderWidth = Math.max(Math.round(displayWidth * pixelRatio), 1);
    const renderHeight = Math.max(Math.round(displayHeight * pixelRatio), 1);

    if (canvas.width !== renderWidth || canvas.height !== renderHeight) {
        canvas.width = renderWidth;
        canvas.height = renderHeight;
    }

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    const gradientHue = ctx.createLinearGradient(0, 0, displayWidth, 0);
    gradientHue.addColorStop(0, '#FF0000');
    gradientHue.addColorStop(1 / 6, '#FFFF00');
    gradientHue.addColorStop(2 / 6, '#00FF00');
    gradientHue.addColorStop(3 / 6, '#00FFFF');
    gradientHue.addColorStop(4 / 6, '#0000FF');
    gradientHue.addColorStop(5 / 6, '#FF00FF');
    gradientHue.addColorStop(1, '#FF0000');
    ctx.fillStyle = gradientHue;
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    const gradientWhite = ctx.createLinearGradient(0, 0, 0, displayHeight);
    gradientWhite.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradientWhite.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradientWhite;
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    const gradientBlack = ctx.createLinearGradient(0, 0, 0, displayHeight);
    gradientBlack.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradientBlack.addColorStop(1, 'rgba(0, 0, 0, 1)');
    ctx.fillStyle = gradientBlack;
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    let pointerX;
    let pointerY;

    if (customColorModalState.pointerUV) {
        pointerX = customColorModalState.pointerUV.u * displayWidth;
        pointerY = customColorModalState.pointerUV.v * displayHeight;
    } else {
        pointerX = clampValue((customColorModalState.h / 360) * displayWidth, 0, displayWidth - 1);
        pointerY = clampValue((1 - (customColorModalState.l / 100)) * displayHeight, 0, displayHeight - 1);
        customColorModalState.pointerUV = {
            u: clampValue(pointerX / displayWidth, 0, 1),
            v: clampValue(pointerY / displayHeight, 0, 1)
        };
    }

    customColorModalElements.pointer = { x: pointerX, y: pointerY };

    ctx.save();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.beginPath();
    ctx.arc(pointerX, pointerY, 8, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.beginPath();
    ctx.arc(pointerX, pointerY, 9, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
}

function openCustomColorModal(initialColor) {
    if (!customColorModalElements) {
        initCustomColorModal();
    }
    if (!customColorModalElements) return;

    customColorModalElements.overlay.style.display = 'flex';
    drawCustomColorSpectrum();
    updateCustomColorModal(initialColor);

    if (customColorModalState.escapeHandler) {
        document.removeEventListener('keydown', customColorModalState.escapeHandler);
    }
    customColorModalState.escapeHandler = (event) => {
        if (event.key === 'Escape') {
            closeCustomColorModal();
        }
    };
    document.addEventListener('keydown', customColorModalState.escapeHandler);

}

function closeCustomColorModal() {
    if (!customColorModalElements) return;
    customColorModalElements.overlay.style.display = 'none';
    customColorModalElements.isDragging = false;
    if (customColorModalState.escapeHandler) {
        document.removeEventListener('keydown', customColorModalState.escapeHandler);
        customColorModalState.escapeHandler = null;
    }
}

function initCustomColorModal() {
    const overlay = document.getElementById('customColorModal');
    if (!overlay) return;

    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');

    customColorModalElements = {
        overlay,
        preview: overlay.querySelector('#customColorPreview'),
        hexValue: overlay.querySelector('#customColorHexValue'),
        canvas: overlay.querySelector('#customColorCanvas'),
        ctx: null,
        pointer: { x: 0, y: 0 },
        bounds: { width: 320, height: 200 },
        isDragging: false,
        swatches: Array.from(overlay.querySelectorAll('.custom-color-swatch')),
        closeBtn: overlay.querySelector('#closeCustomColorModal'),
        cancelBtn: overlay.querySelector('#cancelCustomColor'),
        applyBtn: overlay.querySelector('#applyCustomColor'),
        systemBtn: overlay.querySelector('#customColorSystem')
    };

    if (customColorModalElements.canvas) {
        const canvas = customColorModalElements.canvas;
        const ctx = canvas.getContext('2d');
        customColorModalElements.ctx = ctx;
        customColorModalElements.pointer = {
            x: canvas.width / 2,
            y: canvas.height / 2
        };

        const handleSpectrumInteraction = (event) => {
            event.preventDefault?.();
            const { canvas, ctx } = customColorModalElements;
            if (!canvas || !ctx) return;
            const rect = canvas.getBoundingClientRect();
            const input = event.touches ? event.touches[0] : event;
            const clientX = input?.clientX ?? 0;
            const clientY = input?.clientY ?? 0;
            const scaleX = canvas.width / Math.max(rect.width, 1);
            const scaleY = canvas.height / Math.max(rect.height, 1);
            const x = clampValue((clientX - rect.left) * scaleX, 0, canvas.width - 1);
            const y = clampValue((clientY - rect.top) * scaleY, 0, canvas.height - 1);

            const maxWidth = Math.max(canvas.width - 1, 1);
            const maxHeight = Math.max(canvas.height - 1, 1);
            customColorModalState.pointerUV = {
                u: clampValue(x / maxWidth, 0, 1),
                v: clampValue(y / maxHeight, 0, 1)
            };

            const pixel = ctx.getImageData(Math.round(x), Math.round(y), 1, 1).data;
            const hex = rgbComponentsToHex(pixel[0], pixel[1], pixel[2]);
            setPendingColor(hex, { retainPointer: true });
        };

        const startSpectrumDrag = (event) => {
            customColorModalElements.isDragging = true;
            handleSpectrumInteraction(event);
        };

        const moveSpectrumDrag = (event) => {
            if (!customColorModalElements.isDragging) return;
            handleSpectrumInteraction(event);
        };

        const stopSpectrumDrag = () => {
            customColorModalElements.isDragging = false;
        };

        canvas.addEventListener('mousedown', startSpectrumDrag);
        canvas.addEventListener('touchstart', startSpectrumDrag, { passive: false });
        window.addEventListener('mousemove', moveSpectrumDrag);
        window.addEventListener('touchmove', moveSpectrumDrag, { passive: false });
        window.addEventListener('mouseup', stopSpectrumDrag);
        window.addEventListener('touchend', stopSpectrumDrag);
        window.addEventListener('touchcancel', stopSpectrumDrag);

        drawCustomColorSpectrum();
    }

    if (customColorModalElements.swatches.length) {
        customColorModalElements.swatches.forEach(btn => {
            btn.addEventListener('click', () => {
                const color = btn.dataset.color;
                if (color) {
                    customColorModalState.pointerUV = null;
                    setPendingColor(color);
                }
            });
        });
    }

    if (!customColorModalElements.resizeHandler) {
        customColorModalElements.resizeHandler = () => {
            if (isCustomColorModalOpen()) {
                drawCustomColorSpectrum();
            }
        };
        window.addEventListener('resize', customColorModalElements.resizeHandler);
    }

    customColorModalElements.closeBtn?.addEventListener('click', closeCustomColorModal);
    customColorModalElements.cancelBtn?.addEventListener('click', closeCustomColorModal);

    customColorModalElements.applyBtn?.addEventListener('click', () => {
        const hex = customColorModalState.currentHex;
        if (hex) {
            setPendingColor(hex);
            closeCustomColorModal();
        }
    });

    customColorModalElements.systemBtn?.addEventListener('click', () => {
        closeCustomColorModal();
        openNativeColorPicker();
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeCustomColorModal();
        }
    });

    overlay.style.display = 'none';
    updateCustomColorModal(currentColor);
}

function initColorPicker() {
    const colorPickers = getColorPickers();
    const validateBtn = document.getElementById('validateColorBtn');
    const desktopColorDisplay = document.getElementById('desktopCurrentColorDisplay');
    const compactColorDisplay = document.getElementById('currentColorDisplay');

    if (!customColorModalElements) {
        initCustomColorModal();
    }

    colorPickers.forEach(picker => {
        picker.addEventListener('input', (e) => {
            setPendingColor(e.target.value);
            if (isCustomColorModalOpen()) {
                updateCustomColorModal(e.target.value);
            }
        });
    });

    if (validateBtn) {
        validateBtn.addEventListener('click', () => {
            if (pendingColor && !isPredefinedColor(pendingColor)) {
                addCustomColor(pendingColor);
                setPendingColor(null, { updateValidate: false });
                validateBtn.disabled = true;
                validateBtn.title = 'Couleur ajoutée à la palette !';
                setTimeout(() => {
                    validateBtn.title = 'Valider une nouvelle couleur';
                    updateValidateButton(null);
                }, 1500);
            }
        });
        
        updateValidateButton(null);
    }

    if (desktopColorDisplay) {
        desktopColorDisplay.setAttribute('tabindex', '0');
        const openCustom = (e) => {
            e?.preventDefault?.();
            openCustomColorModal();
        };
        desktopColorDisplay.addEventListener('click', openCustom);
        desktopColorDisplay.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openCustomColorModal();
            }
        });
    }

    if (compactColorDisplay) {
        const openCustomFromCompact = (e) => {
            e?.preventDefault?.();
            openCustomColorModal();
        };

        compactColorDisplay.addEventListener('click', openCustomFromCompact);
    }

    initCompactColorButtons();
}

// Fonction pour initialiser les boutons de couleur compacts
function initCompactColorButtons() {
    const compactColorBtns = document.querySelectorAll('.compact-color-btn');
    
    compactColorBtns.forEach((btn, index) => {
        let longPressTimer = null;
        let isLongPress = false;
        
        // Clic normal - sélectionner la couleur
        btn.addEventListener('click', (e) => {
            if (!isLongPress) {
                // Récupérer la couleur depuis le style background-color
                const color = btn.style.backgroundColor;
                const hexColor = rgbToHex(color);
                
                // Mettre à jour la couleur actuelle
                currentColor = hexColor;
                
                // Mettre à jour l'indicateur de couleur actuelle
                updateCurrentColorDisplay();
                
                // Désactiver la gomme
                setEraserState(false);
                
                // Mettre à jour l'affichage visuel des boutons
                updateCompactColorSelection(btn);
            }
        });
        
        // Détection de l'appui long
        btn.addEventListener('mousedown', (e) => {
            isLongPress = false;
            longPressTimer = setTimeout(() => {
                isLongPress = true;
                openColorCustomizer(index, btn);
            }, 500); // 500ms pour déclencher l'appui long
        });
        
        btn.addEventListener('mouseup', () => {
            if (longPressTimer) {
                clearTimeout(longPressTimer);
            }
        });
        
        btn.addEventListener('mouseleave', () => {
            if (longPressTimer) {
                clearTimeout(longPressTimer);
            }
        });
        
        // Support tactile
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            isLongPress = false;
            longPressTimer = setTimeout(() => {
                isLongPress = true;
                openColorCustomizer(index, btn);
            }, 500);
        });
        
        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (longPressTimer) {
                clearTimeout(longPressTimer);
            }
        });
    });
}

// Fonction pour mettre à jour la sélection visuelle des couleurs compactes
function updateCompactColorSelection(selectedBtn) {
    const compactColorBtns = document.querySelectorAll('.compact-color-btn');
    
    compactColorBtns.forEach(btn => {
        btn.classList.remove('selected');
    });
    
    selectedBtn.classList.add('selected');
}

// Fonction pour mettre à jour l'indicateur de couleur actuelle
function updateCurrentColorDisplay() {
    const compactDisplay = document.getElementById('currentColorDisplay');
    const desktopDisplay = document.getElementById('desktopCurrentColorDisplay');
    
    if (compactDisplay) {
        compactDisplay.style.backgroundColor = currentColor;
    }
    
    if (desktopDisplay) {
        desktopDisplay.style.backgroundColor = currentColor;
    }

    syncColorPickers(currentColor);
    
    // Mettre à jour la sélection visuelle des couleurs compactes
    updateCompactColorSelectionByColor(currentColor);
}

// Fonction pour mettre à jour la sélection visuelle des couleurs compactes par couleur
function updateCompactColorSelectionByColor(color) {
    console.log('🔍 Mise à jour sélection par couleur:', color);
    
    // Retirer la classe 'selected' de tous les boutons
    document.querySelectorAll('.compact-color-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Trouver et sélectionner le bouton avec la couleur correspondante
    document.querySelectorAll('.compact-color-btn').forEach(btn => {
        const btnColor = btn.style.backgroundColor;
        console.log('🎨 Comparaison:', btnColor, '===', color);
        
        // Normaliser les couleurs pour la comparaison
        const normalizedBtnColor = normalizeColor(btnColor);
        const normalizedColor = normalizeColor(color);
        
        if (normalizedBtnColor === normalizedColor) {
            btn.classList.add('selected');
            console.log('✅ Couleur sélectionnée:', btnColor);
        }
    });
}

// Fonction pour normaliser les couleurs (RGB vers HEX)
function normalizeColor(color) {
    if (!color) return '';
    
    // Si c'est déjà en format hex, le retourner
    if (color.startsWith('#')) {
        return color.toUpperCase();
    }
    
    // Si c'est en format RGB, le convertir en hex
    if (color.startsWith('rgb')) {
        const rgb = color.match(/\d+/g);
        if (rgb && rgb.length === 3) {
            const hex = '#' + rgb.map(x => {
                const hex = parseInt(x).toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            }).join('').toUpperCase();
            return hex;
        }
    }
    
    return color.toUpperCase();
}

// Fonction pour obtenir la description du FPS
function getFPSDescription(fps) {
    if (fps <= 12) return '(Animation)';
    if (fps <= 24) return '(Cinéma)';
    if (fps <= 30) return '(Vidéo)';
    if (fps <= 45) return '(Jeu)';
    return '(Fluide)';
}

function updatePresetButtonsState(buttons, fps) {
    if (!buttons) return;
    buttons.forEach(btn => {
        const btnFps = parseInt(btn.getAttribute('data-fps'), 10);
        if (btnFps === fps) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function updateFPSModalUI(fps) {
    const fpsSlider = document.getElementById('fpsSlider');
    if (fpsSlider && parseInt(fpsSlider.value, 10) !== fps) {
        fpsSlider.value = fps;
    }
    
    const fpsValue = document.getElementById('fpsValue');
    if (fpsValue) {
        fpsValue.textContent = fps;
    }
    
    const fpsDesc = document.getElementById('fpsDesc');
    if (fpsDesc) {
        fpsDesc.textContent = getFPSDescription(fps);
    }
    
    updatePresetButtonsState(
        document.querySelectorAll('.fps-preset-btn'),
        fps
    );
}

function updateFPSSidebarUI(fps) {
    const slider = document.getElementById('fpsSidebarSlider');
    if (slider && parseInt(slider.value, 10) !== fps) {
        slider.value = fps;
    }
    
    const value = document.getElementById('fpsSidebarValue');
    if (value) {
        value.textContent = fps;
    }
    
    const desc = document.getElementById('fpsSidebarDesc');
    if (desc) {
        desc.textContent = getFPSDescription(fps);
    }
    
    updatePresetButtonsState(
        document.querySelectorAll('.fps-sidebar-preset'),
        fps
    );
}

function setAnimationFPSValue(fps) {
    const sanitized = Math.max(1, Math.min(60, parseInt(fps, 10) || 24));
    animationFPS = sanitized;
    updateFPSModalUI(sanitized);
    updateFPSSidebarUI(sanitized);
    console.log('🎬 FPS appliqué:', sanitized);
}

// Fonction pour initialiser le modal FPS
function initFPSModal() {
    const fpsButtons = [
        document.getElementById('fpsBtn')
    ].filter(Boolean);
    const fpsModal = document.getElementById('fpsModal');
    const closeFpsModal = document.getElementById('closeFpsModal');
    const fpsSlider = document.getElementById('fpsSlider');
    const fpsPresetBtns = document.querySelectorAll('.fps-preset-btn');
    
    if (fpsButtons.length === 0 || !fpsModal) return;
    
    // Ouvrir le modal
    const openFpsModal = () => {
        fpsModal.style.display = 'flex';
        updateFPSModalUI(animationFPS);
    };
    
    fpsButtons.forEach(btn => btn.addEventListener('click', openFpsModal));
    
    // Fermer le modal
    if (closeFpsModal) {
    closeFpsModal.addEventListener('click', () => {
        fpsModal.style.display = 'none';
    });
    }
    
    // Fermer en cliquant à l'extérieur
    fpsModal.addEventListener('click', (e) => {
        if (e.target === fpsModal) {
            fpsModal.style.display = 'none';
        }
    });
    
    // Slider FPS
    if (fpsSlider) {
    fpsSlider.addEventListener('input', (e) => {
            const fps = parseInt(e.target.value, 10);
            setAnimationFPSValue(fps);
        });
    }
    
    // Boutons préréglés
    fpsPresetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const fps = parseInt(btn.getAttribute('data-fps'), 10);
            setAnimationFPSValue(fps);
        });
    });
}

function initFPSSidebarPanel() {
    const toggleBtn = document.getElementById('fpsBtnSidebar');
    const panel = document.getElementById('fpsSidebarPanel');
    const slider = document.getElementById('fpsSidebarSlider');
    const presetButtons = document.querySelectorAll('.fps-sidebar-preset');
    
    if (!toggleBtn || !panel || !slider) return;
    
    toggleBtn.addEventListener('click', () => {
        panel.classList.toggle('open');
        if (panel.classList.contains('open')) {
            updateFPSSidebarUI(animationFPS);
        }
    });
    
    slider.addEventListener('input', (e) => {
        const fps = parseInt(e.target.value, 10);
        setAnimationFPSValue(fps);
    });
    
    presetButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const fps = parseInt(btn.getAttribute('data-fps'), 10);
            setAnimationFPSValue(fps);
        });
    });
    
    updateFPSSidebarUI(animationFPS);
}

// Fonction pour initialiser les event listeners des couleurs compactes
function initCompactColorButtons() {
    const compactColorButtons = document.querySelectorAll('.compact-color-btn');
    console.log('🔍 Boutons de couleur compacte trouvés:', compactColorButtons.length);
    
    compactColorButtons.forEach(btn => {
        // Supprimer les anciens event listeners
        btn.replaceWith(btn.cloneNode(true));
    });
    
    // Réattacher les event listeners
    document.querySelectorAll('.compact-color-btn').forEach(btn => {
        let longPressTimer = null;
        let isLongPress = false;
        
        // Clic normal - sélectionner la couleur
        btn.addEventListener('click', (e) => {
            console.log('🖱️ Clic sur couleur compacte détecté');
            if (!isLongPress) {
                // Récupérer la couleur depuis le style background-color
                const color = btn.style.backgroundColor;
                console.log('🎨 Couleur récupérée:', color);
                if (color) {
                    // Normaliser la couleur
                    const normalizedColor = normalizeColor(color);
                    console.log('🎨 Couleur normalisée:', normalizedColor);
                    
                    currentColor = normalizedColor;
                    updateCurrentColorDisplay();
                    setEraserState(false);
                    
                    // Mettre à jour la sélection visuelle
                    updateCompactColorSelection(btn);
                    
                    console.log('✅ Couleur compacte sélectionnée:', normalizedColor);
                }
            }
            isLongPress = false;
        });
        
        // Appui long - modifier la couleur
        btn.addEventListener('mousedown', (e) => {
            isLongPress = false;
            longPressTimer = setTimeout(() => {
                isLongPress = true;
                showColorEditDialog(btn);
            }, 500); // 500ms pour l'appui long
        });
        
        btn.addEventListener('mouseup', () => {
            if (longPressTimer) {
                clearTimeout(longPressTimer);
            }
        });
        
        btn.addEventListener('mouseleave', () => {
            if (longPressTimer) {
                clearTimeout(longPressTimer);
            }
        });
        
        // Support tactile pour mobile
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            isLongPress = false;
            longPressTimer = setTimeout(() => {
                isLongPress = true;
                showColorEditDialog(btn);
            }, 500);
        });
        
        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            
            // Si ce n'est pas un appui long, sélectionner la couleur
            if (!isLongPress && longPressTimer) {
                // Récupérer la couleur depuis le style background-color
                const color = btn.style.backgroundColor;
                console.log('📱 Touch: Couleur récupérée:', color);
                
                if (color) {
                    // Normaliser la couleur
                    const normalizedColor = normalizeColor(color);
                    console.log('📱 Touch: Couleur normalisée:', normalizedColor);
                    
                    currentColor = normalizedColor;
                    updateCurrentColorDisplay();
                    setEraserState(false);
                    
                    // Mettre à jour la sélection visuelle
                    updateCompactColorSelection(btn);
                    
                    console.log('✅ Touch: Couleur compacte sélectionnée:', normalizedColor);
                }
            }
            
            if (longPressTimer) {
                clearTimeout(longPressTimer);
            }
            
            isLongPress = false;
        });
    });
}

// Fonction pour mettre à jour la sélection visuelle des couleurs compactes
function updateCompactColorSelection(selectedBtn) {
    // Retirer la classe 'selected' de tous les boutons
    document.querySelectorAll('.compact-color-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Ajouter la classe 'selected' au bouton cliqué
    selectedBtn.classList.add('selected');
}

// Fonction pour afficher le dialogue de modification de couleur
function showColorEditDialog(colorBtn) {
    const currentColor = colorBtn.style.backgroundColor;
    
    // Créer le dialogue
    const dialog = document.createElement('div');
    dialog.className = 'color-edit-dialog';
    dialog.innerHTML = `
        <div class="color-edit-content">
            <h3>Modifier la couleur</h3>
            <div class="color-edit-preview">
                <div class="current-color-preview" style="background-color: ${currentColor}"></div>
                <span>Couleur actuelle</span>
            </div>
            <div class="color-edit-controls">
                <input type="color" id="colorEditPicker" value="${currentColor}" class="color-edit-picker">
                <div class="color-edit-actions">
                    <button id="colorEditCancel" class="color-edit-btn cancel">Annuler</button>
                    <button id="colorEditSave" class="color-edit-btn save">Enregistrer</button>
                </div>
            </div>
        </div>
    `;
    
    // Ajouter les styles
    const style = document.createElement('style');
    style.textContent = `
        .color-edit-dialog {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }
        
        .color-edit-content {
            background: white;
            border-radius: 12px;
            padding: 20px;
            max-width: 300px;
            width: 90%;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .color-edit-content h3 {
            margin: 0 0 15px 0;
            text-align: center;
            color: #333;
        }
        
        .color-edit-preview {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 20px;
            padding: 10px;
            background: #f5f5f5;
            border-radius: 8px;
        }
        
        .current-color-preview {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            border: 2px solid #ddd;
        }
        
        .color-edit-controls {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .color-edit-picker {
            width: 100%;
            height: 50px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
        }
        
        .color-edit-actions {
            display: flex;
            gap: 10px;
        }
        
        .color-edit-btn {
            flex: 1;
            padding: 12px;
            border: none;
            border-radius: 8px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .color-edit-btn.cancel {
            background: #f0f0f0;
            color: #666;
        }
        
        .color-edit-btn.cancel:hover {
            background: #e0e0e0;
        }
        
        .color-edit-btn.save {
            background: #007bff;
            color: white;
        }
        
        .color-edit-btn.save:hover {
            background: #0056b3;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(dialog);
    
    // Event listeners
    const colorPicker = dialog.querySelector('#colorEditPicker');
    const cancelBtn = dialog.querySelector('#colorEditCancel');
    const saveBtn = dialog.querySelector('#colorEditSave');
    const preview = dialog.querySelector('.current-color-preview');
    
    // Mettre à jour l'aperçu quand la couleur change
    colorPicker.addEventListener('input', (e) => {
        preview.style.backgroundColor = e.target.value;
    });
    
    // Annuler
    cancelBtn.addEventListener('click', () => {
        dialog.remove();
        style.remove();
    });
    
    // Enregistrer
    saveBtn.addEventListener('click', () => {
        const newColor = colorPicker.value;
        updateCompactColor(colorBtn, newColor);
        dialog.remove();
        style.remove();
    });
    
    // Fermer en cliquant à l'extérieur
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
            dialog.remove();
            style.remove();
        }
    });
}

// Fonction pour mettre à jour une couleur compacte
function updateCompactColor(colorBtn, newColor) {
    // Mettre à jour la couleur du bouton
    colorBtn.style.backgroundColor = newColor;
    
    // Si c'est la couleur actuellement sélectionnée, la mettre à jour
    if (colorBtn.classList.contains('selected')) {
        currentColor = newColor;
        updateCurrentColorDisplay();
    }
    
    // Sauvegarder la palette personnalisée
    saveCustomPalette();
    
    console.log('🎨 Couleur compacte mise à jour:', newColor);
}

// Fonction pour sauvegarder la palette personnalisée
function getDefaultCompactColors() {
    return ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
}

function applyCompactPaletteColors(colors) {
    const defaultColors = getDefaultCompactColors();
    const palette = Array.isArray(colors) && colors.length ? colors : defaultColors;
    const compactColorButtons = document.querySelectorAll('.compact-color-btn');

    compactColorButtons.forEach((btn, index) => {
        const fallbackColor = defaultColors[index] || defaultColors[defaultColors.length - 1];
        const color = palette[index] || fallbackColor;
        btn.style.backgroundColor = color;

        const normalizedColor = normalizeColor(color);
        const normalizedDefault = normalizeColor(fallbackColor);
        const isCustom = normalizedColor !== normalizedDefault;

        btn.classList.toggle('custom-color', isCustom);
        if (isCustom) {
            btn.setAttribute('data-custom', 'true');
        } else {
            btn.removeAttribute('data-custom');
        }
    });
}

function loadCustomPalette(palette) {
    if (!palette || !Array.isArray(palette)) return;
    applyCompactPaletteColors(palette);
    console.log('📂 Palette personnalisée chargée:', palette);
}

// Fonction pour charger la palette personnalisée

// ========================================
// PERSONNALISATION DE PALETTE
// ========================================

// Ouvrir le personnalisateur pour une couleur spécifique
function openColorCustomizer(colorIndex, colorBtn) {
    const currentColor = colorBtn.style.backgroundColor;
    const hexColor = rgbToHex(currentColor);
    
    // Créer une modal simple pour changer cette couleur
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Changer la couleur ${colorIndex + 1}</h3>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <div class="color-customizer">
                    <div class="current-color-preview" style="background-color: ${hexColor}"></div>
                    <input type="color" id="colorCustomizer" value="${hexColor}" class="color-picker-full">
                    <div class="color-actions">
                        <button id="resetColorBtn" class="reset-btn">🔄 Couleur par défaut</button>
                        <button id="saveColorBtn" class="save-btn">💾 Sauvegarder</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Event listeners
    modal.querySelector('.close-btn').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    const colorPicker = modal.querySelector('#colorCustomizer');
    const preview = modal.querySelector('.current-color-preview');
    
    colorPicker.addEventListener('input', (e) => {
        preview.style.backgroundColor = e.target.value;
    });
    
    modal.querySelector('#resetColorBtn').addEventListener('click', () => {
        const defaultColors = ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
        const defaultColor = defaultColors[colorIndex];
        colorPicker.value = defaultColor;
        preview.style.backgroundColor = defaultColor;
    });
    
    modal.querySelector('#saveColorBtn').addEventListener('click', () => {
        const newColor = colorPicker.value;
        colorBtn.style.backgroundColor = newColor;
        
        // Mettre à jour la palette personnalisée
        if (!customPalette) {
            customPalette = ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
        }
        customPalette[colorIndex] = newColor;
        
        showNotification('Couleur mise à jour !', 'success');
        modal.remove();
    });
}

// Ouvrir la modal de personnalisation
function openPaletteModal() {
    const modal = document.getElementById('paletteModal');
    if (modal) {
        modal.style.display = 'block';
        generatePaletteCustomizer();
    }
}

// Fermer la modal
function closePaletteModal() {
    const modal = document.getElementById('paletteModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Générer l'interface de personnalisation
function generatePaletteCustomizer() {
    const grid = document.getElementById('paletteColorsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    // Utiliser la palette personnalisée si elle existe, sinon les couleurs par défaut
    const colors = customPalette || ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
    const labels = ['Noir', 'Blanc', 'Rouge', 'Vert', 'Bleu', 'Jaune', 'Magenta', 'Cyan'];
    
    colors.forEach((color, index) => {
        const colorItem = document.createElement('div');
        colorItem.className = 'palette-color-item';
        
        colorItem.innerHTML = `
            <div class="palette-color-preview" style="background-color: ${color}" data-color-index="${index}">
                <input type="color" class="palette-color-input" value="${color}" data-color-index="${index}">
            </div>
            <div class="palette-color-label">${labels[index]}</div>
        `;
        
        grid.appendChild(colorItem);
    });
    
    // Ajouter les event listeners
    const colorInputs = grid.querySelectorAll('.palette-color-input');
    colorInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const index = parseInt(e.target.dataset.colorIndex);
            const newColor = e.target.value;
            const preview = e.target.previousElementSibling;
            preview.style.backgroundColor = newColor;
        });
    });
}

// Réinitialiser la palette aux couleurs par défaut
function resetPaletteToDefault() {
    customPalette = null;
    generatePaletteCustomizer();
    updateCompactPalette();
}

// Sauvegarder la palette personnalisée
function saveCustomPalette() {
    const colorInputs = document.querySelectorAll('.palette-color-input');
    let newPalette = [];
    const fromModal = colorInputs.length > 0;

    if (fromModal) {
        newPalette = Array.from(colorInputs).map(input => input.value);
    } else {
        const compactColorButtons = document.querySelectorAll('.compact-color-btn');
        newPalette = Array.from(compactColorButtons).map(btn => btn.style.backgroundColor);
    }
    
    customPalette = newPalette;
    updateCompactPalette();
    
    if (fromModal) {
        closePaletteModal();
    // Afficher un message de confirmation
    showNotification('Palette personnalisée sauvegardée !', 'success');
    } else {
        console.log('💾 Palette compacte sauvegardée:', customPalette);
    }
}

// Mettre à jour la palette compacte
function updateCompactPalette() {
    const colors = customPalette || getDefaultCompactColors();
    applyCompactPaletteColors(colors);
}

// Fonction pour afficher des notifications
function showNotification(message, type = 'info') {
    // Créer une notification temporaire
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(100, 255, 100, 0.9)' : 'rgba(100, 150, 255, 0.9)'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 1001;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// ========================================
// SYSTÈME UNDO/REDO
// ========================================

// Sauvegarder l'état actuel dans l'historique (méthode complète - pour l'initialisation)
function saveToHistory() {
    const pixels = document.querySelectorAll('.pixel');
    const currentState = Array.from(pixels).map(pixel => ({
        color: pixel.style.backgroundColor || '#FFFFFF',
        isEmpty: pixel.classList.contains('empty')
    }));
    
    // Supprimer les états futurs si on est au milieu de l'historique
    if (historyIndex < history.length - 1) {
        history = history.slice(0, historyIndex + 1);
    }
    
    // Ajouter le nouvel état
    history.push(currentState);
    historyIndex++;
    
    // Limiter la taille de l'historique
    if (history.length > maxHistorySize) {
        history = history.slice(-maxHistorySize);
        historyIndex = history.length - 1;
    }
    
    updateUndoRedoButtons();
}

// Sauvegarder une action complète (trait, forme, etc.)
function saveActionToHistory(startState, modifiedPixels) {
    console.log('💾 Sauvegarde de l\'action dans l\'historique', { 
        pixelsModifiés: modifiedPixels.size,
        historyIndex,
        historyLength: history.length
    });
    
    // Supprimer les états futurs si on est au milieu de l'historique
    if (historyIndex < history.length - 1) {
        history = history.slice(0, historyIndex + 1);
    }
    
    // Créer l'état final simple (tableau de pixels)
    const pixels = document.querySelectorAll('.pixel');
    const finalState = Array.from(pixels).map(pixel => ({
        color: pixel.style.backgroundColor || '#FFFFFF',
        isEmpty: pixel.classList.contains('empty')
    }));
    
    // Ajouter l'état final à l'historique
    history.push(finalState);
    historyIndex++;
    
    console.log('✅ Action sauvegardée', { 
        nouveauHistoryIndex: historyIndex,
        nouvelleHistoryLength: history.length
    });
    
    // Limiter la taille de l'historique
    if (history.length > maxHistorySize) {
        history = history.slice(-maxHistorySize);
        historyIndex = history.length - 1;
    }
    
    // Mettre à jour les boutons
    updateUndoRedoButtons();
}

// Restaurer un état depuis l'historique (pour undo et redo)
function restoreFromHistory(state, isRedo = false) {
    const pixels = document.querySelectorAll('.pixel');
    let restoredCount = 0;

    // Restaurer simplement l'état (tableau de pixels)
    state.forEach((pixelData, i) => {
        if (pixels[i]) {
            pixels[i].style.backgroundColor = pixelData.color;
            if (pixelData.isEmpty) {
                pixels[i].classList.add('empty');
            } else {
                pixels[i].classList.remove('empty');
            }
            restoredCount++;
        }
    });
    
    console.log(`%c${isRedo ? '✅ Action rétablie' : '↺ Action annulée'}`, 'color: #007bff;', { pixelsRestaurés: restoredCount });
    
    // Ne pas sauvegarder la frame lors des opérations undo/redo
    // saveCurrentFrame(); // Commenté pour éviter les sauvegardes automatiques
}

// Fonction supprimée - restoreFromHistoryForRedo n'est plus nécessaire

// Fonction Undo (annuler)
function undo() {
    console.log('↺ Fonction undo appelée', { historyIndex, historyLength: history.length });
    if (historyIndex > 0) {
        historyIndex--; // Aller à l'état précédent
        restoreFromHistory(history[historyIndex]); // Restaurer cet état
        updateUndoRedoButtons();
        console.log('✅ Undo effectué', { newHistoryIndex: historyIndex });
    } else {
        console.log('❌ Undo impossible - déjà au début (grille vierge)');
    }
}

// Fonction Redo (rétablir)
function redo() {
    console.log('🔄 Fonction redo appelée', { historyIndex, historyLength: history.length });
    if (historyIndex < history.length - 1) {
        historyIndex++; // Aller à l'état suivant
        restoreFromHistory(history[historyIndex], true); // Restaurer cet état (isRedo = true)
        updateUndoRedoButtons();
        console.log('✅ Redo effectué', { newHistoryIndex: historyIndex });
    } else {
        console.log('❌ Redo impossible - déjà à la fin');
    }
}

// Mettre à jour l'état des boutons undo/redo
function updateUndoRedoButtons() {
    // Boutons mobile
    const undoBtn = document.getElementById('undoBtn');
    const redoBtn = document.getElementById('redoBtn');
    
    // Boutons desktop
    const undoBtnDesktop = document.getElementById('undoBtnDesktop');
    const redoBtnDesktop = document.getElementById('redoBtnDesktop');
    
    // Mettre à jour les boutons mobile
    if (undoBtn) {
        undoBtn.disabled = historyIndex <= 0;
        undoBtn.title = historyIndex <= 0 ? 'Rien à annuler' : `Annuler (${historyIndex} actions disponibles)`;
    }
    
    if (redoBtn) {
        redoBtn.disabled = historyIndex >= history.length - 1;
        redoBtn.title = historyIndex >= history.length - 1 ? 'Rien à rétablir' : `Rétablir (${history.length - historyIndex - 1} actions disponibles)`;
    }
    
    // Mettre à jour les boutons desktop
    if (undoBtnDesktop) {
        undoBtnDesktop.disabled = historyIndex <= 0;
        undoBtnDesktop.title = historyIndex <= 0 ? 'Rien à annuler' : `Annuler (${historyIndex} actions disponibles)`;
    }
    
    if (redoBtnDesktop) {
        redoBtnDesktop.disabled = historyIndex >= history.length - 1;
        redoBtnDesktop.title = historyIndex >= history.length - 1 ? 'Rien à rétablir' : `Rétablir (${history.length - historyIndex - 1} actions disponibles)`;
    }
}

// Initialiser l'historique avec l'état vide
function initHistory() {
    console.log('🔄 Initialisation de l\'historique...');
    
    // Réinitialiser complètement l'historique
    history = [];
    historyIndex = -1; // Commencer à -1 pour que le premier état soit à l'index 0
    
    // S'assurer que la grille est vraiment vide AVANT de créer l'état initial
    const pixels = document.querySelectorAll('.pixel');
    console.log('📊 Nombre de pixels trouvés:', pixels.length);
    
    if (pixels.length === 0) {
        console.warn('⚠️ Aucun pixel trouvé, report de l\'initialisation de l\'historique');
        return;
    }
    
    // Forcer une grille complètement vide
    pixels.forEach((pixel, index) => {
        pixel.style.backgroundColor = '#FFFFFF';
        pixel.classList.add('empty');
        pixel.classList.remove('colored');
        if (index < 5) { // Log des 5 premiers pixels pour debug
            console.log(`Pixel ${index}:`, {
                backgroundColor: pixel.style.backgroundColor,
                isEmpty: pixel.classList.contains('empty')
            });
        }
    });
    
    // Créer un état initial vraiment vide (tous les pixels blancs)
    const initialState = Array.from(pixels).map(() => ({
        color: '#FFFFFF',
        isEmpty: true
    }));
    
    // Ajouter l'état initial à l'historique
    history.push(initialState);
    historyIndex = 0; // Maintenant on est à l'index 0
    
    console.log('✅ Historique initialisé avec grille vide', { 
        historyIndex, 
        historyLength: history.length,
        pixelsVides: initialState.filter(p => p.isEmpty).length,
        pixelsTotal: initialState.length
    });
    
    // Configurer les event listeners pour les boutons mobile
    const undoBtn = document.getElementById('undoBtn');
    const redoBtn = document.getElementById('redoBtn');
    
    if (undoBtn) {
        undoBtn.addEventListener('click', undo);
        console.log('✅ Event listener undo mobile attaché');
    } else {
        console.warn('❌ Bouton undo mobile non trouvé');
    }
    
    if (redoBtn) {
        redoBtn.addEventListener('click', redo);
        console.log('✅ Event listener redo mobile attaché');
    } else {
        console.warn('❌ Bouton redo mobile non trouvé');
    }
    
    // Configurer les event listeners pour les boutons desktop
    const undoBtnDesktop = document.getElementById('undoBtnDesktop');
    const redoBtnDesktop = document.getElementById('redoBtnDesktop');
    
    if (undoBtnDesktop) {
        undoBtnDesktop.addEventListener('click', undo);
        console.log('✅ Event listener undo desktop attaché');
    } else {
        console.warn('❌ Bouton undo desktop non trouvé');
    }
    
    if (redoBtnDesktop) {
        redoBtnDesktop.addEventListener('click', redo);
        console.log('✅ Event listener redo desktop attaché');
    } else {
        console.warn('❌ Bouton redo desktop non trouvé');
    }
    
    updateUndoRedoButtons();
}

// Fonctions de nettoyage pour éviter les débordements
function cleanUpMarkers() {
    // Supprimer tous les marqueurs existants
    document.querySelectorAll('.previous-pixel-marker, .next-pixel-marker-1, .next-pixel-marker-2').forEach(marker => {
        marker.remove();
    });
}

function cleanUpOutsideElements() {
    // Supprimer tout élément de pixel qui ne serait pas dans la grille
    const pixelGrid = document.getElementById('pixelGrid');
    if (!pixelGrid) return;
    
    // Nettoyer les éléments potentiellement mal placés
    document.querySelectorAll('.pixel').forEach(pixel => {
        if (!pixelGrid.contains(pixel)) {
            pixel.remove();
        }
    });
    
    // Nettoyer les marqueurs orphelins
    document.querySelectorAll('.previous-pixel-marker, .next-pixel-marker-1, .next-pixel-marker-2').forEach(marker => {
        const parent = marker.parentElement;
        if (!parent || !parent.classList.contains('pixel') || !pixelGrid.contains(parent)) {
            marker.remove();
        }
    });
}

// Gestion des frames
function saveCurrentFrame() {
    const pixels = document.querySelectorAll('.pixel');
    const frameData = Array.from(pixels).map(pixel => ({
        color: pixel.style.backgroundColor || '#FFFFFF',
        isEmpty: pixel.classList.contains('empty')
    }));
    frames[currentFrame] = frameData;
    
    // Mettre à jour seulement la miniature de la frame actuelle (avec debounce)
    updateCurrentFrameThumbnail();
}

function updateCurrentFrameThumbnail() {
    // Debounce pour éviter trop d'appels
    clearTimeout(window.thumbnailUpdateTimer);
    window.thumbnailUpdateTimer = setTimeout(() => {
        const frameButton = document.querySelector(`[data-frame-index="${currentFrame}"]`);
        if (frameButton) {
            // Remplacer la miniature existante
            const oldThumbnail = frameButton.querySelector('.frame-thumbnail');
            if (oldThumbnail) {
                const newThumbnail = createFrameThumbnail(frames[currentFrame], currentFrame);
                frameButton.replaceChild(newThumbnail, oldThumbnail);
            }
        }
    }, 50); // 50ms de debounce pour une meilleure réactivité
}

function updateAllThumbnails() {
    // Mettre à jour toutes les miniatures
    frames.forEach((frame, index) => {
        const frameButton = document.querySelector(`[data-frame-index="${index}"]`);
        if (frameButton) {
            const oldThumbnail = frameButton.querySelector('.frame-thumbnail');
            if (oldThumbnail) {
                const newThumbnail = createFrameThumbnail(frame, index);
                frameButton.replaceChild(newThumbnail, oldThumbnail);
            }
        }
    });
}

function loadFrame(frameIndex) {
    if (!frames[frameIndex]) return;
    
    // Arrêter l'animation si elle est en cours quand on change de frame manuellement
    if (isAnimationPlaying) {
        stopAnimation();
    }
    
    // Réinitialiser l'historique pour la nouvelle frame
    history = [];
    historyIndex = -1;
    hasDrawnInCurrentAction = false;
    
    const pixels = document.querySelectorAll('.pixel');
    
    // Nettoyer tous les marqueurs existants de manière stricte
    cleanUpMarkers();
    
    // Nettoyage de sécurité : supprimer tout élément indésirable en dehors de la grille
    cleanUpOutsideElements();
    
    // Réinitialiser les pixels
    pixels.forEach(pixel => {
        pixel.style.backgroundColor = '#FFFFFF';
        pixel.classList.add('empty');
    });
    
    // Afficher la frame actuelle
    frames[frameIndex].forEach((pixel, i) => {
        if (!pixel.isEmpty) {
            pixels[i].style.backgroundColor = pixel.color;
            pixels[i].classList.remove('empty');
        }
    });
    
    // Ajouter le point pour la frame précédente
    if (frameIndex > 0 && frames[frameIndex - 1]) {
        frames[frameIndex - 1].forEach((pixel, i) => {
            if (!pixel.isEmpty) {
                const marker = document.createElement('div');
                marker.className = 'previous-pixel-marker';
                marker.style.backgroundColor = pixel.color;
                pixels[i].appendChild(marker);
            }
        });
    }
    
    // Ajouter les deux points pour la frame suivante
    if (frames[frameIndex + 1]) {
        frames[frameIndex + 1].forEach((pixel, i) => {
            if (!pixel.isEmpty) {
                const marker1 = document.createElement('div');
                marker1.className = 'next-pixel-marker-1';
                marker1.style.backgroundColor = pixel.color;
                pixels[i].appendChild(marker1);
                
                const marker2 = document.createElement('div');
                marker2.className = 'next-pixel-marker-2';
                marker2.style.backgroundColor = pixel.color;
                pixels[i].appendChild(marker2);
            }
        });
    }
    
    currentFrame = frameIndex;
    updateFramesList();
    
    // Sauvegarder l'état initial de la frame chargée dans l'historique
    setTimeout(() => {
        saveToHistory();
    }, 10);
}

function addFrame() {
    saveCurrentFrame();
    frames.push([]);
    currentFrame = frames.length - 1;
    loadFrame(currentFrame);
}

function createFrameThumbnail(frame, frameIndex) {
    const thumbnail = document.createElement('div');
    thumbnail.className = 'frame-thumbnail';
    
    // Utiliser 16x16 pour desktop et mobile (cohérence avec CSS)
    let thumbnailSize = 16; // 16x16 partout pour correspondre au CSS
    if (window.innerWidth <= 360 || (window.innerHeight <= 500 && window.matchMedia('(orientation: landscape)').matches)) {
        thumbnailSize = 16; // Garder 16x16 même sur petits écrans pour cohérence
    }
    
    const originalSize = 32;
    const ratio = originalSize / thumbnailSize;
    
    for (let row = 0; row < thumbnailSize; row++) {
        for (let col = 0; col < thumbnailSize; col++) {
            const pixel = document.createElement('div');
            pixel.className = 'thumbnail-pixel';
            
            // Échantillonner chaque 2e pixel de la grille originale
            const originalRow = row * ratio;
            const originalCol = col * ratio;
            const originalIndex = originalRow * originalSize + originalCol;
            
            // Obtenir la couleur du pixel correspondant
            let color = '#FFFFFF'; // Blanc par défaut
            if (frame && frame[originalIndex]) {
                if (!frame[originalIndex].isEmpty && frame[originalIndex].color) {
                    // Convertir les couleurs RGB en hex si nécessaire
                    color = frame[originalIndex].color;
                    if (color.startsWith('rgb')) {
                        color = rgbToHex(color);
                    }
                } else {
                    color = '#FFFFFF'; // Blanc pour les pixels vides
                }
            }
            
            pixel.style.backgroundColor = color;
            thumbnail.appendChild(pixel);
        }
    }
    
    // Ajouter le numéro de frame en overlay pour les frames vides seulement
    if (!frame || frame.length === 0 || frame.every(p => !p || p.isEmpty)) {
        const frameNumber = document.createElement('div');
        frameNumber.className = 'frame-number';
        frameNumber.textContent = frameIndex + 1;
        thumbnail.appendChild(frameNumber);
    }
    
    return thumbnail;
}

function updateFramesList() {
    const framesList = document.getElementById('framesList');
    framesList.innerHTML = '';
    
    frames.forEach((frame, index) => {
        const frameContainer = document.createElement('div');
        frameContainer.className = 'frame-container';
        
        const insertBeforeBtn = document.createElement('button');
        insertBeforeBtn.textContent = '+';
        insertBeforeBtn.className = 'insert-frame-btn';
        insertBeforeBtn.title = 'Insérer une frame ici';
        insertBeforeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            insertFrame(index);
        });
        
        const frameBtn = document.createElement('button');
        frameBtn.className = `frame-preview ${index === currentFrame ? 'active' : ''}`;
        frameBtn.draggable = true; // Rendre l'élément déplaçable
        frameBtn.title = `Frame ${index + 1}`;
        frameBtn.dataset.frameIndex = index; // Attribut pour identifier la frame
        
        // Créer la miniature de la frame
        const thumbnail = createFrameThumbnail(frame, index);
        frameBtn.appendChild(thumbnail);
        
        // Ajouter les événements de drag & drop
        frameBtn.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', index);
            frameBtn.classList.add('dragging');
        });
        
        frameBtn.addEventListener('dragend', () => {
            frameBtn.classList.remove('dragging');
        });
        
        frameBtn.addEventListener('dragover', (e) => {
            e.preventDefault();
            frameBtn.classList.add('drag-over');
        });
        
        frameBtn.addEventListener('dragleave', () => {
            frameBtn.classList.remove('drag-over');
        });
        
        frameBtn.addEventListener('drop', (e) => {
            e.preventDefault();
            frameBtn.classList.remove('drag-over');
            const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
            const toIndex = index;
            
            if (fromIndex !== toIndex) {
                reorderFrames(fromIndex, toIndex);
            }
        });
        
        frameBtn.addEventListener('click', () => {
            currentFrame = index;
            loadFrame(currentFrame);
        });
        
        frameContainer.appendChild(insertBeforeBtn);
        frameContainer.appendChild(frameBtn);
        framesList.appendChild(frameContainer);
    });
    
    // Bouton d'insertion après la dernière frame
    const insertLastBtn = document.createElement('button');
    insertLastBtn.textContent = '+';
    insertLastBtn.className = 'insert-frame-btn';
    insertLastBtn.title = 'Ajouter une frame à la fin';
    insertLastBtn.addEventListener('click', () => insertFrame(frames.length));
    framesList.appendChild(insertLastBtn);
}

// Ajouter la fonction insertFrame
function insertFrame(index) {
    saveCurrentFrame(); // Sauvegarder la frame actuelle avant l'insertion
    
    // Créer une nouvelle frame vide
    const newFrame = Array(32 * 32).fill().map(() => ({
        color: '#FFFFFF',
        isEmpty: true
    }));
    
    // Insérer la nouvelle frame à l'index spécifié
    frames.splice(index, 0, newFrame);
    currentFrame = index;
    loadFrame(currentFrame);
    updateFramesList();
}

// Ajouter la fonction deleteCurrentFrame
function deleteCurrentFrame() {
    if (frames.length <= 1) {
        alert('Impossible de supprimer la dernière frame !');
        return;
    }
    
    if (confirm(`Voulez-vous vraiment supprimer la frame ${currentFrame + 1} ?`)) {
        frames.splice(currentFrame, 1);
        if (currentFrame >= frames.length) {
            currentFrame = frames.length - 1;
        }
        loadFrame(currentFrame);
        updateFramesList();
    }
}

// Ajouter la fonction clearAllFrames
function clearAllFrames() {
    if (confirm('Êtes-vous sûr de vouloir effacer toutes les frames ?')) {
        frames = [[]];  // Réinitialiser avec une seule frame vide
        currentFrame = 0;
        
        // Effacer tous les pixels
        const pixels = document.querySelectorAll('.pixel');
        pixels.forEach(pixel => {
            pixel.style.backgroundColor = '#FFFFFF';
            pixel.classList.add('empty');
        });

        // Nettoyer les marqueurs
        document.querySelectorAll('.previous-pixel-marker, .next-pixel-marker-1, .next-pixel-marker-2').forEach(marker => marker.remove());

        // Réinitialiser l'historique avec la grille vide
        initHistory();

        // Mettre à jour l'interface
        updateFramesList();
        loadFrame(currentFrame);
    }
}

async function saveToFile() {
    try {
        // Demander le nom du projet avec une boîte de dialogue personnalisée
        const projectName = await showSaveDialog();
        if (!projectName) return; // Si l'utilisateur annule

        const projectData = {
            name: projectName,
            frames: frames,
            currentFrame: currentFrame,
            customColors: customColors,
            customPalette: customPalette, // Ajouter la palette personnalisée
            created: new Date().toISOString(),
            version: '2.0'
        };

        // Sauvegarder localement (localStorage) - plus fiable
        try {
            autoSaveProjectLocal(projectName);
        } catch (saveError) {
            console.error('Erreur localStorage:', saveError);
            // Plan B : Téléchargement direct du fichier
            const blob = new Blob([JSON.stringify(projectData, null, 2)], {type: 'application/json'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${projectName}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            alert('✅ Projet téléchargé en fichier !');
            return;
        }
        
        // Mettre à jour le titre du projet
        const titleElement = document.getElementById('projectTitle');
        if (titleElement) {
            titleElement.textContent = projectName;
        }
        
        alert('✅ Projet sauvegardé localement !');
        
    } catch (err) {
        console.error('Erreur lors de la sauvegarde:', err);
        alert('❌ Erreur lors de la sauvegarde.');
    }
}

function showSaveDialog() {
    return new Promise((resolve) => {
        const dialog = document.createElement('div');
        dialog.className = 'save-dialog';
        dialog.innerHTML = `
            <div class="save-dialog-content">
                <h3>💾 Sauvegarder sur Supabase</h3>
                <input type="text" id="saveFileName" placeholder="Nom du projet" value="mon-pixel-art">
                <div class="dialog-buttons">
                    <button id="dialogSave">Sauvegarder</button>
                    <button id="dialogCancel">Annuler</button>
                </div>
            </div>
        `;

        document.body.appendChild(dialog);

        const input = dialog.querySelector('#saveFileName');
        const saveBtn = dialog.querySelector('#dialogSave');
        const cancelBtn = dialog.querySelector('#dialogCancel');

        saveBtn.onclick = () => {
            const value = input.value.trim();
            if (value) {
                document.body.removeChild(dialog);
                resolve(value);
            }
        };

        cancelBtn.onclick = () => {
            document.body.removeChild(dialog);
            resolve(null);
        };

        input.focus();
    });
}

// Prévisualisation de l'animation
function previewAnimation() {
    const previewBtn = document.getElementById('previewBtn');
    
    if (isAnimationPlaying) {
        // ARRÊTER l'animation
        stopAnimation();
    } else {
        // DÉMARRER l'animation
        startAnimation();
    }
}

function startAnimation() {
    if (frames.length <= 1) {
        alert('Il faut au moins 2 frames pour faire une animation !');
        return;
    }
    
    // Sauvegarder la frame actuelle
    saveCurrentFrame();
    
    isAnimationPlaying = true;
    const previewBtn = document.getElementById('previewBtn');
    const playToggle = document.getElementById('playToggle');
    
    // Mettre à jour le bouton dans le menu
    if (previewBtn) {
        previewBtn.innerHTML = '⏹️';
        previewBtn.title = 'Arrêter l\'animation';
        previewBtn.classList.add('playing');
    }
    
    // Mettre à jour le bouton dans la barre du haut
    if (playToggle) {
        playToggle.innerHTML = '⏹️';
        playToggle.title = 'Arrêter l\'animation';
        playToggle.classList.add('playing');
    }
    
    let frameIndex = 0;
    
    const playNextFrame = () => {
        const frameDelay = Math.max(16, Math.round(1000 / (animationFPS || 24)));
        
        // Nettoyer les marqueurs pendant l'animation
        cleanUpMarkers();
        
        // Vérifier que la frame existe
        if (!frames[frameIndex] || frames[frameIndex].length === 0) {
            frameIndex = (frameIndex + 1) % frames.length;
            animationInterval = setTimeout(playNextFrame, frameDelay);
            return;
        }
        
        const pixels = document.querySelectorAll('.pixel');
        frames[frameIndex].forEach((pixel, i) => {
            if (pixels[i]) {
                pixels[i].style.backgroundColor = pixel.isEmpty ? '#FFFFFF' : pixel.color;
                pixels[i].classList.remove('empty');
            }
        });
        
        frameIndex = (frameIndex + 1) % frames.length;
        animationInterval = setTimeout(playNextFrame, frameDelay);
    };
        
    playNextFrame();
}

function stopAnimation() {
    if (animationInterval) {
        clearTimeout(animationInterval);
        animationInterval = null;
    }
    
    isAnimationPlaying = false;
    const previewBtn = document.getElementById('previewBtn');
    const playToggle = document.getElementById('playToggle');
    
    // Mettre à jour le bouton dans le menu
    if (previewBtn) {
        previewBtn.innerHTML = '▶️';
        previewBtn.title = 'Lancer l\'animation';
        previewBtn.classList.remove('playing');
    }
    
    // Mettre à jour le bouton dans la barre du haut
    if (playToggle) {
        playToggle.innerHTML = '▶️';
        playToggle.title = 'Lancer l\'animation';
        playToggle.classList.remove('playing');
    }
    
    // Retourner à la frame de travail actuelle
    loadFrame(currentFrame);
}

// Utilitaires améliorés
function rgbToHex(rgb) {
    if (!rgb) return '#000000';
    
    // Si c'est déjà en format hex
    if (rgb.startsWith('#')) return rgb.toUpperCase();
    
    // Gestion des couleurs nommées communes
    const namedColors = {
        'white': '#FFFFFF',
        'black': '#000000',
        'red': '#FF0000',
        'green': '#008000',
        'blue': '#0000FF',
        'yellow': '#FFFF00',
        'cyan': '#00FFFF',
        'magenta': '#FF00FF'
    };
    
    if (namedColors[rgb.toLowerCase()]) {
        return namedColors[rgb.toLowerCase()];
    }
    
    // Format rgb(r, g, b) ou rgba(r, g, b, a)
    const values = rgb.match(/\d+/g);
    if (values && values.length >= 3) {
        return `#${values.slice(0, 3).map(x => parseInt(x).toString(16).padStart(2, '0')).join('')}`.toUpperCase();
    }
    
    return '#000000'; // Fallback
}

// Styles pour les marqueurs de pixels - Responsive selon la plateforme
const styleSheet = document.createElement('style');
styleSheet.textContent = `
/* Styles par défaut pour mobile */
.previous-pixel-marker {
    position: absolute;
    width: 4px;
    height: 4px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    pointer-events: none;
}

.next-pixel-marker-1 {
    position: absolute;
    width: 4px;
    height: 4px;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    pointer-events: none;
}

.next-pixel-marker-2 {
    position: absolute;
    width: 4px;
    height: 4px;
    top: 65%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    pointer-events: none;
}

/* Styles pour desktop - plus grands et visibles */
@media (min-width: 1024px) {
    .previous-pixel-marker {
        width: 8px !important;
        height: 8px !important;
        border: 1px solid rgba(0, 0, 0, 0.3) !important;
    }
    
    .next-pixel-marker-1, .next-pixel-marker-2 {
        width: 6px !important;
        height: 6px !important;
        border: 1px solid rgba(0, 0, 0, 0.3) !important;
    }
}
`;
document.head.appendChild(styleSheet);

// Ajouter la fonction reorderFrames
function reorderFrames(fromIndex, toIndex) {
    // Sauvegarder la frame déplacée
    const frameToMove = frames[fromIndex];
    
    // Supprimer la frame de son emplacement d'origine
    frames.splice(fromIndex, 1);
    
    // Insérer la frame à sa nouvelle position
    frames.splice(toIndex, 0, frameToMove);
    
    // Mettre à jour l'index courant si nécessaire
    if (currentFrame === fromIndex) {
        currentFrame = toIndex;
    } else if (currentFrame > fromIndex && currentFrame <= toIndex) {
        currentFrame--;
    } else if (currentFrame < fromIndex && currentFrame >= toIndex) {
        currentFrame++;
    }
    
    // Mettre à jour l'interface
    loadFrame(currentFrame);
    updateFramesList();
}

// Ajouter la fonction copyCurrentFrame
function copyCurrentFrame() {
    copiedFrame = JSON.parse(JSON.stringify(frames[currentFrame]));
    const pasteBtn = document.getElementById('pasteFrameBtn');
    if (pasteBtn) {
        pasteBtn.disabled = false;
    }
    console.log('Frame copiée !'); // Debug pour vérifier que ça fonctionne
}

// Fonction pour coller une frame
function pasteFrame() {
    if (copiedFrame) {
        frames[currentFrame] = [...copiedFrame];
        loadFrame(currentFrame);
        updateFramesList();
    }
}

// Fonction pour afficher l'aide complète
function showHelp() {
    logUsageEvent('help_opened');
    const helpContent = `
            <div class="help-section">
            <h3>🔰 Commencer</h3>
            <div class="help-item"><strong>Palette :</strong> choisissez une couleur (sidebar gauche sur desktop, barre compacte en haut sur mobile) puis dessinez sur la grille 32×32.</div>
            <div class="help-item"><strong>Gomme :</strong> activez la gomme pour effacer, désactivez-la pour revenir au pinceau.</div>
                </div>
            <div class="help-section">
            <h3>🎚️ Couleurs personnalisées</h3>
            <div class="help-item"><strong>Desktop :</strong> cliquez sur la couleur actuelle pour ouvrir l'éditeur et ajouter vos teintes personnalisées (marquées par une étoile).</div>
            <div class="help-item"><strong>Mobile :</strong> effectuez un appui long sur une couleur compacte pour la modifier.</div>
                </div>
            <div class="help-section">
            <h3>🧱 Frames & animation</h3>
            <div class="help-item"><strong>+ Nouvelle Frame :</strong> ajoute une frame vide (ou duplique la sélection si elle contient des pixels).</div>
            <div class="help-item"><strong>C / V :</strong> copier-collez rapidement une frame.</div>
            <div class="help-item"><strong>Play :</strong> lance/arrête l'aperçu.</div>
            <div class="help-item"><strong>Vitesse :</strong> ajustez les FPS via le bouton "Vitesse" (sidebar desktop ou panneau mobile) pour tester plusieurs rythmes.</div>
                </div>
            <div class="help-section">
            <h3>💾 Sauvegarde & chargement</h3>
            <div class="help-item"><strong>Sauvegarder :</strong> enregistre le projet (frames, couleurs, FPS) sur votre compte Supabase et crée un backup local.</div>
            <div class="help-item"><strong>Mes projets :</strong> retrouvez vos créations, rechargez-les ou supprimez-les.</div>
            <div class="help-item"><strong>Charger :</strong> importez un projet reçu ou exporté (.json / .pixelart / .txt).</div>
                </div>
            <div class="help-section">
            <h3>📤 Export & partage</h3>
            <div class="help-item"><strong>Export GIF :</strong> génère un GIF animé de toutes vos frames.</div>
            <div class="help-item"><strong>Partager :</strong> crée un fichier ou un lien à envoyer à d'autres utilisateurs.</div>
                </div>
            <div class="help-section">
            <h3>📱 Astuces mobiles</h3>
            <div class="help-item"><strong>Menu hamburger :</strong> affiche/masque les outils complets.</div>
            <div class="help-item"><strong>Dessin tactile :</strong> maintenez et glissez pour tracer ; le multitouch est limité pour éviter les gestes accidentels.</div>
        </div>
    `;

    const dialog = createMobileDialog('🎨 Guide d\'utilisation', helpContent);
    
    // Ajouter des styles spécifiques à l'aide
    dialog.querySelector('.mobile-dialog-content').style.maxWidth = '600px';
    dialog.querySelector('.mobile-dialog-content').style.maxHeight = '80vh';
    dialog.querySelector('.mobile-dialog-body').style.overflow = 'auto';
}

// Ajouter la fonction pour afficher les crédits
function showCredits() {
    logUsageEvent('credits_opened');
    const modal = document.createElement('div');
    modal.className = 'credits-modal';
    
    const content = document.createElement('div');
    content.className = 'credits-content';
    
    content.innerHTML = `
        <h2>Pixel Editor - Crédits</h2>
        <div class="credits-section">
            <h3>Créateur & vision</h3>
            <p><strong>Frédéric Terrasson</strong></p>
            <p>Fondateur, designer produit & développeur principal</p>
            <p class="credits-contact">✉️ monstertaz06@gmail.com</p>
        </div>
        <div class="credits-section">
            <h3>Mission</h3>
            <p>Proposer à tous — enfants comme adultes — un studio de pixel animé simple, ludique et accessible pour donner vie à leurs idées créatives.</p>
        </div>
        <div class="credits-section creator-story">
            <h3>Parcours</h3>
            <ul>
                <li>2024 — lancement du projet Pixel Editor, d'abord pour la famille et les proches</li>
                <li>2025 — ouverture progressive à la communauté créative en ligne</li>
                <li>Aujourd'hui — évolution continue avec vos retours, pour garder l'outil simple et fun</li>
            </ul>
        </div>
        <div class="credits-section acknowledgements">
            <h3>Contributeurs & remerciements</h3>
            <p>Merci à toutes les personnes qui testent l'éditeur, partagent leurs idées et encouragent la création pixel.</p>
            <ul>
                <li>guillaume.gay@protonmail.com</li>
            </ul>
        </div>
        <div class="credits-section legal">
            <h3>Mentions légales</h3>
            <p>© ${new Date().getFullYear()} Frédéric Terrasson. Tous droits réservés.</p>
            <p>Usage autorisé uniquement dans le cadre des licences signées avec l'éditeur. Pour toute exploitation commerciale, contactez l'adresse ci-dessus.</p>
        </div>
        <button class="close-credits">Fermer</button>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // Fermeture avec le bouton
    modal.querySelector('.close-credits').addEventListener('click', () => {
        modal.remove();
    });
    
    // Fermeture en cliquant en dehors
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Ajouter la fonction saveProject pour la sauvegarde complète
function saveProject() {
    // Sauvegarder la frame courante avant l'export
    saveCurrentFrame();
    
    const saveDialog = document.createElement('div');
    saveDialog.className = 'save-dialog';
    
    saveDialog.innerHTML = `
        <div class="save-dialog-content">
            <h3>Sauvegarder le projet</h3>
            <input type="text" id="projectName" placeholder="Nom du projet" value="pixel_animation">
            <div class="dialog-buttons">
                <button id="dialogSave">Sauvegarder</button>
                <button id="dialogCancel">Annuler</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(saveDialog);
    
    const projectNameInput = saveDialog.querySelector('#projectName');
    projectNameInput.focus();
    
    saveDialog.querySelector('#dialogSave').addEventListener('click', () => {
        const projectName = (projectNameInput.value || 'pixel_animation').trim();
        const projectData = {
            frames: frames,
            currentFrame: currentFrame,
            fps: animationFPS || 24,
            customPalette: customPalette,
            customColors: customColors,
            projectName: projectName,
            version: '1.0.0',
            date: new Date().toISOString(),
            signature: 'pixel-art-editor-v2'
        };
        
        // Créer et télécharger le fichier
        const blob = new Blob([JSON.stringify(projectData, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${projectName}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        saveDialog.remove();
    });
    
    saveDialog.querySelector('#dialogCancel').addEventListener('click', () => {
        saveDialog.remove();
    });
}

// Fonction pour sauvegarder sur Supabase (cloud)
async function saveToServer() {
    try {
        const fileName = await showSaveDialog();
        if (!fileName) return;

        // Save current frame before saving project
        saveCurrentFrame();

        // Generate thumbnail
        const thumbnail = window.dbService.generateThumbnail();

        const projectData = {
            name: fileName,
            frames: frames,
            currentFrame: currentFrame,
            fps: animationFPS || 24,
            customPalette: customPalette,
            thumbnail: thumbnail
        };

        console.log('Saving project to Supabase...', fileName);
        const result = await window.dbService.saveProject(projectData);

        if (result.success) {
            const action = result.isUpdate ? 'mis à jour' : 'créé';
            alert(`✅ Projet "${fileName}" ${action} avec succès !`);
            console.log('Project saved:', result.data);
        } else {
            alert('❌ Erreur lors de la sauvegarde: ' + result.error);
        }
    } catch (err) {
        console.error('Erreur lors de la sauvegarde:', err);
        alert('❌ Erreur lors de la sauvegarde. Vérifiez que vous êtes connecté.');
    }
}

// Fonction pour charger depuis Supabase (cloud)
async function loadFromServer() {
    try {
        console.log('Loading projects from Supabase...');
        const result = await window.dbService.getAllProjects();

        if (!result.success) {
            alert('❌ Erreur lors du chargement: ' + result.error);
            return;
        }

        const projects = result.data;

        if (projects.length === 0) {
            alert('Aucun projet sauvegardé trouvé. Créez-en un et sauvegardez-le !');
            return;
        }

        // Create dialog to select project
        const dialog = document.createElement('div');
        dialog.className = 'save-dialog';

        const projectsList = projects.map(p => {
            const date = new Date(p.updated_at).toLocaleDateString('fr-FR');
            const time = new Date(p.updated_at).toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'});
            return `<div class="project-item" data-name="${p.name}">
                <strong>${p.name}</strong><br>
                <small>${date} à ${time}</small>
            </div>`;
        }).join('');

        dialog.innerHTML = `
            <div class="save-dialog-content">
                <h3>Charger un projet</h3>
                <div style="max-height: 300px; overflow-y: auto; margin: 15px 0;">
                    ${projectsList}
                </div>
                <div class="dialog-buttons">
                    <button id="dialogCancel">Annuler</button>
                </div>
            </div>
        `;

        document.body.appendChild(dialog);

        // Add click handlers for project items
        dialog.querySelectorAll('.project-item').forEach(item => {
            item.style.cursor = 'pointer';
            item.style.padding = '10px';
            item.style.margin = '5px 0';
            item.style.border = '1px solid #ddd';
            item.style.borderRadius = '5px';
            item.style.transition = 'background 0.2s';

            item.addEventListener('mouseenter', () => {
                item.style.background = '#f0f0f0';
            });
            item.addEventListener('mouseleave', () => {
                item.style.background = 'white';
            });

            item.addEventListener('click', async () => {
                const projectName = item.dataset.name;
                dialog.remove();

                try {
                    const loadResult = await window.dbService.loadProject(projectName);

                    if (!loadResult.success) {
                        alert('❌ Erreur lors du chargement: ' + loadResult.error);
                        return;
                    }

                    const data = loadResult.data;
                    console.log('📥 Projet Supabase chargé', {
                        rawFramesType: typeof data.frames,
                        hasCustomColors: !!(data.custom_colors || data.customColors),
                        hasCustomPalette: !!(data.custom_palette || data.customPalette),
                        fps: data.fps,
                        currentFrame: data.current_frame ?? data.currentFrame
                    });

                    const parsedFrames = typeof data.frames === 'string' ? JSON.parse(data.frames) : data.frames;
                    frames = normaliseFrames(parsedFrames);
                    currentFrame = data.current_frame ?? data.currentFrame ?? 0;
                    if (currentFrame >= frames.length) {
                        currentFrame = Math.max(0, frames.length - 1);
                    }
                    console.log('📐 Frames normalisées', { length: frames.length });

                    const colors = data.custom_colors || data.customColors;
                    customColors = [];
                    if (colors) {
                        const projectColors = typeof colors === 'string' ? JSON.parse(colors) : colors;
                        if (Array.isArray(projectColors)) {
                            projectColors.forEach(color => addCustomColor(color));
                        }
                    }
                    console.log('🎨 Couleurs personnalisées appliquées', { count: customColors.length });

                    if (data.custom_palette || data.customPalette) {
                        const palette = data.custom_palette || data.customPalette;
                        customPalette = typeof palette === 'string' ? JSON.parse(palette) : palette;
                        updateCompactPalette();
                    }

                    if (data.fps) {
                        setAnimationFPSValue(data.fps);
                    }

                    const title = document.getElementById('projectTitle');
                    if (title) {
                        title.textContent = data.name || data.projectTitle || projectName;
                    }

                    console.log('🖼️ Mise à jour interface', { currentFrame, framesLength: frames.length });

                    updateFramesList();
                    loadFrame(currentFrame);

                    alert(`✅ Projet "${projectName}" chargé avec succès !`);
                } catch (err) {
                    console.error('Error loading project:', err);
                    alert('❌ Erreur lors du chargement du projet.');
                }
            });
        });

        dialog.querySelector('#dialogCancel').addEventListener('click', () => {
            dialog.remove();
        });

    } catch (err) {
        console.error('Erreur lors du chargement:', err);
        alert('❌ Erreur lors du chargement. Vérifiez que vous êtes connecté.');
    }
}

// Fonctionnalités mobiles
function initMobileFeatures() {
    // Détection mobile
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouch = 'ontouchstart' in window;
    
    if (isMobile || isTouch) {
        document.body.classList.add('is-mobile');
        
        // Optimiser les interactions tactiles
        optimizeTouchInteractions();
    }
    
    // Gérer le changement d'orientation
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            adjustForOrientation();
        }, 100);
    });
    
    window.addEventListener('resize', () => {
        adjustForOrientation();
    });
}

function optimizeTouchInteractions() {
    // Optimiser le dessin tactile
    let touchStarted = false;
    
    document.getElementById('pixelGrid').addEventListener('touchstart', (e) => {
        e.preventDefault();
        touchStarted = true;
        
        const touch = e.touches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        
        if (element && element.classList.contains('pixel')) {
            startDrawing({ target: element });
        }
    }, { passive: false });
    
    document.getElementById('pixelGrid').addEventListener('touchmove', (e) => {
        e.preventDefault();
        
        if (touchStarted) {
            const touch = e.touches[0];
            const element = document.elementFromPoint(touch.clientX, touch.clientY);
            
            if (element && element.classList.contains('pixel')) {
                draw({ target: element });
            }
        }
    }, { passive: false });
    
    document.getElementById('pixelGrid').addEventListener('touchend', (e) => {
        e.preventDefault();
        touchStarted = false;
        stopDrawing();
    }, { passive: false });
}

// Fonction pour gérer l'affichage/masquage de la toolbar
function toggleToolbar() {
    const toolbar = document.querySelector('.toolbar');
    const menuButton = document.getElementById('menuToggle');
    
    if (toolbar && menuButton) {
        toolbar.classList.toggle('visible');
        
        // Changer l'apparence du bouton avec CSS
        if (toolbar.classList.contains('visible')) {
            menuButton.classList.add('open');
            menuButton.title = 'Cacher les outils';
        } else {
            menuButton.classList.remove('open');
            menuButton.title = 'Afficher les outils';
        }
    }
}

// Note: L'ajustement de la grille est maintenant géré entièrement par CSS 
// avec des CSS variables pour garantir exactement 32x32 cases sur toutes plateformes

// Améliorer les dialogues pour mobile
function createMobileDialog(title, content) {
    const dialog = document.createElement('div');
    dialog.className = 'mobile-dialog';
    
    dialog.innerHTML = `
        <div class="mobile-dialog-content">
            <div class="mobile-dialog-header">
                <h3>${title}</h3>
                <button class="mobile-dialog-close">✕</button>
            </div>
            <div class="mobile-dialog-body">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(dialog);
    
    // Fermer le dialogue
    dialog.querySelector('.mobile-dialog-close').addEventListener('click', () => {
        dialog.remove();
    });
    
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
            dialog.remove();
        }
    });
    
    return dialog;
}

// Fonction améliorée pour charger depuis le serveur sur mobile
async function loadFromServerMobile() {
    try {
        const projects = await fetch('/api/projects').then(res => res.json());
        
        if (projects.length === 0) {
            alert('Aucun projet sauvegardé trouvé.');
            return;
        }

        // Créer une liste interactive pour mobile
        const projectsList = projects.map(p => 
            `<div class="project-item" data-filename="${p.filename}">
                <div class="project-name">${p.name}</div>
                <div class="project-date">${new Date(p.lastModified).toLocaleDateString()}</div>
            </div>`
        ).join('');

        const dialog = createMobileDialog('Charger un projet', `
            <div class="projects-list">
                ${projectsList}
            </div>
            <button id="cancelLoad" class="dialog-button secondary">Annuler</button>
        `);

        // Gérer la sélection
        dialog.querySelectorAll('.project-item').forEach(item => {
            item.addEventListener('click', async () => {
                const filename = item.dataset.filename;
                
                try {
                    const response = await fetch(`/api/load/${filename}`);
                    const data = await response.json();

                    frames = data.frames;
                    currentFrame = data.currentFrame;
                    
                    // Charger les couleurs personnalisées si elles existent
                    if (data.customColors) {
                        // Réintégrer les couleurs du projet avec les couleurs de base
                        const projectColors = data.customColors;
                        customColors = []; // Vider d'abord
                        
                        // Ajouter les couleurs du projet qui ne sont pas des couleurs de base
                        projectColors.forEach(color => {
                            addCustomColor(color); // Cette fonction vérifie déjà les doublons
                        });
                    }
                    
                    const title = document.getElementById('projectTitle');
                    if (title) {
                        title.textContent = data.name || 'Projet sans nom';
                    }
                    
                    updateFramesList();
                    loadFrame(currentFrame);
                    
                    dialog.remove();
                    alert('Projet chargé avec succès !');
                } catch (err) {
                    console.error('Erreur lors du chargement:', err);
                    alert('Erreur lors du chargement.');
                }
            });
        });

        dialog.querySelector('#cancelLoad').addEventListener('click', () => {
            dialog.remove();
        });

    } catch (err) {
        console.error('Erreur lors du chargement:', err);
        alert('Erreur lors du chargement. Veuillez réessayer.');
    }
}

// Fonction intelligente de sauvegarde : essaie Supabase en premier, puis fallback vers localStorage
async function saveProjectSmart() {
    try {
        // Demander le nom du projet
        const fileName = await showSaveDialog();
        if (!fileName) return;

        // Sauvegarder la frame courante avant la sauvegarde
        saveCurrentFrame();

        // Générer la miniature
        const thumbnail = window.dbService.generateThumbnail();

        const projectTitleText = document.getElementById('projectTitle')?.textContent || fileName;
        const projectData = {
            name: fileName,
            frames: frames,
            currentFrame: currentFrame,
            fps: animationFPS || 24,
            customPalette: customPalette,
            thumbnail: thumbnail,
            customColors: customColors,
            projectTitle: projectTitleText,
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
            version: '2.0',
            device_info: navigator.userAgent,
            signature: 'pixel-art-editor-v2'
        };

        // 1️⃣ ESSAYER SUPABASE EN PREMIER
        console.log('🔄 Tentative de sauvegarde sur Supabase...', fileName);
        
        try {
            const result = await window.dbService.saveProject(projectData);

            if (result.success) {
                const action = result.isUpdate ? 'mis à jour' : 'créé';
                alert(`✅ Projet "${fileName}" ${action} avec succès sur le cloud Supabase !`);
                console.log('✅ Project saved to Supabase:', result.data);
                logUsageEvent('project_saved', {
                    name: fileName,
                    frames: frames.length,
                    fps: animationFPS
                });
                
                // Aussi sauvegarder en local pour backup
                try {
                    localStorage.setItem(`pixelart_${fileName}`, JSON.stringify(projectData));
                    console.log('💾 Backup local créé');
                } catch (localError) {
                    console.warn('⚠️ Impossible de créer le backup local:', localError);
                }
                
                return;
            } else {
                throw new Error(result.error);
            }
        } catch (supabaseError) {
            console.warn('⚠️ Erreur Supabase:', supabaseError);
            
            // 2️⃣ FALLBACK VERS LOCALSTORAGE
            console.log('🔄 Fallback vers sauvegarde locale...');
            
            try {
                localStorage.setItem(`pixelart_${fileName}`, JSON.stringify(projectData));
                alert(`⚠️ Projet "${fileName}" sauvegardé en LOCAL uniquement.\n\n` +
                      `Supabase n'est pas disponible (${supabaseError.message}).\n` +
                      `Votre projet est en sécurité localement sur cet appareil.`);
                console.log('💾 Projet sauvegardé en local');
                logUsageEvent('project_saved_local', {
                    name: fileName,
                    frames: frames.length,
                    fps: animationFPS,
                    reason: supabaseError.message
                });
            } catch (localError) {
                // 3️⃣ DERNIER RECOURS : TÉLÉCHARGEMENT
                console.error('❌ Impossible de sauvegarder en local:', localError);
                
                const blob = new Blob([JSON.stringify(projectData, null, 2)], {type: 'application/json'});
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${fileName}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                alert(`⚠️ Impossible de sauvegarder sur le cloud ou en local.\n` +
                      `Le fichier a été téléchargé sur votre appareil : "${fileName}.json"`);
                logUsageEvent('project_saved_download', {
                    name: fileName,
                    frames: frames.length,
                    fps: animationFPS
                });
            }
        }
        
    } catch (err) {
        console.error('❌ Erreur lors de la sauvegarde:', err);
        alert('❌ Erreur inattendue lors de la sauvegarde. Veuillez réessayer.');
    }
}

// Initialisation de tous les event listeners
function initEventListeners() {
    // Boutons principaux
    document.getElementById('clearBtn')?.addEventListener('click', clearAllFrames);
    document.getElementById('deleteFrameBtn')?.addEventListener('click', deleteCurrentFrame);
    document.getElementById('previewBtn')?.addEventListener('click', previewAnimation);
    document.getElementById('saveBtn')?.addEventListener('click', saveProjectSmart);
    document.getElementById('loadBtn')?.addEventListener('click', loadFromFile);
    document.getElementById('loadLocalBtn')?.addEventListener('click', showLocalProjects);
    document.getElementById('shareProjectBtn')?.addEventListener('click', shareProject);
    document.getElementById('exportGifBtn')?.addEventListener('click', exportToGif);
    document.getElementById('copyFrameBtn')?.addEventListener('click', copyCurrentFrame);
    document.getElementById('pasteFrameBtn')?.addEventListener('click', pasteFrame);
    document.getElementById('helpBtn')?.addEventListener('click', showHelp);
    document.getElementById('creditsBtn')?.addEventListener('click', showCredits);
    document.getElementById('profileBtn')?.addEventListener('click', () => window.initUserProfileFlow(true));
    document.getElementById('profileBtnMobile')?.addEventListener('click', () => window.initUserProfileFlow(true));
    document.getElementById('analyticsBtn')?.addEventListener('click', () => { window.location.href = '/admin.html'; });
    document.getElementById('analyticsBtnMobile')?.addEventListener('click', () => { window.location.href = '/admin.html'; });
    
    // Bouton nouvelle frame
    document.getElementById('addFrameBtn')?.addEventListener('click', addFrame);
    
    // Boutons gomme (desktop + mobile)
    document.querySelectorAll('#eraserBtn').forEach(btn => {
        btn.addEventListener('click', toggleEraser);
    });
    
    // Menu hamburger
    document.getElementById('menuToggle')?.addEventListener('click', toggleToolbar);
    
    // Bouton play dans la barre du haut
    document.getElementById('playToggle')?.addEventListener('click', previewAnimation);
    
    // Event listeners pour TOUS les boutons desktop dans sidebar
    document.getElementById('previewBtn2')?.addEventListener('click', () => {
        document.getElementById('previewBtn')?.click();
    });
    document.getElementById('clearBtn2')?.addEventListener('click', () => {
        document.getElementById('clearBtn')?.click();
    });
    document.getElementById('deleteFrameBtn2')?.addEventListener('click', () => {
        document.getElementById('deleteFrameBtn')?.click();
    });
    document.getElementById('saveBtn2')?.addEventListener('click', () => {
        document.getElementById('saveBtn')?.click();
    });
    document.getElementById('loadBtn2')?.addEventListener('click', () => {
        document.getElementById('loadBtn')?.click();
    });
    document.getElementById('loadLocalBtn2')?.addEventListener('click', () => {
        document.getElementById('loadLocalBtn')?.click();
    });
    document.getElementById('shareProjectBtn2')?.addEventListener('click', () => {
        document.getElementById('shareProjectBtn')?.click();
    });
    document.getElementById('exportGifBtn2')?.addEventListener('click', () => {
        document.getElementById('exportGifBtn')?.click();
    });
    document.getElementById('copyFrameBtn2')?.addEventListener('click', () => {
        document.getElementById('copyFrameBtn')?.click();
    });
    document.getElementById('pasteFrameBtn2')?.addEventListener('click', () => {
        document.getElementById('pasteFrameBtn')?.click();
    });
    document.getElementById('helpBtn2')?.addEventListener('click', () => {
        document.getElementById('helpBtn')?.click();
    });
    document.getElementById('creditsBtn2')?.addEventListener('click', () => {
        document.getElementById('creditsBtn')?.click();
    });
    
    // Event listeners pour les nouveaux boutons copier/coller dans le bandeau des frames
    document.getElementById('copyFrameBtnMain')?.addEventListener('click', () => {
        document.getElementById('copyFrameBtn')?.click();
    });
    document.getElementById('pasteFrameBtnMain')?.addEventListener('click', () => {
        document.getElementById('pasteFrameBtn')?.click();
    });
    
    // Initialiser les autres fonctionnalités
    initMobileFeatures();
}

// Auto-save function removed - manual save only

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js').catch(err => {
            console.warn('Enregistrement du service worker impossible:', err);
        });
    }

    initGrid();
    initEventListeners();
    
    // Réinitialiser les couleurs personnalisées au démarrage pour toujours avoir les couleurs de base
    customColors = [];
    updateColorPalette();
    
    // Initialiser le sélecteur de couleur après la palette
    initColorPicker();
    
    // Initialiser l'affichage de la couleur actuelle
    updateCurrentColorDisplay();
    
    // Initialiser les couleurs compactes
    initCompactColorButtons();
    
    // Contrôles FPS (sidebar + modal)
    initFPSSidebarPanel();
    // Initialiser le modal FPS
    initFPSModal();
    
    // Initialiser l'historique undo/redo APRÈS que la grille soit prête
    setTimeout(() => {
        initHistory();
    }, 100);
    
    // Charger les données (Supabase + localStorage en fallback)
    loadSupabaseProjects().catch(() => loadAutoSaveProjects());
    
    // Nettoyage initial pour s'assurer qu'aucun élément indésirable n'existe
    cleanUpOutsideElements();
    
    // Désactiver le bouton coller par défaut
    const pasteBtn = document.getElementById('pasteFrameBtn');
    if (pasteBtn) {
        pasteBtn.disabled = !copiedFrame;
    }
    
    updateFramesList();
    loadFrame(0);
    
    // Raccourcis clavier pour undo/redo
    document.addEventListener('keydown', (e) => {
        // Éviter d'interférer avec les champs de saisie
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
            e.preventDefault();
            undo();
        } else if (e.ctrlKey && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
            e.preventDefault();
            redo();
        }
    });
    
    // Gérer le drag & drop pour importer des projets
    initDragAndDrop();
    
    // Initialiser la gestion des fichiers et URL partagées
    initSharedContentHandling();
    
    // Arrêter l'animation si l'utilisateur quitte la page
    window.addEventListener('beforeunload', () => {
        if (isAnimationPlaying) {
            stopAnimation();
        }
    });

    if (window.__pixelEditorAuthInitialized) {
        initUserProfileFlow();
    }
});

// ========================================
// GESTION DES CONTENUS PARTAGÉS (iOS/PWA)
// ========================================

// Initialiser la gestion des fichiers et projets partagés
function initSharedContentHandling() {
    // Vérifier les paramètres URL pour les projets partagés
    checkURLForSharedProject();
    
    // Écouter les changements d'URL (navigation)
    window.addEventListener('popstate', checkURLForSharedProject);
    
    // Gérer les fichiers envoyés via PWA Share Target API
    handlePWAShareTarget();
    
    // Gérer les fichiers via File Handling API
    handleFileHandlingAPI();
}

// Vérifier si un projet est partagé via URL
function checkURLForSharedProject() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Format: ?project=base64EncodedData
    const projectData = urlParams.get('project');
    if (projectData) {
        try {
            const decodedData = atob(projectData);
            const project = JSON.parse(decodedData);
            
            // Confirmer l'import du projet partagé
            const confirmMessage = `🎨 Projet partagé détecté !

"${project.name || 'Projet sans nom'}"
${project.frames ? project.frames.length : 0} frame(s)

Voulez-vous l'ouvrir ?`;

            if (confirm(confirmMessage)) {
                importProjectData(project);
                
                // Nettoyer l'URL pour éviter les re-imports
                const newUrl = window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
            }
        } catch (error) {
            console.error('Erreur lors du décodage du projet partagé:', error);
        }
    }
}

// Gérer PWA Share Target API (quand un fichier est partagé vers l'app)
function handlePWAShareTarget() {
    // Cette fonction sera appelée quand l'app reçoit des fichiers partagés
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.addEventListener('message', event => {
            if (event.data && event.data.type === 'SHARED_FILE') {
                const payload = event.data;
                const files = [];

                if (Array.isArray(payload.files)) {
                    payload.files.forEach(fileEntry => {
                        if (!fileEntry) return;
                        if (fileEntry instanceof File) {
                            files.push(fileEntry);
                        } else if (fileEntry.data) {
                            const fileName = fileEntry.name || 'projet.pixelart.json';
                            const blob = new Blob([fileEntry.data], { type: 'application/json' });
                            files.push(new File([blob], fileName, { type: 'application/json' }));
                        }
                    });
                } else if (payload.file) {
                    files.push(payload.file);
                }

                if (files.length > 0) {
                    // Importer seulement le premier fichier
                    importSharedProject(files[0]);
                }
            }
        });
    }
}

// Gérer File Handling API (association de fichiers)
function handleFileHandlingAPI() {
    if ('launchQueue' in window) {
        window.launchQueue.setConsumer(launchParams => {
            if (launchParams.files && launchParams.files.length > 0) {
                const file = launchParams.files[0];
                importSharedProject(file);
            }
        });
    }
}

// Importer les données d'un projet (depuis URL ou fichier)
function importProjectData(projectData) {
    try {
        // Valider les données
        if (!projectData.frames || !Array.isArray(projectData.frames)) {
            throw new Error('Données de projet invalides');
        }
        
        // Importer le projet
        const parsedFrames = typeof projectData.frames === 'string' ? JSON.parse(projectData.frames) : projectData.frames;
        frames = normaliseFrames(parsedFrames);
        currentFrame = Number.isInteger(projectData.currentFrame) ? projectData.currentFrame : 0;
        
        if (currentFrame >= frames.length) {
            currentFrame = 0;
        }
        
        // Importer les couleurs personnalisées
            customColors = [];
        const projectColors = projectData.customColors || projectData.custom_colors;
        if (projectColors) {
            const coloursArray = typeof projectColors === 'string' ? JSON.parse(projectColors) : projectColors;
            if (Array.isArray(coloursArray)) {
                coloursArray.forEach(color => addCustomColor(color));
            }
        }
        
        // Importer la palette personnalisée
        if (projectData.customPalette || projectData.custom_palette) {
            const paletteSource = projectData.customPalette || projectData.custom_palette;
            const paletteArray = typeof paletteSource === 'string' ? JSON.parse(paletteSource) : paletteSource;
            if (Array.isArray(paletteArray)) {
                customPalette = paletteArray;
            updateCompactPalette(); // Mettre à jour l'affichage
            }
        }
        
        if (projectData.fps) {
            animationFPS = projectData.fps;
        }
        
        // Mettre à jour l'interface
        const title = document.getElementById('projectTitle');
        if (title) {
            title.textContent = projectData.name || projectData.projectName || 'Projet partagé';
        }
        
        updateFramesList();
        loadFrame(currentFrame);
        
        // Notification de succès
        setTimeout(() => {
            alert(`✅ Projet "${projectData.name || 'Projet partagé'}" ouvert !`);
        }, 500);
        
    } catch (error) {
        console.error('Erreur lors de l\'import:', error);
        alert(`❌ Erreur lors de l'ouverture du projet partagé: ${error.message}`);
    }
}

// ========================================
// SYSTÈME DE PARTAGE DE PROJETS
// ========================================

// Créer un fichier projet optimisé pour le partage
function createShareableProject() {
    // Sauvegarder la frame courante avant l'export
    saveCurrentFrame();
    
    const projectData = {
        // Métadonnées
        name: document.getElementById('projectTitle')?.textContent || 'Pixel Art partagé',
        version: '2.0',
        type: 'pixel-art-project',
        created: new Date().toISOString(),
        author: 'Pixel Art Editor',
        
        // Données du projet
        frames: frames,
        currentFrame: currentFrame,
        customColors: customColors,
        customPalette: customPalette, // Ajouter la palette personnalisée
        fps: animationFPS || 24,
        
        // Informations pour la compatibilité
        gridSize: { width: 32, height: 32 },
        totalFrames: frames.length,
        
        // Signature pour vérifier l'intégrité
        signature: 'pixel-art-editor-v2'
    };
    
    return projectData;
}

// Partager un projet via Web Share API ou fallback
async function shareProject() {
    try {
        const projectData = createShareableProject();
        const jsonString = JSON.stringify(projectData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        const fileName = `${projectData.name.replace(/[^a-zA-Z0-9]/g, '_')}_${timestamp}.json`;
        
        logUsageEvent('share_initiated', {
            frames: frames.length,
            fps: animationFPS
        });
        
        // Vérifier si Web Share API est supportée et si on peut partager des fichiers
        if (navigator.share && navigator.canShare) {
            const file = new File([blob], fileName, { type: 'application/json' });
            
            if (navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: `🎨 ${projectData.name} - Pixel Art`,
                    text: `Découvre mon animation pixel art ! Ouvre ce fichier dans l'Éditeur Pixel Art pour la voir.`,
                    files: [file]
                });
+                logUsageEvent('share_completed', { method: 'native', frames: frames.length });
                return;
            }
        }
        
        // Fallback : téléchargement + options de partage
        showShareDialog(blob, fileName, projectData);
        
    } catch (error) {
        console.error('Erreur lors du partage:', error);
        alert('❌ Erreur lors du partage. Le fichier va être téléchargé à la place.');
        
        // Fallback ultime : simple téléchargement
        const projectData = createShareableProject();
        const jsonString = JSON.stringify(projectData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${projectData.name.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Interface de partage avec options
function showShareDialog(blob, fileName, projectData) {
    // Créer une URL de partage avec les données intégrées (pour iOS)
    const compressedData = btoa(JSON.stringify(projectData));
    const currentUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${currentUrl}?project=${encodeURIComponent(compressedData)}`;
    
    const shareContent = `
        <div class="share-content">
            <h3>📤 Partager "${projectData.name}"</h3>
            <p>Choisissez votre méthode de partage :</p>
            
            <div class="share-options">
                <button id="linkShare" class="share-option">
                    🔗 Partager par lien
                    <small>Lien direct - Fonctionne sur tous les appareils</small>
                </button>
                
                <button id="downloadShare" class="share-option">
                    📥 Télécharger (.json)
                    <small>Format standard - Compatible iOS/Android</small>
                </button>
                
                <button id="downloadTxtShare" class="share-option">
                    📄 Télécharger (.txt)
                    <small>Spécial iOS - Si .json est grisé</small>
                </button>
                
                <button id="emailShare" class="share-option">
                    📧 Partager par email
                    <small>Email avec lien et fichier</small>
                </button>
                
                <button id="messageShare" class="share-option">
                    💬 Partager par message
                    <small>SMS/iMessage avec lien</small>
                </button>
                
                <button id="gifExportShare" class="share-option">
                    🎬 Créer Animation GIF
                    <small>Partage visuel - Visible directement</small>
                </button>
            </div>
            
            <div class="share-instructions">
                <p><strong>💡 Guide iOS :</strong></p>
                <p><strong>Option 1 (Recommandée) :</strong> "🔗 Partager par lien" pour ouverture directe</p>
                <p><strong>Option 2 :</strong> Si les fichiers .json sont grisés, utilisez "📄 Télécharger (.txt)"</p>
                <ol>
                    <li>Téléchargez le fichier (.json ou .txt)</li>
                    <li>Dans l'app, cliquez "⬆️ Charger"</li>
                    <li>Si le fichier est grisé, changez pour .txt</li>
                    <li>Sélectionnez votre fichier</li>
                </ol>
            </div>
        </div>
    `;
    
    const dialog = createMobileDialog('📤 Partager le projet', shareContent);
    logUsageEvent('share_dialog_opened');
    
    // Partager par lien (recommandé pour iOS)
    dialog.querySelector('#linkShare').addEventListener('click', async () => {
+        logUsageEvent('share_option_selected', { method: 'link' });
        try {
            if (navigator.share) {
                // Utiliser l'API de partage native (iOS/Android)
                await navigator.share({
                    title: `🎨 ${projectData.name} - Pixel Art`,
                    text: `Découvre mon animation pixel art ! Clique sur le lien pour l'ouvrir directement dans l'Éditeur Pixel Art.`,
                    url: shareUrl
                });
            } else {
                // Fallback : copier le lien
                await navigator.clipboard.writeText(shareUrl);
                alert('🔗 Lien copié dans le presse-papier !\n\nCollez-le dans un message, email, etc.');
            }
            dialog.remove();
        } catch (error) {
            // Si le partage échoue, copier dans le presse-papier
            try {
                await navigator.clipboard.writeText(shareUrl);
                alert('🔗 Lien copié dans le presse-papier !');
                dialog.remove();
            } catch (clipboardError) {
                // Afficher le lien pour copie manuelle
                prompt('Copiez ce lien pour le partager:', shareUrl);
                dialog.remove();
            }
        }
    });
    
    // Partager par message
    dialog.querySelector('#messageShare').addEventListener('click', () => {
        logUsageEvent('share_option_selected', { method: 'message' });
        const messageText = encodeURIComponent(`🎨 Regarde mon animation pixel art "${projectData.name}" ! Clique ici pour l'ouvrir : ${shareUrl}`);
        window.open(`sms:?&body=${messageText}`);
        dialog.remove();
    });
    
    // Télécharger le fichier JSON
    dialog.querySelector('#downloadShare').addEventListener('click', () => {
+        logUsageEvent('share_option_selected', { method: 'download_json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        dialog.remove();
    });
    
    // Télécharger en format .txt pour iOS
    dialog.querySelector('#downloadTxtShare').addEventListener('click', () => {
+        logUsageEvent('share_option_selected', { method: 'download_txt' });
        const jsonString = JSON.stringify(projectData, null, 2);
        const txtBlob = new Blob([jsonString], { type: 'text/plain' });
        const txtFileName = fileName.replace('.json', '.txt');
        
        const url = URL.createObjectURL(txtBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = txtFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        dialog.remove();
    });
    
    // Partager par email
    dialog.querySelector('#emailShare').addEventListener('click', () => {
+        logUsageEvent('share_option_selected', { method: 'email' });
        const subject = encodeURIComponent(`🎨 ${projectData.name} - Animation Pixel Art`);
        const body = encodeURIComponent(`Salut !

J'ai créé une animation pixel art avec l'Éditeur Pixel Art et je voulais la partager avec toi !

🔗 Lien direct : ${shareUrl}

Clique sur le lien ci-dessus pour ouvrir directement le projet dans l'Éditeur Pixel Art !

Alternative : Le fichier "${fileName}" est aussi en pièce jointe si tu préfères le télécharger.

🎨 Amusez-vous bien !`);
        
        window.open(`mailto:?subject=${subject}&body=${body}`);
        
        // Également télécharger le fichier pour l'attacher
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        dialog.remove();
    });
    
    // Créer et partager un GIF
    dialog.querySelector('#gifExportShare').addEventListener('click', () => {
+        logUsageEvent('share_option_selected', { method: 'gif_export' });
        dialog.remove();
        // Lancer l'export GIF depuis le partage
        exportToGif();
    });
}

// Améliorer l'import pour accepter les projets partagés
async function importSharedProject(file) {
    try {
        const text = await file.text();
        let projectData;
        
        try {
            projectData = JSON.parse(text);
        } catch (e) {
            throw new Error('Le fichier n\'est pas un projet valide.');
        }
        
        // Vérifier que c'est bien un projet de pixel art
        if (!projectData.signature || projectData.signature !== 'pixel-art-editor-v2') {
            // Essayer le format ancien ou différent
            if (!projectData.frames) {
                throw new Error('Ce fichier ne contient pas de données de projet valides.');
            }
        }
        
        // Valider les données essentielles
        if (!Array.isArray(projectData.frames) || projectData.frames.length === 0) {
            throw new Error('Le projet ne contient pas de frames valides.');
        }
        
        // Confirmation avant import
        const projectName = projectData.name || 'Projet partagé';
        const frameCount = projectData.frames.length;
        const hasCustomColors = projectData.customColors && projectData.customColors.length > 0;
        
        const confirmMessage = `🎨 Importer "${projectName}" ?

📊 Détails :
• ${frameCount} frame${frameCount > 1 ? 's' : ''}
• ${hasCustomColors ? projectData.customColors.length + ' couleurs personnalisées' : 'Couleurs de base seulement'}
• Créé le ${projectData.created ? new Date(projectData.created).toLocaleDateString('fr-FR') : 'Date inconnue'}

⚠️ Cela remplacera votre projet actuel.`;
        
        if (!confirm(confirmMessage)) {
            return;
        }
        
        // Importer le projet
        frames = Array.isArray(projectData.frames) ? projectData.frames : [];
        currentFrame = Number.isInteger(projectData.currentFrame) ? projectData.currentFrame : 0;
        
        // Limiter currentFrame au nombre de frames disponibles
        if (currentFrame >= frames.length) {
            currentFrame = frames.length - 1;
        }
        
        // Importer les couleurs personnalisées
        if (projectData.customColors && Array.isArray(projectData.customColors)) {
            customColors = [];
            projectData.customColors.forEach(color => {
                addCustomColor(color);
            });
        }
        
        if (projectData.customPalette && Array.isArray(projectData.customPalette)) {
            customPalette = projectData.customPalette;
            updateCompactPalette();
        }
        
        if (projectData.fps) {
            animationFPS = projectData.fps;
        }
        
        // Mettre à jour l'interface
        const title = document.getElementById('projectTitle');
        if (title) {
            title.textContent = projectName;
        }
        
        updateFramesList();
        loadFrame(currentFrame);
        
        alert(`✅ Projet "${projectName}" importé avec succès !`);
        
    } catch (error) {
        console.error('Erreur lors de l\'import:', error);
        alert(`❌ Erreur lors de l'import : ${error.message}`);
    }
}

// Drag & Drop pour importer facilement
function initDragAndDrop() {
    const gridContainer = document.querySelector('.grid-container');
    const body = document.body;
    
    // Événements pour le drag & drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        body.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    // Feedback visuel
    ['dragenter', 'dragover'].forEach(eventName => {
        body.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        body.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight(e) {
        body.classList.add('drag-over');
    }
    
    function unhighlight(e) {
        body.classList.remove('drag-over');
    }
    
    // Gérer le drop
    body.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length > 0) {
            const file = files[0];
            
            // Vérifier que c'est un fichier valide (plus permissif pour iOS)
            if (file.type === 'application/json' || 
                file.type === 'text/plain' || 
                file.type === 'text/json' ||
                file.name.endsWith('.json') || 
                file.name.endsWith('.pixelart') || 
                file.name.endsWith('.txt')) {
                importSharedProject(file);
            } else {
                alert('❌ Veuillez déposer un fichier .json, .pixelart ou .txt');
            }
        }
    }
}

// Améliorer la fonction de chargement existante
async function loadFromFile() {
    console.log('🔍 loadFromFile appelée');
    // Afficher un dialogue avec options pour iOS
    showFileLoadDialog();
}

// Interface améliorée pour charger des fichiers (iOS friendly)
function showFileLoadDialog() {
    const loadContent = `
        <div class="load-content">
            <h3>📂 Charger un projet</h3>
            <p>Comment souhaitez-vous ouvrir votre projet ?</p>
            
            <div class="load-options">
                <button id="browseFiles" class="load-option">
                    📁 Parcourir les fichiers
                    <small>Sélectionner un fichier .pixelart depuis votre appareil</small>
                </button>
                
                <button id="pasteProject" class="load-option">
                    📋 Coller depuis le presse-papier
                    <small>Si vous avez copié un lien de projet</small>
                </button>
                
                <div class="drop-zone" id="dropZoneLoad">
                    📤 Ou glissez-déposez un fichier .pixelart ici
                </div>
            </div>
            
            <div class="load-instructions">
                <p><strong>💡 Pour iOS :</strong></p>
                <ul>
                    <li><strong>Fichiers reçus :</strong> Utilisez "Parcourir les fichiers" pour accéder à vos téléchargements</li>
                    <li><strong>Liens partagés :</strong> Copiez le lien puis utilisez "Coller depuis le presse-papier"</li>
                    <li><strong>AirDrop :</strong> Les fichiers reçus via AirDrop vont dans "Fichiers" → "Téléchargements"</li>
                </ul>
            </div>
        </div>
    `;
    
    const dialog = createMobileDialog('📂 Charger un projet', loadContent);
    
    // Parcourir les fichiers (méthode classique)
    dialog.querySelector('#browseFiles').addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        // Plus permissif pour iOS - accepter tous les fichiers JSON et texte
        input.accept = '.json,.txt,.pixelart,application/json,text/plain,text/json,*/*';
        
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                await importSharedProject(file);
                dialog.remove();
            }
        };
        
        input.click();
    });
    
    // Coller depuis le presse-papier
    dialog.querySelector('#pasteProject').addEventListener('click', async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            
            if (clipboardText.includes('?project=')) {
                // C'est un lien de projet
                const url = new URL(clipboardText);
                const projectData = url.searchParams.get('project');
                
                if (projectData) {
                    const decodedData = atob(decodeURIComponent(projectData));
                    const project = JSON.parse(decodedData);
                    
                    await importProjectData(project);
                    dialog.remove();
                    return;
                }
            }
            
            // Essayer de parser comme JSON direct
            try {
                const project = JSON.parse(clipboardText);
                if (project.frames) {
                    await importProjectData(project);
                    dialog.remove();
                    return;
                }
            } catch (e) {
                // Pas du JSON valide
            }
            
            alert('❌ Le contenu du presse-papier ne semble pas être un projet valide.\n\nAssurez-vous d\'avoir copié un lien de projet ou des données JSON.');
            
        } catch (error) {
            alert('❌ Impossible d\'accéder au presse-papier.\n\nVeuillez utiliser "Parcourir les fichiers" à la place.');
        }
    });
    
    // Zone de drop dans le dialogue
    const dropZone = dialog.querySelector('#dropZoneLoad');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
    });
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.add('drag-active');
        });
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.remove('drag-active');
        });
    });
    
    dropZone.addEventListener('drop', async (e) => {
        const files = e.dataTransfer.files;
        
        if (files.length > 0) {
            const file = files[0];
            
            // Plus permissif pour la compatibilité iOS
            if (file.type === 'application/json' || 
                file.type === 'text/plain' || 
                file.type === 'text/json' ||
                file.name.endsWith('.json') || 
                file.name.endsWith('.pixelart') || 
                file.name.endsWith('.txt')) {
                await importSharedProject(file);
                dialog.remove();
            } else {
                alert('❌ Veuillez déposer un fichier .json, .pixelart ou .txt');
            }
        }
    });
}

// ========================================
// EXPORT GIF ANIMÉ
// ========================================

// Exporter l'animation en GIF
async function exportToGif() {
    if (frames.length === 0) {
        alert('❌ Aucune frame à exporter !');
        return;
    }
    
    // Sauvegarder la frame courante
    saveCurrentFrame();
    
    // Interface de configuration du GIF
    showGifExportDialog();
}

// Interface de configuration pour l'export GIF
function showGifExportDialog() {
    const exportContent = `
        <div class="gif-export-content">
            <h3>🎬 Export Animation GIF</h3>
            <p>${frames.length} frame${frames.length > 1 ? 's' : ''} à exporter</p>
            
            <div class="gif-options">
                <div class="gif-option">
                    <label for="gifSize">📏 Taille du GIF :</label>
                    <select id="gifSize">
                        <option value="128" selected>128x128 (Petit - Rapide)</option>
                        <option value="256">256x256 (Moyen)</option>
                        <option value="512">512x512 (Grand - Plus lent)</option>
                        <option value="1024">1024x1024 (Très grand - Très lent)</option>
                    </select>
                </div>
                
                <div class="gif-option">
                    <label for="gifSpeed">⚡ Vitesse d'animation :</label>
                    <select id="gifSpeed">
                        <option value="100">Très rapide (0.1s)</option>
                        <option value="200">Rapide (0.2s)</option>
                        <option value="300" selected>Normal (0.3s)</option>
                        <option value="500">Lent (0.5s)</option>
                        <option value="1000">Très lent (1s)</option>
                    </select>
                </div>
                
                <div class="gif-option">
                    <label for="gifLoop">🔄 Répétition :</label>
                    <select id="gifLoop">
                        <option value="0" selected>Infinie</option>
                        <option value="1">1 fois</option>
                        <option value="3">3 fois</option>
                        <option value="5">5 fois</option>
                    </select>
                </div>
                
                <div class="gif-option">
                    <label for="gifQuality">✨ Qualité :</label>
                    <select id="gifQuality">
                        <option value="1">Maximale (très lent)</option>
                        <option value="5">Haute (lent)</option>
                        <option value="10" selected>Moyenne (recommandé)</option>
                        <option value="20">Rapide</option>
                    </select>
                </div>
            </div>
            
            <div class="gif-preview">
                <p><strong>Aperçu :</strong> Animation ${frames.length} frames</p>
                <div class="gif-preview-info">
                    <small>🎬 Votre GIF sera créé directement dans l'application !</small>
                    <br><small>⚡ Optimisé pour mobile - Sans workers pour éviter les blocages</small>
                    <br><small>⏱️ Temps estimé : ${frames.length < 5 ? '5-15 secondes' : frames.length < 10 ? '15-30 secondes' : '30-45 secondes'}</small>
                </div>
            </div>
            
            <div class="dialog-buttons">
                <button id="createGifBtn" class="dialog-button">🎬 Créer le GIF</button>
                <button id="cancelGifBtn" class="dialog-button secondary">Annuler</button>
            </div>
        </div>
    `;
    
    const dialog = createMobileDialog('🎬 Export GIF', exportContent);
    
    // Créer le GIF
    dialog.querySelector('#createGifBtn').addEventListener('click', async () => {
        const size = parseInt(dialog.querySelector('#gifSize').value);
        const speed = parseInt(dialog.querySelector('#gifSpeed').value);
        const repeat = parseInt(dialog.querySelector('#gifLoop').value);
        const quality = parseInt(dialog.querySelector('#gifQuality').value);
        
        dialog.remove();
        await createAnimatedGif(size, speed, repeat, quality);
    });
    
    // Annuler
    dialog.querySelector('#cancelGifBtn').addEventListener('click', () => {
        dialog.remove();
    });
}

// Créer le GIF animé avec les paramètres choisis
async function createAnimatedGif(size, frameDelay, repeat, quality) {
    // Message de progression
    const progressDiv = document.createElement('div');
    progressDiv.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: rgba(0, 122, 255, 0.95); color: white; padding: 20px;
        border-radius: 12px; text-align: center; z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    `;
    progressDiv.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 10px;">🎬</div>
        <div style="font-size: 1.2rem; margin-bottom: 5px;">Création du GIF...</div>
        <div id="progressText" style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 15px;">Préparation...</div>
        <div style="background: rgba(255,255,255,0.3); border-radius: 10px; height: 8px; margin-bottom: 10px;">
            <div id="progressBar" style="background: white; height: 100%; border-radius: 10px; width: 0%; transition: width 0.3s;"></div>
        </div>
        <button id="cancelExportBtn" style="background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.5); color: white; padding: 8px 16px; border-radius: 6px; cursor: pointer;">Annuler</button>
    `;
    document.body.appendChild(progressDiv);
    
    const progressText = progressDiv.querySelector('#progressText');
    const progressBar = progressDiv.querySelector('#progressBar');
    let cancelled = false;
    
    // Bouton d'annulation
    progressDiv.querySelector('#cancelExportBtn').addEventListener('click', () => {
        cancelled = true;
        progressDiv.remove();
    });

    try {
        // 🚀 TENTATIVE 1 : UTILISER SUPABASE EDGE FUNCTION
        progressText.textContent = 'Envoi vers serveur Supabase...';
        progressBar.style.width = '20%';
        
        const gifBlob = await createGifWithSupabase(frames, { size, frameDelay, repeat, quality });
        
        if (gifBlob && !cancelled) {
            progressDiv.remove();
            downloadGif(gifBlob, size, frameDelay);
            return;
        }
        
    } catch (supabaseError) {
        console.warn('🔄 Supabase Edge Function échouée, fallback vers gif.js:', supabaseError);
        
        // Si Supabase échoue, on essaie gif.js en fallback
        progressText.textContent = 'Serveur indisponible, traitement local...';
        progressBar.style.width = '10%';
        
        try {
            await createGifWithGifJS(frames, { size, frameDelay, repeat, quality }, progressText, progressBar, cancelled);
            if (!cancelled) {
                progressDiv.remove();
            }
        } catch (gifJsError) {
            console.error('❌ Échec complet gif.js et Supabase:', gifJsError);
            progressDiv.remove();
            alert(`❌ Erreur lors de la création du GIF :
            
🌐 Serveur : ${supabaseError.message}
💻 Local : ${gifJsError.message}

Veuillez réessayer plus tard.`);
        }
    }
}

// ========================================
// FONCTIONS EXPORT GIF AVEC SUPABASE
// ========================================

// Créer un GIF via Supabase Edge Function
async function createGifWithSupabase(frames, config) {
    try {
        console.log('🚀 Appel Supabase Edge Function pour création GIF');
        
        // Préparer les données pour l'Edge Function
        const payload = {
            frames: frames,
            config: config
        };
        
        // Vérifier si supabase est configuré
        if (typeof supabase === 'undefined') {
            throw new Error('Supabase non configuré');
        }
        
        // Appeler l'Edge Function
        const { data, error } = await supabase.functions.invoke('create-gif', {
            body: payload,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (error) {
            console.error('❌ Erreur Supabase Edge Function:', error);
            throw new Error(`Erreur serveur: ${error.message}`);
        }
        
        // Convertir la réponse en Blob
        const gifBlob = new Blob([data], { type: 'image/gif' });
        console.log('✅ GIF créé via Supabase:', { size: gifBlob.size });
        
        return gifBlob;
        
    } catch (error) {
        console.error('❌ Échec création GIF Supabase:', error);
        throw error;
    }
}

// Télécharger le GIF généré
function downloadGif(gifBlob, size, frameDelay) {
    try {
        // Générer nom de fichier
        const projectName = document.getElementById('projectTitle')?.textContent || 'animation';
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        const fileName = `${projectName.replace(/[^a-zA-Z0-9]/g, '_')}_${timestamp}.gif`;
        
        // Créer lien de téléchargement
        const url = URL.createObjectURL(gifBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Message de succès
        setTimeout(() => {
            alert(`🎉 GIF créé avec succès via serveur !

📁 Fichier: ${fileName}
🎬 ${frames.length} frames  
📏 Taille: ${size}x${size}
⚡ Vitesse: ${frameDelay}ms par frame
🚀 Traité par serveur Supabase

Votre animation GIF est prête ! 🎨`);
        }, 500);
        
        logUsageEvent('gif_exported', {
            name: projectName,
            frames: frames.length,
            size,
            frameDelay
        });
        
    } catch (error) {
        console.error('❌ Erreur téléchargement:', error);
        alert('❌ Erreur lors du téléchargement du GIF');
    }
}

// Créer un GIF avec gif.js (fallback)
async function createGifWithGifJS(frames, config, progressText, progressBar, cancelled) {
    return new Promise((resolve, reject) => {
        try {
            const { size, frameDelay, repeat, quality } = config;
            
            // Vérifier que gif.js est bien chargé
            if (typeof GIF === 'undefined') {
                reject(new Error('Bibliothèque GIF.js non chargée'));
                return;
            }
            
            console.log('🎬 Fallback vers gif.js:', { size, frameDelay, repeat, quality, frameCount: frames.length });
            progressText.textContent = 'Initialisation GIF local...';
            
            let gif;
            try {
                gif = new GIF({
                    workers: 0, // Pas de workers pour mobile
                    quality: Math.max(quality, 10),
                    width: size,
                    height: size,
                    repeat: repeat
                });
                
                console.log('✅ GIF object créé:', gif);
            } catch (error) {
                reject(new Error(`Erreur initialisation: ${error.message}`));
                return;
            }
            
            // Créer un canvas pour dessiner les frames
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            
            // Créer chaque frame pour le GIF
            for (let frameIndex = 0; frameIndex < frames.length; frameIndex++) {
                if (cancelled) {
                    reject(new Error('Opération annulée'));
                    return;
                }
                
                const frameProgress = (frameIndex / frames.length * 50); // 50% pour préparation
                progressText.textContent = `Frame locale ${frameIndex + 1}/${frames.length}...`;
                progressBar.style.width = `${10 + frameProgress}%`;
                
                // Effacer le canvas avec fond blanc
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, size, size);
                
                // Dessiner la grille de pixels
                const frame = frames[frameIndex];
                const pixelSize = size / 32;
                
                for (let row = 0; row < 32; row++) {
                    for (let col = 0; col < 32; col++) {
                        const pixelIndex = row * 32 + col;
                        let pixelColor = frame[pixelIndex];
                        
                        if (pixelColor && typeof pixelColor === 'string' && pixelColor !== '#FFFFFF') {
                            ctx.fillStyle = pixelColor;
                            ctx.fillRect(
                                col * pixelSize,
                                row * pixelSize,
                                pixelSize,
                                pixelSize
                            );
                        }
                    }
                }
                
                // Ajouter la frame au GIF
                console.log(`📸 Ajout frame locale ${frameIndex + 1}/${frames.length}`);
                gif.addFrame(canvas, { delay: frameDelay, copy: true });
            }
            
            if (cancelled) {
                reject(new Error('Opération annulée'));
                return;
            }
            
            // Générer le GIF final
            progressText.textContent = 'Création GIF local final...';
            progressBar.style.width = '60%';
            
            // Configuration des événements gif.js
            console.log('🔧 Configuration des événements GIF locaux...');
            
            gif.on('finished', function(blob) {
                console.log('🎉 GIF local terminé!', { size: blob.size, type: blob.type });
                
                // Télécharger le GIF (version fallback)
                const projectName = document.getElementById('projectTitle')?.textContent || 'animation';
                const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
                const fileName = `${projectName.replace(/[^a-zA-Z0-9]/g, '_')}_${timestamp}_local.gif`;
                
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                // Message de succès fallback
                setTimeout(() => {
                    alert(`🎉 GIF créé en mode local !

📁 Fichier: ${fileName}
🎬 ${frames.length} frames  
📏 Taille: ${size}x${size}
⚡ Vitesse: ${frameDelay}ms par frame
💻 Traité localement (fallback)

Votre animation GIF est prête ! 🎨`);
                }, 500);
                
                resolve(blob);
            });
            
            gif.on('progress', function(progress) {
                const percent = Math.round(progress * 100);
                const totalProgress = 60 + (progress * 40);
                console.log(`📊 Progression locale: ${percent}% (total: ${totalProgress}%)`);
                progressText.textContent = `Génération GIF local... ${percent}%`;
                progressBar.style.width = `${totalProgress}%`;
            });
            
            gif.on('start', function() {
                console.log('🚀 Début génération GIF locale');
            });
            
            gif.on('abort', function() {
                console.log('❌ GIF génération locale annulée');
                reject(new Error('Génération locale annulée'));
            });
            
            gif.on('error', function(error) {
                console.error('❌ Erreur gif.js:', error);
                reject(new Error(`Erreur gif.js: ${error.message || 'Erreur inconnue'}`));
            });
            
            // Lancer la génération
            console.log('🎬 Lancement gif.render() local...');
            gif.render();
            
        } catch (error) {
            console.error('❌ Erreur dans createGifWithGifJS:', error);
            reject(error);
        }
    });
}

function ensureProfileModalDOM() {
    if (document.getElementById('profileModal')) return;

    const modal = document.createElement('div');
    modal.id = 'profileModal';
    modal.className = 'modal profile-modal';
    modal.style.display = 'none';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Mon profil créatif</h3>
                <button type="button" id="closeProfileModal" class="close-btn" aria-label="Fermer">✕</button>
            </div>
            <div class="modal-body">
                <p class="profile-intro">Ces informations sont 100% optionnelles. Elles nous aident à orienter les améliorations de l'éditeur (tutos, interface, fonctionnalités). Vous pouvez les modifier ou les effacer à tout moment.</p>
                <form id="profileForm" class="profile-form">
                    <div class="profile-form-row">
                        <label for="profileAgeRange">Tranche d'âge</label>
                        <select id="profileAgeRange" name="age_range">
                            <option value="">Préférer ne pas répondre</option>
                            <option value="under_18">Moins de 18 ans</option>
                            <option value="18_24">18 – 24 ans</option>
                            <option value="25_34">25 – 34 ans</option>
                            <option value="35_44">35 – 44 ans</option>
                            <option value="45_54">45 – 54 ans</option>
                            <option value="55_64">55 – 64 ans</option>
                            <option value="65_plus">65 ans et plus</option>
                        </select>
                    </div>
                    <div class="profile-form-row">
                        <label for="profileGender">Identité de genre</label>
                        <select id="profileGender" name="gender">
                            <option value="">Préférer ne pas répondre</option>
                            <option value="female">Femme</option>
                            <option value="male">Homme</option>
                            <option value="non_binary">Non binaire</option>
                            <option value="other">Autre</option>
                        </select>
                    </div>
                    <div class="profile-form-row">
                        <label for="profileCountry">Pays</label>
                        <input type="text" id="profileCountry" name="country" placeholder="France, Canada…" autocomplete="country-name">
                    </div>
                    <div class="profile-form-row">
                        <label for="profileRegion">Région / Ville</label>
                        <input type="text" id="profileRegion" name="region" placeholder="Île-de-France, Québec…" autocomplete="address-level1">
                    </div>
                    <div class="profile-form-actions">
                        <button type="button" id="skipProfile" class="dialog-button secondary">Plus tard</button>
                        <button type="submit" class="dialog-button">Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function initProfileModal() {
    ensureProfileModalDOM();

    if (profileModalInitialized) return;
    profileModalInitialized = true;

    const form = document.getElementById('profileForm');
    const skipBtn = document.getElementById('skipProfile');
    const closeBtn = document.getElementById('closeProfileModal');

    if (form && !form.dataset.bound) {
        form.addEventListener('submit', submitProfileForm);
        form.dataset.bound = 'true';
    }

    skipBtn?.addEventListener('click', () => {
        const shouldDismiss = profileModalContext === 'prompt';
        if (shouldDismiss) {
            logUsageEvent('profile_skipped');
        }
        closeProfileModal(shouldDismiss);
    });

    closeBtn?.addEventListener('click', () => {
        const shouldDismiss = profileModalContext === 'prompt';
        closeProfileModal(shouldDismiss);
    });
}

function populateProfileForm(profile = {}) {
    const ageSelect = document.getElementById('profileAgeRange');
    const genderSelect = document.getElementById('profileGender');
    const countryInput = document.getElementById('profileCountry');
    const regionInput = document.getElementById('profileRegion');

    if (!ageSelect || !genderSelect || !countryInput || !regionInput) return;

    ageSelect.value = profile.age_range || '';
    genderSelect.value = profile.gender || '';
    countryInput.value = profile.country || '';
    regionInput.value = profile.region || '';
}

function openProfileModal(manual = false) {
    initProfileModal();
    profilePromptHasBeenShown = profilePromptHasBeenShown || manual;
    profileModalContext = manual ? 'manual' : 'prompt';

    const modal = document.getElementById('profileModal');
    if (!modal) return;

    populateProfileForm(currentUserProfile || {});
    modal.style.display = 'flex';

    logUsageEvent('profile_opened', { context: manual ? 'manual' : 'prompt' });
}

function closeProfileModal(dismiss = false) {
    const modal = document.getElementById('profileModal');
    if (!modal) return;

    modal.style.display = 'none';
    if (dismiss) {
        localStorage.setItem(PROFILE_PROMPT_DISMISSED_KEY, 'true');
        profilePromptHasBeenShown = true;
    }
    profileModalContext = 'manual';
}

async function submitProfileForm(event) {
    event.preventDefault();

    const form = event.target;
    const profileData = {
        age_range: form.age_range.value || '',
        gender: form.gender.value || '',
        country: form.country.value.trim() || '',
        region: form.region.value.trim() || ''
    };

    try {
        const result = await window.dbService.saveUserProfile(profileData);
        if (result.success) {
            currentUserProfile = result.data;
            window.currentUserProfile = currentUserProfile;
            localStorage.removeItem(PROFILE_PROMPT_DISMISSED_KEY);
            profilePromptHasBeenShown = true;
            closeProfileModal(false);
            if (typeof showNotification === 'function') {
                showNotification('Profil mis à jour ✅', 'success');
            } else {
                alert('Profil mis à jour ✅');
            }
            logUsageEvent('profile_saved', {
                age_range: result.data.age_range,
                gender: result.data.gender,
                country: result.data.country,
                region: result.data.region
            });
        } else {
            throw new Error(result.error || 'Erreur inconnue');
        }
    } catch (error) {
        console.error('Erreur sauvegarde profil:', error);
        if (typeof showNotification === 'function') {
            showNotification('Impossible d\'enregistrer le profil', 'error');
        } else {
            alert('❌ Impossible d\'enregistrer le profil.');
        }
    }
}

async function initUserProfileFlow(forceOpen = false) {
    initProfileModal();

    let modalAlreadyOpened = false;
    if (forceOpen) {
        profilePromptHasBeenShown = true;
        openProfileModal(true);
        modalAlreadyOpened = true;
    }

    try {
        const result = await window.dbService.getUserProfile();
        if (result.success) {
            currentUserProfile = result.data;
            window.currentUserProfile = currentUserProfile;
            if (modalAlreadyOpened) {
                populateProfileForm(currentUserProfile || {});
            }
        }
    } catch (error) {
        console.warn('Impossible de récupérer le profil utilisateur:', error);
    }

    if (forceOpen) {
        return;
    }

    const dismissed = localStorage.getItem(PROFILE_PROMPT_DISMISSED_KEY) === 'true';
    const hasProfile = currentUserProfile && Object.values(currentUserProfile).some(value => !!value);

    if (!hasProfile && !dismissed && !profilePromptHasBeenShown) {
        profilePromptHasBeenShown = true;
        setTimeout(() => {
            openProfileModal(false);
            logUsageEvent('profile_prompt_shown');
        }, 800);
    }

    // Exposer pour les autres scripts
    window.currentUserProfile = currentUserProfile;
}

window.initUserProfileFlow = initUserProfileFlow;



