const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');

async function cropText() {
    const textPath = path.join(__dirname, 'public', 'images', 'text.png');
    const outputDir = path.join(__dirname, 'public', 'images');
    
    console.log('📸 Chargement du text.png...');
    
    const JimpClass = Jimp.Jimp || Jimp;
    const text = await JimpClass.read(textPath);
    const width = text.bitmap.width;
    const height = text.bitmap.height;
    
    console.log(`📐 Dimensions originales: ${width}x${height}`);

    // Trouver les limites du texte (pixels non-transparents)
    let minX = width;
    let maxX = 0;
    let minY = height;
    let maxY = 0;
    let hasContent = false;

    text.scan(0, 0, width, height, function (x, y, idx) {
        const alpha = this.bitmap.data[idx + 3];
        
        // Si le pixel n'est pas transparent
        if (alpha > 0) {
            hasContent = true;
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
        }
    });

    if (!hasContent) {
        console.error('❌ Aucun contenu trouvé dans text.png');
        return;
    }

    console.log(`📏 Limites du texte: x(${minX}, ${maxX}), y(${minY}, ${maxY})`);

    // Ajouter un petit padding (10px de chaque côté)
    const padding = 10;
    minX = Math.max(0, minX - padding);
    minY = Math.max(0, minY - padding);
    maxX = Math.min(width - 1, maxX + padding);
    maxY = Math.min(height - 1, maxY + padding);

    const cropWidth = maxX - minX + 1;
    const cropHeight = maxY - minY + 1;

    console.log(`✂️  Recadrage: ${cropWidth}x${cropHeight} à partir de (${minX}, ${minY})`);

    // Recadrer l'image (nouvelle API Jimp)
    const cropped = text.crop({ x: minX, y: minY, w: cropWidth, h: cropHeight });

    // Sauvegarder
    console.log('💾 Sauvegarde du text.png recadré...');
    await cropped.write(textPath);

    console.log('✅ Recadrage terminé !');
    console.log(`   Nouvelle taille: ${cropWidth}x${cropHeight}`);
}

cropText().catch(console.error);

