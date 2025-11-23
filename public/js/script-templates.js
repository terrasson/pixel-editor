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
    
    // Rendre accessible globalement pour pouvoir les réinitialiser lors du chargement de projets
    window.currentTemplate = currentTemplate;
    window.isTemplateMode = isTemplateMode;
    
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
     * Liste des catégories disponibles
     */
    const TEMPLATE_CATEGORIES = [
        { value: 'Jeux Vidéo', label: '🎮 Jeux Vidéo' },
        { value: 'Films', label: '🎬 Films' },
        { value: 'Séries TV', label: '📺 Séries TV' },
        { value: 'Dessin Animé', label: '🎨 Dessin Animé' },
        { value: 'Manga/Anime', label: '🎌 Manga/Anime' },
        { value: 'Super-Héros', label: '🦸 Super-Héros' },
        { value: 'Personnages', label: '👤 Personnages' },
        { value: 'Animaux', label: '🐾 Animaux' },
        { value: 'Nature', label: '🌳 Nature' },
        { value: 'Architecture', label: '🏛️ Architecture' },
        { value: 'Véhicules', label: '🚗 Véhicules' },
        { value: 'Nourriture', label: '🍕 Nourriture' },
        { value: 'Objets', label: '📦 Objets' },
        { value: 'Emoji', label: '😊 Emoji' },
        { value: 'Formes', label: '🔷 Formes' },
        { value: 'Fantasy', label: '🧙 Fantasy' },
        { value: 'Science-Fiction', label: '🚀 Science-Fiction' },
        { value: 'Horreur', label: '🧟 Horreur' },
        { value: 'Autre', label: '🎨 Autre' }
    ];
    
    /**
     * Liste des styles/tags disponibles avec groupes
     */
    const TEMPLATE_STYLES = {
        'Jeux Vidéo': [
            { value: 'jeux-video', label: 'Jeux Vidéo' },
            { value: 'zelda', label: 'Zelda' },
            { value: 'mario', label: 'Super Mario' },
            { value: 'pokemon', label: 'Pokémon' },
            { value: 'minecraft', label: 'Minecraft' },
            { value: 'retro', label: 'Rétro' },
            { value: '8-bit', label: '8-bit' },
            { value: '16-bit', label: '16-bit' }
        ],
        'Dessin Animé': [
            { value: 'dessin-anime', label: 'Dessin Animé' },
            { value: 'anime', label: 'Anime' },
            { value: 'manga', label: 'Manga' },
            { value: 'studio-ghibli', label: 'Studio Ghibli' },
            { value: 'disney', label: 'Disney' }
        ],
        'Super-Héros': [
            { value: 'marvel', label: 'Marvel' },
            { value: 'dc-comics', label: 'DC Comics' },
            { value: 'super-heros', label: 'Super-Héros' },
            { value: 'batman', label: 'Batman' },
            { value: 'spider-man', label: 'Spider-Man' }
        ],
        'Genres': [
            { value: 'fantasy', label: 'Fantasy' },
            { value: 'medieval', label: 'Médiéval' },
            { value: 'science-fiction', label: 'Science-Fiction' },
            { value: 'futuriste', label: 'Futuriste' }
        ],
        'Nature': [
            { value: 'nature', label: 'Nature' },
            { value: 'animaux', label: 'Animaux' },
            { value: 'fleurs', label: 'Fleurs' },
            { value: 'arbres', label: 'Arbres' },
            { value: 'oiseaux', label: 'Oiseaux' }
        ],
        'Véhicules': [
            { value: 'vehicules', label: 'Véhicules' },
            { value: 'voitures', label: 'Voitures' },
            { value: 'avions', label: 'Avions' },
            { value: 'bateaux', label: 'Bateaux' }
        ],
        'Nourriture': [
            { value: 'nourriture', label: 'Nourriture' },
            { value: 'fruits', label: 'Fruits' },
            { value: 'legumes', label: 'Légumes' },
            { value: 'dessert', label: 'Desserts' }
        ],
        'Objets': [
            { value: 'objets', label: 'Objets' },
            { value: 'meubles', label: 'Meubles' },
            { value: 'outils', label: 'Outils' },
            { value: 'electronique', label: 'Électronique' }
        ]
    };
    
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
        console.log('🎨 ========== INITIALISATION TEMPLATES ==========');
        console.log('🎨 Fonctionnalité Modèles à Réaliser BETA initialisée');
        
        // Ajouter les event listeners pour les boutons
        const templateBtn = document.getElementById('templateBtn');
        const templateBtn2 = document.getElementById('templateBtn2');
        const publishTemplateBtn = document.getElementById('publishTemplateBtn');
        const publishTemplateBtnMobile = document.getElementById('publishTemplateBtnMobile');
        
        console.log('🔍 Recherche des boutons:', {
            templateBtn: !!templateBtn,
            templateBtn2: !!templateBtn2,
            publishTemplateBtn: !!publishTemplateBtn,
            publishTemplateBtnMobile: !!publishTemplateBtnMobile
        });
        
        if (templateBtn) {
            templateBtn.addEventListener('click', function() {
                console.log('🖱️ Bouton templateBtn cliqué !');
                showTemplateGallery();
            });
            console.log('✅ Event listener ajouté à templateBtn');
        } else {
            console.warn('⚠️ templateBtn non trouvé !');
        }
        
        if (templateBtn2) {
            templateBtn2.addEventListener('click', function() {
                console.log('🖱️ Bouton templateBtn2 cliqué !');
                showTemplateGallery();
            });
            console.log('✅ Event listener ajouté à templateBtn2');
        } else {
            console.warn('⚠️ templateBtn2 non trouvé !');
        }
        
        if (publishTemplateBtn) {
            publishTemplateBtn.addEventListener('click', function() {
                console.log('🖱️ Bouton publishTemplateBtn cliqué !');
                showPublishTemplateDialog();
            });
            console.log('✅ Event listener ajouté à publishTemplateBtn');
        }
        
        if (publishTemplateBtnMobile) {
            publishTemplateBtnMobile.addEventListener('click', function() {
                console.log('🖱️ Bouton publishTemplateBtnMobile cliqué !');
                showPublishTemplateDialog();
            });
            console.log('✅ Event listener ajouté à publishTemplateBtnMobile');
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
     * Affiche la galerie de modèles par thème (modèles locaux + modèles partagés)
     */
    async function showTemplateGallery() {
        console.log('🖼️ ========== showTemplateGallery DÉBUT ==========');
        console.log('🖼️ Ouverture de la galerie de modèles...');
        
        try {
            // Charger les modèles depuis Supabase
            let sharedTemplates = [];
            if (window.dbService) {
                console.log('📡 Chargement des modèles partagés depuis Supabase...');
                const result = await window.dbService.getTemplates({
                    orderBy: 'created_at',
                    orderDirection: 'desc',
                    limit: 100
                });
                
                if (result.success && result.data) {
                    sharedTemplates = result.data.map(template => {
                        // Détecter si c'est une animation "à réaliser" en vérifiant template_data
                        // Pour les nouveaux modèles : template_data a isEmpty: true
                        // Pour les anciens modèles : template_data = preview_data (pixels colorés)
                        let isAnimationTemplate = false;
                        if (template.is_animation && template.template_data) {
                            const firstFrame = Array.isArray(template.template_data) ? template.template_data[0] : null;
                            if (firstFrame && Array.isArray(firstFrame) && firstFrame.length > 0) {
                                // Vérifier si tous les pixels non-vides ont isEmpty: true (nouveaux modèles)
                                const nonEmptyPixels = firstFrame.filter(p => p && p.color && p.color !== '#FFFFFF');
                                const allPixelsAreEmpty = nonEmptyPixels.length > 0 && nonEmptyPixels.every(p => p.isEmpty === true);
                                
                                // Pour les anciens modèles : si template_data et preview_data sont identiques,
                                // on considère que c'est une animation complète (pas un modèle à réaliser)
                                // Si template_data diffère de preview_data ou si les pixels ont isEmpty: true, c'est un modèle à réaliser
                                const templateDataStr = JSON.stringify(template.template_data);
                                const previewDataStr = JSON.stringify(template.preview_data || template.template_data);
                                const areDifferent = templateDataStr !== previewDataStr;
                                
                                isAnimationTemplate = allPixelsAreEmpty || (areDifferent && nonEmptyPixels.length > 0);
                                
                                console.log('🔍 Détection type animation:', {
                                    templateId: template.id,
                                    templateName: template.name,
                                    allPixelsAreEmpty,
                                    areDifferent,
                                    isAnimationTemplate
                                });
                            }
                        }
                        
                        return {
                            id: template.id,
                            name: template.name,
                            description: template.description,
                            theme: template.category, // Utiliser category comme theme
                            preview: template.preview_data || template.template_data,
                            templateData: template.template_data, // Stocker aussi template_data pour charger les indicateurs
                            difficulty: template.difficulty || 1,
                            thumbnail: template.thumbnail,
                            author_email: template.author_email,
                            view_count: template.view_count || 0,
                            completion_count: template.completion_count || 0,
                            style_tags: template.style_tags || [],
                            isShared: true, // Marqueur pour identifier les modèles partagés
                            isAnimation: template.is_animation || false, // Marqueur pour animation (complète ou à réaliser)
                            isAnimationTemplate: isAnimationTemplate // Marqueur pour distinguer animation complète vs à réaliser
                        };
                    });
                    console.log(`✅ ${sharedTemplates.length} modèles partagés chargés`);
                } else {
                    console.warn('⚠️ Impossible de charger les modèles partagés:', result.error);
                }
            }
            
            // Combiner les modèles locaux et partagés
            const allTemplates = [...TEMPLATES_DATABASE.map(t => ({...t, isShared: false})), ...sharedTemplates];
            
            // Grouper les modèles par thème/catégorie
            const templatesByTheme = {};
            allTemplates.forEach(template => {
                const theme = template.theme || template.category || 'Autre';
                if (!templatesByTheme[theme]) {
                    templatesByTheme[theme] = [];
                }
                templatesByTheme[theme].push(template);
            });
            
            const themes = Object.keys(templatesByTheme).sort();
            
            // Créer le contenu de la modal avec filtres
            let modalContent = `
                <div style="position: relative; padding: 20px; color: rgba(255, 255, 255, 0.95); max-height: 80vh; overflow-y: auto;">
                    <!-- Bouton de fermeture (croix) en haut à droite -->
                    <button id="closeTemplateGalleryBtn" style="position: absolute; top: 15px; right: 15px; width: 32px; height: 32px; border-radius: 50%; background: rgba(255, 255, 255, 0.1); border: 2px solid rgba(255, 255, 255, 0.3); color: rgba(255, 255, 255, 0.95); cursor: pointer; font-size: 20px; font-weight: bold; display: flex; align-items: center; justify-content: center; z-index: 10; transition: all 0.2s;"
                            title="Fermer">
                        ×
                    </button>
                    <h3 style="margin-top: 0; text-align: center; margin-bottom: 20px; color: rgba(255, 255, 255, 0.98); font-weight: 600; padding-right: 40px;">
                        🧩 Modèles à Réaliser
                    </h3>
                    <p style="text-align: center; margin-bottom: 20px; color: rgba(255, 255, 255, 0.85);">
                        Choisissez un modèle et suivez les indications pour le compléter !
                    </p>
                    
                    <!-- Filtres -->
                    <div style="margin-bottom: 20px; padding: 15px; background: rgba(0,0,0,0.3); border-radius: 8px; border: 1px solid rgba(255,255,255,0.2);">
                        <div style="margin-bottom: 10px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: rgba(255, 255, 255, 0.95);">
                                🔍 Filtrer par catégorie :
                            </label>
                            <select id="filterCategory" 
                                    style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); color: rgba(255, 255, 255, 0.95); font-size: 14px;">
                                <option value="">Toutes les catégories</option>
                                ${TEMPLATE_CATEGORIES.map(cat => `<option value="${cat.value}" style="background: rgba(36, 48, 94, 0.95); color: rgba(255, 255, 255, 0.95);">${cat.label}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div style="margin-bottom: 10px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: rgba(255, 255, 255, 0.95);">
                                🎨 Filtrer par style (optionnel) :
                            </label>
                            <input type="text" id="filterStyle" placeholder="ex: zelda, mario, marvel..." 
                                   style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); color: rgba(255, 255, 255, 0.95); font-size: 14px;">
                            <p style="font-size: 0.85em; color: rgba(255, 255, 255, 0.7); margin-top: 5px;">
                                Tapez un mot-clé pour filtrer (ex: jeux-video, marvel, disney...)
                            </p>
                        </div>
                        
                        <div style="display: flex; gap: 10px;">
                            <button id="resetFiltersBtn" style="flex: 1; padding: 8px; border: 1px solid rgba(255,255,255,0.3); border-radius: 6px; background: rgba(255,255,255,0.1); color: rgba(255, 255, 255, 0.95); cursor: pointer; font-weight: 500;">
                                🔄 Réinitialiser
                            </button>
                            <button id="applyFiltersBtn" style="flex: 1; padding: 8px; border: none; border-radius: 6px; background: linear-gradient(135deg, #4CAF50, #45A049); color: rgba(255, 255, 255, 0.95); cursor: pointer; font-weight: 600;">
                                ✓ Appliquer
                            </button>
                        </div>
                    </div>
                    
                    <div id="templatesContainer">
            `;
            
            // Obtenir l'email de l'utilisateur connecté pour afficher le bouton de suppression
            const currentUserEmail = window.authService?.getUserEmail() || '';
            
            // Parcourir chaque thème
            themes.forEach(theme => {
                modalContent += `
                    <div class="theme-section" data-theme="${theme}" style="margin-bottom: 30px;">
                        <h4 style="margin-bottom: 15px; color: #4CAF50; font-size: 1.2em; border-bottom: 2px solid rgba(76, 175, 80, 0.5); padding-bottom: 8px; font-weight: 600;">
                            ${theme}
                        </h4>
                        <div class="templates-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 15px;">
                `;
                
                templatesByTheme[theme].forEach(template => {
                    // Utiliser la miniature si disponible, sinon générer un aperçu
                    let previewHTML = '';
                    if (template.thumbnail) {
                        previewHTML = `<img src="${template.thumbnail}" style="width: 100%; height: 100%; object-fit: contain;" alt="${template.name}">`;
                    } else if (template.preview) {
                        // Si c'est une animation (array de frames), utiliser la première frame pour l'aperçu
                        let previewFrame = template.preview;
                        if (template.isAnimation && Array.isArray(template.preview) && template.preview.length > 0 && Array.isArray(template.preview[0])) {
                            previewFrame = template.preview[0]; // Utiliser la première frame
                        }
                        previewHTML = generateTemplatePreview(previewFrame);
                    } else {
                        previewHTML = '<div style="color: #999; text-align: center; padding: 20px;">Aperçu indisponible</div>';
                    }
                    
                    const isAnimationModel = template.isAnimation || (template.preview && Array.isArray(template.preview) && template.preview.length > 0 && Array.isArray(template.preview[0]));
                    const animationBadge = isAnimationModel ? '<div style="font-size: 0.7em; color: #FFC107; margin-top: 4px; font-weight: 500;">🎬 Animation</div>' : '';
                    
                    const authorInfo = template.isShared ? `<div style="font-size: 0.75em; color: rgba(255, 255, 255, 0.6); margin-top: 4px;">Par ${template.author_email?.split('@')[0] || 'Anonyme'}</div>` : '';
                    const viewInfo = template.view_count > 0 ? `<div style="font-size: 0.75em; color: rgba(255, 255, 255, 0.6);">👁️ ${template.view_count}</div>` : '';
                    
                    // Vérifier si l'utilisateur connecté est l'auteur du modèle
                    const isOwner = template.isShared && template.author_email && currentUserEmail && template.author_email.toLowerCase() === currentUserEmail.toLowerCase();
                    const deleteButton = isOwner ? `
                        <button class="delete-template-btn" data-template-id="${template.id}" data-template-name="${template.name}"
                                style="position: absolute; top: 5px; right: 5px; width: 24px; height: 24px; border-radius: 50%; background: rgba(244, 67, 54, 0.9); border: 2px solid rgba(255, 255, 255, 0.9); color: white; cursor: pointer; font-size: 14px; font-weight: bold; display: flex; align-items: center; justify-content: center; z-index: 10; transition: all 0.2s;"
                                title="Supprimer ce modèle">
                            ×
                        </button>
                    ` : '';
                    
                    modalContent += `
                        <div class="template-item" data-template-id="${template.id}" 
                             data-template-theme="${theme}"
                             data-template-styles="${(template.style_tags || []).join(',')}"
                             data-is-shared="${template.isShared ? 'true' : 'false'}"
                             style="position: relative; cursor: pointer; background: rgba(255,255,255,0.1); border-radius: 8px; padding: 10px; transition: all 0.3s; border: 2px solid ${template.isShared ? 'rgba(156, 39, 176, 0.5)' : 'transparent'};">
                            ${deleteButton}
                            <div style="background: white; border-radius: 4px; padding: 5px; margin-bottom: 8px; display: flex; justify-content: center; align-items: center; min-height: 80px;">
                                ${previewHTML}
                            </div>
                            <div style="text-align: center; font-weight: 600; margin-bottom: 4px; color: rgba(255, 255, 255, 0.95);">${template.name}</div>
                            ${authorInfo}
                            <div style="text-align: center; font-size: 0.85em; color: rgba(255, 255, 255, 0.7); margin-top: 4px;">
                                ${'⭐'.repeat(template.difficulty || 1)}
                            </div>
                            ${viewInfo}
                            ${animationBadge}
                            ${template.isShared ? '<div style="font-size: 0.7em; color: #BB86FC; margin-top: 4px; font-weight: 500;">✨ Partagé</div>' : ''}
                        </div>
                    `;
                });
                
                modalContent += `
                        </div>
                    </div>
                `;
            });
            
            modalContent += `
                    </div>
                    <div style="display: flex; gap: 10px; margin-top: 20px; justify-content: center;">
                        <button id="cancelTemplateBtn" style="flex: 0 0 auto; padding: 12px 24px; border: 1px solid rgba(255,255,255,0.3); border-radius: 8px; background: rgba(255,255,255,0.1); color: rgba(255, 255, 255, 0.95); cursor: pointer; font-weight: 600;">
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
                <div class="modal-content" style="max-width: 900px; width: 90%; max-height: 90vh; background: linear-gradient(155deg, rgba(36, 48, 94, 0.98), rgba(28, 38, 80, 0.95)); border: 1px solid rgba(255, 255, 255, 0.2); color: rgba(255, 255, 255, 0.95);">
                    ${modalContent}
                </div>
            `;
            
            // Ajouter des styles CSS pour les éléments de formulaire dans cette modal
            const styleSheet = document.createElement('style');
            styleSheet.textContent = `
                #filterCategory option,
                #templateCategoryInput option {
                    background: rgba(36, 48, 94, 0.98) !important;
                    color: rgba(255, 255, 255, 0.95) !important;
                    padding: 8px;
                }
                #filterStyle::placeholder,
                #templateNameInput::placeholder,
                #templateDescriptionInput::placeholder {
                    color: rgba(255, 255, 255, 0.6) !important;
                    opacity: 1 !important;
                }
            `;
            document.head.appendChild(styleSheet);
            
            document.body.appendChild(modal);
            window.currentTemplateGallery = modal; // Stocker pour rafraîchissement
            
            // Fonction pour charger un modèle (locale ou partagée)
            function loadTemplateFromGallery(templateId, isShared) {
                if (isShared) {
                    // Charger depuis Supabase
                    loadSharedTemplate(templateId);
                } else {
                    // Charger depuis la base locale
                    const template = TEMPLATES_DATABASE.find(t => t.id === templateId);
                    if (template) {
                        loadTemplate(template);
                    } else {
                        alert('❌ Modèle non trouvé.');
                    }
                }
            }
            
            // Event listeners pour les modèles
            const templateItems = modal.querySelectorAll('.template-item');
            console.log('🔍 Nombre de modèles trouvés dans la modal:', templateItems.length);
            
            templateItems.forEach((item, index) => {
                const templateId = item.dataset.templateId;
                const isShared = item.dataset.isShared === 'true';
                
                // Effets hover
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
                        const isShared = this.dataset.isShared === 'true';
                        this.style.borderColor = isShared ? 'rgba(156, 39, 176, 0.5)' : 'transparent';
                    } catch (e) {
                        console.warn('Erreur hover leave:', e);
                    }
                });
                
                item.addEventListener('click', function(e) {
                    try {
                        // Ne pas charger le modèle si on a cliqué sur le bouton de suppression
                        if (e.target.classList.contains('delete-template-btn') || e.target.closest('.delete-template-btn')) {
                            return;
                        }
                        
                        console.log('🖱️ Clic sur un modèle détecté !', { templateId, isShared });
                        loadTemplateFromGallery(templateId, isShared);
                        modal.remove();
                        window.currentTemplateGallery = null;
                    } catch (error) {
                        console.error('❌ ERREUR lors du clic sur le modèle:', error);
                        alert('❌ Erreur lors du chargement du modèle. Vérifiez la console.');
                    }
                });
            });
            
            // Event listeners pour les boutons de suppression
            const deleteButtons = modal.querySelectorAll('.delete-template-btn');
            deleteButtons.forEach(button => {
                // Effets hover pour les boutons de suppression
                button.addEventListener('mouseenter', function() {
                    this.style.background = 'rgba(244, 67, 54, 1)';
                    this.style.transform = 'scale(1.1)';
                });
                
                button.addEventListener('mouseleave', function() {
                    this.style.background = 'rgba(244, 67, 54, 0.9)';
                    this.style.transform = 'scale(1)';
                });
                
                button.addEventListener('click', async function(e) {
                    e.stopPropagation(); // Empêcher le clic de déclencher le chargement du modèle
                    
                    const templateId = this.dataset.templateId;
                    const templateName = this.dataset.templateName || 'ce modèle';
                    
                    // Demander confirmation
                    const confirmed = confirm(
                        `🗑️ Êtes-vous sûr de vouloir supprimer "${templateName}" ?\n\n` +
                        `Cette action est irréversible.`
                    );
                    
                    if (!confirmed) {
                        return;
                    }
                    
                    try {
                        // Désactiver le bouton pendant la suppression
                        this.disabled = true;
                        this.style.opacity = '0.5';
                        this.style.cursor = 'not-allowed';
                        
                        // Supprimer le modèle
                        const result = await window.dbService.deleteTemplate(templateId);
                        
                        if (result.success) {
                            // Retirer l'élément de la liste visuellement
                            const templateItem = this.closest('.template-item');
                            if (templateItem) {
                                templateItem.style.transition = 'opacity 0.3s';
                                templateItem.style.opacity = '0';
                                setTimeout(() => {
                                    templateItem.remove();
                                    
                                    // Vérifier si la section de thème est maintenant vide
                                    const themeSection = templateItem.closest('.theme-section');
                                    if (themeSection) {
                                        const remainingItems = themeSection.querySelectorAll('.template-item');
                                        if (remainingItems.length === 0) {
                                            themeSection.remove();
                                        }
                                    }
                                }, 300);
                            }
                            
                            alert(`✅ Modèle "${templateName}" supprimé avec succès !`);
                        } else {
                            alert(`❌ Erreur lors de la suppression : ${result.error || 'Erreur inconnue'}`);
                            this.disabled = false;
                            this.style.opacity = '1';
                            this.style.cursor = 'pointer';
                        }
                    } catch (error) {
                        console.error('❌ Erreur lors de la suppression du modèle:', error);
                        alert(`❌ Erreur lors de la suppression : ${error.message || 'Erreur inconnue'}`);
                        this.disabled = false;
                        this.style.opacity = '1';
                        this.style.cursor = 'pointer';
                    }
                });
            });
            
            // Fonction de filtrage
            function applyFilters() {
                const categoryFilter = document.getElementById('filterCategory').value.toLowerCase();
                const styleFilter = document.getElementById('filterStyle').value.toLowerCase().trim();
                
                const themeSections = modal.querySelectorAll('.theme-section');
                const templateItems = modal.querySelectorAll('.template-item');
                
                let visibleCount = 0;
                
                themeSections.forEach(section => {
                    const theme = section.dataset.theme.toLowerCase();
                    let sectionVisible = false;
                    
                    const items = section.querySelectorAll('.template-item');
                    items.forEach(item => {
                        const itemTheme = item.dataset.templateTheme.toLowerCase();
                        const itemStyles = (item.dataset.templateStyles || '').toLowerCase();
                        
                        let itemVisible = true;
                        
                        // Filtre par catégorie
                        if (categoryFilter && itemTheme !== categoryFilter) {
                            itemVisible = false;
                        }
                        
                        // Filtre par style
                        if (styleFilter && itemStyles && !itemStyles.includes(styleFilter)) {
                            itemVisible = false;
                        }
                        
                        if (itemVisible) {
                            item.style.display = '';
                            sectionVisible = true;
                            visibleCount++;
                        } else {
                            item.style.display = 'none';
                        }
                    });
                    
                    // Masquer la section si aucun modèle visible
                    section.style.display = sectionVisible ? '' : 'none';
                });
                
                // Afficher un message si aucun résultat
                const container = document.getElementById('templatesContainer');
                let noResultsMsg = container.querySelector('.no-results-msg');
                if (visibleCount === 0) {
                                if (!noResultsMsg) {
                        noResultsMsg = document.createElement('div');
                        noResultsMsg.className = 'no-results-msg';
                        noResultsMsg.style.cssText = 'text-align: center; padding: 40px; color: rgba(255,255,255,0.85);';
                        noResultsMsg.innerHTML = '<p style="font-size: 1.1em; margin-bottom: 10px; font-weight: 600;">🔍 Aucun modèle trouvé avec ces filtres.</p><p style="margin-top: 10px; font-size: 0.9em; color: rgba(255,255,255,0.7);">Essayez de modifier vos critères de recherche.</p>';
                        container.appendChild(noResultsMsg);
                    }
                } else {
                    if (noResultsMsg) {
                        noResultsMsg.remove();
                    }
                }
                
                console.log(`🔍 ${visibleCount} modèles visibles après filtrage`);
            }
            
            // Ajouter des styles hover pour les boutons de filtre
            const applyFiltersBtn = document.getElementById('applyFiltersBtn');
            const resetFiltersBtn = document.getElementById('resetFiltersBtn');
            
            if (applyFiltersBtn) {
                applyFiltersBtn.addEventListener('mouseenter', function() {
                    this.style.opacity = '0.9';
                    this.style.transform = 'translateY(-1px)';
                });
                applyFiltersBtn.addEventListener('mouseleave', function() {
                    this.style.opacity = '1';
                    this.style.transform = 'translateY(0)';
                });
            }
            
            if (resetFiltersBtn) {
                resetFiltersBtn.addEventListener('mouseenter', function() {
                    this.style.background = 'rgba(255,255,255,0.2)';
                });
                resetFiltersBtn.addEventListener('mouseleave', function() {
                    this.style.background = 'rgba(255,255,255,0.1)';
                });
            }
            
            // Event listeners pour les filtres
            if (applyFiltersBtn) {
                applyFiltersBtn.addEventListener('click', applyFilters);
            }
            
            if (resetFiltersBtn) {
                resetFiltersBtn.addEventListener('click', () => {
                    const categoryFilter = document.getElementById('filterCategory');
                    const styleFilter = document.getElementById('filterStyle');
                    if (categoryFilter) categoryFilter.value = '';
                    if (styleFilter) styleFilter.value = '';
                    applyFilters();
                });
            }
            
            // Appliquer le filtre automatiquement sur Enter dans le champ style
            const filterStyleInput = document.getElementById('filterStyle');
            if (filterStyleInput) {
                filterStyleInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        applyFilters();
                    }
                });
            }
            
            // Event listener pour le bouton de fermeture (croix) en haut
            const closeBtn = document.getElementById('closeTemplateGalleryBtn');
            if (closeBtn) {
                // Effets hover pour le bouton de fermeture
                closeBtn.addEventListener('mouseenter', function() {
                    this.style.background = 'rgba(255, 255, 255, 0.2)';
                    this.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                    this.style.transform = 'scale(1.1)';
                });
                
                closeBtn.addEventListener('mouseleave', function() {
                    this.style.background = 'rgba(255, 255, 255, 0.1)';
                    this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    this.style.transform = 'scale(1)';
                });
                
                closeBtn.addEventListener('click', () => {
                    console.log('❌ Fermeture de la galerie de modèles (croix)');
                    modal.remove();
                    window.currentTemplateGallery = null;
                });
            }
            
            // Bouton annuler (gardé en bas pour accessibilité)
            const cancelBtn = document.getElementById('cancelTemplateBtn');
            if (cancelBtn) {
                cancelBtn.addEventListener('mouseenter', function() {
                    this.style.background = 'rgba(255,255,255,0.2)';
                });
                cancelBtn.addEventListener('mouseleave', function() {
                    this.style.background = 'rgba(255,255,255,0.1)';
                });
                cancelBtn.addEventListener('click', () => {
                    console.log('❌ Annulation de la sélection de modèle');
                    modal.remove();
                    window.currentTemplateGallery = null;
                });
            }
            
            console.log('🖼️ ========== showTemplateGallery FIN ==========');
        } catch (error) {
            console.error('❌ ERREUR dans showTemplateGallery:', error);
            alert('❌ Erreur lors de l\'ouverture de la galerie. Vérifiez la console.');
        }
    }
    
    /**
     * Charge un modèle partagé depuis Supabase
     */
    async function loadSharedTemplate(templateId) {
        console.log('📥 Chargement du modèle partagé:', templateId);
        
        try {
            if (!window.dbService) {
                alert('❌ Service de base de données non disponible.');
                return;
            }
            
            const result = await window.dbService.getTemplateById(templateId);
            
            if (!result.success || !result.data) {
                alert('❌ Impossible de charger le modèle : ' + (result.error || 'Modèle non trouvé'));
                return;
            }
            
            const templateData = result.data;
            
            // Convertir le modèle partagé au format attendu
            // Utiliser template_data (version vide avec isEmpty: true mais couleurs stockées) pour le chargement
            // et preview_data pour l'aperçu dans la galerie
            // Vérifier si c'est une animation (tableau de frames) ou une frame unique
            // IMPORTANT : template_data contient les pixels avec isEmpty: true mais avec leurs couleurs (pour les indicateurs)
            // preview_data contient les pixels colorés (pour l'aperçu dans la galerie)
            const templateData_raw = templateData.template_data || templateData.preview_data;
            const previewData_raw = templateData.preview_data || templateData.template_data;
            
            // Utiliser le champ is_animation de la base de données si disponible
            // Sinon, détecter automatiquement
            let isAnimation = templateData.is_animation || false;
            let isAnimationTemplate = templateData.is_animation_template || false;
            
            if (!isAnimation && Array.isArray(templateData_raw) && templateData_raw.length > 0) {
                // Si le premier élément est un array, c'est probablement une animation (array de frames)
                // Sinon, c'est une frame unique (array de pixels)
                const firstElement = templateData_raw[0];
                isAnimation = Array.isArray(firstElement);
            }
            
            console.log('📥 Données récupérées depuis Supabase:', {
                hasTemplateData: !!templateData.template_data,
                hasPreviewData: !!templateData.preview_data,
                isAnimation: isAnimation,
                isAnimationTemplate: isAnimationTemplate,
                templateDataType: Array.isArray(templateData_raw) ? 
                    (Array.isArray(templateData_raw[0]) ? 'array of frames' : 'single frame') : 
                    typeof templateData_raw
            });
            
            const template = {
                id: templateData.id,
                name: templateData.name,
                description: templateData.description,
                theme: templateData.category,
                preview: previewData_raw, // Version colorée pour l'aperçu dans la galerie
                templateData: templateData_raw, // Version avec isEmpty: true mais couleurs pour les indicateurs
                difficulty: templateData.difficulty || 1,
                isShared: true,
                author_email: templateData.author_email,
                isAnimation: isAnimation, // Marqueur pour animation (complète ou à réaliser)
                isAnimationTemplate: isAnimationTemplate // Marqueur pour distinguer animation complète vs à réaliser
            };
            
            // Charger le modèle
            loadTemplate(template);
            
            // Marquer comme complété si l'utilisateur le finit (sera géré plus tard)
            
        } catch (error) {
            console.error('Erreur lors du chargement du modèle partagé:', error);
            alert('❌ Erreur lors du chargement du modèle. Vérifiez la console.');
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
     * Affiche le dialogue pour publier un modèle
     */
    function showPublishTemplateDialog() {
        // Vérifier qu'il y a du contenu dans la grille actuelle
        if (!frames || frames.length === 0 || !frames[currentFrame]) {
            alert('⚠️ Veuillez d\'abord créer quelque chose dans la grille avant de publier un modèle.');
            return;
        }
        
        const currentFrameData = frames[currentFrame];
        const hasContent = currentFrameData.some(pixel => !pixel.isEmpty);
        
        if (!hasContent) {
            alert('⚠️ La grille actuelle est vide. Veuillez créer quelque chose avant de publier un modèle.');
            return;
        }
        
        // Créer le contenu de la modal de publication
        let styleTagsHTML = '';
        Object.entries(TEMPLATE_STYLES).forEach(([group, styles]) => {
            styleTagsHTML += `
                <div style="margin-bottom: 15px;">
                    <div style="font-weight: 600; margin-bottom: 8px; color: #BB86FC;">${group}</div>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            `;
            styles.forEach(style => {
                styleTagsHTML += `
                    <label style="display: flex; align-items: center; cursor: pointer; background: rgba(255,255,255,0.1); padding: 6px 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); transition: all 0.2s ease;">
                        <input type="checkbox" name="styleTags" value="${style.value}" style="margin-right: 6px; cursor: pointer;">
                        <span style="color: rgba(255, 255, 255, 0.95); user-select: none;">${style.label}</span>
                    </label>
                `;
            });
            styleTagsHTML += `
                    </div>
                </div>
            `;
        });
        
        const modalContent = `
            <div style="padding: 20px; color: rgba(255, 255, 255, 0.95); max-height: 80vh; overflow-y: auto;">
                <h3 style="margin-top: 0; text-align: center; margin-bottom: 20px; color: rgba(255, 255, 255, 0.98); font-weight: 600;">
                    ✨ Publier un Modèle
                </h3>
                <p style="text-align: center; margin-bottom: 20px; color: rgba(255, 255, 255, 0.85);">
                    Partagez votre création pour que d'autres puissent la réaliser !
                </p>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: rgba(255, 255, 255, 0.95);">
                        Nom du modèle * :
                    </label>
                    <input type="text" id="templateNameInput" placeholder="ex: Hibou mignon" 
                           style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); color: rgba(255, 255, 255, 0.95); font-size: 16px; box-sizing: border-box;"
                           maxlength="100">
                    <style>
                        #templateNameInput::placeholder { color: rgba(255, 255, 255, 0.6); }
                    </style>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: rgba(255, 255, 255, 0.95);">
                        Description (optionnelle) :
                    </label>
                    <textarea id="templateDescriptionInput" placeholder="Décrivez votre modèle..." 
                              style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); color: rgba(255, 255, 255, 0.95); font-size: 14px; min-height: 60px; resize: vertical; box-sizing: border-box; font-family: inherit;"
                              maxlength="500"></textarea>
                    <style>
                        #templateDescriptionInput::placeholder { color: rgba(255, 255, 255, 0.6); }
                    </style>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: rgba(255, 255, 255, 0.95);">
                        Catégorie * :
                    </label>
                    <select id="templateCategoryInput" 
                            style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); color: rgba(255, 255, 255, 0.95); font-size: 16px; box-sizing: border-box;">
                        <option value="" style="background: rgba(36, 48, 94, 0.95); color: rgba(255, 255, 255, 0.95);">-- Sélectionnez une catégorie --</option>
                        ${TEMPLATE_CATEGORIES.map(cat => `<option value="${cat.value}" style="background: rgba(36, 48, 94, 0.95); color: rgba(255, 255, 255, 0.95);">${cat.label}</option>`).join('')}
                    </select>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: rgba(255, 255, 255, 0.95);">
                        Styles/Tags (sélectionnez un ou plusieurs) :
                    </label>
                    <div style="max-height: 300px; overflow-y: auto; background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2);">
                        ${styleTagsHTML}
                    </div>
                    <p style="font-size: 0.85em; color: rgba(255, 255, 255, 0.7); margin-top: 8px;">
                        💡 Plus vous sélectionnez de tags précis, plus les utilisateurs trouveront facilement votre modèle !
                    </p>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: rgba(255, 255, 255, 0.95);">
                        Difficulté * :
                    </label>
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <input type="range" id="templateDifficultyInput" min="1" max="5" value="2" 
                               style="flex: 1;">
                        <span id="templateDifficultyValue" style="font-weight: 600; min-width: 80px; text-align: center; color: rgba(255, 255, 255, 0.95);">
                            2 ⭐⭐
                        </span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-top: 5px; font-size: 0.85em; color: rgba(255, 255, 255, 0.7);">
                        <span>Facile</span>
                        <span>Difficile</span>
                    </div>
                </div>
                
                <div style="margin-bottom: 20px; padding: 15px; background: rgba(0,0,0,0.2); border-radius: 8px; border: 1px solid rgba(255,255,255,0.2);">
                    <label style="display: block; margin-bottom: 12px; font-weight: 600; color: rgba(255, 255, 255, 0.95);">
                        Type de modèle * :
                    </label>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                    <label style="display: flex; align-items: flex-start; cursor: pointer; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 8px; border: 2px solid rgba(76, 175, 80, 0.5); transition: all 0.2s ease;" class="template-type-option" data-type="single">
                        <input type="radio" name="templateType" value="single" checked style="margin-right: 10px; margin-top: 2px; cursor: pointer;">
                        <div style="flex: 1;">
                            <div style="font-weight: 600; color: rgba(255, 255, 255, 0.95); margin-bottom: 4px;">🧩 Modèle à Réaliser (Frame unique)</div>
                            <div style="font-size: 0.85em; color: rgba(255, 255, 255, 0.7);">
                                Publiez uniquement la frame actuelle avec des indications de couleur. Les utilisateurs devront la compléter.
                            </div>
                        </div>
                    </label>
                    <label style="display: flex; align-items: flex-start; cursor: pointer; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 8px; border: 2px solid rgba(255,255,255,0.2); transition: all 0.2s ease;" class="template-type-option" data-type="animation-template">
                        <input type="radio" name="templateType" value="animation-template" style="margin-right: 10px; margin-top: 2px; cursor: pointer;">
                        <div style="flex: 1;">
                            <div style="font-weight: 600; color: rgba(255, 255, 255, 0.95); margin-bottom: 4px;">🧩 Animation à Réaliser</div>
                            <div style="font-size: 0.85em; color: rgba(255, 255, 255, 0.7);">
                                Publiez toutes les frames avec des indications de couleur. Les utilisateurs devront compléter chaque frame. ${typeof frames !== 'undefined' && frames && frames.length > 0 ? `(${frames.length} frame${frames.length > 1 ? 's' : ''} disponible${frames.length > 1 ? 's' : ''})` : ''}
                            </div>
                        </div>
                    </label>
                    <label style="display: flex; align-items: flex-start; cursor: pointer; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 8px; border: 2px solid rgba(255,255,255,0.2); transition: all 0.2s ease;" class="template-type-option" data-type="animation">
                        <input type="radio" name="templateType" value="animation" style="margin-right: 10px; margin-top: 2px; cursor: pointer;">
                        <div style="flex: 1;">
                            <div style="font-weight: 600; color: rgba(255, 255, 255, 0.95); margin-bottom: 4px;">🎬 Animation Complète</div>
                            <div style="font-size: 0.85em; color: rgba(255, 255, 255, 0.7);">
                                Partagez toutes les frames terminées pour que les utilisateurs puissent voir l'animation complète. ${typeof frames !== 'undefined' && frames && frames.length > 0 ? `(${frames.length} frame${frames.length > 1 ? 's' : ''} disponible${frames.length > 1 ? 's' : ''})` : ''}
                            </div>
                        </div>
                    </label>
                    </div>
                    <p style="font-size: 0.85em; color: rgba(255, 255, 255, 0.7); margin-top: 12px; margin-bottom: 0;">
                        💡 <strong>Frame unique</strong> : puzzle à compléter avec indicateurs de couleur.<br>
                        💡 <strong>Animation à Réaliser</strong> : toutes les frames avec indicateurs de couleur à compléter.<br>
                        💡 <strong>Animation Complète</strong> : animation terminée à partager (sans indicateurs).
                    </p>
                </div>
                
                <div style="background: rgba(156, 39, 176, 0.3); padding: 15px; border-radius: 8px; border: 1px solid rgba(156, 39, 176, 0.5); margin-bottom: 20px;">
                    <p style="margin: 0; font-size: 0.9rem; color: rgba(255, 255, 255, 0.9);">
                        💡 <strong style="font-weight: 600;">Astuce :</strong> Votre modèle sera visible par tous les utilisateurs. Assurez-vous qu'il soit terminé et prêt à être réalisé !
                    </p>
                </div>
                
                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button id="cancelPublishBtn" style="flex: 1; padding: 12px; border: 1px solid rgba(255,255,255,0.3); border-radius: 8px; background: rgba(255,255,255,0.1); color: rgba(255, 255, 255, 0.95); cursor: pointer; font-weight: 600; transition: all 0.2s ease;">
                        Annuler
                    </button>
                    <button id="publishTemplateBtnModal" style="flex: 1; padding: 12px; border: none; border-radius: 8px; background: linear-gradient(135deg, #9C27B0, #7B1FA2); color: rgba(255, 255, 255, 0.95); cursor: pointer; font-weight: 600; transition: all 0.2s ease;">
                        ✨ Publier
                    </button>
                </div>
            </div>
        `;
        
        // Créer le modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'flex';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 700px; width: 90%; max-height: 90vh; background: linear-gradient(155deg, rgba(36, 48, 94, 0.98), rgba(28, 38, 80, 0.95)); border: 1px solid rgba(255, 255, 255, 0.2); color: rgba(255, 255, 255, 0.95);">
                ${modalContent}
            </div>
        `;
        
        // Ajouter des styles CSS pour les éléments de formulaire dans cette modal
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            #templateCategoryInput option,
            #templateNameInput::placeholder,
            #templateDescriptionInput::placeholder {
                color: rgba(255, 255, 255, 0.6) !important;
                opacity: 1 !important;
            }
            #templateCategoryInput option {
                background: rgba(36, 48, 94, 0.98) !important;
                color: rgba(255, 255, 255, 0.95) !important;
                padding: 8px;
            }
        `;
        document.head.appendChild(styleSheet);
        
        document.body.appendChild(modal);
        
        // Ajouter des styles pour les labels de style tags (hover effect)
        const styleTagLabels = modal.querySelectorAll('label[style*="background: rgba(255,255,255,0.1)"]');
        styleTagLabels.forEach(label => {
            label.addEventListener('mouseenter', function() {
                this.style.background = 'rgba(255,255,255,0.2)';
                this.style.borderColor = 'rgba(255,255,255,0.4)';
            });
            label.addEventListener('mouseleave', function() {
                this.style.background = 'rgba(255,255,255,0.1)';
                this.style.borderColor = 'rgba(255,255,255,0.2)';
            });
        });
        
        // Ajouter des styles pour les boutons (hover effect)
        const cancelBtn = document.getElementById('cancelPublishBtn');
        const publishBtn = document.getElementById('publishTemplateBtnModal');
        
        if (cancelBtn) {
            cancelBtn.addEventListener('mouseenter', function() {
                this.style.background = 'rgba(255,255,255,0.2)';
            });
            cancelBtn.addEventListener('mouseleave', function() {
                this.style.background = 'rgba(255,255,255,0.1)';
            });
        }
        
        if (publishBtn) {
            publishBtn.addEventListener('mouseenter', function() {
                this.style.opacity = '0.9';
                this.style.transform = 'translateY(-1px)';
            });
            publishBtn.addEventListener('mouseleave', function() {
                this.style.opacity = '1';
                this.style.transform = 'translateY(0)';
            });
        }
        
        // Event listeners
        const difficultySlider = document.getElementById('templateDifficultyInput');
        const difficultyValue = document.getElementById('templateDifficultyValue');
        const difficultyLabels = ['1 ⭐', '2 ⭐⭐', '3 ⭐⭐⭐', '4 ⭐⭐⭐⭐', '5 ⭐⭐⭐⭐⭐'];
        
        if (difficultySlider && difficultyValue) {
            difficultySlider.addEventListener('input', (e) => {
                const value = parseInt(e.target.value) - 1;
                difficultyValue.textContent = difficultyLabels[value];
            });
        }
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                modal.remove();
            });
        }
        
        if (publishBtn) {
            publishBtn.addEventListener('click', async () => {
                await publishCurrentTemplate(modal);
            });
        }
    }
    
    /**
     * Publie le modèle actuel dans la banque de modèles
     */
    async function publishCurrentTemplate(modal) {
        try {
            const name = document.getElementById('templateNameInput').value.trim();
            const description = document.getElementById('templateDescriptionInput').value.trim();
            const category = document.getElementById('templateCategoryInput').value;
            const difficulty = parseInt(document.getElementById('templateDifficultyInput').value);
            
            // Récupérer les tags sélectionnés
            const selectedTags = Array.from(modal.querySelectorAll('input[name="styleTags"]:checked'))
                .map(checkbox => checkbox.value);
            
            // Récupérer le type de modèle sélectionné
            const templateType = modal.querySelector('input[name="templateType"]:checked')?.value || 'single';
            const isAnimation = templateType === 'animation' || templateType === 'animation-template';
            const isAnimationTemplate = templateType === 'animation-template'; // Animation à réaliser avec indicateurs
            
            // Validation
            if (!name) {
                alert('❌ Veuillez saisir un nom pour le modèle.');
                return;
            }
            
            if (!category) {
                alert('❌ Veuillez sélectionner une catégorie.');
                return;
            }
            
            if (!window.dbService) {
                alert('❌ Service de base de données non disponible.');
                return;
            }
            
            let templateData_withColors, previewData_complete, thumbnail;
            
            if (isAnimation) {
                // Mode Animation : publier toutes les frames
                if (!frames || frames.length === 0) {
                    alert('❌ Aucune frame à publier.');
                    return;
                }
                
                console.log('🎬 Publication d\'une animation complète:', {
                    nombreFrames: frames.length,
                    frames: frames.map((f, i) => ({
                        index: i,
                        length: f ? f.length : 0,
                        hasContent: f ? f.some(p => p && !p.isEmpty) : false
                    }))
                });
                
                // Créer template_data avec toutes les frames
                // IMPORTANT : Ne pas filtrer les frames, même si elles sont vides, pour préserver l'ordre et le nombre
                templateData_withColors = frames.map((frame, frameIndex) => {
                    // Si la frame est invalide, créer une frame vide
                    if (!frame || !Array.isArray(frame) || frame.length === 0) {
                        console.warn(`⚠️ Frame ${frameIndex} invalide, création d'une frame vide`);
                        return createEmptyFrame().map(pixel => ({
                            color: pixel.color,
                            isEmpty: isAnimationTemplate // Si c'est un modèle à réaliser, marquer comme vide
                        }));
                    }
                    
                    // Convertir chaque pixel de la frame
                    return frame.map(pixel => {
                        // Pour les animations à réaliser, on garde la couleur même si isEmpty est true
                        // car on en a besoin pour créer les indicateurs
                        const color = pixel && pixel.color ? pixel.color : '#FFFFFF';
                        // Si c'est une animation "à réaliser", les pixels sont vides (isEmpty: true) mais gardent leur couleur
                        // Si c'est une animation complète, les pixels sont remplis (isEmpty: false)
                        return {
                            color: color,
                            isEmpty: isAnimationTemplate ? true : false
                        };
                    });
                });
                
                console.log('✅ Frames préparées pour publication:', {
                    nombreFramesOriginal: frames.length,
                    nombreFramesPreparees: templateData_withColors.length,
                    isAnimationTemplate: isAnimationTemplate,
                    frames: templateData_withColors.map((f, i) => ({
                        index: i,
                        length: f.length,
                        firstPixel: f.length > 0 ? f[0] : null
                    }))
                });
                
                // Pour les animations à réaliser : previewData doit contenir les pixels colorés (pour l'aperçu)
                // Pour les animations complètes : previewData = templateData (même contenu)
                if (isAnimationTemplate) {
                    // Créer previewData avec les pixels colorés (pour l'aperçu dans la galerie)
                    previewData_complete = frames.map(frame => {
                        if (!frame || !Array.isArray(frame) || frame.length === 0) {
                            return createEmptyFrame().map(pixel => ({
                                color: pixel.color,
                                isEmpty: false
                            }));
                        }
                        return frame.map(pixel => ({
                            color: pixel && pixel.color ? pixel.color : '#FFFFFF',
                            isEmpty: false // Version colorée pour l'aperçu
                        }));
                    });
                } else {
                    // Animation complète : previewData = templateData
                    previewData_complete = templateData_withColors;
                }
                
                // Générer la miniature depuis la première frame pour l'aperçu dans la galerie
                if (frames[0] && frames[0].length > 0) {
                    const firstFrameForThumbnail = frames[0].map(pixel => ({
                        color: pixel && pixel.color ? pixel.color : '#FFFFFF',
                        isEmpty: false
                    }));
                    thumbnail = generateThumbnail(firstFrameForThumbnail);
                } else {
                    thumbnail = null;
                }
            } else {
                // Mode Frame unique : publier seulement la frame actuelle
                const currentFrameData = frames[currentFrame];
                if (!currentFrameData || currentFrameData.length === 0) {
                    alert('❌ Aucune donnée à publier.');
                    return;
                }
                
                // Créer template_data : version avec les pixels à colorier marqués comme non-vides
                // mais ils seront vidés lors du chargement pour que l'utilisateur doive colorier
                // La couleur est conservée pour créer les indicateurs
                templateData_withColors = currentFrameData.map(pixel => ({
                    color: pixel.isEmpty ? '#FFFFFF' : pixel.color,
                    isEmpty: false // Marquer comme non-vide pour que loadTemplate crée les indicateurs
                }));
                
                // La previewData contient la version complète pour l'aperçu dans la galerie
                previewData_complete = currentFrameData.map(pixel => ({
                    color: pixel.isEmpty ? '#FFFFFF' : pixel.color,
                    isEmpty: false // Version complète pour l'aperçu
                }));
                
                // Générer une miniature (thumbnail) depuis la version complète
                thumbnail = generateThumbnail(previewData_complete);
            }
            
            // Préparer les données du modèle
            const templateData = {
                name,
                description: description || null,
                category,
                styleTags: selectedTags,
                templateData: templateData_withColors, // Version avec couleurs pour les indicateurs (peut être une frame ou plusieurs)
                previewData: previewData_complete, // Version complète pour l'aperçu dans la galerie
                thumbnail,
                difficulty,
                isAnimation: isAnimation, // Marqueur pour savoir si c'est une animation (complète ou à réaliser)
                isAnimationTemplate: isAnimationTemplate // Marqueur pour distinguer animation complète vs à réaliser
            };
            
            // Désactiver le bouton pendant la publication
            const publishBtn = document.getElementById('publishTemplateBtnModal');
            publishBtn.disabled = true;
            publishBtn.textContent = '⏳ Publication...';
            
            // Publier le modèle
            const result = await window.dbService.publishTemplate(templateData);
            
            if (result.success) {
                modal.remove();
                alert('✅ Modèle publié avec succès !\n\nD\'autres utilisateurs pourront maintenant le découvrir et le réaliser. 🎨');
                
                // Rafraîchir la galerie si elle est ouverte
                if (window.currentTemplateGallery) {
                    showTemplateGallery();
                }
            } else {
                alert('❌ Erreur lors de la publication : ' + (result.error || 'Erreur inconnue'));
                publishBtn.disabled = false;
                publishBtn.textContent = '✨ Publier';
            }
        } catch (error) {
            console.error('Erreur lors de la publication:', error);
            alert('❌ Erreur inattendue lors de la publication. Consultez la console pour plus de détails.');
            const publishBtn = document.getElementById('publishTemplateBtnModal');
            if (publishBtn) {
                publishBtn.disabled = false;
                publishBtn.textContent = '✨ Publier';
            }
        }
    }
    
    /**
     * Génère une miniature (thumbnail) à partir d'une frame
     */
    function generateThumbnail(frame) {
        const size = 120;
        const pixelSize = size / GRID_SIZE;
        
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        frame.forEach((pixel, index) => {
            if (!pixel || pixel.isEmpty) return;
            
            const x = (index % GRID_SIZE) * pixelSize;
            const y = Math.floor(index / GRID_SIZE) * pixelSize;
            
            ctx.fillStyle = pixel.color;
            ctx.fillRect(x, y, pixelSize, pixelSize);
        });
        
        return canvas.toDataURL('image/png');
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
        
        // Stocker le modèle actuel
        currentTemplate = template;
        window.currentTemplate = template;
        
        // Mettre à jour le titre du projet dès le début (pour tous les types de modèles)
        const title = document.getElementById('projectTitle');
        if (title && template.name) {
            title.textContent = template.name;
        }
        
        // Vérifier si c'est une animation complète ou une frame unique
        // Une animation est un tableau de frames, où chaque frame est un array de pixels
        // Une frame unique est un array de pixels directement
        
        // Vérifier d'abord le flag isAnimation si disponible
        let templateIsAnimation = template.isAnimation || false;
        let templateIsAnimationTemplate = template.isAnimationTemplate || false;
        
        // Sinon, détecter automatiquement : si template.preview[0] est un objet avec 'color' et 'isEmpty', c'est une frame unique
        // Si template.preview[0] est un array, c'est une animation (array de frames)
        if (!templateIsAnimation && Array.isArray(template.preview) && template.preview.length > 0) {
            const firstElement = template.preview[0];
            // Si le premier élément est un array, c'est probablement une animation
            // Si le premier élément est un objet avec 'color', c'est une frame unique
            if (Array.isArray(firstElement)) {
                templateIsAnimation = true;
                // Détecter si c'est une animation "à réaliser" en vérifiant templateData si disponible
                if (template.templateData && Array.isArray(template.templateData[0])) {
                    const firstFrame = template.templateData[0];
                    const nonEmptyPixels = firstFrame.filter(p => p && p.color && p.color !== '#FFFFFF');
                    // Vérifier si tous les pixels non-vides ont isEmpty: true (nouveaux modèles)
                    const allPixelsAreEmpty = nonEmptyPixels.length > 0 && nonEmptyPixels.every(p => p.isEmpty === true);
                    
                    // Pour les anciens modèles : si template_data et preview_data sont identiques,
                    // on considère que c'est une animation complète (pas un modèle à réaliser)
                    const templateDataStr = JSON.stringify(template.templateData);
                    const previewDataStr = JSON.stringify(template.preview);
                    const areDifferent = templateDataStr !== previewDataStr;
                    
                    templateIsAnimationTemplate = allPixelsAreEmpty || (areDifferent && nonEmptyPixels.length > 0);
                    
                    console.log('🔍 Détection type animation dans loadTemplate:', {
                        templateId: template.id,
                        allPixelsAreEmpty,
                        areDifferent,
                        isAnimationTemplate: templateIsAnimationTemplate
                    });
                }
            } else if (firstElement && typeof firstElement === 'object' && 'color' in firstElement) {
                templateIsAnimation = false; // Frame unique
            }
        }
        
        console.log('📌 Type de modèle détecté:', {
            templateId: currentTemplate.id,
            isAnimation: templateIsAnimation,
            isAnimationTemplate: templateIsAnimationTemplate,
            previewLength: Array.isArray(template.preview) ? template.preview.length : 0,
            firstElementType: Array.isArray(template.preview) && template.preview.length > 0 ? 
                (Array.isArray(template.preview[0]) ? 'array (animation)' : typeof template.preview[0] + ' (frame unique)') : 'none'
        });
        
        if (templateIsAnimation) {
            // Vérifier si c'est une animation "à réaliser" ou une animation complète
            if (templateIsAnimationTemplate) {
                // Mode Animation à Réaliser : charger toutes les frames avec indicateurs
                isTemplateMode = true;
                window.isTemplateMode = true;
                
                const frameCount = Array.isArray(template.templateData || template.preview) ? (template.templateData || template.preview).length : 1;
                const confirmMessage = 
                    '🧩 Charger cette animation à réaliser ?\n\n' +
                    `L'animation contient ${frameCount} frame(s) à compléter.\n\n` +
                    'Chaque frame aura des indications de couleur (triangles) pour vous guider.\n' +
                    'Attention : cela remplacera votre travail actuel !';
                
                if (!confirm(confirmMessage)) {
                    console.log('❌ Chargement annulé par l\'utilisateur');
                    return;
                }
                
                // Utiliser templateData si disponible (contient les pixels avec isEmpty: true), sinon preview
                const sourceData = template.templateData || template.preview;
                
                console.log('📥 Chargement animation à réaliser - Données source:', {
                    hasTemplateData: !!template.templateData,
                    hasPreview: !!template.preview,
                    sourceDataType: Array.isArray(sourceData) ? 'array' : typeof sourceData,
                    sourceDataLength: Array.isArray(sourceData) ? sourceData.length : 0,
                    firstFrameSample: Array.isArray(sourceData) && sourceData.length > 0 && Array.isArray(sourceData[0]) ? 
                        sourceData[0].slice(0, 10).map(p => ({ 
                            color: p?.color, 
                            isEmpty: p?.isEmpty,
                            hasColor: !!(p?.color && p?.color !== '#FFFFFF')
                        })) : 'N/A'
                });
                
                // Créer un nouveau projet avec toutes les frames vides mais avec les couleurs pour les indicateurs
                frames = sourceData.map((frame, frameIndex) => {
                    if (!Array.isArray(frame)) {
                        console.warn(`⚠️ Frame ${frameIndex} n'est pas un array, création d'une frame vide`);
                        return createEmptyFrame();
                    }
                    // Chaque frame est un array de pixels à réaliser
                    // IMPORTANT : conserver la couleur même si isEmpty est true (pour les indicateurs)
                    return frame.map((pixel, pixelIndex) => {
                        if (pixel && typeof pixel === 'object' && 'color' in pixel) {
                            const color = pixel.color || '#FFFFFF';
                            // Garder la couleur même si isEmpty est true (nécessaire pour les indicateurs)
                            return {
                                color: color,
                                isEmpty: true // Vide pour que l'utilisateur doive colorier
                            };
                        }
                        // Si le pixel n'a pas de couleur, créer un pixel blanc vide
                        return {
                            color: '#FFFFFF',
                            isEmpty: true
                        };
                    });
                });
                
                // Vérifier que les couleurs sont bien présentes dans les frames
                const framesWithColors = frames.map((frame, idx) => {
                    const pixelsWithColor = frame.filter(p => p && p.color && p.color !== '#FFFFFF').length;
                    return { frameIndex: idx, pixelsWithColor, totalPixels: frame.length };
                });
                console.log('🎨 Frames créées avec couleurs:', framesWithColors);
                
                currentFrame = 0;
                
                // Stocker le template avec templateData pour les indicateurs
                // IMPORTANT : stocker templateData pour que l'intercepteur puisse l'utiliser
                currentTemplate = {
                    ...template,
                    preview: sourceData, // Pour l'affichage
                    templateData: sourceData // Pour les indicateurs (doit être stocké ici)
                };
                window.currentTemplate = currentTemplate;
                
                // Mettre à jour l'interface des frames
                if (typeof updateFramesList === 'function') {
                    updateFramesList();
                }
                
                // Charger la première frame normalement
                if (typeof loadFrame === 'function') {
                    loadFrame(currentFrame);
                }
                
                // Ajouter les indicateurs après un court délai pour la première frame
                // Utiliser sourceData directement (contient les pixels avec leurs couleurs)
                setTimeout(() => {
                    if (sourceData && Array.isArray(sourceData) && sourceData[currentFrame]) {
                        const frameData = sourceData[currentFrame];
                        console.log('🎨 Ajout des indicateurs pour la première frame (index', currentFrame, ')');
                        console.log('📊 Données de la frame:', {
                            frameLength: frameData.length,
                            pixelsAvecCouleur: frameData.filter(p => p && p.color && p.color !== '#FFFFFF').length,
                            premiersPixels: frameData.slice(0, 5).map(p => ({ color: p?.color, isEmpty: p?.isEmpty }))
                        });
                        const success = addTemplateIndicators(frameData);
                        console.log('📋 Résultat ajout indicateurs frame 0:', success ? '✅ SUCCÈS' : '❌ ÉCHEC');
                    } else {
                        console.error('❌ Impossible d\'ajouter les indicateurs: sourceData ou frame manquante', {
                            hasSourceData: !!sourceData,
                            isArray: Array.isArray(sourceData),
                            currentFrame: currentFrame,
                            hasFrame: sourceData && Array.isArray(sourceData) ? !!sourceData[currentFrame] : false
                        });
                    }
                }, 500);
                
                // Intercepter les changements de frame pour ajouter les indicateurs à chaque frame
                // Réinitialiser le flag pour permettre la réinitialisation si nécessaire
                if (window.templateAnimationLoadFrameIntercepted) {
                    // Si déjà intercepté, on ne le fait pas deux fois
                    console.log('⚠️ Intercepteur loadFrame déjà en place');
                } else {
                    const originalLoadFrame = window.loadFrame;
                    if (originalLoadFrame) {
                        window.loadFrame = function(frameIndex) {
                            const result = originalLoadFrame.apply(this, arguments);
                            // Après le chargement de la frame, ajouter les indicateurs si c'est un template animation
                            if (window.isTemplateMode && window.currentTemplate) {
                                // Utiliser templateData si disponible, sinon preview
                                const templateData = window.currentTemplate.templateData || window.currentTemplate.preview;
                                if (templateData && Array.isArray(templateData) && templateData[frameIndex]) {
                                    setTimeout(() => {
                                        console.log('🎨 Ajout des indicateurs pour la frame', frameIndex);
                                        const frameData = templateData[frameIndex];
                                        if (frameData) {
                                            const success = addTemplateIndicators(frameData);
                                            console.log('📋 Résultat ajout indicateurs frame', frameIndex, ':', success ? '✅ SUCCÈS' : '❌ ÉCHEC');
                                        } else {
                                            console.warn('⚠️ Frame data manquante pour l\'index', frameIndex);
                                        }
                                    }, 150);
                                } else {
                                    console.warn('⚠️ Template data invalide pour ajouter les indicateurs:', {
                                        hasTemplate: !!window.currentTemplate,
                                        hasTemplateData: !!(window.currentTemplate && window.currentTemplate.templateData),
                                        hasPreview: !!(window.currentTemplate && window.currentTemplate.preview),
                                        frameIndex: frameIndex
                                    });
                                }
                            }
                            return result;
                        };
                        window.templateAnimationLoadFrameIntercepted = true;
                        console.log('✅ Intercepteur loadFrame configuré pour les animations à réaliser');
                    } else {
                        console.error('❌ Impossible de configurer l\'intercepteur: loadFrame non disponible');
                    }
                }
                
                alert(`✅ Animation "${template.name}" chargée avec ${frames.length} frame(s) à réaliser !`);
                
            } else {
                // Mode Animation Complète : charger toutes les frames terminées
                isTemplateMode = false;
                window.isTemplateMode = false;
                window.currentTemplate = null;
                
                const frameCount = Array.isArray(template.preview) ? template.preview.length : 1;
                const confirmMessage = 
                    '🎬 Charger cette animation complète ?\n\n' +
                    `L'animation contient ${frameCount} frame(s).\n\n` +
                    'L\'animation sera chargée avec toutes ses frames terminées.\n' +
                    'Attention : cela remplacera votre travail actuel !';
                
                if (!confirm(confirmMessage)) {
                    console.log('❌ Chargement annulé par l\'utilisateur');
                    return;
                }
                
                // Convertir toutes les frames en format normalisé
                console.log('📥 Chargement animation complète - Données reçues:', {
                    previewType: Array.isArray(template.preview) ? 'array' : typeof template.preview,
                    previewLength: Array.isArray(template.preview) ? template.preview.length : 0,
                    firstElementType: Array.isArray(template.preview) && template.preview.length > 0 ? 
                        (Array.isArray(template.preview[0]) ? 'array (frames)' : typeof template.preview[0]) : 'none'
                });
                
                frames = template.preview.map((frame, frameIndex) => {
                    if (!Array.isArray(frame)) {
                        console.warn(`⚠️ Frame ${frameIndex} n'est pas un array, création d'une frame vide`);
                        return createEmptyFrame();
                    }
                    // Chaque frame est un array de pixels
                    return frame.map(pixel => {
                        // Si pixel est déjà un objet avec color/isEmpty, l'utiliser tel quel
                        if (pixel && typeof pixel === 'object' && 'color' in pixel) {
                            return {
                                color: pixel.color || '#FFFFFF',
                                isEmpty: pixel.isEmpty || false
                            };
                        }
                        // Sinon, créer un pixel vide
                        return {
                            color: '#FFFFFF',
                            isEmpty: true
                        };
                    });
                });
                
                console.log('✅ Animation chargée:', {
                    nombreFrames: frames.length,
                    frames: frames.map((f, i) => ({
                        index: i,
                        length: f.length,
                        hasContent: f.some(p => !p.isEmpty)
                    }))
                });
                
                currentFrame = 0;
                
                // Mettre à jour l'interface des frames
                if (typeof updateFramesList === 'function') {
                    updateFramesList();
                }
                
                // Charger la première frame
                if (typeof loadFrame === 'function') {
                    loadFrame(currentFrame);
                }
                
                alert(`✅ Animation "${template.name}" chargée avec ${frames.length} frame(s) !`);
            }
        } else {
            // Mode Frame unique : modèle à réaliser avec indicateurs
            isTemplateMode = true;
            window.isTemplateMode = true;
            
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
            
            // Créer un nouveau projet avec une seule frame pour le modèle
            frames = [newFrame];
            currentFrame = 0;
            
            // Stocker le template preview avant de charger la frame
            const templatePreview = template.preview;
            
            // Mettre à jour l'interface des frames si la fonction existe
            if (typeof updateFramesList === 'function') {
                updateFramesList();
            }
            
            // Charger la frame normalement
            if (typeof loadFrame === 'function') {
                loadFrame(currentFrame);
            }
            
            // Ajouter les indicateurs après un court délai
            console.log('⏳ Attente de la fin de loadFrame pour ajouter les indicateurs...');
            
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
            
            // Pour les animations à réaliser, les pixels peuvent avoir isEmpty: true mais une couleur pour les indicateurs
            // On vérifie donc la présence d'une couleur valide plutôt que !isEmpty
            const pixelsAvecCouleur = templatePreview.filter(p => p && p.color && p.color !== '#FFFFFF').length;
            const nonVides = templatePreview.filter(p => p && !p.isEmpty).length;
            console.log('✅ Conditions remplies:', {
                pixels: pixels.length,
                templatePixels: templatePreview.length,
                nonVides: nonVides,
                pixelsAvecCouleur: pixelsAvecCouleur
            });
            
            // Vérifier qu'il y a au moins des pixels avec couleur (pour les indicateurs)
            if (pixelsAvecCouleur === 0) {
                console.error('❌ Aucun pixel avec couleur valide dans le template !');
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
        const pixelsAvecCouleurCount = templatePreview.filter(p => p && p.color && p.color !== '#FFFFFF').length;
        console.log(`📊 Template contient ${pixelsAvecCouleurCount} pixels avec couleur (pour indicateurs)`);
        
        pixels.forEach((pixel, index) => {
            if (index >= templatePreview.length) return;
            
            const templatePixel = templatePreview[index];
            
            // Si le template a une couleur à cet endroit, afficher l'indicateur
            // IMPORTANT : Pour les animations à réaliser, isEmpty peut être true mais on veut quand même afficher l'indicateur
            // On vérifie seulement qu'il y a une couleur valide (pas blanche par défaut)
            if (templatePixel && templatePixel.color && templatePixel.color !== '#FFFFFF') {
                const expectedColor = templatePixel.color;
                
                // Vérifier que le pixel est valide et dans le DOM
                if (!pixel || !pixel.parentNode) {
                    return; // Sortir de cette itération du forEach
                }
                
                try {
                    // Créer le SVG avec le triangle indicateur
                    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    svg.setAttribute('width', '100%');
                    svg.setAttribute('height', '100%');
                    svg.setAttribute('viewBox', '0 0 100 100');
                    svg.setAttribute('preserveAspectRatio', 'none');
                    svg.setAttribute('class', 'template-indicator-svg');
                    svg.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 100; overflow: visible;');
                    
                    // Triangle du bas (coin inférieur gauche, coin inférieur droit, point milieu-haut)
                    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                    polygon.setAttribute('points', '0,100 100,100 50,35');
                    polygon.setAttribute('fill', expectedColor);
                    polygon.setAttribute('opacity', '0.85');
                    polygon.setAttribute('stroke', 'rgba(0,0,0,0.4)');
                    polygon.setAttribute('stroke-width', '1.5');
                    
                    svg.appendChild(polygon);
                    
                    // Ajouter le SVG au pixel
                    try {
                        pixel.appendChild(svg);
                    } catch (e) {
                        console.warn(`  ⚠️ Impossible d'ajouter le SVG au pixel ${index}:`, e);
                        return; // Sortir de cette itération
                    }
                    
                    // Ajouter les classes et attributs en utilisant setAttribute au lieu de classList
                    // pour éviter les erreurs de propriété en lecture seule
                    try {
                        // Utiliser getAttribute et setAttribute au lieu de classList
                        const currentClass = pixel.getAttribute('class') || '';
                        const newClass = currentClass.includes('has-template-indicator') 
                            ? currentClass 
                            : currentClass + ' has-template-indicator';
                        pixel.setAttribute('class', newClass.trim());
                        pixel.setAttribute('data-expected-color', expectedColor);
                    } catch (e) {
                        console.warn(`  ⚠️ Impossible d'ajouter les classes au pixel ${index}:`, e);
                        // Continuer quand même car le SVG est déjà ajouté
                    }
                    
                    indicatorsAdded++;
                } catch (error) {
                    console.error(`  ❌ Erreur lors de l'ajout de l'indicateur au pixel ${index}:`, error);
                    console.error(`  📍 Détails de l'erreur:`, {
                        errorName: error.name,
                        errorMessage: error.message,
                        pixelExists: !!pixel,
                        pixelParent: !!pixel?.parentNode
                    });
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

