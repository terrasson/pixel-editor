const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Configuration pour Vercel
app.use(express.json());

// Store temporaire pour les sauvegardes en production (Vercel)
let temporaryStorage = {};

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
        temporaryStorage[fileName] = projectData;
        
        res.json({ 
            success: true, 
            message: 'Projet sauvegardé temporairement (session actuelle uniquement)',
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
        const projectData = temporaryStorage[filename];
        
        if (!projectData) {
            return res.status(404).json({ error: 'Fichier non trouvé' });
        }
        
        res.json(projectData);
    } catch (error) {
        console.error('Erreur lors du chargement:', error);
        res.status(500).json({ error: 'Erreur lors du chargement' });
    }
});

// Endpoint pour lister les projets sauvegardés
app.get('/api/projects', (req, res) => {
    try {
        const projects = Object.keys(temporaryStorage).map(filename => ({
            name: filename.replace('.json', ''),
            filename: filename,
            lastModified: temporaryStorage[filename].lastModified || new Date().toISOString(),
            size: JSON.stringify(temporaryStorage[filename]).length
        }));
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
        
        if (!temporaryStorage[filename]) {
            return res.status(404).json({ error: 'Fichier non trouvé' });
        }
        
        delete temporaryStorage[filename];
        res.json({ success: true, message: 'Projet supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        res.status(500).json({ error: 'Erreur lors de la suppression' });
    }
});

module.exports = app;
