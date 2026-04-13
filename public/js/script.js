// ── Police bitmap 5×7 pour l'outil texte ─────────────────────────────────────
const BITMAP_FONT_5x7 = {
  'A':['01110','10001','10001','11111','10001','10001','10001'],
  'B':['11110','10001','10001','11110','10001','10001','11110'],
  'C':['01110','10001','10000','10000','10000','10001','01110'],
  'D':['11110','10001','10001','10001','10001','10001','11110'],
  'E':['11111','10000','10000','11110','10000','10000','11111'],
  'F':['11111','10000','10000','11110','10000','10000','10000'],
  'G':['01110','10001','10000','10111','10001','10001','01111'],
  'H':['10001','10001','10001','11111','10001','10001','10001'],
  'I':['01110','00100','00100','00100','00100','00100','01110'],
  'J':['00111','00010','00010','00010','00010','10010','01100'],
  'K':['10001','10010','10100','11000','10100','10010','10001'],
  'L':['10000','10000','10000','10000','10000','10000','11111'],
  'M':['10001','11011','10101','10101','10001','10001','10001'],
  'N':['10001','11001','10101','10011','10001','10001','10001'],
  'O':['01110','10001','10001','10001','10001','10001','01110'],
  'P':['11110','10001','10001','11110','10000','10000','10000'],
  'Q':['01110','10001','10001','10001','10101','10010','01101'],
  'R':['11110','10001','10001','11110','10100','10010','10001'],
  'S':['01111','10000','10000','01110','00001','00001','11110'],
  'T':['11111','00100','00100','00100','00100','00100','00100'],
  'U':['10001','10001','10001','10001','10001','10001','01110'],
  'V':['10001','10001','10001','10001','10001','01010','00100'],
  'W':['10001','10001','10001','10101','10101','11011','10001'],
  'X':['10001','10001','01010','00100','01010','10001','10001'],
  'Y':['10001','10001','01010','00100','00100','00100','00100'],
  'Z':['11111','00001','00010','00100','01000','10000','11111'],
  '0':['01110','10001','10011','10101','11001','10001','01110'],
  '1':['00100','01100','00100','00100','00100','00100','01110'],
  '2':['01110','10001','00001','00010','00100','01000','11111'],
  '3':['11111','00001','00010','00110','00001','10001','01110'],
  '4':['00010','00110','01010','10010','11111','00010','00010'],
  '5':['11111','10000','11110','00001','00001','10001','01110'],
  '6':['00110','01000','10000','11110','10001','10001','01110'],
  '7':['11111','00001','00010','00100','01000','01000','01000'],
  '8':['01110','10001','10001','01110','10001','10001','01110'],
  '9':['01110','10001','10001','01111','00001','00010','01100'],
  ' ':['00000','00000','00000','00000','00000','00000','00000'],
  '!':['00100','00100','00100','00100','00100','00000','00100'],
  '?':['01110','10001','00001','00010','00100','00000','00100'],
  '.':['00000','00000','00000','00000','00000','00000','00100'],
  ',':['00000','00000','00000','00000','00110','00100','01000'],
  '-':['00000','00000','00000','11111','00000','00000','00000'],
  ':':['00000','00100','00000','00000','00000','00100','00000'],
};
// ── Police bitmap 3×5 (ultra-compacte) ───────────────────────────────────────
const BITMAP_FONT_3x5 = {
  ' ':['000','000','000','000','000'],
  'A':['010','101','111','101','101'],
  'B':['110','101','110','101','110'],
  'C':['011','100','100','100','011'],
  'D':['110','101','101','101','110'],
  'E':['111','100','110','100','111'],
  'F':['111','100','110','100','100'],
  'G':['011','100','101','101','011'],
  'H':['101','101','111','101','101'],
  'I':['111','010','010','010','111'],
  'J':['011','001','001','101','010'],
  'K':['101','110','100','110','101'],
  'L':['100','100','100','100','111'],
  'M':['101','111','111','101','101'],
  'N':['101','111','101','101','101'],
  'O':['010','101','101','101','010'],
  'P':['110','101','110','100','100'],
  'Q':['010','101','101','110','011'],
  'R':['110','101','110','100','101'],
  'S':['011','100','010','001','110'],
  'T':['111','010','010','010','010'],
  'U':['101','101','101','101','011'],
  'V':['101','101','101','010','010'],
  'W':['101','101','111','111','101'],
  'X':['101','101','010','101','101'],
  'Y':['101','101','011','001','110'],
  'Z':['111','001','010','100','111'],
  '0':['010','101','101','101','010'],
  '1':['110','010','010','010','111'],
  '2':['110','001','010','100','111'],
  '3':['110','001','010','001','110'],
  '4':['101','101','111','001','001'],
  '5':['111','100','110','001','110'],
  '6':['011','100','110','101','010'],
  '7':['111','001','010','010','010'],
  '8':['010','101','010','101','010'],
  '9':['010','101','011','001','110'],
  '!':['010','010','010','000','010'],
  '?':['110','001','010','000','010'],
  '.':['000','000','000','000','010'],
  ',':['000','000','000','010','100'],
  '-':['000','000','111','000','000'],
  ':':['000','010','000','010','000'],
  '+':['000','010','111','010','000'],
};

// ── Police bitmap 8×8 (style NES / arcade) ───────────────────────────────────
const BITMAP_FONT_8x8 = {
  ' ':['0000000','0000000','0000000','0000000','0000000','0000000','0000000','0000000'],
  'A':['0011100','0100010','1000001','1000001','1111111','1000001','1000001','0000000'],
  'B':['1111110','1000001','1000001','1111110','1000001','1000001','1111110','0000000'],
  'C':['0111110','1000001','1000000','1000000','1000000','1000001','0111110','0000000'],
  'D':['1111100','1000010','1000001','1000001','1000001','1000010','1111100','0000000'],
  'E':['1111111','1000000','1000000','1111110','1000000','1000000','1111111','0000000'],
  'F':['1111111','1000000','1000000','1111110','1000000','1000000','1000000','0000000'],
  'G':['0111110','1000001','1000000','1001111','1000001','1000001','0111110','0000000'],
  'H':['1000001','1000001','1000001','1111111','1000001','1000001','1000001','0000000'],
  'I':['0111110','0001000','0001000','0001000','0001000','0001000','0111110','0000000'],
  'J':['0111111','0000001','0000001','0000001','1000001','1000001','0111110','0000000'],
  'K':['1000001','1000010','1000100','1111000','1000100','1000010','1000001','0000000'],
  'L':['1000000','1000000','1000000','1000000','1000000','1000000','1111111','0000000'],
  'M':['1000001','1100011','1010101','1001001','1000001','1000001','1000001','0000000'],
  'N':['1000001','1100001','1010001','1001001','1000101','1000011','1000001','0000000'],
  'O':['0111110','1000001','1000001','1000001','1000001','1000001','0111110','0000000'],
  'P':['1111110','1000001','1000001','1111110','1000000','1000000','1000000','0000000'],
  'Q':['0111110','1000001','1000001','1000001','1001001','1000110','0111111','0000000'],
  'R':['1111110','1000001','1000001','1111110','1001000','1000100','1000011','0000000'],
  'S':['0111110','1000001','1000000','0111110','0000001','1000001','0111110','0000000'],
  'T':['1111111','0001000','0001000','0001000','0001000','0001000','0001000','0000000'],
  'U':['1000001','1000001','1000001','1000001','1000001','1000001','0111110','0000000'],
  'V':['1000001','1000001','0100010','0100010','0010100','0010100','0001000','0000000'],
  'W':['1000001','1000001','1001001','1001001','1010101','1100011','1000001','0000000'],
  'X':['1000001','0100010','0010100','0001000','0010100','0100010','1000001','0000000'],
  'Y':['1000001','0100010','0010100','0001000','0001000','0001000','0001000','0000000'],
  'Z':['1111111','0000010','0000100','0001000','0010000','0100000','1111111','0000000'],
  '0':['0111110','1000001','1000011','1000101','1001001','1010001','0111110','0000000'],
  '1':['0001000','0011000','0001000','0001000','0001000','0001000','0111110','0000000'],
  '2':['0111110','1000001','0000001','0000110','0011000','0100000','1111111','0000000'],
  '3':['1111110','0000001','0000001','0111110','0000001','0000001','1111110','0000000'],
  '4':['0000110','0001010','0010010','0100010','1111111','0000010','0000010','0000000'],
  '5':['1111111','1000000','1000000','1111110','0000001','1000001','0111110','0000000'],
  '6':['0111110','1000000','1000000','1111110','1000001','1000001','0111110','0000000'],
  '7':['1111111','0000001','0000010','0000100','0001000','0010000','0010000','0000000'],
  '8':['0111110','1000001','1000001','0111110','1000001','1000001','0111110','0000000'],
  '9':['0111110','1000001','1000001','0111111','0000001','1000001','0111110','0000000'],
  '!':['0001000','0001000','0001000','0001000','0001000','0000000','0001000','0000000'],
  '?':['0111110','1000001','0000001','0000110','0001000','0000000','0001000','0000000'],
  '.':['0000000','0000000','0000000','0000000','0000000','0000000','0001000','0000000'],
  ',':['0000000','0000000','0000000','0000000','0001000','0001000','0010000','0000000'],
  '-':['0000000','0000000','0000000','1111111','0000000','0000000','0000000','0000000'],
  ':':['0000000','0001000','0000000','0000000','0001000','0000000','0000000','0000000'],
  '+':['0000000','0001000','0001000','1111111','0001000','0001000','0000000','0000000'],
};

// ── Registre des polices disponibles ─────────────────────────────────────────
const BITMAP_FONTS = {
  '3x5': { label: { en: 'Tiny 3×5',   fr: 'Minuscule 3×5' }, charWidth: 4, charHeight: 5, cols: 3, chars: BITMAP_FONT_3x5 },
  '5x7': { label: { en: 'Retro 5×7',  fr: 'Rétro 5×7'     }, charWidth: 6, charHeight: 7, cols: 5, chars: BITMAP_FONT_5x7 },
  '8x8': { label: { en: 'Large 8×8',  fr: 'Grand 8×8'      }, charWidth: 8, charHeight: 8, cols: 7, chars: BITMAP_FONT_8x8 },
};
// ─────────────────────────────────────────────────────────────────────────────

let currentColor = '#000000';
let isDrawing = false;
let frames = [[]];
let currentFrame = 0;
let isErasing = false; // Pour la gomme
let isEyedropperMode = false; // Pour la pipette
let isFillMode = false; // Pour le remplissage (flood fill)
let isSymmetryMode = false; // Miroir horizontal en temps réel
let isSymmetryV = false; // Miroir vertical (haut/bas)
let modifiedPixels = [new Set()]; // Pour suivre les pixels modifiés
let clipboard = null; // Pour le copier-coller
let copiedFrame = null;
let copiedFrameLayers = null;
// ── Grille de référence ───────────────────────────────────────────────────────
let referenceImage = null;       // HTMLImageElement
let referenceOpacity = 0.3;      // 0.0 to 1.0
let referenceX = 0;              // offset X en unités cellSize
let referenceY = 0;              // offset Y en unités cellSize
let referenceScale = 1.0;        // multiplicateur de taille (1 = taille initiale ajustée)
let referenceMoveMode = false;   // true = touches déplacent/zooment l'image ref
let _refDragStart = null;        // {x, y, refX, refY} pour le drag
let _refPinchDist = null;        // distance initiale du pinch
// ── Sélection rectangulaire ───────────────────────────────────────────────────
let isSelectionMode = false;
let selection = null;            // { startCol, startRow, endCol, endRow } while drawing
let selectionRect = null;        // { minCol, minRow, maxCol, maxRow } final bounds (inclusive)
let selectionCut = null;         // Array of {offset, pixel} - pixels cut from original position
let isMovingSelection = false;
let selectionMoveStart = null;   // {col, row} where move drag started
// ── Mode Découper en tampon (ciseau) ──────────────────────────────────────────
let isCropStampMode = false;
window.stamps = window.stamps || [];
let cropSelection = null;        // { startCol, startRow, endCol, endRow } en cours
let cropRect = null;             // { minCol, minRow, maxCol, maxRow } final
// ── Multi-couches ─────────────────────────────────────────────────────────────
let frameLayers = [];      // frameLayers[frameIndex] = [{id,name,visible,opacity,pixels}]
let currentLayer = 0;      // index du calque actif
let _nextLayerId = 0;      // compteur d'IDs uniques
// ─────────────────────────────────────────────────────────────────────────────
let isStampMode = false;  // Outil tampon
let stampPixels = null;
let stampGridSize = 32;
let activeStampId = null; // id du tampon actuellement en mode stamp
// ── Mode placement texte ──────────────────────────────────────────────────────
let isTextPlacementMode = false;
let textPlacementPixels = null;  // pixels du texte à poser
let textHoverCol = 0;
let textHoverRow = 0;
// ── Mode placement sprite sheet ───────────────────────────────────────────────
let isSpriteSheetMode = false;
let ssSprites = [];        // [{pixels, w, h}, ...] extraits du sheet
let ssHoverCol = 0;        // position top-left du ghost (colonne)
let ssHoverRow = 0;        // position top-left du ghost (ligne)
let ssCenterCol = 0;       // ancrage centre bounding-box du premier sprite
let ssCenterRow = 0;
let stampHoverCol = 0;
let stampHoverRow = 0;
let stampCenterCol = 0;  // centre visuel du bounding box (calculé à l'entrée en mode stamp)
let stampCenterRow = 0;

// ── Phase 2 : Canvas rendering (source de vérité = buffer, divs ignorés) ─────
const CANVAS_RENDERING = true;
let pixelCanvas = null;
let pixelCtx   = null;
let cellSize   = 0;            // taille CSS d'une cellule en pixels
let currentFrameBuffer = [];   // buffer live de la frame en cours (Phase 2)
// ─────────────────────────────────────────────────────────────────────────────
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
const DEFAULT_GRID_SIZE = 32;
const VALID_GRID_SIZES = [8, 16, 32, 64, 128, 256, 512];
let currentGridSize = DEFAULT_GRID_SIZE;
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

// ── Script-level translations (EN / FR) ──────────────────────────────────────
const TL = {
    // Grid
    changeGrid:             { en: (c,n) => `Change grid from ${c}×${c} to ${n}×${n}?\n\n⚠️ Current content will be erased.`, fr: (c,n) => `Changer la grille de ${c}×${c} à ${n}×${n} ?\n\n⚠️ Le contenu actuel sera effacé.` },
    // Frames
    cannotDeleteLast:       { en: 'Cannot delete the last frame!', fr: 'Impossible de supprimer la dernière frame !' },
    confirmDeleteFrame:     { en: n => `Really delete frame ${n}?`, fr: n => `Voulez-vous vraiment supprimer la frame ${n} ?` },
    confirmClearAll:        { en: 'Are you sure you want to erase all frames?', fr: 'Êtes-vous sûr de vouloir effacer toutes les frames ?' },
    minFrames:              { en: 'At least 2 frames are needed for an animation!', fr: 'Il faut au moins 2 frames pour faire une animation !' },
    // Save dialogs
    saveTitle:              { en: '💾 Save project', fr: '💾 Sauvegarder le projet' },
    projectNamePlaceholder: { en: 'Project name', fr: 'Nom du projet' },
    saveBtn:                { en: 'Save', fr: 'Sauvegarder' },
    cancelBtn:              { en: 'Cancel', fr: 'Annuler' },
    savedDownloaded:        { en: '✅ Project downloaded as file!', fr: '✅ Projet téléchargé en fichier !' },
    savedLocally:           { en: '✅ Project saved locally!', fr: '✅ Projet sauvegardé localement !' },
    saveErrorShort:         { en: '❌ Save error.', fr: '❌ Erreur lors de la sauvegarde.' },
    // Save result dialog titles/messages
    saveSuccessTitle:       { en: 'Save successful', fr: 'Sauvegarde réussie' },
    saveErrorTitle:         { en: 'Save error', fr: 'Erreur de sauvegarde' },
    saveLocalTitle:         { en: 'Local save', fr: 'Sauvegarde locale' },
    saveDownloadTitle:      { en: 'File download', fr: 'Téléchargement du fichier' },
    updated:                { en: 'updated', fr: 'mis à jour' },
    created2:               { en: 'created', fr: 'créé' },
    saveSuccessMsg:         { en: (n) => `Project "${n}" saved locally on this device.`, fr: (n) => `Projet "${n}" sauvegardé localement sur cet appareil.` },
    saveErrorMsg:           { en: err => `Save error:\n${err}`, fr: err => `Erreur lors de la sauvegarde :\n${err}` },
    saveErrorConnected:     { en: err => `Save error.\n\nMake sure you are connected.\n\n${err || ''}`, fr: err => `Erreur lors de la sauvegarde.\n\nVérifiez que vous êtes connecté.\n\n${err || ''}` },
    saveLocalMsg:           { en: (n,e) => `Project "${n}" saved LOCALLY only.\n\nCloud is unavailable (${e}).\n\nYour project is safe locally on this device.`, fr: (n,e) => `Projet "${n}" sauvegardé en LOCAL uniquement.\n\nLe cloud n'est pas disponible (${e}).\n\nVotre projet est en sécurité localement sur cet appareil.` },
    saveDownloadMsg:        { en: n => `Could not save to cloud or locally.\n\nFile downloaded to your device:\n"${n}.json"\n\nYou can re-import it later.`, fr: n => `Impossible de sauvegarder sur le cloud ou en local.\n\nLe fichier a été téléchargé sur votre appareil :\n"${n}.json"\n\nVous pouvez le réimporter plus tard.` },
    saveErrorUnexpected:    { en: e => `Unexpected save error.\n\n${e || 'Please try again.'}`, fr: e => `Erreur inattendue lors de la sauvegarde.\n\n${e || 'Veuillez réessayer.'}` },
    // Load projects
    loadProjectsError:      { en: e => '❌ Error loading: ' + e, fr: e => '❌ Erreur lors du chargement: ' + e },
    noProjectsFound:        { en: '📱 No projects found.\n\nStart drawing and save your first project! 🎨', fr: '📱 Aucun projet trouvé.\n\nCommencez à dessiner et sauvegardez votre premier projet ! 🎨' },
    noProjectsSave:         { en: 'No saved projects found. Create one and save it!', fr: 'Aucun projet sauvegardé trouvé. Créez-en un et sauvegardez-le !' },
    noProjectsFoundShort:   { en: 'No saved projects found.', fr: 'Aucun projet sauvegardé trouvé.' },
    loadProjectsErrorShort: { en: '❌ Error loading projects.', fr: '❌ Erreur lors du chargement des projets.' },
    myProjects:             { en: '🌐 My projects', fr: '🌐 Mes projets' },
    loadBtn:                { en: '📂 Load', fr: '📂 Charger' },
    deleteBtn:              { en: '🗑️ Delete', fr: '🗑️ Supprimer' },
    closeBtn:               { en: '❌ Close', fr: '❌ Fermer' },
    clickProject:           { en: '👆 <strong>Click on a project</strong> to select it, then use the buttons below.', fr: '👆 <strong>Cliquez sur un projet</strong> pour le sélectionner, puis utilisez les boutons ci-dessous.' },
    loadProjectError:       { en: e => '❌ Error loading project: ' + (e || 'unknown'), fr: e => '❌ Erreur lors du chargement du projet: ' + (e || 'inconnue') },
    projectLoaded:          { en: n => `✅ Project "${n}" loaded successfully!`, fr: n => `✅ Projet "${n}" chargé avec succès !` },
    projectLoadErrorDetail: { en: '❌ Unexpected error loading the project. Check the console for details.', fr: '❌ Erreur inattendue lors du chargement du projet. Consultez la console pour plus de détails.' },
    confirmDelete:          { en: 'Permanently delete this project?', fr: 'Supprimer ce projet définitivement ?' },
    deleteSuccess:          { en: '✅ Project deleted successfully!', fr: '✅ Projet supprimé avec succès !' },
    deleteError:            { en: e => '❌ Error deleting: ' + e, fr: e => '❌ Erreur lors de la suppression: ' + e },
    deleteErrorRetry:       { en: '❌ Error deleting. Please try again.', fr: '❌ Erreur lors de la suppression. Veuillez réessayer.' },
    loadProjectTitle:       { en: 'Load a project', fr: 'Charger un projet' },
    at:                     { en: 'at', fr: 'à' },
    dateLocale:             { en: 'en-US', fr: 'fr-FR' },
    loadErrorConnected:     { en: '❌ Error loading. Make sure you are connected.', fr: '❌ Erreur lors du chargement. Vérifiez que vous êtes connecté.' },
    loadProjectErrorShort:  { en: '❌ Error loading project.', fr: '❌ Erreur lors du chargement du projet.' },
    projectLoadedShort:     { en: 'Project loaded successfully!', fr: 'Projet chargé avec succès !' },
    loadErrorShort:         { en: 'Error loading.', fr: 'Erreur lors du chargement.' },
    loadErrorRetry:         { en: 'Error loading. Please try again.', fr: 'Erreur lors du chargement. Veuillez réessayer.' },
    untitledProject:        { en: 'Untitled project', fr: 'Projet sans nom' },
    cancelLoad:             { en: 'Cancel', fr: 'Annuler' },
    loadProject:            { en: 'Load a project', fr: 'Charger un projet' },
    // Import project
    unknownDate:            { en: 'Unknown date', fr: 'Date inconnue' },
    createdOn:              { en: 'Created on', fr: 'Créé le' },
    customColors:           { en: c => c + ' custom colors', fr: c => c + ' couleurs personnalisées' },
    baseColorsOnly:         { en: 'Base colors only', fr: 'Couleurs de base seulement' },
    importConfirmTitle:     { en: n => `🎨 Import "${n}"?`, fr: n => `🎨 Importer "${n}" ?` },
    importConfirmDetails:   { en: '📊 Details:', fr: '📊 Détails :' },
    importWillReplace:      { en: '⚠️ This will replace your current project.', fr: '⚠️ Cela remplacera votre projet actuel.' },
    importSuccess:          { en: n => `✅ Project "${n}" imported successfully!`, fr: n => `✅ Projet "${n}" importé avec succès !` },
    importError:            { en: m => `❌ Import error: ${m}`, fr: m => `❌ Erreur lors de l'import : ${m}` },
    // Shared project
    sharedProject:          { en: 'Shared project', fr: 'Projet partagé' },
    sharedProjectOpened:    { en: n => `✅ Project "${n}" opened!`, fr: n => `✅ Projet "${n}" ouvert !` },
    sharedProjectError:     { en: m => `❌ Error opening shared project: ${m}`, fr: m => `❌ Erreur lors de l'ouverture du projet partagé: ${m}` },
    sharedDetected:         { en: '🎨 Shared project detected!', fr: '🎨 Projet partagé détecté !' },
    sharedOpenQuestion:     { en: 'Do you want to open it?', fr: 'Voulez-vous l\'ouvrir ?' },
    shareError:             { en: '❌ Share error. The file will be downloaded instead.', fr: '❌ Erreur lors du partage. Le fichier va être téléchargé à la place.' },
    linkCopiedDetail:       { en: '🔗 Link copied to clipboard!\n\nPaste it in a message, email, etc.', fr: '🔗 Lien copié dans le presse-papier !\n\nCollez-le dans un message, email, etc.' },
    linkCopied:             { en: '🔗 Link copied to clipboard!', fr: '🔗 Lien copié dans le presse-papier !' },
    // Image import
    imageResizeConfirm:     { en: (w,h,c,f) => `Image detected: ${w}×${h} pixels.\nCurrent grid is ${c}×${c}.\n\nChange grid to ${f}×${f} to fit the entire image?`, fr: (w,h,c,f) => `Image détectée : ${w}×${h} pixels.\nLa grille actuelle est ${c}×${c}.\n\nChanger la grille à ${f}×${f} pour accueillir l'image entière ?` },
    imageImportSuccess:     { en: (w,h,ps,tc) => `✅ Image imported successfully!\n\n• Detected size: ${w}×${h} pixels${ps > 1 ? ` (zoom ×${ps} detected)` : ''}\n• Unique colors: ${tc}`, fr: (w,h,ps,tc) => `✅ Image importée avec succès !\n\n• Taille détectée : ${w}×${h} pixels${ps > 1 ? ` (zoom ×${ps} détecté)` : ''}\n• Couleurs uniques : ${tc}` },
    imageImportError:       { en: m => `❌ Import error: ${m}`, fr: m => `❌ Erreur lors de l'import : ${m}` },
    clipboardError:         { en: '❌ Clipboard content does not appear to be a valid project.\n\nMake sure you copied a project link or JSON data.', fr: '❌ Le contenu du presse-papier ne semble pas être un projet valide.\n\nAssurez-vous d\'avoir copié un lien de projet ou des données JSON.' },
    clipboardAccessError:   { en: '❌ Cannot access clipboard.\n\nPlease use "Browse files" instead.', fr: '❌ Impossible d\'accéder au presse-papier.\n\nVeuillez utiliser "Parcourir les fichiers" à la place.' },
    unsupportedFormat:      { en: '❌ Unsupported format.\n\nAccepted files:\n• Projects: .json, .pixelart, .txt\n• Pixel art images: .png, .webp, .jpg, .gif, .bmp', fr: '❌ Format non supporté.\n\nFichiers acceptés :\n• Projets : .json, .pixelart, .txt\n• Images pixel art : .png, .webp, .jpg, .gif, .bmp' },
    invalidFileType:        { en: '❌ Please drop a .json, .pixelart or .txt file', fr: '❌ Veuillez déposer un fichier .json, .pixelart ou .txt' },
    // GIF export
    noFrames:               { en: '❌ No frames to export!', fr: '❌ Aucune frame à exporter !' },
    gifSizeLabel:           { en: '📏 GIF size:', fr: '📏 Taille du GIF :' },
    gifSpeedLabel:          { en: '⚡ Animation speed:', fr: '⚡ Vitesse d\'animation :' },
    gifLoopLabel:           { en: '🔄 Repeat:', fr: '🔄 Répétition :' },
    gifQualityLabel:        { en: '✨ Quality:', fr: '✨ Qualité :' },
    gifSmall:               { en: '128x128 (Small - Fast)', fr: '128x128 (Petit - Rapide)' },
    gifMedium:              { en: '256x256 (Medium)', fr: '256x256 (Moyen)' },
    gifLarge:               { en: '512x512 (Large - Slower)', fr: '512x512 (Grand - Plus lent)' },
    gifXLarge:              { en: '1024x1024 (Very large - Very slow)', fr: '1024x1024 (Très grand - Très lent)' },
    gifVeryFast:            { en: 'Very fast (0.1s)', fr: 'Très rapide (0.1s)' },
    gifFast:                { en: 'Fast (0.2s)', fr: 'Rapide (0.2s)' },
    gifNormal:              { en: 'Normal (0.3s)', fr: 'Normal (0.3s)' },
    gifSlow:                { en: 'Slow (0.5s)', fr: 'Lent (0.5s)' },
    gifVerySlow:            { en: 'Very slow (1s)', fr: 'Très lent (1s)' },
    gifLoopInfinite:        { en: 'Infinite', fr: 'Infinie' },
    gifQualityMax:          { en: 'Maximum (very slow)', fr: 'Maximale (très lent)' },
    gifQualityHigh:         { en: 'High (slow)', fr: 'Haute (lent)' },
    gifQualityMedium:       { en: 'Medium (recommended)', fr: 'Moyenne (recommandé)' },
    gifQualityFast:         { en: 'Fast', fr: 'Rapide' },
    gifPreviewLabel:        { en: '<strong>Preview:</strong> Animation', fr: '<strong>Aperçu :</strong> Animation' },
    gifInfoLocal:           { en: '🎬 Your GIF will be created directly in the app!', fr: '🎬 Votre GIF sera créé directement dans l\'application !' },
    gifInfoOptimized:       { en: '⚡ Optimized for mobile - No workers to avoid blocking', fr: '⚡ Optimisé pour mobile - Sans workers pour éviter les blocages' },
    gifInfoTime:            { en: fc => `⏱️ Estimated time: ${fc < 5 ? '5-15 seconds' : fc < 10 ? '15-30 seconds' : '30-45 seconds'}`, fr: fc => `⏱️ Temps estimé : ${fc < 5 ? '5-15 secondes' : fc < 10 ? '15-30 secondes' : '30-45 secondes'}` },
    gifCreateBtn:           { en: '🎬 Create GIF', fr: '🎬 Créer le GIF' },
    gifFrames:              { en: fc => `${fc} frame${fc > 1 ? 's' : ''} to export`, fr: fc => `${fc} frame${fc > 1 ? 's' : ''} à exporter` },
    gifCreating:            { en: 'Creating GIF...', fr: 'Création du GIF...' },
    gifPreparing:           { en: 'Preparing...', fr: 'Préparation...' },
    gifSendingSupabase:     { en: 'Sending to Supabase server...', fr: 'Envoi vers serveur Supabase...' },
    gifServerUnavailable:   { en: 'Server unavailable, processing locally...', fr: 'Serveur indisponible, traitement local...' },
    gifError:               { en: (s,l) => `❌ Error creating GIF:\n\n🌐 Server: ${s}\n💻 Local: ${l}\n\nPlease try again later.`, fr: (s,l) => `❌ Erreur lors de la création du GIF :\n\n🌐 Serveur : ${s}\n💻 Local : ${l}\n\nVeuillez réessayer plus tard.` },
    gifSuccessServer:       { en: (f,fc,sz,d) => `🎉 GIF created successfully via server!\n\n📁 File: ${f}\n🎬 ${fc} frames\n📏 Size: ${sz}x${sz}\n⚡ Speed: ${d}ms per frame\n🚀 Processed by Supabase server\n\nYour GIF animation is ready! 🎨`, fr: (f,fc,sz,d) => `🎉 GIF créé avec succès via serveur !\n\n📁 Fichier: ${f}\n🎬 ${fc} frames\n📏 Taille: ${sz}x${sz}\n⚡ Vitesse: ${d}ms par frame\n🚀 Traité par serveur Supabase\n\nVotre animation GIF est prête ! 🎨` },
    gifDownloadError:       { en: '❌ Error downloading GIF', fr: '❌ Erreur lors du téléchargement du GIF' },
    // Notifications
    colorUpdated:           { en: 'Color updated!', fr: 'Couleur mise à jour !' },
    paletteSaved:           { en: 'Custom palette saved!', fr: 'Palette personnalisée sauvegardée !' },
    frameCopied:            { en: 'Frame copied 📋', fr: 'Frame copiée 📋' },
    framePasted:            { en: 'Frame pasted 📋', fr: 'Frame collée 📋' },
    frameAdded:             { en: 'New frame created ➕', fr: 'Nouvelle frame créée ➕' },
    // Profile
    profileTitle:           { en: '👤 My Profile', fr: '👤 Mon Profil' },
    profileSubtitle:        { en: 'What would you like to manage?', fr: 'Que souhaitez-vous gérer ?' },
    profileCreativeTitle:   { en: '📊 Creative Profile', fr: '📊 Profil Créatif' },
    profileCreativeDesc:    { en: 'Optional info to improve the editor', fr: 'Informations optionnelles pour améliorer l\'éditeur' },
    profileUsernameTitle:   { en: '🎭 My Username', fr: '🎭 Mon Pseudo' },
    profileUsernameDesc:    { en: 'Set your public username and avatar for published templates', fr: 'Définir votre pseudo public et votre avatar pour les modèles publiés' },
    profileUsernameNotLoaded: { en: '❌ Username management is not loaded yet. Please reload the page.', fr: '❌ La fonctionnalité de gestion du pseudo n\'est pas encore chargée. Veuillez recharger la page.' },
    profileUpdated:         { en: 'Profile updated ✅', fr: 'Profil mis à jour ✅' },
    profileSaveError:       { en: 'Cannot save profile', fr: 'Impossible d\'enregistrer le profil' },
    // Help
    helpTitle:              { en: '🎨 User Guide', fr: '🎨 Guide d\'utilisation' },
    helpStartTitle:         { en: '🔰 Getting started', fr: '🔰 Commencer' },
    helpPalette:            { en: '<strong>Palette:</strong> choose a color (left sidebar on desktop, compact bar at top on mobile) then draw on the 32×32 grid.', fr: '<strong>Palette :</strong> choisissez une couleur (sidebar gauche sur desktop, barre compacte en haut sur mobile) puis dessinez sur la grille 32×32.' },
    helpEraser:             { en: '<strong>Eraser:</strong> activate the eraser to erase, deactivate to return to the brush.', fr: '<strong>Gomme :</strong> activez la gomme pour effacer, désactivez-la pour revenir au pinceau.' },
    helpColorsTitle:        { en: '🎚️ Custom colors', fr: '🎚️ Couleurs personnalisées' },
    helpColorsDesktop:      { en: '<strong>Desktop:</strong> click the current color to open the editor and add your custom shades (marked with a star).', fr: '<strong>Desktop :</strong> cliquez sur la couleur actuelle pour ouvrir l\'éditeur et ajouter vos teintes personnalisées (marquées par une étoile).' },
    helpColorsMobile:       { en: '<strong>Mobile:</strong> long-press a compact color to modify it.', fr: '<strong>Mobile :</strong> effectuez un appui long sur une couleur compacte pour la modifier.' },
    helpFramesTitle:        { en: '🧱 Frames & animation', fr: '🧱 Frames & animation' },
    helpNewFrame:           { en: '<strong>+ New Frame:</strong> adds an empty frame (or duplicates selection if it contains pixels).', fr: '<strong>+ Nouvelle Frame :</strong> ajoute une frame vide (ou duplique la sélection si elle contient des pixels).' },
    helpPlay:               { en: '<strong>Play:</strong> start/stop the preview.', fr: '<strong>Play :</strong> lance/arrête l\'aperçu.' },
    helpFPS:                { en: '<strong>FPS:</strong> adjust animation speed via the "FPS" button (desktop sidebar or hamburger menu on mobile).', fr: '<strong>FPS :</strong> ajustez la vitesse d\'animation via le bouton "FPS" (sidebar desktop ou menu hamburger sur mobile).' },
    helpShortcutsTitle:     { en: '⌨️ Keyboard shortcuts', fr: '⌨️ Raccourcis clavier' },
    helpCopyFrame:          { en: '<strong>Ctrl/Cmd + C:</strong> copy current frame', fr: '<strong>Ctrl/Cmd + C :</strong> copier la frame actuelle' },
    helpPasteFrame:         { en: '<strong>Ctrl/Cmd + V:</strong> paste copied frame', fr: '<strong>Ctrl/Cmd + V :</strong> coller la frame copiée' },
    helpUndo:               { en: '<strong>Ctrl/Cmd + Z:</strong> undo last action', fr: '<strong>Ctrl/Cmd + Z :</strong> annuler la dernière action' },
    helpRedo:               { en: '<strong>Ctrl/Cmd + Shift + Z:</strong> redo undone action', fr: '<strong>Ctrl/Cmd + Shift + Z :</strong> rétablir l\'action annulée' },
    helpRedoAlt:            { en: '<strong>Ctrl/Cmd + Y:</strong> redo undone action (alternative)', fr: '<strong>Ctrl/Cmd + Y :</strong> rétablir l\'action annulée (alternative)' },
    helpSave:               { en: '<strong>Ctrl/Cmd + S:</strong> save project', fr: '<strong>Ctrl/Cmd + S :</strong> sauvegarder le projet' },
    helpNewFrameKey:        { en: '<strong>Ctrl/Cmd + Shift + F:</strong> create a new frame', fr: '<strong>Ctrl/Cmd + Shift + F :</strong> créer une nouvelle frame' },
    helpEyedropper:         { en: '<strong>I:</strong> toggle eyedropper (auto-deactivates after picking)', fr: '<strong>I :</strong> activer/désactiver la pipette (se désactive automatiquement après le pick)' },
    helpEraserKey:          { en: '<strong>E:</strong> toggle eraser', fr: '<strong>E :</strong> activer/désactiver la gomme' },
    helpFillKey:            { en: '<strong>F:</strong> toggle flood fill (bucket)', fr: '<strong>F :</strong> activer/désactiver le remplissage (seau)' },
    helpSymHKey:            { en: '<strong>X:</strong> horizontal symmetry (left/right mirror while drawing)', fr: '<strong>X :</strong> symétrie horizontale (miroir gauche/droite en temps réel)' },
    helpSymVKey:            { en: '<strong>V:</strong> vertical symmetry (top/bottom mirror while drawing)', fr: '<strong>V :</strong> symétrie verticale (miroir haut/bas en temps réel)' },
    helpSelectionKey:       { en: '<strong>S:</strong> rectangle selection — drag to select, drag inside to move, Del to clear', fr: '<strong>S :</strong> sélection rectangulaire — glissez pour sélectionner, glissez à l\'intérieur pour déplacer, Suppr pour effacer' },
    helpZoomKeys:           { en: '<strong>Cmd/Ctrl + / −:</strong> zoom in/out &nbsp;·&nbsp; <strong>Cmd/Ctrl + 0:</strong> reset zoom', fr: '<strong>Cmd/Ctrl + / − :</strong> zoom avant/arrière &nbsp;·&nbsp; <strong>Cmd/Ctrl + 0 :</strong> réinitialiser le zoom' },
    helpSpace:              { en: '<strong>Space:</strong> start/stop animation', fr: '<strong>Espace :</strong> lancer/arrêter l\'animation' },
    helpArrows:             { en: '<strong>← →:</strong> navigate between frames', fr: '<strong>← → :</strong> naviguer entre les frames' },
    helpDelete:             { en: '<strong>Del/Backspace:</strong> delete current frame (or clear selection if active)', fr: '<strong>Suppr/Backspace :</strong> supprimer la frame actuelle (ou effacer la sélection si active)' },
    helpEscape:             { en: '<strong>Esc:</strong> deactivate all tools (eyedropper, eraser, fill, symmetry, selection)', fr: '<strong>Échap :</strong> désactiver tous les outils (pipette, gomme, fill, symétries, sélection)' },
    helpStorageTitle:       { en: '💾 Save & load', fr: '💾 Sauvegarde & chargement' },
    helpStorageSave:        { en: '<strong>Save:</strong> stores the project (frames, layers, colors, FPS) locally in your browser — no account needed, no size limit.', fr: '<strong>Sauvegarder :</strong> enregistre le projet (frames, calques, couleurs, FPS) localement dans votre navigateur — sans compte, sans limite de taille.' },
    helpStorageProjects:    { en: '<strong>My projects:</strong> find your creations saved on this device, reload or delete them. Use the Download button to export as .json.', fr: '<strong>Mes projets :</strong> retrouvez vos créations sauvegardées sur cet appareil, rechargez-les ou supprimez-les. Utilisez Télécharger pour exporter en .json.' },
    helpStorageLoad:        { en: '<strong>Load:</strong> import a .json project exported from the app. On iOS, use .txt format if .json is greyed out.', fr: '<strong>Charger :</strong> importez un projet .json exporté depuis l\'app. Sur iOS, utilisez le format .txt si le fichier .json est grisé.' },
    helpToolsTitle:         { en: '🛠️ Drawing tools', fr: '🛠️ Outils de dessin' },
    helpToolFill:           { en: '<strong>Flood fill 🪣:</strong> fills a contiguous zone with the current color. Key: F.', fr: '<strong>Remplissage 🪣 :</strong> remplit une zone contiguë avec la couleur actuelle. Touche : F.' },
    helpToolSymH:           { en: '<strong>Symmetry H ⬡:</strong> each pixel is mirrored horizontally in real time. Key: X.', fr: '<strong>Symétrie H ⬡ :</strong> chaque pixel est reflété horizontalement en temps réel. Touche : X.' },
    helpToolSymV:           { en: '<strong>Symmetry V ↕:</strong> each pixel is mirrored vertically in real time. Key: V.', fr: '<strong>Symétrie V ↕ :</strong> chaque pixel est reflété verticalement en temps réel. Touche : V.' },
    helpToolSelection:      { en: '<strong>Selection ⬚:</strong> drag to select a rectangle, drag inside to move it, Del to erase it. Key: S.', fr: '<strong>Sélection ⬚ :</strong> glissez pour sélectionner un rectangle, glissez à l\'intérieur pour le déplacer, Suppr pour l\'effacer. Touche : S.' },
    helpToolGridSizes:      { en: '<strong>Grid sizes:</strong> 8×8, 16×16, 32×32, 64×64, 128×128, 256×256, 512×512.', fr: '<strong>Tailles de grille :</strong> 8×8, 16×16, 32×32, 64×64, 128×128, 256×256, 512×512.' },
    helpRefTitle:           { en: '👻 Reference image', fr: '👻 Image de référence' },
    helpRefDesc:            { en: 'Load a photo or drawing as a semi-transparent ghost behind the grid to trace it pixel by pixel. Available from the hamburger menu (mobile) or sidebar (desktop).', fr: 'Chargez une photo ou dessin en fantôme semi-transparent derrière la grille pour le tracer pixel par pixel. Accessible depuis le menu hamburger (mobile) ou la sidebar (desktop).' },
    helpRefMove:            { en: '<strong>✋ Move:</strong> activates a mode where dragging repositions the image and pinching zooms it.', fr: '<strong>✋ Déplacer :</strong> active un mode où glisser repositionne l\'image et pincer la zoom.' },
    helpRefOpacity:         { en: '<strong>Opacity slider:</strong> adjust the transparency of the reference (0 = invisible, 1 = opaque).', fr: '<strong>Slider opacité :</strong> ajustez la transparence de la référence (0 = invisible, 1 = opaque).' },
    helpExportTitle:        { en: '📤 Export & share', fr: '📤 Export & partage' },
    helpExportGif:          { en: '<strong>Export GIF:</strong> generates an animated GIF of all your frames.', fr: '<strong>Export GIF :</strong> génère un GIF animé de toutes vos frames.' },
    helpExportPng:          { en: '<strong>PNG frames 📥:</strong> downloads each frame as an individual PNG file (useful for games or apps).', fr: '<strong>PNG frames 📥 :</strong> télécharge chaque frame en PNG individuel (utile pour les jeux ou apps).' },
    helpShare:              { en: '<strong>Share:</strong> generates a public link to your creation (iMessage, AirDrop, copy link). Option to publish to the community Gallery.', fr: '<strong>Partager :</strong> génère un lien public vers votre création (iMessage, AirDrop, copie du lien). Option pour publier dans la Galerie communautaire.' },
    helpGallery:            { en: '<strong>Gallery:</strong> browse creations shared by the community. Accessible from the menu.', fr: '<strong>Galerie :</strong> parcourez les créations partagées par la communauté. Accessible depuis le menu.' },
    helpMobileTitle:        { en: '📱 Mobile tips', fr: '📱 Astuces mobiles' },
    helpMobileMenu:         { en: '<strong>Hamburger menu:</strong> show/hide full tools.', fr: '<strong>Menu hamburger :</strong> affiche/masque les outils complets.' },
    helpMobileTouch:        { en: '<strong>Touch drawing:</strong> hold and drag to draw; multitouch is limited to avoid accidental gestures.', fr: '<strong>Dessin tactile :</strong> maintenez et glissez pour tracer ; le multitouch est limité pour éviter les gestes accidentels.' },
    helpMobileCV:           { en: '<strong>C / V:</strong> buttons at the bottom of the screen to copy and paste the current frame.', fr: '<strong>C / V :</strong> boutons en bas de l\'écran pour copier et coller la frame actuelle.' },
    // Credits
    creditsTitle:           { en: 'Pixel Editor - Credits', fr: 'Pixel Editor - Crédits' },
    creditsCreatorTitle:    { en: 'Creator & vision', fr: 'Créateur & vision' },
    creditsCreatorRole:     { en: 'Founder, product designer & lead developer', fr: 'Fondateur, designer produit & développeur principal' },
    creditsMissionTitle:    { en: 'Mission', fr: 'Mission' },
    creditsMissionText:     { en: 'Offer everyone — children and adults alike — a simple, fun and accessible animated pixel studio to bring their creative ideas to life.', fr: 'Proposer à tous — enfants comme adultes — un studio de pixel animé simple, ludique et accessible pour donner vie à leurs idées créatives.' },
    creditsJourneyTitle:    { en: 'Journey', fr: 'Parcours' },
    creditsJourney1:        { en: "2024 — launch of the Pixel Editor project, first for family and close friends", fr: "2024 — lancement du projet Pixel Editor, d'abord pour la famille et les proches" },
    creditsJourney2:        { en: "2025 — gradual opening to the online creative community", fr: "2025 — ouverture progressive à la communauté créative en ligne" },
    creditsJourney3:        { en: "Today — continuous evolution with your feedback, to keep the tool simple and fun", fr: "Aujourd'hui — évolution continue avec vos retours, pour garder l'outil simple et fun" },
    creditsLegalTitle:      { en: 'Personal project', fr: 'Projet personnel' },
    creditsLegalText:       { en: 'Personal learning project, source code visible on GitHub.', fr: "Projet d'apprentissage personnel, code source visible sur GitHub." },
    creditsClose:           { en: 'Close', fr: 'Fermer' },
    // Sprite Sheet
    ssTitle:                { en: '🗂️ Sprite Sheet Export', fr: '🗂️ Export Sprite Sheet' },
    ssDialogTitle:          { en: '🗂️ Sprite Sheet', fr: '🗂️ Sprite Sheet' },
    ssFrames:               { en: fc => `${fc} frame${fc > 1 ? 's' : ''} · grid ${fc}×1`, fr: fc => `${fc} frame${fc > 1 ? 's' : ''} · grille ${fc}×1` },
    ssZoomLabel:            { en: '🔍 Frame size (zoom):', fr: '🔍 Taille par frame (zoom) :' },
    ssZoom1:                { en: (g) => `×1 — ${g}×${g}px per frame (native)`, fr: (g) => `×1 — ${g}×${g}px par frame (natif)` },
    ssZoom4:                { en: (g) => `×4 — ${g*4}×${g*4}px per frame`, fr: (g) => `×4 — ${g*4}×${g*4}px par frame` },
    ssZoom8:                { en: (g) => `×8 — ${g*8}×${g*8}px per frame`, fr: (g) => `×8 — ${g*8}×${g*8}px par frame` },
    ssZoom16:               { en: (g) => `×16 — ${g*16}×${g*16}px per frame`, fr: (g) => `×16 — ${g*16}×${g*16}px par frame` },
    ssBgLabel:              { en: '🖼️ Background:', fr: '🖼️ Fond :' },
    ssBgTransparent:        { en: 'Transparent', fr: 'Transparent' },
    ssBgWhite:              { en: 'White', fr: 'Blanc' },
    ssBgBlack:              { en: 'Black', fr: 'Noir' },
    ssPreviewLabel:         { en: '<strong>Result:</strong>', fr: '<strong>Résultat :</strong>' },
    ssPreviewInfo:          { en: (fc, g, z) => `PNG image · ${fc * g * z}×${g * z}px · ${fc} frame${fc>1?'s':''}`, fr: (fc, g, z) => `Image PNG · ${fc * g * z}×${g * z}px · ${fc} frame${fc>1?'s':''}` },
    ssInfoGame:             { en: '🎮 Compatible with Unity, Godot, Phaser, GameMaker...', fr: '🎮 Compatible avec Unity, Godot, Phaser, GameMaker...' },
    ssInfoTransparent:      { en: '✨ Transparent pixels respected', fr: '✨ Pixels transparents respectés' },
    ssExportBtn:            { en: '🗂️ Download PNG', fr: '🗂️ Télécharger PNG' },
    ssNoFrames:             { en: '❌ No frames to export!', fr: '❌ Aucune frame à exporter !' },
    ssSuccess:              { en: (f) => `✅ Sprite sheet "${f}" downloaded!`, fr: (f) => `✅ Sprite sheet "${f}" téléchargée !` },
    // Watermark
    wmLabel:                { en: '✨ Add watermark "pixel-editor.app"', fr: '✨ Ajouter watermark "pixel-editor.app"' },
    wmHint:                 { en: 'Helps spread the word 🙏', fr: 'Aide à faire connaître l\'app 🙏' },
    // Help - Stamp tool section
    helpStampTitle:         { en: '🪄 Stamp tool', fr: '🪄 Outil Tampon' },
    helpStampDesc:          { en: '<strong>🪄 Stamp sprite:</strong> import a frame from another saved project and place it on your current canvas.', fr: '<strong>🪄 Tampon sprite :</strong> importez une frame d\'un autre projet sauvegardé et incrustez-la sur votre canvas actuel.' },
    helpStampHow:           { en: '<strong>How to use:</strong> click "🪄 Stamp sprite" → choose a project → pick the frame → a ghost preview follows your cursor (or finger on mobile) → click/tap to place it.', fr: '<strong>Comment utiliser :</strong> cliquez sur "🪄 Tampon sprite" → choisissez un projet → choisissez la frame → un aperçu fantôme suit votre curseur (ou doigt sur mobile) → cliquez/tapez pour poser.' },
    helpStampTransparent:   { en: '<strong>Transparent pixels:</strong> empty pixels in the stamp are not applied — only colored pixels are stamped, preserving your background.', fr: '<strong>Pixels transparents :</strong> les pixels vides du tampon ne sont pas appliqués — seuls les pixels colorés sont incrustés, préservant votre fond.' },
    helpStampUndo:          { en: '<strong>Undo:</strong> Ctrl+Z to remove the stamp. <strong>Esc</strong> to cancel before placing.', fr: '<strong>Annuler :</strong> Ctrl+Z pour retirer le tampon. <strong>Échap</strong> pour annuler avant de poser.' },
    helpStampMobile:        { en: '<strong>Mobile:</strong> drag your finger to position the ghost, release to stamp.', fr: '<strong>Mobile :</strong> glissez votre doigt pour positionner l\'aperçu, relâchez pour incruster.' },

    helpLayersTitle:        { en: '🗂 Layers', fr: '🗂 Calques' },
    helpLayersDesc:         { en: 'Each frame can contain multiple independent layers, like in Photoshop. The final result is a composite of all visible layers from bottom to top.', fr: 'Chaque frame peut contenir plusieurs calques indépendants, comme dans Photoshop. Le résultat final est un composite de tous les calques visibles de bas en haut.' },
    helpLayersAdd:          { en: '<strong>+ Add:</strong> adds a new transparent layer above the current one.', fr: '<strong>+ Ajouter :</strong> ajoute un nouveau calque transparent au-dessus du calque actuel.' },
    helpLayersSelect:       { en: '<strong>Select a layer:</strong> click its name in the layers panel to make it active. Drawings apply to the active layer only.', fr: '<strong>Sélectionner un calque :</strong> cliquez sur son nom dans le panneau pour le rendre actif. Les dessins s\'appliquent uniquement au calque actif.' },
    helpLayersVisibility:   { en: '<strong>Eye icon 👁:</strong> click to show/hide a layer without deleting it. Hidden layers are excluded from export and GIF.', fr: '<strong>Icône œil 👁 :</strong> cliquez pour afficher/masquer un calque sans le supprimer. Les calques cachés sont exclus de l\'export et du GIF.' },
    helpLayersOpacity:      { en: '<strong>Opacity:</strong> adjust layer transparency from 5% to 100% via the slider (desktop sidebar).', fr: '<strong>Opacité :</strong> ajustez la transparence du calque de 5% à 100% via le curseur (sidebar desktop).' },
    helpLayersReorder:      { en: '<strong>Reorder:</strong> drag the ⠿ handle to move a layer above or below another.', fr: '<strong>Réorganiser :</strong> glissez la poignée ⠿ pour déplacer un calque au-dessus ou en dessous d\'un autre.' },
    helpLayersDuplicate:    { en: '<strong>Duplicate:</strong> creates an identical copy of the layer just above it.', fr: '<strong>Dupliquer :</strong> crée une copie identique du calque juste au-dessus.' },
    helpLayersDelete:       { en: '<strong>Delete:</strong> removes the layer (minimum 1 layer per frame).', fr: '<strong>Supprimer :</strong> supprime le calque (minimum 1 calque par frame).' },
    helpLayersCopyPaste:    { en: '<strong>Copy/Paste frame:</strong> copies all layers of the current frame, not just the composite image.', fr: '<strong>Copier/Coller une frame :</strong> copie tous les calques de la frame courante, pas seulement l\'image composite.' },
    helpLayersSave:         { en: '<strong>Cloud save:</strong> all layers are saved to your account and fully restored when you reload the project.', fr: '<strong>Sauvegarde cloud :</strong> tous les calques sont sauvegardés sur votre compte et restaurés fidèlement au rechargement du projet.' },
    helpLayersMobile:       { en: '<strong>Mobile:</strong> access the layers panel via the 🗂 button in the toolbar or the hamburger menu.', fr: '<strong>Mobile :</strong> accédez au panneau calques via le bouton 🗂 de la barre d\'outils ou le menu hamburger.' },

    helpPhotoTitle:         { en: '📷 Photo → Pixel', fr: '📷 Photo → Pixel' },
    helpPhotoDesc:          { en: 'Import a photo or image and automatically convert it to pixel art at your grid size. The app detects the pixel block size and centers the result.', fr: 'Importez une photo ou image et convertissez-la automatiquement en pixel art à la taille de votre grille. L\'app détecte la taille des blocs de pixels et centre le résultat.' },
    helpPhotoColors:        { en: 'All colors detected in the image are automatically added to your custom palette.', fr: 'Toutes les couleurs détectées dans l\'image sont automatiquement ajoutées à votre palette personnalisée.' },
    helpPhotoAccess:        { en: 'Available from the hamburger menu (mobile) or the sidebar (desktop).', fr: 'Accessible depuis le menu hamburger (mobile) ou la sidebar (desktop).' },

    helpOnionTitle:         { en: '👁 Onion Skin', fr: '👁 Onion Skin' },
    helpOnionDesc:          { en: 'Displays ghost images of adjacent frames behind your drawing to help with animation continuity.', fr: 'Affiche des images fantômes des frames adjacentes derrière votre dessin pour faciliter la continuité des animations.' },
    helpOnionToggle:        { en: '<strong>Enable/Disable:</strong> toggle onion skin on or off entirely.', fr: '<strong>Activer/Désactiver :</strong> active ou désactive totalement l\'onion skin.' },
    helpOnionOpacity:       { en: '<strong>Opacity:</strong> controls how transparent the ghost frames appear (5%–50%).', fr: '<strong>Opacité :</strong> contrôle la transparence des frames fantômes (5%–50%).' },
    helpOnionFrames:        { en: '<strong>Previous / Next frames (1–3):</strong> choose how many frames before and after the current one are shown.', fr: '<strong>Frames précédentes / suivantes (1–3) :</strong> choisissez combien de frames avant et après la frame courante sont affichées.' },

    helpHistoryTitle:       { en: '🕐 History', fr: '🕐 Historique' },
    helpHistoryDesc:        { en: 'Visual history of all drawing states, up to 100 steps. Each state is shown as a thumbnail.', fr: 'Historique visuel de tous les états de dessin, jusqu\'à 100 étapes. Chaque état est affiché sous forme de miniature.' },
    helpHistoryNav:         { en: '<strong>Click a state</strong> to jump directly to it. The current state is highlighted in blue.', fr: '<strong>Cliquez sur un état</strong> pour y revenir directement. L\'état actuel est mis en évidence en bleu.' },
    helpHistoryUndo:        { en: 'Undo/Redo (Ctrl+Z / Ctrl+Shift+Z) navigates the same history step by step.', fr: 'Annuler/Rétablir (Ctrl+Z / Ctrl+Shift+Z) navigue dans le même historique étape par étape.' },

    helpGradientTitle:      { en: '🌈 Gradient brush', fr: '🌈 Pinceau dégradé' },
    helpGradientDesc:       { en: 'When active, each pixel you draw receives a color interpolated between Color A and Color B based on its position on the grid.', fr: 'Quand actif, chaque pixel dessiné reçoit une couleur interpolée entre Couleur A et Couleur B selon sa position sur la grille.' },
    helpGradientColors:     { en: '<strong>Color A / Color B:</strong> pick the two endpoint colors of the gradient.', fr: '<strong>Couleur A / Couleur B :</strong> choisissez les deux couleurs extrêmes du dégradé.' },
    helpGradientDir:        { en: '<strong>Direction:</strong> → Horizontal (left→right), ↓ Vertical (top→bottom), ↘ Diagonal (top-left→bottom-right).', fr: '<strong>Direction :</strong> → Horizontal (gauche→droite), ↓ Vertical (haut→bas), ↘ Diagonal (haut-gauche→bas-droite).' },
    helpGradientPreview:    { en: 'A live preview bar shows the resulting gradient before you draw.', fr: 'Une barre de prévisualisation en temps réel montre le dégradé résultant avant de dessiner.' },

    helpTextTitle:          { en: '✏️ Pixel Art Text', fr: '✏️ Texte Pixel Art' },
    helpTextDesc:           { en: 'Type any text and it will be rendered as pixel art using a built-in 5×7 bitmap font (A–Z, 0–9, punctuation).', fr: 'Saisissez du texte et il sera rendu en pixel art via une police bitmap intégrée 5×7 (A–Z, 0–9, ponctuation).' },
    helpTextOptions:        { en: '<strong>Color:</strong> choose the text color. <strong>Scale ×1 / ×2:</strong> double the size of each pixel for larger text.', fr: '<strong>Couleur :</strong> choisissez la couleur du texte. <strong>Taille ×1 / ×2 :</strong> double la taille de chaque pixel pour un texte plus grand.' },
    helpTextApply:          { en: '<strong>Apply:</strong> writes the text pixels to the top-left of the active layer. Use Ctrl+Z to undo.', fr: '<strong>Appliquer :</strong> écrit les pixels du texte en haut à gauche du calque actif. Utilisez Ctrl+Z pour annuler.' },
    // Stamp tool
    stampTitle:             { en: '🪄 Import a sprite', fr: '🪄 Importer un sprite' },
    stampSubtitle:          { en: 'Choose a project then pick the frame to stamp on your canvas.', fr: 'Choisissez un projet puis la frame à incruster sur votre canvas.' },
    stampNoProjects:        { en: '❌ No saved projects found.', fr: '❌ Aucun projet sauvegardé trouvé.' },
    stampFramesAvail:       { en: (n) => `${n} frame${n>1?'s':''} available — pick one:`, fr: (n) => `${n} frame${n>1?'s':''} disponible${n>1?'s':''} — choisissez-en une :` },
    stampConfirm:           { en: 'Stamp', fr: 'Tamponner' },
    stampModeActive:        { en: '🪄 Stamp mode — click on the canvas to place the sprite (Esc to cancel)', fr: '🪄 Mode tampon — cliquez sur le canvas pour placer le sprite (Échap pour annuler)' },
    stampCancelled:         { en: 'Stamp mode cancelled', fr: 'Mode tampon annulé' },
    stampApplied:           { en: '✅ Sprite stamped!', fr: '✅ Sprite incrusté !' },
    stampBtn:               { en: '🪄 Stamp sprite', fr: '🪄 Tampon sprite' },
    // Onion skin
    onionSkinTitle:         { en: '👁 Onion Skin', fr: '👁 Onion Skin' },
    onionSkinEnable:        { en: 'Enable onion skin', fr: 'Activer l\'onion skin' },
    onionSkinOpacity:       { en: 'Opacity', fr: 'Opacité' },
    onionSkinPrev:          { en: 'Previous frames', fr: 'Frames précédentes' },
    onionSkinNext:          { en: 'Next frames', fr: 'Frames suivantes' },
    // History
    historyTitle:           { en: '🕐 History', fr: '🕐 Historique' },
    historyCurrentState:    { en: 'Current state', fr: 'État actuel' },
    historyState:           { en: 'State', fr: 'État' },
    historyEmpty:           { en: 'No history available.', fr: 'Aucun historique disponible.' },
    // Gradient
    gradientTitle:          { en: '🌈 Gradient', fr: '🌈 Dégradé' },
    gradientEnable:         { en: 'Enable gradient', fr: 'Activer le dégradé' },
    gradientColorA:         { en: 'Color A', fr: 'Couleur A' },
    gradientColorB:         { en: 'Color B', fr: 'Couleur B' },
    gradientDirection:      { en: 'Direction', fr: 'Direction' },
    gradientPreview:        { en: 'Preview', fr: 'Aperçu' },
    // Text tool
    textToolTitle:          { en: '✏️ Pixel Art Text', fr: '✏️ Texte Pixel Art' },
    textToolText:           { en: 'Text', fr: 'Texte' },
    textToolColor:          { en: 'Color', fr: 'Couleur' },
    textToolScale:          { en: 'Scale (×)', fr: 'Taille (×)' },
    textToolApply:          { en: 'Apply', fr: 'Appliquer' },
    textToolPreview:        { en: 'Preview', fr: 'Aperçu' },
    // Import Sprite Sheet
    isTitle:                { en: '🗂️ Import Sprite Sheet', fr: '🗂️ Importer Sprite Sheet' },
    isDropHint:             { en: 'Drop a PNG / JPG here or click to browse', fr: 'Déposez un PNG / JPG ici ou cliquez pour parcourir' },
    isFileSelected:         { en: f => `✔ ${f}`, fr: f => `✔ ${f}` },
    isFrameW:               { en: 'Frame width (px)', fr: 'Largeur frame (px)' },
    isFrameH:               { en: 'Frame height (px)', fr: 'Hauteur frame (px)' },
    isCols:                 { en: 'Columns', fr: 'Colonnes' },
    isRows:                 { en: 'Rows', fr: 'Lignes' },
    isWillCreate:           { en: n => `Will create ${n} frame${n > 1 ? 's' : ''}`, fr: n => `Créera ${n} frame${n > 1 ? 's' : ''}` },
    isResampleNote:         { en: g => `Frames will be resampled to ${g}×${g}px`, fr: g => `Frames rééchantillonnées à ${g}×${g}px` },
    isReplace:              { en: 'Replace all frames', fr: 'Remplacer les frames' },
    isAppend:               { en: 'Append to frames', fr: 'Ajouter aux frames' },
    isImportBtn:            { en: '🗂️ Import', fr: '🗂️ Importer' },
    isImportSuccess:        { en: (n, r) => `✅ ${n} frame${n>1?'s':''} imported (${r})`, fr: (n, r) => `✅ ${n} frame${n>1?'s':''} importée${n>1?'s':''} (${r})` },
    isNoFile:               { en: 'Please select an image first.', fr: 'Veuillez sélectionner une image.' },
    isTooManyFrames:        { en: n => `⚠️ This will create ${n} frames. Continue?`, fr: n => `⚠️ Cela créera ${n} frames. Continuer ?` },
};
const tL = (key, ...args) => {
    const lang = localStorage.getItem('lang') || 'en';
    const val = TL[key]?.[lang] ?? TL[key]?.en ?? key;
    return typeof val === 'function' ? val(...args) : val;
};
// ─────────────────────────────────────────────────────────────────────────────

let userProfile = null;
let userProfileFetched = false;

function createEmptyFrame(width = currentGridSize, height = currentGridSize) {
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

// Détecte la taille de grille depuis les données brutes et redimensionne si nécessaire
function autoDetectAndResizeGrid(rawFramesData) {
    const arr = typeof rawFramesData === 'string' ? JSON.parse(rawFramesData) : rawFramesData;
    if (!Array.isArray(arr) || arr.length === 0) return;

    let detectedSize = null;
    const first = arr[0];

    if (first && first._sparse === true && first.size) {
        // Format sparse — size = nombre total de pixels
        detectedSize = Math.round(Math.sqrt(first.size));
    } else {
        const firstFrame = Array.isArray(first) ? first : (first?.pixels || null);
        if (Array.isArray(firstFrame) && firstFrame.length > 0) {
            detectedSize = Math.round(Math.sqrt(firstFrame.length));
        }
    }

    if (detectedSize && VALID_GRID_SIZES.includes(detectedSize) && detectedSize !== currentGridSize) {
        currentGridSize = detectedSize;
        initGrid(detectedSize);
        updateGridSizeIndicator(detectedSize);
        updateGridSizeBtnStates(detectedSize);
    }
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
        // Décompresser le format sparse si nécessaire
        if (frame && frame._sparse === true) {
            frame = fromSparseFrame(frame);
        }
        if (frame && typeof frame === 'object' && !Array.isArray(frame) && Array.isArray(frame.pixels)) {
            frame = frame.pixels;
        }

        if (!Array.isArray(frame)) {
            return createEmptyFrame();
        }
        if (frame.length !== currentGridSize * currentGridSize) {
            // Détecter la taille d'origine et mapper en 2D (coin haut-gauche)
            const srcSize = Math.round(Math.sqrt(frame.length));
            const normalised = createEmptyFrame();
            for (let i = 0; i < frame.length; i++) {
                const srcCol = i % srcSize;
                const srcRow = Math.floor(i / srcSize);
                if (srcCol < currentGridSize && srcRow < currentGridSize) {
                    normalised[srcRow * currentGridSize + srcCol] = normalisePixel(frame[i]);
                }
            }
            return normalised;
        }
        return frame.map(normalisePixel);
    });
}

// Sparse pixel encoding: store only non-empty (colored) pixels with their index.
// Reduces 512×512 frame from ~8MB to a few KB when mostly empty.
function toSparseFrame(frame) {
    if (!Array.isArray(frame)) return frame;
    const data = [];
    for (let i = 0; i < frame.length; i++) {
        const px = frame[i];
        if (px && !px.isEmpty && px.color) {
            data.push({ i, c: px.color });
        }
    }
    return { _sparse: true, size: frame.length, data };
}

function fromSparseFrame(sparse) {
    const size = sparse.size || (currentGridSize * currentGridSize);
    const frame = [];
    for (let i = 0; i < size; i++) frame.push({ color: '#FFFFFF', isEmpty: true });
    for (const entry of (sparse.data || [])) {
        if (entry.i >= 0 && entry.i < size) {
            frame[entry.i] = { color: entry.c, isEmpty: false };
        }
    }
    return frame;
}

function compressFrameLayers(layersData) {
    if (!Array.isArray(layersData)) return layersData;
    return layersData.map(layersInFrame =>
        (Array.isArray(layersInFrame) ? layersInFrame : []).map(layer => ({
            ...layer,
            pixels: layer.pixels ? toSparseFrame(layer.pixels) : layer.pixels
        }))
    );
}

function decompressFrameLayers(layersData) {
    if (!Array.isArray(layersData)) return layersData;
    return layersData.map(layersInFrame =>
        (Array.isArray(layersInFrame) ? layersInFrame : []).map(layer => ({
            ...layer,
            pixels: (layer.pixels && layer.pixels._sparse) ? fromSparseFrame(layer.pixels) : layer.pixels
        }))
    );
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function debounce(fn, delay) {
    let timer;
    return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
}

function sanitize(str) {
    const el = document.createElement('div');
    el.textContent = String(str ?? '');
    return el.innerHTML;
}

function showToast(message, { type = 'info', duration = 3500, id = null } = {}) {
    const style = getComputedStyle(document.documentElement);
    const colors = {
        error:   style.getPropertyValue('--color-error').trim()   || '#e74c3c',
        success: style.getPropertyValue('--color-success').trim() || '#27ae60',
        warning: style.getPropertyValue('--color-warning').trim() || '#f39c12',
        info:    style.getPropertyValue('--color-info').trim()    || '#555',
    };
    // Si un toast avec le même id existe déjà, ne pas en créer un second
    if (id) {
        const existing = document.querySelector(`[data-toast-id="${id}"]`);
        if (existing) return;
    }
    const toast = document.createElement('div');
    if (id) toast.dataset.toastId = id;
    toast.style.cssText = `
        position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(12px);
        background:${colors[type] || colors.info};color:#fff;
        padding:10px 20px;border-radius:10px;font-size:0.875rem;font-weight:500;
        box-shadow:0 4px 16px rgba(0,0,0,0.3);z-index:99999;
        opacity:0;transition:opacity 0.2s,transform 0.2s;pointer-events:none;white-space:nowrap;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(8px)';
        setTimeout(() => toast.remove(), 220);
    }, duration);
}

function updateToast(id, message) {
    const toast = document.querySelector(`[data-toast-id="${id}"]`);
    if (toast) toast.textContent = message;
}

function dismissToast(id) {
    const toast = document.querySelector(`[data-toast-id="${id}"]`);
    if (!toast) return;
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(8px)';
    setTimeout(() => toast.remove(), 220);
}

let _authCacheTime = 0;
const _AUTH_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function ensureAuthenticatedUser(retries = 10, delay = 200) {
    // Utiliser le cache si l'auth a été vérifiée il y a moins de 5 min
    const now = Date.now();
    if (now - _authCacheTime < _AUTH_CACHE_TTL &&
        window.authService.isAuthenticated && window.authService.isAuthenticated()) {
        return true;
    }

    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            await window.authService.init();
        } catch (error) {
            console.warn('Auth init attempt failed:', error);
        }

        if (window.authService.isAuthenticated && window.authService.isAuthenticated()) {
            _authCacheTime = Date.now();
            return true;
        }

        await sleep(delay);
    }

    throw new Error('User not authenticated');
}

async function logUsageEvent(_eventName, _payload = {}) {
    // Désactivé — réduit les appels Supabase (compute Nano plan gratuit)
    return;
    // eslint-disable-next-line no-unreachable
}

// Variables pour l'animation
let isAnimationPlaying = false;
let animationInterval = null;

// Variables pour l'historique undo/redo
let history = []; // Historique des changements de pixels
let historyIndex = -1; // Index actuel dans l'historique
const maxHistorySize = 100; // Nombre maximum d'étapes dans l'historique
let onionSkinEnabled = true;
let onionSkinOpacity = 0.25;
let onionSkinPrevCount = 1;  // nb frames précédentes (1-3)
let onionSkinNextCount = 1;  // nb frames suivantes (1-3)
let gradientMode = false;
let gradientColorA = '#FF0000';
let gradientColorB = '#0000FF';
let gradientDirection = 'horizontal'; // 'horizontal' | 'vertical' | 'diagonal'
let currentActionPixels = new Set(); // Pixels modifiés dans l'action actuelle
let actionStartState = null; // État de la grille au début de l'action

// Applique les variables CSS dynamiques à la grille selon la taille
// Le viewport est TOUJOURS fixe (indépendant du nombre de cellules)
function applyGridCSSVariables(size) {
    const grid = document.getElementById('pixelGrid');
    if (!grid) return;

    const isDesktop = window.innerWidth >= 1024;
    const isXLarge  = window.innerWidth >= 2200; // iMac 27" et plus

    // Taille viewport fixe — même espace visuel peu importe 8×8 ou 256×256
    // Sur très grands écrans les sidebars absorbent le surplus, canvas reste 896px max
    const viewportExpr = isDesktop
        ? isXLarge
            ? 'min(calc(100vw - 720px), calc(100vh - 200px), 896px)'
            : 'min(calc(100vw - 480px), calc(100vh - 200px), 896px)'
        : 'min(calc(100vw - 4px), calc(100vh - 120px), 560px)';

    grid.style.width  = `calc(${viewportExpr})`;
    grid.style.height = `calc(${viewportExpr})`;
    grid.style.setProperty('--grid-cols', size);
    grid.style.setProperty('--cell-size', `calc(${viewportExpr} / ${size})`);
}

// Initialisation de la grille (dynamique)
function initGrid(size = currentGridSize) {
    const grid = document.getElementById('pixelGrid');
    if (!grid) return;

    // Vider la grille + reset zoom/pan
    grid.innerHTML = '';
    gridZoom = 1; gridPanX = 0; gridPanY = 0;
    grid.classList.toggle('grid-large', size >= 128);

    // Appliquer les variables CSS dynamiques
    applyGridCSSVariables(size);

    // ── Phase 3 : canvas uniquement, zéro div.pixel ───────────────────────────────
    if (pixelCanvas) pixelCanvas.remove();
    pixelCanvas = document.createElement('canvas');
    pixelCanvas.id = 'pixelCanvas';
    pixelCanvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:2;';
    grid.appendChild(pixelCanvas);
    // Read clientWidth (forces reflow), then pin height to SAME integer value
    // so the container is a guaranteed exact square (CSS calc can produce sub-pixel
    // width≠height differences that stretch pixels non-uniformly)
    const rawGw = grid.clientWidth || 512;
    grid.style.height = rawGw + 'px';
    // Canvas dimensions: multiple of grid size so cellSize is always an integer
    // (non-integer cellSize → col/row rounding mismatch → non-square pixels)
    const gw = Math.max(size, Math.round(rawGw / size) * size);
    pixelCanvas.width  = gw;
    pixelCanvas.height = gw;
    pixelCtx = pixelCanvas.getContext('2d');
    cellSize = gw / size; // guaranteed integer
    canvasCssScale = gw / rawGw; // ratio canvas-px / CSS-px (pan values are CSS, transform needs canvas)
    // ─────────────────────────────────────────────────────────────────────────────────

    if (!grid._mousedownListenerAdded) {
        grid._mousedownListenerAdded = true;
        initZoomPan();

        // Dessin : mousedown démarre, mousemove continue, mouseup arrête
        grid.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return;
            e.preventDefault();
            startDrawing(e);
        });

        grid.addEventListener('mousemove', (e) => {
            if (isStampMode || isSpriteSheetMode || isTextPlacementMode) {
                // Tampon / sprite sheet / texte : calculer position du ghost
                const rect = grid.getBoundingClientRect();
                const cssCell = cellSize / canvasCssScale;
                const col = Math.max(0, Math.min(currentGridSize - 1,
                    Math.floor((e.clientX - rect.left - gridPanX) / gridZoom / cssCell)));
                const row = Math.max(0, Math.min(currentGridSize - 1,
                    Math.floor((e.clientY - rect.top  - gridPanY) / gridZoom / cssCell)));
                if (isStampMode) updateStampGhost(col, row);
                else if (isSpriteSheetMode) updateSpriteSheetGhost(col, row);
                else updateTextGhost(col, row);
            } else if (isDrawing) {
                draw(e);
            }
        });

        // Apple Pencil : pointerType 'pen' → dessin (évite conflit avec touch/mouse)
        grid.addEventListener('pointerdown', (e) => {
            if (e.pointerType !== 'pen') return;
            e.preventDefault();
            startDrawing({ clientX: e.clientX, clientY: e.clientY });
        });
        grid.addEventListener('pointermove', (e) => {
            if (e.pointerType !== 'pen') return;
            if (isDrawing) draw({ clientX: e.clientX, clientY: e.clientY });
        });
        grid.addEventListener('pointerup', (e) => {
            if (e.pointerType !== 'pen') return;
            stopDrawing();
        });
        grid.addEventListener('pointercancel', (e) => {
            if (e.pointerType !== 'pen') return;
            stopDrawing();
        });
    }
}

// Recalculer les CSS si la fenêtre est redimensionnée
window.addEventListener('resize', debounce(() => {
    applyGridCSSVariables(currentGridSize);
    // Phase 1 : redimensionner le canvas et recalculer cellSize
    if (pixelCanvas) {
        const grid = document.getElementById('pixelGrid');
        const rawGw = grid ? grid.clientWidth : 512;
        grid.style.height = rawGw + 'px'; // keep container square after resize
        const gw = Math.max(currentGridSize, Math.round(rawGw / currentGridSize) * currentGridSize);
        pixelCanvas.width  = gw;
        pixelCanvas.height = gw;
        cellSize = gw / currentGridSize;
        canvasCssScale = gw / rawGw;
        renderCanvas();
    }
}, 150));

// ========================================
// ZOOM / PAN DE LA GRILLE
// ========================================

let gridZoom = 1;
let gridPanX = 0;
let gridPanY = 0;
let canvasCssScale = 1; // gw / rawGw — converts CSS-pixel pan values to canvas-pixel units
const MIN_ZOOM = 1;
const MAX_ZOOM = 16;

function applyGridTransform() {
    renderCanvas(); // Phase 3 : le canvas gère le zoom/pan via setTransform()
}

// ── Système de calques ────────────────────────────────────────────────────────
function _makeEmptyPixels() {
    const n = currentGridSize * currentGridSize;
    return Array.from({ length: n }, () => ({ color: '#FFFFFF', isEmpty: true }));
}

function createLayer(name) {
    return { id: _nextLayerId++, name: name || 'Calque', visible: true, opacity: 1.0, pixels: _makeEmptyPixels() };
}

function computeComposite(frameIndex) {
    const layers = frameLayers[frameIndex];
    if (!layers || !layers.length) return (frames[frameIndex] || []).map(p => p ? {...p} : {color:'#FFFFFF',isEmpty:true});
    const n = currentGridSize * currentGridSize;
    const result = Array.from({ length: n }, () => ({ color: '#FFFFFF', isEmpty: true }));
    layers.forEach(layer => {
        if (!layer.visible) return;
        layer.pixels.forEach((pixel, i) => {
            if (pixel && !pixel.isEmpty) result[i] = { ...pixel };
        });
    });
    return result;
}

function initLayersFromFrames() {
    _nextLayerId = 0;
    frameLayers = frames.map(frame => {
        const layer = createLayer('Fond');
        const n = currentGridSize * currentGridSize;
        layer.pixels = Array.from({ length: n }, (_, i) => {
            const p = frame ? frame[i] : null;
            return p ? { ...p } : { color: '#FFFFFF', isEmpty: true };
        });
        return [layer];
    });
    currentLayer = 0;
}

function ensureFrameHasLayers(frameIndex) {
    if (!frameLayers[frameIndex] || !frameLayers[frameIndex].length) {
        const layer = createLayer('Fond');
        const n = currentGridSize * currentGridSize;
        const rawFrame = frames[frameIndex] || [];
        layer.pixels = Array.from({ length: n }, (_, i) => {
            const p = rawFrame[i];
            return p ? { ...p } : { color: '#FFFFFF', isEmpty: true };
        });
        frameLayers[frameIndex] = [layer];
    }
}

function setActiveLayer(index) {
    if (!frameLayers[currentFrame] || index < 0 || index >= frameLayers[currentFrame].length) return;
    // Save current layer before switching
    if (frameLayers[currentFrame][currentLayer]) {
        frameLayers[currentFrame][currentLayer].pixels = currentFrameBuffer.map(p => p ? { ...p } : { color: '#FFFFFF', isEmpty: true });
    }
    currentLayer = index;
    // Load new layer into buffer
    const n = currentGridSize * currentGridSize;
    const layerPixels = frameLayers[currentFrame][currentLayer].pixels;
    currentFrameBuffer = Array.from({ length: n }, (_, i) => {
        const p = layerPixels[i];
        return p ? { ...p } : { color: '#FFFFFF', isEmpty: true };
    });
    updateLayersPanel();
    scheduleRender();
}

function addLayer() {
    if (!frameLayers[currentFrame]) ensureFrameHasLayers(currentFrame);
    // Save current state
    if (frameLayers[currentFrame][currentLayer]) {
        frameLayers[currentFrame][currentLayer].pixels = currentFrameBuffer.map(p => p ? { ...p } : { color: '#FFFFFF', isEmpty: true });
    }
    const name = `Calque ${frameLayers[currentFrame].length + 1}`;
    const newLayer = createLayer(name);
    frameLayers[currentFrame].push(newLayer);
    currentLayer = frameLayers[currentFrame].length - 1;
    const n = currentGridSize * currentGridSize;
    currentFrameBuffer = Array.from({ length: n }, () => ({ color: '#FFFFFF', isEmpty: true }));
    frames[currentFrame] = computeComposite(currentFrame);
    updateLayersPanel();
    scheduleRender();
}

function deleteLayer(index) {
    if (!frameLayers[currentFrame] || frameLayers[currentFrame].length <= 1) return;
    frameLayers[currentFrame].splice(index, 1);
    if (currentLayer >= frameLayers[currentFrame].length) currentLayer = frameLayers[currentFrame].length - 1;
    // Load new active layer
    const n = currentGridSize * currentGridSize;
    const layerPixels = frameLayers[currentFrame][currentLayer].pixels;
    currentFrameBuffer = Array.from({ length: n }, (_, i) => {
        const p = layerPixels[i];
        return p ? { ...p } : { color: '#FFFFFF', isEmpty: true };
    });
    frames[currentFrame] = computeComposite(currentFrame);
    updateLayersPanel();
    scheduleRender();
}

function duplicateLayer(index) {
    if (!frameLayers[currentFrame]?.[index]) return;
    // Save current first
    if (frameLayers[currentFrame][currentLayer]) {
        frameLayers[currentFrame][currentLayer].pixels = currentFrameBuffer.map(p => p ? { ...p } : { color: '#FFFFFF', isEmpty: true });
    }
    const src = frameLayers[currentFrame][index];
    const copy = { id: _nextLayerId++, name: src.name + ' copie', visible: src.visible, opacity: src.opacity, pixels: src.pixels.map(p => p ? { ...p } : { color: '#FFFFFF', isEmpty: true }) };
    frameLayers[currentFrame].splice(index + 1, 0, copy);
    setActiveLayer(index + 1);
}

function mergeLayerDown(index) {
    const layers = frameLayers[currentFrame];
    if (!layers || index <= 0 || index >= layers.length) return;
    // Save current first
    if (layers[currentLayer]) {
        layers[currentLayer].pixels = currentFrameBuffer.map(p => p ? { ...p } : { color: '#FFFFFF', isEmpty: true });
    }
    const top = layers[index];
    const bottom = layers[index - 1];
    top.pixels.forEach((pixel, i) => {
        if (pixel && !pixel.isEmpty) bottom.pixels[i] = { ...pixel };
    });
    layers.splice(index, 1);
    if (currentLayer >= index) currentLayer = Math.max(0, currentLayer - 1);
    // Load new active
    const n = currentGridSize * currentGridSize;
    const layerPixels = layers[currentLayer].pixels;
    currentFrameBuffer = Array.from({ length: n }, (_, i) => {
        const p = layerPixels[i];
        return p ? { ...p } : { color: '#FFFFFF', isEmpty: true };
    });
    frames[currentFrame] = computeComposite(currentFrame);
    updateLayersPanel();
    scheduleRender();
}

function toggleLayerVisibility(index) {
    if (!frameLayers[currentFrame]?.[index]) return;
    frameLayers[currentFrame][index].visible = !frameLayers[currentFrame][index].visible;
    frames[currentFrame] = computeComposite(currentFrame);
    updateLayersPanel();
    scheduleRender();
}

function setLayerOpacity(index, opacity) {
    if (!frameLayers[currentFrame]?.[index]) return;
    frameLayers[currentFrame][index].opacity = Math.max(0.05, Math.min(1, opacity));
    frames[currentFrame] = computeComposite(currentFrame);
    scheduleRender();
}

function renameLayer(index, name) {
    if (!frameLayers[currentFrame]?.[index] || !name.trim()) return;
    frameLayers[currentFrame][index].name = name.trim();
    updateLayersPanel();
}

function _renderLayersList(container, layers) {
    if (!container) return;
    container.innerHTML = '';
    // Display in reverse (top layer first visually)
    for (let i = layers.length - 1; i >= 0; i--) {
        const layer = layers[i];
        const isActive = i === currentLayer;
        const item = document.createElement('div');
        item.className = 'layer-item' + (isActive ? ' active' : '');
        item.dataset.layerIndex = i;
        item.draggable = !_isTouch;
        const eyeSvgVisible = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
        const eyeSvgHidden = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;

        const eyeBtn = document.createElement('button');
        eyeBtn.className = `layer-eye ${layer.visible ? '' : 'layer-hidden'}`;
        eyeBtn.title = layer.visible ? 'Masquer le calque' : 'Afficher le calque';
        eyeBtn.innerHTML = layer.visible ? eyeSvgVisible : eyeSvgHidden;
        eyeBtn.addEventListener('click', () => toggleLayerVisibility(i));

        const nameSpan = document.createElement('span');
        nameSpan.className = `layer-name ${layer.visible ? '' : 'layer-name-hidden'}`;
        nameSpan.title = 'Cliquer pour renommer';
        nameSpan.textContent = layer.name;
        nameSpan.addEventListener('click', (e) => {
            e.stopPropagation();
            // Sélectionner le calque au 1er clic, renommer au 2e clic (double-clic simulé)
            if (i !== currentLayer) { setActiveLayer(i); return; }
            if (nameSpan.querySelector('input')) return; // déjà en édition
            const currentName = frameLayers[currentFrame]?.[i]?.name || '';
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentName;
            input.className = 'layer-name-input';
            input.style.cssText = 'background:transparent;border:none;border-bottom:1px solid rgba(255,255,255,0.5);outline:none;color:inherit;font:inherit;width:100%;padding:0;';
            nameSpan.textContent = '';
            nameSpan.appendChild(input);
            input.focus();
            input.select();
            const commit = () => {
                const val = input.value.trim();
                if (val) renameLayer(i, val);
                // updateLayersPanel() sera appelé par renameLayer et rechargera le span
            };
            input.addEventListener('blur', commit);
            input.addEventListener('keydown', (ev) => {
                if (ev.key === 'Enter') { ev.preventDefault(); input.blur(); }
                if (ev.key === 'Escape') { input.removeEventListener('blur', commit); nameSpan.textContent = currentName; }
            });
        });

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'layer-actions';

        if (i > 0) {
            const mergeBtn = document.createElement('button');
            mergeBtn.className = 'layer-action-btn';
            mergeBtn.title = 'Fusionner avec le calque dessous';
            mergeBtn.textContent = '⬇';
            mergeBtn.addEventListener('click', () => mergeLayerDown(i));
            actionsDiv.appendChild(mergeBtn);
        }

        const dupBtn = document.createElement('button');
        dupBtn.className = 'layer-action-btn';
        dupBtn.title = 'Dupliquer';
        dupBtn.textContent = '⧉';
        dupBtn.addEventListener('click', () => duplicateLayer(i));
        actionsDiv.appendChild(dupBtn);

        if (layers.length > 1) {
            const delBtn = document.createElement('button');
            delBtn.className = 'layer-action-btn layer-delete-btn';
            delBtn.title = 'Supprimer';
            delBtn.textContent = '×';
            delBtn.addEventListener('click', () => deleteLayer(i));
            actionsDiv.appendChild(delBtn);
        }

        const dragHandle = document.createElement('span');
        dragHandle.className = 'layer-drag-handle';
        dragHandle.title = 'Glisser pour réordonner';
        dragHandle.textContent = '⠿';

        item.append(dragHandle, eyeBtn, nameSpan, actionsDiv);

        // Sélectionner le calque au clic
        item.addEventListener('click', (e) => {
            if (e.target.closest('button') || e.target.closest('.layer-drag-handle')) return;
            setActiveLayer(i);
        });

        // ── Drag & Drop desktop ──────────────────────────────────────────────
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', String(i));
            setTimeout(() => item.classList.add('layer-dragging'), 0);
        });
        item.addEventListener('dragend', () => {
            item.classList.remove('layer-dragging');
            container.querySelectorAll('.layer-drop-above,.layer-drop-below').forEach(el => {
                el.classList.remove('layer-drop-above', 'layer-drop-below');
            });
        });
        item.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            container.querySelectorAll('.layer-drop-above,.layer-drop-below').forEach(el => {
                el.classList.remove('layer-drop-above', 'layer-drop-below');
            });
            const rect = item.getBoundingClientRect();
            const mid = rect.top + rect.height / 2;
            item.classList.add(e.clientY < mid ? 'layer-drop-above' : 'layer-drop-below');
        });
        item.addEventListener('dragleave', () => {
            item.classList.remove('layer-drop-above', 'layer-drop-below');
        });
        item.addEventListener('drop', (e) => {
            e.preventDefault();
            const fromIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
            const toIndex = parseInt(item.dataset.layerIndex, 10);
            const rect = item.getBoundingClientRect();
            const dropAbove = e.clientY < rect.top + rect.height / 2;
            item.classList.remove('layer-drop-above', 'layer-drop-below');
            if (fromIndex !== toIndex) reorderLayer(fromIndex, toIndex, dropAbove);
        });


        container.appendChild(item);
    }
}

function reorderLayer(fromIndex, toIndex, dropAbove) {
    const layers = frameLayers[currentFrame];
    if (!layers || fromIndex === toIndex) return;
    // Save active layer first
    if (layers[currentLayer]) {
        layers[currentLayer].pixels = currentFrameBuffer.map(p => p ? { ...p } : { color: '#FFFFFF', isEmpty: true });
    }
    // dropAbove=true → visually above target = higher array index (layers display reversed)
    // dropAbove=false → visually below target = same array index as target
    let insertAt = dropAbove ? toIndex + 1 : toIndex;
    const [moved] = layers.splice(fromIndex, 1);
    if (fromIndex < insertAt) insertAt--;
    insertAt = Math.max(0, Math.min(layers.length, insertAt));
    layers.splice(insertAt, 0, moved);
    // Keep currentLayer pointing to the same layer
    if (currentLayer === fromIndex) {
        currentLayer = insertAt;
    } else {
        // Adjust if needed
        const cl = currentLayer > fromIndex ? currentLayer - 1 : currentLayer;
        currentLayer = cl >= insertAt ? cl + 1 : cl;
    }
    currentLayer = Math.max(0, Math.min(layers.length - 1, currentLayer));
    frames[currentFrame] = computeComposite(currentFrame);
    updateLayersPanel();
    scheduleRender();
}

function updateLayersPanel() {
    const layers = frameLayers[currentFrame] || [];
    _renderLayersList(document.getElementById('layersList'), layers);
    _renderLayersList(document.getElementById('layersListMobile'), layers);
    const mobile2 = document.getElementById('layersListMobile2');
    _renderLayersList(mobile2, layers);
    const titleEl = document.getElementById('mobileLayersPanelTitle');
    if (titleEl) titleEl.textContent = `Frame ${currentFrame + 1}`;
    if (_isTouch) {
        _makeTouchSortable(mobile2, '.layer-item', 'layerIndex', (from, to) => {
            reorderLayer(from, to, false);
        });
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
}


function toggleMobileLayersPanel() {
    const panel = document.getElementById('mobileLayersPanel');
    if (panel) panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

function scheduleRender() {
    requestAnimationFrame(() => renderCanvas());
}

// ── Phase 2 : rendu canvas (source de vérité = currentFrameBuffer) ────────────
function renderCanvas() {
    if (!pixelCtx || !pixelCanvas) return;
    if (!CANVAS_RENDERING) {
        pixelCtx.setTransform(1, 0, 0, 1, 0, 0);
        pixelCtx.clearRect(0, 0, pixelCanvas.width, pixelCanvas.height);
        return;
    }
    const w = pixelCanvas.width;
    pixelCtx.setTransform(1, 0, 0, 1, 0, 0);
    pixelCtx.clearRect(0, 0, w, w);
    // gridPanX/Y are in CSS-pixel units; canvas transform needs canvas-pixel units
    pixelCtx.setTransform(gridZoom, 0, 0, gridZoom, gridPanX * canvasCssScale, gridPanY * canvasCssScale);

    // Damier subtil — une cellule sur deux légèrement grisée, aligné avec la grille
    for (let row = 0; row < currentGridSize; row++) {
        for (let col = 0; col < currentGridSize; col++) {
            if ((col + row) % 2 === 1) {
                pixelCtx.fillStyle = 'rgba(0,0,0,0.04)';
                const _cx = col * cellSize, _cy = row * cellSize;
                pixelCtx.fillRect(_cx, _cy, (col + 1) * cellSize - _cx, (row + 1) * cellSize - _cy);
            }
        }
    }

    // Onion skin configurable
    if (onionSkinEnabled) {
        for (let d = onionSkinPrevCount; d >= 1; d--) {
            const fi = currentFrame - d;
            if (fi >= 0) {
                const ghostPixels = frameLayers[fi] ? computeComposite(fi) : frames[fi];
                if (!ghostPixels) continue;
                pixelCtx.globalAlpha = onionSkinOpacity / d;
                ghostPixels.forEach((pixel, i) => {
                    if (!pixel || pixel.isEmpty) return;
                    const col = i % currentGridSize, row = Math.floor(i / currentGridSize);
                    pixelCtx.fillStyle = pixel.color;
                    pixelCtx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
                });
                pixelCtx.globalAlpha = 1.0;
            }
        }
        for (let d = 1; d <= onionSkinNextCount; d++) {
            const fi = currentFrame + d;
            if (fi < frames.length) {
                const ghostPixels = frameLayers[fi] ? computeComposite(fi) : frames[fi];
                if (!ghostPixels) continue;
                pixelCtx.globalAlpha = (onionSkinOpacity * 0.6) / d;
                ghostPixels.forEach((pixel, i) => {
                    if (!pixel || pixel.isEmpty) return;
                    const col = i % currentGridSize, row = Math.floor(i / currentGridSize);
                    pixelCtx.fillStyle = pixel.color;
                    pixelCtx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
                });
                pixelCtx.globalAlpha = 1.0;
            }
        }
    }

    // Grille de référence (image fantôme — aspect ratio préservé + position/zoom)
    if (referenceImage) {
        const gridPx = currentGridSize * cellSize;
        const imgAspect = referenceImage.width / referenceImage.height;
        // Taille de base : image inscrite dans la grille en préservant le ratio
        let baseW, baseH;
        if (imgAspect >= 1) { baseW = gridPx; baseH = gridPx / imgAspect; }
        else                { baseH = gridPx; baseW = gridPx * imgAspect; }
        const drawW = baseW * referenceScale;
        const drawH = baseH * referenceScale;
        // Centrage par défaut + offset utilisateur
        const drawX = (gridPx - baseW) / 2 + referenceX;
        const drawY = (gridPx - baseH) / 2 + referenceY;
        pixelCtx.globalAlpha = referenceOpacity;
        pixelCtx.drawImage(referenceImage, drawX + (baseW - drawW) / 2, drawY + (baseH - drawH) / 2, drawW, drawH);
        pixelCtx.globalAlpha = 1.0;
    }

    // Calques (composite de bas en haut, calque actif depuis le buffer live)
    const _layers = frameLayers[currentFrame] || [];
    if (_layers.length > 0) {
        for (let _li = 0; _li < _layers.length; _li++) {
            const _layer = _layers[_li];
            if (!_layer.visible) continue;
            const _pixels = _li === currentLayer ? currentFrameBuffer : _layer.pixels;
            if (_layer.opacity < 1.0) pixelCtx.globalAlpha = _layer.opacity;
            _pixels.forEach((pixel, i) => {
                if (!pixel || pixel.isEmpty) return;
                const col = i % currentGridSize;
                const row = Math.floor(i / currentGridSize);
                pixelCtx.fillStyle = pixel.color;
                const x = Math.round(col * cellSize);
                const y = Math.round(row * cellSize);
                pixelCtx.fillRect(x, y, Math.round((col + 1) * cellSize) - x, Math.round((row + 1) * cellSize) - y);
            });
            if (_layer.opacity < 1.0) pixelCtx.globalAlpha = 1.0;
        }
    } else {
        // Fallback : pas encore de calques, utiliser le buffer directement
        currentFrameBuffer.forEach((pixel, i) => {
            if (!pixel || pixel.isEmpty) return;
            const col = i % currentGridSize;
            const row = Math.floor(i / currentGridSize);
            pixelCtx.fillStyle = pixel.color;
            const x = Math.round(col * cellSize);
            const y = Math.round(row * cellSize);
            pixelCtx.fillRect(x, y, Math.round((col + 1) * cellSize) - x, Math.round((row + 1) * cellSize) - y);
        });
    }

    // Lignes de grille : dessinées APRÈS les pixels avec destination-over
    // → apparaissent uniquement sur les zones vides (transparentes), jamais sur les pixels colorés
    const screenCellPx = cellSize * gridZoom;
    if (screenCellPx >= 6) {
        pixelCtx.globalCompositeOperation = 'destination-over';
        pixelCtx.strokeStyle = 'rgba(0,0,0,0.15)';
        pixelCtx.lineWidth = 0.5 / gridZoom;
        for (let c = 0; c <= currentGridSize; c++) {
            pixelCtx.beginPath();
            pixelCtx.moveTo(c * cellSize, 0);
            pixelCtx.lineTo(c * cellSize, currentGridSize * cellSize);
            pixelCtx.stroke();
        }
        for (let r = 0; r <= currentGridSize; r++) {
            pixelCtx.beginPath();
            pixelCtx.moveTo(0, r * cellSize);
            pixelCtx.lineTo(currentGridSize * cellSize, r * cellSize);
            pixelCtx.stroke();
        }
        pixelCtx.globalCompositeOperation = 'source-over';
    }

    // Overlay sélection rectangulaire
    const _selRect = selectionRect || (selection ? normalizeSelectionRect(selection) : null);
    if (_selRect) {
        pixelCtx.strokeStyle = '#FF7300';
        pixelCtx.lineWidth = 1.5 / gridZoom;
        pixelCtx.setLineDash([3 / gridZoom, 3 / gridZoom]);
        pixelCtx.strokeRect(
            _selRect.minCol * cellSize,
            _selRect.minRow * cellSize,
            (_selRect.maxCol - _selRect.minCol + 1) * cellSize,
            (_selRect.maxRow - _selRect.minRow + 1) * cellSize
        );
        pixelCtx.setLineDash([]);
    }
    // Overlay découpe tampon (ciseau)
    const _cropRect = cropRect || (cropSelection ? normalizeSelectionRect(cropSelection) : null);
    if (_cropRect) {
        pixelCtx.strokeStyle = '#00C853';
        pixelCtx.lineWidth = 2 / gridZoom;
        pixelCtx.setLineDash([4 / gridZoom, 3 / gridZoom]);
        pixelCtx.strokeRect(
            _cropRect.minCol * cellSize,
            _cropRect.minRow * cellSize,
            (_cropRect.maxCol - _cropRect.minCol + 1) * cellSize,
            (_cropRect.maxRow - _cropRect.minRow + 1) * cellSize
        );
        pixelCtx.setLineDash([]);
        // Dimensions dans un badge
        const w = _cropRect.maxCol - _cropRect.minCol + 1;
        const h = _cropRect.maxRow - _cropRect.minRow + 1;
        const label = `${w}×${h}`;
        const lx = (_cropRect.minCol + w) * cellSize + 4 / gridZoom;
        const ly = _cropRect.minRow * cellSize;
        pixelCtx.font = `bold ${Math.max(8, 11 / gridZoom)}px sans-serif`;
        pixelCtx.fillStyle = '#00C853';
        pixelCtx.fillText(label, lx, ly + 10 / gridZoom);
    }

    pixelCtx.setTransform(1, 0, 0, 1, 0, 0);
}

function normalizeSelectionRect(sel) {
    return {
        minCol: Math.min(sel.startCol, sel.endCol),
        maxCol: Math.max(sel.startCol, sel.endCol),
        minRow: Math.min(sel.startRow, sel.endRow),
        maxRow: Math.max(sel.startRow, sel.endRow)
    };
}

// Convertit des coordonnées client en index dans currentFrameBuffer
function getPixelIndexFromPoint(clientX, clientY) {
    const grid = document.getElementById('pixelGrid');
    if (!grid) return -1;
    const rect = grid.getBoundingClientRect();
    // cellSize est en pixels canvas ; le container CSS peut être plus petit (canvasCssScale != 1)
    // → taille d'une cellule en pixels CSS = cellSize / canvasCssScale
    const cssCell = cellSize / canvasCssScale;
    const col = Math.floor((clientX - rect.left - gridPanX) / gridZoom / cssCell);
    const row = Math.floor((clientY - rect.top  - gridPanY) / gridZoom / cssCell);
    if (col < 0 || col >= currentGridSize || row < 0 || row >= currentGridSize) return -1;
    return row * currentGridSize + col;
}

// rAF throttle : évite de redessiner plus de 60 fois/sec pendant le drag
let _rafId = null;
function scheduleRender() {
    if (_rafId !== null) return;
    _rafId = requestAnimationFrame(() => {
        _rafId = null;
        renderCanvas();
    });
}

// Applique un coup de pinceau ou de gomme sur le buffer à l'index donné
function _drawAtIndex(index) {
    if (index < 0 || index >= currentFrameBuffer.length) return;
    currentActionPixels.add(index);
    if (isErasing) {
        currentFrameBuffer[index] = { color: '#FFFFFF', isEmpty: true };
    } else {
        const paintColor = gradientMode ? getGradientColor(index) : currentColor;
        currentFrameBuffer[index] = { color: paintColor, isEmpty: false };
    }
    // Symétrie horizontale : mirror du pixel opposé sur la même ligne
    if (isSymmetryMode) {
        const col = index % currentGridSize;
        const row = Math.floor(index / currentGridSize);
        const mirrorIndex = row * currentGridSize + (currentGridSize - 1 - col);
        if (mirrorIndex !== index) {
            currentActionPixels.add(mirrorIndex);
            if (isErasing) {
                currentFrameBuffer[mirrorIndex] = { color: '#FFFFFF', isEmpty: true };
            } else {
                const mirrorPaintColor = gradientMode ? getGradientColor(mirrorIndex) : currentColor;
                currentFrameBuffer[mirrorIndex] = { color: mirrorPaintColor, isEmpty: false };
            }
        }
    }
    // Symétrie verticale : mirror du pixel opposé sur la même colonne
    if (isSymmetryV) {
        const col = index % currentGridSize;
        const row = Math.floor(index / currentGridSize);
        const mirrorIndex = (currentGridSize - 1 - row) * currentGridSize + col;
        if (mirrorIndex !== index) {
            currentActionPixels.add(mirrorIndex);
            if (isErasing) {
                currentFrameBuffer[mirrorIndex] = { color: '#FFFFFF', isEmpty: true };
            } else {
                const mirrorPaintColor = gradientMode ? getGradientColor(mirrorIndex) : currentColor;
                currentFrameBuffer[mirrorIndex] = { color: mirrorPaintColor, isEmpty: false };
            }
        }
    }
    scheduleRender();
    // saveCurrentFrame() est appelé dans stopDrawing() pour ne pas surcharger pendant le drag
}

// Pipette depuis le buffer (Phase 2)
function pickColorFromIndex(index) {
    const pixel = currentFrameBuffer[index];
    if (!pixel || pixel.isEmpty) {
        currentColor = '#FFFFFF';
        updateCurrentColorDisplay();
        setEraserState(false);
        showEyedropperNotification('Couleur de base : #FFFFFF (pixel vide)');
        setEyedropperState(false);
        return;
    }
    const hexColor = pixel.color.startsWith('rgb') ? rgbToHex(pixel.color) : pixel.color;
    const normalizedColor = normalizeColor(hexColor || '#FFFFFF');
    currentColor = normalizedColor;
    updateCurrentColorDisplay();
    setEraserState(false);
    const defaultColors = ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
    if (!defaultColors.includes(normalizedColor) && !customColors.includes(normalizedColor)) {
        customColors.unshift(normalizedColor);
        if (customColors.length > maxCustomColors) customColors = customColors.slice(0, maxCustomColors);
        updateColorPalette();
    }
    showEyedropperNotification(`Couleur : ${normalizedColor}`);
    setEyedropperState(false);
}
// ─────────────────────────────────────────────────────────────────────────────

// ── Feature : Dégradé linéaire ────────────────────────────────────────────────
function getGradientColor(pixelIndex) {
    const col = pixelIndex % currentGridSize;
    const row = Math.floor(pixelIndex / currentGridSize);
    let t;
    if (gradientDirection === 'horizontal') t = col / (currentGridSize - 1);
    else if (gradientDirection === 'vertical') t = row / (currentGridSize - 1);
    else t = (col + row) / (2 * (currentGridSize - 1));
    t = Math.max(0, Math.min(1, t));
    const parse = hex => [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)];
    const [r1,g1,b1] = parse(gradientColorA);
    const [r2,g2,b2] = parse(gradientColorB);
    const r = Math.round(r1 + (r2-r1)*t);
    const g = Math.round(g1 + (g2-g1)*t);
    const b = Math.round(b1 + (b2-b1)*t);
    return '#' + [r,g,b].map(v => v.toString(16).padStart(2,'0')).join('').toUpperCase();
}

function showGradientPanel() {
    const lang = localStorage.getItem('lang') || 'en';
    const title = lang === 'fr' ? '🌈 Dégradé' : '🌈 Gradient';
    const labelMode = lang === 'fr' ? 'Activer le dégradé' : 'Enable gradient';
    const labelA = lang === 'fr' ? 'Couleur A' : 'Color A';
    const labelB = lang === 'fr' ? 'Couleur B' : 'Color B';
    const labelDir = lang === 'fr' ? 'Direction' : 'Direction';
    const labelPreview = lang === 'fr' ? 'Aperçu' : 'Preview';

    const labelFill = lang === 'fr'
        ? '💡 Dégradé actif : dessiner pixel par pixel <strong>ou</strong> utiliser le pot de peinture sur une forme fermée pour la remplir en dégradé.'
        : '💡 Gradient active: draw pixel by pixel <strong>or</strong> use the paint bucket on a closed shape to fill it with the gradient.';

    const content = `
        <div style="display:flex;flex-direction:column;gap:12px;">
            <label style="display:flex;align-items:center;gap:8px;font-size:14px;">
                <input type="checkbox" id="gradientModeToggle" ${gradientMode ? 'checked' : ''}>
                ${labelMode}
            </label>
            <div style="font-size:12px;opacity:0.75;line-height:1.4;">${labelFill}</div>
            <div style="display:flex;gap:12px;align-items:center;">
                <label style="font-size:13px;">${labelA}</label>
                <input type="color" id="gradientColorAInput" value="${gradientColorA}" style="width:40px;height:32px;border:none;cursor:pointer;">
                <label style="font-size:13px;">${labelB}</label>
                <input type="color" id="gradientColorBInput" value="${gradientColorB}" style="width:40px;height:32px;border:none;cursor:pointer;">
            </div>
            <div>
                <div style="font-size:13px;margin-bottom:6px;">${labelDir}</div>
                <div style="display:flex;gap:6px;">
                    <button class="gradient-dir-btn${gradientDirection==='horizontal'?' active':''}" data-dir="horizontal" style="flex:1;padding:6px;border-radius:6px;border:1px solid #ccc;cursor:pointer;background:${gradientDirection==='horizontal'?'#007AFF':'#f5f5f7'};color:${gradientDirection==='horizontal'?'white':'#333'};">→ Horizontal</button>
                    <button class="gradient-dir-btn${gradientDirection==='vertical'?' active':''}" data-dir="vertical" style="flex:1;padding:6px;border-radius:6px;border:1px solid #ccc;cursor:pointer;background:${gradientDirection==='vertical'?'#007AFF':'#f5f5f7'};color:${gradientDirection==='vertical'?'white':'#333'};">↓ Vertical</button>
                    <button class="gradient-dir-btn${gradientDirection==='diagonal'?' active':''}" data-dir="diagonal" style="flex:1;padding:6px;border-radius:6px;border:1px solid #ccc;cursor:pointer;background:${gradientDirection==='diagonal'?'#007AFF':'#f5f5f7'};color:${gradientDirection==='diagonal'?'white':'#333'};">↘ Diagonal</button>
                </div>
            </div>
            <div>
                <div style="font-size:13px;margin-bottom:4px;">${labelPreview}</div>
                <canvas id="gradientPreviewCanvas" width="240" height="32" style="width:100%;height:32px;border-radius:6px;border:1px solid #eee;display:block;"></canvas>
            </div>
        </div>
    `;

    const dialog = createMobileDialog(title, content);

    function updateGradientPreview() {
        const canvas = dialog.querySelector('#gradientPreviewCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;
        for (let x = 0; x < w; x++) {
            const t = x / (w - 1);
            const parse = hex => [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)];
            const [r1,g1,b1] = parse(gradientColorA);
            const [r2,g2,b2] = parse(gradientColorB);
            const r = Math.round(r1 + (r2-r1)*t);
            const g = Math.round(g1 + (g2-g1)*t);
            const b = Math.round(b1 + (b2-b1)*t);
            ctx.fillStyle = `rgb(${r},${g},${b})`;
            ctx.fillRect(x, 0, 1, h);
        }
    }

    updateGradientPreview();

    dialog.querySelector('#gradientModeToggle').addEventListener('change', (e) => {
        gradientMode = e.target.checked;
        scheduleRender();
    });
    dialog.querySelector('#gradientColorAInput').addEventListener('input', (e) => {
        gradientColorA = e.target.value.toUpperCase();
        updateGradientPreview();
        scheduleRender();
    });
    dialog.querySelector('#gradientColorBInput').addEventListener('input', (e) => {
        gradientColorB = e.target.value.toUpperCase();
        updateGradientPreview();
        scheduleRender();
    });
    dialog.querySelectorAll('.gradient-dir-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            gradientDirection = btn.dataset.dir;
            dialog.querySelectorAll('.gradient-dir-btn').forEach(b => {
                b.style.background = b.dataset.dir === gradientDirection ? '#007AFF' : '#f5f5f7';
                b.style.color = b.dataset.dir === gradientDirection ? 'white' : '#333';
            });
            updateGradientPreview();
            scheduleRender();
        });
    });
}

// ── Feature : Onion skin configurable ────────────────────────────────────────
function showOnionSkinPanel() {
    const lang = localStorage.getItem('lang') || 'en';
    const title = '👁 Onion Skin';
    const labelEnabled = lang === 'fr' ? 'Activer l\'onion skin' : 'Enable onion skin';
    const labelOpacity = lang === 'fr' ? 'Opacité' : 'Opacity';
    const labelPrev = lang === 'fr' ? 'Frames précédentes' : 'Previous frames';
    const labelNext = lang === 'fr' ? 'Frames suivantes' : 'Next frames';

    const content = `
        <div style="display:flex;flex-direction:column;gap:14px;">
            <label style="display:flex;align-items:center;gap:8px;font-size:14px;">
                <input type="checkbox" id="onionSkinToggle" ${onionSkinEnabled ? 'checked' : ''}>
                ${labelEnabled}
            </label>
            <div>
                <div style="font-size:13px;margin-bottom:4px;">${labelOpacity}: <span id="onionOpacityVal">${Math.round(onionSkinOpacity*100)}%</span></div>
                <input type="range" id="onionOpacitySlider" min="5" max="50" step="5" value="${Math.round(onionSkinOpacity*100)}" style="width:100%;">
            </div>
            <div>
                <div style="font-size:13px;margin-bottom:6px;">${labelPrev}: <span id="onionPrevVal">${onionSkinPrevCount}</span></div>
                <div style="display:flex;gap:8px;align-items:center;">
                    <button id="onionPrevMinus" style="width:36px;height:36px;border-radius:8px;border:1px solid #ccc;cursor:pointer;font-size:18px;background:#f5f5f7;">−</button>
                    <span id="onionPrevDisplay" style="font-size:20px;font-weight:bold;width:24px;text-align:center;">${onionSkinPrevCount}</span>
                    <button id="onionPrevPlus" style="width:36px;height:36px;border-radius:8px;border:1px solid #ccc;cursor:pointer;font-size:18px;background:#f5f5f7;">+</button>
                </div>
            </div>
            <div>
                <div style="font-size:13px;margin-bottom:6px;">${labelNext}: <span id="onionNextVal">${onionSkinNextCount}</span></div>
                <div style="display:flex;gap:8px;align-items:center;">
                    <button id="onionNextMinus" style="width:36px;height:36px;border-radius:8px;border:1px solid #ccc;cursor:pointer;font-size:18px;background:#f5f5f7;">−</button>
                    <span id="onionNextDisplay" style="font-size:20px;font-weight:bold;width:24px;text-align:center;">${onionSkinNextCount}</span>
                    <button id="onionNextPlus" style="width:36px;height:36px;border-radius:8px;border:1px solid #ccc;cursor:pointer;font-size:18px;background:#f5f5f7;">+</button>
                </div>
            </div>
        </div>
    `;

    const dialog = createMobileDialog(title, content);

    dialog.querySelector('#onionSkinToggle').addEventListener('change', (e) => {
        onionSkinEnabled = e.target.checked;
        scheduleRender();
    });

    dialog.querySelector('#onionOpacitySlider').addEventListener('input', (e) => {
        onionSkinOpacity = parseInt(e.target.value, 10) / 100;
        dialog.querySelector('#onionOpacityVal').textContent = e.target.value + '%';
        scheduleRender();
    });

    dialog.querySelector('#onionPrevMinus').addEventListener('click', () => {
        onionSkinPrevCount = Math.max(1, onionSkinPrevCount - 1);
        dialog.querySelector('#onionPrevVal').textContent = onionSkinPrevCount;
        dialog.querySelector('#onionPrevDisplay').textContent = onionSkinPrevCount;
        scheduleRender();
    });
    dialog.querySelector('#onionPrevPlus').addEventListener('click', () => {
        onionSkinPrevCount = Math.min(3, onionSkinPrevCount + 1);
        dialog.querySelector('#onionPrevVal').textContent = onionSkinPrevCount;
        dialog.querySelector('#onionPrevDisplay').textContent = onionSkinPrevCount;
        scheduleRender();
    });
    dialog.querySelector('#onionNextMinus').addEventListener('click', () => {
        onionSkinNextCount = Math.max(1, onionSkinNextCount - 1);
        dialog.querySelector('#onionNextVal').textContent = onionSkinNextCount;
        dialog.querySelector('#onionNextDisplay').textContent = onionSkinNextCount;
        scheduleRender();
    });
    dialog.querySelector('#onionNextPlus').addEventListener('click', () => {
        onionSkinNextCount = Math.min(3, onionSkinNextCount + 1);
        dialog.querySelector('#onionNextVal').textContent = onionSkinNextCount;
        dialog.querySelector('#onionNextDisplay').textContent = onionSkinNextCount;
        scheduleRender();
    });
}

// ── Feature : Historique visualisable ────────────────────────────────────────
function drawHistoryThumb(canvas, pixels) {
    const ctx = canvas.getContext('2d');
    const s = canvas.width / currentGridSize;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pixels.forEach((p, i) => {
        if (!p || p.isEmpty) return;
        ctx.fillStyle = p.color;
        ctx.fillRect((i % currentGridSize) * s, Math.floor(i / currentGridSize) * s, s, s);
    });
}

function showHistoryPanel() {
    const lang = localStorage.getItem('lang') || 'en';
    const title = lang === 'fr' ? '🕐 Historique' : '🕐 History';
    const labelCurrent = lang === 'fr' ? 'État actuel' : 'Current state';
    const labelState = lang === 'fr' ? 'État' : 'State';

    const items = history.map((h, i) => {
        const isCurrent = i === historyIndex;
        return `<div class="history-panel-item" data-index="${i}" style="display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:8px;cursor:pointer;margin-bottom:4px;background:${isCurrent ? 'rgba(0,122,255,0.15)' : 'transparent'};border:${isCurrent ? '1px solid rgba(0,122,255,0.3)' : '1px solid transparent'};">
            <canvas width="32" height="32" style="border-radius:4px;border:1px solid #eee;flex-shrink:0;image-rendering:pixelated;"></canvas>
            <span style="font-size:13px;color:${isCurrent ? '#007AFF' : '#333'};font-weight:${isCurrent ? '600' : '400'};">${isCurrent ? labelCurrent : labelState + ' ' + (i + 1)}</span>
        </div>`;
    }).join('');

    const content = `<div style="max-height:340px;overflow-y:auto;padding-right:4px;">${items || '<p style="color:#888;font-size:13px;">Aucun historique disponible.</p>'}</div>`;

    const dialog = createMobileDialog(title, content);

    // Dessiner les thumbnails
    dialog.querySelectorAll('.history-panel-item').forEach((item, i) => {
        const canvas = item.querySelector('canvas');
        if (canvas && history[i]) drawHistoryThumb(canvas, history[i]);
    });

    // Clic pour restaurer un état
    dialog.querySelectorAll('.history-panel-item').forEach(item => {
        item.addEventListener('click', () => {
            const idx = parseInt(item.dataset.index, 10);
            if (!isNaN(idx) && history[idx]) {
                historyIndex = idx;
                currentFrameBuffer = history[idx].map(p => ({...p}));
                scheduleRender();
                updateFramesList();
                dialog.remove();
            }
        });
    });
}

// ── Feature : Texte pixel art ─────────────────────────────────────────────────
function textToPixels(text, color, startX, startY, scale, fontKey = '5x7') {
    const font = BITMAP_FONTS[fontKey] || BITMAP_FONTS['5x7'];
    const charWidth  = font.charWidth;
    const charHeight = font.charHeight;
    const cols       = font.cols;
    const chars      = font.chars;
    const result = [];
    const upperText = text.toUpperCase();
    for (let ci = 0; ci < upperText.length; ci++) {
        const ch = upperText[ci];
        const bitmap = chars[ch];
        if (!bitmap) continue;
        for (let row = 0; row < charHeight; row++) {
            const rowStr = bitmap[row] || '0'.repeat(cols);
            for (let col = 0; col < cols; col++) {
                if (rowStr[col] === '1') {
                    for (let sy = 0; sy < scale; sy++) {
                        for (let sx = 0; sx < scale; sx++) {
                            const gx = startX + ci * charWidth * scale + col * scale + sx;
                            const gy = startY + row * scale + sy;
                            if (gx >= 0 && gx < currentGridSize && gy >= 0 && gy < currentGridSize) {
                                result.push({ index: gy * currentGridSize + gx, color });
                            }
                        }
                    }
                }
            }
        }
    }
    return result;
}

function showTextTool() {
    const fr = localStorage.getItem('lang') === 'fr';
    const title    = fr ? '✏️ Texte Pixel Art' : '✏️ Pixel Art Text';
    const initColor = currentColor.startsWith('#') && currentColor.length === 7 ? currentColor : '#000000';

    // Construire les options du sélecteur de police
    const fontOptions = Object.entries(BITMAP_FONTS).map(([key, f]) =>
        `<option value="${key}"${key === '5x7' ? ' selected' : ''}>${f.label[fr ? 'fr' : 'en']}</option>`
    ).join('');

    const content = `
        <div style="display:flex;flex-direction:column;gap:12px;">
            <div>
                <label style="font-size:13px;display:block;margin-bottom:4px;">${fr ? 'Texte' : 'Text'}</label>
                <input type="text" id="textToolInput" value="HELLO" maxlength="30" style="width:100%;padding:8px;border:1px solid #ddd;border-radius:6px;font-size:14px;box-sizing:border-box;">
            </div>
            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
                <label style="font-size:13px;">${fr ? 'Police' : 'Font'}</label>
                <select id="textToolFont" style="padding:4px 8px;border-radius:6px;border:1px solid #ddd;flex:1;">${fontOptions}</select>
            </div>
            <div style="display:flex;gap:10px;align-items:center;">
                <label style="font-size:13px;">${fr ? 'Couleur' : 'Color'}</label>
                <input type="color" id="textToolColor" value="${initColor}" style="width:40px;height:32px;border:none;cursor:pointer;">
                <label style="font-size:13px;">${fr ? 'Taille (×)' : 'Scale (×)'}</label>
                <select id="textToolScale" style="padding:4px 8px;border-radius:6px;border:1px solid #ddd;">
                    <option value="1">×1</option>
                    <option value="2">×2</option>
                    <option value="3">×3</option>
                    <option value="4">×4</option>
                </select>
            </div>
            <div>
                <div style="font-size:13px;margin-bottom:4px;">${fr ? 'Aperçu' : 'Preview'}</div>
                <canvas id="textPreviewCanvas" width="300" height="80" style="width:100%;height:80px;border:1px solid #eee;border-radius:6px;background:#fff;display:block;image-rendering:pixelated;"></canvas>
            </div>
            <button id="textToolApply" style="padding:10px;background:#007AFF;color:white;border:none;border-radius:8px;font-size:14px;cursor:pointer;">${fr ? 'Appliquer' : 'Apply'}</button>
        </div>
    `;

    const dialog = createMobileDialog(title, content);

    function updateTextPreview() {
        const canvas = dialog.querySelector('#textPreviewCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#f8f8f8';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const text     = dialog.querySelector('#textToolInput').value || '';
        const color    = dialog.querySelector('#textToolColor').value;
        const scale    = parseInt(dialog.querySelector('#textToolScale').value, 10);
        const fontKey  = dialog.querySelector('#textToolFont').value;
        const font     = BITMAP_FONTS[fontKey] || BITMAP_FONTS['5x7'];
        const { charWidth, charHeight, cols, chars } = font;

        // Calculer la taille d'un pixel dans la preview pour que le texte rentre
        const totalTextW = text.length * charWidth * scale;
        const pixSize = totalTextW > 0 ? Math.max(1, Math.min(6, Math.floor(280 / totalTextW))) : 2;

        const upperText = text.toUpperCase();
        for (let ci = 0; ci < upperText.length; ci++) {
            const bitmap = chars[upperText[ci]];
            if (!bitmap) continue;
            for (let row = 0; row < charHeight; row++) {
                const rowStr = bitmap[row] || '0'.repeat(cols);
                for (let col = 0; col < cols; col++) {
                    if (rowStr[col] === '1') {
                        ctx.fillStyle = color;
                        ctx.fillRect(
                            6 + ci * charWidth * scale * pixSize + col * scale * pixSize,
                            8 + row * scale * pixSize,
                            scale * pixSize,
                            scale * pixSize
                        );
                    }
                }
            }
        }
    }

    updateTextPreview();

    dialog.querySelector('#textToolInput').addEventListener('input', updateTextPreview);
    dialog.querySelector('#textToolColor').addEventListener('input', updateTextPreview);
    dialog.querySelector('#textToolScale').addEventListener('change', updateTextPreview);
    dialog.querySelector('#textToolFont').addEventListener('change', updateTextPreview);

    dialog.querySelector('#textToolApply').addEventListener('click', () => {
        const text    = dialog.querySelector('#textToolInput').value || '';
        if (!text.trim()) return;
        const color   = dialog.querySelector('#textToolColor').value.toUpperCase();
        const scale   = parseInt(dialog.querySelector('#textToolScale').value, 10);
        const fontKey = dialog.querySelector('#textToolFont').value;
        const rawPixels = textToPixels(text, color, 0, 0, scale, fontKey);
        const flat = Array.from({ length: currentGridSize * currentGridSize }, () => ({ color: '#FFFFFF', isEmpty: true }));
        rawPixels.forEach(({ index, color: c }) => {
            if (index >= 0 && index < flat.length) flat[index] = { color: c, isEmpty: false };
        });
        dialog.remove();
        enterTextPlacementMode(flat);
    });
}

function clampPan() {
    const grid = document.getElementById('pixelGrid');
    if (!grid) return;
    const size = grid.clientWidth;
    const max = 0;
    const min = -(size * gridZoom - size);
    gridPanX = Math.max(min, Math.min(max, gridPanX));
    gridPanY = Math.max(min, Math.min(max, gridPanY));
}

function zoomAtPoint(factor, clientX, clientY) {
    const grid = document.getElementById('pixelGrid');
    if (!grid) return;
    const rect = grid.getBoundingClientRect();
    // Point dans l'espace de la grille avant le zoom
    const px = (clientX - rect.left - gridPanX) / gridZoom;
    const py = (clientY - rect.top  - gridPanY) / gridZoom;
    gridZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, gridZoom * factor));
    // Réajuster le pan pour que le point reste sous le curseur
    gridPanX = clientX - rect.left - px * gridZoom;
    gridPanY = clientY - rect.top  - py * gridZoom;
    clampPan();
    applyGridTransform();
}

function resetZoom() {
    gridZoom = 1; gridPanX = 0; gridPanY = 0;
    applyGridTransform();
}

function pinchDist(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

function initZoomPan() {
    const grid = document.getElementById('pixelGrid');
    if (!grid) return;

    // --- Molette souris + trackpad pinch (ctrlKey) ---
    grid.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.ctrlKey) {
            // Pinch trackpad / Ctrl+molette → zoom
            zoomAtPoint(1 - e.deltaY * 0.01, e.clientX, e.clientY);
        } else if (e.deltaX !== 0 || (e.deltaMode === 0 && Math.abs(e.deltaY) < 50)) {
            // Trackpad deux doigts / Magic Mouse → pan
            gridPanX -= e.deltaX;
            gridPanY -= e.deltaY;
            clampPan();
            applyGridTransform();
        } else {
            // Molette classique → zoom
            zoomAtPoint(e.deltaY < 0 ? 1.15 : 0.87, e.clientX, e.clientY);
        }
    }, { passive: false });

    // --- Clic droit maintenu = pan ---
    let isPanning = false, panSX = 0, panSY = 0;
    grid.addEventListener('mousedown', (e) => {
        if (e.button === 2) {
            e.preventDefault();
            isPanning = true;
            panSX = e.clientX - gridPanX;
            panSY = e.clientY - gridPanY;
        }
    });
    document.addEventListener('mousemove', (e) => {
        if (!isPanning) return;
        gridPanX = e.clientX - panSX;
        gridPanY = e.clientY - panSY;
        clampPan();
        applyGridTransform();
    });
    document.addEventListener('mouseup', (e) => {
        if (e.button === 2) isPanning = false;
    });

    // Bloquer le menu contextuel sur la grille
    grid.addEventListener('contextmenu', e => e.preventDefault());

    // --- Double-clic gauche = reset zoom ---
    grid.addEventListener('dblclick', (e) => {
        if (e.button === 0 && gridZoom > 1) {
            resetZoom();
            e.stopPropagation();
        }
    });
}

// ========================================
// CHANGEMENT DE TAILLE DE GRILLE
// ========================================

/**
 * Change la taille de la grille. Reconstruit le DOM, recrée les frames.
 * @param {number} newSize - Nouvelle taille (8, 16, 32 ou 64)
 * @param {Object} options
 *   skipConfirm {boolean} - Ne pas demander confirmation (ex: import image)
 *   newFrames {Array}     - Frames à charger directement (ex: chargement projet)
 */
function changeGridSize(newSize, options = {}) {
    const { newFrames = null } = options;

    if (!VALID_GRID_SIZES.includes(newSize)) return false;
    if (newSize === currentGridSize && !newFrames) return true;

    // Stopper l'animation si en cours
    if (isAnimationPlaying) stopAnimation();

    // Vider l'historique (invalide pour la nouvelle taille)
    history = [];
    historyIndex = -1;
    copiedFrame = null;

    // Mettre à jour la taille courante
    currentGridSize = newSize;

    // Réinitialiser ou appliquer les frames fournies
    if (newFrames) {
        frames = newFrames;
        currentFrame = Math.min(currentFrame, frames.length - 1);
    } else {
        frames = [createEmptyFrame()];
        currentFrame = 0;
    }

    // Reconstruire la grille DOM
    initGrid(newSize);

    // Auto-zoom pour les grandes grilles : chaque cellule doit faire ≥ 4px d'écran
    // sinon un simple clic colorie plusieurs cellules à la fois
    const grid = document.getElementById('pixelGrid');
    if (grid) {
        const canvasSize = grid.clientWidth || 600; // sans bordure → cohérent avec canvas
        const cellSize = canvasSize / newSize;
        const minCellPx = 4;
        if (cellSize < minCellPx) {
            gridZoom = Math.min(MAX_ZOOM, Math.ceil(minCellPx / cellSize));
            // Centrer le zoom
            gridPanX = -(canvasSize * gridZoom - canvasSize) / 2;
            gridPanY = -(canvasSize * gridZoom - canvasSize) / 2;
            clampPan();
            applyGridTransform();
        }
    }

    // Mettre à jour l'interface
    updateFramesList();
    loadFrame(currentFrame);
    updateGridSizeIndicator(newSize);
    updateGridSizeBtnStates(newSize);

    return true;
}

function updateGridSizeIndicator(size) {
    document.querySelectorAll('.grid-size-indicator').forEach(el => {
        el.textContent = `${size}×${size}`;
    });
}

function updateGridSizeBtnStates(size) {
    document.querySelectorAll('.grid-size-btn').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.size) === size);
    });
}

function showGridSizeModal() {
    const modal = document.getElementById('gridSizeModal');
    if (modal) {
        updateGridSizeBtnStates(currentGridSize);
        modal.style.display = 'flex';
    }
}

function initGridSizeModal() {
    const modal = document.getElementById('gridSizeModal');
    if (!modal) return;

    document.getElementById('closeGridSizeModal')?.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    modal.querySelectorAll('.grid-size-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const newSize = parseInt(btn.dataset.size, 10);
            if (newSize === currentGridSize) {
                modal.style.display = 'none';
                return;
            }
            const hasContent = frames.some(f => f && f.some(p => p && !p.isEmpty));
            if (hasContent) {
                modal.style.display = 'none';
                const confirmed = await showConfirmDialog(
                    tL('changeGrid', currentGridSize, newSize),
                    { confirmLabel: tL('confirmBtn') || 'Confirmer', cancelLabel: tL('cancelBtn') || 'Annuler', danger: true }
                );
                if (!confirmed) {
                    modal.style.display = 'flex';
                    return;
                }
            }
            const success = changeGridSize(newSize, { skipConfirm: true });
            if (success) {
                modal.style.display = 'none';
            }
        });
    });
}

function showConfirmDialog(message, { confirmLabel = 'Confirmer', cancelLabel = 'Annuler', danger = false } = {}) {
    return new Promise(resolve => {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position:fixed;inset:0;background:rgba(0,0,0,0.6);
            display:flex;align-items:center;justify-content:center;z-index:99999;
        `;

        const panel = document.createElement('div');
        panel.style.cssText = `
            background:var(--bg-panel,#1e1e2e);color:var(--text-primary,#fff);
            border-radius:16px;padding:28px 24px;max-width:360px;width:90%;
            box-shadow:0 20px 50px rgba(0,0,0,0.5);text-align:center;
        `;

        const pMsg = document.createElement('p');
        pMsg.style.cssText = 'margin:0 0 24px;font-size:0.95rem;line-height:1.5;white-space:pre-line';
        pMsg.textContent = message;

        const btnRow = document.createElement('div');
        btnRow.style.cssText = 'display:flex;gap:12px;justify-content:center;';

        const cancelBtn = document.createElement('button');
        cancelBtn.style.cssText = `
            padding:10px 20px;border-radius:10px;border:1px solid rgba(255,255,255,0.2);
            background:transparent;color:var(--text-primary,#fff);cursor:pointer;font-size:0.9rem;
        `;
        cancelBtn.textContent = cancelLabel;

        const confirmBtn = document.createElement('button');
        confirmBtn.style.cssText = `
            padding:10px 20px;border-radius:10px;border:none;cursor:pointer;font-size:0.9rem;font-weight:600;
            background:${danger ? '#e74c3c' : 'var(--color-primary,#FF7300)'};color:#fff;
        `;
        confirmBtn.textContent = confirmLabel;

        btnRow.append(cancelBtn, confirmBtn);
        panel.append(pMsg, btnRow);
        overlay.append(panel);
        document.body.appendChild(overlay);

        confirmBtn.addEventListener('click', () => { overlay.remove(); resolve(true); });
        cancelBtn.addEventListener('click', () => { overlay.remove(); resolve(false); });
        overlay.addEventListener('click', e => { if (e.target === overlay) { overlay.remove(); resolve(false); } });
    });
}

// Fonctions de dessin
function startDrawing(e) {
    // Mode tampon : incruster le sprite
    if (isStampMode) {
        applyStamp(stampHoverCol, stampHoverRow);
        return;
    }
    // Mode ciseau : démarrer la sélection de découpe
    if (isCropStampMode) {
        const { col, row } = _cropGetColRow(e.clientX, e.clientY);
        cropSelection = { startCol: col, startRow: row, endCol: col, endRow: row };
        cropRect = null;
        isDrawing = true;
        scheduleRender();
        return;
    }
    // Mode sprite sheet : placer le sheet et créer les frames
    if (isSpriteSheetMode) {
        applySpriteSheet(ssHoverCol, ssHoverRow);
        return;
    }
    // Mode placement texte : poser le texte à la position du curseur
    if (isTextPlacementMode) {
        applyTextPlacement(textHoverCol, textHoverRow);
        return;
    }

    if (CANVAS_RENDERING) {
        const index = getPixelIndexFromPoint(e.clientX, e.clientY);
        if (isEyedropperMode) {
            if (index >= 0) pickColorFromIndex(index);
            return;
        }
        if (isSelectionMode) {
            if (index < 0) return;
            const col = index % currentGridSize;
            const row = Math.floor(index / currentGridSize);
            isDrawing = true;
            if (selectionRect && col >= selectionRect.minCol && col <= selectionRect.maxCol
                && row >= selectionRect.minRow && row <= selectionRect.maxRow) {
                // Start moving the selection
                isMovingSelection = true;
                selectionMoveStart = { col, row };
                actionStartState = currentFrameBuffer.map(p => p ? {...p} : {color:'#FFFFFF',isEmpty:true});
                currentActionPixels = new Set();
                selectionCut = [];
                for (let r = selectionRect.minRow; r <= selectionRect.maxRow; r++) {
                    for (let c = selectionRect.minCol; c <= selectionRect.maxCol; c++) {
                        const idx = r * currentGridSize + c;
                        selectionCut.push({ offset: { dr: r - selectionRect.minRow, dc: c - selectionRect.minCol }, pixel: {...currentFrameBuffer[idx]} });
                        currentFrameBuffer[idx] = { color: '#FFFFFF', isEmpty: true };
                        currentActionPixels.add(idx);
                    }
                }
                scheduleRender();
            } else {
                if (isMovingSelection) commitSelectionMove();
                selection = { startCol: col, startRow: row, endCol: col, endRow: row };
                selectionRect = null;
                isMovingSelection = false;
                selectionCut = null;
                scheduleRender();
            }
            return;
        }
        if (index < 0) return;
        if (isFillMode) {
            actionStartState = currentFrameBuffer.map(p => p ? { ...p } : { color: '#FFFFFF', isEmpty: true });
            currentActionPixels.clear();
            floodFill(index);
            saveCurrentFrame();
            if (currentActionPixels.size > 0) {
                saveActionToHistory(actionStartState, currentActionPixels);
                updateAllThumbnails();
            }
            currentActionPixels.clear();
            actionStartState = null;
            return;
        }
        actionStartState = currentFrameBuffer.map(p => p ? { ...p } : { color: '#FFFFFF', isEmpty: true });
        currentActionPixels.clear();
        isDrawing = true;
        _drawAtIndex(index);
        return;
    }

    // Mode pipette : récupérer la couleur du pixel cliqué
    if (isEyedropperMode && e.target.classList.contains('pixel')) {
        pickColorFromPixel(e.target);
        return; // Ne pas dessiner en mode pipette
    }

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

    // Mode ciseau : mettre à jour la sélection de découpe
    if (isCropStampMode && cropSelection) {
        const { col, row } = _cropGetColRow(e.clientX, e.clientY);
        cropSelection.endCol = col;
        cropSelection.endRow = row;
        scheduleRender();
        return;
    }

    if (CANVAS_RENDERING) {
        const index = getPixelIndexFromPoint(e.clientX, e.clientY);
        if (index < 0) return;
        if (isEyedropperMode) {
            pickColorFromIndex(index);
            return;
        }
        if (isSelectionMode) {
            const col = index % currentGridSize;
            const row = Math.floor(index / currentGridSize);
            if (isMovingSelection && selectionCut && selectionRect) {
                const dc = col - selectionMoveStart.col;
                const dr = row - selectionMoveStart.row;
                const newMinCol = selectionRect.minCol + dc;
                const newMinRow = selectionRect.minRow + dr;
                const newMaxCol = selectionRect.maxCol + dc;
                const newMaxRow = selectionRect.maxRow + dr;
                // Reset buffer to state at move start
                currentFrameBuffer = (actionStartState || currentFrameBuffer).map(p => p ? {...p} : {color:'#FFFFFF',isEmpty:true});
                // Clear original selection area
                for (let r = selectionRect.minRow; r <= selectionRect.maxRow; r++) {
                    for (let c = selectionRect.minCol; c <= selectionRect.maxCol; c++) {
                        const idx = r * currentGridSize + c;
                        currentFrameBuffer[idx] = { color: '#FFFFFF', isEmpty: true };
                        currentActionPixels.add(idx);
                    }
                }
                // Paint at new position
                selectionCut.forEach(({ offset, pixel }) => {
                    const newR = newMinRow + offset.dr;
                    const newC = newMinCol + offset.dc;
                    if (newR >= 0 && newR < currentGridSize && newC >= 0 && newC < currentGridSize) {
                        const idx = newR * currentGridSize + newC;
                        currentFrameBuffer[idx] = { ...pixel };
                        currentActionPixels.add(idx);
                    }
                });
                selectionRect = { minCol: newMinCol, minRow: newMinRow, maxCol: newMaxCol, maxRow: newMaxRow };
                selectionMoveStart = { col, row };
                scheduleRender();
            } else if (selection) {
                selection.endCol = col;
                selection.endRow = row;
                scheduleRender();
            }
            return;
        }
        _drawAtIndex(index);
        return;
    }

    // Vérification stricte : le pixel doit être dans la grille ET être un élément pixel valide
    const pixelGrid = document.getElementById('pixelGrid');
    if (e.target.classList.contains('pixel') &&
        pixelGrid &&
        pixelGrid.contains(e.target) &&
        !e.target.classList.contains('previous-pixel-marker') &&
        !e.target.classList.contains('next-pixel-marker-1') &&
        !e.target.classList.contains('next-pixel-marker-2')) {

        // Mode pipette : récupérer la couleur du pixel cliqué
        if (isEyedropperMode) {
            pickColorFromPixel(e.target);
            return; // Ne pas dessiner en mode pipette
        }

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
    isDrawing = false;

    // Mode ciseau : finaliser la sélection et ouvrir la dialog de confirmation
    if (isCropStampMode && cropSelection) {
        cropRect = normalizeSelectionRect(cropSelection);
        cropSelection = null;
        scheduleRender();
        const r = cropRect;
        cropRect = null;
        scheduleRender();
        _cropExtractAndConfirm(r);
        return;
    }

    // Phase 2 : gestion sélection
    if (CANVAS_RENDERING && isSelectionMode) {
        if (!isMovingSelection && selection) {
            selectionRect = normalizeSelectionRect(selection);
            selection = null;
            scheduleRender();
        } else if (isMovingSelection) {
            saveCurrentFrame();
        }
        return;
    }

    // Phase 2 : synchroniser frames[] depuis le buffer (fait une seule fois à la fin du trait)
    if (CANVAS_RENDERING) saveCurrentFrame();

    // Sauvegarder l'action complète dans l'historique si des pixels ont été modifiés
    if (currentActionPixels.size > 0 && actionStartState) {
        saveActionToHistory(actionStartState, currentActionPixels);
        // Mettre à jour la miniature de la frame actuelle après avoir terminé de dessiner
        updateAllThumbnails();
    }
    
    // Réinitialiser pour la prochaine action
    currentActionPixels.clear();
    actionStartState = null;
    renderCanvas(); // Phase 1 : mettre à jour le canvas après chaque coup de pinceau
}

// Gestion des couleurs
function toggleEraser() {
    setEraserState(!isErasing);
}

function setEraserState(active) {
    isErasing = active;
    // Désactiver pipette et fill si on active la gomme
    if (active) {
        setEyedropperState(false);
        setFillState(false);
        setSymmetryVState(false);
        setSelectionState(false);
        if (isStampMode) exitStampMode(true);
    }
    const pixelGrid = document.getElementById('pixelGrid');
    if (pixelGrid) {
        pixelGrid.classList.toggle('eraser-mode', active);
    }
    document.querySelectorAll('#eraserBtn').forEach(btn => {
        btn.classList.toggle('active', active);
    });
}

// Gestion de la pipette
function toggleEyedropper() {
    setEyedropperState(!isEyedropperMode);
}

function setEyedropperState(active) {
    isEyedropperMode = active;
    // Désactiver gomme et fill si on active la pipette
    if (active) {
        setEraserState(false);
        setFillState(false);
        setSymmetryVState(false);
        setSelectionState(false);
    }
    const pixelGrid = document.getElementById('pixelGrid');
    if (pixelGrid) {
        pixelGrid.classList.toggle('eyedropper-mode', active);
    }
    document.querySelectorAll('#eyedropperBtn').forEach(btn => {
        btn.classList.toggle('active', active);
    });
    document.querySelectorAll('.eyedropper-btn').forEach(btn => {
        btn.classList.toggle('active', active);
    });
}

// ── Outil Fill (pot de peinture / flood fill) ───────────────────────────────
function toggleFill() {
    setFillState(!isFillMode);
}

function setFillState(active) {
    isFillMode = active;
    if (active) {
        setEraserState(false);
        setEyedropperState(false);
        setSymmetryVState(false);
        setSelectionState(false);
        if (isStampMode) exitStampMode(true);
    }
    document.querySelectorAll('#fillBtn').forEach(btn => {
        btn.classList.toggle('active', active);
    });
}

function floodFill(startIndex) {
    const total = currentGridSize * currentGridSize;
    const src = currentFrameBuffer[startIndex];
    const srcColor = src ? src.color : '#FFFFFF';
    const srcEmpty = src ? src.isEmpty : true;

    // En mode dégradé, on ne vérifie pas si la couleur cible == currentColor
    // (la couleur varie par pixel donc la comparaison n'a pas de sens)
    if (!gradientMode) {
        if (!isErasing && !srcEmpty && srcColor === currentColor) return;
    }
    if (isErasing && srcEmpty) return;

    // Collecter d'abord tous les pixels à remplir (BFS)
    const visited = new Uint8Array(total);
    const toFill = [];
    const queue = [startIndex];
    visited[startIndex] = 1;

    while (queue.length > 0) {
        const idx = queue.shift();
        toFill.push(idx);
        const col = idx % currentGridSize;
        const row = Math.floor(idx / currentGridSize);
        const neighbors = [
            row > 0                     ? idx - currentGridSize : -1,
            row < currentGridSize - 1   ? idx + currentGridSize : -1,
            col > 0                     ? idx - 1               : -1,
            col < currentGridSize - 1   ? idx + 1               : -1
        ];
        for (const n of neighbors) {
            if (n < 0 || visited[n]) continue;
            const np = currentFrameBuffer[n];
            const nColor = np ? np.color : '#FFFFFF';
            const nEmpty = np ? np.isEmpty : true;
            if (nColor === srcColor && nEmpty === srcEmpty) {
                visited[n] = 1;
                queue.push(n);
            }
        }
    }

    // Appliquer les couleurs
    if (gradientMode) {
        // Calculer le bounding box de la zone remplie pour normaliser le dégradé
        let minCol = currentGridSize, maxCol = 0, minRow = currentGridSize, maxRow = 0;
        for (const idx of toFill) {
            const col = idx % currentGridSize;
            const row = Math.floor(idx / currentGridSize);
            if (col < minCol) minCol = col;
            if (col > maxCol) maxCol = col;
            if (row < minRow) minRow = row;
            if (row > maxRow) maxRow = row;
        }
        const colRange = maxCol - minCol || 1;
        const rowRange = maxRow - minRow || 1;

        for (const idx of toFill) {
            currentActionPixels.add(idx);
            const col = idx % currentGridSize;
            const row = Math.floor(idx / currentGridSize);
            let t;
            if (gradientDirection === 'horizontal')  t = (col - minCol) / colRange;
            else if (gradientDirection === 'vertical') t = (row - minRow) / rowRange;
            else t = ((col - minCol) + (row - minRow)) / (colRange + rowRange);
            t = Math.max(0, Math.min(1, t));
            currentFrameBuffer[idx] = { color: _lerpColor(gradientColorA, gradientColorB, t), isEmpty: false };
        }
    } else {
        for (const idx of toFill) {
            currentActionPixels.add(idx);
            if (isErasing) {
                currentFrameBuffer[idx] = { color: '#FFFFFF', isEmpty: true };
            } else {
                currentFrameBuffer[idx] = { color: currentColor, isEmpty: false };
            }
        }
    }

    renderCanvas();
}

function _lerpColor(hexA, hexB, t) {
    const parse = h => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
    const [r1,g1,b1] = parse(hexA);
    const [r2,g2,b2] = parse(hexB);
    const r = Math.round(r1 + (r2-r1)*t);
    const g = Math.round(g1 + (g2-g1)*t);
    const b = Math.round(b1 + (b2-b1)*t);
    return '#' + [r,g,b].map(v => v.toString(16).padStart(2,'0')).join('').toUpperCase();
}

// ── Symétrie horizontale ────────────────────────────────────────────────────
function toggleSymmetry() {
    isSymmetryMode = !isSymmetryMode;
    document.querySelectorAll('#symmetryBtn').forEach(btn => {
        btn.classList.toggle('active', isSymmetryMode);
    });
}

// ── Symétrie verticale (haut/bas) ────────────────────────────────────────────
function toggleSymmetryV() {
    setSymmetryVState(!isSymmetryV);
}

function setSymmetryVState(active) {
    isSymmetryV = active;
    document.querySelectorAll('#symmetryVBtn').forEach(btn => {
        btn.classList.toggle('active', active);
    });
}

// ── Sélection rectangulaire ───────────────────────────────────────────────────
// ── Outil Découper en tampon ──────────────────────────────────────────────────
function toggleCropStamp() { setCropStampState(!isCropStampMode); }

function setCropStampState(active) {
    isCropStampMode = active;
    cropSelection = null;
    cropRect = null;
    document.querySelectorAll('#cropStampBtn').forEach(b => b.classList.toggle('active', active));
    if (active) {
        setSelectionState(false);
        setEraserState(false);
        setEyedropperState(false);
        setFillState(false);
    }
    scheduleRender();
}

function _cropGetColRow(clientX, clientY) {
    const grid = document.getElementById('pixelGrid');
    if (!grid) return { col: 0, row: 0 };
    const rect = grid.getBoundingClientRect();
    const cssCell = cellSize / canvasCssScale;
    const col = Math.max(0, Math.min(currentGridSize - 1,
        Math.floor((clientX - rect.left - gridPanX) / gridZoom / cssCell)));
    const row = Math.max(0, Math.min(currentGridSize - 1,
        Math.floor((clientY - rect.top - gridPanY) / gridZoom / cssCell)));
    return { col, row };
}

function _cropExtractAndConfirm(rect) {
    const w = rect.maxCol - rect.minCol + 1;
    const h = rect.maxRow - rect.minRow + 1;
    if (w < 1 || h < 1) return;

    // Extraire les pixels de la zone sélectionnée dans un tableau w×h
    const pixels = [];
    for (let r = rect.minRow; r <= rect.maxRow; r++) {
        for (let c = rect.minCol; c <= rect.maxCol; c++) {
            const src = currentFrameBuffer[r * currentGridSize + c];
            if (src && !src.isEmpty) {
                pixels.push({ color: src.color, isEmpty: false });
            } else {
                pixels.push({ color: '#FFFFFF', isEmpty: true });
            }
        }
    }

    const hasContent = pixels.some(p => !p.isEmpty);
    if (!hasContent) {
        showToast('La zone sélectionnée est vide', { type: 'warning' });
        return;
    }

    // Aperçu dans un canvas 80×80
    const previewSize = 80;
    const ps = Math.max(1, Math.floor(previewSize / Math.max(w, h)));

    const dialog = createMobileDialog('Découper en tampon', `
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;">
            <canvas id="cropPreviewCanvas" width="${w * ps}" height="${h * ps}"
                style="image-rendering:pixelated;border:1px solid rgba(255,255,255,0.2);border-radius:6px;background:#1a1a2e;"></canvas>
            <div style="color:rgba(255,255,255,0.7);font-size:0.85rem;">
                <div><strong>${w} × ${h}</strong> pixels</div>
            </div>
        </div>
        <label style="font-size:0.85rem;color:rgba(255,255,255,0.7);display:block;margin-bottom:6px;">Nom du tampon</label>
        <input id="cropStampName" type="text" value="Découpe ${w}×${h}"
            style="width:100%;padding:8px 10px;border-radius:8px;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.08);color:white;font-size:0.9rem;box-sizing:border-box;margin-bottom:16px;">
        <div style="display:flex;gap:8px;">
            <button id="cropConfirmBtn" class="dialog-button">Ajouter comme tampon</button>
            <button id="cropCancelBtn" class="dialog-button secondary">Annuler</button>
        </div>
    `);

    // Dessiner l'aperçu
    const previewCanvas = dialog.querySelector('#cropPreviewCanvas');
    const ctx = previewCanvas.getContext('2d');
    for (let i = 0; i < pixels.length; i++) {
        if (pixels[i].isEmpty) continue;
        const c = i % w;
        const r = Math.floor(i / w);
        ctx.fillStyle = pixels[i].color;
        ctx.fillRect(c * ps, r * ps, ps, ps);
    }

    dialog.querySelector('#cropConfirmBtn').addEventListener('click', () => {
        const name = dialog.querySelector('#cropStampName').value.trim() || `Découpe ${w}×${h}`;
        const stamp = _addStamp(pixels, name, w);
        dialog.remove();
        setCropStampState(false);
        activeStampId = stamp.id;
        enterStampMode(stamp.pixels, stamp.gridSize);
    });

    dialog.querySelector('#cropCancelBtn').addEventListener('click', () => {
        dialog.remove();
        setCropStampState(false);
    });
}

function toggleSelection() { setSelectionState(!isSelectionMode); }

function setSelectionState(active) {
    if (!active && isMovingSelection) commitSelectionMove();
    isSelectionMode = active;
    if (!active) { selection = null; selectionRect = null; selectionCut = null; isMovingSelection = false; }
    document.querySelectorAll('#selectionBtn').forEach(b => b.classList.toggle('active', active));
    if (active) { setEraserState(false); setEyedropperState(false); setFillState(false); }
}

function commitSelectionMove() {
    if (!selectionCut || !selectionRect) return;
    saveCurrentFrame();
    if (currentActionPixels.size > 0 && actionStartState) {
        saveActionToHistory(actionStartState, currentActionPixels);
        updateAllThumbnails();
    }
    selectionCut = null;
    isMovingSelection = false;
    actionStartState = null;
    currentActionPixels.clear();
}

// ── Grille de référence ───────────────────────────────────────────────────────
function loadReferenceImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);
        img.onload = () => {
            URL.revokeObjectURL(objectUrl);
            referenceImage = img;
            referenceX = 0; referenceY = 0; referenceScale = 1;
            scheduleRender();
            const controls = document.getElementById('referenceControls');
            if (controls) controls.style.display = 'flex';
            const mobilePanel = document.getElementById('mobileReferencePanel');
            if (mobilePanel) mobilePanel.style.display = 'flex';
        };
        img.onerror = () => URL.revokeObjectURL(objectUrl);
        img.src = objectUrl;
    };
    input.click();
}

function clearReferenceImage() {
    referenceImage = null;
    referenceMoveMode = false;
    scheduleRender();
    const controls = document.getElementById('referenceControls');
    if (controls) controls.style.display = 'none';
    const mobilePanel = document.getElementById('mobileReferencePanel');
    if (mobilePanel) mobilePanel.style.display = 'none';
    _updateRefMoveModeUI();
}

function resetReferencePosition() {
    referenceX = 0; referenceY = 0; referenceScale = 1;
    scheduleRender();
}

function toggleReferenceMoveMode() {
    referenceMoveMode = !referenceMoveMode;
    _updateRefMoveModeUI();
}

function _updateRefMoveModeUI() {
    document.querySelectorAll('.ref-move-btn').forEach(btn => {
        btn.classList.toggle('active', referenceMoveMode);
    });
    const grid = document.getElementById('pixelGrid');
    if (grid) grid.style.cursor = referenceMoveMode ? 'grab' : '';
}

// ── Gestion touch/mouse pour déplacer la référence ───────────────────────────
function _initReferenceMovHandlers() {
    const grid = document.getElementById('pixelGrid');
    if (!grid) return;

    // Mouse drag
    grid.addEventListener('mousedown', (e) => {
        if (!referenceMoveMode || !referenceImage) return;
        e.preventDefault();
        e.stopPropagation();
        _refDragStart = { x: e.clientX, y: e.clientY, refX: referenceX, refY: referenceY };
    }, true);

    document.addEventListener('mousemove', (e) => {
        if (!_refDragStart || !referenceMoveMode) return;
        const dx = (e.clientX - _refDragStart.x) / gridZoom;
        const dy = (e.clientY - _refDragStart.y) / gridZoom;
        referenceX = _refDragStart.refX + dx;
        referenceY = _refDragStart.refY + dy;
        scheduleRender();
    });

    document.addEventListener('mouseup', () => { _refDragStart = null; });

    // Wheel / trackpad pinch → zoom reference image around cursor
    grid.addEventListener('wheel', (e) => {
        if (!referenceMoveMode || !referenceImage) return;
        e.preventDefault();
        e.stopPropagation();

        const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
        const prevScale = referenceScale;
        referenceScale = Math.max(0.05, Math.min(20, referenceScale * factor));

        // Zoom centré sur la position du curseur dans le canvas
        const rect = grid.getBoundingClientRect();
        const mouseXCanvas = (e.clientX - rect.left) / gridZoom;
        const mouseYCanvas = (e.clientY - rect.top) / gridZoom;

        const gridPx = currentGridSize * (pixelCanvas.width / currentGridSize);
        const imgAspect = referenceImage.width / referenceImage.height;
        let baseW, baseH;
        if (imgAspect >= 1) { baseW = gridPx; baseH = gridPx / imgAspect; }
        else                { baseH = gridPx; baseW = gridPx * imgAspect; }
        const originX = (gridPx - baseW) / 2 + referenceX + (baseW - baseW * prevScale) / 2;
        const originY = (gridPx - baseH) / 2 + referenceY + (baseH - baseH * prevScale) / 2;

        // Maintenir le point sous le curseur fixe
        referenceX += (mouseXCanvas - originX) * (1 - factor);
        referenceY += (mouseYCanvas - originY) * (1 - factor);

        scheduleRender();
    }, { passive: false });

    // Touch drag + pinch
    grid.addEventListener('touchstart', (e) => {
        if (!referenceMoveMode || !referenceImage) return;
        e.preventDefault();
        e.stopPropagation();
        if (e.touches.length === 1) {
            _refDragStart = { x: e.touches[0].clientX, y: e.touches[0].clientY, refX: referenceX, refY: referenceY };
            _refPinchDist = null;
        } else if (e.touches.length === 2) {
            const dx = e.touches[1].clientX - e.touches[0].clientX;
            const dy = e.touches[1].clientY - e.touches[0].clientY;
            _refPinchDist = Math.hypot(dx, dy);
            _refDragStart = { x: (e.touches[0].clientX + e.touches[1].clientX) / 2, y: (e.touches[0].clientY + e.touches[1].clientY) / 2, refX: referenceX, refY: referenceY, scale: referenceScale };
        }
    }, { passive: false, capture: true });

    grid.addEventListener('touchmove', (e) => {
        if (!referenceMoveMode || !referenceImage || !_refDragStart) return;
        e.preventDefault();
        e.stopPropagation();
        if (e.touches.length === 1 && _refPinchDist === null) {
            const dx = (e.touches[0].clientX - _refDragStart.x) / gridZoom;
            const dy = (e.touches[0].clientY - _refDragStart.y) / gridZoom;
            referenceX = _refDragStart.refX + dx;
            referenceY = _refDragStart.refY + dy;
        } else if (e.touches.length === 2 && _refPinchDist !== null) {
            const dx = e.touches[1].clientX - e.touches[0].clientX;
            const dy = e.touches[1].clientY - e.touches[0].clientY;
            const newDist = Math.hypot(dx, dy);
            referenceScale = Math.max(0.1, Math.min(10, _refDragStart.scale * newDist / _refPinchDist));
            // Pan with 2-finger centroid
            const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
            const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
            referenceX = _refDragStart.refX + (cx - _refDragStart.x) / gridZoom;
            referenceY = _refDragStart.refY + (cy - _refDragStart.y) / gridZoom;
        }
        scheduleRender();
    }, { passive: false, capture: true });

    grid.addEventListener('touchend', () => { _refDragStart = null; _refPinchDist = null; }, { capture: true });
}

// ── Export PNG frame par frame ────────────────────────────────────────────────
function exportFramesAsPng() {
    saveCurrentFrame();
    const size = currentGridSize;
    const scale = Math.max(1, Math.floor(512 / size));
    const canvasSize = size * scale;

    const offscreen = document.createElement('canvas');
    offscreen.width = canvasSize;
    offscreen.height = canvasSize;
    const ctx = offscreen.getContext('2d');

    const projectName = document.getElementById('projectNameInput')?.value || 'pixel-art';
    const total = frames.length;

    showToast(`⬇️ Téléchargement de ${total} frame${total > 1 ? 's' : ''} PNG…`, { type: 'info', duration: total * 300 + 1500 });

    frames.forEach((frame, i) => {
        setTimeout(() => {
            ctx.clearRect(0, 0, canvasSize, canvasSize);
            frame.forEach((pixel, idx) => {
                if (!pixel || pixel.isEmpty) return;
                const col = idx % size;
                const row = Math.floor(idx / size);
                ctx.fillStyle = pixel.color;
                ctx.fillRect(col * scale, row * scale, scale, scale);
            });
            const dataUrl = offscreen.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = `${projectName}_frame${String(i + 1).padStart(3, '0')}.png`;
            a.click();

            if (i === total - 1) {
                showToast(`✅ ${total} frame${total > 1 ? 's' : ''} PNG téléchargée${total > 1 ? 's' : ''} !`, { type: 'success' });
            }
        }, i * 300);
    });
}

// Récupérer la couleur d'un pixel et l'ajouter à la palette si nécessaire
function pickColorFromPixel(pixelElement) {
    if (!pixelElement) return;
    
    // Vérifier si le pixel est vide (classe 'empty')
    if (pixelElement.classList.contains('empty')) {
        // Pixel vide = blanc
        currentColor = '#FFFFFF';
        updateCurrentColorDisplay();
        setEraserState(false);
        showEyedropperNotification('Couleur de base : #FFFFFF (pixel vide)');
        return;
    }
    
    // Récupérer la couleur du pixel
    const bgColor = pixelElement.style.backgroundColor;
    if (!bgColor || bgColor === 'transparent' || bgColor === 'rgba(0, 0, 0, 0)') {
        // Pixel transparent = blanc par défaut
        currentColor = '#FFFFFF';
        updateCurrentColorDisplay();
        setEraserState(false);
        showEyedropperNotification('Couleur de base : #FFFFFF (pixel vide)');
        return;
    }
    
    // Convertir en hexadécimal
    const hexColor = rgbToHex(bgColor);
    if (!hexColor) {
        // Si la conversion échoue, utiliser blanc par défaut
        currentColor = '#FFFFFF';
        updateCurrentColorDisplay();
        setEraserState(false);
        return;
    }
    
    // Normaliser la couleur
    const normalizedColor = normalizeColor(hexColor);
    
    // Définir comme couleur actuelle
    currentColor = normalizedColor;
    updateCurrentColorDisplay();
    
    // Désactiver la gomme
    setEraserState(false);
    
    // Vérifier si c'est une couleur de base
    const defaultColors = ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
    const isDefaultColor = defaultColors.includes(normalizedColor);
    
    // Si ce n'est pas une couleur de base et qu'elle n'est pas déjà dans customColors, l'ajouter
    if (!isDefaultColor && !customColors.includes(normalizedColor)) {
        // Ajouter en début de liste (plus récent en premier)
        customColors.unshift(normalizedColor);
        
        // Limiter le nombre de couleurs personnalisées
        if (customColors.length > maxCustomColors) {
            customColors = customColors.slice(0, maxCustomColors);
        }
        
        // Sauvegarder
        saveCustomColors();
        
        // Mettre à jour l'affichage
        updateColorPalette();
        
        // Afficher une notification discrète
        showEyedropperNotification(`Couleur ${normalizedColor} ajoutée à la palette`);
    } else if (isDefaultColor) {
        showEyedropperNotification(`Couleur de base : ${normalizedColor}`);
    } else {
        showEyedropperNotification(`Couleur sélectionnée : ${normalizedColor}`);
    }
    
    // Désactiver le mode pipette après utilisation (optionnel, on peut laisser actif)
    // setEyedropperState(false);
}

// Afficher une notification discrète pour la pipette
function showEyedropperNotification(message) {
    // Supprimer la notification précédente si elle existe
    const existingNotification = document.querySelector('.eyedropper-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = 'eyedropper-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 122, 255, 0.95);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 0.9rem;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        pointer-events: none;
        animation: fadeInOut 2s ease-in-out;
    `;
    
    document.body.appendChild(notification);
    
    // Supprimer après 2 secondes
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'fadeOut 0.3s ease-in-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 2000);
}

// ========================================
// OUTIL TAMPON (STAMP)
// ========================================

function getStampOverlay() {
    let overlay = document.getElementById('stampOverlay');
    if (!overlay) {
        overlay = document.createElement('canvas');
        overlay.id = 'stampOverlay';
        overlay.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:5;display:none;';
        const grid = document.getElementById('pixelGrid');
        if (grid) grid.appendChild(overlay);
    }
    return overlay;
}

function enterStampMode(pixels, gridSize) {
    isStampMode = true;
    stampPixels = pixels;
    stampGridSize = gridSize;

    // Calculer le centre visuel (bounding box des pixels non-vides)
    let minC = Infinity, maxC = -Infinity, minR = Infinity, maxR = -Infinity;
    for (let i = 0; i < pixels.length; i++) {
        if (pixels[i] && !pixels[i].isEmpty) {
            const sc = i % gridSize;
            const sr = Math.floor(i / gridSize);
            if (sc < minC) minC = sc; if (sc > maxC) maxC = sc;
            if (sr < minR) minR = sr; if (sr > maxR) maxR = sr;
        }
    }
    stampCenterCol = isFinite(minC) ? Math.round((minC + maxC) / 2) : Math.floor(gridSize / 2);
    stampCenterRow = isFinite(minR) ? Math.round((minR + maxR) / 2) : Math.floor(gridSize / 2);

    const pixelGrid = document.getElementById('pixelGrid');
    if (pixelGrid) pixelGrid.classList.add('stamp-mode');

    const overlay = getStampOverlay();
    const _cvsW = pixelCanvas ? pixelCanvas.width : (pixelGrid ? pixelGrid.clientWidth : 512);
    overlay.width  = _cvsW;
    overlay.height = _cvsW;
    overlay.style.display = 'block';

    // Afficher le ghost immédiatement au centre du canvas
    const midCol = Math.floor(currentGridSize / 2);
    const midRow = Math.floor(currentGridSize / 2);
    updateStampGhost(midCol, midRow);

    // Bouton flottant "Annuler" visible pendant le mode tampon
    let cancelBar = document.getElementById('stampCancelBar');
    if (!cancelBar) {
        cancelBar = document.createElement('div');
        cancelBar.id = 'stampCancelBar';
        cancelBar.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);z-index:9999;background:rgba(220,38,38,0.92);color:white;border:none;border-radius:24px;padding:10px 22px;font-size:0.95rem;font-weight:600;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,0.3);backdrop-filter:blur(8px);';
        cancelBar.textContent = '✗ ' + (localStorage.getItem('lang') === 'fr' ? 'Annuler le tampon' : 'Cancel stamp');
        cancelBar.addEventListener('click', exitStampMode);
        document.body.appendChild(cancelBar);
    }
    cancelBar.style.display = 'block';

    showNotification(tL('stampModeActive'), 'success');
}

function exitStampMode(silent = false) {
    isStampMode = false;
    stampPixels = null;
    const pixelGrid = document.getElementById('pixelGrid');
    if (pixelGrid) pixelGrid.classList.remove('stamp-mode');
    const overlay = document.getElementById('stampOverlay');
    if (overlay) {
        const ctx = overlay.getContext('2d');
        ctx.clearRect(0, 0, overlay.width, overlay.height);
        overlay.style.display = 'none';
    }
    activeStampId = null;
    const cancelBar = document.getElementById('stampCancelBar');
    if (cancelBar) cancelBar.style.display = 'none';
    if (!silent) showNotification(tL('stampCancelled'), 'info');
    renderStampsList();
}

// ── Mode placement Sprite Sheet ───────────────────────────────────────────────
function enterSpriteSheetMode(sprites) {
    // sprites = [{pixels, w, h}, ...] dans l'ordre du sheet
    if (!sprites || !sprites.length) return;
    isSpriteSheetMode = true;
    ssSprites = sprites;

    // Calculer le centre du premier sprite pour l'ancrage du ghost
    const sp0 = sprites[0];
    ssCenterCol = Math.floor(sp0.w / 2);
    ssCenterRow = Math.floor(sp0.h / 2);

    const pixelGrid = document.getElementById('pixelGrid');
    if (pixelGrid) pixelGrid.classList.add('stamp-mode');

    // Réutiliser le même overlay canvas que les tampons
    const overlay = getStampOverlay();
    const _cvsWss = pixelCanvas ? pixelCanvas.width : (pixelGrid ? pixelGrid.clientWidth : 512);
    overlay.width  = _cvsWss;
    overlay.height = _cvsWss;
    overlay.style.display = 'block';

    // Barre annuler
    let cancelBar = document.getElementById('stampCancelBar');
    if (!cancelBar) {
        cancelBar = document.createElement('div');
        cancelBar.id = 'stampCancelBar';
        cancelBar.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);z-index:9999;background:rgba(220,38,38,0.92);color:white;border:none;border-radius:24px;padding:10px 22px;font-size:0.95rem;font-weight:600;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,0.3);backdrop-filter:blur(8px);';
        cancelBar.addEventListener('click', exitSpriteSheetMode);
        document.body.appendChild(cancelBar);
    }
    const lang = localStorage.getItem('lang') === 'fr';
    cancelBar.textContent = `✗ ${lang ? 'Annuler le sprite sheet' : 'Cancel sprite sheet'}`;
    cancelBar.onclick = exitSpriteSheetMode;
    cancelBar.style.display = 'block';

    const msg = lang
        ? `🖼️ ${sprites.length} sprite${sprites.length > 1 ? 's' : ''} — cliquez pour poser`
        : `🖼️ ${sprites.length} sprite${sprites.length > 1 ? 's' : ''} — click to place`;
    showNotification(msg, 'success');
}

function exitSpriteSheetMode() {
    isSpriteSheetMode = false;
    ssSprites = [];
    const pixelGrid = document.getElementById('pixelGrid');
    if (pixelGrid) pixelGrid.classList.remove('stamp-mode');
    const overlay = document.getElementById('stampOverlay');
    if (overlay) {
        overlay.getContext('2d').clearRect(0, 0, overlay.width, overlay.height);
        overlay.style.display = 'none';
    }
    const cancelBar = document.getElementById('stampCancelBar');
    if (cancelBar) cancelBar.style.display = 'none';
}

// ── Mode placement texte ──────────────────────────────────────────────────────
function enterTextPlacementMode(flatPixels) {
    isTextPlacementMode = true;
    textPlacementPixels = flatPixels;

    // Centre du bounding box du texte
    let minC = Infinity, maxC = -Infinity, minR = Infinity, maxR = -Infinity;
    for (let i = 0; i < flatPixels.length; i++) {
        if (flatPixels[i] && !flatPixels[i].isEmpty) {
            const c = i % currentGridSize;
            const r = Math.floor(i / currentGridSize);
            if (c < minC) minC = c; if (c > maxC) maxC = c;
            if (r < minR) minR = r; if (r > maxR) maxR = r;
        }
    }
    const centerCol = isFinite(minC) ? Math.round((minC + maxC) / 2) : 0;
    const centerRow = isFinite(minR) ? Math.round((minR + maxR) / 2) : 0;
    // Stocker le décalage top-left → centre
    textPlacementPixels._centerCol = centerCol;
    textPlacementPixels._centerRow = centerRow;

    const pixelGrid = document.getElementById('pixelGrid');
    if (pixelGrid) pixelGrid.classList.add('stamp-mode');

    const overlay = getStampOverlay();
    const _cvsWt = pixelCanvas ? pixelCanvas.width : (pixelGrid ? pixelGrid.clientWidth : 512);
    overlay.width  = _cvsWt;
    overlay.height = _cvsWt;
    overlay.style.display = 'block';

    let cancelBar = document.getElementById('stampCancelBar');
    if (!cancelBar) {
        cancelBar = document.createElement('div');
        cancelBar.id = 'stampCancelBar';
        cancelBar.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);z-index:9999;background:rgba(220,38,38,0.92);color:white;border:none;border-radius:24px;padding:10px 22px;font-size:0.95rem;font-weight:600;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,0.3);backdrop-filter:blur(8px);';
        document.body.appendChild(cancelBar);
    }
    const fr = localStorage.getItem('lang') === 'fr';
    cancelBar.textContent = `✗ ${fr ? 'Annuler le texte' : 'Cancel text'}`;
    cancelBar.onclick = exitTextPlacementMode;
    cancelBar.style.display = 'block';

    showNotification(fr ? '✏️ Déplacez la souris sur le canvas pour positionner le texte, puis cliquez' : '✏️ Move your mouse over the canvas to position the text, then click', 'success');

    // Afficher le ghost au centre du canvas dès l'entrée en mode
    const midCol = Math.floor(currentGridSize / 2);
    const midRow = Math.floor(currentGridSize / 2);
    updateTextGhost(midCol, midRow);
}

function exitTextPlacementMode(silent = false) {
    isTextPlacementMode = false;
    textPlacementPixels = null;
    const pixelGrid = document.getElementById('pixelGrid');
    if (pixelGrid) pixelGrid.classList.remove('stamp-mode');
    const overlay = document.getElementById('stampOverlay');
    if (overlay) {
        overlay.getContext('2d').clearRect(0, 0, overlay.width, overlay.height);
        overlay.style.display = 'none';
    }
    const cancelBar = document.getElementById('stampCancelBar');
    if (cancelBar) cancelBar.style.display = 'none';
    if (!silent) showNotification(localStorage.getItem('lang') === 'fr' ? 'Texte annulé' : 'Text cancelled', 'info');
}

function updateTextGhost(col, row) {
    if (!textPlacementPixels) return;
    const centerCol = textPlacementPixels._centerCol || 0;
    const centerRow = textPlacementPixels._centerRow || 0;
    textHoverCol = col - centerCol;
    textHoverRow = row - centerRow;

    const overlay = document.getElementById('stampOverlay');
    if (!overlay) return;
    const ctx = overlay.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, overlay.width, overlay.height);
    const grid = document.getElementById('pixelGrid');
    const pixelSize = cellSize || overlay.width / currentGridSize;
    ctx.setTransform(gridZoom, 0, 0, gridZoom, gridPanX * canvasCssScale, gridPanY * canvasCssScale);
    ctx.globalAlpha = 0.65;
    for (let i = 0; i < textPlacementPixels.length; i++) {
        const pixel = textPlacementPixels[i];
        if (!pixel || pixel.isEmpty) continue;
        const srcCol = i % currentGridSize;
        const srcRow = Math.floor(i / currentGridSize);
        const dstCol = textHoverCol + srcCol;
        const dstRow = textHoverRow + srcRow;
        if (dstCol < 0 || dstRow < 0 || dstCol >= currentGridSize || dstRow >= currentGridSize) continue;
        ctx.fillStyle = pixel.color;
        ctx.fillRect(dstCol * pixelSize, dstRow * pixelSize, pixelSize, pixelSize);
    }
    ctx.globalAlpha = 1.0;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

// anchorCol/anchorRow = position top-left du texte sur le canvas (déjà calculée par updateTextGhost)
function applyTextPlacement(anchorCol, anchorRow) {
    if (!textPlacementPixels) return;
    saveToHistory();
    for (let i = 0; i < textPlacementPixels.length; i++) {
        const pixel = textPlacementPixels[i];
        if (!pixel || pixel.isEmpty) continue;
        const srcCol = i % currentGridSize;
        const srcRow = Math.floor(i / currentGridSize);
        const dstCol = anchorCol + srcCol;
        const dstRow = anchorRow + srcRow;
        if (dstCol < 0 || dstRow < 0 || dstCol >= currentGridSize || dstRow >= currentGridSize) continue;
        const dstIndex = dstRow * currentGridSize + dstCol;
        if (dstIndex >= 0 && dstIndex < currentFrameBuffer.length) {
            currentFrameBuffer[dstIndex] = { color: pixel.color, isEmpty: false };
        }
    }
    saveCurrentFrame();
    renderCanvas();
    exitTextPlacementMode(true);
    showNotification(localStorage.getItem('lang') === 'fr' ? '✅ Texte posé !' : '✅ Text placed!', 'success');
}

function updateSpriteSheetGhost(col, row) {
    if (!ssSprites.length) return;
    // Top-left du ghost = curseur - centre du premier sprite
    ssHoverCol = col - ssCenterCol;
    ssHoverRow = row - ssCenterRow;

    const overlay = document.getElementById('stampOverlay');
    if (!overlay) return;
    const ctx = overlay.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, overlay.width, overlay.height);

    const pixelSize = cellSize || overlay.width / currentGridSize;
    ctx.setTransform(gridZoom, 0, 0, gridZoom, gridPanX * canvasCssScale, gridPanY * canvasCssScale);
    ctx.globalAlpha = 0.6;

    // Afficher uniquement le premier sprite comme ghost de positionnement
    const sp = ssSprites[0];
    for (let i = 0; i < sp.pixels.length; i++) {
        const pixel = sp.pixels[i];
        if (!pixel || pixel.isEmpty) continue;
        const srcCol = i % sp.w;
        const srcRow = Math.floor(i / sp.w);
        const dstCol = ssHoverCol + srcCol;
        const dstRow = ssHoverRow + srcRow;
        if (dstCol < 0 || dstRow < 0 || dstCol >= currentGridSize || dstRow >= currentGridSize) continue;
        ctx.fillStyle = pixel.color;
        ctx.fillRect(dstCol * pixelSize, dstRow * pixelSize, pixelSize, pixelSize);
    }

    // Cadre orange autour du ghost
    ctx.globalAlpha = 0.85;
    ctx.strokeStyle = 'rgba(255,115,0,0.9)';
    ctx.lineWidth = 1;
    ctx.strokeRect(
        ssHoverCol * pixelSize, ssHoverRow * pixelSize,
        sp.w * pixelSize, sp.h * pixelSize
    );

    ctx.globalAlpha = 1.0;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function applySpriteSheet(anchorCol, anchorRow) {
    // Pour chaque sprite du sheet :
    //   - dupliquer la frame courante (avec TOUS ses calques)
    //   - ajouter un nouveau calque avec le sprite positionné à (anchorCol, anchorRow)
    // La frame courante elle-même reste inchangée.

    saveCurrentFrame();

    const baseFrameIndex = currentFrame;
    const baseLayers = frameLayers[baseFrameIndex];

    // Deep-clone d'un ensemble de calques
    function cloneLayers(layers) {
        return layers.map(l => ({
            id: _nextLayerId++,
            name: l.name,
            visible: l.visible,
            opacity: l.opacity,
            pixels: l.pixels.map(p => ({ ...p }))
        }));
    }

    const createdFrameIndices = [];

    ssSprites.forEach((sp, i) => {
        // 1. Dupliquer les calques de la frame de base
        const newLayers = cloneLayers(baseLayers);

        // 2. Créer le calque sprite positionné
        const spriteLayer = {
            id: _nextLayerId++,
            name: `Sprite #${i + 1}`,
            visible: true,
            opacity: 1.0,
            pixels: _makeEmptyPixels()
        };

        for (let pi = 0; pi < sp.pixels.length; pi++) {
            const pixel = sp.pixels[pi];
            if (!pixel || pixel.isEmpty) continue;
            const srcCol = pi % sp.w;
            const srcRow = Math.floor(pi / sp.w);
            const dstCol = anchorCol + srcCol;
            const dstRow = anchorRow + srcRow;
            if (dstCol < 0 || dstRow < 0 || dstCol >= currentGridSize || dstRow >= currentGridSize) continue;
            const dstIdx = dstRow * currentGridSize + dstCol;
            spriteLayer.pixels[dstIdx] = { color: pixel.color, isEmpty: false };
        }

        newLayers.push(spriteLayer);

        // 3. Calculer le composite
        const composite = (() => {
            const n = currentGridSize * currentGridSize;
            const result = Array.from({ length: n }, () => ({ color: '#FFFFFF', isEmpty: true }));
            newLayers.forEach(layer => {
                if (!layer.visible) return;
                layer.pixels.forEach((p, idx) => { if (p && !p.isEmpty) result[idx] = { ...p }; });
            });
            return result;
        })();

        // 4. Insérer la nouvelle frame juste après la frame de base
        const insertAt = baseFrameIndex + 1 + i;
        frames.splice(insertAt, 0, composite);
        frameLayers.splice(insertAt, 0, newLayers);
        createdFrameIndices.push(insertAt);
    });

    // Aller à la première frame créée
    currentFrame = baseFrameIndex + 1;
    currentLayer = frameLayers[currentFrame].length - 1;
    loadFrame(currentFrame);
    updateFramesList();

    const count = ssSprites.length; // lire AVANT exitSpriteSheetMode() qui vide ssSprites
    exitSpriteSheetMode();

    const lang = localStorage.getItem('lang') === 'fr';
    const msg = lang
        ? `✅ ${count} frame${count > 1 ? 's' : ''} créée${count > 1 ? 's' : ''} depuis le sprite sheet`
        : `✅ ${count} frame${count > 1 ? 's' : ''} created from sprite sheet`;
    showToast(msg, { type: 'success' });
}

function updateStampGhost(col, row) {
    // Ancrer sur le centre visuel du sprite (bounding box), pas le centre du canvas
    stampHoverCol = col - stampCenterCol;
    stampHoverRow = row - stampCenterRow;

    const overlay = document.getElementById('stampOverlay');
    if (!overlay || !stampPixels) return;
    const ctx = overlay.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, overlay.width, overlay.height);
    // cellSize (taille d'une cellule dans l'espace canvas) = même base que renderCanvas
    const pixelSize = cellSize || (overlay.width / currentGridSize);
    // Appliquer le même zoom/pan que la grille pour que le ghost colle aux pixels
    ctx.setTransform(gridZoom, 0, 0, gridZoom, gridPanX * canvasCssScale, gridPanY * canvasCssScale);
    ctx.globalAlpha = 0.65;
    let drawn = 0;
    for (let i = 0; i < stampPixels.length; i++) {
        const pixel = stampPixels[i];
        if (!pixel || pixel.isEmpty) continue;
        const srcCol = i % stampGridSize;
        const srcRow = Math.floor(i / stampGridSize);
        const dstCol = stampHoverCol + srcCol;
        const dstRow = stampHoverRow + srcRow;
        if (dstCol < 0 || dstRow < 0 || dstCol >= currentGridSize || dstRow >= currentGridSize) continue;
        ctx.fillStyle = pixel.color || '#000000';
        ctx.fillRect(dstCol * pixelSize, dstRow * pixelSize, pixelSize, pixelSize);
        drawn++;
    }
    ctx.globalAlpha = 1.0;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    // DEBUG — à retirer après validation
    if (drawn === 0) {
        const nonEmpty = stampPixels.filter(p => p && !p.isEmpty).length;
        console.warn('[Tampon] Ghost vide — pixels non-vides:', nonEmpty,
            '/ total:', stampPixels.length,
            '/ stampGridSize:', stampGridSize, '/ currentGridSize:', currentGridSize,
            '/ ancre:', stampHoverCol, stampHoverRow);
    }
}

function applyStamp(col, row) {
    if (CANVAS_RENDERING) {
        // Peindre directement sur le calque actif (pas de nouveau calque)
        saveToHistory();
        for (let i = 0; i < stampPixels.length; i++) {
            const pixel = stampPixels[i];
            if (!pixel || pixel.isEmpty) continue;
            const srcCol = i % stampGridSize;
            const srcRow = Math.floor(i / stampGridSize);
            const dstCol = col + srcCol;
            const dstRow = row + srcRow;
            if (dstCol < 0 || dstRow < 0 || dstCol >= currentGridSize || dstRow >= currentGridSize) continue;
            const dstIndex = dstRow * currentGridSize + dstCol;
            currentFrameBuffer[dstIndex] = { color: pixel.color || '#000000', isEmpty: false };
        }

        // Synchroniser le calque actif
        if (frameLayers[currentFrame]?.[currentLayer]) {
            frameLayers[currentFrame][currentLayer].pixels = currentFrameBuffer.map(p => p ? { ...p } : { color: '#FFFFFF', isEmpty: true });

            // Renommer le calque avec le nom du tampon (si le calque a encore son nom générique)
            const activeLayer = frameLayers[currentFrame][currentLayer];
            const activeStamp = activeStampId != null ? (window.stamps || []).find(s => s.id === activeStampId) : null;
            if (activeStamp && activeStamp.name && /^(Fond|Calque\s*\d*)$/i.test(activeLayer.name)) {
                activeLayer.name = activeStamp.name;
            }
        }

        frames[currentFrame] = computeComposite(currentFrame);
        renderCanvas();
        updateFramesList();
        updateLayersPanel();

        const overlay = document.getElementById('stampOverlay');
        if (overlay) overlay.getContext('2d').clearRect(0, 0, overlay.width, overlay.height);

        const isTouch = 'ontouchstart' in window;
        if (isTouch) exitStampMode(true);

        showNotification(tL('stampApplied'), 'success');
        return;
    }

    const pixelElements = Array.from(document.querySelectorAll('.pixel'));

    actionStartState = pixelElements.map(p => ({
        color: p.style.backgroundColor || '#FFFFFF',
        isEmpty: p.classList.contains('empty')
    }));
    currentActionPixels.clear();

    for (let i = 0; i < stampPixels.length; i++) {
        const pixel = stampPixels[i];
        if (!pixel || pixel.isEmpty) continue;
        const srcCol = i % stampGridSize;
        const srcRow = Math.floor(i / stampGridSize);
        const dstCol = col + srcCol;
        const dstRow = row + srcRow;
        if (dstCol < 0 || dstRow < 0 || dstCol >= currentGridSize || dstRow >= currentGridSize) continue;
        const dstIndex = dstRow * currentGridSize + dstCol;
        if (pixelElements[dstIndex]) {
            pixelElements[dstIndex].style.backgroundColor = pixel.color;
            pixelElements[dstIndex].classList.remove('empty');
            currentActionPixels.add(dstIndex);
        }
    }

    if (currentActionPixels.size > 0) {
        saveActionToHistory(actionStartState, currentActionPixels);
    }
    saveCurrentFrame();
    updateAllThumbnails();

    // Vider le ghost après placement
    const overlay = document.getElementById('stampOverlay');
    if (overlay) {
        const ctx = overlay.getContext('2d');
        ctx.clearRect(0, 0, overlay.width, overlay.height);
    }

    // Sur mobile : quitter le mode tampon après chaque pose (UX plus claire)
    const isTouch = 'ontouchstart' in window;
    if (isTouch) {
        exitStampMode(true); // silent = ne pas afficher "annulé"
    }

    showNotification(tL('stampApplied'), 'success');
}

async function showStampModal() {
    const lang = localStorage.getItem('lang') || 'en';
    let projects = [];

    try {
        const result = await window.dbService.getAllProjects();
        if (result.success) projects = result.data || [];
    } catch (e) { /* ignore */ }

    if (projects.length === 0) {
        showToast(tL('stampNoProjects'), { type: 'warning' });
        return;
    }

    const projectsHTML = projects.map((p, index) => {
        const name = p.name || (lang === 'fr' ? 'Sans titre' : 'Untitled');
        const frameCount = Array.isArray(p.frames) ? p.frames.length : 1;
        const thumb = p.thumbnail
            ? `<img src="${p.thumbnail}" style="width:40px;height:40px;image-rendering:pixelated;border-radius:4px;background:#fff;border:1px solid rgba(255,255,255,0.2);">`
            : `<div style="width:40px;height:40px;background:rgba(255,255,255,0.1);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:18px;">🎨</div>`;
        return `<div class="project-item stamp-project-item" data-index="${index}" style="cursor:pointer;">
            <div style="display:flex;align-items:center;gap:10px;">
                ${thumb}
                <div>
                    <div style="font-weight:600;font-size:0.9rem;">${sanitize(name)}</div>
                    <div style="font-size:0.75rem;color:rgba(255,255,255,0.5);">${frameCount} frame${frameCount > 1 ? 's' : ''}</div>
                </div>
            </div>
        </div>`;
    }).join('');

    const dialog = createMobileDialog(tL('stampTitle'), `
        <p style="font-size:0.85rem;color:rgba(255,255,255,0.6);margin-bottom:12px;">${tL('stampSubtitle')}</p>
        <div id="stampProjectList" class="projects-list">${projectsHTML}</div>
        <div id="stampFramePicker" style="display:none;margin-top:12px;">
            <p id="stampFrameLabel" style="font-size:0.85rem;color:rgba(255,255,255,0.6);margin-bottom:8px;"></p>
            <div id="stampFrameList" style="display:flex;flex-wrap:wrap;gap:6px;"></div>
        </div>
        <div style="margin-top:16px;display:flex;gap:8px;">
            <button id="stampConfirmBtn" class="dialog-button" disabled>${tL('stampConfirm')}</button>
            <button id="stampCancelBtn" class="dialog-button secondary">${tL('closeBtn')}</button>
        </div>
    `);

    let selectedProjectIndex = -1;
    let selectedFrameIndex = 0;

    dialog.querySelectorAll('.stamp-project-item').forEach(item => {
        item.addEventListener('click', () => {
            dialog.querySelectorAll('.stamp-project-item').forEach(i => i.style.background = '');
            item.style.background = 'rgba(0,122,255,0.25)';
            selectedProjectIndex = parseInt(item.dataset.index, 10);
            selectedFrameIndex = 0;

            const project = projects[selectedProjectIndex];
            const framesData = Array.isArray(project.frames) ? project.frames : [];
            const framePicker = dialog.querySelector('#stampFramePicker');
            const frameLabel = dialog.querySelector('#stampFrameLabel');
            const frameList = dialog.querySelector('#stampFrameList');

            frameLabel.textContent = tL('stampFramesAvail', framesData.length);
            frameList.innerHTML = '';

            if (framesData.length <= 1) {
                framePicker.style.display = 'none';
            } else {
                framePicker.style.display = 'block';
                framesData.forEach((frame, fi) => {
                    const size = 48;
                    const c = document.createElement('canvas');
                    c.width = size; c.height = size;
                    c.style.cssText = `width:${size}px;height:${size}px;image-rendering:pixelated;border-radius:4px;cursor:pointer;border:2px solid ${fi === 0 ? '#007AFF' : 'transparent'};background:#fff;`;
                    const ctx = c.getContext('2d');
                    const rawPx = Array.isArray(frame) ? frame : (frame.pixels || []);
                    const gs = Math.round(Math.sqrt(rawPx.length)) || 32;
                    const ps = size / gs;
                    rawPx.forEach((px, i) => {
                        if (!px || px.isEmpty) return;
                        ctx.fillStyle = px.color || '#000';
                        ctx.fillRect((i % gs) * ps, Math.floor(i / gs) * ps, ps, ps);
                    });
                    c.addEventListener('click', () => {
                        frameList.querySelectorAll('canvas').forEach(cv => cv.style.borderColor = 'transparent');
                        c.style.borderColor = '#007AFF';
                        selectedFrameIndex = fi;
                    });
                    frameList.appendChild(c);
                });
            }

            dialog.querySelector('#stampConfirmBtn').disabled = false;
        });
    });

    dialog.querySelector('#stampConfirmBtn').addEventListener('click', () => {
        if (selectedProjectIndex < 0) return;
        const project = projects[selectedProjectIndex];
        const framesData = Array.isArray(project.frames) ? project.frames : [];
        const rawFrame = framesData[selectedFrameIndex] || framesData[0] || [];
        const rawPx = Array.isArray(rawFrame) ? rawFrame : (rawFrame.pixels || []);
        const gs = Math.round(Math.sqrt(rawPx.length)) || 32;
        // Un pixel non-blanc est toujours non-vide (corrige données isEmpty corrompues)
        const normPx = rawPx.map(px => {
            if (!px) return { color: '#FFFFFF', isEmpty: true };
            const color = px.color || '#FFFFFF';
            const empty = color === '#FFFFFF' ? (px.isEmpty !== false) : false;
            return { color, isEmpty: empty };
        });
        dialog.remove();
        enterStampMode(normPx, gs);
    });

    dialog.querySelector('#stampCancelBtn').addEventListener('click', () => dialog.remove());
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
window.currentProjectName = null; // Nom du projet actif (pour le partage)

// Affiche la liste des projets depuis workspaceDir/projets/
async function _showWorkspaceProjects(workDir) {
    let projetsDir;
    try {
        projetsDir = await workDir.getDirectoryHandle('projets', { create: true });
    } catch (e) {
        showToast(tL('noProjectsFound'), { type: 'warning' });
        return;
    }

    // Lire tous les fichiers .pixelart
    const projects = [];
    try {
        for await (const [name, handle] of projetsDir.entries()) {
            if (handle.kind !== 'file' || !name.endsWith('.pixelart')) continue;
            try {
                const file = await handle.getFile();
                const text = await file.text();
                const data = JSON.parse(text);
                projects.push({
                    ...data,
                    _fileHandle: handle,
                    _fileName: name,
                    lastModified: data.lastModified || new Date(file.lastModified).toISOString()
                });
            } catch (_) {}
        }
    } catch (_) {}

    if (projects.length === 0) {
        showToast(tL('noProjectsFound'), { type: 'warning' });
        return;
    }

    // Trier par date décroissante
    projects.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));

    const projectsList = projects.map((p, index) => {
        const projectName = p.name || tL('untitledProject');
        const lastModified = p.lastModified;
        const hasMultipleFrames = Array.isArray(p.frames) && p.frames.length > 1;
        let previewHTML = '';
        if (hasMultipleFrames) {
            previewHTML = `<canvas data-project-index="${index}" width="48" height="48" style="width:48px;height:48px;border-radius:4px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);image-rendering:pixelated;"></canvas>`;
        } else if (p.thumbnail) {
            previewHTML = `<img src="${p.thumbnail}" alt="${projectName}" style="width:48px;height:48px;object-fit:contain;border-radius:4px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);">`;
        } else {
            previewHTML = `<div style="width:48px;height:48px;background:rgba(255,255,255,0.1);border-radius:4px;border:1px solid rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:20px;">🎨</div>`;
        }
        return `<div class="project-item" data-index="${index}">
            <div class="project-preview-container" style="display:flex;align-items:center;gap:12px;">
                ${previewHTML}
                <div class="project-info" style="flex:1;min-width:0;">
                    <div class="project-name">${projectName}</div>
                    <div class="project-date">${new Date(lastModified).toLocaleDateString(tL('dateLocale'))} ${tL('at')} ${new Date(lastModified).toLocaleTimeString(tL('dateLocale'), {hour:'2-digit',minute:'2-digit'})}</div>
                </div>
            </div>
        </div>`;
    }).join('');

    const dialog = createMobileDialog(tL('myProjects'), `
        <div style="margin-bottom:12px;padding:8px;background:rgba(255,255,255,0.1);border-radius:8px;">
            <p style="margin:0;font-size:0.9rem;color:rgba(255,255,255,0.8);">${tL('clickProject')}</p>
        </div>
        <div class="projects-list">${projectsList}</div>
        <div style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap;">
            <button id="wsLoadProjectBtn" class="dialog-button" disabled>${tL('loadBtn')}</button>
            <button id="wsDeleteProjectBtn" class="dialog-button secondary" disabled>${tL('deleteBtn')}</button>
            <button id="wsCancelBtn" class="dialog-button secondary">${tL('closeBtn')}</button>
        </div>
    `);

    // Animer les thumbnails multi-frames
    const thumbnailIntervals = [];
    projects.forEach((p, idx) => {
        if (!Array.isArray(p.frames) || p.frames.length <= 1) return;
        const canvas = dialog.querySelector(`canvas[data-project-index="${idx}"]`);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const fps = p.fps || 4;
        let frameIndex = 0;
        const drawFrame = (frame) => {
            if (!Array.isArray(frame)) return;
            const gs = Math.sqrt(frame.length);
            const ps = canvas.width / gs;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            frame.forEach((pixel, i) => {
                if (!pixel || pixel.isEmpty) return;
                ctx.fillStyle = pixel.color || '#FFFFFF';
                ctx.fillRect((i % gs) * ps, Math.floor(i / gs) * ps, ps, ps);
            });
        };
        drawFrame(p.frames[0]);
        thumbnailIntervals.push(setInterval(() => {
            frameIndex = (frameIndex + 1) % p.frames.length;
            drawFrame(p.frames[frameIndex]);
        }, 1000 / fps));
    });

    const origRemove = dialog.remove.bind(dialog);
    dialog.remove = () => { thumbnailIntervals.forEach(clearInterval); origRemove(); };

    let selectedIndex = null;
    const loadBtn = dialog.querySelector('#wsLoadProjectBtn');
    const deleteBtn = dialog.querySelector('#wsDeleteProjectBtn');

    dialog.querySelectorAll('.project-item').forEach(item => {
        item.addEventListener('click', () => {
            dialog.querySelectorAll('.project-item').forEach(p => p.classList.remove('selected'));
            item.classList.add('selected');
            selectedIndex = parseInt(item.dataset.index, 10);
            loadBtn.disabled = false;
            deleteBtn.disabled = false;
        });
    });

    loadBtn.addEventListener('click', async () => {
        if (selectedIndex === null) return;
        const project = projects[selectedIndex];
        try {
            const frames = Array.isArray(project.frames)
                ? normaliseFrames(project.frames)
                : project.frames;
            applyProjectData({ ...project, frames }, project.name);
            // Mémoriser le handle pour les futures sauvegardes sans dialogue
            _currentFileHandle = project._fileHandle;
            dialog.remove();
            showToast(tL('projectLoaded', project.name), { type: 'success' });
        } catch (err) {
            showToast(tL('projectLoadErrorDetail'), { type: 'error', duration: 5000 });
        }
    });

    deleteBtn.addEventListener('click', async () => {
        if (selectedIndex === null) return;
        const project = projects[selectedIndex];
        if (!confirm(tL('confirmDelete'))) return;
        try {
            await projetsDir.removeEntry(project._fileName);
            window.localDB.deleteProject(project.name).catch(() => {});
            showToast(tL('deleteSuccess'), { type: 'success' });
            dialog.remove();
            showLocalProjects();
        } catch (err) {
            showToast(tL('deleteError', err.message), { type: 'error', duration: 5000 });
        }
    });

    dialog.querySelector('#wsCancelBtn').addEventListener('click', () => dialog.remove());
}

// Applique les données d'un projet chargé à l'état de l'app.
// Utilisé par showLocalProjects, loadFromServer, et tout futur point de chargement.
function applyProjectData(data, projectName) {
    // Désactiver le mode template si actif
    if (typeof window.isTemplateMode !== 'undefined' && window.isTemplateMode) {
        window.isTemplateMode = false;
        window.currentTemplate = null;
        if (typeof cleanUpMarkers === 'function') cleanUpMarkers();
    }

    // Restaurer la taille de grille
    if (data.gridSize) {
        const savedSize = data.gridSize.width || data.gridSize.height || DEFAULT_GRID_SIZE;
        if (VALID_GRID_SIZES.includes(savedSize) && savedSize !== currentGridSize) {
            currentGridSize = savedSize;
            initGrid(savedSize);
            updateGridSizeIndicator(savedSize);
            updateGridSizeBtnStates(savedSize);
        }
    } else {
        autoDetectAndResizeGrid(data.frames);
    }

    // Normaliser et appliquer les frames
    const rawFrames = typeof data.frames === 'string' ? JSON.parse(data.frames) : data.frames;
    frames = normaliseFrames(rawFrames);
    currentFrame = data.current_frame ?? data.currentFrame ?? 0;
    if (currentFrame >= frames.length) currentFrame = Math.max(0, frames.length - 1);

    // Restaurer les calques
    const rawLayers = data.frame_layers || data.frameLayers;
    if (rawLayers && Array.isArray(rawLayers)) {
        const parsed = typeof rawLayers === 'string' ? JSON.parse(rawLayers) : rawLayers;
        frameLayers = decompressFrameLayers(parsed);
        _nextLayerId = data.next_layer_id || data._nextLayerId ||
            frameLayers.flat().reduce((m, l) => Math.max(m, (l.id || 0) + 1), 0);
    } else {
        initLayersFromFrames();
    }
    currentLayer = 0;

    // Restaurer les couleurs personnalisées
    const colors = data.custom_colors || data.customColors;
    customColors = [];
    if (colors) {
        const parsed = typeof colors === 'string' ? JSON.parse(colors) : colors;
        if (Array.isArray(parsed)) parsed.forEach(c => addCustomColor(c));
    }

    // Restaurer la palette
    const paletteSource = data.custom_palette || data.customPalette;
    if (paletteSource) {
        customPalette = typeof paletteSource === 'string' ? JSON.parse(paletteSource) : paletteSource;
        updateCompactPalette();
    }

    updateColorPalette();

    if (data.fps) setAnimationFPSValue(data.fps);

    // Mettre à jour le titre
    const title = document.getElementById('projectTitle');
    if (title) title.textContent = data.name || data.projectTitle || projectName;

    window.currentProjectName = projectName;
    _currentFileHandle = null; // Reset handle — le projet chargé a son propre fichier source

    updateFramesList();
    loadFrame(currentFrame);
    logUsageEvent('project_loaded', { name: projectName, frames: frames.length, fps: animationFPS });
}

async function loadSupabaseProjects() {
    try {
        await ensureAuthenticatedUser();

        const result = await window.dbService.getAllProjects();
        if (!result.success || !Array.isArray(result.data)) {
            throw new Error(result.error || 'Réponse Supabase invalide');
        }
        autoSaveProjects = result.data;
    } catch (error) {
        console.error('Erreur chargement projets:', error);
        await loadAutoSaveProjects();
        showToast(tL('cloudSyncOffline') || '⚠️ Cloud indisponible — projets locaux chargés', { type: 'warning', duration: 5000 });
    }
}

// Auto-save function removed - now using manual save only

// Fallback IndexedDB (au cas où Supabase ne fonctionne pas)
async function loadAutoSaveProjects() {
    try {
        const result = await window.localDB.getAllProjects();
        if (result.success && result.data.length > 0) {
            autoSaveProjects = result.data;
            return;
        }
    } catch (_) {}
    // Dernier recours : anciens projets localStorage
    try {
        const saved = localStorage.getItem('pixelEditor_autoSaveProjects');
        if (saved) autoSaveProjects = JSON.parse(saved);
    } catch (_) {}
}

function autoSaveProjectLocal(name) {
    const projectName = name || `Local ${new Date().toLocaleDateString('fr-FR')} ${new Date().toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}`;
    
    const projectData = {
        id: Date.now().toString(),
        name: projectName,
        frames: frames,
        frameLayers: frameLayers,
        _nextLayerId: _nextLayerId,
        currentFrame: currentFrame,
        customColors: customColors,
        customPalette: customPalette,
        fps: animationFPS || 24,
        gridSize: { width: currentGridSize, height: currentGridSize },
        signature: 'pixel-art-editor-v2',
        dateCreated: new Date().toISOString(),
        lastModified: new Date().toISOString()
    };
    
    autoSaveProjects.unshift(projectData);
    
    if (autoSaveProjects.length > maxAutoSaveProjects) {
        autoSaveProjects = autoSaveProjects.slice(0, maxAutoSaveProjects);
    }
    
    localStorage.setItem('pixelEditor_autoSaveProjects', JSON.stringify(autoSaveProjects));
}

async function showLocalProjects() {

    // Essayer workspace en priorité
    const workDir = await _getWorkspaceDir(true);
    if (workDir) {
        await _showWorkspaceProjects(workDir);
        return;
    }

    // Charger depuis IndexedDB (stockage local, pas de Supabase)
    const projectSource = 'local';
    try {
        const result = await window.localDB.getAllProjects();
        if (result.success && result.data.length > 0) {
            autoSaveProjects = result.data;
        } else {
            showToast(tL('noProjectsFound'), { type: 'warning' });
            return;
        }
    } catch (_) {
        showToast(tL('noProjectsFound'), { type: 'warning' });
        return;
    }
    
    // Créer une liste interactive pour mobile (compatible Supabase et localStorage)
    const projectsList = autoSaveProjects.map((p, index) => {
        const projectId = p.id || p.project_id || index;
        const projectName = p.name || tL('untitledProject');
        const lastModified = p.lastModified || p.updated_at || p.created_at;
        const deviceInfo = p.device_info ? ` 📱 ${p.device_info.includes('iPhone') ? 'iPhone' : p.device_info.includes('Android') ? 'Android' : 'Web'}` : '';
        
        // Générer l'aperçu visuel
        let previewHTML = '';
        const hasMultipleFrames = Array.isArray(p.frames) && p.frames.length > 1;
        if (hasMultipleFrames) {
            previewHTML = `<canvas data-project-id="${projectId}" width="48" height="48" style="width: 48px; height: 48px; border-radius: 4px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); image-rendering: pixelated;"></canvas>`;
        } else if (p.thumbnail) {
            previewHTML = `<img src="${p.thumbnail}" alt="${projectName}" class="project-preview-img" style="width: 48px; height: 48px; object-fit: contain; border-radius: 4px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);">`;
        } else {
            previewHTML = `<div class="project-preview-placeholder" style="width: 48px; height: 48px; background: rgba(255,255,255,0.1); border-radius: 4px; border: 1px solid rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 20px;">🎨</div>`;
        }
        
        return `<div class="project-item" data-project-id="${projectId}" data-index="${index}">
            <div class="project-preview-container" style="display: flex; align-items: center; gap: 12px;">
                ${previewHTML}
                <div class="project-info" style="flex: 1; min-width: 0;">
                    <div class="project-name">${projectName}${deviceInfo}</div>
                    <div class="project-date">${new Date(lastModified).toLocaleDateString(tL('dateLocale'))} ${tL('at')} ${new Date(lastModified).toLocaleTimeString(tL('dateLocale'), {hour: '2-digit', minute: '2-digit'})}</div>
                </div>
            </div>
        </div>`;
    }).join('');

    const dialog = createMobileDialog(tL('myProjects'), `
        <div style="margin-bottom: 12px; padding: 8px; background: rgba(255, 255, 255, 0.1); border-radius: 8px;">
            <p style="margin: 0; font-size: 0.9rem; color: rgba(255, 255, 255, 0.8);">
                ${tL('clickProject')}
            </p>
        </div>
        <div class="projects-list">
            ${projectsList}
        </div>
        <div style="margin-top: 16px; display: flex; gap: 8px; flex-wrap: wrap;">
            <button id="loadLocalProject" class="dialog-button" disabled>${tL('loadBtn')}</button>
            <button id="downloadLocalProject" class="dialog-button secondary" disabled>⬇️ ${tL('lang') === 'fr' ? 'Télécharger' : 'Download'}</button>
            <button id="deleteLocalProject" class="dialog-button secondary" disabled>${tL('deleteBtn')}</button>
            <button id="cancelLocalLoad" class="dialog-button secondary">${tL('closeBtn')}</button>
        </div>
    `);

    // Animer les thumbnails multi-frames
    const thumbnailIntervals = [];
    autoSaveProjects.forEach((p) => {
        if (!Array.isArray(p.frames) || p.frames.length <= 1) return;
        const projectId = p.id || p.project_id;
        const canvas = dialog.querySelector(`canvas[data-project-id="${projectId}"]`);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const fps = p.fps || 4;
        let frameIndex = 0;

        function drawThumbnailFrame(frame) {
            if (!Array.isArray(frame)) return;
            const gridSize = Math.sqrt(frame.length);
            const pixelSize = canvas.width / gridSize;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            frame.forEach((pixel, i) => {
                if (!pixel || pixel.isEmpty) return;
                ctx.fillStyle = pixel.color || '#FFFFFF';
                ctx.fillRect((i % gridSize) * pixelSize, Math.floor(i / gridSize) * pixelSize, pixelSize, pixelSize);
            });
        }

        drawThumbnailFrame(p.frames[0]);
        const interval = setInterval(() => {
            frameIndex = (frameIndex + 1) % p.frames.length;
            drawThumbnailFrame(p.frames[frameIndex]);
        }, 1000 / fps);
        thumbnailIntervals.push(interval);
    });

    // Nettoyer les intervals à la fermeture
    const origRemove = dialog.remove.bind(dialog);
    dialog.remove = () => {
        thumbnailIntervals.forEach(clearInterval);
        origRemove();
    };

    let selectedProject = null;
    const loadBtn = dialog.querySelector('#loadLocalProject');
    const downloadBtn = dialog.querySelector('#downloadLocalProject');
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
                index: parseInt(item.dataset.index, 10)
            };
            
            loadBtn.disabled = false;
            downloadBtn.disabled = false;
            deleteBtn.disabled = false;
        });
    });

    // Charger le projet sélectionné
    loadBtn.addEventListener('click', async () => {
        if (!selectedProject) return;
        const projectMeta = autoSaveProjects[selectedProject.index];
        try {
            let data;
            if (projectSource === 'local') {
                const result = await window.localDB.loadProject(projectMeta.name);
                if (!result.success || !result.data) throw new Error(result.error || 'not found');
                data = result.data;
            } else {
                const result = await window.dbService.loadProject(projectMeta.name);
                if (!result.success) throw new Error(result.error);
                data = result.data;
            }
            applyProjectData(data, projectMeta.name);
            dialog.remove();
            showToast(tL('projectLoaded', projectMeta.name), { type: 'success' });
        } catch (error) {
            console.error('Erreur chargement projet:', error);
            showToast(tL('projectLoadErrorDetail'), { type: 'error', duration: 5000 });
        }
    });

    // Télécharger le projet complet en JSON
    downloadBtn.addEventListener('click', async () => {
        if (!selectedProject) return;
        const projectMeta = autoSaveProjects[selectedProject.index];
        showToast('⬇️ Téléchargement en cours…', { type: 'info', duration: 10000, id: 'download-progress' });
        try {
            let data;
            if (projectSource === 'local') {
                const result = await window.localDB.loadProject(projectMeta.name);
                if (!result.success || !result.data) throw new Error(result.error || 'not found');
                data = result.data;
            } else {
                const result = await window.dbService.loadProject(projectMeta.name);
                if (!result.success) throw new Error(result.error);
                data = result.data;
            }
            dismissToast('download-progress');
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${projectMeta.name}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showToast(`✅ "${projectMeta.name}.json" téléchargé`, { type: 'success' });
        } catch (e) {
            dismissToast('download-progress');
            showToast('❌ Erreur lors du téléchargement', { type: 'error', duration: 5000 });
        }
    });

    // Supprimer le projet sélectionné
    deleteBtn.addEventListener('click', async () => {
        if (selectedProject && confirm(tL('confirmDelete'))) {
            const project = autoSaveProjects[selectedProject.index];
            try {
                let result;
                if (projectSource === 'local') {
                    result = await window.localDB.deleteProject(project.name);
                } else {
                    result = await window.dbService.deleteProjectById(project.id);
                    if (result.success) window.dbService?.invalidateProjectsCache?.();
                }

                if (result.success) {
                    showToast(tL('deleteSuccess'), { type: 'success' });
                    dialog.remove();
                    showLocalProjects();
                } else {
                    showToast(tL('deleteError', result.error), { type: 'error', duration: 5000 });
                }

            } catch (error) {
                console.error('Erreur suppression:', error);
                showToast(tL('deleteErrorRetry'), { type: 'error', duration: 5000 });
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
    // MAIS : si on a déjà plus de 8 couleurs, c'est probablement une conversion photo
    // Dans ce cas, on permet jusqu'à 64 couleurs pour ne pas supprimer les couleurs de conversion
    const maxPersonalizedColors = customColors.length > 8 ? 64 : 6;
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
    
    // Ajouter les couleurs personnalisées en plus
    // Si on a plus de 8 couleurs (limite normale), on augmente la limite d'affichage pour les conversions photo
    const maxPersonalizedColors = customColors.length > 8 ? Math.min(customColors.length, 32) : 6;
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

    // Bouton "+" pour ouvrir le nuancier et créer une nouvelle couleur
    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'color-btn add-color-btn';
    addBtn.title = 'Ajouter une couleur personnalisée';
    addBtn.textContent = '+';
    addBtn.addEventListener('click', () => {
        openCustomColorModal(currentColor);
    });
    presetColors.appendChild(addBtn);

    applyPaletteScrollState(presetColors);

    // Mettre à jour aussi la palette compacte mobile avec les couleurs personnalisées
    const currentPalette = customPalette || getDefaultCompactColors();
    applyCompactPaletteColors(currentPalette);
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
        customColorModalElements.hexValue.value = targetHex;
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

    // Saisie manuelle du code hex
    const hexInput = customColorModalElements.hexValue;
    if (hexInput) {
        // Ajouter '#' automatiquement si absent
        hexInput.addEventListener('focus', () => hexInput.select());
        hexInput.addEventListener('input', () => {
            let val = hexInput.value.trim();
            if (!val.startsWith('#')) val = '#' + val;
            if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
                setPendingColor(val.toUpperCase(), { retainPointer: false });
            }
        });
        hexInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                let val = hexInput.value.trim();
                if (!val.startsWith('#')) val = '#' + val;
                if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
                    setPendingColor(val.toUpperCase(), { retainPointer: false });
                } else {
                    // Valeur invalide → remettre la couleur courante
                    hexInput.value = customColorModalState.currentHex || '#000000';
                }
                hexInput.blur();
            } else if (e.key === 'Escape') {
                hexInput.value = customColorModalState.currentHex || '#000000';
                hexInput.blur();
            }
        });
        hexInput.addEventListener('blur', () => {
            // Remettre la valeur correcte si saisie invalide
            let val = hexInput.value.trim();
            if (!val.startsWith('#')) val = '#' + val;
            if (!/^#[0-9A-Fa-f]{6}$/.test(val)) {
                hexInput.value = customColorModalState.currentHex || '#000000';
            }
        });
    }

    customColorModalElements.applyBtn?.addEventListener('click', () => {
        const hex = customColorModalState.currentHex;
        if (hex) {
            addCustomColor(hex);   // Ajoute à la palette
            setPendingColor(hex);  // Définit comme couleur active
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
    
    // Bouton de validation mobile
    const validateBtnMobile = document.getElementById('validateColorBtnMobile');
    if (validateBtnMobile) {
        validateBtnMobile.addEventListener('click', () => {
            // Utiliser la couleur actuelle
            const colorToAdd = normalizeColor(currentColor);
            if (colorToAdd && !isPredefinedColor(colorToAdd)) {
                // Vérifier si la couleur n'est pas déjà dans customColors
                const normalized = normalizeColor(colorToAdd);
                const alreadyExists = customColors.some(c => normalizeColor(c) === normalized);
                
                if (!alreadyExists) {
                    addCustomColor(colorToAdd);
                    validateBtnMobile.disabled = true;
                    validateBtnMobile.title = 'Couleur ajoutée !';
                    validateBtnMobile.style.opacity = '0.6';
                    setTimeout(() => {
                        validateBtnMobile.disabled = false;
                        validateBtnMobile.title = 'Ajouter cette couleur à la palette';
                        validateBtnMobile.style.opacity = '1';
                    }, 1500);
                } else {
                    validateBtnMobile.title = 'Couleur déjà dans la palette';
                    setTimeout(() => {
                        validateBtnMobile.title = 'Ajouter cette couleur à la palette';
                    }, 1500);
                }
            } else if (colorToAdd && isPredefinedColor(colorToAdd)) {
                // Afficher un message si c'est une couleur de base
                validateBtnMobile.title = 'Couleur de base déjà dans la palette';
                setTimeout(() => {
                    validateBtnMobile.title = 'Ajouter cette couleur à la palette';
                }, 1500);
            }
        });
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

// Fonction pour mettre à jour la sélection visuelle des couleurs (mobile + desktop)
function updateCompactColorSelectionByColor(color) {
    const normalizedColor = normalizeColor(color);

    // Mobile (.compact-color-btn) + Desktop (.color-btn)
    document.querySelectorAll('.compact-color-btn, .color-btn').forEach(btn => {
        const normalizedBtnColor = normalizeColor(btn.style.backgroundColor);
        btn.classList.toggle('selected', normalizedBtnColor === normalizedColor);
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
                const hex = parseInt(x, 10).toString(16);
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
    
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = panel.classList.contains('open');
        panel.classList.toggle('open');
        if (!isOpen) {
            // Positionner à droite du bouton
            const rect = toggleBtn.getBoundingClientRect();
            panel.style.top = rect.top + 'px';
            panel.style.left = (rect.right + 8) + 'px';
            updateFPSSidebarUI(animationFPS);
        }
    });

    // Fermer en cliquant ailleurs
    document.addEventListener('click', (e) => {
        if (!panel.contains(e.target) && e.target !== toggleBtn) {
            panel.classList.remove('open');
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
            if (!isLongPress) {
                // Récupérer la couleur depuis le style background-color
                const color = btn.style.backgroundColor;
                if (color) {
                    // Normaliser la couleur
                    const normalizedColor = normalizeColor(color);
                    
                    currentColor = normalizedColor;
                    updateCurrentColorDisplay();
                    setEraserState(false);
                    
                    // Mettre à jour la sélection visuelle
                    updateCompactColorSelection(btn);
                    
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
                
                if (color) {
                    // Normaliser la couleur
                    const normalizedColor = normalizeColor(color);
                    
                    currentColor = normalizedColor;
                    updateCurrentColorDisplay();
                    setEraserState(false);
                    
                    // Mettre à jour la sélection visuelle
                    updateCompactColorSelection(btn);
                    
                }
            }
            
            if (longPressTimer) {
                clearTimeout(longPressTimer);
            }
            
            isLongPress = false;
        });
    });

    initPaletteScrollbar();
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

// Scrollbar personnalisée pour la palette mobile
function initPaletteScrollbar() {
    const palette = document.querySelector('.compact-preset-colors');
    const scrollbar = document.getElementById('paletteScrollbar');
    const thumb = document.getElementById('paletteScrollbarThumb');
    if (!palette || !scrollbar || !thumb) return;

    function updateThumb() {
        const ratio = palette.scrollWidth > palette.clientWidth
            ? palette.clientWidth / palette.scrollWidth
            : 1;
        const thumbWidth = Math.max(24, ratio * scrollbar.clientWidth);
        const maxScroll = palette.scrollWidth - palette.clientWidth;
        const scrollFraction = maxScroll > 0 ? palette.scrollLeft / maxScroll : 0;
        const maxLeft = scrollbar.clientWidth - thumbWidth;
        thumb.style.width = thumbWidth + 'px';
        thumb.style.left = (scrollFraction * maxLeft) + 'px';
        scrollbar.style.display = ratio >= 1 ? 'none' : 'block';
    }

    palette.addEventListener('scroll', updateThumb, { passive: true });

    // Drag sur le thumb
    let dragStartX = 0, dragStartScroll = 0;

    function onDragStart(clientX) {
        dragStartX = clientX;
        dragStartScroll = palette.scrollLeft;
    }

    function onDragMove(clientX) {
        const dx = clientX - dragStartX;
        const ratio = palette.scrollWidth > palette.clientWidth
            ? (palette.scrollWidth - palette.clientWidth) / (scrollbar.clientWidth - thumb.offsetWidth)
            : 1;
        palette.scrollLeft = dragStartScroll + dx * ratio;
    }

    thumb.addEventListener('mousedown', (e) => {
        e.preventDefault();
        onDragStart(e.clientX);
        const onMove = (e) => onDragMove(e.clientX);
        const onUp = () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    });

    thumb.addEventListener('touchstart', (e) => {
        e.preventDefault();
        onDragStart(e.touches[0].clientX);
        const onMove = (e) => { e.preventDefault(); onDragMove(e.touches[0].clientX); };
        const onEnd = () => { document.removeEventListener('touchmove', onMove); document.removeEventListener('touchend', onEnd); };
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('touchend', onEnd);
    }, { passive: false });

    // Observer pour mettre à jour si la palette change de taille
    new ResizeObserver(updateThumb).observe(palette);
    updateThumb();
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
    
}

// Fonction pour sauvegarder la palette personnalisée
function getDefaultCompactColors() {
    return ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
}

function applyCompactPaletteColors(colors) {
    const defaultColors = getDefaultCompactColors();
    const palette = Array.isArray(colors) && colors.length ? colors : defaultColors;
    const compactPresetColors = document.querySelector('.compact-preset-colors');
    
    if (!compactPresetColors) return;
    
    // Mettre à jour les 8 couleurs de base
    const compactColorButtons = compactPresetColors.querySelectorAll('.compact-color-btn');
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
    
    // Supprimer les anciens boutons de couleurs personnalisées (s'ils existent)
    const existingCustomButtons = compactPresetColors.querySelectorAll('.compact-color-btn.custom-color-added');
    existingCustomButtons.forEach(btn => btn.remove());
    
    // Ajouter les couleurs personnalisées après les 8 couleurs de base
    // Si on a plus de 8 couleurs (limite normale), on augmente la limite d'affichage pour les conversions photo
    const maxPersonalizedColors = customColors.length > 8 ? Math.min(customColors.length, 32) : 6;
    customColors.slice(0, maxPersonalizedColors).forEach(color => {
        const normalizedColor = normalizeColor(color);
        
        // Ne pas ajouter si c'est déjà une couleur de base
        if (!defaultColors.includes(normalizedColor)) {
            const btn = document.createElement('button');
            btn.className = 'compact-color-btn custom-color custom-color-added';
            btn.style.backgroundColor = normalizedColor;
            btn.title = `Couleur personnalisée : ${normalizedColor}`;
            
            // Ajouter les event listeners comme pour les autres boutons
            btn.addEventListener('click', () => {
                currentColor = normalizedColor;
                updateCurrentColorDisplay();
                setEraserState(false);
                updateCompactColorSelection(btn);
            });
            
            compactPresetColors.appendChild(btn);
        }
    });
    
    // Réinitialiser les event listeners pour tous les boutons
    initCompactColorButtons();
    initPaletteScrollbar();
}

function loadCustomPalette(palette) {
    if (!palette || !Array.isArray(palette)) return;
    applyCompactPaletteColors(palette);
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
        
        showNotification(tL('colorUpdated'), 'success');
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
            const index = parseInt(e.target.dataset.colorIndex, 10);
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
    showNotification(tL('paletteSaved'), 'success');
    } else {
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
    let currentState;
    if (CANVAS_RENDERING) {
        currentState = currentFrameBuffer.map(p => p ? { ...p } : { color: '#FFFFFF', isEmpty: true });
    } else {
        const pixels = document.querySelectorAll('.pixel');
        currentState = Array.from(pixels).map(pixel => ({
            color: pixel.style.backgroundColor || '#FFFFFF',
            isEmpty: pixel.classList.contains('empty')
        }));
    }
    
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
function saveActionToHistory(startState) {
    // Supprimer les états futurs si on est au milieu de l'historique
    if (historyIndex < history.length - 1) {
        history = history.slice(0, historyIndex + 1);
    }
    
    // Créer l'état final simple (tableau de pixels)
    let finalState;
    if (CANVAS_RENDERING) {
        finalState = currentFrameBuffer.map(p => p ? { ...p } : { color: '#FFFFFF', isEmpty: true });
    } else {
        const pixels = document.querySelectorAll('.pixel');
        finalState = Array.from(pixels).map(pixel => ({
            color: pixel.style.backgroundColor || '#FFFFFF',
            isEmpty: pixel.classList.contains('empty')
        }));
    }
    
    // Ajouter l'état final à l'historique
    history.push(finalState);
    historyIndex++;

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
    if (CANVAS_RENDERING) {
        currentFrameBuffer = state.map(p => p ? { ...p } : { color: '#FFFFFF', isEmpty: true });
        // Sync active layer pixels with restored buffer
        if (frameLayers[currentFrame]?.[currentLayer]) {
            frameLayers[currentFrame][currentLayer].pixels = currentFrameBuffer.map(p => p ? { ...p } : { color: '#FFFFFF', isEmpty: true });
        }
        frames[currentFrame] = computeComposite(currentFrame);
        renderCanvas();
        updateCurrentFrameThumbnail();
        return;
    }

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


    // Ne pas sauvegarder la frame lors des opérations undo/redo
    // saveCurrentFrame(); // Commenté pour éviter les sauvegardes automatiques
}

// Fonction supprimée - restoreFromHistoryForRedo n'est plus nécessaire

// Fonction Undo (annuler)
function undo() {
    if (historyIndex > 0) {
        historyIndex--; // Aller à l'état précédent
        restoreFromHistory(history[historyIndex]); // Restaurer cet état
        updateUndoRedoButtons();
    } else {
    }
}

// Fonction Redo (rétablir)
function redo() {
    if (historyIndex < history.length - 1) {
        historyIndex++; // Aller à l'état suivant
        restoreFromHistory(history[historyIndex], true); // Restaurer cet état (isRedo = true)
        updateUndoRedoButtons();
    } else {
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

    // Réinitialiser complètement l'historique
    history = [];
    historyIndex = -1; // Commencer à -1 pour que le premier état soit à l'index 0

    if (CANVAS_RENDERING) {
        const initialState = currentFrameBuffer.length > 0
            ? currentFrameBuffer.map(p => p ? { ...p } : { color: '#FFFFFF', isEmpty: true })
            : Array.from({ length: currentGridSize * currentGridSize }, () => ({ color: '#FFFFFF', isEmpty: true }));
        history.push(initialState);
        historyIndex = 0;
        // Attacher les boutons undo/redo (commun aux deux modes)
        _attachUndoRedoListeners();
        updateUndoRedoButtons();
        return;
    }

    // S'assurer que la grille est vraiment vide AVANT de créer l'état initial
    const pixels = document.querySelectorAll('.pixel');

    if (pixels.length === 0) {
        console.warn('⚠️ Aucun pixel trouvé, report de l\'initialisation de l\'historique');
        return;
    }
    
    // Forcer une grille complètement vide
    pixels.forEach((pixel) => {
        pixel.style.backgroundColor = '#FFFFFF';
        pixel.classList.add('empty');
        pixel.classList.remove('colored');
    });
    
    // Créer un état initial vraiment vide (tous les pixels blancs)
    const initialState = Array.from(pixels).map(() => ({
        color: '#FFFFFF',
        isEmpty: true
    }));
    
    // Ajouter l'état initial à l'historique
    history.push(initialState);
    historyIndex = 0;

    // Configurer les event listeners pour les boutons undo/redo
    _attachUndoRedoListeners();
    updateUndoRedoButtons();
}

function _attachUndoRedoListeners() {
    const undoBtn = document.getElementById('undoBtn');
    const redoBtn = document.getElementById('redoBtn');
    const undoBtnDesktop = document.getElementById('undoBtnDesktop');
    const redoBtnDesktop = document.getElementById('redoBtnDesktop');

    if (undoBtn && !undoBtn._undoListenerAttached) {
        undoBtn.addEventListener('click', undo);
        undoBtn._undoListenerAttached = true;
    }
    if (redoBtn && !redoBtn._redoListenerAttached) {
        redoBtn.addEventListener('click', redo);
        redoBtn._redoListenerAttached = true;
    }
    if (undoBtnDesktop && !undoBtnDesktop._undoListenerAttached) {
        undoBtnDesktop.addEventListener('click', undo);
        undoBtnDesktop._undoListenerAttached = true;
    }
    if (redoBtnDesktop && !redoBtnDesktop._redoListenerAttached) {
        redoBtnDesktop.addEventListener('click', redo);
        redoBtnDesktop._redoListenerAttached = true;
    }
}

// Fonctions de nettoyage pour éviter les débordements
function cleanUpMarkers() {
    // Supprimer tous les marqueurs existants
    document.querySelectorAll('.previous-pixel-marker, .next-pixel-marker-1, .next-pixel-marker-2').forEach(marker => {
        marker.remove();
    });
    
    // Supprimer tous les indicateurs de template (triangles SVG)
    document.querySelectorAll('.template-indicator-svg').forEach(indicator => {
        indicator.remove();
    });
    
    // Supprimer les classes et attributs de template des pixels
    document.querySelectorAll('.pixel').forEach(pixel => {
        // Supprimer la classe has-template-indicator
        if (pixel.classList.contains('has-template-indicator')) {
            pixel.classList.remove('has-template-indicator');
        }
        // Supprimer l'attribut data-expected-color
        if (pixel.hasAttribute('data-expected-color')) {
            pixel.removeAttribute('data-expected-color');
        }
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
    if (CANVAS_RENDERING) {
        // Save active layer
        if (frameLayers[currentFrame]?.[currentLayer]) {
            frameLayers[currentFrame][currentLayer].pixels = currentFrameBuffer.map(p => p ? { ...p } : { color: '#FFFFFF', isEmpty: true });
        }
        // Recompute composite
        frames[currentFrame] = computeComposite(currentFrame);
        updateCurrentFrameThumbnail();
        return;
    }

    const pixels = document.querySelectorAll('.pixel');
    const frameData = Array.from(pixels).map(pixel => {
        const bgColor = pixel.style.backgroundColor || '#FFFFFF';
        const isEmpty = pixel.classList.contains('empty') ||
                       bgColor === '#FFFFFF' ||
                       bgColor === 'rgb(255, 255, 255)' ||
                       bgColor === 'white' ||
                       !bgColor || bgColor.trim() === '';

        // Normaliser la couleur en hex
        let color = bgColor;
        if (color.startsWith('rgb')) {
            color = rgbToHex(color);
        } else if (!color.startsWith('#')) {
            color = '#FFFFFF';
        }

        return {
            color: color,
            isEmpty: isEmpty
        };
    });
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

    if (CANVAS_RENDERING) {
        const total = currentGridSize * currentGridSize;
        currentFrame = frameIndex;
        ensureFrameHasLayers(frameIndex);
        if (currentLayer >= frameLayers[frameIndex].length) currentLayer = frameLayers[frameIndex].length - 1;
        const layerPixels = frameLayers[frameIndex][currentLayer].pixels;
        currentFrameBuffer = Array.from({ length: total }, (_, i) => {
            const p = layerPixels[i];
            return p ? { ...p } : { color: '#FFFFFF', isEmpty: true };
        });
        updateFramesList();
        updateLayersPanel();
        renderCanvas();
        setTimeout(() => { saveToHistory(); }, 10);
        return;
    }

    const pixels = document.querySelectorAll('.pixel');
    
    // Nettoyer tous les marqueurs existants de manière stricte
    cleanUpMarkers();
    
    // Nettoyage de sécurité : supprimer tout élément indésirable en dehors de la grille
    cleanUpOutsideElements();
    
    // Réinitialiser les pixels (nettoyer complètement, y compris les indicateurs de template)
    pixels.forEach(pixel => {
        // Supprimer les indicateurs SVG de template s'ils existent
        const templateIndicators = pixel.querySelectorAll('.template-indicator-svg');
        templateIndicators.forEach(indicator => indicator.remove());
        
        // Supprimer les classes et attributs de template
        if (pixel.classList.contains('has-template-indicator')) {
            pixel.classList.remove('has-template-indicator');
        }
        if (pixel.hasAttribute('data-expected-color')) {
            pixel.removeAttribute('data-expected-color');
        }
        
        // Réinitialiser la couleur et l'état
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
    renderCanvas(); // Phase 1 : synchroniser le canvas à la frame chargée

    // Sauvegarder l'état initial de la frame chargée dans l'historique
    setTimeout(() => {
        saveToHistory();
    }, 10);
}

function addFrame() {
    saveCurrentFrame();
    frames.push([]);
    frameLayers.push([createLayer('Fond')]);
    currentFrame = frames.length - 1;
    currentLayer = 0;
    loadFrame(currentFrame);
}

function createFrameThumbnail(frame, frameIndex) {
    const thumbnail = document.createElement('div');
    thumbnail.className = 'frame-thumbnail';
    
    // Toujours 16×16 pour la miniature (taille fixe CSS)
    const thumbnailSize = 16;

    // Taille dynamique de la grille courante (8, 16, 32 ou 64)
    const originalSize = currentGridSize;
    // ratio = 0.5 pour 8×8, 1 pour 16×16, 2 pour 32×32, 4 pour 64×64
    const ratio = originalSize / thumbnailSize;

    for (let row = 0; row < thumbnailSize; row++) {
        for (let col = 0; col < thumbnailSize; col++) {
            const pixel = document.createElement('div');
            pixel.className = 'thumbnail-pixel';

            // Mapper la position thumbnail → position dans la grille source
            const srcRow = Math.min(Math.floor(row * ratio), originalSize - 1);
            const srcCol = Math.min(Math.floor(col * ratio), originalSize - 1);
            const originalIndex = srcRow * originalSize + srcCol;
            
            // Obtenir la couleur du pixel correspondant
            let color = '#FFFFFF'; // Blanc par défaut
            if (frame && frame.length > originalIndex && frame[originalIndex]) {
                if (!frame[originalIndex].isEmpty && frame[originalIndex].color) {
                    // Convertir les couleurs RGB en hex si nécessaire
                    color = frame[originalIndex].color;
                    if (color.startsWith('rgb')) {
                        color = rgbToHex(color);
                    }
                    // Normaliser la couleur
                    if (!color.startsWith('#')) {
                        color = '#FFFFFF';
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

const _isTouch = 'ontouchstart' in window;

/**
 * Touch drag-to-reorder pour mobile.
 * @param {HTMLElement} container  - le conteneur de la liste
 * @param {string}      rowSel     - sélecteur CSS d'une ligne (ex: '.frame-row')
 * @param {string}      indexAttr  - attribut data portant l'index (ex: 'frameIndex')
 * @param {Function}    onReorder  - callback(fromIndex, toIndex)
 */
function _makeTouchSortable(container, rowSel, indexAttr, onReorder) {
    if (!container) return;
    let dragFrom = null;
    let ghost    = null;
    let srcEl    = null;
    let offsetY  = 0;

    container.addEventListener('touchstart', (e) => {
        const handle = e.target.closest('.frame-drag-handle, .stamp-drag-handle, .layer-drag-handle');
        if (!handle) return;
        const row = handle.closest(rowSel);
        if (!row) return;
        dragFrom = parseInt(row.dataset[indexAttr], 10);
        srcEl = row;

        const rect = row.getBoundingClientRect();
        offsetY = e.touches[0].clientY - rect.top;

        // Ghost visuel
        ghost = row.cloneNode(true);
        ghost.style.cssText = `
            position: fixed;
            left: ${rect.left}px;
            top: ${rect.top}px;
            width: ${rect.width}px;
            opacity: 0.85;
            pointer-events: none;
            z-index: 9999;
            background: white;
            box-shadow: 0 6px 20px rgba(0,0,0,0.18);
            border-radius: 8px;
            border-left: 3px solid #FF7300;
        `;
        document.body.appendChild(ghost);
        row.style.opacity = '0.35';
        e.preventDefault();
    }, { passive: false });

    container.addEventListener('touchmove', (e) => {
        if (dragFrom === null || !ghost) return;
        const touch = e.touches[0];
        ghost.style.top = (touch.clientY - offsetY) + 'px';

        // Indicateur de dépôt
        container.querySelectorAll(rowSel).forEach(el => {
            el.classList.remove('frame-drop-above', 'frame-drop-below', 'layer-drop-above', 'layer-drop-below', 'stamp-drop-above', 'stamp-drop-below');
        });
        const target = [...container.querySelectorAll(rowSel)].find(el => {
            const r = el.getBoundingClientRect();
            return touch.clientY >= r.top && touch.clientY <= r.bottom && el !== srcEl;
        });
        if (target) {
            const r = target.getBoundingClientRect();
            target.classList.add(touch.clientY < r.top + r.height / 2 ? 'frame-drop-above' : 'frame-drop-below');
        }
        e.preventDefault();
    }, { passive: false });

    const _endTouch = () => {
        if (dragFrom === null) return;
        if (ghost) { ghost.remove(); ghost = null; }
        if (srcEl)  { srcEl.style.opacity = ''; srcEl = null; }

        const dropEl = container.querySelector('.frame-drop-above, .frame-drop-below, .layer-drop-above, .layer-drop-below, .stamp-drop-above, .stamp-drop-below');
        if (dropEl) {
            const toIndex = parseInt(dropEl.dataset[indexAttr], 10);
            dropEl.classList.remove('frame-drop-above', 'frame-drop-below', 'layer-drop-above', 'layer-drop-below', 'stamp-drop-above', 'stamp-drop-below');
            if (!isNaN(toIndex) && dragFrom !== toIndex) onReorder(dragFrom, toIndex);
        }
        dragFrom = null;
    };
    container.addEventListener('touchend',    _endTouch);
    container.addEventListener('touchcancel', _endTouch);
}

function _buildFrameRow(index, frame) {
    const row = document.createElement('div');
    row.className = `frame-row${index === currentFrame ? ' active' : ''}`;
    row.draggable = !_isTouch; // HTML5 drag desktop only; touch handled by _makeTouchSortable
    row.dataset.frameIndex = index;

    const handle = document.createElement('span');
    handle.className = 'frame-drag-handle';
    handle.textContent = '⠿';

    const thumb = document.createElement('canvas');
    thumb.className = 'frame-row-thumb';
    thumb.width = 28;
    thumb.height = 28;
    _drawFrameThumb(thumb, frame);

    const name = document.createElement('span');
    name.className = 'frame-row-name';
    name.textContent = `Frame ${index + 1}`;

    const delBtn = document.createElement('button');
    delBtn.className = 'frame-row-del';
    delBtn.title = 'Supprimer';
    delBtn.innerHTML = '<i data-lucide="trash-2"></i>';
    delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentFrame = index;
        deleteCurrentFrame();
    });

    row.append(handle, thumb, name, delBtn);

    row.addEventListener('click', () => {
        saveCurrentFrame();
        currentFrame = index;
        loadFrame(currentFrame);
        row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    row.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', index);
        row.classList.add('frame-dragging');
    });
    row.addEventListener('dragend', () => {
        row.classList.remove('frame-dragging');
        document.querySelectorAll('.frame-drop-above,.frame-drop-below').forEach(el => {
            el.classList.remove('frame-drop-above', 'frame-drop-below');
        });
    });
    row.addEventListener('dragover', (e) => {
        e.preventDefault();
        const from = parseInt(e.dataTransfer.getData('text/plain'), 10);
        document.querySelectorAll('.frame-drop-above,.frame-drop-below').forEach(el => {
            el.classList.remove('frame-drop-above', 'frame-drop-below');
        });
        row.classList.add(index <= from ? 'frame-drop-above' : 'frame-drop-below');
    });
    row.addEventListener('dragleave', () => {
        row.classList.remove('frame-drop-above', 'frame-drop-below');
    });
    row.addEventListener('drop', (e) => {
        e.preventDefault();
        row.classList.remove('frame-drop-above', 'frame-drop-below');
        const from = parseInt(e.dataTransfer.getData('text/plain'), 10);
        if (from !== index) reorderFrames(from, index);
    });

    return row;
}

function updateFramesList() {
    const framesList = document.getElementById('framesList');
    framesList.innerHTML = '';

    const mobileList = document.getElementById('framesListMobile');
    if (mobileList) mobileList.innerHTML = '';

    frames.forEach((frame, index) => {
        framesList.appendChild(_buildFrameRow(index, frame));
        if (mobileList) mobileList.appendChild(_buildFrameRow(index, frame));
    });

    if (_isTouch) {
        _makeTouchSortable(mobileList, '.frame-row', 'frameIndex', (from, to) => reorderFrames(from, to));
    }

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// Dessine la miniature d'une frame dans un canvas 28x28
function _drawFrameThumb(canvas, frame, gridSize) {
    const ctx = canvas.getContext('2d');
    const size = gridSize || currentGridSize;
    const cw = canvas.width, ch = canvas.height;
    ctx.clearRect(0, 0, cw, ch);
    if (!frame || frame.length === 0) return;
    const pw = cw / size, ph = ch / size;
    for (let i = 0; i < frame.length; i++) {
        const p = frame[i];
        if (!p || p.isEmpty) continue;
        ctx.fillStyle = p.color || '#fff';
        ctx.fillRect((i % size) * pw, Math.floor(i / size) * ph, pw, ph);
    }
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
    const newLayerForInsert = createLayer('Fond');
    newLayerForInsert.pixels = newFrame.map(p => p ? { ...p } : { color: '#FFFFFF', isEmpty: true });
    frameLayers.splice(index, 0, [newLayerForInsert]);
    currentLayer = 0;
    currentFrame = index;
    loadFrame(currentFrame);
    updateFramesList();
}

// Ajouter la fonction deleteCurrentFrame
async function deleteCurrentFrame() {
    if (frames.length <= 1) {
        showToast(tL('cannotDeleteLast'), { type: 'warning' });
        return;
    }

    const ok = await showConfirmDialog(tL('confirmDeleteFrame', currentFrame + 1), { danger: true });
    if (ok) {
        frames.splice(currentFrame, 1);
        frameLayers.splice(currentFrame, 1);
        if (currentFrame >= frames.length) {
            currentFrame = frames.length - 1;
        }
        currentLayer = 0;
        loadFrame(currentFrame);
        updateFramesList();
    }
}

// Ajouter la fonction clearAllFrames
async function clearAllFrames() {
    const ok = await showConfirmDialog(tL('confirmClearAll'), { danger: true });
    if (ok) {
        frames = [[]];
        currentFrame = 0;

        if (CANVAS_RENDERING) {
            currentFrameBuffer = Array.from({ length: currentGridSize * currentGridSize }, () => ({ color: '#FFFFFF', isEmpty: true }));
            frames[0] = currentFrameBuffer.map(p => ({ ...p }));
            initLayersFromFrames();
            currentLayer = 0;
            initHistory();
            updateFramesList();
            updateLayersPanel();
            renderCanvas();
            return;
        }

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
            customPalette: customPalette,
            gridSize: { width: currentGridSize, height: currentGridSize },
            created: new Date().toISOString(),
            version: '2.0'
        };

        // Sauvegarder localement (localStorage) - plus fiable
        try {
            autoSaveProjectLocal(projectName);
        } catch (saveError) {
            console.error('Erreur localStorage:', saveError);
            showToast(tL('saveErrorShort'), { type: 'error', duration: 5000 });
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
            showToast(tL('savedDownloaded'), { type: 'success' });
            return;
        }
        
        // Mettre à jour le titre du projet
        const titleElement = document.getElementById('projectTitle');
        if (titleElement) {
            titleElement.textContent = projectName;
        }
        
        showToast(tL('savedLocally'), { type: 'success' });
        
    } catch (err) {
        console.error('Erreur lors de la sauvegarde:', err);
        showToast(tL('saveErrorShort'), { type: 'error', duration: 5000 });
    }
}

function showSaveDialog() {
    return new Promise((resolve) => {
        const dialog = document.createElement('div');
        dialog.className = 'save-dialog';
        // FORCER le positionnement centré avec des styles inline
        dialog.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            background: rgba(0, 0, 0, 0.6) !important;
            backdrop-filter: blur(8px) !important;
            -webkit-backdrop-filter: blur(8px) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            z-index: 9998 !important;
            padding: 20px !important;
        `;
        dialog.innerHTML = `
            <div class="save-dialog-content" style="
                background: linear-gradient(155deg, rgba(36, 48, 94, 0.98), rgba(28, 38, 80, 0.95)) !important;
                border: 1px solid rgba(255, 255, 255, 0.2) !important;
                border-radius: 24px !important;
                padding: 32px !important;
                width: 100% !important;
                max-width: 420px !important;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6) !important;
                color: rgba(255, 255, 255, 0.95) !important;
            ">
                <h3>${tL('saveTitle')}</h3>
                <input type="text" id="saveFileName" placeholder="${tL('projectNamePlaceholder')}" value="">
                <div class="dialog-buttons">
                    <button id="dialogSave">${tL('saveBtn')}</button>
                    <button id="dialogCancel">${tL('cancelBtn')}</button>
                </div>
            </div>
        `;

        document.body.appendChild(dialog);

        const input = dialog.querySelector('#saveFileName');
        const saveBtn = dialog.querySelector('#dialogSave');
        const cancelBtn = dialog.querySelector('#dialogCancel');

        // Pré-remplir avec le titre actuel du projet
        input.value = document.getElementById('projectTitle')?.textContent?.trim() || 'mon-pixel-art';

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
        input.select(); // Sélectionner tout le texte pour remplacement rapide
    });
}

// Fonction pour afficher un message de résultat de sauvegarde dans une vraie fenêtre modale
function showSaveResultDialog({ title, message, type = 'success' }) {
    return new Promise(async (resolve) => {
        // Supprimer TOUTES les notifications existantes (haut, bas, partout) - IMMÉDIATEMENT
        // Supprimer toutes les notifications créées par showNotification
        const allFixedElements = document.querySelectorAll('div[style*="position: fixed"]');
        allFixedElements.forEach(el => {
            const style = el.getAttribute('style') || '';
            // Supprimer si c'est une notification (position fixed avec z-index < 2000)
            if (style.includes('position: fixed')) {
                const zIndexMatch = style.match(/z-index:\s*(\d+)/);
                if (!zIndexMatch || parseInt(zIndexMatch[1]) < 2000) {
                    el.remove();
                }
            }
        });
        
        // Attendre un peu pour s'assurer que tout est supprimé
        await new Promise(r => setTimeout(r, 50));

        const overlay = document.createElement('div');
        overlay.className = 'confirm-dialog-overlay';
        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(7, 11, 28, 0.75);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.2s ease;
            padding: 16px;
        `;

        const dialog = document.createElement('div');
        dialog.className = 'confirm-dialog';
        dialog.style.cssText = `
            width: min(420px, 90vw);
            max-width: 420px;
            background: linear-gradient(155deg, rgba(36, 48, 94, 0.98), rgba(28, 38, 80, 0.95));
            border-radius: 18px;
            padding: 24px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: rgba(255, 255, 255, 0.95);
            outline: none;
            z-index: 10000;
            position: relative;
        `;
        
        const icon = type === 'success' ? '✅' : type === 'warning' ? '⚠️' : '❌';
        const titleColor = type === 'success' ? '#4CAF50' : type === 'warning' ? '#FF9800' : '#F44336';
        
        dialog.innerHTML = `
            <h3 style="color: ${titleColor}; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; font-size: 1.3rem; font-weight: 600;">
                <span style="font-size: 1.8rem;">${icon}</span>
                <span>${title}</span>
            </h3>
            <p style="margin-bottom: 24px; white-space: pre-line; line-height: 1.6; font-size: 0.95rem; color: rgba(255, 255, 255, 0.85);">${message}</p>
            <div class="confirm-dialog-actions" style="margin-top: 24px; display: flex; gap: 12px;">
                <button class="dialog-button" style="flex: 1; background: linear-gradient(135deg, rgba(0, 122, 255, 0.9), rgba(0, 86, 179, 0.9)); color: white; font-weight: 600; padding: 12px 24px; border: none; border-radius: 10px; cursor: pointer; font-size: 1rem; transition: all 0.2s ease;">OK</button>
            </div>
        `;

        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

        const okBtn = dialog.querySelector('.dialog-button');
        
        // Ajouter un effet hover au bouton
        okBtn.addEventListener('mouseenter', () => {
            okBtn.style.transform = 'translateY(-1px)';
            okBtn.style.boxShadow = '0 4px 12px rgba(0, 122, 255, 0.4)';
        });
        okBtn.addEventListener('mouseleave', () => {
            okBtn.style.transform = 'translateY(0)';
            okBtn.style.boxShadow = 'none';
        });

        const handleClose = () => {
            overlay.style.animation = 'fadeOut 0.2s ease';
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.remove();
                }
                resolve();
            }, 200);
        };

        okBtn.addEventListener('click', handleClose);
        
        // Fermer en cliquant sur l'overlay
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                handleClose();
            }
        });

        // Fermer avec Escape
        const handleKeydown = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                handleClose();
                document.removeEventListener('keydown', handleKeydown);
            }
        };
        document.addEventListener('keydown', handleKeydown);

        // Focus sur le bouton OK
        setTimeout(() => {
            okBtn.focus();
        }, 100);
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
        showToast(tL('minFrames'), { type: 'warning' });
        return;
    }

    // Sauvegarder la frame actuelle
    saveCurrentFrame();
    
    isAnimationPlaying = true;
    const previewBtn = document.getElementById('previewBtn');
    const playToggle = document.getElementById('playToggle');
    
    // Mettre à jour le bouton dans le menu
    if (previewBtn) {
        previewBtn.innerHTML = '<i data-lucide="square"></i>';
        previewBtn.title = 'Arrêter l\'animation';
        previewBtn.classList.add('playing');
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // Mettre à jour le bouton dans la barre du haut
    if (playToggle) {
        playToggle.innerHTML = '<i data-lucide="square"></i>';
        playToggle.title = 'Arrêter l\'animation';
        playToggle.classList.add('playing');
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
    
    let frameIndex = 0;
    
    // Fonction pour mettre à jour l'indicateur visuel de la frame en cours
    const updatePlayingIndicator = (currentIndex) => {
        // Retirer la classe "playing" de toutes les frames
        document.querySelectorAll('.frame-preview').forEach(frame => {
            frame.classList.remove('playing');
        });
        
        // Ajouter la classe "playing" à la frame actuelle
        const currentFrameBtn = document.querySelector(`.frame-preview[data-frame-index="${currentIndex}"]`);
        if (currentFrameBtn) {
            currentFrameBtn.classList.add('playing');
            
            // Faire défiler pour que la frame soit visible si nécessaire
            currentFrameBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    };
    
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
        
        if (CANVAS_RENDERING) {
            currentFrameBuffer = frames[frameIndex].map(p => p ? { ...p } : { color: '#FFFFFF', isEmpty: true });
            currentFrame = frameIndex;
            renderCanvas();
        } else {
            const pixels = document.querySelectorAll('.pixel');
            frames[frameIndex].forEach((pixel, i) => {
                if (pixels[i]) {
                    pixels[i].style.backgroundColor = pixel.isEmpty ? '#FFFFFF' : pixel.color;
                    pixels[i].classList.remove('empty');
                }
            });
        }

        // Mettre à jour l'indicateur visuel
        updatePlayingIndicator(frameIndex);
        
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
    
    // Retirer l'indicateur visuel de toutes les frames
    document.querySelectorAll('.frame-preview').forEach(frame => {
        frame.classList.remove('playing');
    });
    
    // Mettre à jour le bouton dans le menu
    if (previewBtn) {
        previewBtn.innerHTML = '<i data-lucide="play"></i>';
        previewBtn.title = 'Lancer l\'animation';
        previewBtn.classList.remove('playing');
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // Mettre à jour le bouton dans la barre du haut
    if (playToggle) {
        playToggle.innerHTML = '<i data-lucide="play"></i>';
        playToggle.title = 'Lancer l\'animation';
        playToggle.classList.remove('playing');
        if (typeof lucide !== 'undefined') lucide.createIcons();
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
        return `#${values.slice(0, 3).map(x => parseInt(x, 10).toString(16).padStart(2, '0')).join('')}`.toUpperCase();
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
    const layersToMove = frameLayers[fromIndex];

    // Supprimer la frame de son emplacement d'origine
    frames.splice(fromIndex, 1);
    frameLayers.splice(fromIndex, 1);

    // Insérer la frame à sa nouvelle position
    frames.splice(toIndex, 0, frameToMove);
    frameLayers.splice(toIndex, 0, layersToMove);
    
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
    // Sauvegarder d'abord le buffer actif dans le calque courant
    if (frameLayers[currentFrame] && frameLayers[currentFrame][currentLayer]) {
        frameLayers[currentFrame][currentLayer].pixels = currentFrameBuffer.map(p => p ? { ...p } : { color: '#FFFFFF', isEmpty: true });
    }
    copiedFrame = JSON.parse(JSON.stringify(frames[currentFrame]));
    copiedFrameLayers = JSON.parse(JSON.stringify(frameLayers[currentFrame] || []));
    const pasteBtn = document.getElementById('pasteFrameBtn');
    if (pasteBtn) pasteBtn.disabled = false;
}

// Dupliquer la frame courante N fois (avec tous ses calques)
function duplicateCurrentFrameN(n) {
    if (!n || n < 1) return;
    // Sauvegarder le buffer actif dans le calque courant avant de dupliquer
    if (frameLayers[currentFrame]?.[currentLayer]) {
        frameLayers[currentFrame][currentLayer].pixels = currentFrameBuffer.map(p => p ? { ...p } : { color: '#FFFFFF', isEmpty: true });
    }
    const srcFrame = JSON.parse(JSON.stringify(frames[currentFrame]));
    const srcLayers = JSON.parse(JSON.stringify(frameLayers[currentFrame] || []));
    const insertAt = currentFrame + 1;
    for (let k = 0; k < n; k++) {
        const newFrame = srcFrame.map(p => ({ ...p }));
        const newLayers = srcLayers.map(l => ({
            ...l,
            id: _nextLayerId++,
            pixels: l.pixels.map(p => ({ ...p }))
        }));
        frames.splice(insertAt + k, 0, newFrame);
        frameLayers.splice(insertAt + k, 0, newLayers);
        modifiedPixels.splice(insertAt + k, 0, new Set());
    }
    updateFramesList();
    updateLayersPanel();
    showNotification(`${n} frame${n > 1 ? 's' : ''} dupliquée${n > 1 ? 's' : ''}`, 'success');
}

// Fonction pour coller une frame
function pasteFrame() {
    if (!copiedFrame) return;
    if (copiedFrameLayers && copiedFrameLayers.length > 0) {
        // Coller toutes les couches avec de nouveaux IDs pour éviter les conflits
        frameLayers[currentFrame] = copiedFrameLayers.map(l => ({
            ...l,
            id: _nextLayerId++,
            pixels: l.pixels.map(p => ({ ...p }))
        }));
        // Garder currentLayer dans les bornes
        if (currentLayer >= frameLayers[currentFrame].length) {
            currentLayer = frameLayers[currentFrame].length - 1;
        }
        frames[currentFrame] = computeComposite(currentFrame);
    } else {
        frames[currentFrame] = [...copiedFrame];
    }
    loadFrame(currentFrame);
    updateFramesList();
    updateLayersPanel();
}

// Système de raccourcis clavier centralisé
function handleKeyboardShortcuts(e) {
    // Ne pas activer si on est dans un input, textarea ou si une modal est ouverte
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
        return;
    }
    
    // Vérifier si une modal est ouverte (ne pas interférer)
    const openModal = document.querySelector('.modal[style*="flex"], .modal[style*="block"]');
    if (openModal && !openModal.classList.contains('custom-color-modal')) {
        return;
    }
    
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const ctrlKey = isMac ? e.metaKey : e.ctrlKey;
    
    // Raccourcis avec Ctrl/Cmd
    if (ctrlKey) {
        switch (e.key.toLowerCase()) {
            case 'c':
                e.preventDefault();
                copyCurrentFrame();
                if (typeof showNotification === 'function') {
                    showNotification(tL('frameCopied'), 'success');
                }
                return;
                
            case 'v':
                e.preventDefault();
                if (copiedFrame) {
                    pasteFrame();
                    if (typeof showNotification === 'function') {
                        showNotification(tL('framePasted'), 'success');
                    }
                }
                return;
                
            case 'z':
                e.preventDefault();
                if (e.shiftKey) {
                    redo();
                } else {
                    undo();
                }
                return;
                
            case 'y':
                e.preventDefault();
                redo();
                return;
                
            case 's':
                e.preventDefault();
                saveProjectSmart();
                return;

            case '+':
            case '=':
                e.preventDefault();
                zoomAtPoint(1.25, window.innerWidth / 2, window.innerHeight / 2);
                return;

            case '-':
                e.preventDefault();
                zoomAtPoint(0.8, window.innerWidth / 2, window.innerHeight / 2);
                return;

            case '0':
                e.preventDefault();
                resetZoom();
                return;

        }
    }
    
    // Raccourcis avec Ctrl/Cmd + Shift
    if (ctrlKey && e.shiftKey) {
        switch (e.key.toLowerCase()) {
            case 'f':
                // Ctrl/Cmd + Shift + F pour créer une nouvelle Frame (évite les conflits avec les raccourcis navigateur)
                e.preventDefault();
                addFrame();
                if (typeof showNotification === 'function') {
                    showNotification(tL('frameAdded'), 'success');
                }
                return;
        }
    }
    
    // Raccourcis sans modificateur
    switch (e.key.toLowerCase()) {
        case 'i':
            e.preventDefault();
            toggleEyedropper();
            return;

        case 'e':
            e.preventDefault();
            toggleEraser();
            return;

        case 'f':
            e.preventDefault();
            toggleFill();
            return;

        case 'x':
            e.preventDefault();
            toggleSymmetry();
            return;

        case 'v':
            e.preventDefault();
            toggleSymmetryV();
            return;

        case 's':
            e.preventDefault();
            toggleSelection();
            return;

        case ' ': // Espace pour play/pause
            e.preventDefault();
            if (isAnimationPlaying) {
                stopAnimation();
            } else {
                previewAnimation();
            }
            return;
            
        case 'delete':
        case 'backspace':
            // Supprimer les pixels de la sélection si une sélection est active
            if (selectionRect && !isMovingSelection) {
                e.preventDefault();
                actionStartState = currentFrameBuffer.map(p => p ? {...p} : {color:'#FFFFFF',isEmpty:true});
                currentActionPixels = new Set();
                for (let r = selectionRect.minRow; r <= selectionRect.maxRow; r++) {
                    for (let c = selectionRect.minCol; c <= selectionRect.maxCol; c++) {
                        const idx = r * currentGridSize + c;
                        currentFrameBuffer[idx] = { color: '#FFFFFF', isEmpty: true };
                        currentActionPixels.add(idx);
                    }
                }
                saveCurrentFrame();
                if (currentActionPixels.size > 0) {
                    saveActionToHistory(actionStartState, currentActionPixels);
                    updateAllThumbnails();
                }
                currentActionPixels.clear();
                actionStartState = null;
                scheduleRender();
                return;
            }
            // Supprimer la frame actuelle seulement si on n'est pas en train de dessiner
            if (!isDrawing) {
                e.preventDefault();
                if (frames.length > 1) {
                    deleteCurrentFrame();
                } else {
                    clearAllFrames();
                }
            }
            return;
            
        case 'arrowleft':
            // Frame précédente
            if (currentFrame > 0) {
                e.preventDefault();
                saveCurrentFrame();
                loadFrame(currentFrame - 1);
            }
            return;
            
        case 'arrowright':
            // Frame suivante
            if (currentFrame < frames.length - 1) {
                e.preventDefault();
                saveCurrentFrame();
                loadFrame(currentFrame + 1);
            }
            return;
            
        case 'escape':
            // Fermer les modals ou désactiver les outils
            if (isStampMode) {
                exitStampMode();
                return;
            }
            if (isCropStampMode) { setCropStampState(false); return; }
            if (isTextPlacementMode) { exitTextPlacementMode(); return; }
            if (isEyedropperMode) toggleEyedropper();
            if (isErasing) toggleEraser();
            if (isFillMode) toggleFill();
            if (isSymmetryMode) toggleSymmetry();
            if (isSymmetryV) setSymmetryVState(false);
            if (isSelectionMode) setSelectionState(false);
            return;
    }
}

// Fonction pour afficher l'aide complète
function showHelp() {
    logUsageEvent('help_opened');
    const helpContent = `
            <div class="help-section">
            <h3>${tL('helpStartTitle')}</h3>
            <div class="help-item">${tL('helpPalette')}</div>
            <div class="help-item">${tL('helpEraser')}</div>
                </div>
            <div class="help-section">
            <h3>${tL('helpColorsTitle')}</h3>
            <div class="help-item">${tL('helpColorsDesktop')}</div>
            <div class="help-item">${tL('helpColorsMobile')}</div>
                </div>
            <div class="help-section">
            <h3>${tL('helpFramesTitle')}</h3>
            <div class="help-item">${tL('helpNewFrame')}</div>
            <div class="help-item">${tL('helpPlay')}</div>
            <div class="help-item">${tL('helpFPS')}</div>
                </div>
            <div class="help-section">
            <h3>${tL('helpToolsTitle')}</h3>
            <div class="help-item">${tL('helpToolFill')}</div>
            <div class="help-item">${tL('helpToolSymH')}</div>
            <div class="help-item">${tL('helpToolSymV')}</div>
            <div class="help-item">${tL('helpToolSelection')}</div>
            <div class="help-item">${tL('helpToolGridSizes')}</div>
                </div>
            <div class="help-section">
            <h3>${tL('helpRefTitle')}</h3>
            <div class="help-item">${tL('helpRefDesc')}</div>
            <div class="help-item">${tL('helpRefMove')}</div>
            <div class="help-item">${tL('helpRefOpacity')}</div>
                </div>
            <div class="help-section">
            <h3>${tL('helpShortcutsTitle')}</h3>
            <div class="help-item">${tL('helpCopyFrame')}</div>
            <div class="help-item">${tL('helpPasteFrame')}</div>
            <div class="help-item">${tL('helpUndo')}</div>
            <div class="help-item">${tL('helpRedo')}</div>
            <div class="help-item">${tL('helpRedoAlt')}</div>
            <div class="help-item">${tL('helpSave')}</div>
            <div class="help-item">${tL('helpNewFrameKey')}</div>
            <div class="help-item">${tL('helpEyedropper')}</div>
            <div class="help-item">${tL('helpEraserKey')}</div>
            <div class="help-item">${tL('helpFillKey')}</div>
            <div class="help-item">${tL('helpSymHKey')}</div>
            <div class="help-item">${tL('helpSymVKey')}</div>
            <div class="help-item">${tL('helpSelectionKey')}</div>
            <div class="help-item">${tL('helpZoomKeys')}</div>
            <div class="help-item">${tL('helpSpace')}</div>
            <div class="help-item">${tL('helpArrows')}</div>
            <div class="help-item">${tL('helpDelete')}</div>
            <div class="help-item">${tL('helpEscape')}</div>
                </div>
            <div class="help-section">
            <h3>${tL('helpStorageTitle')}</h3>
            <div class="help-item">${tL('helpStorageSave')}</div>
            <div class="help-item">${tL('helpStorageProjects')}</div>
            <div class="help-item">${tL('helpStorageLoad')}</div>
                </div>
            <div class="help-section">
            <h3>${tL('helpExportTitle')}</h3>
            <div class="help-item">${tL('helpExportGif')}</div>
            <div class="help-item">${tL('helpExportPng')}</div>
            <div class="help-item">${tL('helpShare')}</div>
            <div class="help-item">${tL('helpGallery')}</div>
                </div>
            <div class="help-section">
            <h3>${tL('helpLayersTitle')}</h3>
            <div class="help-item">${tL('helpLayersDesc')}</div>
            <div class="help-item">${tL('helpLayersAdd')}</div>
            <div class="help-item">${tL('helpLayersSelect')}</div>
            <div class="help-item">${tL('helpLayersVisibility')}</div>
            <div class="help-item">${tL('helpLayersOpacity')}</div>
            <div class="help-item">${tL('helpLayersReorder')}</div>
            <div class="help-item">${tL('helpLayersDuplicate')}</div>
            <div class="help-item">${tL('helpLayersDelete')}</div>
            <div class="help-item">${tL('helpLayersCopyPaste')}</div>
            <div class="help-item">${tL('helpLayersSave')}</div>
            <div class="help-item">${tL('helpLayersMobile')}</div>
                </div>
            <div class="help-section">
            <h3>${tL('helpPhotoTitle')}</h3>
            <div class="help-item">${tL('helpPhotoDesc')}</div>
            <div class="help-item">${tL('helpPhotoColors')}</div>
            <div class="help-item">${tL('helpPhotoAccess')}</div>
                </div>
            <div class="help-section">
            <h3>${tL('helpOnionTitle')}</h3>
            <div class="help-item">${tL('helpOnionDesc')}</div>
            <div class="help-item">${tL('helpOnionToggle')}</div>
            <div class="help-item">${tL('helpOnionOpacity')}</div>
            <div class="help-item">${tL('helpOnionFrames')}</div>
                </div>
            <div class="help-section">
            <h3>${tL('helpHistoryTitle')}</h3>
            <div class="help-item">${tL('helpHistoryDesc')}</div>
            <div class="help-item">${tL('helpHistoryNav')}</div>
            <div class="help-item">${tL('helpHistoryUndo')}</div>
                </div>
            <div class="help-section">
            <h3>${tL('helpGradientTitle')}</h3>
            <div class="help-item">${tL('helpGradientDesc')}</div>
            <div class="help-item">${tL('helpGradientColors')}</div>
            <div class="help-item">${tL('helpGradientDir')}</div>
            <div class="help-item">${tL('helpGradientPreview')}</div>
                </div>
            <div class="help-section">
            <h3>${tL('helpTextTitle')}</h3>
            <div class="help-item">${tL('helpTextDesc')}</div>
            <div class="help-item">${tL('helpTextOptions')}</div>
            <div class="help-item">${tL('helpTextApply')}</div>
                </div>
            <div class="help-section">
            <h3>${tL('helpStampTitle')}</h3>
            <div class="help-item">${tL('helpStampDesc')}</div>
            <div class="help-item">${tL('helpStampHow')}</div>
            <div class="help-item">${tL('helpStampTransparent')}</div>
            <div class="help-item">${tL('helpStampUndo')}</div>
            <div class="help-item">${tL('helpStampMobile')}</div>
                </div>
            <div class="help-section">
            <h3>${tL('helpMobileTitle')}</h3>
            <div class="help-item">${tL('helpMobileMenu')}</div>
            <div class="help-item">${tL('helpMobileTouch')}</div>
            <div class="help-item">${tL('helpMobileCV')}</div>
        </div>
    `;

    const dialog = createMobileDialog(tL('helpTitle'), helpContent);

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
        <h2>${tL('creditsTitle')}</h2>
        <div class="credits-section">
            <h3>${tL('creditsCreatorTitle')}</h3>
            <p><strong>Frédéric Terrasson</strong></p>
            <p>${tL('creditsCreatorRole')}</p>
            <p class="credits-contact">✉️ contact@pixel-editor.app</p>
        </div>
        <div class="credits-section">
            <h3>${tL('creditsMissionTitle')}</h3>
            <p>${tL('creditsMissionText')}</p>
        </div>
        <div class="credits-section creator-story">
            <h3>${tL('creditsJourneyTitle')}</h3>
            <ul>
                <li>${tL('creditsJourney1')}</li>
                <li>${tL('creditsJourney2')}</li>
                <li>${tL('creditsJourney3')}</li>
            </ul>
        </div>
        <div class="credits-section legal">
            <h3>${tL('creditsLegalTitle')}</h3>
            <p>© ${new Date().getFullYear()} Frédéric Terrasson</p>
            <p>${tL('creditsLegalText')}</p>
        </div>
        <button class="close-credits">${tL('creditsClose')}</button>
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
    // FORCER le positionnement centré avec des styles inline
    saveDialog.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        background: rgba(0, 0, 0, 0.6) !important;
        backdrop-filter: blur(8px) !important;
        -webkit-backdrop-filter: blur(8px) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        z-index: 9998 !important;
        padding: 20px !important;
    `;
    
    saveDialog.innerHTML = `
        <div class="save-dialog-content" style="
            background: linear-gradient(155deg, rgba(36, 48, 94, 0.98), rgba(28, 38, 80, 0.95)) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            border-radius: 24px !important;
            padding: 32px !important;
            width: 100% !important;
            max-width: 420px !important;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6) !important;
            color: rgba(255, 255, 255, 0.95) !important;
        ">
            <h3>${tL('saveTitle')}</h3>
            <input type="text" id="projectName" placeholder="${tL('projectNamePlaceholder')}" value="">
            <div class="dialog-buttons">
                <button id="dialogSave">${tL('saveBtn')}</button>
                <button id="dialogCancel">${tL('cancelBtn')}</button>
            </div>
        </div>
    `;

    document.body.appendChild(saveDialog);

    const projectNameInput = saveDialog.querySelector('#projectName');
    // Pré-remplir avec le titre actuel du projet
    projectNameInput.value = document.getElementById('projectTitle')?.textContent?.trim() || 'pixel_animation';
    projectNameInput.focus();
    projectNameInput.select(); // Sélectionner tout le texte pour remplacement rapide
    
    saveDialog.querySelector('#dialogSave').addEventListener('click', () => {
        const projectName = (projectNameInput.value || 'pixel_animation').trim();
        const projectData = {
            frames: frames,
            frameLayers: frameLayers,
            _nextLayerId: _nextLayerId,
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

        const result = await window.dbService.saveProject(projectData);

        if (result.success) {
            const action = tL(result.isUpdate ? 'updated' : 'created2');
            await showSaveResultDialog({
                title: tL('saveSuccessTitle'),
                message: tL('saveSuccessMsg', fileName, action),
                type: 'success'
            });
        } else {
            await showSaveResultDialog({
                title: tL('saveErrorTitle'),
                message: tL('saveErrorMsg', result.error),
                type: 'error'
            });
        }
    } catch (err) {
        console.error('Erreur lors de la sauvegarde:', err);
        await showSaveResultDialog({
            title: tL('saveErrorTitle'),
            message: tL('saveErrorConnected', err.message),
            type: 'error'
        });
    }
}

// Fonction pour charger depuis Supabase (cloud)
async function loadFromServer() {
    try {
        const result = await window.dbService.getAllProjects();

        if (!result.success) {
            showToast(tL('loadProjectsError', result.error), { type: 'error', duration: 5000 });
            return;
        }

        const projects = result.data;

        if (projects.length === 0) {
            showToast(tL('noProjectsSave'), { type: 'warning' });
            return;
        }

        // Create dialog to select project
        const dialog = document.createElement('div');
        dialog.className = 'save-dialog';

        const projectsList = projects.map(p => {
            const date = new Date(p.updated_at).toLocaleDateString(tL('dateLocale'));
            const time = new Date(p.updated_at).toLocaleTimeString(tL('dateLocale'), {hour: '2-digit', minute: '2-digit'});
            return `<div class="project-item" data-name="${sanitize(p.name)}">
                <strong>${sanitize(p.name)}</strong><br>
                <small>${date} ${tL('at')} ${time}</small>
            </div>`;
        }).join('');

        dialog.innerHTML = `
            <div class="save-dialog-content">
                <h3>${tL('loadProjectTitle')}</h3>
                <div style="max-height: 300px; overflow-y: auto; margin: 15px 0;">
                    ${projectsList}
                </div>
                <div class="dialog-buttons">
                    <button id="dialogCancel">${tL('cancelBtn')}</button>
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
                        showToast(tL('loadProjectsError', loadResult.error), { type: 'error', duration: 5000 });
                        return;
                    }
                    applyProjectData(loadResult.data, projectName);
                    showToast(tL('projectLoaded', projectName), { type: 'success' });
                } catch (err) {
                    console.error('Error loading project:', err);
                    showToast(tL('loadProjectErrorShort'), { type: 'error', duration: 5000 });
                }
            });
        });

        dialog.querySelector('#dialogCancel').addEventListener('click', () => {
            dialog.remove();
        });

    } catch (err) {
        console.error('Erreur lors du chargement:', err);
        showToast(tL('loadErrorConnected'), { type: 'error', duration: 5000 });
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
    
    window.addEventListener('resize', debounce(() => {
        adjustForOrientation();
    }, 150));
}

function optimizeTouchInteractions() {
    const grid = document.getElementById('pixelGrid');
    if (!grid) return;

    let touchStarted = false;
    let lastPinchDist = null;
    let lastPinchMX = 0;
    let lastPinchMY = 0;

    grid.addEventListener('touchstart', (e) => {
        e.preventDefault();

        if (e.touches.length === 2) {
            // 2 doigts → démarrer pinch zoom/pan
            touchStarted = false;
            stopDrawing();
            lastPinchDist = pinchDist(e.touches);
            lastPinchMX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
            lastPinchMY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        } else {
            touchStarted = true;
            const touch = e.touches[0];
            if (isStampMode || isTextPlacementMode) {
                // Mode tampon / texte : calculer position et afficher ghost
                const rect = grid.getBoundingClientRect();
                const col = Math.max(0, Math.min(currentGridSize - 1, Math.floor(((touch.clientX - rect.left) / rect.width) * currentGridSize)));
                const row = Math.max(0, Math.min(currentGridSize - 1, Math.floor(((touch.clientY - rect.top) / rect.height) * currentGridSize)));
                if (isStampMode) updateStampGhost(col, row);
                else updateTextGhost(col, row);
            } else if (CANVAS_RENDERING) {
                // 1 doigt → dessiner via index canvas
                startDrawing({ clientX: touch.clientX, clientY: touch.clientY });
            } else {
                // 1 doigt → dessiner via DOM
                const element = document.elementFromPoint(touch.clientX, touch.clientY);
                if (element && element.classList.contains('pixel')) {
                    startDrawing({ target: element });
                }
            }
        }
    }, { passive: false });

    grid.addEventListener('touchmove', (e) => {
        e.preventDefault();

        if (e.touches.length === 2) {
            // 2 doigts → zoom + pan simultanés
            const dist = pinchDist(e.touches);
            const mx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
            const my = (e.touches[0].clientY + e.touches[1].clientY) / 2;

            if (lastPinchDist) {
                const rect = grid.getBoundingClientRect();
                const px = (lastPinchMX - rect.left - gridPanX) / gridZoom;
                const py = (lastPinchMY - rect.top  - gridPanY) / gridZoom;
                gridZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, gridZoom * (dist / lastPinchDist)));
                gridPanX = lastPinchMX - rect.left - px * gridZoom;
                gridPanY = lastPinchMY - rect.top  - py * gridZoom;
                gridPanX += mx - lastPinchMX;
                gridPanY += my - lastPinchMY;
                clampPan();
                applyGridTransform();
            }

            lastPinchDist = dist;
            lastPinchMX = mx;
            lastPinchMY = my;

        } else if (touchStarted) {
            const touch = e.touches[0];
            if (isStampMode || isTextPlacementMode) {
                // Mode tampon / texte : déplacer le ghost
                const rect = grid.getBoundingClientRect();
                const col = Math.max(0, Math.min(currentGridSize - 1, Math.floor(((touch.clientX - rect.left) / rect.width) * currentGridSize)));
                const row = Math.max(0, Math.min(currentGridSize - 1, Math.floor(((touch.clientY - rect.top) / rect.height) * currentGridSize)));
                if (isStampMode) updateStampGhost(col, row);
                else updateTextGhost(col, row);
            } else if (CANVAS_RENDERING) {
                // 1 doigt → continuer le dessin via index canvas
                draw({ clientX: touch.clientX, clientY: touch.clientY });
            } else {
                // 1 doigt → continuer le dessin via DOM
                const element = document.elementFromPoint(touch.clientX, touch.clientY);
                if (element && element.classList.contains('pixel')) {
                    draw({ target: element });
                }
            }
        }
    }, { passive: false });

    grid.addEventListener('touchend', (e) => {
        e.preventDefault();
        if (e.touches.length < 2) {
            lastPinchDist = null;
        }
        if (e.touches.length === 0) {
            if (isStampMode && touchStarted) {
                applyStamp(stampHoverCol, stampHoverRow);
            } else if (isTextPlacementMode && touchStarted) {
                applyTextPlacement(textHoverCol, textHoverRow);
            } else {
                stopDrawing();
            }
            touchStarted = false;
        }
    }, { passive: false });

    grid.addEventListener('touchcancel', () => {
        touchStarted = false;
        lastPinchDist = null;
        stopDrawing();
    });
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
            showToast(tL('noProjectsFoundShort'), { type: 'warning' });
            return;
        }

        // Créer une liste interactive pour mobile
        const projectsList = projects.map(p => 
            `<div class="project-item" data-filename="${p.filename}">
                <div class="project-name">${p.name}</div>
                <div class="project-date">${new Date(p.lastModified).toLocaleDateString()}</div>
            </div>`
        ).join('');

        const dialog = createMobileDialog(tL('loadProject'), `
            <div class="projects-list">
                ${projectsList}
            </div>
            <button id="cancelLoad" class="dialog-button secondary">${tL('cancelLoad')}</button>
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
                    
                    // Charger la palette personnalisée si elle existe
                    if (data.customPalette || data.custom_palette) {
                        const paletteSource = data.customPalette || data.custom_palette;
                        const paletteArray = typeof paletteSource === 'string' ? JSON.parse(paletteSource) : paletteSource;
                        if (Array.isArray(paletteArray)) {
                            customPalette = paletteArray;
                            updateCompactPalette();
                        }
                    }
                    
                    // Mettre à jour l'affichage des couleurs personnalisées
                    updateColorPalette();
                    
                    const title = document.getElementById('projectTitle');
                    if (title) {
                        title.textContent = data.name || tL('untitledProject');
                    }
                    
                    updateFramesList();
                    loadFrame(currentFrame);
                    
                    dialog.remove();
                    showToast(tL('projectLoadedShort'), { type: 'success' });
                } catch (err) {
                    console.error('Erreur lors du chargement:', err);
                    showToast(tL('loadErrorShort'), { type: 'error', duration: 5000 });
                }
            });
        });

        dialog.querySelector('#cancelLoad').addEventListener('click', () => {
            dialog.remove();
        });

    } catch (err) {
        console.error('Erreur lors du chargement:', err);
        showToast(tL('loadErrorRetry'), { type: 'error', duration: 5000 });
    }
}

let _saveInProgress = false;

// ========================================
// SAUVEGARDE FICHIER DISQUE (File System Access API)
// ========================================
// FileHandle stocké en IndexedDB pour sauvegardes silencieuses (Ctrl+S sans dialogue)
// Fallback : téléchargement classique si l'API n'est pas disponible

let _currentFileHandle = null; // FileSystemFileHandle en mémoire pour la session

// Persiste le FileHandle dans IndexedDB (les handles survivent aux rechargements)
async function _storeFileHandle(handle, projectName) {
    try {
        const db = await new Promise((resolve, reject) => {
            const req = indexedDB.open('pixelEditorFileHandles', 1);
            req.onupgradeneeded = e => e.target.result.createObjectStore('handles');
            req.onsuccess = e => resolve(e.target.result);
            req.onerror = reject;
        });
        await new Promise((resolve, reject) => {
            const tx = db.transaction('handles', 'readwrite');
            tx.objectStore('handles').put(handle, projectName);
            tx.oncomplete = resolve;
            tx.onerror = reject;
        });
    } catch (_) {}
}

async function _loadFileHandle(projectName) {
    try {
        const db = await new Promise((resolve, reject) => {
            const req = indexedDB.open('pixelEditorFileHandles', 1);
            req.onupgradeneeded = e => e.target.result.createObjectStore('handles');
            req.onsuccess = e => resolve(e.target.result);
            req.onerror = reject;
        });
        return await new Promise((resolve, reject) => {
            const tx = db.transaction('handles', 'readonly');
            const req = tx.objectStore('handles').get(projectName);
            req.onsuccess = e => resolve(e.target.result || null);
            req.onerror = reject;
        });
    } catch (_) { return null; }
}

// ─── Workspace (dossier de travail) ─────────────────────────────────────────
// Dossier racine choisi par l'utilisateur via showDirectoryPicker().
// Contient deux sous-dossiers : projets/ et tampons/

let _workspaceDir = null; // FileSystemDirectoryHandle en mémoire

// Helpers génériques IndexedDB pour stocker des handles (fichiers et dossiers)
async function _idbGet(key) {
    try {
        const db = await new Promise((resolve, reject) => {
            const req = indexedDB.open('pixelEditorFileHandles', 1);
            req.onupgradeneeded = e => e.target.result.createObjectStore('handles');
            req.onsuccess = e => resolve(e.target.result);
            req.onerror = reject;
        });
        return await new Promise((resolve, reject) => {
            const tx = db.transaction('handles', 'readonly');
            const r = tx.objectStore('handles').get(key);
            r.onsuccess = e => resolve(e.target.result || null);
            r.onerror = reject;
        });
    } catch (_) { return null; }
}

async function _idbSet(key, handle) {
    try {
        const db = await new Promise((resolve, reject) => {
            const req = indexedDB.open('pixelEditorFileHandles', 1);
            req.onupgradeneeded = e => e.target.result.createObjectStore('handles');
            req.onsuccess = e => resolve(e.target.result);
            req.onerror = reject;
        });
        await new Promise((resolve, reject) => {
            const tx = db.transaction('handles', 'readwrite');
            tx.objectStore('handles').put(handle, key);
            tx.oncomplete = resolve;
            tx.onerror = reject;
        });
    } catch (_) {}
}

// Tente de récupérer silencieusement le workspace depuis IndexedDB (sans dialog)
async function _ensureWorkspaceDir() {
    if (_workspaceDir) return _workspaceDir;
    const handle = await _idbGet('__workspace__');
    if (!handle) return null;
    try {
        const perm = await handle.queryPermission({ mode: 'readwrite' });
        if (perm === 'granted') {
            _workspaceDir = handle;
            await _workspaceDir.getDirectoryHandle('projets', { create: true });
            await _workspaceDir.getDirectoryHandle('tampons', { create: true });
        }
    } catch (_) {}
    return _workspaceDir;
}

// Retourne le workspace handle si permission ok. askIfNeeded=true → demande permission si nécessaire.
async function _getWorkspaceDir(askIfNeeded = false) {
    const handle = _workspaceDir || await _idbGet('__workspace__');
    if (!handle) return null;
    try {
        let perm = await handle.queryPermission({ mode: 'readwrite' });
        if (perm !== 'granted' && askIfNeeded) {
            perm = await handle.requestPermission({ mode: 'readwrite' });
        }
        if (perm === 'granted') {
            _workspaceDir = handle;
            return handle;
        }
    } catch (_) {}
    return null;
}

// Ouvre le sélecteur de dossier, crée projets/ et tampons/, persiste dans IndexedDB
async function chooseWorkspaceFolder() {
    if (!window.showDirectoryPicker) {
        showToast('Votre navigateur ne supporte pas la sélection de dossier', { type: 'error', duration: 5000 });
        return null;
    }
    try {
        const dir = await window.showDirectoryPicker({ mode: 'readwrite', startIn: 'documents' });
        await dir.getDirectoryHandle('projets', { create: true });
        await dir.getDirectoryHandle('tampons', { create: true });
        _workspaceDir = dir;
        await _idbSet('__workspace__', dir);
        showToast(`✅ Dossier "${dir.name}" configuré (projets/ et tampons/ créés)`, { type: 'success', duration: 4000 });
        return dir;
    } catch (e) {
        if (e.name !== 'AbortError') showToast(`❌ Erreur : ${e.message}`, { type: 'error', duration: 5000 });
        return null;
    }
}

// ────────────────────────────────────────────────────────────────────────────

// Construit l'objet projet complet (frames + calques + tampons + palette)
function buildProjectFileData(projectName) {
    saveCurrentFrame();
    return {
        signature: 'pixel-art-editor-v2',
        version: 1,
        name: projectName || window.currentProjectName || 'sans-titre',
        gridSize: { width: currentGridSize, height: currentGridSize },
        frames: frames.map(toSparseFrame),
        frameLayers: compressFrameLayers(frameLayers),
        _nextLayerId: _nextLayerId,
        currentFrame: currentFrame,
        fps: animationFPS || 24,
        customPalette: customPalette || [],
        customColors: customColors || [],
        stamps: (window.stamps || []).map(s => ({
            ...s,
            pixels: toSparseFrame(s.pixels || [])
        }))
    };
}

// Écrit le blob dans un FileHandle (silencieux) ou demande où sauvegarder (dialogue)
async function _writeToHandle(handle, blob) {
    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
}

// Point d'entrée unique pour la sauvegarde projet
async function saveProjectSmart() {
    if (_saveInProgress) return;
    _saveInProgress = true;
    try {
        // 1. Déterminer le nom du projet
        let projectName = window.currentProjectName || null;
        if (!projectName) {
            projectName = await showSaveDialog();
            if (!projectName) return;
            window.currentProjectName = projectName;
        }

        const titleEl = document.getElementById('projectTitle');
        if (titleEl) titleEl.textContent = projectName;

        const data = buildProjectFileData(projectName);
        const json = JSON.stringify(data);
        const blob = new Blob([json], { type: 'application/json' });
        const safeName = projectName.replace(/[^a-z0-9_\-]/gi, '_') + '.pixelart';

        // 2. Essayer le dossier de travail (workspace) en priorité
        const workDir = await _getWorkspaceDir(true);
        if (workDir) {
            const projetsDir = await workDir.getDirectoryHandle('projets', { create: true });
            const fileHandle = await projetsDir.getFileHandle(safeName, { create: true });
            await _writeToHandle(fileHandle, blob);
            _currentFileHandle = fileHandle;
            window.localDB.saveProject(data).catch(() => {});
            modifiedPixels = modifiedPixels.map(() => new Set());
            showToast(`✅ "${projectName}" sauvegardé`, { type: 'success' });
            return;
        }

        // 3. Fallback : showSaveFilePicker par fichier
        if (window.showSaveFilePicker) {
            if (!_currentFileHandle) {
                _currentFileHandle = await _loadFileHandle(projectName);
            }
            if (_currentFileHandle) {
                try {
                    const perm = await _currentFileHandle.queryPermission({ mode: 'readwrite' });
                    if (perm !== 'granted') {
                        const req = await _currentFileHandle.requestPermission({ mode: 'readwrite' });
                        if (req !== 'granted') _currentFileHandle = null;
                    }
                } catch (_) { _currentFileHandle = null; }
            }
            if (!_currentFileHandle) {
                try {
                    _currentFileHandle = await window.showSaveFilePicker({
                        suggestedName: safeName,
                        startIn: 'documents',
                        types: [{ description: 'Pixel Art Project', accept: { 'application/json': ['.pixelart'] } }]
                    });
                    await _storeFileHandle(_currentFileHandle, projectName);
                } catch (e) {
                    if (e.name === 'AbortError') return;
                    throw e;
                }
            }
            await _writeToHandle(_currentFileHandle, blob);
            window.localDB.saveProject(data).catch(() => {});
            modifiedPixels = modifiedPixels.map(() => new Set());
            showToast(`✅ "${projectName}" sauvegardé`, { type: 'success' });
            return;
        }

        // 4. Fallback final : IndexedDB + téléchargement
        const result = await window.localDB.saveProject(data);
        if (!result.success) throw new Error(result.error);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = safeName; a.click();
        URL.revokeObjectURL(url);
        modifiedPixels = modifiedPixels.map(() => new Set());
        showToast(`✅ "${projectName}" sauvegardé`, { type: 'success' });

    } catch (err) {
        console.error('❌ Erreur sauvegarde:', err);
        showToast(`❌ Erreur : ${err.message}`, { type: 'error', duration: 5000 });
    } finally {
        _saveInProgress = false;
    }
}


async function _applyProjectFile(file) {
    // Réutilise importSharedProject qui gère tout (frames, calques, tampons, palette)
    await importSharedProject(file);
}

// Tooltip custom — couvre tous les éléments avec title dans la page
function initButtonTooltips() {
    const tooltip = document.getElementById('custom-tooltip');
    if (!tooltip) return;

    const currentLang = () => localStorage.getItem('lang') || 'fr';

    // Convertir TOUS les title de la page en data-tooltip-fr/en, puis supprimer title natif
    document.querySelectorAll('[title]').forEach(el => {
        const t = el.getAttribute('title');
        if (!t) return;
        if (!el.getAttribute('data-tooltip-fr')) el.setAttribute('data-tooltip-fr', el.getAttribute('data-fr') || t);
        if (!el.getAttribute('data-tooltip-en')) el.setAttribute('data-tooltip-en', el.getAttribute('data-en') || t);
        el.removeAttribute('title');
    });

    // Convertir aussi les éléments avec data-fr/data-en (sans title)
    document.querySelectorAll('[data-fr], [data-en]').forEach(el => {
        if (!el.getAttribute('data-tooltip-fr') && el.getAttribute('data-fr'))
            el.setAttribute('data-tooltip-fr', el.getAttribute('data-fr'));
        if (!el.getAttribute('data-tooltip-en') && el.getAttribute('data-en'))
            el.setAttribute('data-tooltip-en', el.getAttribute('data-en'));
    });

    let showTimer = null;

    const attach = (el) => {
        el.addEventListener('mouseenter', () => {
            const l = currentLang();
            const label = el.getAttribute(`data-tooltip-${l}`) || el.getAttribute('data-tooltip-fr') || el.getAttribute('data-tooltip-en') || '';
            if (!label) return;
            clearTimeout(showTimer);
            showTimer = setTimeout(() => {
                tooltip.textContent = label;
                const rect = el.getBoundingClientRect();
                tooltip.style.display = 'block';

                const tw = tooltip.offsetWidth;
                const th = tooltip.offsetHeight;
                const vw = window.innerWidth;
                const vh = window.innerHeight;
                const gap = 8;

                // Droite par défaut, gauche si ça déborde
                let left = rect.right + gap;
                if (left + tw > vw) left = rect.left - tw - gap;
                // Clamp vertical
                let top = rect.top + rect.height / 2 - th / 2;
                if (top < gap) top = gap;
                if (top + th > vh - gap) top = vh - th - gap;

                tooltip.style.left = left + 'px';
                tooltip.style.top = top + 'px';
            }, 400);
        });
        el.addEventListener('mouseleave', () => {
            clearTimeout(showTimer);
            tooltip.style.display = 'none';
        });
    };

    document.querySelectorAll('[data-tooltip-fr], [data-tooltip-en]').forEach(attach);
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
    // Sauvegarde / ouverture fichier disque
    document.getElementById('shareProjectBtn')?.addEventListener('click', () => {
        if (typeof handleShareButtonClick === 'function') handleShareButtonClick();
        else shareProject();
    });
    document.getElementById('publishGalleryBtn')?.addEventListener('click', publishToGallery);
    document.getElementById('publishGalleryBtn2')?.addEventListener('click', publishToGallery);
    document.getElementById('exportGifBtn')?.addEventListener('click', exportToGif);
    document.getElementById('exportVideoBtn')?.addEventListener('click', exportToVideo);
    document.getElementById('exportVideoBtn2')?.addEventListener('click', exportToVideo);
    document.getElementById('exportVideoBtnDropdown')?.addEventListener('click', exportToVideo);
    document.getElementById('exportSpriteSheetBtn')?.addEventListener('click', exportToSpriteSheet);
    document.getElementById('stampSpriteBtn')?.addEventListener('click', showImportStampModal);
    document.getElementById('stampSpriteBtn2')?.addEventListener('click', showImportStampModal);
    document.getElementById('copyFrameBtn')?.addEventListener('click', copyCurrentFrame);
    document.getElementById('pasteFrameBtn')?.addEventListener('click', pasteFrame);
    document.getElementById('onionSkinBtn')?.addEventListener('click', showOnionSkinPanel);
    document.getElementById('historyBtn')?.addEventListener('click', showHistoryPanel);
    document.getElementById('gradientBtn')?.addEventListener('click', showGradientPanel);
    document.getElementById('textToolBtn')?.addEventListener('click', showTextTool);
    document.getElementById('helpBtn')?.addEventListener('click', showHelp);
    document.getElementById('creditsBtn')?.addEventListener('click', showCredits);
    // Gestion du profil : ouvrir le profil créatif OU la gestion du pseudo
    document.getElementById('profileBtn')?.addEventListener('click', () => {
        // Afficher un menu pour choisir entre profil créatif et pseudo
        showProfileMenu();
    });
    document.getElementById('profileBtnMobile')?.addEventListener('click', () => {
        // Afficher un menu pour choisir entre profil créatif et pseudo
        showProfileMenu();
    });
    document.getElementById('analyticsBtn')?.addEventListener('click', () => { window.location.href = '/admin.html'; });
    document.getElementById('analyticsBtnMobile')?.addEventListener('click', () => { window.location.href = '/admin.html'; });
    
    // Bouton nouvelle frame
    document.getElementById('addFrameBtn')?.addEventListener('click', addFrame);
    
    // Boutons gomme (desktop + mobile)
    document.querySelectorAll('#eraserBtn').forEach(btn => {
        btn.addEventListener('click', toggleEraser);
    });
    
    // Boutons pipette (desktop + mobile)
    document.querySelectorAll('#eyedropperBtn').forEach(btn => {
        btn.addEventListener('click', toggleEyedropper);
    });

    // Boutons fill (desktop + mobile)
    document.querySelectorAll('#fillBtn').forEach(btn => {
        btn.addEventListener('click', toggleFill);
    });

    // Boutons symétrie (desktop + mobile)
    document.querySelectorAll('#symmetryBtn').forEach(btn => {
        btn.addEventListener('click', toggleSymmetry);
    });

    // Boutons symétrie verticale (desktop + mobile)
    document.querySelectorAll('#symmetryVBtn').forEach(btn => {
        btn.addEventListener('click', toggleSymmetryV);
    });

    // Boutons sélection (desktop + mobile)
    document.querySelectorAll('#selectionBtn').forEach(btn => {
        btn.addEventListener('click', toggleSelection);
    });

    document.querySelectorAll('#cropStampBtn').forEach(btn => {
        btn.addEventListener('click', toggleCropStamp);
    });

    // Bouton export PNG frames
    document.getElementById('exportPngBtn')?.addEventListener('click', exportFramesAsPng);

    // Slider opacité référence (desktop + mobile)
    document.getElementById('refOpacitySlider')?.addEventListener('input', (e) => {
        referenceOpacity = parseFloat(e.target.value);
        const mobileSlider = document.getElementById('refOpacitySliderMobile');
        if (mobileSlider) mobileSlider.value = e.target.value;
        scheduleRender();
    });
    document.getElementById('refOpacitySliderMobile')?.addEventListener('input', (e) => {
        referenceOpacity = parseFloat(e.target.value);
        const desktopSlider = document.getElementById('refOpacitySlider');
        if (desktopSlider) desktopSlider.value = e.target.value;
        scheduleRender();
    });

    // Initialiser les handlers de déplacement référence
    _initReferenceMovHandlers();

    // Les raccourcis clavier sont gérés par handleKeyboardShortcuts()
    
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
    document.getElementById('exportSpriteSheetBtn2')?.addEventListener('click', () => {
        document.getElementById('exportSpriteSheetBtn')?.click();
    });
    document.getElementById('copyFrameBtn2')?.addEventListener('click', () => {
        document.getElementById('copyFrameBtn')?.click();
    });
    document.getElementById('pasteFrameBtn2')?.addEventListener('click', () => {
        document.getElementById('pasteFrameBtn')?.click();
    });
    document.getElementById('onionSkinBtn2')?.addEventListener('click', showOnionSkinPanel);
    document.getElementById('historyBtn2')?.addEventListener('click', showHistoryPanel);
    document.getElementById('gradientBtn2')?.addEventListener('click', showGradientPanel);
    document.getElementById('textToolBtn2')?.addEventListener('click', showTextTool);
    document.getElementById('helpBtn2')?.addEventListener('click', () => {
        document.getElementById('helpBtn')?.click();
    });
    document.getElementById('creditsBtn2')?.addEventListener('click', () => {
        document.getElementById('creditsBtn')?.click();
    });
    
    // Event listeners pour les nouveaux boutons copier/coller dans le bandeau des frames
    document.getElementById('copyFrameBtnMain')?.addEventListener('click', copyCurrentFrame);
    document.getElementById('pasteFrameBtnMain')?.addEventListener('click', pasteFrame);

    // Dupliquer N fois
    const _toggleDupPanel = (show) => {
        const panel = document.getElementById('duplicateFrameNPanel');
        if (!panel) return;
        panel.style.display = show ? 'flex' : 'none';
        if (show) document.getElementById('duplicateFrameNInput')?.focus();
    };
    document.getElementById('duplicateFrameNBtn')?.addEventListener('click', () => _toggleDupPanel(true));
    document.getElementById('duplicateFrameNBtnMobile')?.addEventListener('click', () => _toggleDupPanel(true));
    document.getElementById('duplicateFrameNCancel')?.addEventListener('click', () => _toggleDupPanel(false));
    document.getElementById('duplicateFrameNConfirm')?.addEventListener('click', () => {
        const input = document.getElementById('duplicateFrameNInput');
        const n = parseInt(input?.value, 10);
        if (!n || n < 1 || n > 99) {
            if (input) {
                input.style.borderColor = '#e74c3c';
                setTimeout(() => {
                    input.style.borderColor = '';
                    input.value = '';
                    _toggleDupPanel(false);
                }, 800);
            }
            return;
        }
        duplicateCurrentFrameN(n);
        if (input) input.value = '';
        _toggleDupPanel(false);
    });
    document.getElementById('duplicateFrameNInput')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') document.getElementById('duplicateFrameNConfirm')?.click();
        if (e.key === 'Escape') _toggleDupPanel(false);
    });
    
    // Initialiser les autres fonctionnalités
    initMobileFeatures();
    initImportSpriteSheetFeature();
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
    // Réacquérir silencieusement le dossier de travail s'il a déjà été choisi
    _ensureWorkspaceDir().catch(() => {});

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
    initButtonTooltips();
    // Initialiser le modal FPS
    initFPSModal();

    // Initialiser la modal de taille de grille
    initGridSizeModal();
    document.getElementById('gridSizeBtn')?.addEventListener('click', showGridSizeModal);
    document.getElementById('gridSizeBtnSidebar')?.addEventListener('click', showGridSizeModal);
    updateGridSizeIndicator(currentGridSize);
    
    // Initialiser la fonctionnalité Photo → Pixel Art
    initPhotoToPixelFeature();

    // Initialiser l'historique undo/redo APRÈS que la grille soit prête
    setTimeout(() => {
        initHistory();
    }, 100);
    
    // Nettoyage unique du localStorage au démarrage pour libérer l'espace occupé par les anciennes données lourdes
    try {
        if (!localStorage.getItem('_lsCleanedV3')) {
            localStorage.removeItem('pixelEditor_autoSaveProjects');
            // Supprimer toutes les sauvegardes pixelart_* (peuvent être non-sparse et très lourdes)
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i);
                if (k && k.startsWith('pixelart_')) keysToRemove.push(k);
            }
            keysToRemove.forEach(k => localStorage.removeItem(k));
            localStorage.removeItem('_lsCleanedV2');
            localStorage.setItem('_lsCleanedV3', '1');
            console.log('🧹 localStorage nettoyé (migration V3)');
        }
    } catch (_) {}

    // Charger les données (Supabase + localStorage en fallback)
    loadSupabaseProjects().catch(() => loadAutoSaveProjects());
    
    // Nettoyage initial pour s'assurer qu'aucun élément indésirable n'existe
    cleanUpOutsideElements();
    
    // Désactiver le bouton coller par défaut
    const pasteBtn = document.getElementById('pasteFrameBtn');
    if (pasteBtn) {
        pasteBtn.disabled = !copiedFrame;
    }
    
    initLayersFromFrames();
    updateFramesList();
    loadFrame(0);

    // Système de raccourcis clavier complet
    document.addEventListener('keydown', handleKeyboardShortcuts);

    // Phase 3 : stopper le dessin si la souris relâche hors de la grille
    document.addEventListener('mouseup', stopDrawing);
    
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
            const confirmMessage = `${tL('sharedDetected')}\n\n"${project.name || tL('sharedProject')}"\n${project.frames ? project.frames.length : 0} frame(s)\n\n${tL('sharedOpenQuestion')}`;

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
async function importProjectData(projectData) {
    try {
        // Si frames est un pointer Storage { _url }, le récupérer d'abord
        if (projectData.frames && projectData.frames._url) {
            try {
                const resp = await fetch(projectData.frames._url);
                if (resp.ok) projectData.frames = await resp.json();
            } catch (e) {
                console.warn('Failed to fetch frames from URL:', e);
            }
        }

        // Valider les données
        if (!projectData.frames || !Array.isArray(projectData.frames)) {
            throw new Error('Données de projet invalides');
        }
        
        // Restaurer la taille de grille AVANT normaliseFrames()
        if (projectData.gridSize) {
            const savedSize = projectData.gridSize.width || projectData.gridSize.height || DEFAULT_GRID_SIZE;
            if (VALID_GRID_SIZES.includes(savedSize) && savedSize !== currentGridSize) {
                currentGridSize = savedSize;
                initGrid(savedSize);
                updateGridSizeIndicator(savedSize);
                updateGridSizeBtnStates(savedSize);
            }
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
        
        // Mettre à jour l'affichage des couleurs personnalisées
        updateColorPalette();
        
        if (projectData.fps) {
            animationFPS = projectData.fps;
        }
        
        // Reconstruire les calques depuis les frames (pas de frameLayers dans les JSON exportés)
        initLayersFromFrames();
        currentLayer = 0;

        // Mettre à jour l'interface
        const title = document.getElementById('projectTitle');
        if (title) {
            title.textContent = projectData.name || projectData.projectName || 'Projet partagé';
        }

        updateFramesList();
        loadFrame(currentFrame);
        
        // Notification de succès
        setTimeout(() => {
            showToast(tL('sharedProjectOpened', projectData.name || tL('sharedProject')), { type: 'success' });
        }, 500);
        
    } catch (error) {
        console.error('Erreur lors de l\'import:', error);
        showToast(tL('sharedProjectError', error.message), { type: 'error', duration: 5000 });
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
        gridSize: { width: currentGridSize, height: currentGridSize },
        totalFrames: frames.length,
        
        // Signature pour vérifier l'intégrité
        signature: 'pixel-art-editor-v2'
    };
    
    return projectData;
}

// Publier le projet courant dans la galerie publique
async function publishToGallery() {
    if (!window.dbService) {
        showToast(tL('notAuthenticated') || 'Connexion requise', { type: 'warning' });
        return;
    }

    if (!window.currentProjectName) {
        showToast(tL('saveBeforePublish') || '⚠️ Sauvegardez d\'abord votre projet avant de le publier', { type: 'warning', duration: 4000 });
        return;
    }

    saveCurrentFrame();
    showToast('⏳ Publication en cours…', { type: 'info', duration: 10000, id: 'publish-progress' });

    try {
        // Le projet est en IndexedDB — on doit d'abord le synchroniser dans Supabase
        // pour que la galerie puisse y accéder. On fait un upsert léger (frames sparse inline).
        const thumbnail = window.dbService?.generateThumbnail?.() || null;
        const syncData = {
            name: window.currentProjectName,
            frames: frames.map(toSparseFrame),         // sparse = léger
            frameLayers: null,                          // pas nécessaire pour la galerie
            _nextLayerId: _nextLayerId,
            currentFrame,
            fps: animationFPS || 24,
            customPalette,
            customColors,
            thumbnail
        };

        // Upsert dans Supabase (sans Storage — frames inline sparse)
        const userId = window.dbService.getUserId();
        if (!userId) throw new Error('Non authentifié');

        const payload = {
            frames: syncData.frames,
            frame_layers: null,
            current_frame: syncData.currentFrame,
            fps: syncData.fps,
            custom_palette: syncData.customPalette,
            custom_colors: syncData.customColors ?? null,
            updated_at: new Date().toISOString()
        };
        if (thumbnail) payload.thumbnail = thumbnail;

        const supabase = window.dbService.supabase;
        const { error: upsertError } = await supabase
            .from('pixel_projects')
            .upsert({ user_id: userId, name: window.currentProjectName, ...payload }, { onConflict: 'user_id,name' });

        if (upsertError) throw upsertError;

        // Maintenant créer/mettre à jour le partage galerie
        const result = await window.dbService.createPublicShare(window.currentProjectName, { publishToGallery: true });
        dismissToast('publish-progress');

        if (result.success) {
            showToast('✅ Projet publié dans la galerie !', { type: 'success', duration: 5000 });
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        dismissToast('publish-progress');
        console.error('Erreur publication galerie:', error);
        showToast('❌ Erreur : ' + error.message, { type: 'error', duration: 5000 });
    }
}

// Partager un projet via Web Share API ou téléchargement
async function shareProject() {
    const projectData = createShareableProject();
    const jsonString = JSON.stringify(projectData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const fileName = `${projectData.name.replace(/[^a-zA-Z0-9]/g, '_')}_${timestamp}.json`;

    // Web Share API (AirDrop, iMessage, etc.)
    if (navigator.share && navigator.canShare) {
        const file = new File([blob], fileName, { type: 'application/json' });
        if (navigator.canShare({ files: [file] })) {
            try {
                await navigator.share({
                    title: `🎨 ${projectData.name} - Pixel Art`,
                    text: `Découvre mon animation pixel art !`,
                    files: [file]
                });
                return;
            } catch (error) {
                if (error.name === 'AbortError') return; // utilisateur a annulé
                console.error('Web Share API error:', error);
            }
        }
    }

    // Fallback : téléchargement direct
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(tL('projectDownloaded') || 'Fichier téléchargé', { type: 'success' });
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
        
        // Valider les données essentielles (accepte array ou objet { frames: [...] })
        const framesArray = Array.isArray(projectData.frames) ? projectData.frames
            : Array.isArray(projectData.frames?.frames) ? projectData.frames.frames : null;
        if (!framesArray || framesArray.length === 0) {
            throw new Error('Le projet ne contient pas de frames valides.');
        }

        // Confirmation avant import
        const projectName = projectData.name || 'Projet partagé';
        const frameCount = framesArray.length;
        const rawCustomColors = projectData.customColors || projectData.custom_colors;
        const hasCustomColors = rawCustomColors && (Array.isArray(rawCustomColors) ? rawCustomColors : []).length > 0;
        
        const customColorsCount = Array.isArray(rawCustomColors) ? rawCustomColors.length : 0;
        const confirmMessage = `${tL('importConfirmTitle', projectName)}\n\n${tL('importConfirmDetails')}\n• ${frameCount} frame${frameCount > 1 ? 's' : ''}\n• ${hasCustomColors ? tL('customColors', customColorsCount) : tL('baseColorsOnly')}\n• ${tL('createdOn')} ${projectData.created ? new Date(projectData.created).toLocaleDateString(tL('dateLocale')) : tL('unknownDate')}\n\n${tL('importWillReplace')}`;
        
        if (!confirm(confirmMessage)) {
            return;
        }
        
        // Importer le projet (normaliseFrames gère le sparse + divers formats)
        frames = normaliseFrames(projectData.frames);
        // Support snake_case (fichiers exportés depuis Supabase) et camelCase
        const rawCurrentFrame = projectData.currentFrame ?? projectData.current_frame ?? 0;
        currentFrame = Number.isInteger(rawCurrentFrame) ? rawCurrentFrame : 0;

        // Limiter currentFrame au nombre de frames disponibles
        if (currentFrame >= frames.length) {
            currentFrame = frames.length - 1;
        }

        // Importer les couleurs personnalisées (snake_case ou camelCase)
        const rawColors = projectData.customColors || projectData.custom_colors;
        if (rawColors) {
            customColors = [];
            const colorsArray = typeof rawColors === 'string' ? JSON.parse(rawColors) : rawColors;
            if (Array.isArray(colorsArray)) colorsArray.forEach(color => addCustomColor(color));
        }

        const rawPalette = projectData.customPalette || projectData.custom_palette;
        if (rawPalette) {
            const paletteArray = typeof rawPalette === 'string' ? JSON.parse(rawPalette) : rawPalette;
            if (Array.isArray(paletteArray)) {
                customPalette = paletteArray;
                updateCompactPalette();
            }
        }

        // Mettre à jour l'affichage des couleurs personnalisées
        updateColorPalette();

        if (projectData.fps) {
            animationFPS = projectData.fps;
        }

        // Reconstruire les calques (obligatoire avant loadFrame en mode canvas)
        const rawLayers = projectData.frameLayers || projectData.frame_layers;
        if (rawLayers && Array.isArray(rawLayers)) {
            frameLayers = decompressFrameLayers(rawLayers);
            _nextLayerId = projectData._nextLayerId || projectData.next_layer_id ||
                frameLayers.flat().reduce((m, l) => Math.max(m, (l.id || 0) + 1), 0);
        } else {
            initLayersFromFrames();
        }
        currentLayer = 0;

        // Restaurer les tampons s'ils sont inclus dans le fichier
        if (Array.isArray(projectData.stamps) && projectData.stamps.length > 0) {
            const restoredStamps = projectData.stamps.map(s => ({
                ...s,
                pixels: (s.pixels && s.pixels._sparse) ? fromSparseFrame(s.pixels) : (s.pixels || [])
            }));
            const existingIds = new Set((window.stamps || []).map(s => s.id));
            const newStamps = restoredStamps.filter(s => !existingIds.has(s.id));
            window.stamps = [...newStamps, ...(window.stamps || [])];
            _saveStamps();
            renderStampsList();
        }

        // Mettre à jour l'interface
        const title = document.getElementById('projectTitle');
        if (title) {
            title.textContent = projectName;
        }
        window.currentProjectName = projectName;

        updateFramesList();
        loadFrame(currentFrame);

        showToast(tL('importSuccess', projectName), { type: 'success' });
        
    } catch (error) {
        console.error('Erreur lors de l\'import:', error);
        showToast(tL('importError', error.message), { type: 'error', duration: 5000 });
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
                showToast(tL('invalidFileType'), { type: 'warning' });
            }
        }
    }
}

// Améliorer la fonction de chargement existante
async function loadFromFile() {
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

                <button id="importPixelArtBtn" class="load-option">
                    🖼️ Importer une image pixel art
                    <small>PNG, WebP, JPG, GIF — place l'image sur la grille sans modifier les pixels</small>
                </button>

                <button id="pasteProject" class="load-option">
                    📋 Coller depuis le presse-papier
                    <small>Si vous avez copié un lien de projet</small>
                </button>

                <div class="drop-zone" id="dropZoneLoad">
                    📤 Ou glissez-déposez un fichier .pixelart ou une image ici
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
    
    // Importer une image pixel art existante
    dialog.querySelector('#importPixelArtBtn').addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/png,image/webp,image/jpeg,image/gif,image/bmp,.png,.webp,.jpg,.jpeg,.gif,.bmp';

        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                try {
                    const result = await importPixelArtImage(file);
                    dialog.remove();
                    showToast(tL('imageImportSuccess', result.artW, result.artH, result.pixelSize, result.totalColors), { type: 'success', duration: 5000 });
                } catch (err) {
                    showToast(tL('imageImportError', err.message), { type: 'error', duration: 5000 });
                }
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
            
            showToast(tL('clipboardError'), { type: 'warning' });

        } catch (error) {
            showToast(tL('clipboardAccessError'), { type: 'error', duration: 5000 });
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

            // Image pixel art (PNG, WebP, JPG, GIF, BMP)
            if (file.type.startsWith('image/') ||
                file.name.endsWith('.png') ||
                file.name.endsWith('.webp') ||
                file.name.endsWith('.jpg') ||
                file.name.endsWith('.jpeg') ||
                file.name.endsWith('.gif') ||
                file.name.endsWith('.bmp')) {
                try {
                    const result = await importPixelArtImage(file);
                    dialog.remove();
                    showToast(tL('imageImportSuccess', result.artW, result.artH, result.pixelSize, result.totalColors), { type: 'success', duration: 5000 });
                } catch (err) {
                    showToast(tL('imageImportError', err.message), { type: 'error', duration: 5000 });
                }
            // Projet JSON / .pixelart / .txt
            } else if (file.type === 'application/json' ||
                file.type === 'text/plain' ||
                file.type === 'text/json' ||
                file.name.endsWith('.json') ||
                file.name.endsWith('.pixelart') ||
                file.name.endsWith('.txt')) {
                await importSharedProject(file);
                dialog.remove();
            } else {
                showToast(tL('unsupportedFormat'), { type: 'warning' });
            }
        }
    });
}

// ========================================
// IMPORT IMAGE PIXEL ART
// ========================================

/**
 * Détecte le facteur de zoom d'une image pixel art agrandie.
 * Ex : une image 320×320 qui est en réalité un pixel art 32×32 dessiné à ×10
 * retourne 10. Si l'image est déjà ≤ GRID_SIZE, retourne 1.
 */
function detectPixelBlockSize(width, height) {
    // L'image rentre déjà dans la grille → pas de réduction nécessaire
    if (width <= currentGridSize && height <= currentGridSize) return 1;

    // On cherche le plus petit facteur entier qui ramène LES DEUX dimensions à ≤ currentGridSize
    const minFactor = Math.ceil(Math.max(width, height) / currentGridSize);

    for (let factor = minFactor; factor <= Math.max(width, height); factor++) {
        if (width % factor === 0 && height % factor === 0) {
            const resultW = width / factor;
            const resultH = height / factor;
            if (resultW <= currentGridSize && resultH <= currentGridSize) {
                return factor;
            }
        }
    }

    // Fallback : facteur minimal pour entrer dans currentGridSize
    return minFactor;
}

/**
 * Importe une image pixel art (PNG, WebP, JPG, GIF, BMP) sur la grille.
 * Utilise le rendu nearest-neighbor (pas de lissage) pour préserver
 * les pixels exacts du pixel art. Centre l'image dans la grille.
 * Si l'art détecté est plus grand que la grille actuelle, propose de l'agrandir.
 */
async function importPixelArtImage(file) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
            img.onload = async () => {
                try {
                    const srcW = img.naturalWidth;
                    const srcH = img.naturalHeight;

                    // Détecter le facteur de zoom (ex: 320×320 → facteur 10 → art 32×32)
                    const pixelSize = detectPixelBlockSize(srcW, srcH);
                    let artW = Math.round(srcW / pixelSize);
                    let artH = Math.round(srcH / pixelSize);

                    // Si l'art est plus grand que la grille actuelle → proposer d'agrandir
                    const maxDim = Math.max(artW, artH);
                    if (maxDim > currentGridSize) {
                        const fittingSize = VALID_GRID_SIZES.find(s => s >= maxDim);
                        if (fittingSize) {
                            const ok = await showConfirmDialog(tL('imageResizeConfirm', artW, artH, currentGridSize, fittingSize));
                            if (ok) {
                                changeGridSize(fittingSize);
                                // reset frame after grid change so we write into a clean state
                                currentFrame = 0;
                            }
                        }
                    }

                    // Sécurité : jamais dépasser currentGridSize après éventuel changement
                    artW = Math.min(artW, currentGridSize);
                    artH = Math.min(artH, currentGridSize);

                    // Canvas à la taille réelle de l'art détecté
                    const canvas = document.createElement('canvas');
                    canvas.width = artW;
                    canvas.height = artH;
                    const ctx = canvas.getContext('2d');

                    // ⚠️ Désactiver TOTALEMENT le lissage → nearest-neighbor pixel perfect
                    ctx.imageSmoothingEnabled = false;
                    ctx.mozImageSmoothingEnabled = false;
                    ctx.webkitImageSmoothingEnabled = false;
                    ctx.msImageSmoothingEnabled = false;

                    // Dessiner l'image réduite sans interpolation
                    ctx.drawImage(img, 0, 0, artW, artH);

                    const imageData = ctx.getImageData(0, 0, artW, artH);
                    const pixels = imageData.data;

                    // Créer une frame vide à la taille courante
                    const newFrame = [];
                    for (let i = 0; i < currentGridSize * currentGridSize; i++) {
                        newFrame.push({ color: '#FFFFFF', isEmpty: true });
                    }

                    // Centrer l'image dans la grille si elle est plus petite
                    const offsetX = Math.floor((currentGridSize - artW) / 2);
                    const offsetY = Math.floor((currentGridSize - artH) / 2);

                    const colorsUsed = new Set();

                    for (let y = 0; y < artH; y++) {
                        for (let x = 0; x < artW; x++) {
                            const i = (y * artW + x) * 4;
                            const r = pixels[i];
                            const g = pixels[i + 1];
                            const b = pixels[i + 2];
                            const a = pixels[i + 3];

                            const gridX = x + offsetX;
                            const gridY = y + offsetY;

                            if (gridX >= 0 && gridX < currentGridSize && gridY >= 0 && gridY < currentGridSize) {
                                const gridIndex = gridY * currentGridSize + gridX;

                                if (a < 128) {
                                    newFrame[gridIndex] = { color: '#FFFFFF', isEmpty: true };
                                } else {
                                    const hex = '#' + [r, g, b]
                                        .map(v => v.toString(16).padStart(2, '0'))
                                        .join('')
                                        .toUpperCase();
                                    newFrame[gridIndex] = { color: hex, isEmpty: false };
                                    colorsUsed.add(hex);
                                }
                            }
                        }
                    }

                    // Appliquer la frame sur le calque actuel (multi-couches)
                    ensureFrameHasLayers(currentFrame);
                    currentLayer = 0;
                    frameLayers[currentFrame][currentLayer].pixels = newFrame.map(p => ({ ...p }));
                    frames[currentFrame] = computeComposite(currentFrame);
                    currentFrameBuffer = frameLayers[currentFrame][0].pixels.map(p => ({ ...p }));
                    // Forcer le recalcul de cellSize au cas où le canvas n'était pas encore visible
                    if (pixelCanvas && cellSize === 0) {
                        const grid = document.getElementById('pixelGrid');
                        const gw = grid ? (grid.clientWidth || 512) : 512;
                        pixelCanvas.width = gw;
                        pixelCanvas.height = gw;
                        cellSize = gw / currentGridSize;
                    }
                    updateFramesList();
                    renderCanvas();

                    // Ajouter les couleurs détectées à la palette personnalisée
                    colorsUsed.forEach(color => addCustomColor(color));
                    updateColorPalette();

                    resolve({
                        artW,
                        artH,
                        pixelSize,
                        totalColors: colorsUsed.size
                    });

                } catch (error) {
                    reject(error);
                }
            };

            img.onerror = () => reject(new Error('Impossible de charger l\'image. Vérifiez que le fichier est une image valide.'));
            img.src = e.target.result;
        };

        reader.onerror = () => reject(new Error('Erreur lors de la lecture du fichier.'));
        reader.readAsDataURL(file);
    });
}

// ========================================
// WATERMARK HELPER
// ========================================

function drawWatermark(ctx, width, height) {
    const text = 'pixel-editor.app';
    const fontSize = Math.max(7, Math.min(10, width / 30));
    ctx.save();
    ctx.font = `${fontSize}px -apple-system, BlinkMacSystemFont, sans-serif`;
    ctx.textBaseline = 'middle';
    const textWidth = ctx.measureText(text).width;
    const padX = fontSize * 0.5;
    const padY = fontSize * 0.3;
    const pillW = textWidth + padX * 2;
    const pillH = fontSize + padY * 2;
    const x = width - pillW - 4;
    const y = height - pillH - 4;
    // Fond très discret
    ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
    ctx.fillRect(x, y, pillW, pillH);
    // Texte blanc semi-transparent
    ctx.fillStyle = 'rgba(255, 255, 255, 0.70)';
    ctx.fillText(text, x + padX, y + pillH / 2);
    ctx.restore();
}

// ========================================
// EXPORT SPRITE SHEET
// ========================================

function exportToSpriteSheet() {
    if (frames.length === 0) {
        showToast(tL('ssNoFrames'), { type: 'warning' });
        return;
    }
    saveCurrentFrame();
    showSpriteSheetExportDialog();
}

function showSpriteSheetExportDialog() {
    const g = currentGridSize;
    const fc = frames.length;

    const exportContent = `
        <div class="gif-export-content">
            <h3>${tL('ssTitle')}</h3>
            <p>${tL('ssFrames', fc)}</p>

            <div class="gif-options">
                <div class="gif-option">
                    <label for="ssZoom">${tL('ssZoomLabel')}</label>
                    <select id="ssZoom">
                        <option value="1">${tL('ssZoom1', g)}</option>
                        <option value="4" selected>${tL('ssZoom4', g)}</option>
                        <option value="8">${tL('ssZoom8', g)}</option>
                        <option value="16">${tL('ssZoom16', g)}</option>
                    </select>
                </div>
                <div class="gif-option">
                    <label for="ssBg">${tL('ssBgLabel')}</label>
                    <select id="ssBg">
                        <option value="transparent" selected>${tL('ssBgTransparent')}</option>
                        <option value="white">${tL('ssBgWhite')}</option>
                        <option value="black">${tL('ssBgBlack')}</option>
                    </select>
                </div>
            </div>

            <div class="gif-preview">
                <p>${tL('ssPreviewLabel')} <span id="ssPreviewText">${tL('ssPreviewInfo', fc, g, 4)}</span></p>
                <div class="gif-preview-info">
                    <small>${tL('ssInfoGame')}</small>
                    <br><small>${tL('ssInfoTransparent')}</small>
                </div>
            </div>

            <div class="gif-option" style="margin-top:12px;">
                <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">
                    <input type="checkbox" id="ssWatermark" checked style="width:16px;height:16px;cursor:pointer;">
                    <span>${tL('wmLabel')}</span>
                </label>
                <small style="opacity:0.65;margin-left:24px;">${tL('wmHint')}</small>
            </div>

            <div class="dialog-buttons">
                <button id="createSpriteSheetBtn" class="dialog-button">${tL('ssExportBtn')}</button>
                <button id="cancelSpriteSheetBtn" class="dialog-button secondary">${tL('cancelBtn')}</button>
            </div>
        </div>
    `;

    const dialog = createMobileDialog(tL('ssDialogTitle'), exportContent);

    // Mettre à jour le texte de preview quand le zoom change
    dialog.querySelector('#ssZoom').addEventListener('change', (e) => {
        const z = parseInt(e.target.value, 10);
        dialog.querySelector('#ssPreviewText').textContent = tL('ssPreviewInfo', fc, g, z);
    });

    dialog.querySelector('#createSpriteSheetBtn').addEventListener('click', () => {
        const zoom = parseInt(dialog.querySelector('#ssZoom').value, 10);
        const bg = dialog.querySelector('#ssBg').value;
        const watermark = dialog.querySelector('#ssWatermark').checked;
        dialog.remove();
        createAndDownloadSpriteSheet(zoom, bg, watermark);
    });

    dialog.querySelector('#cancelSpriteSheetBtn').addEventListener('click', () => {
        dialog.remove();
    });
}

function createAndDownloadSpriteSheet(zoom, bg, watermark = false) {
    const g = currentGridSize;
    const frameSize = g * zoom;
    const cols = frames.length;

    const canvas = document.createElement('canvas');
    canvas.width = frameSize * cols;
    canvas.height = frameSize;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    // Fond
    if (bg === 'white') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (bg === 'black') {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    // transparent = rien à faire (canvas est transparent par défaut)

    // Dessiner chaque frame
    frames.forEach((frame, frameIndex) => {
        const offsetX = frameIndex * frameSize;
        if (!Array.isArray(frame)) return;
        frame.forEach((pixel, i) => {
            if (!pixel || pixel.isEmpty) return;
            const x = (i % g) * zoom + offsetX;
            const y = Math.floor(i / g) * zoom;
            ctx.fillStyle = pixel.color;
            ctx.fillRect(x, y, zoom, zoom);
        });
    });

    // Watermark optionnel
    if (watermark) drawWatermark(ctx, canvas.width, canvas.height);

    // Télécharger en PNG
    // Le nom encode la taille originale de la frame (cellules canvas) pour faciliter l'import.
    // Ex: "projet-spritesheet-32px-4x.png" → frame = 32 cellules canvas, zoom = 4
    const projectName = window.currentProjectName || 'sprite-sheet';
    const fileName = `${projectName}-spritesheet-${g}px${zoom > 1 ? '-' + zoom + 'x' : ''}.png`;
    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showNotification(tL('ssSuccess', fileName), 'success');
    }, 'image/png');
}

// ========================================
// EXPORT GIF ANIMÉ
// ========================================

// Exporter l'animation en GIF
async function exportToGif() {
    if (frames.length === 0) {
        showToast(tL('noFrames'), { type: 'warning' });
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
            <p>${tL('gifFrames', frames.length)}</p>

            <div class="gif-options">
                <div class="gif-option">
                    <label for="gifSize">${tL('gifSizeLabel')}</label>
                    <select id="gifSize">
                        <option value="128" selected>${tL('gifSmall')}</option>
                        <option value="256">${tL('gifMedium')}</option>
                        <option value="512">${tL('gifLarge')}</option>
                        <option value="1024">${tL('gifXLarge')}</option>
                    </select>
                </div>

                <div class="gif-option">
                    <label for="gifSpeed">${tL('gifSpeedLabel')}</label>
                    <select id="gifSpeed">
                        <option value="100">${tL('gifVeryFast')}</option>
                        <option value="200">${tL('gifFast')}</option>
                        <option value="300" selected>${tL('gifNormal')}</option>
                        <option value="500">${tL('gifSlow')}</option>
                        <option value="1000">${tL('gifVerySlow')}</option>
                    </select>
                </div>

                <div class="gif-option">
                    <label for="gifLoop">${tL('gifLoopLabel')}</label>
                    <select id="gifLoop">
                        <option value="0" selected>${tL('gifLoopInfinite')}</option>
                        <option value="1">1 fois</option>
                        <option value="3">3 fois</option>
                        <option value="5">5 fois</option>
                    </select>
                </div>

                <div class="gif-option">
                    <label for="gifQuality">${tL('gifQualityLabel')}</label>
                    <select id="gifQuality">
                        <option value="1">${tL('gifQualityMax')}</option>
                        <option value="5">${tL('gifQualityHigh')}</option>
                        <option value="10" selected>${tL('gifQualityMedium')}</option>
                        <option value="20">${tL('gifQualityFast')}</option>
                    </select>
                </div>
            </div>

            <div class="gif-preview">
                <p>${tL('gifPreviewLabel')} ${frames.length} frames</p>
                <div class="gif-preview-info">
                    <small>${tL('gifInfoLocal')}</small>
                    <br><small>${tL('gifInfoOptimized')}</small>
                    <br><small>${tL('gifInfoTime', frames.length)}</small>
                </div>
            </div>

            <div class="gif-option" style="margin-top:12px;">
                <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">
                    <input type="checkbox" id="gifWatermark" checked style="width:16px;height:16px;cursor:pointer;">
                    <span>${tL('wmLabel')}</span>
                </label>
                <small style="opacity:0.65;margin-left:24px;">${tL('wmHint')}</small>
            </div>

            <div class="dialog-buttons">
                <button id="createGifBtn" class="dialog-button">${tL('gifCreateBtn')}</button>
                <button id="cancelGifBtn" class="dialog-button secondary">${tL('cancelBtn')}</button>
            </div>
        </div>
    `;

    const dialog = createMobileDialog('🎬 Export GIF', exportContent);

    // Créer le GIF
    dialog.querySelector('#createGifBtn').addEventListener('click', async () => {
        const size = parseInt(dialog.querySelector('#gifSize').value, 10);
        const speed = parseInt(dialog.querySelector('#gifSpeed').value, 10);
        const repeat = parseInt(dialog.querySelector('#gifLoop').value, 10);
        const quality = parseInt(dialog.querySelector('#gifQuality').value, 10);
        const watermark = dialog.querySelector('#gifWatermark').checked;

        dialog.remove();
        await createAnimatedGif(size, speed, repeat, quality, watermark);
    });
    
    // Annuler
    dialog.querySelector('#cancelGifBtn').addEventListener('click', () => {
        dialog.remove();
    });
}

// Créer le GIF animé avec les paramètres choisis
async function createAnimatedGif(size, frameDelay, repeat, quality, watermark = false) {
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
        <div style="font-size: 1.2rem; margin-bottom: 5px;">${tL('gifCreating')}</div>
        <div id="progressText" style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 15px;">${tL('gifPreparing')}</div>
        <div style="background: rgba(255,255,255,0.3); border-radius: 10px; height: 8px; margin-bottom: 10px;">
            <div id="progressBar" style="background: white; height: 100%; border-radius: 10px; width: 0%; transition: width 0.3s;"></div>
        </div>
        <button id="cancelExportBtn" style="background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.5); color: white; padding: 8px 16px; border-radius: 6px; cursor: pointer;">${tL('cancelBtn')}</button>
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
        await createGifWithGifJS(frames, { size, frameDelay, repeat, quality }, progressText, progressBar, cancelled, watermark);
        if (!cancelled) progressDiv.remove();
    } catch (gifJsError) {
        console.error('❌ Échec gif.js:', gifJsError);
        progressDiv.remove();
        showToast('❌ Erreur GIF : ' + gifJsError.message, { type: 'error', duration: 7000 });
    }
}

// ========================================
// ========================================
// EXPORT VIDÉO (WebM / MP4 selon navigateur)
// ========================================

async function exportToVideo() {
    if (frames.length === 0) {
        showToast(tL('noFrames'), { type: 'warning' });
        return;
    }
    saveCurrentFrame();
    showVideoExportDialog();
}

function showVideoExportDialog() {
    const supported = typeof MediaRecorder !== 'undefined';
    if (!supported) {
        showToast('❌ Export vidéo non supporté par ce navigateur.', { type: 'error', duration: 5000 });
        return;
    }

    const mimeType = ['video/webm;codecs=vp9', 'video/webm', 'video/mp4']
        .find(m => MediaRecorder.isTypeSupported(m)) || null;
    if (!mimeType) {
        showToast('❌ Aucun format vidéo supporté par ce navigateur.', { type: 'error', duration: 5000 });
        return;
    }
    const ext = mimeType.includes('mp4') ? 'mp4' : 'webm';
    const lang = localStorage.getItem('lang') || 'fr';

    const dialog = createMobileDialog('🎥 Export Vidéo', `
        <div class="gif-export-content">
            <h3>🎥 Export Animation Vidéo</h3>
            <p>${frames.length} frame${frames.length > 1 ? 's' : ''} · format : <strong>.${ext}</strong></p>

            <div class="gif-options">
                <div class="gif-option">
                    <label for="videoSize">${lang === 'fr' ? 'Taille' : 'Size'}</label>
                    <select id="videoSize">
                        <option value="256">256 × 256</option>
                        <option value="512" selected>512 × 512</option>
                        <option value="1024">1024 × 1024</option>
                    </select>
                </div>
                <div class="gif-option">
                    <label for="videoFps">${lang === 'fr' ? 'Vitesse' : 'Speed'}</label>
                    <select id="videoFps">
                        <option value="4">${lang === 'fr' ? 'Lent (4 fps)' : 'Slow (4 fps)'}</option>
                        <option value="8">${lang === 'fr' ? 'Normal (8 fps)' : 'Normal (8 fps)'}</option>
                        <option value="12" selected>${lang === 'fr' ? 'Rapide (12 fps)' : 'Fast (12 fps)'}</option>
                        <option value="24">${lang === 'fr' ? 'Très rapide (24 fps)' : 'Very fast (24 fps)'}</option>
                    </select>
                </div>
                <div class="gif-option">
                    <label for="videoLoops">${lang === 'fr' ? 'Répétitions' : 'Loops'}</label>
                    <select id="videoLoops">
                        <option value="1">1×</option>
                        <option value="3" selected>3×</option>
                        <option value="5">5×</option>
                        <option value="10">10×</option>
                    </select>
                </div>
            </div>

            <p style="font-size:0.8rem;opacity:0.65;margin-top:8px;">
                ${lang === 'fr'
                    ? '⚠️ La vidéo est enregistrée en temps réel — elle prend autant de temps que l\'animation.'
                    : '⚠️ Video is recorded in real time — it takes as long as the animation.'}
            </p>

            <div class="dialog-buttons">
                <button id="createVideoBtn" class="dialog-button">🎥 ${lang === 'fr' ? 'Créer la vidéo' : 'Create video'}</button>
                <button id="cancelVideoBtn" class="dialog-button secondary">${tL('cancelBtn')}</button>
            </div>
        </div>
    `);

    dialog.querySelector('#createVideoBtn').addEventListener('click', async () => {
        const size = parseInt(dialog.querySelector('#videoSize').value, 10);
        const fps  = parseInt(dialog.querySelector('#videoFps').value, 10);
        const loops = parseInt(dialog.querySelector('#videoLoops').value, 10);
        dialog.remove();
        await createVideo(size, fps, loops, mimeType, ext);
    });
    dialog.querySelector('#cancelVideoBtn').addEventListener('click', () => dialog.remove());
}

async function createVideo(size, fps, loops, mimeType, ext) {
    const projectName = document.getElementById('projectTitle')?.textContent || 'animation';
    const frameDuration = Math.round(1000 / fps);
    const totalFrames = frames.length * loops;

    // Canvas offscreen
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Progress overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
        background:rgba(0,122,255,0.95);color:white;padding:20px 28px;border-radius:12px;
        text-align:center;z-index:10000;min-width:260px;font-family:-apple-system,sans-serif;`;
    overlay.innerHTML = `
        <div style="font-size:2rem;margin-bottom:8px;">🎥</div>
        <div id="vidProgressText" style="margin-bottom:12px;">Initialisation…</div>
        <div style="background:rgba(255,255,255,0.3);border-radius:10px;height:8px;margin-bottom:12px;">
            <div id="vidProgressBar" style="background:white;height:100%;border-radius:10px;width:0%;transition:width 0.2s;"></div>
        </div>
        <button id="cancelVidBtn" style="background:rgba(255,255,255,0.2);border:1px solid rgba(255,255,255,0.5);color:white;padding:6px 16px;border-radius:6px;cursor:pointer;">Annuler</button>
    `;
    document.body.appendChild(overlay);

    const progressText = overlay.querySelector('#vidProgressText');
    const progressBar  = overlay.querySelector('#vidProgressBar');
    let cancelled = false;
    overlay.querySelector('#cancelVidBtn').addEventListener('click', () => {
        cancelled = true;
        overlay.remove();
    });

    // Dessiner une frame pixel art sur le canvas
    function drawFrame(frameData) {
        const gs = currentGridSize;
        const px = size / gs;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, size, size);
        for (let i = 0; i < frameData.length; i++) {
            const p = frameData[i];
            if (!p || p.isEmpty) continue;
            ctx.fillStyle = p.color;
            ctx.fillRect((i % gs) * px, Math.floor(i / gs) * px, px, px);
        }
    }

    try {
        const stream = canvas.captureStream(fps);
        const recorder = new MediaRecorder(stream, { mimeType });
        const chunks = [];
        recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
        recorder.start(100); // collecte toutes les 100ms

        for (let loop = 0; loop < loops && !cancelled; loop++) {
            for (let f = 0; f < frames.length && !cancelled; f++) {
                drawFrame(frames[f]);
                const done = loop * frames.length + f + 1;
                const pct = Math.round((done / totalFrames) * 100);
                progressText.textContent = `Frame ${done} / ${totalFrames}`;
                progressBar.style.width = pct + '%';
                await new Promise(r => setTimeout(r, frameDuration));
            }
        }

        if (cancelled) return;

        progressText.textContent = 'Finalisation…';
        progressBar.style.width = '100%';

        recorder.stop();
        await new Promise(r => { recorder.onstop = r; });

        overlay.remove();

        const blob = new Blob(chunks, { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${projectName.replace(/[^a-zA-Z0-9]/g, '_')}.${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showToast(`✅ Vidéo .${ext} téléchargée !`, { type: 'success', duration: 4000 });

    } catch (err) {
        overlay.remove();
        console.error('❌ Erreur export vidéo:', err);
        showToast('❌ Erreur vidéo : ' + err.message, { type: 'error', duration: 5000 });
    }
}

// ========================================
// FONCTIONS EXPORT GIF AVEC SUPABASE
// ========================================

// Créer un GIF via Supabase Edge Function
async function createGifWithSupabase(frames, config) {
    try {
        
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
            showToast(tL('gifSuccessServer', fileName, frames.length, size, frameDelay), { type: 'success', duration: 5000 });
        }, 500);
        
        logUsageEvent('gif_exported', {
            name: projectName,
            frames: frames.length,
            size,
            frameDelay
        });
        
    } catch (error) {
        console.error('❌ Erreur téléchargement:', error);
        showToast(tL('gifDownloadError'), { type: 'error', duration: 5000 });
    }
}

// Créer un GIF avec gif.js (fallback)
async function createGifWithGifJS(frames, config, progressText, progressBar, cancelled, watermark = false) {
    return new Promise((resolve, reject) => {
        try {
            const { size, frameDelay, repeat, quality } = config;
            
            // Vérifier que gif.js est bien chargé
            if (typeof GIF === 'undefined') {
                reject(new Error('Bibliothèque GIF.js non chargée'));
                return;
            }
            
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
                
                // Watermark optionnel
                if (watermark) drawWatermark(ctx, size, size);

                // Ajouter la frame au GIF
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
            
            gif.on('finished', function(blob) {
                
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
                    showToast(tL('gifSuccessServer', fileName, frames.length, size, frameDelay), { type: 'success', duration: 5000 });
                }, 500);
                
                resolve(blob);
            });
            
            gif.on('progress', function(progress) {
                const percent = Math.round(progress * 100);
                const totalProgress = 60 + (progress * 40);
                progressText.textContent = `Génération GIF local... ${percent}%`;
                progressBar.style.width = `${totalProgress}%`;
            });
            
            gif.on('start', function() {
            });
            
            gif.on('abort', function() {
                reject(new Error('Génération locale annulée'));
            });
            
            gif.on('error', function(error) {
                console.error('❌ Erreur gif.js:', error);
                reject(new Error(`Erreur gif.js: ${error.message || 'Erreur inconnue'}`));
            });
            
            // Lancer la génération
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

// Affiche un menu pour choisir entre profil créatif et gestion du pseudo
function showProfileMenu() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 450px; width: 90%; background: linear-gradient(155deg, rgba(36, 48, 94, 0.98), rgba(28, 38, 80, 0.95)); border: 1px solid rgba(255, 255, 255, 0.2); color: rgba(255, 255, 255, 0.95);">
            <div style="padding: 20px; color: rgba(255, 255, 255, 0.95);">
                <h3 style="margin-top: 0; text-align: center; color: rgba(255, 255, 255, 0.98);">${tL('profileTitle')}</h3>
                <p style="text-align: center; margin-bottom: 20px; color: rgba(255, 255, 255, 0.85); font-size: 0.9em;">
                    ${tL('profileSubtitle')}
                </p>

                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <button id="profileCreativeBtn" style="padding: 15px; border: 2px solid rgba(255,255,255,0.3); border-radius: 8px; background: rgba(255,255,255,0.1); color: rgba(255, 255, 255, 0.95); cursor: pointer; font-weight: 600; text-align: left;">
                        <div style="font-size: 1.1em; margin-bottom: 4px;">${tL('profileCreativeTitle')}</div>
                        <div style="font-size: 0.85em; color: rgba(255, 255, 255, 0.7);">${tL('profileCreativeDesc')}</div>
                    </button>

                    <button id="profileUsernameBtn" style="padding: 15px; border: 2px solid rgba(255,255,255,0.3); border-radius: 8px; background: rgba(255,255,255,0.1); color: rgba(255, 255, 255, 0.95); cursor: pointer; font-weight: 600; text-align: left;">
                        <div style="font-size: 1.1em; margin-bottom: 4px;">${tL('profileUsernameTitle')}</div>
                        <div style="font-size: 0.85em; color: rgba(255, 255, 255, 0.7);">${tL('profileUsernameDesc')}</div>
                    </button>

                    ${window.showDirectoryPicker ? `<button id="profileFolderBtn" style="padding: 15px; border: 2px solid rgba(255,115,0,0.4); border-radius: 8px; background: rgba(255,115,0,0.08); color: rgba(255, 255, 255, 0.95); cursor: pointer; font-weight: 600; text-align: left;">
                        <div style="font-size: 1.1em; margin-bottom: 4px;">📁 Dossier de sauvegarde</div>
                        <div id="profileFolderDesc" style="font-size: 0.85em; color: rgba(255, 255, 255, 0.7);">Choisir le dossier où sauvegarder projets et tampons</div>
                    </button>` : ''}
                </div>

                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button id="cancelProfileMenuBtn" style="flex: 1; padding: 12px; border: 1px solid rgba(255,255,255,0.3); border-radius: 8px; background: rgba(255,255,255,0.1); color: rgba(255, 255, 255, 0.95); cursor: pointer; font-weight: 600;">
                        ${tL('cancelBtn')}
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Mettre à jour la description du dossier actuel
    const folderDescEl = modal.querySelector('#profileFolderDesc');
    _getWorkspaceDir(false).then(dir => {
        if (dir && folderDescEl) {
            folderDescEl.textContent = `Dossier actuel : ${dir.name} — Cliquer pour changer`;
        }
    });

    modal.querySelector('#profileCreativeBtn')?.addEventListener('click', () => {
        modal.remove();
        window.initUserProfileFlow(true);
    });

    modal.querySelector('#profileUsernameBtn')?.addEventListener('click', () => {
        modal.remove();
        if (typeof window.showUsernameDialog === 'function') {
            window.showUsernameDialog();
        } else {
            showToast(tL('profileUsernameNotLoaded'), { type: 'error', duration: 5000 });
        }
    });

    modal.querySelector('#profileFolderBtn')?.addEventListener('click', async () => {
        modal.remove();
        await chooseWorkspaceFolder();
    });

    modal.querySelector('#cancelProfileMenuBtn')?.addEventListener('click', () => {
        modal.remove();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Exposer la fonction globalement
window.showProfileMenu = showProfileMenu;

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
                showNotification(tL('profileUpdated'), 'success');
            } else {
                showToast(tL('profileUpdated'), { type: 'success' });
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
            showNotification(tL('profileSaveError'), 'error');
        } else {
            showToast(tL('profileSaveError'), { type: 'error', duration: 5000 });
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

/**
 * Met à jour l'affichage du profil utilisateur dans la barre du haut (avatar + pseudo)
 */
async function updateUserProfileDisplay() {
    try {
        const userEmail = window.authService?.getUserEmail() || '';
        const userProfileDisplay = document.getElementById('userProfileDisplay');
        const userAvatar = document.getElementById('userAvatar');
        const userName = document.getElementById('userName');
        
        if (!userProfileDisplay || !userAvatar || !userName) {
            console.warn('Éléments du profil utilisateur non trouvés');
            return;
        }
        
        // Ajouter l'event listener pour ouvrir le dropdown au clic (une seule fois)
        if (!userProfileDisplay.dataset.clickListenerAdded) {
            userProfileDisplay.style.cursor = 'pointer';
            userProfileDisplay.title = 'Cliquez pour gérer votre profil';
            
            const userDropdown = document.getElementById('userDropdown');
            const dropdownUserName = document.getElementById('dropdownUserName');
            
            if (!userDropdown) {
                console.warn('userDropdown non trouvé');
                return;
            }
            
            // Mettre à jour le nom dans le dropdown
            if (dropdownUserName && userName) {
                dropdownUserName.textContent = userName.textContent || 'Utilisateur';
            }
            
            // Toggle dropdown au clic
            userProfileDisplay.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                if (userDropdown) {
                    const isOpen = userDropdown.classList.contains('open');
                    userDropdown.classList.toggle('open');
                } else {
                    console.warn('userDropdown non trouvé dans le click handler');
                }
            });
            
            // Fermer le dropdown quand on clique ailleurs
            document.addEventListener('click', (e) => {
                if (userDropdown && !userProfileDisplay.contains(e.target) && !userDropdown.contains(e.target)) {
                    userDropdown.classList.remove('open');
                }
            });
            
            // Gérer les boutons du dropdown
            const profileBtn = document.getElementById('profileBtn');
            const logoutBtnDropdown = document.getElementById('logoutBtnDropdown');
            
            if (profileBtn) {
                profileBtn.addEventListener('click', () => {
                    userDropdown.classList.remove('open');
                    if (typeof window.initUserProfileFlow === 'function') {
                        window.initUserProfileFlow(true);
                    } else if (typeof showProfileMenu === 'function') {
                        showProfileMenu();
                    }
                });
            }
            
            if (logoutBtnDropdown) {
                logoutBtnDropdown.addEventListener('click', async () => {
                    userDropdown.classList.remove('open');
                    const logoutBtn = document.getElementById('logoutBtn');
                    if (logoutBtn) {
                        logoutBtn.click();
                    } else if (window.authService) {
                        const result = await window.authService.signOut();
                        if (result.success) {
                            window.location.href = '/login.html';
                        }
                    }
                });
            }
            
            // Connecter les boutons du dropdown aux fonctions existantes
            const saveBtnDropdown = document.getElementById('saveBtnDropdown');
            const loadBtnDropdown = document.getElementById('loadBtnDropdown');
            const loadLocalBtnDropdown = document.getElementById('loadLocalBtnDropdown');
            const exportGifBtnDropdown = document.getElementById('exportGifBtnDropdown');
            const photoToPixelBtnDropdown = document.getElementById('photoToPixelBtnDropdown');
            const templateBtnDropdown = document.getElementById('templateBtnDropdown');
            const publishTemplateBtnDropdown = document.getElementById('publishTemplateBtnDropdown');
            
            if (saveBtnDropdown) {
                saveBtnDropdown.addEventListener('click', () => {
                    userDropdown.classList.remove('open');
                    const saveBtn = document.getElementById('saveBtn') || document.getElementById('saveBtn2');
                    if (saveBtn) saveBtn.click();
                });
            }
            
            if (loadBtnDropdown) {
                loadBtnDropdown.addEventListener('click', () => {
                    userDropdown.classList.remove('open');
                    const loadBtn = document.getElementById('loadBtn') || document.getElementById('loadBtn2');
                    if (loadBtn) loadBtn.click();
                });
            }
            
            if (loadLocalBtnDropdown) {
                loadLocalBtnDropdown.addEventListener('click', () => {
                    userDropdown.classList.remove('open');
                    const loadLocalBtn = document.getElementById('loadLocalBtn') || document.getElementById('loadLocalBtn2');
                    if (loadLocalBtn) loadLocalBtn.click();
                });
            }
            
            if (exportGifBtnDropdown) {
                exportGifBtnDropdown.addEventListener('click', () => {
                    userDropdown.classList.remove('open');
                    const exportGifBtn = document.getElementById('exportGifBtn') || document.getElementById('exportGifBtn2');
                    if (exportGifBtn) exportGifBtn.click();
                });
            }

            const exportPngBtnDropdown = document.getElementById('exportPngBtnDropdown');
            if (exportPngBtnDropdown) {
                exportPngBtnDropdown.addEventListener('click', () => {
                    userDropdown.classList.remove('open');
                    exportFramesAsPng();
                });
            }

            const exportSpriteSheetBtnDropdown = document.getElementById('exportSpriteSheetBtnDropdown');
            if (exportSpriteSheetBtnDropdown) {
                exportSpriteSheetBtnDropdown.addEventListener('click', () => {
                    userDropdown.classList.remove('open');
                    const ssBtn = document.getElementById('exportSpriteSheetBtn') || document.getElementById('exportSpriteSheetBtn2');
                    if (ssBtn) ssBtn.click();
                });
            }

            const importSpriteSheetBtnDropdown = document.getElementById('importSpriteSheetBtnDropdown');
            if (importSpriteSheetBtnDropdown) {
                importSpriteSheetBtnDropdown.addEventListener('click', () => {
                    userDropdown.classList.remove('open');
                    showImportSpriteSheetDialog();
                });
            }

            const stampSpriteBtnDropdown = document.getElementById('stampSpriteBtnDropdown');
            if (stampSpriteBtnDropdown) {
                stampSpriteBtnDropdown.addEventListener('click', () => {
                    userDropdown.classList.remove('open');
                    showImportStampModal();
                });
            }

            const shareProjectBtnDropdown = document.getElementById('shareProjectBtnDropdown');
            if (shareProjectBtnDropdown) {
                shareProjectBtnDropdown.addEventListener('click', () => {
                    userDropdown.classList.remove('open');
                    const shareBtn = document.getElementById('shareProjectBtn') || document.getElementById('shareProjectBtn2');
                    if (shareBtn) shareBtn.click();
                });
            }
            
            const loadRefBtnDropdown = document.getElementById('loadRefBtnDropdown');
            if (loadRefBtnDropdown) {
                loadRefBtnDropdown.addEventListener('click', () => {
                    userDropdown.classList.remove('open');
                    loadReferenceImage();
                });
            }

            if (photoToPixelBtnDropdown) {
                photoToPixelBtnDropdown.addEventListener('click', () => {
                    userDropdown.classList.remove('open');
                    const photoToPixelBtn = document.getElementById('photoToPixelBtn') || document.getElementById('photoToPixelBtn2');
                    if (photoToPixelBtn) photoToPixelBtn.click();
                });
            }
            
            if (templateBtnDropdown) {
                templateBtnDropdown.addEventListener('click', () => {
                    userDropdown.classList.remove('open');
                    const templateBtn = document.getElementById('templateBtn') || document.getElementById('templateBtn2');
                    if (templateBtn) templateBtn.click();
                });
            }
            
            if (publishTemplateBtnDropdown) {
                publishTemplateBtnDropdown.addEventListener('click', () => {
                    userDropdown.classList.remove('open');
                    const publishTemplateBtn = document.getElementById('publishTemplateBtn') || document.getElementById('publishTemplateBtnMobile');
                    if (publishTemplateBtn) publishTemplateBtn.click();
                });
            }
            
            const publishGalleryBtnDropdown = document.getElementById('publishGalleryBtnDropdown');
            if (publishGalleryBtnDropdown) {
                publishGalleryBtnDropdown.addEventListener('click', () => {
                    userDropdown.classList.remove('open');
                    publishToGallery();
                });
            }

            const galleryBtnDropdown = document.getElementById('galleryBtnDropdown');
            if (galleryBtnDropdown) {
                galleryBtnDropdown.addEventListener('click', () => {
                    userDropdown.classList.remove('open');
                    window.location.href = '/gallery.html';
                });
            }

            const helpBtnDropdown = document.getElementById('helpBtnDropdown');
            if (helpBtnDropdown) {
                helpBtnDropdown.addEventListener('click', () => {
                    userDropdown.classList.remove('open');
                    showHelp();
                });
            }

            const creditsBtnDropdown = document.getElementById('creditsBtnDropdown');
            if (creditsBtnDropdown) {
                creditsBtnDropdown.addEventListener('click', () => {
                    userDropdown.classList.remove('open');
                    showCredits();
                });
            }

            userProfileDisplay.dataset.clickListenerAdded = 'true';
        }
        
        // Mettre à jour le nom dans le dropdown si le profil change
        const dropdownUserName = document.getElementById('dropdownUserName');
        if (dropdownUserName && userName) {
            dropdownUserName.textContent = userName.textContent || 'Utilisateur';
        }
        
        // Charger le profil utilisateur
        if (window.dbService) {
            const profileResult = await window.dbService.getUserProfile();
            
            if (profileResult.success && profileResult.data) {
                const profile = profileResult.data;
                const username = profile.username || userEmail.split('@')[0] || 'Utilisateur';
                const avatarData = profile.avatar_data || null;
                const avatarSize = profile.avatar_size || 16;
                
                // Afficher l'avatar (desktop + mobile)
                const mobileUserAvatar = document.getElementById('mobileUserAvatar');
                if (window.generateAvatarPreview && avatarData) {
                    const avatarHTML = window.generateAvatarPreview(avatarData, avatarSize, 32);
                    userAvatar.innerHTML = avatarHTML;
                    if (mobileUserAvatar) mobileUserAvatar.innerHTML = avatarHTML;
                } else {
                    // Fallback : icône par défaut
                    const fallbackAvatar = '<div style="width: 32px; height: 32px; background: #F0F0F2; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px;">👤</div>';
                    userAvatar.innerHTML = fallbackAvatar;
                    if (mobileUserAvatar) mobileUserAvatar.innerHTML = fallbackAvatar;
                }
                
                // Afficher le pseudo
                userName.textContent = username;
                userName.title = userEmail; // Email en tooltip
                
                // Mettre à jour le nom dans le dropdown
                const dropdownUserName = document.getElementById('dropdownUserName');
                if (dropdownUserName) {
                    dropdownUserName.textContent = username;
                }
            } else {
                // Pas de profil, afficher l'email
                const fallbackAvatar = '<div style="width: 32px; height: 32px; background: #F0F0F2; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px;">👤</div>';
                userAvatar.innerHTML = fallbackAvatar;
                const mobileUserAvatar = document.getElementById('mobileUserAvatar');
                if (mobileUserAvatar) mobileUserAvatar.innerHTML = fallbackAvatar;
                
                const fallbackUsername = userEmail.split('@')[0] || 'Utilisateur';
                userName.textContent = fallbackUsername;
                userName.title = userEmail;
                
                // Mettre à jour le nom dans le dropdown
                const dropdownUserName = document.getElementById('dropdownUserName');
                if (dropdownUserName) {
                    dropdownUserName.textContent = fallbackUsername;
                }
            }
        } else {
            // Fallback si dbService n'est pas disponible
            const fallbackAvatar = '<div style="width: 32px; height: 32px; background: #F0F0F2; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px;">👤</div>';
            userAvatar.innerHTML = fallbackAvatar;
            const mobileUserAvatar = document.getElementById('mobileUserAvatar');
            if (mobileUserAvatar) mobileUserAvatar.innerHTML = fallbackAvatar;
            
            const fallbackUsername = userEmail.split('@')[0] || 'Utilisateur';
            userName.textContent = fallbackUsername;
            userName.title = userEmail;
            
            // Mettre à jour le nom dans le dropdown
            const dropdownUserName = document.getElementById('dropdownUserName');
            if (dropdownUserName) {
                dropdownUserName.textContent = fallbackUsername;
            }
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'affichage du profil:', error);
        // Fallback en cas d'erreur
        const userEmail = window.authService?.getUserEmail() || '';
        const userName = document.getElementById('userName');
        if (userName) {
            userName.textContent = userEmail.split('@')[0] || 'Utilisateur';
            userName.title = userEmail;
        }
    }
}

// Exposer la fonction globalement
window.updateUserProfileDisplay = updateUserProfileDisplay;


// ============================================================
// Fonctionnalité Photo → Pixel Art
// ============================================================

function initPhotoToPixelFeature() {
    const photoBtn = document.getElementById('photoToPixelBtn');
    const photoBtn2 = document.getElementById('photoToPixelBtn2');
    if (photoBtn) photoBtn.addEventListener('click', showPhotoToPixelDialog);
    if (photoBtn2) photoBtn2.addEventListener('click', showPhotoToPixelDialog);
}

function showPhotoToPixelDialog() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';

    const content = document.createElement('div');
    content.className = 'modal-content';
    content.style.cssText = 'max-width:500px;width:90%;background:linear-gradient(155deg,rgba(36,48,94,.98),rgba(28,38,80,.95));border:1px solid rgba(255,255,255,.2);border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,.6);padding:20px;color:rgba(255,255,255,.95)';

    const title = document.createElement('h3');
    title.textContent = '📷 Convertir une photo en Pixel Art';
    title.style.cssText = 'margin-top:0;text-align:center;color:rgba(255,255,255,.98);font-weight:600';

    const fileLabel = document.createElement('label');
    fileLabel.textContent = 'Sélectionner une image :';
    fileLabel.style.cssText = 'display:block;margin-bottom:10px;font-weight:600';
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'photoInput';
    fileInput.accept = 'image/*';
    fileInput.style.cssText = 'width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,.3);background:rgba(255,255,255,.1);color:rgba(255,255,255,.95);font-size:14px;box-sizing:border-box';

    const modeLabel = document.createElement('label');
    modeLabel.textContent = 'Mode de conversion :';
    modeLabel.style.cssText = 'display:block;margin:15px 0 10px;font-weight:600';
    const modeSelect = document.createElement('select');
    modeSelect.id = 'conversionMode';
    modeSelect.style.cssText = 'width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,.3);background:rgba(36,48,94,.98);color:rgba(255,255,255,.95);font-size:14px';
    [['simple', '⚡ Simple (conversion directe)'], ['quantized', '🎨 Avancé (quantification de couleurs)']].forEach(([val, txt]) => {
        const opt = document.createElement('option');
        opt.value = val;
        opt.textContent = txt;
        modeSelect.appendChild(opt);
    });

    const advancedDiv = document.createElement('div');
    advancedDiv.style.display = 'none';

    const colorLabel = document.createElement('label');
    colorLabel.textContent = 'Nombre de couleurs :';
    colorLabel.style.cssText = 'display:block;margin-bottom:10px;font-weight:600';
    const colorSelect = document.createElement('select');
    colorSelect.id = 'colorCount';
    colorSelect.style.cssText = 'width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,.3);background:rgba(36,48,94,.98);color:rgba(255,255,255,.95);font-size:14px';
    [['8','8 couleurs (style rétro)'],['16','16 couleurs (recommandé)'],['32','32 couleurs (plus détaillé)']].forEach(([val, txt]) => {
        const opt = document.createElement('option');
        opt.value = val;
        opt.textContent = txt;
        if (val === '16') opt.selected = true;
        colorSelect.appendChild(opt);
    });

    const contrastLabel = document.createElement('label');
    contrastLabel.textContent = 'Contraste :';
    contrastLabel.style.cssText = 'display:block;margin:15px 0 10px;font-weight:600';
    const contrastSlider = document.createElement('input');
    contrastSlider.type = 'range';
    contrastSlider.min = '0'; contrastSlider.max = '200'; contrastSlider.value = '100';
    contrastSlider.style.width = '100%';
    const contrastValue = document.createElement('span');
    contrastValue.textContent = '100%';
    contrastValue.style.cssText = 'display:block;text-align:center;margin-top:5px';

    const brightnessLabel = document.createElement('label');
    brightnessLabel.textContent = 'Luminosité :';
    brightnessLabel.style.cssText = 'display:block;margin:15px 0 10px;font-weight:600';
    const brightnessSlider = document.createElement('input');
    brightnessSlider.type = 'range';
    brightnessSlider.min = '0'; brightnessSlider.max = '200'; brightnessSlider.value = '100';
    brightnessSlider.style.width = '100%';
    const brightnessValue = document.createElement('span');
    brightnessValue.textContent = '100%';
    brightnessValue.style.cssText = 'display:block;text-align:center;margin-top:5px';

    advancedDiv.append(colorLabel, colorSelect, contrastLabel, contrastSlider, contrastValue, brightnessLabel, brightnessSlider, brightnessValue);

    const tip = document.createElement('div');
    tip.style.cssText = 'margin:20px 0;padding:15px;background:rgba(0,122,255,.3);border-radius:8px;border:1px solid rgba(0,122,255,.5);font-size:.9rem';
    const tipText = document.createElement('p');
    tipText.style.margin = '0';
    tipText.innerHTML = '💡 <strong>Astuce :</strong> Le mode avancé réduit le nombre de couleurs pour un rendu plus "pixel art" authentique.';
    tip.appendChild(tipText);

    const btnRow = document.createElement('div');
    btnRow.style.cssText = 'display:flex;gap:10px;margin-top:20px';
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Annuler';
    cancelBtn.style.cssText = 'flex:1;padding:12px;border:1px solid rgba(255,255,255,.3);border-radius:8px;background:rgba(255,255,255,.1);color:rgba(255,255,255,.95);cursor:pointer;font-weight:600';
    const convertBtn = document.createElement('button');
    convertBtn.textContent = 'Convertir';
    convertBtn.disabled = true;
    convertBtn.style.cssText = 'flex:1;padding:12px;border:none;border-radius:8px;background:linear-gradient(135deg,#FF6B6B,#FF8E53);color:#fff;cursor:pointer;font-weight:600';
    btnRow.append(cancelBtn, convertBtn);

    content.append(title, fileLabel, fileInput, modeLabel, modeSelect, advancedDiv, tip, btnRow);
    modal.appendChild(content);
    document.body.appendChild(modal);

    modeSelect.addEventListener('change', e => {
        advancedDiv.style.display = e.target.value === 'quantized' ? 'block' : 'none';
    });
    contrastSlider.addEventListener('input', e => { contrastValue.textContent = e.target.value + '%'; });
    brightnessSlider.addEventListener('input', e => { brightnessValue.textContent = e.target.value + '%'; });
    fileInput.addEventListener('change', e => { convertBtn.disabled = !e.target.files || !e.target.files.length; });
    cancelBtn.addEventListener('click', () => modal.remove());

    convertBtn.addEventListener('click', async () => {
        const file = fileInput.files[0];
        if (!file) { showToast(tL('selectImageFirst') || 'Veuillez sélectionner une image', { type: 'warning' }); return; }

        const mode = modeSelect.value;
        const colorCount = parseInt(colorSelect.value, 10);
        const contrast = parseInt(contrastSlider.value, 10) / 100;
        const brightness = parseInt(brightnessSlider.value, 10) / 100;

        convertBtn.disabled = true;
        convertBtn.textContent = '⏳ Conversion...';

        try {
            const result = await convertPhotoToPixelArt(file, mode, colorCount, contrast, brightness);
            modal.remove();
            let msg = '✅ Photo convertie avec succès !\n\n📊 Statistiques :\n';
            if (result) {
                msg += `- Couleurs uniques : ${result.totalColors}\n`;
                msg += `- Couleurs ajoutées à la palette : ${result.addedColors}\n`;
                if (result.defaultColors > 0) msg += `- Couleurs de base (non ajoutées) : ${result.defaultColors}\n`;
            }
            showToast(msg, { type: 'success', duration: 6000 });
        } catch (error) {
            console.error('Erreur lors de la conversion:', error);
            showToast('❌ Erreur lors de la conversion : ' + error.message, { type: 'error', duration: 5000 });
            convertBtn.disabled = false;
            convertBtn.textContent = 'Convertir';
        }
    });
}

function convertPhotoToPixelArt(file, mode, colorCount, contrast, brightness) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = e => {
            img.onload = () => {
                try {
                    const size = currentGridSize;
                    const canvas = document.createElement('canvas');
                    canvas.width = size;
                    canvas.height = size;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, size, size);

                    if (mode === 'quantized' && (contrast !== 1 || brightness !== 1)) {
                        _photoApplyAdjustments(ctx, size, size, contrast, brightness);
                    }

                    const imageData = ctx.getImageData(0, 0, size, size);
                    const pixels = imageData.data;
                    const newFrame = [];
                    const colorsUsed = new Set();

                    for (let i = 0; i < pixels.length; i += 4) {
                        let r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
                        const a = pixels[i + 3];
                        if (a < 128) { r = 255; g = 255; b = 255; }
                        if (mode === 'quantized') {
                            const q = _photoQuantizeColor(r, g, b, colorCount);
                            r = q.r; g = q.g; b = q.b;
                        }
                        const color = _photoRgbToHex(r, g, b);
                        newFrame.push({ color, isEmpty: false });
                        colorsUsed.add(color);
                    }

                    if (frames && frames.length > 0 && typeof currentFrame !== 'undefined') {
                        ensureFrameHasLayers(currentFrame);
                        currentLayer = 0;
                        frameLayers[currentFrame][0].pixels = newFrame.map(p => ({ ...p }));
                        frames[currentFrame] = computeComposite(currentFrame);
                        loadFrame(currentFrame);
                        updateFramesList();
                        const result = _photoAddColorsToPalette(Array.from(colorsUsed));
                        resolve(result);
                    } else {
                        reject(new Error('Impossible d\'accéder aux frames'));
                    }
                } catch (err) {
                    reject(err);
                }
            };
            img.onerror = () => reject(new Error('Impossible de charger l\'image'));
            img.src = e.target.result;
        };
        reader.onerror = () => reject(new Error('Erreur lors de la lecture du fichier'));
        reader.readAsDataURL(file);
    });
}

function _photoApplyAdjustments(ctx, width, height, contrast, brightness) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        data[i]   = Math.max(0, Math.min(255, ((data[i]   - 128) * contrast) + 128));
        data[i+1] = Math.max(0, Math.min(255, ((data[i+1] - 128) * contrast) + 128));
        data[i+2] = Math.max(0, Math.min(255, ((data[i+2] - 128) * contrast) + 128));
        data[i]   = Math.max(0, Math.min(255, data[i]   * brightness));
        data[i+1] = Math.max(0, Math.min(255, data[i+1] * brightness));
        data[i+2] = Math.max(0, Math.min(255, data[i+2] * brightness));
    }
    ctx.putImageData(imageData, 0, 0);
}

function _photoQuantizeColor(r, g, b, colorCount) {
    const levels = Math.sqrt(colorCount);
    const step = 255 / (levels - 1);
    return {
        r: Math.max(0, Math.min(255, Math.round(r / step) * step)),
        g: Math.max(0, Math.min(255, Math.round(g / step) * step)),
        b: Math.max(0, Math.min(255, Math.round(b / step) * step))
    };
}

function _photoRgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
        const h = Math.round(x).toString(16);
        return h.length === 1 ? '0' + h : h;
    }).join('').toUpperCase();
}

function _photoAddColorsToPalette(colors) {
    const defaultColors = ['#000000','#FFFFFF','#FF0000','#00FF00','#0000FF','#FFFF00','#FF00FF','#00FFFF'];
    const stats = { totalColors: colors.length, addedColors: 0, skippedColors: 0, defaultColors: 0 };
    const photoLimit = 64;

    colors.forEach(color => {
        const c = color.startsWith('#') ? color.toUpperCase() : '#' + color.toUpperCase();
        if (defaultColors.includes(c)) { stats.defaultColors++; return; }
        if (customColors.includes(c)) { stats.skippedColors++; return; }
        if (customColors.length < photoLimit) { customColors.push(c); stats.addedColors++; }
    });

    if (typeof updateColorPalette === 'function') updateColorPalette();
    if (typeof updateCompactPalette === 'function') updateCompactPalette();
    if (typeof saveCustomColors === 'function') saveCustomColors();
    return stats;
}

// ─── Stamps / Tampons ────────────────────────────────────────────────────────

window.stamps = window.stamps || [];
let _stampsFileHandle = null; // FileSystemFileHandle vers stamps.pixelstamps

// Récupère le FileHandle du fichier tampons depuis IndexedDB
async function _loadStampsFileHandle() {
    try {
        const db = await new Promise((resolve, reject) => {
            const req = indexedDB.open('pixelEditorFileHandles', 1);
            req.onupgradeneeded = e => e.target.result.createObjectStore('handles');
            req.onsuccess = e => resolve(e.target.result);
            req.onerror = reject;
        });
        return await new Promise((resolve, reject) => {
            const tx = db.transaction('handles', 'readonly');
            const req = tx.objectStore('handles').get('__stamps__');
            req.onsuccess = e => resolve(e.target.result || null);
            req.onerror = reject;
        });
    } catch (_) { return null; }
}

async function _storeStampsFileHandle(handle) {
    try {
        const db = await new Promise((resolve, reject) => {
            const req = indexedDB.open('pixelEditorFileHandles', 1);
            req.onupgradeneeded = e => e.target.result.createObjectStore('handles');
            req.onsuccess = e => resolve(e.target.result);
            req.onerror = reject;
        });
        await new Promise((resolve, reject) => {
            const tx = db.transaction('handles', 'readwrite');
            tx.objectStore('handles').put(handle, '__stamps__');
            tx.oncomplete = resolve;
            tx.onerror = reject;
        });
    } catch (_) {}
}

// Sérialise et écrit les tampons dans le fichier sur le disque
async function _writeStampsToDisk() {
    const data = (window.stamps || []).map(s => ({
        ...s,
        pixels: toSparseFrame(s.pixels || [])
    }));
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    try {
        const writable = await _stampsFileHandle.createWritable();
        await writable.write(blob);
        await writable.close();
    } catch (_) {}
}

// Charge les tampons depuis le disque au démarrage (silencieux)
function _loadStamps() {
    localStorage.removeItem('pixelEditor_stamps');
    window.stamps = [];
    // Essayer workspace en priorité, puis handle dédié
    _getWorkspaceDir(false).then(async workDir => {
        if (workDir) {
            try {
                const tamponsDir = await workDir.getDirectoryHandle('tampons', { create: true });
                const fileHandle = await tamponsDir.getFileHandle('stamps.pixelstamps', { create: false }).catch(() => null);
                if (!fileHandle) return;
                const file = await fileHandle.getFile();
                const text = await file.text();
                if (!text.trim()) return;
                const parsed = JSON.parse(text);
                if (!Array.isArray(parsed)) return;
                window.stamps = parsed.map(s => ({
                    ...s,
                    pixels: (s.pixels && s.pixels._sparse) ? fromSparseFrame(s.pixels) : (s.pixels || [])
                }));
                renderStampsList();
                return;
            } catch (_) {}
        }
        // Fallback : handle dédié (ancien système)
        _loadStampsFileHandle().then(async handle => {
            if (!handle) return;
            try {
                const perm = await handle.queryPermission({ mode: 'readwrite' });
                if (perm !== 'granted') return;
                _stampsFileHandle = handle;
                const file = await handle.getFile();
                const text = await file.text();
                const parsed = JSON.parse(text);
                if (!Array.isArray(parsed)) return;
                window.stamps = parsed.map(s => ({
                    ...s,
                    pixels: (s.pixels && s.pixels._sparse) ? fromSparseFrame(s.pixels) : (s.pixels || [])
                }));
                renderStampsList();
            } catch (_) {}
        });
    });
}

// Sauvegarde les tampons sur le disque (workspace ou handle dédié)
async function _saveStamps() {
    const data = (window.stamps || []).map(s => ({
        ...s, pixels: toSparseFrame(s.pixels || [])
    }));
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });

    // Essayer workspace en priorité
    const workDir = await _getWorkspaceDir(false);
    if (workDir) {
        try {
            const tamponsDir = await workDir.getDirectoryHandle('tampons', { create: true });
            const fileHandle = await tamponsDir.getFileHandle('stamps.pixelstamps', { create: true });
            await _writeToHandle(fileHandle, blob);
            return;
        } catch (_) {}
    }

    // Fallback : handle dédié (ancien système)
    if (!_stampsFileHandle) return;
    await _writeStampsToDisk();
}

// Ouvre le dialogue pour charger les tampons depuis le disque (ou depuis workspace si configuré)
async function loadStampsFromDisk() {
    // Si workspace configuré → lire directement depuis tampons/
    const workDir = await _getWorkspaceDir(true);
    if (workDir) {
        try {
            const tamponsDir = await workDir.getDirectoryHandle('tampons', { create: true });
            let fileHandle;
            try {
                fileHandle = await tamponsDir.getFileHandle('stamps.pixelstamps', { create: false });
            } catch (_) {
                // Fichier n'existe pas encore : sera créé au prochain _saveStamps
                showToast('Aucun tampon trouvé dans le dossier tampons/ — ajoute des tampons avec +', { type: 'info', duration: 4000 });
                return;
            }
            const file = await fileHandle.getFile();
            const text = await file.text();
            if (text.trim()) {
                const parsed = JSON.parse(text);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    window.stamps = parsed.map(s => ({
                        ...s,
                        pixels: (s.pixels && s.pixels._sparse) ? fromSparseFrame(s.pixels) : (s.pixels || [])
                    }));
                    renderStampsList();
                    showToast(`✅ ${window.stamps.length} tampon(s) chargé(s)`, { type: 'success' });
                    return;
                }
            }
            showToast('Fichier tampons vide — ajoute des tampons avec +', { type: 'info' });
            return;
        } catch (e) {
            if (e.name !== 'AbortError') showToast(`❌ Erreur : ${e.message}`, { type: 'error' });
            return;
        }
    }

    if (!window.showSaveFilePicker && !window.showOpenFilePicker) {
        // Fallback : input file
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pixelstamps,.json';
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            try {
                const parsed = JSON.parse(await file.text());
                if (!Array.isArray(parsed)) throw new Error('Format invalide');
                window.stamps = parsed.map(s => ({
                    ...s,
                    pixels: (s.pixels && s.pixels._sparse) ? fromSparseFrame(s.pixels) : (s.pixels || [])
                }));
                renderStampsList();
                showToast(`✅ ${window.stamps.length} tampon(s) chargé(s)`, { type: 'success' });
            } catch (err) {
                showToast(`❌ ${err.message}`, { type: 'error' });
            }
        };
        input.click();
        return;
    }

    // Fallback : handle dédié (ancien système)
    if (!_stampsFileHandle) {
        _stampsFileHandle = await _loadStampsFileHandle();
        if (_stampsFileHandle) {
            try {
                const perm = await _stampsFileHandle.requestPermission({ mode: 'readwrite' });
                if (perm !== 'granted') _stampsFileHandle = null;
            } catch (_) { _stampsFileHandle = null; }
        }
    }

    if (!_stampsFileHandle) {
        try {
            _stampsFileHandle = await window.showSaveFilePicker({
                suggestedName: 'stamps.pixelstamps',
                startIn: 'documents',
                types: [{ description: 'Pixel Art Stamps', accept: { 'application/json': ['.pixelstamps'] } }]
            });
            await _storeStampsFileHandle(_stampsFileHandle);
        } catch (e) {
            if (e.name === 'AbortError') return;
            throw e;
        }
    }

    try {
        const file = await _stampsFileHandle.getFile();
        const text = await file.text();
        if (text.trim()) {
            const parsed = JSON.parse(text);
            if (Array.isArray(parsed) && parsed.length > 0) {
                window.stamps = parsed.map(s => ({
                    ...s,
                    pixels: (s.pixels && s.pixels._sparse) ? fromSparseFrame(s.pixels) : (s.pixels || [])
                }));
                renderStampsList();
                showToast(`✅ ${window.stamps.length} tampon(s) chargé(s)`, { type: 'success' });
                return;
            }
        }
    } catch (_) {}

    showToast('Fichier tampons prêt — ajoute des tampons avec +', { type: 'info' });
}

function saveCurrentDrawingAsStamp() {
    // Utilise le buffer live directement (plus fiable que frames[currentFrame])
    const pixels = currentFrameBuffer.map(p => p ? { ...p } : { color: '#FFFFFF', isEmpty: true });
    const hasContent = pixels.some(p => !p.isEmpty);
    if (!hasContent) {
        showToast('Le canvas est vide — dessine quelque chose d\'abord', { type: 'warning' });
        return;
    }
    _addStamp(pixels, `Frame ${currentFrame + 1}`);
}

function _addStamp(pixels, nameHint, gridSize) {
    // Détecter la vraie taille depuis le tableau si non fournie (évite currentGridSize incorrect)
    const detectedSize = Math.round(Math.sqrt((pixels || []).length));
    const stamp = {
        id: Date.now(),
        name: nameHint || `Tampon ${window.stamps.length + 1}`,
        pixels,
        gridSize: gridSize || (detectedSize > 0 ? detectedSize : currentGridSize),
        hidden: false
    };
    window.stamps.unshift(stamp);
    _saveStamps();
    renderStampsList();
    showToast(`Tampon "${stamp.name}" sauvegardé`, { type: 'success' });
    return stamp;
}

async function _saveStampAsProject(stamp) {
    const pixels = stamp.pixels || [];
    const sqrtSize = Math.round(Math.sqrt(pixels.length));
    const stored = stamp.gridSize;
    // Accepter la gridSize stockée si elle divise exactement pixels.length (tampon rectangulaire valide)
    // L'ancienne condition `stored <= sqrtSize * 2` rejetait les tampons larges et plats (ex: 32×6)
    const gs = (stored && pixels.length % stored === 0 && stored <= pixels.length)
        ? stored : (sqrtSize || currentGridSize);

    // Demander le nom — pré-remplir avec le nom du tampon
    const defaultName = stamp.name || `Tampon ${gs}x${Math.ceil(pixels.length / gs)}`;
    const fileNamePromise = showSaveDialog();
    // Pré-remplir le champ après que le dialog est injecté dans le DOM
    requestAnimationFrame(() => {
        const input = document.getElementById('saveFileName');
        if (input) input.value = defaultName;
    });
    const fileName = await fileNamePromise;
    if (!fileName) return;

    // Construire un projet single-frame à la taille exacte du tampon
    const normPx = pixels.map(px => {
        if (!px) return { color: '#FFFFFF', isEmpty: true };
        const color = px.color || '#FFFFFF';
        return { color, isEmpty: color === '#FFFFFF' ? (px.isEmpty !== false) : false };
    });

    const projectData = {
        name: fileName,
        frames: [normPx],
        _stampGridSize: gs,
        currentFrame: 0,
        fps: 24,
        customPalette: [],
        customColors: { _stampGridSize: gs },
        thumbnail: _stampThumbnailDataURL(normPx, gs),
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        version: '2.0',
        signature: 'pixel-art-editor-v2'
    };

    // Sauvegarder Supabase → fallback localStorage
    let saved = false;
    if (window.dbService) {
        try {
            const result = await window.dbService.saveProject(projectData);
            if (result.success) {
                saved = true;
                showToast(`"${fileName}" sauvegardé dans le cloud ☁️`, { type: 'success' });
            }
        } catch (e) { /* fallback ci-dessous */ }
    }
    if (!saved) {
        try {
            localStorage.setItem(`pixelart_${fileName}`, JSON.stringify(projectData));
            showToast(`"${fileName}" sauvegardé en local`, { type: 'success' });
        } catch (e) {
            showToast('Erreur lors de la sauvegarde', { type: 'error' });
        }
    }
}

function _stampThumbnailDataURL(pixels, gs) {
    try {
        const size = 64;
        const c = document.createElement('canvas');
        c.width = size; c.height = size;
        const ctx = c.getContext('2d');
        const h = Math.ceil(pixels.length / gs);
        const ps = size / Math.max(gs, h);
        pixels.forEach((px, i) => {
            if (!px || px.isEmpty) return;
            ctx.fillStyle = px.color;
            ctx.fillRect((i % gs) * ps, Math.floor(i / gs) * ps, ps, ps);
        });
        return c.toDataURL('image/png');
    } catch (e) { return ''; }
}

function showImportStampModal() {
    const allProjects = [];
    const dialog = _buildImportStampDialog(allProjects);

    // Charger depuis IndexedDB en arrière-plan
    window.localDB.getAllProjects().then(result => {
        if (!dialog.isConnected) return;
        const projects = (result.success && Array.isArray(result.data)) ? result.data : [];
        if (projects.length === 0) return;
        projects.forEach(p => allProjects.push({ ...p, _source: 'local' }));
        _refreshImportStampList(dialog, allProjects);
    }).catch(() => {});
}

function _getLocalProjects() {
    const projects = [];
    // Clés pixelart_* (sauvegardes manuelles)
    try {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('pixelart_')) {
                const raw = localStorage.getItem(key);
                if (raw) {
                    const p = JSON.parse(raw);
                    if (p && p.frames) projects.push({ ...p, name: p.name || key.replace('pixelart_', '') });
                }
            }
        }
    } catch (e) {}
    // Auto-save array
    try {
        const saved = localStorage.getItem('pixelEditor_autoSaveProjects');
        if (saved) {
            const arr = JSON.parse(saved);
            arr.forEach(p => { if (p && p.frames) projects.push(p); });
        }
    } catch (e) {}
    return projects;
}

function _buildImportStampDialog(allProjects) {
    const dialog = createMobileDialog('Importer un tampon', `
        <p style="font-size:0.85rem;color:rgba(255,255,255,0.6);margin-bottom:12px;">Choisissez un projet puis une frame à ajouter comme tampon.</p>
        <div id="importStampProjectList" class="projects-list" style="max-height:280px;overflow-y:auto;"></div>
        <div id="importStampFramePicker" style="display:none;margin-top:12px;">
            <p id="importStampFrameLabel" style="font-size:0.85rem;color:rgba(255,255,255,0.6);margin-bottom:8px;"></p>
            <div id="importStampFrameList" style="display:flex;flex-wrap:wrap;gap:6px;"></div>
        </div>
        <div style="margin-top:16px;display:flex;gap:8px;">
            <button id="importStampConfirmBtn" class="dialog-button" disabled>Ajouter comme tampon</button>
            <button id="importStampCancelBtn" class="dialog-button secondary">Annuler</button>
        </div>
    `);

    dialog._selectedProject = null;
    dialog._selectedFrame = 0;

    _refreshImportStampList(dialog, allProjects);

    dialog.querySelector('#importStampConfirmBtn').addEventListener('click', async () => {
        const project = dialog._selectedProject;
        if (!project) return;

        // Charger le projet complet pour avoir les pixels des frames
        let fullProject = project;
        if (!Array.isArray(project.frames) && project.name) {
            const confirmBtn = dialog.querySelector('#importStampConfirmBtn');
            if (confirmBtn) { confirmBtn.disabled = true; confirmBtn.textContent = 'Chargement…'; }
            try {
                const result = await window.localDB.loadProject(project.name);
                if (result.success && result.data) fullProject = result.data;
            } catch (e) { /* utiliser les données partielles */ }
        }

        const framesData = Array.isArray(fullProject.frames) ? fullProject.frames : [];
        const rawFrame = framesData[dialog._selectedFrame] || framesData[0] || [];
        const rawPx = Array.isArray(rawFrame) ? rawFrame : (rawFrame.pixels || []);
        // Ne PAS utiliser normaliseFrames (marque tout isEmpty:true) — normaliser par couleur
        const normalised = rawPx.map(px => {
            if (!px) return { color: '#FFFFFF', isEmpty: true };
            const color = px.color || '#FFFFFF';
            const empty = color === '#FFFFFF' ? (px.isEmpty !== false) : false;
            return { color, isEmpty: empty };
        });
        const name = (fullProject.name || project.name || 'Sans titre') + (framesData.length > 1 ? ` F${dialog._selectedFrame + 1}` : '');
        const cc = fullProject.custom_colors;
        const gridSize = (cc && typeof cc === 'object' && !Array.isArray(cc) ? cc._stampGridSize : null)
            || fullProject._stampGridSize
            || undefined;
        const stamp = _addStamp(normalised, name, gridSize);
        dialog.remove();
        // Entrer immédiatement en mode stamp (le tampon suit le curseur)
        activeStampId = stamp.id;
        enterStampMode(stamp.pixels, stamp.gridSize);
    });

    dialog.querySelector('#importStampCancelBtn').addEventListener('click', () => dialog.remove());
    return dialog;
}

function _refreshImportStampList(dialog, allProjects) {
    const list = dialog.querySelector('#importStampProjectList');
    if (!list) return;

    if (allProjects.length === 0) {
        list.innerHTML = `<div style="text-align:center;padding:24px;color:rgba(255,255,255,0.5);font-size:0.9rem;">
            Aucun projet local trouvé.<br>Sauvegarde via <strong>Fichier → Sauvegarder</strong> d'abord.
        </div>`;
        return;
    }

    // Attacher chaque projet directement à son élément DOM (évite les bugs d'index)
    list.innerHTML = allProjects.map((p, index) => {
        const name = p.name || 'Sans titre';
        const frameCount = Array.isArray(p.frames) ? p.frames.length : 1;
        const badge = p._source === 'cloud'
            ? '<span style="font-size:0.65rem;background:rgba(0,122,255,0.3);color:#5AC8FA;padding:1px 5px;border-radius:3px;margin-left:4px;">☁</span>'
            : '<span style="font-size:0.65rem;background:rgba(255,149,0,0.3);color:#FF9500;padding:1px 5px;border-radius:3px;margin-left:4px;">local</span>';
        const thumb = p.thumbnail
            ? `<img src="${p.thumbnail}" style="width:40px;height:40px;image-rendering:pixelated;border-radius:4px;background:#fff;">`
            : `<div style="width:40px;height:40px;background:rgba(255,255,255,0.1);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:18px;">🎨</div>`;
        return `<div class="project-item stamp-project-item" data-index="${index}" style="cursor:pointer;display:flex;align-items:center;gap:10px;padding:8px;">
            ${thumb}
            <div>
                <div style="font-weight:600;font-size:0.9rem;">${sanitize(name)}${badge}</div>
                <div style="font-size:0.75rem;color:rgba(255,255,255,0.5);">${frameCount} frame${frameCount > 1 ? 's' : ''}</div>
            </div>
        </div>`;
    }).join('');

    // Attacher les données projet directement aux éléments DOM (stable même si allProjects mute)
    list.querySelectorAll('.stamp-project-item').forEach((item, idx) => {
        item._project = allProjects[idx];
    });

    list.querySelectorAll('.stamp-project-item').forEach(item => {
        item.addEventListener('click', () => {
            list.querySelectorAll('.stamp-project-item').forEach(i => i.style.background = '');
            item.style.background = 'rgba(255,115,0,0.25)';
            dialog._selectedFrame = 0;
            dialog._selectedProject = item._project;

            const project = item._project;
            const framesData = Array.isArray(project.frames) ? project.frames : [];
            const framePicker = dialog.querySelector('#importStampFramePicker');
            const frameLabel = dialog.querySelector('#importStampFrameLabel');
            const frameList = dialog.querySelector('#importStampFrameList');

            frameList.innerHTML = '';
            if (framesData.length <= 1) {
                framePicker.style.display = 'none';
            } else {
                framePicker.style.display = 'block';
                frameLabel.textContent = `${framesData.length} frames — choisissez celle à utiliser`;
                framesData.forEach((frame, fi) => {
                    const c = document.createElement('canvas');
                    c.width = 48; c.height = 48;
                    c.style.cssText = `width:48px;height:48px;image-rendering:pixelated;border-radius:4px;cursor:pointer;border:2px solid ${fi === 0 ? '#FF7300' : 'transparent'};background:#fff;`;
                    const ctx = c.getContext('2d');
                    const rawPx = Array.isArray(frame) ? frame : (frame.pixels || []);
                    const gs = Math.round(Math.sqrt(rawPx.length)) || 32;
                    const ps = 48 / gs;
                    rawPx.forEach((px, i) => {
                        if (!px || px.isEmpty) return;
                        ctx.fillStyle = px.color || '#000';
                        ctx.fillRect((i % gs) * ps, Math.floor(i / gs) * ps, ps, ps);
                    });
                    c.addEventListener('click', () => {
                        frameList.querySelectorAll('canvas').forEach(cv => cv.style.borderColor = 'transparent');
                        c.style.borderColor = '#FF7300';
                        dialog._selectedFrame = fi;
                    });
                    frameList.appendChild(c);
                });
            }
            dialog.querySelector('#importStampConfirmBtn').disabled = false;
        });
    });
}

function _buildStampRow(stamp, index) {
    const row = document.createElement('div');
    const isActive = isStampMode && activeStampId === stamp.id;
    row.className = `stamp-row${isActive ? ' active' : ''}`;
    row.draggable = !_isTouch;
    row.dataset.stampIndex = index;
    row.title = 'Cliquer pour activer → puis cliquer sur le canvas pour placer';

    const handle = document.createElement('span');
    handle.className = 'stamp-drag-handle';
    handle.textContent = '⠿';

    const thumb = document.createElement('canvas');
    thumb.className = 'stamp-row-thumb';
    thumb.width = 28;
    thumb.height = 28;
    _drawFrameThumb(thumb, stamp.pixels, stamp.gridSize);

    const name = document.createElement('span');
    name.className = 'stamp-row-name';
    name.textContent = stamp.name;

    const saveBtn = document.createElement('button');
    saveBtn.className = 'stamp-row-del';
    saveBtn.title = 'Sauvegarder comme projet';
    saveBtn.innerHTML = '<i data-lucide="cloud-upload"></i>';
    saveBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        _saveStampAsProject(stamp);
    });

    const delBtn = document.createElement('button');
    delBtn.className = 'stamp-row-del';
    delBtn.title = 'Supprimer';
    delBtn.innerHTML = '<i data-lucide="trash-2"></i>';
    delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.stamps.splice(index, 1);
        _saveStamps();
        renderStampsList();
    });

    row.append(handle, thumb, name, saveBtn, delBtn);

    row.addEventListener('click', () => {
        activeStampId = stamp.id;
        const pixels = stamp.pixels || [];
        // Choisir la gridSize :
        // - stamp.gridSize est fiable si : elle divise pixels.length ET est ≤ 2×sqrt(pixels)
        //   (les anciens tampons corrompus ont gridSize >> sqrt, ex: 512 pour un 32×32 → rejeté)
        // - sinon on recalcule via sqrt (fonctionne pour les sprites carrés)
        const sqrtSize = Math.round(Math.sqrt(pixels.length));
        const stored = stamp.gridSize;
        const gs = (stored && pixels.length % stored === 0 && stored <= pixels.length)
            ? stored
            : (sqrtSize || currentGridSize);
        const normPx = pixels.map(px => {
            if (!px) return { color: '#FFFFFF', isEmpty: true };
            const color = px.color || '#FFFFFF';
            // Un pixel non-blanc est toujours non-vide (corrige données isEmpty corrompues)
            const empty = color === '#FFFFFF' ? (px.isEmpty !== false) : false;
            return { color, isEmpty: empty };
        });
        enterStampMode(normPx, gs);
        renderStampsList();
    });

    row.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', index);
        row.classList.add('frame-dragging');
    });
    row.addEventListener('dragend', () => {
        row.classList.remove('frame-dragging');
        document.querySelectorAll('.stamp-drop-above,.stamp-drop-below').forEach(el => {
            el.classList.remove('stamp-drop-above', 'stamp-drop-below');
        });
    });
    row.addEventListener('dragover', (e) => {
        e.preventDefault();
        const from = parseInt(e.dataTransfer.getData('text/plain'), 10);
        document.querySelectorAll('.stamp-drop-above,.stamp-drop-below').forEach(el => {
            el.classList.remove('stamp-drop-above', 'stamp-drop-below');
        });
        row.classList.add(index <= from ? 'stamp-drop-above' : 'stamp-drop-below');
    });
    row.addEventListener('dragleave', () => {
        row.classList.remove('stamp-drop-above', 'stamp-drop-below');
    });
    row.addEventListener('drop', (e) => {
        e.preventDefault();
        row.classList.remove('stamp-drop-above', 'stamp-drop-below');
        const from = parseInt(e.dataTransfer.getData('text/plain'), 10);
        if (from !== index) {
            const moved = window.stamps.splice(from, 1)[0];
            window.stamps.splice(index, 0, moved);
            _saveStamps();
            renderStampsList();
        }
    });

    return row;
}

function renderStampsList() {
    const list = document.getElementById('stampsList');
    if (!list) return;
    list.innerHTML = '';
    const mobileList = document.getElementById('stampsListMobile');
    if (mobileList) mobileList.innerHTML = '';

    if (window.stamps.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'stamps-empty';
        empty.textContent = 'Aucun tampon — dessine quelque chose puis clique +';
        list.appendChild(empty);
        if (mobileList) mobileList.appendChild(empty.cloneNode(true));
        if (typeof lucide !== 'undefined') lucide.createIcons();
        return;
    }

    window.stamps.forEach((stamp, index) => {
        list.appendChild(_buildStampRow(stamp, index));
        if (mobileList) mobileList.appendChild(_buildStampRow(stamp, index));
    });

    if (_isTouch) {
        _makeTouchSortable(mobileList, '.stamp-row', 'stampIndex', (from, to) => {
            const moved = window.stamps.splice(from, 1)[0];
            window.stamps.splice(to, 0, moved);
            _saveStamps();
            renderStampsList();
        });
    }

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function _applyStamp(stamp) {
    saveCurrentFrame();
    const src = stamp.pixels;
    const dst = frames[currentFrame];
    for (let i = 0; i < src.length && i < dst.length; i++) {
        if (!src[i].isEmpty) {
            dst[i] = { ...src[i] };
        }
    }
    loadFrame(currentFrame);
    updateFramesList();
    saveToHistory();
    showToast(`Tampon "${stamp.name}" appliqué`, { type: 'success' });
}

// Initialisation des tampons au démarrage
document.addEventListener('DOMContentLoaded', () => {
    _loadStamps();
    renderStampsList();

    document.getElementById('saveStampBtn')?.addEventListener('click', saveCurrentDrawingAsStamp);
    document.getElementById('importStampBtn')?.addEventListener('click', loadStampsFromDisk);

    // Boutons mobiles
    document.getElementById('saveStampBtnMobile')?.addEventListener('click', saveCurrentDrawingAsStamp);
    document.getElementById('importStampBtnMobile')?.addEventListener('click', loadStampsFromDisk);
    document.getElementById('copyFrameBtnMobile')?.addEventListener('click', copyCurrentFrame);
    document.getElementById('pasteFrameBtnMobile')?.addEventListener('click', pasteFrame);
    document.getElementById('addFrameBtnMobile')?.addEventListener('click', addFrame);
});

function toggleMobilePanel(side) {
    const panel  = document.getElementById(side === 'left' ? 'mobilePanelLeft'  : 'mobilePanelRight');
    const handle = document.getElementById(side === 'left' ? 'mobileHandleLeft' : 'mobileHandleRight');
    if (!panel) return;
    const opening = !panel.classList.contains('open');
    // Fermer l'autre côté si on en ouvre un
    if (opening) {
        const other = document.getElementById(side === 'left' ? 'mobilePanelRight' : 'mobilePanelLeft');
        const otherH = document.getElementById(side === 'left' ? 'mobileHandleRight' : 'mobileHandleLeft');
        other?.classList.remove('open');
        otherH?.classList.remove('open');
    }
    panel.classList.toggle('open', opening);
    handle.classList.toggle('open', opening);
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function switchMobileTab(btn) {
    const panel = btn.closest('.mobile-slide-panel');
    panel.querySelectorAll('.mobile-inner-tab').forEach(t => t.classList.remove('active'));
    panel.querySelectorAll('.mobile-tab-pane').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const target = document.getElementById(btn.dataset.target);
    if (target) target.classList.add('active');
}


// ── Import Sprite Sheet ────────────────────────────────────────────────────────
function initImportSpriteSheetFeature() {
    document.getElementById('importSpriteSheetBtn')?.addEventListener('click', showImportSpriteSheetDialog);
    document.getElementById('importSpriteSheetBtn2')?.addEventListener('click', showImportSpriteSheetDialog);
}

function showImportSpriteSheetDialog() {
    const fr = localStorage.getItem('lang') === 'fr';
    const state = { img: null, naturalW: 0, naturalH: 0, frameW: 0, frameH: 0, cols: 1, rows: 1 };

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';

    const content = document.createElement('div');
    content.className = 'modal-content';
    content.style.cssText = 'max-width:480px;width:92%;background:linear-gradient(155deg,rgba(36,48,94,.98),rgba(28,38,80,.95));border:1px solid rgba(255,255,255,.18);border-radius:14px;box-shadow:0 12px 48px rgba(0,0,0,.65);padding:22px;color:rgba(255,255,255,.95);max-height:90vh;overflow-y:auto;box-sizing:border-box';

    const title = document.createElement('h3');
    title.textContent = tL('isTitle');
    title.style.cssText = 'margin:0 0 6px;text-align:center;font-weight:700;font-size:1.1rem';

    // Explication
    const explain = document.createElement('p');
    explain.style.cssText = 'font-size:0.8rem;color:rgba(255,255,255,0.5);text-align:center;margin:0 0 14px;line-height:1.4';
    explain.textContent = fr
        ? 'Configurez la grille, puis cliquez "Prêt à poser" — le sprite suit votre curseur et un clic crée toutes les frames d\'animation.'
        : 'Set the grid, then click "Ready to place" — the sprite follows your cursor and a click creates all animation frames.';

    // Zone drop
    const dropZone = document.createElement('div');
    dropZone.className = 'ss-import-drop-zone';
    dropZone.textContent = tL('isDropHint');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/png,image/jpeg,image/gif,image/webp';
    fileInput.style.display = 'none';
    dropZone.appendChild(fileInput);
    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('drag-over'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
    dropZone.addEventListener('drop', e => {
        e.preventDefault(); dropZone.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file) _ssHandleFile(file, state, uiRefs);
    });
    fileInput.addEventListener('change', e => {
        const file = e.target.files[0];
        if (file) _ssHandleFile(file, state, uiRefs);
    });

    const imgInfo = document.createElement('div');
    imgInfo.style.cssText = 'font-size:0.8rem;color:rgba(255,255,255,0.45);text-align:center;margin-bottom:10px;min-height:1em';

    const previewWrap = document.createElement('div');
    previewWrap.className = 'ss-import-preview-wrap';
    previewWrap.style.display = 'none';
    const previewCanvas = document.createElement('canvas');
    previewCanvas.id = '_ssPreviewCanvas';
    const gridCanvas = document.createElement('canvas');
    gridCanvas.className = 'ss-import-grid-canvas';
    gridCanvas.id = '_ssGridCanvas';
    previewWrap.append(previewCanvas, gridCanvas);

    const configGrid = document.createElement('div');
    configGrid.className = 'ss-import-config-grid';

    function makeField(labelText, id, val) {
        const wrap = document.createElement('div');
        const lbl = document.createElement('label');
        lbl.textContent = labelText; lbl.htmlFor = id;
        const inp = document.createElement('input');
        inp.type = 'number'; inp.id = id; inp.min = '1'; inp.value = val;
        inp.disabled = true; inp.style.opacity = '0.4';
        wrap.append(lbl, inp); configGrid.appendChild(wrap);
        return inp;
    }

    const colsInput   = makeField(tL('isCols'),   '_ssCols',   1);
    const rowsInput   = makeField(tL('isRows'),   '_ssRows',   1);
    const frameWInput = makeField(tL('isFrameW'), '_ssFrameW', '—');
    const frameHInput = makeField(tL('isFrameH'), '_ssFrameH', '—');

    // Champ : taille du sprite sur le canvas (hauteur, en pixels canvas)
    // Séparé de frameH qui est la taille physique dans le PNG
    const spriteSizeWrap = document.createElement('div');
    spriteSizeWrap.style.cssText = 'margin-top:10px;padding-top:10px;border-top:1px solid rgba(255,255,255,0.1)';
    const spriteSizeLbl = document.createElement('label');
    spriteSizeLbl.style.cssText = 'font-size:0.78rem;font-weight:600;color:rgba(255,115,0,0.9);text-transform:uppercase;letter-spacing:.04em;display:block;margin-bottom:6px';
    spriteSizeLbl.textContent = fr ? '🎯 Taille du sprite sur le canvas (pixels) — modifiable si exporté avec zoom' : '🎯 Sprite size on canvas (pixels) — edit if exported with zoom';
    const spriteSizeInput = document.createElement('input');
    spriteSizeInput.type = 'number';
    spriteSizeInput.id = '_ssSpriteSize';
    spriteSizeInput.min = '1';
    spriteSizeInput.value = '';
    spriteSizeInput.disabled = true;
    spriteSizeInput.style.cssText = 'width:100%;padding:8px 10px;border:1px solid rgba(255,115,0,0.5);border-radius:8px;font-size:0.9rem;box-sizing:border-box;background:rgba(255,115,0,0.08);color:rgba(255,255,255,.95);opacity:0.4';
    const spriteSizeHint = document.createElement('div');
    spriteSizeHint.id = '_ssSpriteSizeHint';
    spriteSizeHint.style.cssText = 'font-size:0.75rem;color:rgba(255,255,255,0.35);margin-top:4px';
    spriteSizeInput.addEventListener('input', () => {
        state.spriteH = Math.max(1, parseInt(spriteSizeInput.value, 10) || 1);
        state.spriteW = Math.max(1, Math.round(state.frameW * state.spriteH / Math.max(1, state.frameH)));
        _ssUpdateCountNote(state, frameCount, resampleNote);
    });
    spriteSizeWrap.append(spriteSizeLbl, spriteSizeInput, spriteSizeHint);

    colsInput.addEventListener('input',   () => _ssSync(state, 'cols',   uiRefs));
    rowsInput.addEventListener('input',   () => _ssSync(state, 'rows',   uiRefs));
    frameWInput.addEventListener('input', () => _ssSync(state, 'frameW', uiRefs));
    frameHInput.addEventListener('input', () => _ssSync(state, 'frameH', uiRefs));

    const frameCount = document.createElement('div');
    frameCount.className = 'ss-import-frame-count';
    const resampleNote = document.createElement('div');
    resampleNote.className = 'ss-import-resample-note';

    const btnRow = document.createElement('div');
    btnRow.style.cssText = 'display:flex;gap:10px;margin-top:14px';

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = fr ? 'Annuler' : 'Cancel';
    cancelBtn.style.cssText = 'flex:1;padding:11px;border:1px solid rgba(255,255,255,.25);border-radius:8px;background:rgba(255,255,255,.08);color:rgba(255,255,255,.9);cursor:pointer;font-weight:600;font-size:.9rem';

    const importBtn = document.createElement('button');
    importBtn.textContent = fr ? '🖱️ Prêt à poser' : '🖱️ Ready to place';
    importBtn.disabled = true;
    importBtn.style.cssText = 'flex:2;padding:11px;border:none;border-radius:8px;background:linear-gradient(135deg,#FF7300,#FF9500);color:#fff;cursor:pointer;font-weight:700;font-size:.9rem;opacity:.4';

    cancelBtn.addEventListener('click', () => modal.remove());
    importBtn.addEventListener('click', async () => {
        if (!state.img) { showToast(tL('isNoFile'), { type: 'warning' }); return; }
        importBtn.disabled = true;
        importBtn.textContent = '⏳…';
        await _ssDoImport(state);
        modal.remove();
        // Le toast de confirmation est affiché après le placement (dans applySpriteSheet)
    });

    btnRow.append(cancelBtn, importBtn);

    const uiRefs = { dropZone, imgInfo, previewWrap, colsInput, rowsInput, frameWInput, frameHInput, spriteSizeInput, frameCount, resampleNote, importBtn };

    content.append(title, explain, dropZone, imgInfo, previewWrap, configGrid, spriteSizeWrap, frameCount, resampleNote, btnRow);
    modal.appendChild(content);
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
}

function _ssHandleFile(file, state, uiRefs) {
    if (!file.type.startsWith('image/')) { showToast('❌ Format non supporté', { type: 'error' }); return; }

    state.fileName = file.name; // Mémoriser le nom pour détecter la taille encodée

    const reader = new FileReader();
    reader.onload = evt => {
        const img = new Image();
        img.onload = () => {
            state.img = img;
            state.naturalW = img.naturalWidth;
            state.naturalH = img.naturalHeight;

            const W = state.naturalW, H = state.naturalH;
            const fr = localStorage.getItem('lang') === 'fr';

            // ── Auto-détection du découpage ──────────────────────────────────
            // Le sprite sheet exporté par cette app est un strip horizontal :
            // height = cellPx, width = cellPx × N  (cellPx = gridSize × zoom)
            let autoCols = 1, autoRows = 1, autoDetected = false;
            if (W > H && H > 0 && W % H === 0) {
                autoCols = W / H; autoRows = 1; autoDetected = true;
            } else if (H > W && W > 0 && H % W === 0) {
                autoCols = 1; autoRows = H / W; autoDetected = true;
            }
            state.cols   = autoCols;
            state.rows   = autoRows;
            state.frameW = Math.floor(W / autoCols);
            state.frameH = Math.floor(H / autoRows);

            // Activer les champs
            [uiRefs.colsInput, uiRefs.rowsInput, uiRefs.frameWInput, uiRefs.frameHInput, uiRefs.spriteSizeInput].forEach(inp => {
                if (inp) { inp.disabled = false; inp.style.opacity = '1'; }
            });

            uiRefs.colsInput.value   = state.cols;
            uiRefs.rowsInput.value   = state.rows;
            uiRefs.frameWInput.value = state.frameW;
            uiRefs.frameHInput.value = state.frameH;

            // Calculer la taille du sprite sur le canvas (dézoom automatique)
            _ssAutoSpriteSize(state, uiRefs);

            uiRefs.dropZone.textContent = tL('isFileSelected', file.name);
            uiRefs.dropZone.classList.add('has-file');

            const autoMsg = autoDetected
                ? (fr ? ` — ${autoCols > 1 ? autoCols + ' colonnes' : autoRows + ' lignes'} détectées` : ` — ${autoCols > 1 ? autoCols + ' cols' : autoRows + ' rows'} detected`)
                : (fr ? ' — vérifiez les colonnes/lignes' : ' — check cols/rows');
            uiRefs.imgInfo.textContent = `${W}×${H}px${autoMsg}`;

            _ssRenderPreview(state, uiRefs);
            uiRefs.previewWrap.style.display = 'flex';
            uiRefs.importBtn.disabled = false;
            uiRefs.importBtn.style.opacity = '1';
        };
        img.src = evt.target.result;
    };
    reader.readAsDataURL(file);
}

function _ssSync(state, changed, uiRefs) {
    const fw = Math.max(1, parseInt(uiRefs.frameWInput.value, 10) || 1);
    const fh = Math.max(1, parseInt(uiRefs.frameHInput.value, 10) || 1);
    const c  = Math.max(1, parseInt(uiRefs.colsInput.value,   10) || 1);
    const r  = Math.max(1, parseInt(uiRefs.rowsInput.value,   10) || 1);

    if (changed === 'cols') {
        state.cols   = c;
        state.frameW = Math.max(1, Math.floor(state.naturalW / c));
        uiRefs.frameWInput.value = state.frameW;
    } else if (changed === 'rows') {
        state.rows   = r;
        state.frameH = Math.max(1, Math.floor(state.naturalH / r));
        uiRefs.frameHInput.value = state.frameH;
    } else if (changed === 'frameW') {
        state.frameW = fw;
        state.cols   = Math.max(1, Math.floor(state.naturalW / fw));
        uiRefs.colsInput.value = state.cols;
    } else if (changed === 'frameH') {
        state.frameH = fh;
        state.rows   = Math.max(1, Math.floor(state.naturalH / fh));
        uiRefs.rowsInput.value = state.rows;
    }

    // Recalculer la taille du sprite sur le canvas quand la cellule change
    _ssAutoSpriteSize(state, uiRefs);
    _ssRenderPreview(state, uiRefs);
}

// Calcule la taille du sprite en cellules canvas.
// Priorité :
//   1. Nom de fichier encode la taille : "xxx-32px-4x.png" → spriteSize = 32
//   2. Sinon : currentGridSize (le sprite a été fait pour ce canvas)
// L'utilisateur peut toujours modifier le champ manuellement.
function _ssAutoSpriteSize(state, uiRefs) {
    // Essayer de lire la taille depuis le nom de fichier (pattern: "-NNpx")
    let spriteSize = currentGridSize;
    if (state.fileName) {
        const m = state.fileName.match(/-(\d+)px/);
        if (m) {
            const parsed = parseInt(m[1], 10);
            if (parsed > 0) spriteSize = parsed;
        }
    }

    const spriteW = spriteSize;
    const spriteH = spriteSize;
    state.spriteW = spriteW;
    state.spriteH = spriteH;

    if (uiRefs.spriteSizeInput) {
        uiRefs.spriteSizeInput.value = spriteH;
        uiRefs.spriteSizeInput.max = String(Math.max(spriteH, state.frameH || spriteH));
    }
    const hint = document.getElementById('_ssSpriteSizeHint');
    if (hint) {
        const fr = localStorage.getItem('lang') === 'fr';
        const cellPx = state.frameH || '?';
        hint.textContent = fr
            ? `Cellule PNG : ${state.frameW || '?'}×${cellPx}px → sprite : ${spriteW}×${spriteH} cellules canvas`
            : `PNG cell: ${state.frameW || '?'}×${cellPx}px → sprite: ${spriteW}×${spriteH} canvas cells`;
    }
}

function _ssUpdateCountNote(state, frameCount, resampleNote) {
    const total = state.cols * state.rows;
    const fr = localStorage.getItem('lang') === 'fr';
    const sw = state.spriteW || state.frameW;
    const sh = state.spriteH || state.frameH;
    frameCount.textContent = tL('isWillCreate', total);
    resampleNote.textContent = fr
        ? `${total} sprite${total > 1 ? 's' : ''} de ${sw}×${sh}px posés dans le canvas`
        : `${total} sprite${total > 1 ? 's' : ''} of ${sw}×${sh}px placed on canvas`;
}

function _ssRenderPreview(state, uiRefs) {
    const MAX = 360;
    const scaleF = Math.min(MAX / state.naturalW, MAX / state.naturalH, 1);
    const dw = Math.round(state.naturalW * scaleF);
    const dh = Math.round(state.naturalH * scaleF);

    const pc = document.getElementById('_ssPreviewCanvas');
    const gc = document.getElementById('_ssGridCanvas');
    if (!pc || !gc) return;

    pc.width = dw; pc.height = dh;
    pc.style.width = dw + 'px'; pc.style.height = dh + 'px';
    const pCtx = pc.getContext('2d');
    // Damier transparence
    const ts = 6;
    for (let ty = 0; ty < dh; ty += ts) {
        for (let tx = 0; tx < dw; tx += ts) {
            pCtx.fillStyle = (Math.floor(tx / ts) + Math.floor(ty / ts)) % 2 === 0 ? '#888' : '#aaa';
            pCtx.fillRect(tx, ty, ts, ts);
        }
    }
    pCtx.drawImage(state.img, 0, 0, dw, dh);

    gc.width = dw; gc.height = dh;
    gc.style.width = dw + 'px'; gc.style.height = dh + 'px';
    const gCtx = gc.getContext('2d');
    gCtx.clearRect(0, 0, dw, dh);
    gCtx.strokeStyle = 'rgba(255,115,0,0.85)';
    gCtx.lineWidth = 1;

    const cellW = state.frameW * scaleF;
    const cellH = state.frameH * scaleF;
    for (let ci = 0; ci <= state.cols; ci++) {
        const x = Math.round(ci * cellW) + 0.5;
        gCtx.beginPath(); gCtx.moveTo(x, 0); gCtx.lineTo(x, dh); gCtx.stroke();
    }
    for (let ri = 0; ri <= state.rows; ri++) {
        const y = Math.round(ri * cellH) + 0.5;
        gCtx.beginPath(); gCtx.moveTo(0, y); gCtx.lineTo(dw, y); gCtx.stroke();
    }

    _ssUpdateCountNote(state, uiRefs.frameCount, uiRefs.resampleNote);
}

async function _ssDoImport(state) {
    const { img, naturalW, naturalH, frameW, frameH, cols, rows } = state;
    // Taille cible du sprite sur le canvas.
    // Par défaut = taille de la cellule PNG (aucune modification).
    // L'utilisateur peut changer la valeur dans le champ "sprite size" du dialog.
    const tW = Math.max(1, state.spriteW || frameW);
    const tH = Math.max(1, state.spriteH || frameH);

    const offCanvas = document.createElement('canvas');
    offCanvas.width = naturalW; offCanvas.height = naturalH;
    const offCtx = offCanvas.getContext('2d');
    offCtx.drawImage(img, 0, 0, naturalW, naturalH);

    const sprites = [];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const sx = col * frameW;
            const sy = row * frameH;
            const sw = Math.min(frameW, naturalW - sx);
            const sh = Math.min(frameH, naturalH - sy);
            if (sw <= 0 || sh <= 0) continue;

            const cellData = offCtx.getImageData(sx, sy, sw, sh);
            const raw = cellData.data;
            const pixels = [];

            // Rééchantillonnage nearest-neighbor : cellule PNG sw×sh → tW×tH pixels canvas
            for (let py = 0; py < tH; py++) {
                for (let px = 0; px < tW; px++) {
                    const srcX = Math.min(Math.floor(px * sw / tW), sw - 1);
                    const srcY = Math.min(Math.floor(py * sh / tH), sh - 1);
                    const idx = (srcY * sw + srcX) * 4;
                    const r = raw[idx], g = raw[idx + 1], b = raw[idx + 2], a = raw[idx + 3];
                    if (a < 128) {
                        pixels.push({ color: '#FFFFFF', isEmpty: true });
                    } else {
                        const hex = '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase();
                        pixels.push({ color: hex, isEmpty: false });
                    }
                }
            }

            sprites.push({ pixels, w: tW, h: tH });
        }
    }

    if (sprites.length === 0) return 0;

    // Le premier sprite suit le curseur en ghost.
    // Au clic → N frames créées, chacune = copie de la frame courante + sprite en calque.
    enterSpriteSheetMode(sprites);
    return sprites.length;
}
