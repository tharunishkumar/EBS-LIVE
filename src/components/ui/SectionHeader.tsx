import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

/* ─── Types ─── */

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  accentWord?: string;
  label?: string; // optional small eyebrow label above title
}

/* ─── Animations ─── */

const glowUnderline = keyframes`
  0%, 100% {
    opacity: 0.75;
    transform: scaleX(1);
    filter: blur(0px);
  }
  50% {
    opacity: 1;
    transform: scaleX(1.06);
    filter: blur(0.5px);
  }
`;

/* ─── Styled Components ─── */

const Wrapper = styled.div<{ $align: 'left' | 'center' }>`
  margin-bottom: 52px;
  text-align: ${p => p.$align};

  @media (max-width: 768px) {
    margin-bottom: 36px;
    text-align: center;
  }
`;

const EyebrowLabel = styled(motion.p)`
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: #0077ff;
  margin: 0 0 10px;
`;

const TitleWrapper = styled.div<{ $align: 'left' | 'center' }>`
  display: inline-block;
  position: relative;
  margin-bottom: 6px;
  text-align: ${p => p.$align};
`;

const Title = styled(motion.h2)`
  font-family: 'Poppins', system-ui, sans-serif;
  font-size: clamp(1.75rem, 4vw, 2.55rem);
  font-weight: 800;
  line-height: 1.18;
  color: #0f172a;
  margin: 0 0 4px;
  letter-spacing: -0.02em;

  .accent {
    background: linear-gradient(135deg, #0047ff 0%, #0099ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

/* the animated underline bar — same style as BankGrid */
const Underline = styled.div<{ $align: 'left' | 'center' }>`
  position: absolute;
  bottom: -10px;
  height: 4px;
  border-radius: 10px;
  background: linear-gradient(90deg, #0047ff, #00b4ff, #0047ff);
  background-size: 200% 100%;
  animation: ${glowUnderline} 2.4s ease-in-out infinite;

  /* width + position per alignment */
  ${p => p.$align === 'center'
    ? 'left: 10%; width: 80%;'
    : 'left: 0; width: 55%;'}

  @media (max-width: 768px) {
    left: 10%;
    width: 80%;
  }
`;

const Subtitle = styled(motion.p)<{ $center?: boolean }>`
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 1.05rem;
  color: #64748b;
  line-height: 1.72;
  margin: 24px 0 0;
  max-width: 580px;
  ${p => p.$center ? 'margin-left: auto; margin-right: auto;' : ''}

  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
    font-size: 0.97rem;
  }
`;

/* ─── Component ─── */

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  align = 'center',
  accentWord,
  label,
}) => {
  const renderTitle = () => {
    if (!accentWord) return title;
    const parts = title.split(accentWord);
    return (
      <>
        {parts[0]}
        <span className="accent">{accentWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <Wrapper $align={align}>
      {label && (
        <EyebrowLabel
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {label}
        </EyebrowLabel>
      )}

      <TitleWrapper $align={align}>
        <Title
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: label ? 0.08 : 0 }}
        >
          {renderTitle()}
        </Title>
        <Underline $align={align} />
      </TitleWrapper>

      {subtitle && (
        <Subtitle
          $center={align === 'center'}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.14 }}
        >
          {subtitle}
        </Subtitle>
      )}
    </Wrapper>
  );
};

export default SectionHeader;
