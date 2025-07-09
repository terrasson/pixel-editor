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
let autoSaveProjects = []; // Projets sauvegardés automatiquement en local
const maxAutoSaveProjects = 10; // Nombre maximum de projets auto-sauvegardés

// Variables pour l'animation
let isAnimationPlaying = false;
let animationInterval = null;

// Variables pour l'historique undo/redo
let history = []; // Historique des états de la frame courante
let historyIndex = -1; // Index actuel dans l'historique
const maxHistorySize = 50; // Nombre maximum d'étapes dans l'historique
let hasDrawnInCurrentAction = false; // Pour éviter les sauvegardes multiples pendant une action

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
    // Sauvegarder l'état avant de commencer à dessiner (seulement si pas déjà fait)
    if (!hasDrawnInCurrentAction) {
        saveToHistory();
        hasDrawnInCurrentAction = true;
    }
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
    isDrawing = false;
    hasDrawnInCurrentAction = false; // Réinitialiser pour la prochaine action
}

// Gestion des couleurs
function toggleEraser() {
    isErasing = !isErasing;
    const eraserBtn = document.getElementById('eraserBtn');
    if (eraserBtn) {
        eraserBtn.classList.toggle('active');
    }
    document.getElementById('pixelGrid')?.classList.toggle('eraser-mode');
}

// Fonctions pour gérer les couleurs personnalisées
function loadCustomColors() {
    const saved = localStorage.getItem('pixelEditor_customColors');
    if (saved) {
        customColors = JSON.parse(saved);
    }
}

function saveCustomColors() {
    localStorage.setItem('pixelEditor_customColors', JSON.stringify(customColors));
}

// Fonctions Supabase pour la sauvegarde en ligne
let currentProjectId = null; // ID du projet actuel pour les mises à jour

async function loadSupabaseProjects() {
    try {
        autoSaveProjects = await supabase.getProjects();
        console.log(`📱 ${autoSaveProjects.length} projets chargés depuis Supabase`);
    } catch (error) {
        console.error('Erreur chargement projets:', error);
        // Fallback vers localStorage si Supabase ne fonctionne pas
        loadAutoSaveProjects();
    }
}

async function saveToSupabase(projectData) {
    try {
        if (currentProjectId) {
            // Mise à jour du projet existant
            const updated = await supabase.updateProject(currentProjectId, {
                ...projectData,
                updated_at: new Date().toISOString()
            });
            console.log('✅ Projet mis à jour sur Supabase');
            return updated[0];
        } else {
            // Création d'un nouveau projet
            const created = await supabase.createProject({
                ...projectData,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            });
            currentProjectId = created[0].id;
            console.log('✅ Nouveau projet créé sur Supabase');
            return created[0];
        }
    } catch (error) {
        console.error('Erreur sauvegarde Supabase:', error);
        // Fallback vers localStorage
        autoSaveProjectLocal(projectData.name);
        throw error;
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
    try {
        // Charger depuis Supabase d'abord
        await loadSupabaseProjects();
    } catch (error) {
        // Si Supabase échoue, utiliser localStorage
        loadAutoSaveProjects();
    }
    
    if (autoSaveProjects.length === 0) {
        alert('📱 Aucun projet trouvé.\n\nCommencez à dessiner et vos projets seront automatiquement sauvegardés en ligne ! 🌐');
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
        <div class="projects-list">
            ${projectsList}
        </div>
        <div style="margin-top: 10px; display: flex; gap: 8px;">
            <button id="loadLocalProject" class="dialog-button" disabled>Charger</button>
            <button id="deleteLocalProject" class="dialog-button secondary" disabled>Supprimer</button>
            <button id="cancelLocalLoad" class="dialog-button secondary">Fermer</button>
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
    loadBtn.addEventListener('click', () => {
        if (selectedProject) {
            const project = autoSaveProjects[selectedProject.index];
            
            // Compatible Supabase (JSON stringifié) et localStorage (objets directs)
            frames = typeof project.frames === 'string' ? JSON.parse(project.frames) : project.frames;
            currentFrame = project.current_frame || project.currentFrame || 0;
            
            if (project.custom_colors || project.customColors) {
                const colors = project.custom_colors || project.customColors;
                const projectColors = typeof colors === 'string' ? JSON.parse(colors) : colors;
                
                // Réintégrer les couleurs du projet avec les couleurs de base
                customColors = []; // Vider d'abord
                
                // Ajouter les couleurs du projet qui ne sont pas des couleurs de base
                projectColors.forEach(color => {
                    addCustomColor(color); // Cette fonction vérifie déjà les doublons et exclut les couleurs de base
                });
            }
            
            // Définir l'ID du projet actuel pour les futures sauvegardes
            currentProjectId = project.id;
            
            const title = document.getElementById('projectTitle');
            if (title) {
                title.textContent = project.name || 'Projet sans nom';
            }
            
            updateFramesList();
            loadFrame(currentFrame);
            
            // S'assurer que les miniatures sont correctement mises à jour
            setTimeout(() => updateAllThumbnails(), 100);
            
            dialog.remove();
            alert('✅ Projet chargé avec succès !');
        }
    });

    // Supprimer le projet sélectionné
    deleteBtn.addEventListener('click', async () => {
        if (selectedProject && confirm('Supprimer ce projet définitivement ?')) {
            const project = autoSaveProjects[selectedProject.index];
            
            try {
                // Supprimer de Supabase si c'est un projet en ligne
                if (project.id && typeof project.id === 'number') {
                    await supabase.deleteProject(project.id);
                    console.log('✅ Projet supprimé de Supabase');
                } else {
                    // Supprimer du localStorage pour les projets locaux
                    autoSaveProjects.splice(selectedProject.index, 1);
                    localStorage.setItem('pixelEditor_autoSaveProjects', JSON.stringify(autoSaveProjects));
                }
                
                dialog.remove();
                showLocalProjects(); // Rafraîchir la liste
                
            } catch (error) {
                console.error('Erreur suppression:', error);
                alert('Erreur lors de la suppression. Veuillez réessayer.');
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
    
    // Vider la palette actuelle
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
            document.getElementById('colorPicker').value = color;
            isErasing = false;
            const eraserBtn = document.getElementById('eraserBtn');
            if (eraserBtn) {
                eraserBtn.classList.remove('active');
                document.getElementById('pixelGrid')?.classList.remove('eraser-mode');
            }
        });
        presetColors.appendChild(btn);
    });
    
    // Ajouter les couleurs personnalisées en plus (limitées à 6 pour ne pas surcharger)
    const maxPersonalizedColors = 6;
    customColors.slice(0, maxPersonalizedColors).forEach(color => {
        // Ne pas ajouter si c'est déjà une couleur de base
        if (!defaultColors.includes(color.toUpperCase())) {
            const btn = document.createElement('button');
            btn.className = 'color-btn custom-color';
            btn.style.backgroundColor = color;
            btn.title = `Couleur personnalisée: ${color}`;
            btn.addEventListener('click', () => {
                currentColor = color;
                document.getElementById('colorPicker').value = color;
                isErasing = false;
                const eraserBtn = document.getElementById('eraserBtn');
                if (eraserBtn) {
                    eraserBtn.classList.remove('active');
                    document.getElementById('pixelGrid')?.classList.remove('eraser-mode');
                }
            });
            presetColors.appendChild(btn);
        }
    });
}

// Fonction améliorée pour gérer la gomme avec les couleurs personnalisées
function initColorPicker() {
    const colorPicker = document.getElementById('colorPicker');
    const eraserBtn = document.getElementById('eraserBtn');
    const validateBtn = document.getElementById('validateColorBtn');
    
    let pendingColor = null; // Couleur en attente de validation
    
    // Quand la couleur change, on la marque comme en attente
    colorPicker.addEventListener('input', (e) => {
        pendingColor = e.target.value;
        currentColor = e.target.value;
        isErasing = false;
        if (eraserBtn) {
            eraserBtn.classList.remove('active');
            document.getElementById('pixelGrid')?.classList.remove('eraser-mode');
        }
        
        // Activer le bouton de validation s'il y a une couleur en attente
        if (validateBtn && !isPredefinedColor(pendingColor)) {
            validateBtn.disabled = false;
            validateBtn.title = `Valider la couleur ${pendingColor}`;
        } else {
            validateBtn.disabled = true;
            validateBtn.title = 'Couleur déjà dans la palette';
        }
    });
    
    // Valider la couleur avec le bouton
    if (validateBtn) {
        validateBtn.addEventListener('click', () => {
            if (pendingColor && !isPredefinedColor(pendingColor)) {
                addCustomColor(pendingColor);
                pendingColor = null;
                validateBtn.disabled = true;
                validateBtn.title = 'Couleur ajoutée à la palette !';
                setTimeout(() => {
                    validateBtn.title = 'Valider une nouvelle couleur';
                }, 1500);
            }
        });
        
        // Initialiser le bouton comme désactivé
        validateBtn.disabled = true;
        validateBtn.title = 'Choisissez une couleur puis validez';
    }

    // Note: Les event listeners pour les boutons de couleur sont maintenant gérés dans updateColorPalette()
}

// ========================================
// SYSTÈME UNDO/REDO
// ========================================

// Sauvegarder l'état actuel dans l'historique
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

// Restaurer un état depuis l'historique
function restoreFromHistory(state) {
    const pixels = document.querySelectorAll('.pixel');
    
    state.forEach((pixelData, i) => {
        if (pixels[i]) {
            pixels[i].style.backgroundColor = pixelData.color;
            if (pixelData.isEmpty) {
                pixels[i].classList.add('empty');
            } else {
                pixels[i].classList.remove('empty');
            }
        }
    });
    
    // Sauvegarder la frame courante avec le nouvel état
    saveCurrentFrame();
}

// Fonction Undo (annuler)
function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        restoreFromHistory(history[historyIndex]);
        updateUndoRedoButtons();
    }
}

// Fonction Redo (rétablir)
function redo() {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        restoreFromHistory(history[historyIndex]);
        updateUndoRedoButtons();
    }
}

// Mettre à jour l'état des boutons undo/redo
function updateUndoRedoButtons() {
    const undoBtn = document.getElementById('undoBtn');
    const redoBtn = document.getElementById('redoBtn');
    
    if (undoBtn) {
        undoBtn.disabled = historyIndex <= 0;
        undoBtn.title = historyIndex <= 0 ? 'Rien à annuler' : `Annuler (${historyIndex} actions disponibles)`;
    }
    
    if (redoBtn) {
        redoBtn.disabled = historyIndex >= history.length - 1;
        redoBtn.title = historyIndex >= history.length - 1 ? 'Rien à rétablir' : `Rétablir (${history.length - historyIndex - 1} actions disponibles)`;
    }
}

// Initialiser l'historique avec l'état vide
function initHistory() {
    history = [];
    historyIndex = -1;
    
    // Sauvegarder l'état initial (grille vide)
    saveToHistory();
    
    // Configurer les event listeners pour les boutons
    const undoBtn = document.getElementById('undoBtn');
    const redoBtn = document.getElementById('redoBtn');
    
    if (undoBtn) {
        undoBtn.addEventListener('click', undo);
    }
    
    if (redoBtn) {
        redoBtn.addEventListener('click', redo);
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
    
    // Sauvegarder l'état initial de la nouvelle frame dans l'historique
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
    
    // Adapter la résolution selon la taille de l'écran
    let thumbnailSize = 16; // Par défaut 16x16
    if (window.innerWidth <= 360 || (window.innerHeight <= 500 && window.matchMedia('(orientation: landscape)').matches)) {
        thumbnailSize = 12; // 12x12 pour les petits écrans
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
            frames: JSON.stringify(frames),
            current_frame: currentFrame,
            custom_colors: JSON.stringify(customColors),
            device_info: navigator.userAgent.substring(0, 100)
        };

        // Sauvegarder sur Supabase
        await saveToSupabase(projectData);
        
        // Mettre à jour le titre du projet
        const titleElement = document.getElementById('projectTitle');
        if (titleElement) {
            titleElement.textContent = projectName;
        }
        
        alert('✅ Projet sauvegardé sur Supabase !');
        
    } catch (err) {
        console.error('Erreur lors de la sauvegarde:', err);
        alert('❌ Erreur lors de la sauvegarde. Vérifiez votre configuration Supabase.');
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

async function loadFromFile() {
    // Chargement direct depuis Supabase - même fonction que "Mes projets"
    await showLocalProjects();
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
    previewBtn.innerHTML = '⏹️';
    previewBtn.title = 'Arrêter l\'animation';
    previewBtn.classList.add('playing');
    
    let frameIndex = 0;
    
    animationInterval = setInterval(() => {
        // Nettoyer les marqueurs pendant l'animation
        cleanUpMarkers();
        
        // Vérifier que la frame existe
        if (!frames[frameIndex] || frames[frameIndex].length === 0) {
            frameIndex = (frameIndex + 1) % frames.length;
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
        
    }, 300); // 300ms par frame pour une animation fluide
}

function stopAnimation() {
    if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
    }
    
    isAnimationPlaying = false;
    const previewBtn = document.getElementById('previewBtn');
    previewBtn.innerHTML = '▶️';
    previewBtn.title = 'Lancer l\'animation';
    previewBtn.classList.remove('playing');
    
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

// Ajouter ces styles CSS directement dans le JavaScript
const styleSheet = document.createElement('style');
styleSheet.textContent = `
#pixelGrid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(32, 18px);
    grid-template-rows: repeat(32, 18px);
    gap: 1px;
    background-color: #ddd;
    padding: 1px;
    border: 1px solid #999;
}

.pixel {
    width: 100%;
    height: 100%;
    background-color: white;
    position: relative;
    border: none;
}

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
    const helpContent = `
        <div class="help-content">
            <h2>🎨 Guide d'utilisation - Éditeur Pixel Art</h2>
            
            <div class="help-section">
                <h3>🖌️ Outils de dessin</h3>
                <div class="help-item">
                    <strong>Sélecteur de couleur:</strong> Choisissez votre couleur avec le nuancier coloré
                </div>
                <div class="help-item">
                    <strong>Bouton ✓ (Valider):</strong> Après avoir choisi une couleur, cliquez sur ✓ pour l'ajouter à votre palette personnalisée
                </div>
                <div class="help-item">
                    <strong>Gomme:</strong> Cliquez sur "Gomme" pour effacer des pixels (les rend blancs)
                </div>
                <div class="help-item">
                    <strong>Palette de couleurs:</strong> 
                    <br>• Couleurs de base (8 couleurs prédéfinies)
                    <br>• Couleurs personnalisées (marquées avec ★, jusqu'à 6 couleurs)
                </div>
            </div>

            <div class="help-section">
                <h3>↶↷ Annuler / Rétablir</h3>
                <div class="help-item">
                    <strong>Bouton ↶ (Annuler):</strong> Revient en arrière sur votre dernière action de dessin
                </div>
                <div class="help-item">
                    <strong>Bouton ↷ (Rétablir):</strong> Revient en avant si vous êtes revenu trop loin en arrière
                </div>
                <div class="help-item">
                    <strong>Raccourcis clavier:</strong>
                    <br>• <kbd>Ctrl+Z</kbd> = Annuler
                    <br>• <kbd>Ctrl+Y</kbd> ou <kbd>Ctrl+Shift+Z</kbd> = Rétablir
                </div>
                <div class="help-item">
                    <strong>Historique:</strong> Jusqu'à 50 actions mémorisées par frame
                </div>
            </div>

            <div class="help-section">
                <h3>🎬 Système de Frames (Animation)</h3>
                <div class="help-item">
                    <strong>+ Nouvelle Frame:</strong> Ajoute une frame vide pour créer une animation
                </div>
                <div class="help-item">
                    <strong>Miniatures:</strong> Cliquez sur une miniature pour changer de frame
                </div>
                <div class="help-item">
                    <strong>Indicateurs visuels:</strong>
                    <br>• ○ = Pixels de la frame précédente (référence)
                    <br>• ○○ = Pixels de la frame suivante (aperçu)
                </div>
                <div class="help-item">
                    <strong>Bouton ▶️:</strong> Lance l'animation / ⏹️ pour l'arrêter
                </div>
                <div class="help-item">
                    <strong>Supprimer Frame:</strong> Supprime la frame actuelle (minimum 1 frame)
                </div>
                <div class="help-item">
                    <strong>Copier/Coller:</strong> Dupliquez une frame pour créer des variations
                </div>
            </div>

            <div class="help-section">
                <h3>💾 Sauvegarde et chargement</h3>
                <div class="help-item">
                    <strong>💾 Sauvegarder:</strong> Sauve votre projet sur Supabase (cloud)
                    <br>• Frames et position actuelle
                    <br>• Couleurs personnalisées
                    <br>• Accessible depuis tous vos appareils
                </div>
                <div class="help-item">
                    <strong>📂 Charger:</strong> Charge un fichier JSON depuis votre appareil
                </div>
                <div class="help-item">
                    <strong>🌐 Mes projets:</strong> Liste de vos projets sauvegardés en ligne
                    <br>• Synchronisés entre appareils
                    <br>• Sauvegarde automatique des couleurs personnalisées
                </div>
                <div class="help-item">
                    <strong>🗑️ Effacer tout:</strong> Remet la grille à zéro
                </div>
            </div>

            <div class="help-section">
                <h3>📱 Interface mobile</h3>
                <div class="help-item">
                    <strong>Menu ☰:</strong> Cliquez pour afficher/masquer les outils sur mobile
                </div>
                <div class="help-item">
                    <strong>Dessin tactile:</strong> Dessinez directement avec votre doigt
                </div>
                <div class="help-item">
                    <strong>Interface adaptative:</strong> S'adapte automatiquement à votre écran
                </div>
                <div class="help-item">
                    <strong>Rotation:</strong> Fonctionne en mode portrait et paysage
                </div>
            </div>

            <div class="help-section">
                <h3>💡 Conseils d'utilisation</h3>
                <div class="help-item">
                    <strong>Couleurs personnalisées:</strong> Choisissez d'abord votre couleur, puis validez avec ✓ pour l'ajouter
                </div>
                <div class="help-item">
                    <strong>Animation fluide:</strong> Créez plusieurs frames avec de légères variations
                </div>
                <div class="help-item">
                    <strong>Erreurs de dessin:</strong> Utilisez Ctrl+Z ou le bouton ↶ pour corriger rapidement
                </div>
                <div class="help-item">
                    <strong>Changement de frame:</strong> L'historique undo/redo se réinitialise à chaque frame
                </div>
                <div class="help-item">
                    <strong>Sauvegarde:</strong> Vos couleurs personnalisées sont automatiquement sauvegardées avec vos projets
                </div>
            </div>

            <div class="help-section">
                <h3>🔧 Informations techniques</h3>
                <div class="help-item">
                    <strong>Grille:</strong> 32×32 pixels (1024 pixels total)
                </div>
                <div class="help-item">
                    <strong>Couleurs personnalisées:</strong> Maximum 6 couleurs en plus des 8 de base
                </div>
                <div class="help-item">
                    <strong>Historique:</strong> 50 actions mémorisées par frame
                </div>
                <div class="help-item">
                    <strong>Animation:</strong> 300ms par frame (environ 3.3 FPS)
                </div>
                <div class="help-item">
                    <strong>Sauvegarde:</strong> Base de données Supabase pour synchronisation multi-appareils
                </div>
            </div>
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
    const modal = document.createElement('div');
    modal.className = 'credits-modal';
    
    const content = document.createElement('div');
    content.className = 'credits-content';
    
    content.innerHTML = `
        <h2>Éditeur de Pixels - Crédits</h2>
        <div class="credits-section">
            <h3>Version</h3>
            <p>Version 1.0.0 (Février 2025)</p>
        </div>
        <div class="credits-section">
            <h3>Développement</h3>
            <p>Frédéric Terrasson - Développeur principal</p>
            <p>Contact : monstertaz06@gmail.com</p>
            <p>Claude AI - Assistant de développement</p>
        </div>
        <div class="credits-section">
            <h3>Fonctionnalités</h3>
            <ul>
                <li>Création d'animations pixel par pixel</li>
                <li>Système multi-frames avec prévisualisation</li>
                <li>Outils de dessin avancés (pinceau, gomme)</li>
                <li>Gestion intuitive des frames (copier/coller, glisser-déposer)</li>
                <li>Visualisation des frames précédentes</li>
            </ul>
        </div>
        <div class="credits-section">
            <h3>Date de création</h3>
            <p>2 Février 2025</p>
        </div>
        <div class="credits-section">
            <h3>Copyright et Licence</h3>
            <p>© 2025 Frédéric Terrasson. Tous droits réservés.</p>
            <p>Ce logiciel est protégé par le droit d'auteur et les traités internationaux.</p>
            <p>Licence : Creative Commons Attribution-NonCommercial 4.0 International</p>
            <ul class="license-terms">
                <li>Vous êtes autorisé à utiliser ce logiciel librement à des fins non commerciales</li>
                <li>Toute modification ou redistribution doit mentionner l'auteur original</li>
                <li>L'utilisation commerciale nécessite une autorisation écrite de l'auteur</li>
            </ul>
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
        const projectName = projectNameInput.value || 'pixel_animation';
        const projectData = {
            frames: frames,
            currentFrame: currentFrame,
            version: '1.0.0',
            date: new Date().toISOString()
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

// Fonction pour sauvegarder sur le serveur
async function saveToServer() {
    try {
        const fileName = await showSaveDialog();
        if (!fileName) return;

        const data = {
            name: fileName,
            frames: frames,
            currentFrame: currentFrame,
            customColors: customColors
        };

        const response = await fetch('/api/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        
        if (result.success) {
            alert('Projet sauvegardé sur le serveur avec succès !');
        } else {
            alert('Erreur lors de la sauvegarde: ' + result.error);
        }
    } catch (err) {
        console.error('Erreur lors de la sauvegarde:', err);
        alert('Erreur lors de la sauvegarde. Veuillez réessayer.');
    }
}

// Fonction pour charger depuis le serveur
async function loadFromServer() {
    try {
        const projects = await fetch('/api/projects').then(res => res.json());
        
        if (projects.length === 0) {
            alert('Aucun projet sauvegardé trouvé.');
            return;
        }

        const projectList = projects.map(p => 
            `${p.name} (${new Date(p.lastModified).toLocaleDateString()})`
        ).join('\n');

        const projectName = prompt(
            'Projets disponibles:\n' + projectList + '\n\nEntrez le nom du projet à charger:'
        );

        if (!projectName) return;

        const project = projects.find(p => p.name === projectName);
        if (!project) {
            alert('Projet non trouvé.');
            return;
        }

        const response = await fetch(`/api/load/${project.filename}`);
        const data = await response.json();

        frames = data.frames;
        currentFrame = data.currentFrame;
        
        // Charger les couleurs personnalisées si elles existent
        if (data.customColors) {
            customColors = data.customColors;
            saveCustomColors();
            updateColorPalette();
        }
        
        const title = document.getElementById('projectTitle');
        if (title) {
            title.textContent = data.name || 'Projet sans nom';
        }
        
        updateFramesList();
        loadFrame(currentFrame);
        
        alert('Projet chargé avec succès !');
    } catch (err) {
        console.error('Erreur lors du chargement:', err);
        alert('Erreur lors du chargement. Veuillez réessayer.');
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
        
        // Changer l'icône du bouton
        if (toolbar.classList.contains('visible')) {
            menuButton.innerHTML = '✕';
            menuButton.title = 'Cacher les outils';
        } else {
            menuButton.innerHTML = '☰';
            menuButton.title = 'Afficher les outils';
        }
    }
}

function adjustForOrientation() {
    // Ajuster la grille selon l'orientation
    const grid = document.getElementById('pixelGrid');
    const container = document.querySelector('.grid-container');
    
    if (window.innerHeight < window.innerWidth) {
        // Mode paysage - optimiser pour la largeur
        const maxSize = Math.min(window.innerHeight * 0.7, window.innerWidth * 0.6);
        grid.style.maxWidth = `${maxSize}px`;
        grid.style.maxHeight = `${maxSize}px`;
    } else {
        // Mode portrait - optimiser pour la hauteur
        const maxSize = Math.min(window.innerWidth * 0.9, window.innerHeight * 0.5);
        grid.style.maxWidth = `${maxSize}px`;
        grid.style.maxHeight = `${maxSize}px`;
    }
}

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

// Initialisation de tous les event listeners
function initEventListeners() {
    // Boutons principaux
    document.getElementById('clearBtn')?.addEventListener('click', clearAllFrames);
    document.getElementById('deleteFrameBtn')?.addEventListener('click', deleteCurrentFrame);
    document.getElementById('previewBtn')?.addEventListener('click', previewAnimation);
    document.getElementById('saveBtn')?.addEventListener('click', saveToFile);
    document.getElementById('loadBtn')?.addEventListener('click', loadFromFile);
    document.getElementById('loadLocalBtn')?.addEventListener('click', showLocalProjects);
    document.getElementById('copyFrameBtn')?.addEventListener('click', copyCurrentFrame);
    document.getElementById('pasteFrameBtn')?.addEventListener('click', pasteFrame);
    document.getElementById('helpBtn')?.addEventListener('click', showHelp);
    document.getElementById('creditsBtn')?.addEventListener('click', showCredits);
    
    // Bouton nouvelle frame
    document.getElementById('addFrameBtn')?.addEventListener('click', addFrame);
    
    // Bouton gomme
    document.getElementById('eraserBtn')?.addEventListener('click', toggleEraser);
    
    // Menu hamburger
    document.getElementById('menuToggle')?.addEventListener('click', toggleToolbar);
    
    // Initialiser les autres fonctionnalités
    initMobileFeatures();
}

// Auto-save function removed - manual save only

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    initGrid();
    initEventListeners();
    
    // Réinitialiser les couleurs personnalisées au démarrage pour toujours avoir les couleurs de base
    customColors = [];
    updateColorPalette();
    
    // Initialiser le sélecteur de couleur après la palette
    initColorPicker();
    
    // Initialiser l'historique undo/redo
    initHistory();
    
    // Charger les données (Supabase + localStorage en fallback)
    loadSupabaseProjects().catch(() => loadAutoSaveProjects());
    
    // Nettoyage initial pour s'assurer qu'aucun élément indésirable n'existe
    cleanUpOutsideElements();
    
    // Désactiver le bouton coller par défaut
    const pasteBtn = document.getElementById('pasteFrameBtn');
    if (pasteBtn) {
        pasteBtn.disabled = true;
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
    
    // Arrêter l'animation si l'utilisateur quitte la page
    window.addEventListener('beforeunload', () => {
        if (isAnimationPlaying) {
            stopAnimation();
        }
    });
});
