#!/usr/bin/env node

/**
 * Optimization Script for Saudi Music Community Database
 * Minifies CSS and JavaScript files for production use
 */

const fs = require('fs');
const path = require('path');

// Simple CSS minifier
function minifyCSS(css) {
    return css
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/;\s*}/g, '}') // Remove semicolon before closing brace
        .replace(/\s*{\s*/g, '{') // Remove spaces around opening brace
        .replace(/;\s*/g, ';') // Remove spaces after semicolon
        .replace(/,\s*/g, ',') // Remove spaces after comma
        .replace(/:\s*/g, ':') // Remove spaces after colon
        .trim();
}

// Simple JavaScript minifier (basic)
function minifyJS(js) {
    return js
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
        .replace(/\/\/.*$/gm, '') // Remove line comments
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/;\s*}/g, ';}') // Clean up semicolons
        .replace(/\s*{\s*/g, '{') // Remove spaces around braces
        .replace(/\s*}\s*/g, '}')
        .replace(/\s*;\s*/g, ';') // Clean semicolons
        .replace(/,\s*/g, ',') // Clean commas
        .trim();
}

// Optimize image (placeholder - would need actual image optimization library)
function optimizeImage(inputPath, outputPath) {
    console.log(`Image optimization would be performed here for ${inputPath}`);
    console.log('Consider using imagemin, sharp, or similar libraries for production');
    
    // For now, just copy the file
    try {
        fs.copyFileSync(inputPath, outputPath);
        console.log(`✓ Image copied: ${outputPath}`);
    } catch (error) {
        console.error(`✗ Error copying image: ${error.message}`);
    }
}

// Main optimization function
function optimize() {
    console.log('🚀 Starting optimization process...\n');

    // Create dist directory if it doesn't exist
    const distDir = path.join(__dirname, 'dist');
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir);
        console.log('📁 Created dist directory');
    }

    // Optimize CSS
    try {
        const cssContent = fs.readFileSync('styles.css', 'utf8');
        const minifiedCSS = minifyCSS(cssContent);
        fs.writeFileSync(path.join(distDir, 'styles.min.css'), minifiedCSS);
        
        const originalSize = Buffer.byteLength(cssContent, 'utf8');
        const minifiedSize = Buffer.byteLength(minifiedCSS, 'utf8');
        const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
        
        console.log(`✓ CSS minified: ${originalSize} → ${minifiedSize} bytes (${savings}% reduction)`);
    } catch (error) {
        console.error(`✗ Error minifying CSS: ${error.message}`);
    }

    // Optimize JavaScript
    try {
        const jsContent = fs.readFileSync('app.js', 'utf8');
        const minifiedJS = minifyJS(jsContent);
        fs.writeFileSync(path.join(distDir, 'app.min.js'), minifiedJS);
        
        const originalSize = Buffer.byteLength(jsContent, 'utf8');
        const minifiedSize = Buffer.byteLength(minifiedJS, 'utf8');
        const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
        
        console.log(`✓ JavaScript minified: ${originalSize} → ${minifiedSize} bytes (${savings}% reduction)`);
    } catch (error) {
        console.error(`✗ Error minifying JavaScript: ${error.message}`);
    }

    // Copy and optimize other files
    const filesToCopy = [
        'index.html',
        'sw.js',
        'manifest.json',
        'GOASTFLOWER_LOGO.png'
    ];

    filesToCopy.forEach(file => {
        try {
            const sourcePath = path.join(__dirname, file);
            const destPath = path.join(distDir, file);
            
            if (fs.existsSync(sourcePath)) {
                if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
                    optimizeImage(sourcePath, destPath);
                } else {
                    fs.copyFileSync(sourcePath, destPath);
                    console.log(`✓ Copied: ${file}`);
                }
            } else {
                console.warn(`⚠ File not found: ${file}`);
            }
        } catch (error) {
            console.error(`✗ Error copying ${file}: ${error.message}`);
        }
    });

    // Update HTML to use minified files
    try {
        const htmlPath = path.join(distDir, 'index.html');
        let htmlContent = fs.readFileSync(htmlPath, 'utf8');
        
        // Replace with minified versions
        htmlContent = htmlContent
            .replace('styles.css', 'styles.min.css')
            .replace('app.js', 'app.min.js');
        
        fs.writeFileSync(htmlPath, htmlContent);
        console.log('✓ Updated HTML to use minified files');
    } catch (error) {
        console.error(`✗ Error updating HTML: ${error.message}`);
    }

    console.log('\n🎉 Optimization complete! Files are ready in the dist/ directory.');
    console.log('\n📊 Next steps:');
    console.log('1. Test the optimized files in the dist/ directory');
    console.log('2. Configure your web server with proper compression (gzip/brotli)');
    console.log('3. Set up appropriate cache headers');
    console.log('4. Consider using a CDN for static assets');
}

// Run optimization if script is executed directly
if (require.main === module) {
    optimize();
}

module.exports = { optimize, minifyCSS, minifyJS };