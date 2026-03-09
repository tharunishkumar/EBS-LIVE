import React from 'react';
import styled from 'styled-components';
import { StarFilled, CheckCircleFilled } from '@ant-design/icons';
import { motion } from 'framer-motion';

import Footer from '../../components/Footer/Footer';
import HeroSection from '../../components/Hero/HeroSection';
import InsuranceCard from '../../components/ui/InsuranceCard';
import SectionHeader from '../../components/ui/SectionHeader';
import ApplicationForm from '../../components/ui/ApplicationForm';

import insuranceHeroImg from '../../assets/images/hero/Sitemap Whiteboard in Green Purple Basic Style (13).png';
import healthInsImg from '../../assets/images/hero/healthins.jpg';
import personalInsImg from '../../assets/images/hero/personal insurance.jpg';
import generalInsImg from '../../assets/images/hero/general insurance.jpg';
import riskManagementImg from '../../assets/images/hero/risk management.jpg';
import wealthPreservationImg from '../../assets/images/hero/wealth preservation.jpg';
import peacefulMindImg from '../../assets/images/hero/peaceful mind.jpg';
import lawComplianceImg from '../../assets/images/hero/law compliance.jpg';

/* ─── Data ─── */

const insuranceCategories = [
  {
    image: healthInsImg,
    title: 'Health Insurance',
    description: 'Comprehensive health coverage for you and your family with cashless hospitalisation at 10,000+ hospitals across India.',
    benefits: [
      'Cashless hospitalisation',
      'Pre & post hospitalisation coverage',
      'No claim bonus up to 50%',
      'Preventive healthcare benefits',
    ],
    exploreLink: '/health-insurance',
  },
  {
    image: personalInsImg,
    title: 'Life Insurance',
    description: "Secure your family's financial future with flexible life insurance plans that provide income protection and legacy planning.",
    benefits: [
      'Term life coverage',
      'Investment-linked options',
      'Tax benefits under 80C & 10(10D)',
      'Rider options for added protection',
    ],
    exploreLink: '/life-insurance',
  },
  {
    image: generalInsImg,
    title: 'General Insurance',
    description: 'Protect your valuable assets and mitigate liabilities with our comprehensive general insurance solutions.',
    benefits: [
      'Property & home insurance',
      'Motor vehicle insurance',
      'Travel insurance',
      'Business liability coverage',
    ],
    exploreLink: '/general-insurance',
  },
];

/* ─── Why Be Insured Data ─── */

const whyBeInsuredCards = [
  { title: 'Family Protection', subtitle: 'Safeguard your loved ones from unforeseen financial burdens with the right coverage.', image: riskManagementImg },
  { title: 'Wealth Preservation', subtitle: 'Shield your hard-earned assets from unexpected risks, liabilities, and losses.', image: wealthPreservationImg },
  { title: 'Peace of Mind', subtitle: 'Live worry-free knowing that you and your family are covered in every situation.', image: peacefulMindImg },
  { title: 'Legal Compliance', subtitle: 'Stay compliant with statutory requirements and avoid legal penalties effortlessly.', image: lawComplianceImg },
];

/* ─── Styled Components ─── */


const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f7fa;
`;

const InsuranceGridSection = styled.section`
  padding: 80px 5%;
  max-width: 1400px;
  margin: 0 auto;
`;

const InsuranceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 640px)  { grid-template-columns: 1fr; }
`;

/* ─── Why Be Insured Styles ─── */

const WhySection = styled.section`
  padding: 88px 5%;
  background: linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -30%; left: -10%;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(14,116,144,0.15) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -20%; right: -8%;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(0,119,182,0.1) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }
`;

const WhyInner = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const WhySectionLabel = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #6dd5ed;
  margin-bottom: 10px;
`;

const WhySectionTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: clamp(1.7rem, 3.5vw, 2.6rem);
  font-weight: 800;
  color: #ffffff;
  line-height: 1.2;
  margin-bottom: 12px;

  span {
    background: linear-gradient(90deg, #6dd5ed, #0ea5e9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const WhySectionSub = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: rgba(255,255,255,0.65);
  line-height: 1.7;
  max-width: 540px;
  margin-bottom: 56px;
`;

const WhyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 560px)  { grid-template-columns: 1fr; }
`;

const WhyCard = styled(motion.div)`
  border-radius: 22px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  height: 340px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.35);
  transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 56px rgba(0,0,0,0.5);

    img { transform: scale(1.08); }
    .why-overlay { opacity: 0.75; }
    .why-content { transform: translateY(0); opacity: 1; }
    .why-title { transform: translateY(-4px); }
  }
`;

const WhyCardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s cubic-bezier(0.4,0,0.2,1);
`;

const WhyOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(6,78,115,0.95) 0%,
    rgba(14,116,144,0.6) 50%,
    rgba(0,0,0,0.2) 100%
  );
  opacity: 0.6;
  transition: opacity 0.35s ease;
`;

const WhyCardInner = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 28px 24px;
`;

const WhyCardNumber = styled.span`
  font-family: 'Poppins', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #6dd5ed;
  text-transform: uppercase;
  margin-bottom: 8px;
  display: block;
`;

const WhyCardTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 1.25rem;
  font-weight: 800;
  color: #fff;
  margin: 0 0 10px;
  line-height: 1.25;
  transition: transform 0.3s ease;
`;

const WhyCardContent = styled.div`
  transition: all 0.35s ease;
  transform: translateY(8px);
  opacity: 0;

  p {
    font-family: 'Inter', sans-serif;
    font-size: 0.83rem;
    color: rgba(255,255,255,0.82);
    line-height: 1.6;
    margin: 0 0 14px;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(109,213,237,0.18);
    border: 1px solid rgba(109,213,237,0.3);
    border-radius: 100px;
    padding: 4px 12px;
    font-size: 0.75rem;
    font-weight: 600;
    color: #6dd5ed;
  }
`;

/* ─── Component ─── */

const Insurance: React.FC = () => (
  <PageContainer>
    <HeroSection
      title="Protect Your Future with Comprehensive Insurance Plans"
      description="Get access to exclusive benefits, coverage, and peace of mind. Apply now and secure your family's future with EBS Finance."
      image={insuranceHeroImg}
      backgroundImage={insuranceHeroImg}
      featureTags={[
        { icon: <StarFilled />, label: 'Comprehensive Coverage' },
        { icon: <CheckCircleFilled />, label: 'Flexible Plans' },
        { icon: <CheckCircleFilled />, label: 'Exclusive Benefits' },
      ]}
    />

    <InsuranceGridSection>
      <SectionHeader
        title="Insurance Products"
        subtitle="Choose from our range of insurance products designed to protect you, your family, and your assets against life's uncertainties."
        align="center"
      />
      <InsuranceGrid>
        {insuranceCategories.map((ins) => (
          <InsuranceCard
            key={ins.title}
            image={ins.image}
            title={ins.title}
            description={ins.description}
            benefits={ins.benefits}
            exploreLink={ins.exploreLink}
          />
        ))}
      </InsuranceGrid>
    </InsuranceGridSection>

    <ApplicationForm
      formTitle="Insurance Application"
      formSubtitle="Fill in your details and our advisors will help find the best plan for you."
      productType="Insurance"
      recipientEmail="info@ebsgroup.co.in"
      accentGradient="linear-gradient(150deg, #0e7490 0%, #0a5c73 60%, #064e63 100%)"
      leftPanel={{
        heading: 'Why Choose Our Insurance Plans?',
        subtext: 'Experience comprehensive protection and peace of mind with our tailored insurance solutions.',
        benefits: [
          'Customized coverage options',
          'Quick and hassle-free claims',
          '24/7 customer support',
          'Competitive premiums',
          'Digital policy management',
          'Expert insurance advisors',
        ],
      }}
    />

    {/* ─── Why Be Insured ─── */}
    <WhySection>
      <WhyInner>
        <WhySectionLabel>Why Insurance Matters</WhySectionLabel>
        <WhySectionTitle>Be Insured. <span>Be Unstoppable.</span></WhySectionTitle>
        <WhySectionSub>
          Insurance isn't just a financial product — it's a promise to your future self. Here's why being insured is one of the smartest decisions you'll make.
        </WhySectionSub>

        <WhyGrid>
          {whyBeInsuredCards.map((card, i) => (
            <WhyCard
              key={card.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
            >
              <WhyCardImg src={card.image} alt={card.title} />
              <WhyOverlay className="why-overlay" />
              <WhyCardInner>
                <WhyCardNumber>0{i + 1}</WhyCardNumber>
                <WhyCardTitle className="why-title">{card.title}</WhyCardTitle>
                <WhyCardContent className="why-content">
                  <p>{card.subtitle}</p>
                  <span className="chip"><CheckCircleFilled /> Learn More</span>
                </WhyCardContent>
              </WhyCardInner>
            </WhyCard>
          ))}
        </WhyGrid>
      </WhyInner>
    </WhySection>

    <Footer />
  </PageContainer>
);

export default Insurance;

