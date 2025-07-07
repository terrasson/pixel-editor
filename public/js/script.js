let currentColor = '#000000';
let isDrawing = false;
let frames = [[]];
let currentFrame = 0;
let isErasing = false; // Pour la gomme
let modifiedPixels = [new Set()]; // Pour suivre les pixels modifiés
let clipboard = null; // Pour le copier-coller
let copiedFrame = null;

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
    isDrawing = true;
    draw(e);
}

function draw(e) {
    if (!isDrawing) return;
    if (e.target.classList.contains('pixel')) {
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

// Fonction améliorée pour gérer la gomme avec les couleurs
function initColorPicker() {
    const colorPicker = document.getElementById('colorPicker');
    const eraserBtn = document.getElementById('eraserBtn');
    
    colorPicker.addEventListener('change', (e) => {
        currentColor = e.target.value;
        isErasing = false;
        if (eraserBtn) {
            eraserBtn.classList.remove('active');
            document.getElementById('pixelGrid')?.classList.remove('eraser-mode');
        }
    });

    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentColor = btn.style.backgroundColor;
            colorPicker.value = rgbToHex(currentColor);
            isErasing = false;
            if (eraserBtn) {
                eraserBtn.classList.remove('active');
                document.getElementById('pixelGrid')?.classList.remove('eraser-mode');
            }
        });
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
}

function loadFrame(frameIndex) {
    if (!frames[frameIndex]) return;
    
    const pixels = document.querySelectorAll('.pixel');
    
    // Nettoyer tous les points existants
    document.querySelectorAll('.previous-pixel-marker, .next-pixel-marker-1, .next-pixel-marker-2').forEach(marker => marker.remove());
    
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
}

function addFrame() {
    saveCurrentFrame();
    frames.push([]);
    currentFrame = frames.length - 1;
    loadFrame(currentFrame);
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
        frameBtn.textContent = `Frame ${index + 1}`;
        frameBtn.className = `frame-preview ${index === currentFrame ? 'active' : ''}`;
        frameBtn.draggable = true; // Rendre l'élément déplaçable
        
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
        // Demander le nom du fichier avec une boîte de dialogue personnalisée
        const fileName = await showSaveDialog();
        if (!fileName) return; // Si l'utilisateur annule

        const data = {
            name: fileName,
            frames: frames,
            currentFrame: currentFrame,
            dateCreated: new Date().toISOString(),
            lastModified: new Date().toISOString()
        };

        // Utiliser la méthode de téléchargement compatible avec tous les navigateurs
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert('Projet sauvegardé avec succès !');
    } catch (err) {
        console.error('Erreur lors de la sauvegarde:', err);
        alert('Erreur lors de la sauvegarde. Veuillez réessayer.');
    }
}

function showSaveDialog() {
    return new Promise((resolve) => {
        const dialog = document.createElement('div');
        dialog.className = 'save-dialog';
        dialog.innerHTML = `
            <div class="save-dialog-content">
                <h3>Sauvegarder le projet</h3>
                <input type="text" id="saveFileName" placeholder="Nom du fichier" value="mon-pixel-art">
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

function loadFromFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = event => {
            try {
                const data = JSON.parse(event.target.result);
                frames = data.frames;
                currentFrame = data.currentFrame;
                
                // Afficher le nom du fichier chargé
                const title = document.getElementById('projectTitle');
                if (title) {
                    title.textContent = data.name || 'Projet sans nom';
                }
                
                updateFramesList();
                loadFrame(currentFrame);
            } catch (error) {
                alert('Erreur lors du chargement du fichier : ' + error.message);
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

// Prévisualisation de l'animation
function previewAnimation() {
    let frameIndex = 0;
    const interval = setInterval(() => {
        // Nettoyer les points rouges pendant l'animation
        document.querySelectorAll('.previous-pixel-marker, .next-pixel-marker-1, .next-pixel-marker-2').forEach(marker => marker.remove());
        
        const pixels = document.querySelectorAll('.pixel');
        frames[frameIndex].forEach((pixel, i) => {
            pixels[i].style.backgroundColor = pixel.isEmpty ? '#FFFFFF' : pixel.color;
            // Ne pas montrer les points noirs pendant l'animation
            pixels[i].classList.remove('empty');
        });
        
        frameIndex = (frameIndex + 1) % frames.length;
        
        if (frameIndex === 0) {
            clearInterval(interval);
            loadFrame(currentFrame);
        }
    }, 200);
}

// Utilitaires
function rgbToHex(rgb) {
    if (!rgb || rgb === 'white') return '#FFFFFF';
    const values = rgb.match(/\d+/g);
    return `#${values.map(x => parseInt(x).toString(16).padStart(2, '0')).join('')}`;
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
    document.getElementById('pasteFrameBtn').disabled = false;
}

// Ajouter la fonction pasteFrame
function pasteFrame() {
    if (copiedFrame) {
        frames[currentFrame] = [...copiedFrame];
        loadFrame(currentFrame);
        
        // Activer le bouton coller
        const pasteBtn = document.getElementById('pasteFrameBtn');
        if (pasteBtn) pasteBtn.disabled = false;
    }
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
            currentFrame: currentFrame
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
        toolbar.classList.toggle('hidden');
        
        // Changer l'icône du bouton
        if (toolbar.classList.contains('hidden')) {
            menuButton.innerHTML = '✕';
            menuButton.title = 'Afficher les outils';
        } else {
            menuButton.innerHTML = '☰';
            menuButton.title = 'Cacher les outils';
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
    document.getElementById('saveBtn')?.addEventListener('click', showSaveDialog);
    document.getElementById('saveServerBtn')?.addEventListener('click', saveToServer);
    document.getElementById('loadBtn')?.addEventListener('click', loadFromFile);
    document.getElementById('loadServerBtn')?.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            loadFromServerMobile();
        } else {
            loadFromServer();
        }
    });
    document.getElementById('copyFrameBtn')?.addEventListener('click', copyCurrentFrame);
    document.getElementById('pasteFrameBtn')?.addEventListener('click', pasteFrame);
    document.getElementById('creditsBtn')?.addEventListener('click', showCredits);
    
    // Bouton nouvelle frame
    document.getElementById('addFrameBtn')?.addEventListener('click', addFrame);
    
    // Bouton gomme
    document.getElementById('eraserBtn')?.addEventListener('click', toggleEraser);
    
    // Menu hamburger
    document.getElementById('menuToggle')?.addEventListener('click', toggleToolbar);
    
    // Initialiser les autres fonctionnalités
    initColorPicker();
    initMobileFeatures();
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    initGrid();
    initEventListeners();
    updateFramesList();
    loadFrame(0);
});
