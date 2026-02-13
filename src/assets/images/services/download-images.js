import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = [
  {
    name: 'personal-loan.jpg',
    url: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800&q=80'
  },
  {
    name: 'credit-card.jpg',
    url: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&q=80'
  },
  {
    name: 'business-loan.jpg',
    url: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80'
  },
  {
    name: 'short-term-loan.jpg',
    url: 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=800&q=80'
  },
  {
    name: 'home-loan.jpg',
    url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'
  },
  {
    name: 'gold-loan.jpg',
    url: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80'
  },
  {
    name: 'property-loan.jpg',
    url: 'https://images.unsplash.com/photo-1560518883-b33625c3bf09?w=800&q=80'
  },
  {
    name: 'balance-transfer.jpg',
    url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80'
  },
  {
    name: 'health-insurance.jpg',
    url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80'
  },
  {
    name: 'life-insurance.jpg',
    url: 'https://images.unsplash.com/photo-1576089172869-4f5f6f315620?w=800&q=80'
  },
];

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(fs.createWriteStream(filename))
          .on('error', reject)
          .once('close', () => resolve(filename));
      } else {
        response.resume();
        reject(new Error(`Request Failed With a Status Code: ${response.statusCode}`));
      }
    });
  });
};

async function downloadAll() {
  for (const image of images) {
    const filename = path.join(__dirname, image.name);
    try {
      await downloadImage(image.url, filename);
      console.log(`Downloaded ${image.name}`);
    } catch (error) {
      console.error(`Error downloading ${image.name}:`, error.message);
    }
  }
}

downloadAll();
