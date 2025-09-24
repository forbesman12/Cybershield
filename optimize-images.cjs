#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = './src/assets/';
const OUTPUT_DIR = './src/assets/optimized/';

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeImage(inputPath, filename) {
  const outputPath = path.join(OUTPUT_DIR, filename);
  const fileExtension = path.extname(filename).toLowerCase();
  
  console.log(`Optimizing: ${filename}...`);
  
  try {
    let pipeline = sharp(inputPath);
    
    // Get image info first
    const metadata = await pipeline.metadata();
    console.log(`  Original: ${metadata.width}x${metadata.height}, ${Math.round(metadata.size / 1024)}KB`);
    
    // Resize if too large (max width 1920px for high-quality displays)
    if (metadata.width > 1920) {
      pipeline = pipeline.resize(1920, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }
    
    if (fileExtension === '.jpg' || fileExtension === '.jpeg') {
      // Optimize JPEG
      await pipeline
        .jpeg({ 
          quality: 85, 
          progressive: true,
          mozjpeg: true 
        })
        .toFile(outputPath);
        
      // Also create WebP version
      const webpPath = outputPath.replace(/\.jpe?g$/i, '.webp');
      await sharp(inputPath)
        .resize(1920, null, { withoutEnlargement: true, fit: 'inside' })
        .webp({ quality: 80 })
        .toFile(webpPath);
        
    } else if (fileExtension === '.png') {
      // Try to convert PNG to JPEG if it doesn't need transparency
      const hasAlpha = metadata.channels === 4;
      
      if (!hasAlpha) {
        // Convert to JPEG for better compression
        const jpegPath = outputPath.replace(/\.png$/i, '.jpg');
        await pipeline
          .jpeg({ 
            quality: 85, 
            progressive: true 
          })
          .toFile(jpegPath);
          
        // Also create WebP
        const webpPath = outputPath.replace(/\.png$/i, '.webp');
        await sharp(inputPath)
          .resize(1920, null, { withoutEnlargement: true, fit: 'inside' })
          .webp({ quality: 80 })
          .toFile(webpPath);
      } else {
        // Keep PNG but optimize
        await pipeline
          .png({ 
            compressionLevel: 9,
            quality: 85
          })
          .toFile(outputPath);
          
        // Create WebP version
        const webpPath = outputPath.replace(/\.png$/i, '.webp');
        await sharp(inputPath)
          .resize(1920, null, { withoutEnlargement: true, fit: 'inside' })
          .webp({ quality: 80 })
          .toFile(webpPath);
      }
    }
    
    // Get optimized file size
    const stats = fs.statSync(outputPath.includes('.jpg') ? outputPath : outputPath.replace(/\.png$/i, '.jpg'));
    const originalStats = fs.statSync(inputPath);
    const reduction = Math.round((1 - stats.size / originalStats.size) * 100);
    
    console.log(`  Optimized: ${Math.round(stats.size / 1024)}KB (${reduction}% reduction)`);
    
  } catch (error) {
    console.error(`Error optimizing ${filename}:`, error.message);
  }
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');
  
  const files = fs.readdirSync(INPUT_DIR)
    .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
    .filter(file => !file.startsWith('.')); // Skip hidden files
  
  console.log(`Found ${files.length} images to optimize\n`);
  
  for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file);
    await optimizeImage(inputPath, file);
    console.log(''); // Empty line for readability
  }
  
  console.log('✅ All images optimized!');
  console.log(`📁 Check the ${OUTPUT_DIR} folder for optimized images`);
  console.log('\n💡 Tips:');
  console.log('1. Replace your original images with the optimized versions');
  console.log('2. Use .webp format for modern browsers with fallbacks');
  console.log('3. Consider lazy loading for images below the fold');
}

main().catch(console.error);
