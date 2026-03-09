import React from 'react';
import LoanDetailPage, { LoanDetailConfig } from '../../components/LoanDetail/LoanDetailPage';
import { DiamondIcon, DollarSignIcon, Lock, NotepadText, TargetIcon, Zap } from 'lucide-react';

const config: LoanDetailConfig = {
  accentColor: '#d97706',
  accentGradient: 'linear-gradient(150deg, #b45309 0%, #d97706 60%, #f59e0b 100%)',
  heroTag: 'Gold Loan',
  heroTitle: 'Instant Funds Against Your Gold — Approved in 30 Minutes',
  heroSubtitle: 'Pledge your gold jewellery, coins, or bars to get immediate liquidity at competitive rates with minimal paperwork and secure storage.',
  heroStats: [
    { value: '₹50L', label: 'Max Loan Amount' },
    { value: '7.5%', label: 'Starting Interest Rate' },
    { value: '30 min', label: 'Approval Time' },
    { value: '75%', label: 'LTV on Gold Value' },
  ],
  rateValue: '7.50%',
  rateLabel: 'Gold Loan Rates Starting at',
  whyTitle: 'Why Choose Our Gold Loan?',
  features: [
    { icon: Zap, title: 'Instant Approval', body: 'Get your gold loan approved within 30 minutes of visiting our partner branch.' },
    { icon: DiamondIcon, title: 'Up to 75% LTV', body: 'Get up to 75% of your gold\'s current market value as the loan amount.' },
    { icon: Lock, title: 'Secure Storage', body: 'Your gold is stored in high-security bank vaults with comprehensive insurance coverage.' },
    { icon: NotepadText, title: 'Minimal Documents', body: 'Only ID proof and address proof required. No income documents or ITR needed.' },
    { icon: DollarSignIcon, title: 'Flexible Repayment', body: 'Choose from monthly interest, EMI, or bullet payment at end of tenure options.' },
    { icon: TargetIcon, title: 'Transparent Valuation', body: 'Expert appraisers use BIS-certified methods to give you fair and instant gold valuation.' },
  ],
  keyFeatures: [
    'No income proof needed',
    'Same-day disbursement',
    'Up to ₹50 Lakhs',
    'All gold types accepted',
    'Zero foreclosure charges',
    'Insured secure storage',
    'Transparent valuation',
    '24×7 customer support',
  ],
  processSteps: [
    { title: 'Visit Branch', desc: 'Bring gold and ID to our partner branch' },
    { title: 'Gold Assessment', desc: 'Expert purity and weight evaluation' },
    { title: 'Documentation', desc: 'Quick KYC and form completion' },
    { title: 'Loan Approval', desc: 'Instant sanction and offer letter' },
    { title: 'Disbursement', desc: 'Cash or account credit immediately' },
  ],
  faqs: [
    { q: 'What type of gold is accepted?', a: 'We accept gold jewellery of 18-24 karat purity, including ornaments, coins, and bars from reputed manufacturers. Hallmarked gold is processed faster.' },
    { q: 'What is the maximum loan amount?', a: 'You can get up to 75% of your gold\'s current market value, up to a maximum of ₹50 Lakhs depending on quantity and quality of gold pledged.' },
    { q: 'What documents are required?', a: 'Only valid ID proof (Aadhaar, PAN, or Passport) and address proof are required. No income proof or ITR needed.' },
    { q: 'How is the gold valued?', a: 'Our partner bank\'s expert appraisers use advanced BIS-certified testing methods to determine purity. Loan value is calculated based on current market rate.' },
    { q: 'What are the repayment options?', a: 'We offer: (1) monthly interest with principal at end, (2) regular EMIs, (3) bullet payment at end of tenure. Tenure up to 24 months.' },
  ],
  formConfig: {
    formTitle: 'Gold Loan Application',
    productType: 'Gold Loan',
    leftPanel: {
      heading: 'Unlock the Power of Your Gold',
      subtext: 'Get the best gold loan offer from our network of trusted bank partners.',
      benefits: [
        'Best per-gram rate guaranteed',
        'Zero processing fees*',
        'Secure partner bank vaults',
        'Dedicated gold loan advisor',
        'Instant branch appointment',
      ],
    },
  },
};

const GoldLoan: React.FC = () => <LoanDetailPage {...config} />;
export default GoldLoan;
