import React from 'react';
import styled, { keyframes } from 'styled-components';
import { CreditCardOutlined, CheckCircleFilled, StarFilled } from '@ant-design/icons';
import { motion } from 'framer-motion';

import creditCardImg from '../../assets/images/services/credit-card.jpg';
import creditCardHeroImg from '../../assets/images/hero/creditcard.png';

import Footer from '../../components/Footer/Footer';
import HeroSection from '../../components/Hero/HeroSection';
import BankGridComponent from '../../components/ui/BankGrid';
import ApplicationForm from '../../components/ui/ApplicationForm';
import CardScroller from '../../components/CardScroller/CardScroller';

import axisCard from '../../assets/images/cards/AXIS.png';
import hdfcCard from '../../assets/images/cards/HDFC.png';
import iciciCard from '../../assets/images/cards/ICICI.png';
import idfcCard from '../../assets/images/cards/IDFC.png';
import yesbankCard from '../../assets/images/cards/YESBANK.png';

/* ─── Animations ─── */

const marqueeScroll = keyframes`
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;


/* ─── Page ─── */

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f7fa;
`;



/* ─── Banking Partners Marquee ─── */

const PartnersWrapper = styled.section`
  background: #f8fafc;
  padding: 56px 0;
  overflow: hidden;
  border-top: 1px solid #e8f0fb;
  border-bottom: 1px solid #e8f0fb;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 160px; height: 100%;
    background: linear-gradient(to right, #f8fafc, transparent);
    z-index: 2; pointer-events: none;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0; right: 0;
    width: 160px; height: 100%;
    background: linear-gradient(to left, #f8fafc, transparent);
    z-index: 2; pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 36px 0;
    &::before, &::after { width: 60px; }
  }

  @media (max-width: 480px) {
    padding: 28px 0;
    &::before, &::after { width: 40px; }
  }
`;

const PartnersHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  padding: 0 5%;

  h3 {
    font-family: 'Poppins', sans-serif;
    font-size: 1.6rem;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 8px;
  }
  p {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    color: #64748b;
    line-height: 1.65;
  }

  @media (max-width: 768px) {
    margin-bottom: 24px;
    h3 { font-size: 1.25rem; }
    p  { font-size: 0.85rem; }
  }

  @media (max-width: 480px) {
    margin-bottom: 18px;
    h3 { font-size: 1.1rem; }
    p  { font-size: 0.8rem; }
  }
`;

const MarqueeTrack = styled.div`
  display: flex;
  gap: 16px;
  animation: ${marqueeScroll} 24s linear infinite;
  width: max-content;

  &:hover { animation-play-state: paused; }
`;

const BankLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 180px;
  height: 80px;
  background: #fff;
  border-radius: 16px;
  padding: 14px 28px;
  border: 1.5px solid #e2e8f0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  cursor: default;
  flex-shrink: 0;

  img {
    max-width: 100%;
    max-height: 48px;
    object-fit: contain;
    filter: grayscale(20%);
    transition: filter 0.3s ease, transform 0.3s ease;
  }

  &:hover {
    border-color: rgba(0,71,255,0.2);
    box-shadow: 0 6px 24px rgba(0,71,255,0.1);
    transform: translateY(-3px);
    img { filter: grayscale(0%); }
  }

  @media (max-width: 768px) {
    min-width: 130px;
    height: 60px;
    padding: 10px 18px;
    border-radius: 12px;
    img { max-height: 36px; }
  }

  @media (max-width: 480px) {
    min-width: 110px;
    height: 52px;
    padding: 8px 14px;
    border-radius: 10px;
    img { max-height: 28px; }
  }
`;

const Section = styled.section`
  margin-bottom: 20px;
`;

const bankLogos = [
  { src: '/images/partners/hdfc.jpg', name: 'HDFC Bank' },
  { src: '/images/partners/icici.jpg', name: 'ICICI Bank' },
  { src: '/images/partners/axis.jpg.png', name: 'Axis Bank' },
  { src: '/images/partners/kotak.jpg', name: 'Kotak Bank' },
  { src: '/images/partners/idfc.jpg', name: 'IDFC Bank' },
  { src: '/images/partners/yes.png', name: 'Yes Bank' },
  { src: '/images/partners/au.jpg', name: 'AU Bank' },
  { src: '/images/partners/federal.png', name: 'Federal Bank' },
];

const CreditCards: React.FC = () => (
  <PageContainer>
    <HeroSection
      title="Transform Your Spending with Premium Credit Cards"
      description="Discover exclusive rewards, cashback, and privileges. Apply now and elevate your financial journey with EBS Groups."
      image={creditCardHeroImg}
      backgroundImage={creditCardImg}
      featureTags={[
        { icon: <StarFilled />, label: 'Instant Approval' },
        { icon: <CheckCircleFilled />, label: 'Zero Annual Fee*' },
        { icon: <CreditCardOutlined />, label: '5% Cashback' },
        { icon: <StarFilled />, label: 'Lounge Access' },
      ]}
    />

    <BankGridComponent />

    <PartnersWrapper>
      <PartnersHeader>
        <h3>Our Banking Partners</h3>
        <p>We collaborate with India's leading banks to bring you exclusive credit card offers with unmatched benefits.</p>
      </PartnersHeader>
      <MarqueeTrack>
        {[...bankLogos, ...bankLogos].map((logo, i) => (
          <BankLogo key={i}>
            <img src={logo.src} alt={logo.name} />
          </BankLogo>
        ))}
      </MarqueeTrack>
    </PartnersWrapper>

    <div id="apply">
      <ApplicationForm
        formTitle="Credit Card Application"
        formSubtitle="Fill in your details and our team will reach out to you within 24 hours."
        productType="Credit Cards"
        recipientEmail="info@ebsgroup.co.in"
        leftPanel={{
          heading: 'Why Choose Our Credit Cards?',
          subtext: 'Experience a world of exclusive benefits and rewards with our premium credit card offerings.',
          benefits: [
            'Instant approval with minimal documentation',
            'Up to 5% cashback on all purchases',
            'Complimentary airport lounge access',
            'Zero annual fee for the first year',
            '24/7 concierge services',
            'Comprehensive fraud protection',
          ],
        }}
      />
    </div>

    <Section>
      <CardScroller images={[
        axisCard,
        hdfcCard,
        iciciCard,
        idfcCard,
        yesbankCard
      ]} />
    </Section>

    <Footer />
  </PageContainer>
);

export default CreditCards;
