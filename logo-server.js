const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001; // Port différent de ton app principale

// Types MIME
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg'
};

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    
    // Si c'est la racine, servir logo-generator.html
    if (filePath === './') {
        filePath = './logo-generator.html';
    }
    
    // Si c'est /image-to-logo, servir image-to-logo.html
    if (filePath === './image-to-logo') {
        filePath = './image-to-logo.html';
    }
    
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeType = mimeTypes[extname] || 'application/octet-stream';
    
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Page 404
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(`
                    <html>
                        <head><title>404 - Page non trouvée</title></head>
                        <body style="font-family: Arial; text-align: center; padding: 50px;">
                            <h1>404 - Page non trouvée</h1>
                            <p>Le fichier ${filePath} n'existe pas.</p>
                            <a href="/">Retour au générateur de logo</a>
                        </body>
                    </html>
                `);
            } else {
                res.writeHead(500);
                res.end('Erreur serveur: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': mimeType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`🎨 Générateur de Logo Pixel Art`);
    console.log(`📡 Serveur démarré sur http://localhost:${PORT}`);
    console.log(`🌐 Générateur de logos: http://localhost:${PORT}`);
    console.log(`🖼️  Convertisseur image: http://localhost:${PORT}/image-to-logo`);
    console.log(`⏹️  Pour arrêter le serveur: Ctrl+C`);
    console.log(`\n✨ Prêt à créer des logos !`);
});

// Gestion de l'arrêt propre
process.on('SIGINT', () => {
    console.log('\n🛑 Arrêt du serveur...');
    server.close(() => {
        console.log('✅ Serveur arrêté.');
        process.exit(0);
    });
});
