import React, { ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';


/* ─── Types ─── */

interface FeatureTagType {
  icon?: ReactNode;
  label: string;
}

interface HeroSectionProps {
  title: string;
  description: string;
  image: string;
  featureTags?: FeatureTagType[];
  backgroundImage?: string;
}

/* ─── Animations ─── */

const floatY = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50%       { transform: translateY(-18px) rotate(4deg); }
`;

const floatImg = keyframes`
  0%, 100% { transform: translateY(0px) perspective(1000px) rotateY(-10deg); }
  50%       { transform: translateY(-12px) perspective(1000px) rotateY(-6deg); }
`;

const shimmerLine = keyframes`
  0%   { transform: translateX(-120%) rotate(-40deg); }
  100% { transform: translateX(120%) rotate(-40deg); }
`;

const pulseRing = keyframes`
  0%, 100% { opacity: 0.18; transform: scale(1); }
  50%       { opacity: 0.35; transform: scale(1.12); }
`;

/* ─── Hero Section ─── */

const StyledHeroSection = styled.section<{ backgroundImage?: string }>`
  padding: 100px 6% 70px;
  background: linear-gradient(140deg, #02185a 0%, #003494 35%, #0055cc 65%, #0077ff 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
  min-height: 420px;
  overflow: hidden;

  /* optional photo underlay */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    ${p => p.backgroundImage ? `background: url(${p.backgroundImage}) center/cover no-repeat;` : ''}
    opacity: 0.06;
    z-index: 0;
  }

  /* subtle dot-grid texture */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px);
    background-size: 38px 38px;
    z-index: 1;
    pointer-events: none;
  }

  /* ── decorative orbs ── */
  .orb-1, .orb-2, .orb-3 {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    z-index: 2;
  }

  .orb-1 {
    width: 420px; height: 420px;
    top: -160px; right: -100px;
    background: radial-gradient(circle, rgba(100,180,255,0.18) 0%, transparent 70%);
    animation: ${pulseRing} 6s ease-in-out infinite;
  }

  .orb-2 {
    width: 280px; height: 280px;
    bottom: -80px; left: -60px;
    background: radial-gradient(circle, rgba(0,200,255,0.12) 0%, transparent 70%);
    animation: ${pulseRing} 8s ease-in-out infinite 1s;
  }

  .orb-3 {
    width: 180px; height: 180px;
    top: 40%; left: 30%;
    background: radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%);
    animation: ${pulseRing} 10s ease-in-out infinite 2s;
  }

  /* ── shimmer lines ── */
  .sl-1, .sl-2 {
    position: absolute;
    height: 1.5px;
    width: 220px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
    z-index: 2;
    pointer-events: none;
  }
  .sl-1 { top: 22%; right: 8%; animation: ${shimmerLine} 7s linear infinite; }
  .sl-2 { bottom: 28%; left: 4%; animation: ${shimmerLine} 11s linear infinite reverse; }

  /* ── floating glass circles ── */
  .gc-1, .gc-2, .gc-3 {
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.06);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255,255,255,0.14);
    z-index: 2;
    pointer-events: none;
  }
  .gc-1 { width: 130px; height: 130px; top: 12%; left: 12%; animation: ${floatY} 14s ease-in-out infinite; }
  .gc-2 { width: 85px;  height: 85px;  bottom: 18%; right: 18%; animation: ${floatY} 18s ease-in-out infinite reverse; }
  .gc-3 { width: 58px;  height: 58px;  top: 60%; left: 22%; animation: ${floatY} 11s ease-in-out infinite 1.5s; }

  > * { position: relative; z-index: 3; }

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 32px;
    padding: 110px 6% 50px;
    text-align: center;
  }

  @media (max-width: 768px) {
    padding: 90px 5% 40px;
    min-height: 340px;
  }

  @media (max-width: 480px) {
    padding: 80px 4% 32px;
    min-height: 300px;
  }
`;

/* ─── Content ─── */

const HeroContent = styled.div`
  flex: 1;
  max-width: 580px;
  color: #fff;
  padding: 0 20px 0 0;

  h1, .ant-typography {
    font-family: 'Poppins', sans-serif !important;
    font-size: clamp(1.8rem, 3.2vw, 2.9rem) !important;
    font-weight: 800 !important;
    line-height: 1.18 !important;
    margin-bottom: 18px !important;
    margin-top: 0 !important;
    color: transparent !important;
    background: linear-gradient(135deg, #ffffff 0%, #b8d8ff 100%) !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    background-clip: text !important;
  }

  .hero-desc {
    font-family: 'Inter', sans-serif;
    font-size: clamp(0.95rem, 1.6vw, 1.1rem);
    line-height: 1.72;
    color: rgba(255,255,255,0.82);
    margin-bottom: 28px;
    display: block;
  }

  .feature-tags {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 4px;
  }

  @media (max-width: 1024px) {
    padding: 0;
    max-width: 100%;

    .feature-tags { justify-content: center; }
  }
`;

/* ─── Image ─── */

const HeroImage = styled(motion.div)`
  flex: 0 0 auto;
  width: min(460px, 42vw);
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: auto;
    filter: drop-shadow(0 20px 40px rgba(0,0,0,0.28));
    animation: ${floatImg} 4s ease-in-out infinite;
  }

  @media (max-width: 1024px) {
    width: min(340px, 80vw);
    margin: 0 auto;

    img { animation: none; }
  }

  @media (max-width: 480px) {
    width: min(260px, 85vw);
  }
`;

/* ─── Feature Tag ─── */

const FeatureTag = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  background: rgba(255,255,255,0.1);
  border-radius: 100px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.22);
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: default;
  transition: background 0.25s ease, transform 0.25s ease;
  letter-spacing: 0.01em;

  &:hover {
    background: rgba(255,255,255,0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  }

  .anticon, svg {
    font-size: 0.95rem;
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    padding: 6px 14px;
    font-size: 0.78rem;
  }
`;

/* ─── Component ─── */

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  image,
  featureTags = [],
  backgroundImage,
}) => (
  <StyledHeroSection backgroundImage={backgroundImage}>
    {/* Decorative layers */}
    <div className="orb-1" />
    <div className="orb-2" />
    <div className="orb-3" />
    <div className="sl-1" />
    <div className="sl-2" />
    <div className="gc-1" />
    <div className="gc-2" />
    <div className="gc-3" />

    {/* Text content */}
    <HeroContent>
      <motion.h1
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {title}
      </motion.h1>

      <motion.span
        className="hero-desc"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
      >
        {description}
      </motion.span>

      {featureTags.length > 0 && (
        <motion.div
          className="feature-tags"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
        >
          {featureTags.map((tag, i) => (
            <FeatureTag
              key={i}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 + i * 0.07, duration: 0.35 }}
            >
              {tag.icon && <span>{tag.icon}</span>}
              {tag.label}
            </FeatureTag>
          ))}
        </motion.div>
      )}
    </HeroContent>

    {/* Hero image */}
    <HeroImage
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.65, delay: 0.15, ease: 'easeOut' }}
    >
      <img src={image} alt={title} />
    </HeroImage>
  </StyledHeroSection>
);

export default HeroSection;
