#!/usr/bin/env node

/**
 * 🧪 SCRIPT DE TEST SOLUTION SUPABASE GIF
 * 
 * Ce script teste l'Edge Function Supabase pour création GIF
 * Utilisation: node test-supabase-gif.js
 */

const https = require('https');
const fs = require('fs');

// Configuration de test
const config = {
    // Remplacer par votre URL Supabase
    supabaseUrl: 'https://YOUR_PROJECT_REF.supabase.co',
    supabaseKey: 'YOUR_ANON_KEY',
    
    // Données de test (2 frames de 2x2 pixels)
    testFrames: [
        ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'], // Frame 1: Rouge, Vert, Bleu, Jaune
        ['#FF00FF', '#00FFFF', '#808080', '#FFFFFF']  // Frame 2: Magenta, Cyan, Gris, Blanc
    ],
    
    testConfig: {
        size: 128,
        frameDelay: 500,
        repeat: 0,
        quality: 10
    }
};

/**
 * Test de l'Edge Function Supabase
 */
async function testSupabaseEdgeFunction() {
    console.log('🧪 TEST EDGE FUNCTION SUPABASE GIF');
    console.log('=====================================\n');
    
    // Préparer les données
    const payload = {
        frames: config.testFrames,
        config: config.testConfig
    };
    
    const postData = JSON.stringify(payload);
    
    const options = {
        hostname: config.supabaseUrl.replace('https://', ''),
        port: 443,
        path: '/functions/v1/create-gif',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.supabaseKey}`,
            'apikey': config.supabaseKey,
            'Content-Length': Buffer.byteLength(postData)
        }
    };
    
    console.log('📡 Envoi requête vers:', `${config.supabaseUrl}/functions/v1/create-gif`);
    console.log('📦 Payload:', JSON.stringify(payload, null, 2));
    console.log('⏳ Attente réponse...\n');
    
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            console.log(`📊 Status: ${res.statusCode}`);
            console.log(`📋 Headers:`, res.headers);
            
            let data = Buffer.alloc(0);
            
            res.on('data', (chunk) => {
                data = Buffer.concat([data, chunk]);
            });
            
            res.on('end', () => {
                if (res.statusCode === 200) {
                    console.log(`✅ SUCCESS: GIF reçu, taille: ${data.length} bytes`);
                    
                    // Sauvegarder le GIF de test
                    const filename = `test-gif-${Date.now()}.gif`;
                    fs.writeFileSync(filename, data);
                    console.log(`💾 GIF sauvegardé: ${filename}`);
                    
                    resolve({
                        success: true,
                        size: data.length,
                        filename: filename
                    });
                } else {
                    const errorText = data.toString();
                    console.log(`❌ ERREUR: ${res.statusCode}`);
                    console.log(`📄 Réponse:`, errorText);
                    reject(new Error(`HTTP ${res.statusCode}: ${errorText}`));
                }
            });
        });
        
        req.on('error', (error) => {
            console.log(`❌ ERREUR RÉSEAU:`, error.message);
            reject(error);
        });
        
        req.on('timeout', () => {
            console.log(`⏰ TIMEOUT: Pas de réponse après 30s`);
            req.destroy();
            reject(new Error('Timeout'));
        });
        
        req.setTimeout(30000);
        req.write(postData);
        req.end();
    });
}

/**
 * Test de validation de GIF
 */
function validateGif(filename) {
    console.log('\n🔍 VALIDATION DU GIF');
    console.log('====================');
    
    try {
        const data = fs.readFileSync(filename);
        
        // Vérifier signature GIF
        const signature = data.slice(0, 6).toString();
        if (signature === 'GIF87a' || signature === 'GIF89a') {
            console.log(`✅ Signature GIF valide: ${signature}`);
        } else {
            console.log(`❌ Signature GIF invalide: ${signature}`);
            return false;
        }
        
        // Vérifier taille minimale
        if (data.length > 100) {
            console.log(`✅ Taille GIF acceptable: ${data.length} bytes`);
        } else {
            console.log(`❌ Taille GIF trop petite: ${data.length} bytes`);
            return false;
        }
        
        console.log(`📊 Taille totale: ${data.length} bytes`);
        console.log(`📏 Signature: ${signature}`);
        console.log(`🎬 GIF généré avec succès !`);
        
        return true;
        
    } catch (error) {
        console.log(`❌ Erreur validation:`, error.message);
        return false;
    }
}

/**
 * Script principal
 */
async function main() {
    console.log('🚀 DÉMARRAGE TESTS SUPABASE GIF\n');
    
    // Vérifier configuration
    if (config.supabaseUrl.includes('YOUR_PROJECT_REF')) {
        console.log('❌ ERREUR: Veuillez configurer votre URL Supabase dans le script');
        console.log('📝 Modifiez les variables supabaseUrl et supabaseKey');
        process.exit(1);
    }
    
    try {
        // Test 1: Edge Function
        const result = await testSupabaseEdgeFunction();
        
        // Test 2: Validation GIF
        if (result.success) {
            const isValid = validateGif(result.filename);
            
            if (isValid) {
                console.log('\n🎉 TOUS LES TESTS RÉUSSIS !');
                console.log('✅ Edge Function fonctionnelle');
                console.log('✅ GIF généré et valide');
                console.log('✅ Solution prête pour déploiement');
            } else {
                console.log('\n⚠️ TESTS PARTIELS');
                console.log('✅ Edge Function accessible');
                console.log('❌ GIF généré invalide');
            }
        }
        
    } catch (error) {
        console.log('\n❌ ÉCHEC DES TESTS');
        console.log('💡 Vérifications à faire:');
        console.log('  - Edge Function déployée ?');
        console.log('  - Configuration Supabase correcte ?');
        console.log('  - Connexion internet stable ?');
        console.log('  - CORS configuré correctement ?');
        console.log('\n📄 Erreur détaillée:', error.message);
    }
}

// Exécuter les tests
if (require.main === module) {
    main().catch(console.error);
} 