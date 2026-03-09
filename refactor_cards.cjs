const fs = require('fs');
const path = require('path');

const files = [
  'AxisCreditCard.tsx',
  'HDFCCreditCard.tsx',
  'ICICICreditCard.tsx',
  'IDFCCreditCard.tsx',
  'IndusIndCreditCard.tsx'
];

const bankDetails = {
  'AxisCreditCard.tsx': { name: 'Axis Bank', slug: 'axis-bank', heroImgs: '["https://www.axisbank.com/images/default-source/revamp_new/cards/desktop/neo-credit-card.png?sfvrsn=2a9e5255_2", "https://www.axisbank.com/images/default-source/revamp_new/cards/desktop/flipkart-axis-bank-credit-card.png?sfvrsn=3d9e5255_2"]', desc: 'Experience a world of privileges with Axis Bank Credit Cards.' },
  'HDFCCreditCard.tsx': { name: 'HDFC Bank', slug: 'hdfc-bank', heroImgs: '[hdfcHeroImage]', desc: 'Discover rewarding experiences with HDFC Bank Credit Cards.' },
  'ICICICreditCard.tsx': { name: 'ICICI Bank', slug: 'icici-bank', heroImgs: '[iciciHeroImage]', desc: 'Unlock unlimited benefits with ICICI Bank Credit Cards.' },
  'IDFCCreditCard.tsx': { name: 'IDFC FIRST Bank', slug: 'idfc-first-bank', heroImgs: '[idfcHeroImage]', desc: 'Enjoy lifetime free credit cards with never expiring reward points.' },
  'IndusIndCreditCard.tsx': { name: 'IndusInd Bank', slug: 'indusind-bank', heroImgs: '[]', desc: 'Premium privileges curated exclusively for you.' }
};

const cardsDir = '/Users/ticktix/Desktop/projects/EBS-LIVE/src/pages/Cards';

files.forEach(file => {
  const filePath = path.join(cardsDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${file} - not found`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  // Find where styled components begin
  const pageContainerIdx = lines.findIndex(line => line.includes('const PageContainer = styled.div') || line.includes('const PageContainer = styled.main'));
  if (pageContainerIdx !== -1) {
    let newLines = lines.slice(0, pageContainerIdx);
    
    // Ensure CreditCardPage import is added at top
    // Also remove unused imports to avoid TS errors
    let cleanLines = [];
    for (let i = 0; i < newLines.length; i++) {
        const line = newLines[i];
        if (line.includes('import styled') || line.includes('import { Button') || line.includes('import { StarFilled') || line.includes('import { motion') || line.includes('import Footer') || line.includes('import html2canvas') || line.includes('import jsPDF') || line.includes('import { useProtectedAction }')) {
            continue;
        }
        cleanLines.push(line);
    }
    
    cleanLines.unshift(`import CreditCardPage, { Card, CardDetailsMap } from '../../components/CreditCard/CreditCardPage';`);
    
    // Remove the old interface Card and CardDetails blocks because we import them now
    const interfaceCardIdx = cleanLines.findIndex(line => line.trim() === 'interface Card {');
    const interfaceEndIdx1 = cleanLines.findIndex((line, idx) => idx > interfaceCardIdx && line.trim() === '}');
    
    const interfaceCardDetailsIdx = cleanLines.findIndex(line => line.trim() === 'interface CardDetails {');
    const interfaceEndIdx2 = cleanLines.findIndex((line, idx) => idx > interfaceCardDetailsIdx && line.trim() === '}');
    
    const interfaceMapIdx = cleanLines.findIndex(line => line.trim() === 'interface CardDetailsMap {');
    const interfaceEndIdx3 = cleanLines.findIndex((line, idx) => idx > interfaceMapIdx && line.trim() === '}');
    
    let filteredLines = [];
    let skip = false;
    for (let i=0; i<cleanLines.length; i++) {
        if (!skip) {
           if (i === interfaceCardIdx || i === interfaceCardDetailsIdx || i === interfaceMapIdx) {
               skip = true;
           }
        }
        if (!skip) filteredLines.push(cleanLines[i]);
        if (skip && cleanLines[i].trim() === '}') skip = false;
    }
    cleanLines = filteredLines;
    
    let componentName = file.replace('.tsx', '');
    if (componentName === 'AxisCreditCard') componentName = 'AUCreditCard';
    
    const exportComponent = `
export default function ${componentName}() {
  return (
    <CreditCardPage
      bankName="${bankDetails[file].name}"
      heroImages={${bankDetails[file].heroImgs}}
      heroDescription="${bankDetails[file].desc}"
      cards={creditCards}
      cardDetailsMap={cardDetailsMap}
    />
  );
}
`;
    fs.writeFileSync(filePath, cleanLines.join('\n') + '\n' + exportComponent);
    console.log(`Refactored ${file}`);
  } else {
    console.log(`Could not find styled component boundary in ${file}`);
  }
});
