import React from 'react';
import LoanDetailPage, { LoanDetailConfig } from '../../components/LoanDetail/LoanDetailPage';
import { Calendar, CircleDollarSign, Lock, RefreshCcw, SmartphoneIcon, Zap } from 'lucide-react';

const config: LoanDetailConfig = {
  accentColor: '#0077ff',
  accentGradient: 'linear-gradient(150deg, #0047c8 0%, #0077ff 60%, #2193ff 100%)',
  heroTag: 'Personal Loan',
  heroTitle: 'Fast, Flexible Personal Loans — No Collateral Required',
  heroSubtitle: 'Get the funds you need for any purpose — medical emergencies, travel, education, or wedding — with quick approval and minimal paperwork.',
  heroStats: [
    { value: '₹40L', label: 'Max Loan Amount' },
    { value: '10.5%', label: 'Starting Interest Rate' },
    { value: '60 min', label: 'Approval Time' },
    { value: '5 Yrs', label: 'Max Tenure' },
  ],
  rateValue: '10.49%',
  rateLabel: 'Interest Rate Starting at',
  whyTitle: 'Why Choose Our Personal Loan?',
  features: [
    { icon: Zap, title: 'Instant Approval', body: 'Get your loan approved within 60 minutes with our fully digital, paperless process.' },
    { icon: Lock, title: 'No Collateral', body: 'Unsecured loan with zero collateral required. Your credit score does the talking.' },
    { icon: CircleDollarSign, title: 'Up to ₹40 Lakhs', body: 'Borrow up to ₹40 lakhs based on your income and creditworthiness.' },
    { icon: Calendar, title: 'Flexible Tenure', body: 'Choose from 12 to 60 months repayment tenure that suits your budget.' },
    { icon: SmartphoneIcon, title: '100% Digital', body: 'Apply, upload docs, and get disbursal — entirely online without any branch visit.' },
    { icon: RefreshCcw, title: 'Balance Transfer', body: 'Transfer your existing high-interest personal loan for better rates and lower EMIs.' },
  ],
  keyFeatures: [
    'Minimal documentation',
    'No hidden charges',
    'Pre-approved offers',
    'Zero foreclosure fee*',
    'Part-payment facility',
    'Dedicated manager',
    'Online account access',
    'Multi-bank options',
  ],
  processSteps: [
    { title: 'Apply Online', desc: 'Fill our quick 5-minute application form' },
    { title: 'Upload Docs', desc: 'Submit digital copies of required documents' },
    { title: 'Verification', desc: 'Background and income verification' },
    { title: 'Approval', desc: 'Receive your sanction letter' },
    { title: 'Disbursal', desc: 'Funds credited to your account' },
  ],
  faqs: [
    { q: 'What is the minimum CIBIL score required?', a: 'Most lenders require a CIBIL score of 700+ for personal loans. A higher score (750+) may qualify you for better interest rates.' },
    { q: 'How much can I borrow?', a: 'Loan amounts range from ₹50,000 to ₹40,00,000 depending on your income, credit score, and chosen lender.' },
    { q: 'What documents are required?', a: 'Typically PAN card, Aadhaar card, last 3 months salary slips, last 6 months bank statements, and Form 16.' },
    { q: 'Is there a prepayment penalty?', a: 'Prepayment charges vary by lender — typically 2-4% of the outstanding amount. Some lenders offer zero foreclosure after 12 EMIs.' },
    { q: 'How long does disbursal take?', a: 'Once approved and documents verified, most lenders disburse funds within 24-48 hours directly to your bank account.' },
  ],
  formConfig: {
    formTitle: 'Personal Loan Application',
    productType: 'Personal Loan',
    leftPanel: {
      heading: 'Why Apply Through EBS?',
      subtext: 'Access the best personal loan offers from 15+ lenders through a single application.',
      benefits: [
        'Compare offers from 15+ lenders',
        'Expert guidance at every step',
        'No impact on your credit score',
        'Dedicated relationship manager',
        'Fastest processing guarantee',
      ],
    },
  },
};

const PersonalLoan: React.FC = () => <LoanDetailPage {...config} />;
export default PersonalLoan;
