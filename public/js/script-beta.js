/**
 * SCRIPT BETA - Fonctionnalité Photo → Pixel Art
 * 
 * Cette fonctionnalité permet de convertir une photo en pixel art 32x32
 * avec deux modes :
 * - Mode simple : conversion directe
 * - Mode avancé : avec quantification de couleurs et ajustements
 * 
 * ⚠️ VERSION BETA - À SUPPRIMER SI NON CONVENABLE
 */

// Attendre que le DOM et script.js soient chargés
(function() {
    'use strict';
    
    // Attendre que script.js soit complètement chargé
    function waitForScript() {
        if (typeof frames === 'undefined' || typeof currentGridSize === 'undefined') {
            setTimeout(waitForScript, 100);
            return;
        }
        initPhotoToPixelFeature();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForScript);
    } else {
        waitForScript();
    }
    
    function initPhotoToPixelFeature() {
        console.log('📷 Fonctionnalité Photo → Pixel Art BETA initialisée');
        
        // Ajouter les event listeners pour les boutons
        const photoBtn = document.getElementById('photoToPixelBtn');
        const photoBtn2 = document.getElementById('photoToPixelBtn2');
        
        if (photoBtn) {
            photoBtn.addEventListener('click', showPhotoToPixelDialog);
        }
        if (photoBtn2) {
            photoBtn2.addEventListener('click', showPhotoToPixelDialog);
        }
    }
    
    /**
     * Affiche le dialogue de conversion photo → pixel art
     */
    function showPhotoToPixelDialog() {
        const dialogContent = `
            <div style="padding: 20px; color: rgba(255, 255, 255, 0.95);">
                <h3 style="margin-top: 0; text-align: center; color: rgba(255, 255, 255, 0.98); font-weight: 600;">📷 Convertir une photo en Pixel Art</h3>
                
                <div style="margin: 20px 0;">
                    <label style="display: block; margin-bottom: 10px; font-weight: 600; color: rgba(255, 255, 255, 0.95);">
                        Sélectionner une image :
                    </label>
                    <input type="file" id="photoInput" accept="image/*" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); color: rgba(255, 255, 255, 0.95); font-size: 14px;">
                </div>
                
                <div style="margin: 20px 0;">
                    <label style="display: block; margin-bottom: 10px; font-weight: 600; color: rgba(255, 255, 255, 0.95);">
                        Mode de conversion :
                    </label>
                    <select id="conversionMode" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); color: rgba(255, 255, 255, 0.95); font-size: 14px;">
                        <option value="simple" style="background: rgba(36, 48, 94, 0.98); color: rgba(255, 255, 255, 0.95);">⚡ Simple (conversion directe)</option>
                        <option value="quantized" style="background: rgba(36, 48, 94, 0.98); color: rgba(255, 255, 255, 0.95);">🎨 Avancé (quantification de couleurs)</option>
                    </select>
                </div>
                
                <div id="advancedOptions" style="display: none; margin: 20px 0;">
                    <label style="display: block; margin-bottom: 10px; font-weight: 600; color: rgba(255, 255, 255, 0.95);">
                        Nombre de couleurs :
                    </label>
                    <select id="colorCount" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); color: rgba(255, 255, 255, 0.95); font-size: 14px;">
                        <option value="8" style="background: rgba(36, 48, 94, 0.98); color: rgba(255, 255, 255, 0.95);">8 couleurs (style rétro)</option>
                        <option value="16" selected style="background: rgba(36, 48, 94, 0.98); color: rgba(255, 255, 255, 0.95);">16 couleurs (recommandé)</option>
                        <option value="32" style="background: rgba(36, 48, 94, 0.98); color: rgba(255, 255, 255, 0.95);">32 couleurs (plus détaillé)</option>
                    </select>
                    
                    <label style="display: block; margin: 15px 0 10px 0; font-weight: 600; color: rgba(255, 255, 255, 0.95);">
                        Contraste :
                    </label>
                    <input type="range" id="contrastSlider" min="0" max="200" value="100" style="width: 100%;">
                    <span id="contrastValue" style="display: block; text-align: center; margin-top: 5px; color: rgba(255, 255, 255, 0.95);">100%</span>
                    
                    <label style="display: block; margin: 15px 0 10px 0; font-weight: 600; color: rgba(255, 255, 255, 0.95);">
                        Luminosité :
                    </label>
                    <input type="range" id="brightnessSlider" min="0" max="200" value="100" style="width: 100%;">
                    <span id="brightnessValue" style="display: block; text-align: center; margin-top: 5px; color: rgba(255, 255, 255, 0.95);">100%</span>
                </div>
                
                <div style="margin: 20px 0; padding: 15px; background: rgba(0,122,255,0.3); border-radius: 8px; border: 1px solid rgba(0,122,255,0.5);">
                    <p style="margin: 0; font-size: 0.9rem; color: rgba(255, 255, 255, 0.9);">
                        💡 <strong style="font-weight: 600;">Astuce :</strong> Le mode avancé réduit le nombre de couleurs pour un rendu plus "pixel art" authentique.
                    </p>
                </div>
                
                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button id="cancelPhotoBtn" style="flex: 1; padding: 12px; border: 1px solid rgba(255,255,255,0.3); border-radius: 8px; background: rgba(255,255,255,0.1); color: rgba(255, 255, 255, 0.95); cursor: pointer; font-weight: 600;">
                        Annuler
                    </button>
                    <button id="convertPhotoBtn" style="flex: 1; padding: 12px; border: none; border-radius: 8px; background: linear-gradient(135deg, #FF6B6B, #FF8E53); color: rgba(255, 255, 255, 0.95); cursor: pointer; font-weight: 600;" disabled>
                        Convertir
                    </button>
                </div>
            </div>
        `;
        
        // Créer le modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'flex';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 500px; width: 90%; background: linear-gradient(155deg, rgba(36, 48, 94, 0.98), rgba(28, 38, 80, 0.95)); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.6);">
                ${dialogContent}
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Gérer l'affichage des options avancées
        const modeSelect = document.getElementById('conversionMode');
        const advancedOptions = document.getElementById('advancedOptions');
        const contrastSlider = document.getElementById('contrastSlider');
        const brightnessSlider = document.getElementById('brightnessSlider');
        const contrastValue = document.getElementById('contrastValue');
        const brightnessValue = document.getElementById('brightnessValue');
        const photoInput = document.getElementById('photoInput');
        const convertBtn = document.getElementById('convertPhotoBtn');
        const cancelBtn = document.getElementById('cancelPhotoBtn');
        
        modeSelect.addEventListener('change', (e) => {
            advancedOptions.style.display = e.target.value === 'quantized' ? 'block' : 'none';
        });
        
        contrastSlider.addEventListener('input', (e) => {
            contrastValue.textContent = e.target.value + '%';
            contrastValue.style.color = 'rgba(255, 255, 255, 0.95)';
        });
        
        brightnessSlider.addEventListener('input', (e) => {
            brightnessValue.textContent = e.target.value + '%';
            brightnessValue.style.color = 'rgba(255, 255, 255, 0.95)';
        });
        
        photoInput.addEventListener('change', (e) => {
            convertBtn.disabled = !e.target.files || e.target.files.length === 0;
        });
        
        cancelBtn.addEventListener('click', () => {
            modal.remove();
        });
        
        convertBtn.addEventListener('click', async () => {
            const file = photoInput.files[0];
            if (!file) {
                alert('⚠️ Veuillez sélectionner une image');
                return;
            }
            
            const mode = modeSelect.value;
            const colorCount = parseInt(document.getElementById('colorCount').value);
            const contrast = parseInt(contrastSlider.value) / 100;
            const brightness = parseInt(brightnessSlider.value) / 100;
            
            convertBtn.disabled = true;
            convertBtn.textContent = '⏳ Conversion...';
            
            try {
                const result = await convertPhotoToPixel(file, mode, colorCount, contrast, brightness);
                modal.remove();
                
                // Afficher un message détaillé avec les statistiques
                let message = '✅ Photo convertie avec succès !\n\n';
                if (result) {
                    message += `📊 Statistiques :\n`;
                    message += `- Couleurs uniques dans l'image : ${result.totalColors}\n`;
                    message += `- Couleurs ajoutées à la palette : ${result.addedColors}\n`;
                    if (result.skippedColors > 0) {
                        message += `- Couleurs déjà présentes : ${result.skippedColors}\n`;
                    }
                    if (result.defaultColors > 0) {
                        message += `- Couleurs de base (non ajoutées) : ${result.defaultColors}\n`;
                    }
                }
                alert(message);
            } catch (error) {
                console.error('Erreur lors de la conversion:', error);
                alert('❌ Erreur lors de la conversion : ' + error.message);
                convertBtn.disabled = false;
                convertBtn.textContent = 'Convertir';
            }
        });
    }
    
    /**
     * Convertit une photo en pixel art
     */
    async function convertPhotoToPixel(file, mode, colorCount, contrast, brightness) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const reader = new FileReader();
            
            reader.onload = (e) => {
                img.onload = () => {
                    try {
                        // Créer un canvas pour redimensionner l'image à la taille de la grille courante
                        const size = currentGridSize;
                        const canvas = document.createElement('canvas');
                        canvas.width = size;
                        canvas.height = size;
                        const ctx = canvas.getContext('2d');

                        // Dessiner l'image redimensionnée
                        ctx.drawImage(img, 0, 0, size, size);

                        // Appliquer les ajustements si nécessaire
                        if (mode === 'quantized' && (contrast !== 1 || brightness !== 1)) {
                            applyImageAdjustments(ctx, size, size, contrast, brightness);
                        }

                        // Obtenir les données des pixels
                        const imageData = ctx.getImageData(0, 0, size, size);
                        const pixels = imageData.data;
                        
                        // Convertir en format de frame
                        const newFrame = [];
                        const colorsUsed = new Set();
                        
                        for (let i = 0; i < pixels.length; i += 4) {
                            let r = pixels[i];
                            let g = pixels[i + 1];
                            let b = pixels[i + 2];
                            const a = pixels[i + 3];
                            
                            // Gérer la transparence (alpha)
                            if (a < 128) {
                                // Pixel transparent → blanc
                                r = 255;
                                g = 255;
                                b = 255;
                            }
                            
                            // Quantification si mode avancé
                            if (mode === 'quantized') {
                                const quantized = quantizeColor(r, g, b, colorCount);
                                r = quantized.r;
                                g = quantized.g;
                                b = quantized.b;
                            }
                            
                            const color = rgbToHex(r, g, b);
                            newFrame.push({
                                color: color,
                                isEmpty: false
                            });
                            
                            // Collecter les couleurs utilisées
                            colorsUsed.add(color);
                        }
                        
                        // Appliquer la frame à la grille actuelle
                        if (frames && frames.length > 0 && typeof currentFrame !== 'undefined') {
                            frames[currentFrame] = newFrame;
                            loadFrame(currentFrame);
                            updateFramesList();
                            
                            // Ajouter les couleurs à la palette personnalisée
                            const result = addColorsToPalette(Array.from(colorsUsed));
                            
                            // Retourner les statistiques pour l'affichage
                            resolve(result);
                        } else {
                            reject(new Error('Impossible d\'accéder aux frames'));
                        }
                    } catch (error) {
                        reject(error);
                    }
                };
                
                img.onerror = () => {
                    reject(new Error('Impossible de charger l\'image'));
                };
                
                img.src = e.target.result;
            };
            
            reader.onerror = () => {
                reject(new Error('Erreur lors de la lecture du fichier'));
            };
            
            reader.readAsDataURL(file);
        });
    }
    
    /**
     * Applique les ajustements de contraste et luminosité
     */
    function applyImageAdjustments(ctx, width, height, contrast, brightness) {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            // Contraste
            data[i] = Math.max(0, Math.min(255, ((data[i] - 128) * contrast) + 128));
            data[i + 1] = Math.max(0, Math.min(255, ((data[i + 1] - 128) * contrast) + 128));
            data[i + 2] = Math.max(0, Math.min(255, ((data[i + 2] - 128) * contrast) + 128));
            
            // Luminosité
            data[i] = Math.max(0, Math.min(255, data[i] * brightness));
            data[i + 1] = Math.max(0, Math.min(255, data[i + 1] * brightness));
            data[i + 2] = Math.max(0, Math.min(255, data[i + 2] * brightness));
        }
        
        ctx.putImageData(imageData, 0, 0);
    }
    
    /**
     * Quantifie une couleur (réduit le nombre de couleurs possibles)
     */
    function quantizeColor(r, g, b, colorCount) {
        // Algorithme de quantification simple
        const levels = Math.sqrt(colorCount);
        const step = 255 / (levels - 1);
        
        r = Math.round(r / step) * step;
        g = Math.round(g / step) * step;
        b = Math.round(b / step) * step;
        
        return {
            r: Math.max(0, Math.min(255, r)),
            g: Math.max(0, Math.min(255, g)),
            b: Math.max(0, Math.min(255, b))
        };
    }
    
    /**
     * Convertit RGB en hexadécimal
     */
    function rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = Math.round(x).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('').toUpperCase();
    }
    
    /**
     * Ajoute les couleurs à la palette personnalisée
     * Pour les conversions photo, on ignore la limite maxCustomColors pour ajouter toutes les couleurs
     */
    function addColorsToPalette(colors) {
        if (typeof customColors === 'undefined' || typeof maxCustomColors === 'undefined') {
            console.warn('Variables customColors non disponibles');
            return { totalColors: 0, addedColors: 0, skippedColors: 0, defaultColors: 0 };
        }
        
        const defaultColors = [
            '#000000', '#FFFFFF', '#FF0000', '#00FF00', 
            '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'
        ];
        
        const stats = {
            totalColors: colors.length,
            addedColors: 0,
            skippedColors: 0,
            defaultColors: 0
        };
        
        // Normaliser toutes les couleurs pour éviter les doublons
        const normalizedColors = colors.map(color => {
            // S'assurer que la couleur est en majuscules et format hex complet
            if (color.startsWith('#')) {
                return color.toUpperCase();
            }
            return '#' + color.toUpperCase();
        });
        
        // Pour les conversions photo, on augmente temporairement la limite
        // On permet jusqu'à 64 couleurs personnalisées pour les projets avec conversion photo
        const photoConversionLimit = 64;
        const currentLimit = customColors.length >= maxCustomColors ? photoConversionLimit : maxCustomColors;
        
        normalizedColors.forEach(color => {
            // Ignorer les couleurs par défaut
            if (defaultColors.includes(color)) {
                stats.defaultColors++;
                return;
            }
            
            // Ignorer si déjà présente
            if (customColors.includes(color)) {
                stats.skippedColors++;
                return;
            }
            
            // Ajouter toutes les couleurs (sans limite stricte pour les conversions photo)
            // On permet jusqu'à photoConversionLimit couleurs
            if (customColors.length < photoConversionLimit) {
                customColors.push(color);
                stats.addedColors++;
            } else {
                // Si on atteint la limite étendue, on ne peut plus ajouter
                console.warn(`Limite de ${photoConversionLimit} couleurs atteinte. Couleur ${color} non ajoutée.`);
            }
        });
        
        // Mettre à jour l'affichage de la palette
        if (typeof updateColorPalette === 'function') {
            updateColorPalette();
        }
        if (typeof updateCompactPalette === 'function') {
            updateCompactPalette();
        }
        
        // Sauvegarder les couleurs personnalisées
        if (typeof saveCustomColors === 'function') {
            saveCustomColors();
        }
        
        return stats;
    }
})();

