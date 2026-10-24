const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createOgImages() {
  const publicDir = path.join(__dirname, '..', 'public');
  const logoPath = path.join(publicDir, 'logo.png');

  console.log('Reading logo from:', logoPath);
  if (!fs.existsSync(logoPath)) {
    throw new Error('Logo not found at: ' + logoPath);
  }

  // 1. Create a 600x600 square logo on warm luxury background (perfect for WhatsApp mobile thumbnail)
  const squareSvg = `
    <svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cardGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="70%" stop-color="#FAF8F1" />
          <stop offset="100%" stop-color="#F2EDE0" />
        </radialGradient>
      </defs>
      <rect width="600" height="600" fill="url(#cardGlow)"/>
      <circle cx="300" cy="300" r="270" fill="#FFFFFF" stroke="#C59B27" stroke-width="6"/>
      <circle cx="300" cy="300" r="258" fill="none" stroke="#163A28" stroke-width="1.5" stroke-dasharray="8 6"/>
    </svg>
  `;

  const resizedLogoSquare = await sharp(logoPath)
    .resize(460, 460, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toBuffer();

  const ogLogo = await sharp(Buffer.from(squareSvg))
    .composite([{ input: resizedLogoSquare, top: 70, left: 70 }])
    .png({ quality: 85, compressionLevel: 9 })
    .toBuffer();

  const ogLogoPath = path.join(publicDir, 'og-logo.png');
  fs.writeFileSync(ogLogoPath, ogLogo);
  console.log('Created og-logo.png:', ogLogo.length, 'bytes');

  // 2. Create 1200x630 luxury landscape OG card (for Facebook, Twitter, LinkedIn, WhatsApp desktop)
  const landscapeSvg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0c2217" />
          <stop offset="50%" stop-color="#163A28" />
          <stop offset="100%" stop-color="#0b1e15" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#DFB750" />
          <stop offset="50%" stop-color="#F9E8A2" />
          <stop offset="100%" stop-color="#C59B27" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="1200" height="630" fill="url(#bgGrad)" />
      
      <!-- Ornate Borders -->
      <rect x="28" y="28" width="1144" height="574" rx="20" fill="none" stroke="#C59B27" stroke-width="2.5" stroke-opacity="0.6" />
      <rect x="38" y="38" width="1124" height="554" rx="14" fill="none" stroke="#C59B27" stroke-width="1" stroke-opacity="0.3" stroke-dasharray="10 6" />
      
      <!-- Logo Circular Badge -->
      <circle cx="260" cy="315" r="165" fill="#FAF8F1" stroke="#C59B27" stroke-width="5" />
      <circle cx="260" cy="315" r="154" fill="none" stroke="#163A28" stroke-width="1" stroke-opacity="0.4" />
      
      <!-- Brand & Text Block -->
      <text x="480" y="195" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="url(#goldGrad)" letter-spacing="4">AUTHENTIC AYURVEDIC WELLNESS</text>
      
      <text x="480" y="275" font-family="Georgia, serif" font-size="64" font-weight="bold" fill="#FAF8F1" letter-spacing="-0.5">Axmin Prana</text>
      
      <text x="480" y="335" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="500" fill="#E2EBE5">Classical Ayurvedic Oils, Churnas &amp; Wellness</text>
      
      <text x="480" y="390" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" fill="#A5C4B3">Pain Relief Oil • Ulcer Care • Herbal Hair Oil • Rasayana Formulations</text>
      
      <!-- Trust Badge Pill -->
      <g transform="translate(480, 440)">
        <rect width="420" height="46" rx="23" fill="#C59B27" />
        <text x="210" y="29" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#0C2217" text-anchor="middle" letter-spacing="1.5">100% PURE &amp; AYUSH CERTIFIED</text>
      </g>
    </svg>
  `;

  const resizedLogoCard = await sharp(logoPath)
    .resize(290, 290, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toBuffer();

  const ogCard = await sharp(Buffer.from(landscapeSvg))
    .composite([{ input: resizedLogoCard, top: 170, left: 115 }])
    .jpeg({ quality: 90, mozjpeg: true })
    .toBuffer();

  const ogImagePath = path.join(publicDir, 'og-image.jpg');
  fs.writeFileSync(ogImagePath, ogCard);
  console.log('Created og-image.jpg:', ogCard.length, 'bytes');

  // Also write og-image.png for Next.js file-based metadata in src/app/opengraph-image.png
  const appOgPngPath = path.join(__dirname, '..', 'src', 'app', 'opengraph-image.png');
  const appTwitterPngPath = path.join(__dirname, '..', 'src', 'app', 'twitter-image.png');
  
  const ogCardPng = await sharp(Buffer.from(landscapeSvg))
    .composite([{ input: resizedLogoCard, top: 170, left: 115 }])
    .png({ quality: 90, compressionLevel: 8 })
    .toBuffer();
    
  fs.writeFileSync(appOgPngPath, ogCardPng);
  fs.writeFileSync(appTwitterPngPath, ogCardPng);
  console.log('Created src/app/opengraph-image.png and twitter-image.png:', ogCardPng.length, 'bytes');
  
  console.log('OG images generation completed successfully!');
}

createOgImages().catch(err => {
  console.error('Failed to create OG images:', err);
  process.exit(1);
});
