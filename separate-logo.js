const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');

async function separateLogo() {
    const logoPath = path.join(__dirname, 'public', 'images', 'logo.png');
    const outputDir = path.join(__dirname, 'public', 'images');
    
    // S'assurer que le dossier de sortie existe
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log('📸 Chargement du logo...');
    
    // Utiliser la classe Jimp
    const JimpClass = Jimp.Jimp || Jimp;
    const logo = await JimpClass.read(logoPath);
    const width = logo.bitmap.width;
    const height = logo.bitmap.height;
    
    console.log(`📐 Dimensions: ${width}x${height}`);

    // Cloner l'image pour créer l'icône et le texte
    const icon = logo.clone();
    const text = logo.clone();

    // Fonction pour déterminer si un pixel est de l'icône (orange avec lueur)
    function isIcon(r, g, b) {
        // L'icône est orange, donc R élevé, G moyen, B faible
        return r > 150 && g > 50 && g < 200 && b < 100;
    }

    // Fonction pour déterminer si un pixel est du texte (gris foncé)
    function isText(r, g, b) {
        const avg = (r + g + b) / 3;
        const diff = Math.max(r, g, b) - Math.min(r, g, b);
        // Texte gris foncé, pas orange
        return avg < 150 && diff < 30 && !isIcon(r, g, b);
    }

    // Traiter chaque pixel pour l'icône
    icon.scan(0, 0, width, height, function (x, y, idx) {
        const r = this.bitmap.data[idx];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];

        // Pour l'icône : garder les pixels orange, rendre le reste transparent
        if (!isIcon(r, g, b)) {
            this.bitmap.data[idx + 3] = 0; // Alpha = 0 (transparent)
        }
    });

    // Traiter chaque pixel pour le texte
    text.scan(0, 0, width, height, function (x, y, idx) {
        const r = this.bitmap.data[idx];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];

        // Pour le texte : garder les pixels gris foncé, rendre le reste transparent
        if (!isText(r, g, b)) {
            this.bitmap.data[idx + 3] = 0; // Alpha = 0 (transparent)
        }
    });

    // Sauvegarder les images
    console.log('🎨 Création de l\'icône...');
    await icon.write(path.join(outputDir, 'icon.png'));

    console.log('✍️  Création du texte...');
    await text.write(path.join(outputDir, 'text.png'));

    console.log('✅ Séparation terminée !');
    console.log(`   - Icon: ${path.join(outputDir, 'icon.png')}`);
    console.log(`   - Text: ${path.join(outputDir, 'text.png')}`);
}

separateLogo().catch(console.error);
