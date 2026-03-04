import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { typography, colors, breakpoints } from '../../styles/theme';

const { Title, Text } = Typography;

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

const StyledHeroSection = styled.section<{ backgroundImage?: string }>`
  padding: 60px 5%;
  background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 400px;
  margin-top: 0;
  padding-top: 100px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    ${props => props.backgroundImage ? `background: url(${props.backgroundImage}) no-repeat center center;` : ''}
    background-size: cover;
    opacity: 0.1;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%);
    opacity: 0.85;
    z-index: 1;
  }

  /* Modern geometric shapes */
  .shape-1, .shape-2, .shape-3, .shape-4 {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
    backdrop-filter: blur(5px);
    z-index: 2;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .shape-1 {
    width: 300px;
    height: 300px;
    top: -100px;
    right: -50px;
    animation: float 15s ease-in-out infinite;
  }

  .shape-2 {
    width: 200px;
    height: 200px;
    bottom: -50px;
    left: -50px;
    animation: float 20s ease-in-out infinite reverse;
  }

  .shape-3 {
    width: 150px;
    height: 150px;
    top: 50%;
    left: 15%;
    animation: float 18s ease-in-out infinite 1s;
  }

  .shape-4 {
    width: 100px;
    height: 100px;
    bottom: 20%;
    right: 15%;
    animation: float 12s ease-in-out infinite 0.5s;
  }

  /* Animated lines */
  .line-1, .line-2 {
    position: absolute;
    width: 200px;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    z-index: 2;
    transform: rotate(-45deg);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  }

  .line-1 {
    top: 20%;
    right: 10%;
    animation: moveLine 8s linear infinite;
  }

  .line-2 {
    bottom: 30%;
    left: 5%;
    animation: moveLine 12s linear infinite reverse;
  }

  /* Dot grid pattern */
  .dot-pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px);
    background-size: 40px 40px;
    z-index: 2;
    opacity: 0.7;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(5deg);
    }
  }

  @keyframes moveLine {
    0% {
      transform: translateX(-100%) rotate(-45deg);
    }
    100% {
      transform: translateX(100%) rotate(-45deg);
    }
  }

  > * {
    position: relative;
    z-index: 3;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 30px;
    padding: 100px 5% 40px;
  }

  @media (max-width: 768px) {
    padding: 80px 5% 30px;
    min-height: 350px;
  }

  @media (max-width: 480px) {
    padding: 60px 5% 20px;
    min-height: 300px;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  max-width: 600px;
  color: ${colors.text.white};
  padding: 20px 40px;
  animation: fadeInUp 0.8s ease-out;

  h1 {
    font-family: ${typography.fontFamily.heading};
    font-size: ${typography.fontSize.hero.title};
    font-weight: ${typography.fontWeight.bold};
    line-height: ${typography.lineHeight.tight};
    margin-bottom: 1rem;
    margin-top: 10px;
    background: linear-gradient(to right, #ffffff, #e0e0e0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
      font-size: ${typography.fontSize.h1.tablet};
    }

    @media (max-width: 480px) {
      font-size: 1.8rem;
    }
  }

  p {
    font-family: ${typography.fontFamily.primary};
    font-size: ${typography.fontSize.hero.subtitle};
    line-height: ${typography.lineHeight.relaxed};
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 1.5rem;
    color: white;

    @media (max-width: 768px) {
      font-size: ${typography.fontSize.body.large};
    }

    @media (max-width: 480px) {
      font-size: 0.95rem;
    }
  }

  .feature-tags {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    margin-top: 1.5rem;

    @media (max-width: 768px) {
      justify-content: center;
      gap: 10px;
    }

    @media (max-width: 480px) {
      gap: 8px;
    }
  }

  @media (max-width: 1024px) {
    padding: 20px;
    text-align: center;
  }

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    max-width: 100%;
  }
`;

const HeroImage = styled.div`
  flex: 1;
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: floatAnimation 3s ease-in-out infinite;

  @keyframes floatAnimation {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-15px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  img {
    max-width: 90%;
    height: auto;
    filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.2));
    transform: perspective(1000px) rotateY(-15deg);
    transition: transform 0.3s ease;

    &:hover {
      transform: perspective(1000px) rotateY(-5deg) translateY(-10px);
    }
  }

  @media (max-width: 1024px) {
    max-width: 350px;
    margin: 0 auto;

    img {
      max-width: 85%;
      transform: perspective(1000px) rotateY(0deg);

      &:hover {
        transform: perspective(1000px) rotateY(0deg) translateY(-10px);
      }
    }
  }

  @media (max-width: 768px) {
    max-width: 300px;

    img {
      max-width: 80%;
    }
  }

  @media (max-width: 480px) {
    max-width: 250px;

    img {
      max-width: 100%;
    }
  }
`;

const FeatureTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  .anticon {
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 5px 10px;
    font-size: 0.75rem;
  }
`;

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  image,
  featureTags = [],
  backgroundImage
}) => {
  return (
    <StyledHeroSection backgroundImage={backgroundImage}>
      <div className="shape-1"></div>
      <div className="shape-2"></div>
      <div className="shape-3"></div>
      <div className="shape-4"></div>
      <div className="line-1"></div>
      <div className="line-2"></div>
      <div className="dot-pattern"></div>

      <HeroContent>
        <Title level={1}>{title}</Title>
        <Text style={{ color: 'white', fontSize: '1.2rem', display: 'block', marginBottom: '1.5rem' }}>
          {description}
        </Text>
        {featureTags.length > 0 && (
          <div className="feature-tags">
            {featureTags.map((tag, index) => (
              <FeatureTag key={index}>
                {tag.icon && <span>{tag.icon}</span>}
                {tag.label}
              </FeatureTag>
            ))}
          </div>
        )}
      </HeroContent>

      <HeroImage>
        <img src={image} alt={title} />
      </HeroImage>
    </StyledHeroSection>
  );
};

export default HeroSection;
