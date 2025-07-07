const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

// Créer le dossier de sauvegarde s'il n'existe pas
const savesDir = path.join(__dirname, 'pixel-art-saves');
if (!fs.existsSync(savesDir)) {
    fs.mkdirSync(savesDir, { recursive: true });
}

// Endpoint pour sauvegarder un projet
app.post('/api/save', (req, res) => {
    try {
        const { name, frames, currentFrame } = req.body;
        
        if (!name || !frames) {
            return res.status(400).json({ error: 'Données manquantes' });
        }

        const projectData = {
            name,
            frames,
            currentFrame,
            dateCreated: new Date().toISOString(),
            lastModified: new Date().toISOString()
        };

        const fileName = `${name.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
        const filePath = path.join(savesDir, fileName);

        fs.writeFileSync(filePath, JSON.stringify(projectData, null, 2));
        
        res.json({ 
            success: true, 
            message: 'Projet sauvegardé avec succès',
            fileName: fileName
        });
    } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
        res.status(500).json({ error: 'Erreur lors de la sauvegarde' });
    }
});

// Endpoint pour charger un projet
app.get('/api/load/:filename', (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(savesDir, filename);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Fichier non trouvé' });
        }

        const fileContent = fs.readFileSync(filePath, 'utf8');
        const projectData = JSON.parse(fileContent);
        
        res.json(projectData);
    } catch (error) {
        console.error('Erreur lors du chargement:', error);
        res.status(500).json({ error: 'Erreur lors du chargement' });
    }
});

// Endpoint pour lister les projets sauvegardés
app.get('/api/projects', (req, res) => {
    try {
        const files = fs.readdirSync(savesDir);
        const projects = files
            .filter(file => file.endsWith('.json'))
            .map(file => {
                const filePath = path.join(savesDir, file);
                const stats = fs.statSync(filePath);
                return {
                    name: file.replace('.json', ''),
                    filename: file,
                    lastModified: stats.mtime.toISOString(),
                    size: stats.size
                };
            });
        
        res.json(projects);
    } catch (error) {
        console.error('Erreur lors de la récupération des projets:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des projets' });
    }
});

// Endpoint pour supprimer un projet
app.delete('/api/delete/:filename', (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(savesDir, filename);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Fichier non trouvé' });
        }

        fs.unlinkSync(filePath);
        res.json({ success: true, message: 'Projet supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        res.status(500).json({ error: 'Erreur lors de la suppression' });
    }
});

app.listen(port, () => {
    console.log(`Pixel Editor running at http://localhost:${port}`);
    console.log(`Sauvegardes stockées dans: ${savesDir}`);
});