import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// Interface pour les données reçues
interface FrameData {
  frames: string[][]
  config: {
    size: number
    frameDelay: number
    repeat: number
    quality: number
  }
}

// Fonction principale de l'Edge Function
serve(async (req) => {
  // Headers CORS pour permettre les appels depuis l'app
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  }

  // Gestion des requêtes OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Vérification de la méthode
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Méthode non autorisée' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Récupération des données
    const payload: FrameData = await req.json()
    console.log('🎬 Début création GIF serveur:', {
      frameCount: payload.frames.length,
      size: payload.config.size,
      delay: payload.config.frameDelay
    })

    // Validation des données
    if (!payload.frames || !Array.isArray(payload.frames) || payload.frames.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Aucune frame fournie' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Génération du GIF avec une approche simplifiée
    const gifBuffer = await createGifFromFrames(payload.frames, payload.config)

    console.log('✅ GIF créé avec succès, taille:', gifBuffer.byteLength)

    // Retour du GIF généré
    return new Response(gifBuffer, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'image/gif',
        'Content-Disposition': 'attachment; filename="animation.gif"',
        'Content-Length': gifBuffer.byteLength.toString()
      }
    })

  } catch (error) {
    console.error('❌ Erreur création GIF:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Erreur lors de la création du GIF', 
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

// Fonction pour créer le GIF à partir des frames
async function createGifFromFrames(frames: string[][], config: any): Promise<Uint8Array> {
  // Pour cette implémentation, on va utiliser une approche directe
  // en créant un GIF simple avec les données des frames
  
  const { size, frameDelay, repeat } = config
  
  // Structure basique d'un GIF
  const header = createGifHeader(size, size, repeat)
  const globalColorTable = createGlobalColorTable()
  
  let gifData = new Uint8Array(0)
  
  // Ajouter header + color table
  gifData = concatUint8Arrays(gifData, header)
  gifData = concatUint8Arrays(gifData, globalColorTable)
  
  // Traiter chaque frame
  for (let frameIndex = 0; frameIndex < frames.length; frameIndex++) {
    console.log(`📸 Traitement frame ${frameIndex + 1}/${frames.length}`)
    
    const frame = frames[frameIndex]
    const frameData = createFrameData(frame, size, frameDelay)
    gifData = concatUint8Arrays(gifData, frameData)
  }
  
  // Ajouter le trailer GIF
  const trailer = new Uint8Array([0x3B])
  gifData = concatUint8Arrays(gifData, trailer)
  
  return gifData
}

// Créer l'header GIF
function createGifHeader(width: number, height: number, repeat: number): Uint8Array {
  const header = new Uint8Array(19)
  
  // Signature GIF89a
  header.set([0x47, 0x49, 0x46, 0x38, 0x39, 0x61], 0)
  
  // Largeur (little endian)
  header[6] = width & 0xFF
  header[7] = (width >> 8) & 0xFF
  
  // Hauteur (little endian)
  header[8] = height & 0xFF
  header[9] = (height >> 8) & 0xFF
  
  // Packed byte: couleur globale activée
  header[10] = 0xF7 // 11110111 - global color table flag
  
  // Background color index
  header[11] = 0x00
  
  // Pixel aspect ratio
  header[12] = 0x00
  
  // Application Extension pour boucle
  if (repeat !== 1) {
    const appExt = new Uint8Array([
      0x21, 0xFF, 0x0B,                                      // Extension introducer
      0x4E, 0x45, 0x54, 0x53, 0x43, 0x41, 0x50, 0x45,      // NETSCAPE
      0x32, 0x2E, 0x30,                                      // 2.0
      0x03, 0x01,                                            // Sub-block
      repeat & 0xFF, (repeat >> 8) & 0xFF,                  // Loop count
      0x00                                                   // Block terminator
    ])
    return concatUint8Arrays(header, appExt)
  }
  
  return header
}

// Créer la table de couleurs globale
function createGlobalColorTable(): Uint8Array {
  // Table de 256 couleurs (768 bytes)
  const colorTable = new Uint8Array(768)
  
  // Couleurs de base
  const basicColors = [
    [255, 255, 255], // Blanc
    [0, 0, 0],       // Noir
    [255, 0, 0],     // Rouge
    [0, 255, 0],     // Vert
    [0, 0, 255],     // Bleu
    [255, 255, 0],   // Jaune
    [255, 0, 255],   // Magenta
    [0, 255, 255],   // Cyan
  ]
  
  // Remplir les premières couleurs
  for (let i = 0; i < basicColors.length; i++) {
    const [r, g, b] = basicColors[i]
    colorTable[i * 3] = r
    colorTable[i * 3 + 1] = g
    colorTable[i * 3 + 2] = b
  }
  
  // Générer une palette étendue pour couvrir plus de couleurs
  for (let i = basicColors.length; i < 256; i++) {
    colorTable[i * 3] = (i * 3) % 256
    colorTable[i * 3 + 1] = (i * 5) % 256
    colorTable[i * 3 + 2] = (i * 7) % 256
  }
  
  return colorTable
}

// Créer les données d'une frame
function createFrameData(frame: string[], size: number, delay: number): Uint8Array {
  // Graphic Control Extension
  const gce = new Uint8Array([
    0x21, 0xF9, 0x04,                          // Extension introducer
    0x04,                                       // Packed byte
    delay & 0xFF, (delay >> 8) & 0xFF,        // Delay time
    0x00,                                       // Transparent color index
    0x00                                        // Block terminator
  ])
  
  // Image Descriptor
  const imageDesc = new Uint8Array([
    0x2C,                                       // Image separator
    0x00, 0x00,                                // Left position
    0x00, 0x00,                                // Top position
    size & 0xFF, (size >> 8) & 0xFF,          // Width
    size & 0xFF, (size >> 8) & 0xFF,          // Height
    0x00                                        // Packed byte (no local color table)
  ])
  
  // Données d'image simplifiées (LZW compression minimale)
  const pixelData = createSimplePixelData(frame, size)
  
  return concatUint8Arrays(gce, concatUint8Arrays(imageDesc, pixelData))
}

// Créer des données pixel simplifiées
function createSimplePixelData(frame: string[], size: number): Uint8Array {
  // Créer une image basique sans compression LZW complexe
  const pixels = new Uint8Array(size * size)
  
  // Convertir les couleurs hex en indices de couleur
  for (let i = 0; i < frame.length && i < pixels.length; i++) {
    const color = frame[i]
    if (color && color !== '#FFFFFF' && color !== 'transparent') {
      // Mapper les couleurs hex vers des indices de couleur basiques
      pixels[i] = mapColorToIndex(color)
    } else {
      pixels[i] = 0 // Blanc par défaut
    }
  }
  
  // LZW encoding très simple (minimum viable)
  const lzwData = simpleLZWEncode(pixels)
  
  // Ajouter la taille LZW et les données
  const result = new Uint8Array(2 + lzwData.length + 1)
  result[0] = 8 // LZW minimum code size
  result[1] = lzwData.length & 0xFF
  result.set(lzwData, 2)
  result[result.length - 1] = 0 // Block terminator
  
  return result
}

// Mapper une couleur hex vers un indice
function mapColorToIndex(hexColor: string): number {
  // Simplification : utiliser un hash basique de la couleur
  if (!hexColor || !hexColor.startsWith('#')) return 0
  
  const hex = hexColor.slice(1)
  const hash = hex.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0)
  }, 0)
  
  return (hash % 255) + 1 // Éviter l'index 0 (blanc)
}

// Encodage LZW très simple
function simpleLZWEncode(data: Uint8Array): Uint8Array {
  // Pour cette version simple, on retourne les données presque telles quelles
  // avec un minimum d'encodage LZW pour que ce soit valide
  const result: number[] = []
  
  // Clear code
  result.push(256)
  
  // Données simplifiées
  for (let i = 0; i < data.length; i++) {
    result.push(data[i])
  }
  
  // End of information
  result.push(257)
  
  return new Uint8Array(result)
}

// Utilitaire pour concaténer des Uint8Array
function concatUint8Arrays(a: Uint8Array, b: Uint8Array): Uint8Array {
  const result = new Uint8Array(a.length + b.length)
  result.set(a, 0)
  result.set(b, a.length)
  return result
} 