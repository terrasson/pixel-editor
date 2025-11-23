/**
 * SCRIPT TEMPLATES - Fonctionnalité Modèles à Réaliser
 * 
 * Cette fonctionnalité permet aux utilisateurs de :
 * - Parcourir une banque de modèles triés par thème
 * - Charger un modèle dans la grille avec des indications de couleur
 * - Utiliser la pipette pour extraire les couleurs du modèle
 * - Compléter le modèle en suivant les indications
 * 
 * ⚠️ VERSION BETA - Pour index-beta.html uniquement
 */

(function() {
    'use strict';
    
    // Variable pour stocker le modèle actuellement chargé
    let currentTemplate = null;
    let isTemplateMode = false;
    
    // Attendre que le DOM et script.js soient chargés
    function waitForScript() {
        if (typeof frames === 'undefined' || typeof GRID_SIZE === 'undefined') {
            setTimeout(waitForScript, 100);
            return;
        }
        initTemplateFeature();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForScript);
    } else {
        waitForScript();
    }
    
    /**
     * Base de données des modèles par thème
     * Chaque modèle contient :
     * - id : identifiant unique
     * - name : nom du modèle
     * - theme : thème (ex: "Animaux", "Nature", "Personnages")
     * - preview : frame complète pour l'aperçu (finie)
     * - template : frame avec seulement les indications
     */
    const TEMPLATES_DATABASE = [
        {
            id: 'heart',
            name: 'Cœur',
            theme: 'Emoji',
            preview: generateHeartFrame(),
            difficulty: 1
        },
        {
            id: 'star',
            name: 'Étoile',
            theme: 'Formes',
            preview: generateStarFrame(),
            difficulty: 1
        },
        {
            id: 'smiley',
            name: 'Smiley',
            theme: 'Emoji',
            preview: generateSmileyFrame(),
            difficulty: 2
        },
        {
            id: 'cat',
            name: 'Chat',
            theme: 'Animaux',
            preview: generateCatFrame(),
            difficulty: 2
        },
        {
            id: 'tree',
            name: 'Arbre',
            theme: 'Nature',
            preview: generateTreeFrame(),
            difficulty: 2
        },
        {
            id: 'house',
            name: 'Maison',
            theme: 'Architecture',
            preview: generateHouseFrame(),
            difficulty: 3
        }
    ];
    
    /**
     * Génère une frame vide avec la bonne taille
     */
    function createEmptyFrame() {
        return Array.from({ length: GRID_SIZE * GRID_SIZE }, () => ({
            color: '#FFFFFF',
            isEmpty: true
        }));
    }
    
    /**
     * Génère le modèle du cœur
     */
    function generateHeartFrame() {
        const frame = createEmptyFrame();
        const centerX = 16;
        const centerY = 16;
        
        // Dessin d'un cœur simple
        const heartPixels = [
            [14, 8], [15, 8], [17, 8], [18, 8],
            [13, 9], [14, 9], [15, 9], [16, 9], [17, 9], [18, 9], [19, 9],
            [13, 10], [14, 10], [15, 10], [16, 10], [17, 10], [18, 10], [19, 10],
            [14, 11], [15, 11], [16, 11], [17, 11], [18, 11],
            [15, 12], [16, 12], [17, 12],
            [16, 13], [16, 14], [16, 15], [16, 16], [16, 17], [16, 18], [16, 19], [16, 20], [16, 21]
        ];
        
        heartPixels.forEach(([x, y]) => {
            const index = y * GRID_SIZE + x;
            if (index >= 0 && index < frame.length) {
                frame[index] = { color: '#FF1493', isEmpty: false };
            }
        });
        
        return frame;
    }
    
    /**
     * Génère le modèle de l'étoile
     */
    function generateStarFrame() {
        const frame = createEmptyFrame();
        const centerX = 16;
        const centerY = 16;
        
        // Étoile simple
        const starPixels = [
            [16, 6],
            [14, 8], [16, 8], [18, 8],
            [13, 10], [15, 10], [16, 10], [17, 10], [19, 10],
            [14, 11], [16, 11], [18, 11],
            [15, 12], [17, 12],
            [16, 13], [16, 14],
            [15, 15], [17, 15],
            [14, 16], [16, 16], [18, 16],
            [13, 17], [15, 17], [16, 17], [17, 17], [19, 17],
            [14, 19], [16, 19], [18, 19],
            [16, 21]
        ];
        
        starPixels.forEach(([x, y]) => {
            const index = y * GRID_SIZE + x;
            if (index >= 0 && index < frame.length) {
                frame[index] = { color: '#FFD700', isEmpty: false };
            }
        });
        
        return frame;
    }
    
    /**
     * Génère le modèle du smiley
     */
    function generateSmileyFrame() {
        const frame = createEmptyFrame();
        
        // Visage jaune
        for (let y = 8; y < 24; y++) {
            for (let x = 8; x < 24; x++) {
                const dx = x - 16;
                const dy = y - 16;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist <= 7) {
                    const index = y * GRID_SIZE + x;
                    frame[index] = { color: '#FFFF00', isEmpty: false };
                }
            }
        }
        
        // Yeux
        frame[11 * GRID_SIZE + 12] = { color: '#000000', isEmpty: false };
        frame[11 * GRID_SIZE + 13] = { color: '#000000', isEmpty: false };
        frame[11 * GRID_SIZE + 19] = { color: '#000000', isEmpty: false };
        frame[11 * GRID_SIZE + 20] = { color: '#000000', isEmpty: false };
        
        // Bouche souriante
        for (let x = 12; x <= 20; x++) {
            const y = 18 + Math.floor(Math.sin((x - 12) * Math.PI / 8) * 2);
            if (y >= 0 && y < GRID_SIZE) {
                const index = y * GRID_SIZE + x;
                frame[index] = { color: '#000000', isEmpty: false };
            }
        }
        
        return frame;
    }
    
    /**
     * Génère le modèle du chat
     */
    function generateCatFrame() {
        const frame = createEmptyFrame();
        
        // Corps du chat (orange)
        for (let y = 14; y < 22; y++) {
            for (let x = 10; x < 22; x++) {
                if (y < 20 || (x >= 12 && x < 20)) {
                    const index = y * GRID_SIZE + x;
                    frame[index] = { color: '#FF8C00', isEmpty: false };
                }
            }
        }
        
        // Tête du chat
        for (let y = 10; y < 14; y++) {
            for (let x = 12; x < 20; x++) {
                const index = y * GRID_SIZE + x;
                frame[index] = { color: '#FF8C00', isEmpty: false };
            }
        }
        
        // Oreilles
        frame[9 * GRID_SIZE + 11] = { color: '#FF8C00', isEmpty: false };
        frame[9 * GRID_SIZE + 13] = { color: '#FF8C00', isEmpty: false };
        frame[9 * GRID_SIZE + 19] = { color: '#FF8C00', isEmpty: false };
        frame[9 * GRID_SIZE + 21] = { color: '#FF8C00', isEmpty: false };
        
        // Yeux
        frame[11 * GRID_SIZE + 14] = { color: '#000000', isEmpty: false };
        frame[11 * GRID_SIZE + 17] = { color: '#000000', isEmpty: false };
        
        // Nez
        frame[12 * GRID_SIZE + 15] = { color: '#FF69B4', isEmpty: false };
        frame[12 * GRID_SIZE + 16] = { color: '#FF69B4', isEmpty: false };
        
        // Bouche
        frame[13 * GRID_SIZE + 15] = { color: '#000000', isEmpty: false };
        frame[13 * GRID_SIZE + 16] = { color: '#000000', isEmpty: false };
        
        return frame;
    }
    
    /**
     * Génère le modèle de l'arbre
     */
    function generateTreeFrame() {
        const frame = createEmptyFrame();
        
        // Tronc (marron)
        for (let y = 18; y < 26; y++) {
            for (let x = 14; x < 18; x++) {
                const index = y * GRID_SIZE + x;
                frame[index] = { color: '#8B4513', isEmpty: false };
            }
        }
        
        // Feuillage (vert)
        for (let y = 10; y < 20; y++) {
            for (let x = 10; x < 22; x++) {
                const dx = x - 16;
                const dy = y - 14;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist <= 6) {
                    const index = y * GRID_SIZE + x;
                    frame[index] = { color: '#228B22', isEmpty: false };
                }
            }
        }
        
        return frame;
    }
    
    /**
     * Génère le modèle de la maison
     */
    function generateHouseFrame() {
        const frame = createEmptyFrame();
        
        // Corps de la maison (beige)
        for (let y = 16; y < 24; y++) {
            for (let x = 10; x < 22; x++) {
                const index = y * GRID_SIZE + x;
                frame[index] = { color: '#DEB887', isEmpty: false };
            }
        }
        
        // Toit (rouge)
        for (let y = 12; y < 16; y++) {
            for (let x = 12 - (y - 12); x < 20 + (y - 12); x++) {
                if (x >= 0 && x < GRID_SIZE) {
                    const index = y * GRID_SIZE + x;
                    frame[index] = { color: '#DC143C', isEmpty: false };
                }
            }
        }
        
        // Porte (marron)
        for (let y = 18; y < 24; y++) {
            for (let x = 14; x < 18; x++) {
                const index = y * GRID_SIZE + x;
                frame[index] = { color: '#654321', isEmpty: false };
            }
        }
        
        // Fenêtre (bleu)
        for (let y = 17; y < 19; y++) {
            for (let x = 11; x < 13; x++) {
                const index = y * GRID_SIZE + x;
                frame[index] = { color: '#4169E1', isEmpty: false };
            }
            for (let x = 19; x < 21; x++) {
                const index = y * GRID_SIZE + x;
                frame[index] = { color: '#4169E1', isEmpty: false };
            }
        }
        
        return frame;
    }
    
    /**
     * Initialise la fonctionnalité des modèles
     */
    function initTemplateFeature() {
        console.log('🎨 Fonctionnalité Modèles à Réaliser BETA initialisée');
        
        // Ajouter les event listeners pour les boutons
        const templateBtn = document.getElementById('templateBtn');
        const templateBtn2 = document.getElementById('templateBtn2');
        
        if (templateBtn) {
            templateBtn.addEventListener('click', showTemplateGallery);
        }
        if (templateBtn2) {
            templateBtn2.addEventListener('click', showTemplateGallery);
        }
        
        // Configurer les intercepteurs
        interceptDrawingEvents();
        
        // Essayer de configurer l'intercepteur de loadFrame
        setTimeout(() => {
            if (typeof loadFrame !== 'undefined' && !window.templateLoadFrameIntercepted) {
                setupLoadFrameInterceptor();
            }
        }, 500);
    }
    
    /**
     * Affiche la galerie de modèles par thème
     */
    function showTemplateGallery() {
        console.log('🖼️ ========== showTemplateGallery DÉBUT ==========');
        console.log('🖼️ Ouverture de la galerie de modèles...');
        
        try {
        // Grouper les modèles par thème
        const templatesByTheme = {};
        TEMPLATES_DATABASE.forEach(template => {
            if (!templatesByTheme[template.theme]) {
                templatesByTheme[template.theme] = [];
            }
            templatesByTheme[template.theme].push(template);
        });
        
        const themes = Object.keys(templatesByTheme).sort();
        
        // Créer le contenu de la modal
        let modalContent = `
            <div style="padding: 20px; color: white; max-height: 80vh; overflow-y: auto;">
                <h3 style="margin-top: 0; text-align: center; margin-bottom: 20px;">
                    🧩 Modèles à Réaliser
                </h3>
                <p style="text-align: center; margin-bottom: 20px; opacity: 0.9;">
                    Choisissez un modèle et suivez les indications pour le compléter !
                </p>
        `;
        
        // Parcourir chaque thème
        themes.forEach(theme => {
            modalContent += `
                <div style="margin-bottom: 30px;">
                    <h4 style="margin-bottom: 15px; color: #4CAF50; font-size: 1.2em; border-bottom: 2px solid rgba(76, 175, 80, 0.3); padding-bottom: 8px;">
                        ${theme}
                    </h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 15px;">
            `;
            
            templatesByTheme[theme].forEach(template => {
                // Générer un aperçu du modèle (canvas)
                const previewCanvas = generateTemplatePreview(template.preview);
                
                modalContent += `
                    <div class="template-item" data-template-id="${template.id}" 
                         style="cursor: pointer; background: rgba(255,255,255,0.1); border-radius: 8px; padding: 10px; transition: all 0.3s; border: 2px solid transparent;">
                        <div style="background: white; border-radius: 4px; padding: 5px; margin-bottom: 8px; display: flex; justify-content: center; align-items: center; min-height: 80px;">
                            ${previewCanvas}
                        </div>
                        <div style="text-align: center; font-weight: 600; margin-bottom: 4px;">${template.name}</div>
                        <div style="text-align: center; font-size: 0.85em; opacity: 0.7;">
                            ${'⭐'.repeat(template.difficulty)}
                        </div>
                    </div>
                `;
            });
            
            modalContent += `
                    </div>
                </div>
            `;
        });
        
        modalContent += `
                <div style="display: flex; gap: 10px; margin-top: 20px; justify-content: center;">
                    <button id="cancelTemplateBtn" style="flex: 0 0 auto; padding: 12px 24px; border: 1px solid rgba(255,255,255,0.3); border-radius: 8px; background: rgba(255,255,255,0.1); color: white; cursor: pointer; font-weight: 600;">
                        Annuler
                    </button>
                </div>
            </div>
        `;
        
        // Créer le modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'flex';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px; width: 90%; max-height: 90vh;">
                ${modalContent}
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners pour les modèles
        const templateItems = modal.querySelectorAll('.template-item');
        console.log('🔍 Nombre de modèles trouvés dans la modal:', templateItems.length);
        
        templateItems.forEach((item, index) => {
            console.log(`  📦 Modèle ${index + 1}:`, item.dataset.templateId);
            // Ajouter les effets hover avec JavaScript pour éviter les erreurs de propriété en lecture seule
            item.addEventListener('mouseenter', function() {
                try {
                    this.style.background = 'rgba(255,255,255,0.2)';
                    this.style.borderColor = '#4CAF50';
                } catch (e) {
                    console.warn('Erreur hover enter:', e);
                }
            });
            
            item.addEventListener('mouseleave', function() {
                try {
                    this.style.background = 'rgba(255,255,255,0.1)';
                    this.style.borderColor = 'transparent';
                } catch (e) {
                    console.warn('Erreur hover leave:', e);
                }
            });
            
            item.addEventListener('click', function() {
                try {
                    console.log('🖱️ Clic sur un modèle détecté !');
                    const templateId = this.dataset.templateId;
                    console.log('📌 Template ID cliqué:', templateId);
                    
                    const template = TEMPLATES_DATABASE.find(t => t.id === templateId);
                    console.log('🔍 Template trouvé:', template ? template.id : 'null');
                    
                    if (template) {
                        console.log('✅ Chargement du template...');
                        loadTemplate(template);
                        modal.remove();
                    } else {
                        console.error('❌ Template non trouvé pour ID:', templateId);
                        alert('❌ Modèle non trouvé. Veuillez réessayer.');
                    }
                } catch (error) {
                    console.error('❌ ERREUR lors du clic sur le modèle:', error);
                    alert('❌ Erreur lors du chargement du modèle. Vérifiez la console.');
                }
            });
        });
        
        // Bouton annuler
        const cancelBtn = document.getElementById('cancelTemplateBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                console.log('❌ Annulation de la sélection de modèle');
                modal.remove();
            });
        }
        
        console.log('🖼️ ========== showTemplateGallery FIN ==========');
        } catch (error) {
            console.error('❌ ERREUR dans showTemplateGallery:', error);
            alert('❌ Erreur lors de l\'ouverture de la galerie. Vérifiez la console.');
        }
    }
    
    /**
     * Génère un aperçu SVG d'un modèle
     */
    function generateTemplatePreview(frame) {
        const size = 80;
        const pixelSize = size / GRID_SIZE;
        
        let svg = `<svg width="${size}" height="${size}" style="display: block;">`;
        
        frame.forEach((pixel, index) => {
            if (!pixel || pixel.isEmpty) return;
            
            const x = (index % GRID_SIZE) * pixelSize;
            const y = Math.floor(index / GRID_SIZE) * pixelSize;
            
            svg += `<rect x="${x}" y="${y}" width="${pixelSize}" height="${pixelSize}" fill="${pixel.color}" stroke="none"/>`;
        });
        
        svg += `</svg>`;
        return svg;
    }
    
    /**
     * Charge un modèle dans la grille avec les indications
     */
    function loadTemplate(template) {
        console.log('🎯 ========== loadTemplate DÉBUT ==========');
        console.log('🎯 Template ID:', template ? template.id : 'null');
        console.log('🎯 Template preview existe:', !!template?.preview);
        
        if (!template || !template.preview) {
            console.error('❌ Modèle invalide:', template);
            alert('❌ Modèle invalide');
            return;
        }
        
        const nonVides = template.preview.filter(p => p && !p.isEmpty).length;
        console.log('✅ Modèle valide:', {
            id: template.id,
            name: template.name,
            pixelsNonVides: nonVides,
            totalPixels: template.preview.length
        });
        
        // Sauvegarder l'état actuel
        const confirmLoad = confirm(
            '🎨 Charger ce modèle ?\n\n' +
            'Le modèle sera chargé avec des indications de couleur.\n' +
            'Utilisez la pipette pour extraire les couleurs du modèle.\n\n' +
            'Attention : cela remplacera votre travail actuel !'
        );
        
        if (!confirmLoad) {
            console.log('❌ Chargement annulé par l\'utilisateur');
            return;
        }
        
        console.log('✅ Confirmation OK, chargement du modèle...');
        
        // Stocker le modèle actuel
        currentTemplate = template;
        isTemplateMode = true;
        console.log('📌 Mode template activé:', {
            templateId: currentTemplate.id,
            isTemplateMode: isTemplateMode
        });
        
        // Créer une nouvelle frame vide
        const newFrame = createEmptyFrame();
        
        // Copier les couleurs du modèle dans la frame
        template.preview.forEach((pixel, index) => {
            if (pixel && !pixel.isEmpty) {
                newFrame[index] = {
                    color: pixel.color,
                    isEmpty: true // Vide pour que l'utilisateur doive colorier
                };
            }
        });
        
        // Remplacer la frame actuelle
        if (frames && frames.length > 0 && typeof currentFrame !== 'undefined') {
            frames[currentFrame] = newFrame;
            
            // Stocker le template preview avant de charger la frame
            const templatePreview = template.preview;
            
            // Charger la frame normalement d'abord
            if (typeof loadFrame === 'function') {
                loadFrame(currentFrame);
            }
            
            // Attendre que loadFrame ait complètement terminé (y compris ses setTimeout internes)
            // Puis ajouter les indicateurs avec plusieurs tentatives
            console.log('⏳ Attente de la fin de loadFrame...');
            
            // Première tentative après 500ms (pour laisser le temps à loadFrame de finir)
            setTimeout(() => {
                console.log('🎨 TENTATIVE 1: Ajout des indicateurs...');
                const success1 = addTemplateIndicators(templatePreview);
                console.log('📋 Résultat tentative 1:', success1 ? '✅ SUCCÈS' : '❌ ÉCHEC');
                
                if (!success1) {
                    // Deuxième tentative après 300ms de plus
                    setTimeout(() => {
                        console.log('🎨 TENTATIVE 2: Ajout des indicateurs...');
                        const success2 = addTemplateIndicators(templatePreview);
                        console.log('📋 Résultat tentative 2:', success2 ? '✅ SUCCÈS' : '❌ ÉCHEC');
                        
                        if (!success2) {
                            // Troisième tentative après encore 300ms
                            setTimeout(() => {
                                console.log('🎨 TENTATIVE 3: Ajout des indicateurs...');
                                const success3 = addTemplateIndicators(templatePreview);
                                console.log('📋 Résultat tentative 3:', success3 ? '✅ SUCCÈS' : '❌ ÉCHEC');
                                
                                if (!success3) {
                                    console.error('❌ ÉCHEC TOTAL: Impossible d\'ajouter les indicateurs après 3 tentatives');
                                    alert('⚠️ Les indicateurs n\'ont pas pu être ajoutés. Vérifiez la console pour plus de détails.');
                                }
                            }, 300);
                        }
                    }, 300);
                }
            }, 500);
            
            updateFramesList();
            
            // Extraire les couleurs uniques du modèle et les proposer dans la palette
            const uniqueColors = new Set();
            template.preview.forEach(pixel => {
                if (pixel && !pixel.isEmpty) {
                    uniqueColors.add(pixel.color);
                }
            });
            
            // Ajouter les couleurs à la palette personnalisée
            Array.from(uniqueColors).forEach(color => {
                if (typeof addCustomColor === 'function') {
                    addCustomColor(color);
                }
            });
            
            // Intercepter les événements de dessin pour vérifier la correspondance
            interceptDrawingEvents();
            
            // Retarder l'alerte pour laisser le temps aux indicateurs de s'afficher
            setTimeout(() => {
                alert(
                    '✅ Modèle chargé !\n\n' +
                    '💡 Conseils :\n' +
                    '- Utilisez la pipette pour extraire les couleurs du modèle\n' +
                    '- Les triangles indiquent la couleur attendue\n' +
                    '- Les couleurs du modèle ont été ajoutées à votre palette\n\n' +
                    'Amusez-vous bien ! 🎨'
                );
            }, 500);
        } else {
            alert('❌ Impossible de charger le modèle. Veuillez réessayer.');
        }
    }
    
    /**
     * Ajoute les indicateurs de template à la grille
     */
    function addTemplateIndicators(templatePreview) {
        try {
            console.log('🎨 ===== DÉBUT addTemplateIndicators =====');
            
            const pixels = document.querySelectorAll('.pixel');
            const grid = document.getElementById('pixelGrid');
            
            console.log('📊 Vérifications initiales:', {
                pixelsCount: pixels ? pixels.length : 0,
                gridExists: !!grid,
                templatePreviewExists: !!templatePreview,
                templatePreviewIsArray: Array.isArray(templatePreview),
                templatePreviewLength: templatePreview ? templatePreview.length : 0
            });
            
            if (!pixels || pixels.length === 0) {
                console.error('❌ Aucun pixel trouvé dans la grille');
                return false;
            }
            
            if (!grid) {
                console.error('❌ Grille non trouvée');
                return false;
            }
            
            if (pixels.length < GRID_SIZE * GRID_SIZE) {
                console.error('❌ Nombre de pixels insuffisant:', pixels.length, 'au lieu de', GRID_SIZE * GRID_SIZE);
                return false;
            }
            
            if (!templatePreview || !Array.isArray(templatePreview)) {
                console.error('❌ Template preview invalide');
                return false;
            }
            
            const nonVides = templatePreview.filter(p => p && !p.isEmpty).length;
            console.log('✅ Conditions remplies:', {
                pixels: pixels.length,
                templatePixels: templatePreview.length,
                nonVides: nonVides
            });
            
            if (nonVides === 0) {
                console.error('❌ Aucun pixel non vide dans le template !');
                return false;
            }
        
        // Les pixels ont déjà position: relative dans le CSS (common.css), pas besoin de le modifier en JS
        // Cela évite les erreurs de propriété en lecture seule
        
        // Nettoyer les anciens indicateurs d'abord
        let cleaned = 0;
        pixels.forEach(pixel => {
            const existingSvg = pixel.querySelector('svg.template-indicator-svg');
            if (existingSvg) {
                existingSvg.remove();
                cleaned++;
            }
            pixel.classList.remove('has-template-indicator', 'template-completed');
            delete pixel.dataset.expectedColor;
        });
        
        if (cleaned > 0) {
            console.log('🧹 Anciens indicateurs nettoyés:', cleaned);
        }
        
        let indicatorsAdded = 0;
        
        console.log('🎨 Parcours des pixels pour ajouter les indicateurs...');
        console.log(`📊 Template contient ${nonVides} pixels non vides`);
        
        pixels.forEach((pixel, index) => {
            if (index >= templatePreview.length) return;
            
            const templatePixel = templatePreview[index];
            
            // Si le template a une couleur à cet endroit, afficher l'indicateur
            if (templatePixel && !templatePixel.isEmpty && templatePixel.color) {
                try {
                    const expectedColor = templatePixel.color;
                    
                    // Créer le SVG avec le triangle indicateur
                    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    svg.setAttribute('width', '100%');
                    svg.setAttribute('height', '100%');
                    svg.setAttribute('viewBox', '0 0 100 100');
                    svg.setAttribute('preserveAspectRatio', 'none');
                    svg.className = 'template-indicator-svg';
                    svg.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 100; overflow: visible;');
                    
                    // Triangle du bas (coin inférieur gauche, coin inférieur droit, point milieu-haut)
                    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                    polygon.setAttribute('points', '0,100 100,100 50,35');
                    polygon.setAttribute('fill', expectedColor);
                    polygon.setAttribute('opacity', '0.85');
                    polygon.setAttribute('stroke', 'rgba(0,0,0,0.4)');
                    polygon.setAttribute('stroke-width', '1.5');
                    
                    svg.appendChild(polygon);
                    pixel.appendChild(svg);
                    
                    // Ajouter les classes et attributs
                    pixel.classList.add('has-template-indicator');
                    pixel.setAttribute('data-expected-color', expectedColor);
                    
                    indicatorsAdded++;
                } catch (error) {
                    console.error(`  ❌ Erreur lors de l'ajout de l'indicateur au pixel ${index}:`, error);
                }
            }
        });
        
        console.log('✅ ===== FIN addTemplateIndicators =====');
        console.log(`✅ ${indicatorsAdded} indicateurs ajoutés avec succès !`);
        
        // Vérification immédiate dans le DOM
        const pixelsWithIndicators = document.querySelectorAll('.pixel.has-template-indicator');
        const svgsInDOM = document.querySelectorAll('svg.template-indicator-svg');
        
        console.log('🔍 Vérification DOM:', {
            pixelsAvecIndicateurs: pixelsWithIndicators.length,
            svgsDansDOM: svgsInDOM.length,
            indicatorsAdded: indicatorsAdded
        });
        
        if (indicatorsAdded > 0 && svgsInDOM.length === indicatorsAdded) {
            console.log('✅✅✅ SUCCÈS COMPLET : Tous les indicateurs sont dans le DOM !');
            
            // Vérifier visuellement le premier indicateur
            if (svgsInDOM.length > 0) {
                const firstSvg = svgsInDOM[0];
                const computedStyle = window.getComputedStyle(firstSvg);
                console.log('🔍 Premier SVG:', {
                    display: computedStyle.display,
                    visibility: computedStyle.visibility,
                    zIndex: computedStyle.zIndex,
                    position: computedStyle.position,
                    width: computedStyle.width,
                    height: computedStyle.height
                });
            }
        } else {
            console.error('❌ PROBLÈME : Les indicateurs ne sont pas tous dans le DOM !');
        }
        
        // Vérification différée pour s'assurer qu'ils restent
        setTimeout(() => {
            const svgsStillThere = document.querySelectorAll('svg.template-indicator-svg');
            console.log('🔍 Vérification après 100ms:', svgsStillThere.length, 'SVG trouvés');
            
            if (svgsStillThere.length !== indicatorsAdded) {
                console.error('❌ PROBLÈME : Des indicateurs ont disparu !');
            }
            
            // Si les nombres ne correspondent pas, il y a un problème
            if (pixelsWithIndicators.length !== indicatorsAdded || svgsInDOM.length !== indicatorsAdded) {
                console.warn('⚠️ Incohérence détectée entre indicateurs ajoutés et éléments dans le DOM');
                
                // Essayer de réparer en réajoutant les indicateurs manquants
                if (svgsInDOM.length < indicatorsAdded) {
                    console.log('🔧 Tentative de réparation : réajout des indicateurs manquants...');
                    // Réajouter les indicateurs pour les pixels qui n'en ont pas
                    pixelsWithIndicators.forEach(pixel => {
                        if (!pixel.querySelector('svg.template-indicator-svg')) {
                            const expectedColor = pixel.dataset.expectedColor;
                            if (expectedColor) {
                                // Réajouter l'indicateur
                                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                                svg.setAttribute('width', '100%');
                                svg.setAttribute('height', '100%');
                                svg.setAttribute('viewBox', '0 0 100 100');
                                svg.setAttribute('preserveAspectRatio', 'none');
                                svg.className = 'template-indicator-svg';
                svg.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 100; overflow: visible;');
                                
                                const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                                polygon.setAttribute('points', '0,100 100,100 50,35');
                                polygon.setAttribute('fill', expectedColor);
                                polygon.setAttribute('opacity', '0.85');
                                polygon.setAttribute('stroke', 'rgba(0,0,0,0.4)');
                                polygon.setAttribute('stroke-width', '1.5');
                                
                                svg.appendChild(polygon);
                                pixel.appendChild(svg);
                            }
                        }
                    });
                }
            }
        }, 100);
        
        if (indicatorsAdded === 0) {
            console.error('❌ Aucun indicateur ajouté !');
            console.error('Détails du template:', {
                templateLength: templatePreview.length,
                templatePixelsNonVides: templatePreview.filter(p => p && !p.isEmpty).length,
                premiersPixels: templatePreview.slice(0, 10).map((p, i) => ({
                    index: i,
                    isEmpty: p ? p.isEmpty : 'null',
                    color: p ? p.color : 'null'
                }))
            });
                return false;
            }
            
            return true;
        } catch (error) {
            console.error('❌ ERREUR CRITIQUE lors de l\'ajout des indicateurs:', error);
            console.error('📍 Type d\'erreur:', error.name);
            console.error('📝 Message:', error.message);
            console.error('📍 Stack trace:', error.stack);
            console.error('📍 Ligne probable de l\'erreur:', error.lineNumber || 'inconnue');
            return false;
        }
    }
    
    /**
     * Charge une frame avec les indicateurs de template (ancienne méthode - conservée pour compatibilité)
     */
    function loadFrameWithTemplateIndicators(frameIndex, templatePreview) {
        if (frameIndex < 0 || frameIndex >= frames.length) {
            console.warn('⚠️ Index de frame invalide:', frameIndex);
            return;
        }
        
        const pixels = document.querySelectorAll('.pixel');
        
        if (!pixels || pixels.length === 0) {
            console.warn('⚠️ Aucun pixel trouvé dans la grille');
            return;
        }
        
        console.log('🎨 Chargement des indicateurs:', pixels.length, 'pixels, template:', templatePreview.length);
        
        // Les pixels ont déjà position: relative dans le CSS, pas besoin de le modifier en JS
        
        // Nettoyer les anciens indicateurs d'abord
        pixels.forEach(pixel => {
            const existingSvg = pixel.querySelector('svg.template-indicator-svg');
            if (existingSvg) {
                existingSvg.remove();
            }
            pixel.classList.remove('has-template-indicator', 'template-completed');
            delete pixel.dataset.expectedColor;
        });
        
        let indicatorsAdded = 0;
        
        pixels.forEach((pixel, index) => {
            if (index >= templatePreview.length) return;
            
            const templatePixel = templatePreview[index];
            
            // Si le template a une couleur à cet endroit, afficher l'indicateur
            if (templatePixel && !templatePixel.isEmpty) {
                const expectedColor = templatePixel.color;
                
                // Utiliser un SVG pour un meilleur contrôle du triangle
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute('width', '100%');
                svg.setAttribute('height', '100%');
                svg.setAttribute('viewBox', '0 0 100 100');
                svg.setAttribute('preserveAspectRatio', 'none');
                svg.className = 'template-indicator-svg';
                                svg.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 100; overflow: visible;');
                
                // Triangle du bas : coin inférieur gauche, coin inférieur droit, point milieu-haut
                // Cela forme un triangle qui occupe la moitié inférieure du pixel
                const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                // Triangle pointant vers le haut : bas gauche, bas droit, milieu-haut
                // Pour un triangle plus visible, on prend une portion plus grande (2/3 du bas)
                polygon.setAttribute('points', '0,100 100,100 50,35');
                polygon.setAttribute('fill', expectedColor);
                polygon.setAttribute('opacity', '0.85');
                polygon.setAttribute('stroke', 'rgba(0,0,0,0.4)');
                polygon.setAttribute('stroke-width', '1.5');
                
                svg.appendChild(polygon);
                pixel.appendChild(svg);
                
                // Ajouter une classe pour identifier les pixels avec template
                pixel.classList.add('has-template-indicator');
                pixel.dataset.expectedColor = expectedColor;
                
                indicatorsAdded++;
            }
        });
        
        console.log('✅ Indicateurs ajoutés:', indicatorsAdded);
        
        // Si aucun indicateur n'a été ajouté, il y a un problème
        if (indicatorsAdded === 0) {
            console.error('❌ Aucun indicateur ajouté !');
            console.error('Détails:', {
                pixelsCount: pixels.length,
                templateLength: templatePreview.length,
                templatePixelsNonVides: templatePreview.filter(p => p && !p.isEmpty).length,
                premiersPixels: templatePreview.slice(0, 5)
            });
        } else {
            // Vérifier visuellement que les indicateurs sont présents
            const pixelsWithIndicators = document.querySelectorAll('.pixel.has-template-indicator');
            console.log('🔍 Vérification:', pixelsWithIndicators.length, 'pixels avec indicateurs trouvés dans le DOM');
        }
        
        return indicatorsAdded > 0;
    }
    
    /**
     * Vérifie si un pixel correspond à la couleur attendue du template
     */
    function checkTemplatePixel(pixelElement) {
        if (!currentTemplate || !isTemplateMode || !pixelElement) return;
        
        const expectedColor = pixelElement.dataset.expectedColor;
        if (!expectedColor) return;
        
        const currentColor = pixelElement.style.backgroundColor || '#FFFFFF';
        let hexColor;
        
        // Utiliser la fonction rgbToHex si disponible
        if (typeof rgbToHex === 'function') {
            hexColor = rgbToHex(currentColor);
        } else {
            // Fallback : conversion basique
            if (currentColor.startsWith('#')) {
                hexColor = currentColor;
            } else if (currentColor.startsWith('rgb')) {
                const values = currentColor.match(/\d+/g);
                if (values && values.length >= 3) {
                    hexColor = `#${values.slice(0, 3).map(x => parseInt(x).toString(16).padStart(2, '0')).join('')}`;
                } else {
                    hexColor = '#FFFFFF';
                }
            } else {
                hexColor = '#FFFFFF';
            }
        }
        
        // Normaliser les couleurs pour la comparaison
        const normalizedExpected = expectedColor.toUpperCase().trim();
        const normalizedCurrent = hexColor.toUpperCase().trim();
        
        // Si la couleur correspond, retirer l'indicateur
        if (normalizedCurrent === normalizedExpected && !pixelElement.classList.contains('empty')) {
            const indicatorSvg = pixelElement.querySelector('svg.template-indicator-svg');
            if (indicatorSvg) {
                indicatorSvg.remove();
            }
            pixelElement.classList.remove('has-template-indicator');
            pixelElement.classList.add('template-completed');
            delete pixelElement.dataset.expectedColor;
        }
    }
    
    /**
     * Intercepte les événements de dessin pour vérifier la correspondance
     */
    function interceptDrawingEvents() {
        // Observer les modifications de la grille pour vérifier les pixels
        if (typeof MutationObserver !== 'undefined') {
            const grid = document.getElementById('pixelGrid');
            if (grid && !window.templateMutationObserver) {
                window.templateMutationObserver = new MutationObserver((mutations) => {
                    if (isTemplateMode) {
                        mutations.forEach((mutation) => {
                            mutation.addedNodes.forEach((node) => {
                                if (node.classList && node.classList.contains('pixel')) {
                                    // Nouveau pixel, vérifier après un court délai
                                    setTimeout(() => checkTemplatePixel(node), 10);
                                }
                            });
                            
                            // Vérifier les changements de style (couleur)
                            if (mutation.type === 'attributes' && 
                                mutation.target.classList && 
                                mutation.target.classList.contains('pixel')) {
                                setTimeout(() => checkTemplatePixel(mutation.target), 10);
                            }
                        });
                    }
                });
                
                window.templateMutationObserver.observe(grid, {
                    childList: true,
                    attributes: true,
                    attributeFilter: ['style', 'class'],
                    subtree: true
                });
            }
        }
        
        // Intercepter aussi la fonction saveCurrentFrame pour vérifier après chaque sauvegarde
        if (typeof saveCurrentFrame !== 'undefined' && !window.templateSaveCurrentFrameIntercepted) {
            const originalSaveCurrentFrame = saveCurrentFrame;
            window.saveCurrentFrame = function(...args) {
                const result = originalSaveCurrentFrame.apply(this, args);
                
                // Vérifier tous les pixels avec indicateurs après la sauvegarde
                if (isTemplateMode) {
                    setTimeout(() => {
                        const pixels = document.querySelectorAll('.pixel.has-template-indicator');
                        pixels.forEach(pixel => {
                            checkTemplatePixel(pixel);
                        });
                    }, 50);
                }
                
                return result;
            };
            window.templateSaveCurrentFrameIntercepted = true;
        }
        
        // Intercepter aussi stopDrawing pour vérifier immédiatement après le dessin
        if (typeof stopDrawing !== 'undefined' && !window.templateStopDrawingIntercepted) {
            const originalStopDrawing = stopDrawing;
            window.stopDrawing = function(...args) {
                const result = originalStopDrawing.apply(this, args);
                
                // Vérifier tous les pixels avec indicateurs après le dessin
                if (isTemplateMode) {
                    setTimeout(() => {
                        const pixels = document.querySelectorAll('.pixel.has-template-indicator');
                        pixels.forEach(pixel => {
                            checkTemplatePixel(pixel);
                        });
                    }, 10);
                }
                
                return result;
            };
            window.templateStopDrawingIntercepted = true;
        }
        
        // Améliorer la pipette pour extraire la couleur depuis les indicateurs
        if (typeof pickColorFromPixel !== 'undefined' && !window.templatePickColorIntercepted) {
            const originalPickColorFromPixel = pickColorFromPixel;
            window.pickColorFromPixel = function(pixelElement) {
                // Si le pixel a un indicateur de template, utiliser la couleur attendue
                if (pixelElement && pixelElement.dataset && pixelElement.dataset.expectedColor) {
                    const expectedColor = pixelElement.dataset.expectedColor;
                    if (typeof currentColor !== 'undefined') {
                        currentColor = expectedColor;
                        if (typeof updateCurrentColorDisplay === 'function') {
                            updateCurrentColorDisplay();
                        }
                        if (typeof syncColorPickers === 'function') {
                            syncColorPickers(expectedColor);
                        }
                        if (typeof setEraserState === 'function') {
                            setEraserState(false);
                        }
                        
                        // Afficher une notification
                        if (typeof showEyedropperNotification === 'function') {
                            showEyedropperNotification(`Couleur du modèle : ${expectedColor}`);
                        }
                        
                        return;
                    }
                }
                
                // Sinon, utiliser la fonction originale
                return originalPickColorFromPixel(pixelElement);
            };
            window.templatePickColorIntercepted = true;
        }
    }
    
    // Intercepter les appels à loadFrame pour ajouter les indicateurs
    // Utiliser une approche non-invasive : observer plutôt que remplacer
    function setupLoadFrameInterceptor() {
        if (typeof loadFrame === 'undefined' || window.templateLoadFrameIntercepted) {
            return;
        }
        
        // Sauvegarder la fonction originale
        const originalLoadFrame = loadFrame;
        window._originalLoadFrame = originalLoadFrame;
        
        // Intercepter via un proxy ou en modifiant la fonction
        window.loadFrame = function(frameIndex) {
            const result = originalLoadFrame.apply(this, arguments);
            
            // Si on est en mode template, ajouter les indicateurs APRÈS que loadFrame ait terminé
            if (isTemplateMode && currentTemplate && currentTemplate.preview) {
                // Utiliser un délai pour s'assurer que loadFrame a complètement terminé
                setTimeout(() => {
                    console.log('🔄 Intercepteur loadFrame : ajout des indicateurs après chargement');
                    addTemplateIndicators(currentTemplate.preview);
                }, 200);
            }
            
            return result;
        };
        
        window.templateLoadFrameIntercepted = true;
    }
    
    // Essayer de configurer l'intercepteur immédiatement, ou attendre que loadFrame soit disponible
    if (typeof loadFrame !== 'undefined') {
        setupLoadFrameInterceptor();
    } else {
        // Attendre que loadFrame soit disponible
        const checkLoadFrame = setInterval(() => {
            if (typeof loadFrame !== 'undefined' && !window.templateLoadFrameIntercepted) {
                setupLoadFrameInterceptor();
                clearInterval(checkLoadFrame);
            }
        }, 100);
        
        // Arrêter de vérifier après 10 secondes
        setTimeout(() => clearInterval(checkLoadFrame), 10000);
    }
    
    // Exposer les fonctions globalement si nécessaire
    window.templateFeature = {
        loadTemplate,
        checkTemplatePixel,
        getCurrentTemplate: () => currentTemplate,
        isTemplateMode: () => isTemplateMode,
        exitTemplateMode: () => {
            isTemplateMode = false;
            currentTemplate = null;
            // Retirer tous les indicateurs
            document.querySelectorAll('.has-template-indicator, .template-indicator, .template-completed').forEach(el => {
                if (el.classList) {
                    el.classList.remove('has-template-indicator', 'template-completed');
                }
                if (el.tagName === 'svg' || el.classList?.contains('template-indicator')) {
                    el.remove();
                }
            });
        }
    };
})();

