import React from 'react';
import LoanDetailPage, { LoanDetailConfig } from '../../components/LoanDetail/LoanDetailPage';
import { Building, Calendar, ChartColumnBig, Cog, RefreshCcw, Zap } from 'lucide-react';

const config: LoanDetailConfig = {
  accentColor: '#7c3aed',
  accentGradient: 'linear-gradient(150deg, #5b21b6 0%, #7c3aed 60%, #9333ea 100%)',
  heroTag: 'Business Loan',
  heroTitle: 'Scale Your Business with Smart, Flexible Financing',
  heroSubtitle: 'Working capital, equipment purchase, expansion, or cash flow management — get the fuel your business needs to grow without collateral requirements.',
  heroStats: [
    { value: '₹2Cr', label: 'Max Loan Amount' },
    { value: '12%', label: 'Starting Interest Rate' },
    { value: '48 hrs', label: 'Approval Time' },
    { value: '5 Yrs', label: 'Max Tenure' },
  ],
  rateValue: '12%',
  rateLabel: 'Interest Rate Starting at',
  whyTitle: 'Why Choose Our Business Loan?',
  features: [
    { icon: Building, title: 'Up to ₹2 Crore', body: 'Access large business financing without pledging personal assets as collateral.' },
    { icon: Cog, title: 'Flexible End-Use', body: 'Use funds for working capital, machinery, expansion, or any business purpose.' },
    { icon: ChartColumnBig, title: 'GST-Based Loans', body: 'Leverage your GST filings and business statements for quicker loan eligibility.' },
    { icon: RefreshCcw, title: 'Overdraft Facility', body: 'Choose between term loans, overdraft, or revolving credit lines to suit your needs.' },
    { icon: Calendar, title: 'Tenure up to 5 Years', body: 'Flexible repayment schedules aligned with your business cash flow cycles.' },
    { icon: Zap, title: 'Fast Disbursal', body: 'Get funds within 48-72 hours of document submission and approval.' },
  ],
  keyFeatures: [
    'No collateral required',
    'Minimal documentation',
    'Competitive interest rates',
    'Flexible repayment',
    'Quick approval',
    'Online application',
    'Multiple lenders',
    'Dedicated advisor',
  ],
  processSteps: [
    { title: 'Apply Online', desc: 'Submit your business loan application' },
    { title: 'Business Verification', desc: 'Income, GST & bank statement check' },
    { title: 'Credit Assessment', desc: 'Underwriting and risk evaluation' },
    { title: 'Approval', desc: 'Receive sanction letter with terms' },
    { title: 'Disbursal', desc: 'Funds credited to business account' },
  ],
  faqs: [
    { q: 'What business vintage is required?', a: 'Most lenders require a minimum of 2-3 years of business vintage with consistent profitability.' },
    { q: 'Can startups apply for a business loan?', a: 'Startups with less than 2 years of vintage can explore MSME loan schemes and government-backed loan programs.' },
    { q: 'What is the maximum loan amount?', a: 'You can borrow up to ₹2 Crore based on your business revenue, profitability, and credit score.' },
    { q: 'Is ITR mandatory?', a: 'Yes, most lenders require the last 2-3 years ITR. Some lenders offer bank statement-based loans for businesses without formal ITR.' },
    { q: 'Can I get a business loan with a low credit score?', a: 'Some lenders offer business loans with a CIBIL score of 650+, though lower scores may attract higher interest rates.' },
  ],
  formConfig: {
    formTitle: 'Business Loan Application',
    productType: 'Business Loan',
    leftPanel: {
      heading: 'Grow Your Business with EBS',
      subtext: 'Access tailored business financing from top banks and NBFCs through a single platform.',
      benefits: [
        'Compare 15+ lenders instantly',
        'No hidden fees or charges',
        'Expert business finance advisors',
        'Quick pre-approval check',
        'Doorstep document pickup',
      ],
    },
  },
};

const BusinessLoan: React.FC = () => <LoanDetailPage {...config} />;
export default BusinessLoan;
