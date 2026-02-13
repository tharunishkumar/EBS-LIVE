import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { CreditCardOutlined, CheckCircleFilled, StarFilled } from '@ant-design/icons';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const { Title, Text } = Typography;

const HeroSection = styled.section`
  padding: 100px 5% 150px;
  background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 600px;
  margin-top: 0;
  padding-top: 120px;
  overflow: hidden;

  .waves-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 200px;
    overflow: hidden;
    z-index: 2;
    pointer-events: none;
  }

  .wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 400%;
    height: 100%;
    background-repeat: repeat-x;
    transform-origin: center bottom;
  }

  .wave-back {
    opacity: 0.15;
    fill: #fff;
    animation: wave 25s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
  }

  .wave-back2 {
    opacity: 0.2;
    fill: #fff;
    animation: wave 22s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
    animation-delay: -1s;
  }

  .wave-middle {
    opacity: 0.4;
    fill: #fff;
    animation: wave 20s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
    animation-delay: -2s;
  }

  .wave-middle2 {
    opacity: 0.6;
    fill: #fff;
    animation: wave 15s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
    animation-delay: -3s;
  }

  .wave-front {
    opacity: 1;
    fill: #ffffff;
    animation: wave 8s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
    animation-delay: -4s;
  }

  @keyframes wave {
    0% {
      transform: translateX(0) translateZ(0);
    }
    100% {
      transform: translateX(-50%) translateZ(0);
    }
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 30px;
    padding: 100px 5% 40px;
  }

  @media (max-width: 768px) {
    min-height: 500px;
    padding: 80px 5% 120px;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  color: white;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 60px 20px;

  h1 {
    color: white !important;
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }
`;



const Hero: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  return (
    <HeroSection>
      <div className="waves-container">
        <svg className="wave wave-back" viewBox="0 0 2880 320" preserveAspectRatio="none">
          <path d="M0,192 C480,192 720,256 960,256 C1200,256 1440,192 1680,192 C1920,192 2160,256 2400,256 C2640,256 2880,192 2880,192 L2880,320 L0,320 Z" />
        </svg>
        <svg className="wave wave-back2" viewBox="0 0 2880 320" preserveAspectRatio="none">
          <path d="M0,208 C480,208 720,144 960,144 C1200,144 1440,208 1680,208 C1920,208 2160,144 2400,144 C2640,144 2880,208 2880,208 L2880,320 L0,320 Z" />
        </svg>
        <svg className="wave wave-middle" viewBox="0 0 2880 320" preserveAspectRatio="none">
          <path d="M0,224 C480,224 720,128 960,128 C1200,128 1440,224 1680,224 C1920,224 2160,128 2400,128 C2640,128 2880,224 2880,224 L2880,320 L0,320 Z" />
        </svg>
        <svg className="wave wave-middle2" viewBox="0 0 2880 320" preserveAspectRatio="none">
          <path d="M0,240 C480,240 720,140 960,140 C1200,140 1440,240 1680,240 C1920,240 2160,140 2400,140 C2640,140 2880,240 2880,240 L2880,320 L0,320 Z" />
        </svg>
        <svg className="wave wave-front" viewBox="0 0 2880 320" preserveAspectRatio="none">
          <path d="M0,260 C480,260 720,160 960,160 C1200,160 1440,260 1680,260 C1920,260 2160,160 2400,160 C2640,160 2880,260 2880,260 L2880,320 L0,320 Z" />
        </svg>
      </div>

      <HeroContent>
        <Title level={1}>
          Transform Your Financial Journey
        </Title>
        <Text style={{ color: 'white', fontSize: '1.2rem', display: 'block', marginBottom: '1.5rem' }}>
          Discover exclusive financial solutions tailored to your needs. Apply now and elevate your financial journey with EBS Finance.
        </Text>
        
        
      </HeroContent>

      
    </HeroSection>
  );
};

export default Hero;