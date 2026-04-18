import React from 'react';
import LoanDetailPage, { LoanDetailConfig } from '../../components/LoanDetail/LoanDetailPage';
import { Building, Calendar, ChartNoAxesColumnIncreasing, CreditCard, Lock, TrendingDown } from 'lucide-react';

const config: LoanDetailConfig = {
  accentColor: '#dc2626',
  accentGradient: 'linear-gradient(150deg, #b91c1c 0%, #dc2626 60%, #ef4444 100%)',
  heroTag: 'Loan Against Property',
  heroTitle: 'Unlock the Hidden Value in Your Property',
  heroSubtitle: 'Get a secured loan against your residential, commercial, or industrial property at significantly lower interest rates than personal loans.',
  heroStats: [
    { value: '₹10Cr', label: 'Max Loan Amount' },
    { value: '9.5%', label: 'Starting Interest Rate' },
    { value: '15 Yrs', label: 'Max Tenure' },
    { value: '70%', label: 'Max LTV' },
  ],
  rateValue: '9.50%',
  rateLabel: 'LAP Rates Starting at',
  whyTitle: 'Why Choose Loan Against Property?',
  features: [
    { icon: ChartNoAxesColumnIncreasing, title: 'Up to ₹10 Crore', body: 'Access high-value financing against residential, commercial, or industrial property.' },
    { icon: TrendingDown, title: 'Lower Interest Rates', body: 'Secured nature means significantly lower rates compared to unsecured personal loans.' },
    { icon: Calendar, title: 'Tenure up to 15 Years', body: 'Longer repayment tenure helps reduce monthly EMI burden substantially.' },
    { icon: Building, title: 'Multiple Property Types', body: 'Residential, commercial, industrial, or mixed-use — we accept various property types.' },
    { icon: CreditCard, title: 'Use Funds Freely', body: 'Business expansion, education, medical needs, or any other financial requirement.' },
    { icon: Lock, title: 'Retain Ownership', body: 'Continue using your property while leveraging its value to meet your financial goals.' },
  ],
  keyFeatures: [
    'Up to 70% LTV',
    'Retain property use',
    'No end-use restriction',
    'Part-payment allowed',
    'Balance transfer option',
    'Doorstep service',
    'Minimal documentation',
    'Quick processing',
  ],
  processSteps: [
    { title: 'Application', desc: 'Submit loan application with property details' },
    { title: 'Document Submission', desc: 'Property and income documents' },
    { title: 'Property Evaluation', desc: 'Technical and legal assessment' },
    { title: 'Loan Approval', desc: 'Approval and offer letter generation' },
    { title: 'Disbursement', desc: 'Mortgage registration and fund credit' },
  ],
  faqs: [
    { q: 'What types of properties are accepted?', a: 'We accept residential properties, commercial properties, industrial properties, and mixed-use properties. The property should be legally clear and marketable.' },
    { q: 'What is the maximum loan amount available?', a: 'You can get up to 70% of your property\'s current market value as loan amount, going up to ₹10 Crore depending on property value and repayment capacity.' },
    { q: 'What documents are required?', a: 'Property documents (title deed, NOC), income proof (salary slips or ITR), identity and address proof, bank statements, and business proof if self-employed.' },
    { q: 'Can I prepay the loan?', a: 'Yes, part-payments up to 25% of principal annually are typically allowed without charges. Full prepayment terms vary by lender.' },
    { q: 'How long is the processing time?', a: 'Typically 7-14 working days subject to document submission and property evaluation, ensuring thorough verification.' },
  ],
  formConfig: {
    formTitle: 'Loan Against Property Application',
    productType: 'Loan Against Property',
    leftPanel: {
      heading: 'Leverage Your Property\'s Value',
      subtext: 'Get the best LAP offers from 15+ lenders with our expert guidance.',
      benefits: [
        'Best rates across lenders',
        'Free property valuation guidance',
        'Legal document assistance',
        'Fastest LAP processing',
        'Transparent zero hidden fees',
      ],
    },
  },
};

const LoanAgainstProperty: React.FC = () => <LoanDetailPage {...config} />;
export default LoanAgainstProperty;
