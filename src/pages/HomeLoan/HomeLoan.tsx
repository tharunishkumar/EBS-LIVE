import React from 'react';
import LoanDetailPage, { LoanDetailConfig } from '../../components/LoanDetail/LoanDetailPage';
import { ArrowUp, Calendar, HomeIcon, RefreshCcw, TrendingDown, Zap } from 'lucide-react';

const config: LoanDetailConfig = {
  accentColor: '#059669',
  accentGradient: 'linear-gradient(150deg, #047857 0%, #059669 60%, #10b981 100%)',
  heroTag: 'Home Loan',
  heroTitle: 'Make Your Dream Home a Reality with Low-Rate Home Loans',
  heroSubtitle: 'Competitive rates starting at 8.50% p.a., flexible tenures up to 30 years, and financing up to 90% of your property value.',
  heroStats: [
    { value: '₹5Cr', label: 'Max Loan Amount' },
    { value: '8.5%', label: 'Starting Interest Rate' },
    { value: '30 Yrs', label: 'Max Tenure' },
    { value: '90%', label: 'LTV Ratio' },
  ],
  rateValue: '8.50%',
  rateLabel: 'Home Loan Rates Starting at',
  whyTitle: 'Why Choose Our Home Loan?',
  features: [
    { icon: HomeIcon, title: 'Up to 90% Financing', body: 'Finance up to 90% of your property value for properties up to ₹30 lakhs.' },
    { icon: TrendingDown, title: 'Lowest Rates', body: 'Access home loans starting at 8.50% p.a. from India\'s leading housing finance companies.' },
    { icon: Calendar, title: 'Long Tenure', body: 'Choose repayment tenures up to 30 years to keep your EMIs comfortable and manageable.' },
    { icon: Zap, title: 'Quick Processing', body: 'Fast approval process with minimal documentation and doorstep document collection.' },
    { icon: RefreshCcw, title: 'Balance Transfer', body: 'Switch your existing home loan to a lower interest rate with our hassle-free BT option.' },
    { icon: ArrowUp, title: 'Top-Up Loan', body: 'Get additional funds on top of your existing home loan for renovation or personal needs.' },
  ],
  keyFeatures: [
    'No prepayment charges',
    'Doorstep doc collection',
    'Quick disbursement',
    'Legal support included',
    'Property search assist',
    'Balance transfer option',
    'Top-up loan facility',
    '30-year max tenure',
  ],
  processSteps: [
    { title: 'Apply Online', desc: 'Fill the quick application form' },
    { title: 'Document Submission', desc: 'Submit income and property docs' },
    { title: 'Property Assessment', desc: 'Technical and legal verification' },
    { title: 'Loan Approval', desc: 'Sanction letter and offer generation' },
    { title: 'Disbursement', desc: 'Loan amount disbursed as per schedule' },
  ],
  faqs: [
    { q: 'What is the maximum loan amount I can get?', a: 'We finance up to 90% of property value for properties up to ₹30 lakhs, 80% for up to ₹75 lakhs, and 75% for properties above ₹75 lakhs.' },
    { q: 'What is the processing fee?', a: 'The processing fee is typically 0.5% of the loan amount or ₹10,000, whichever is lower, covering application processing and property evaluation.' },
    { q: 'Can I prepay my home loan?', a: 'Yes, you can prepay partially or fully with zero prepayment charges when paying from your own sources. Balance transfer cases may have different terms.' },
    { q: 'What documents are required?', a: 'Identity proof, address proof, income documents (salary slips or ITR), bank statements, property documents, and passport-size photographs.' },
    { q: 'How long does the process take?', a: 'Typically 7-15 working days from submission of all required documents, depending on property documentation complexity.' },
  ],
  formConfig: {
    formTitle: 'Home Loan Application',
    productType: 'Home Loan',
    leftPanel: {
      heading: 'Your Dream Home Awaits',
      subtext: 'We connect you with the best home loan offers from 20+ banks and HFCs.',
      benefits: [
        'Access 20+ bank & HFC rates',
        'Free credit score check',
        'Dedicated home loan expert',
        'End-to-end legal support',
        'Disbursement in 15 days',
      ],
    },
  },
};

const HomeLoan: React.FC = () => <LoanDetailPage {...config} />;
export default HomeLoan;
