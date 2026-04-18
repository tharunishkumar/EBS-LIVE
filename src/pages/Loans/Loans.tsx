import React from 'react';
import styled from 'styled-components';
import {
  DollarOutlined, SafetyOutlined, RiseOutlined,
} from '@ant-design/icons';

import Footer from '../../components/Footer/Footer';
import HeroSection from '../../components/Hero/HeroSection';
import LoanCategoryCard from '../../components/ui/LoanCategoryCard';
import SectionHeader from '../../components/ui/SectionHeader';
import ApplicationForm from '../../components/ui/ApplicationForm';
import loanHeroImage from '../../assets/images/hero/loan-main-hero.png';

/* ─── Loan Category Icons ─── */

const PersonalLoanIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 28, height: 28 }}>
    <path d="M20 7H4C2.9 7 2 7.9 2 9V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V9C22 7.9 21.1 7 20 7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 21V5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BusinessLoanIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 28, height: 28 }}>
    <path d="M3 9L12 2L21 9V20C21 21.1 20.1 22 19 22H5C3.9 22 3 21.1 3 20V9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 22V12H15V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HomeLoanIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 28, height: 28 }}>
    <path d="M12 2L22 7V22H2V7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 22V17H16V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LAPIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 28, height: 28 }}>
    <rect x="2" y="7" width="20" height="14" rx="2" stroke="white" strokeWidth="2" />
    <path d="M16 7V5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5V7" stroke="white" strokeWidth="2" />
    <path d="M12 12V16M10 14H14" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const GoldLoanIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 28, height: 28 }}>
    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
    <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* ─── Styled Components ─── */

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f7fa;
`;

const LoanGridSection = styled.section`
  padding: 80px 5%;
  max-width: 1400px;
  margin: 0 auto;
`;

const LoanGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px)  { grid-template-columns: 1fr; }
`;

/* ─── Data ─── */

const loanCategories = [
  {
    icon: <PersonalLoanIcon />,
    title: 'Personal Loan',
    description: 'Quick, unsecured personal loans for any need — medical emergencies, travel, wedding, or education. No collateral required.',
    interestRate: '10.5%',
    exploreLink: '/personal-loan',
    gradientFrom: '#0077ff',
    gradientTo: '#0047ff',
  },
  {
    icon: <BusinessLoanIcon />,
    title: 'Business Loan',
    description: 'Fuel your business growth with flexible financing. Working capital, equipment purchase, expansion — we cover it all.',
    interestRate: '12%',
    exploreLink: '/business-loan',
    gradientFrom: '#7c3aed',
    gradientTo: '#6d28d9',
  },
  {
    icon: <HomeLoanIcon />,
    title: 'Home Loan',
    description: 'Make your dream home a reality with our competitive home loan rates and flexible tenures up to 30 years.',
    interestRate: '8.5%',
    exploreLink: '/home-loan',
    gradientFrom: '#059669',
    gradientTo: '#047857',
  },
  {
    icon: <LAPIcon />,
    title: 'Loan Against Property',
    description: 'Leverage your property to get a secured loan with lower interest rates and higher loan amounts.',
    interestRate: '9.5%',
    exploreLink: '/loan-against-property',
    gradientFrom: '#dc2626',
    gradientTo: '#b91c1c',
  },
  {
    icon: <GoldLoanIcon />,
    title: 'Gold Loan',
    description: 'Get instant funds against your gold ornaments. Minimal paperwork, quick disbursal, and competitive rates.',
    interestRate: '7.5%',
    exploreLink: '/gold-loan',
    gradientFrom: '#d97706',
    gradientTo: '#b45309',
  },
];

/* ─── Component ─── */

const Loans: React.FC = () => (
  <PageContainer>
    <HeroSection
      title="Unlock Your Financial Potential with EBS Loans"
      description="Experience hassle-free borrowing with competitive interest rates and flexible repayment options. Our expert financial advisors are here to help you choose the right loan solution."
      image={loanHeroImage}
      featureTags={[
        { icon: <DollarOutlined />, label: 'Quick Approval' },
        { icon: <SafetyOutlined />, label: '100% Secure' },
        { icon: <RiseOutlined />, label: 'Low Interest' },
      ]}
    />

    <LoanGridSection>
      <SectionHeader
        title="Loan We Offer"
        subtitle="Choose from our range of loan products tailored to your financial goals. Competitive rates, quick approvals, and flexible repayment terms."
        align="center"
      />
      <LoanGrid>
        {loanCategories.map((loan) => (
          <LoanCategoryCard
            key={loan.title}
            icon={loan.icon}
            title={loan.title}
            description={loan.description}
            interestRate={loan.interestRate}
            exploreLink={loan.exploreLink}
            gradientFrom={loan.gradientFrom}
            gradientTo={loan.gradientTo}
          />
        ))}
      </LoanGrid>
    </LoanGridSection>

    <ApplicationForm
      formTitle="Loan Application"
      formSubtitle="Fill in your details and our loan specialists will contact you within 24 hours."
      productType="Loans"
      recipientEmail="info@ebsgroup.co.in"
      accentGradient="linear-gradient(150deg, #047857 0%, #065f46 60%, #064e3b 100%)"
      leftPanel={{
        heading: 'Why Choose Our Loans?',
        subtext: 'Experience a world of financial flexibility with our diverse loan offerings.',
        benefits: [
          'Quick approval process',
          'Competitive interest rates',
          'Minimal documentation required',
          'Flexible repayment options',
          'Dedicated relationship manager',
          'Fully digital — apply from anywhere',
        ],
      }}
    />

    <Footer />
  </PageContainer>
);

export default Loans;
