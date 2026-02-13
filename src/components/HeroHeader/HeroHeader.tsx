import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';

const HeroContainer = styled.section`
  min-height: 60vh;
  background: linear-gradient(180deg, #003d5b 0%, #0077b6 40%, #e6f7ff 80%, #ffffff 100%);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0 60px;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 150px;
    background: linear-gradient(180deg, transparent, #ffffff);
    pointer-events: none;
  }
`;

const Content = styled.div`
  text-align: center;
  margin-bottom: 50px;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 15px;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1s forwards;

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Tagline = styled.p`
  font-size: 1.3rem;
  color: #ffffff;
  margin-bottom: 40px;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1s forwards 0.3s;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 20px;
  max-width: 1200px;
  width: 100%;
  z-index: 1;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  flex: 1;
  min-width: 250px;
  max-width: 300px;
  box-shadow: 0 8px 32px rgba(0, 148, 217, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transform: translateY(40px);
  opacity: 0;
  animation: fadeInUp 1s forwards;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    min-width: 220px;
    padding: 25px;
  }
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const AnimatedNumber = ({ end, duration = 1500 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const [displayValue, setDisplayValue] = useState('0');
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!inView) return;

    let startTimestamp: number;
    const intermediateValues = ['1', '2', '3', '4', '5', '10', '20', '50', '100', '500', '1L+'];
    let currentIndex = 0;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      if (progress < 1) {
        if (progress > (currentIndex + 1) / intermediateValues.length && currentIndex < intermediateValues.length - 1) {
          currentIndex++;
          setDisplayValue(intermediateValues[currentIndex]);
        }
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue('1L+');
      }
    };

    window.requestAnimationFrame(step);
  }, [end, duration, inView]);

  return <div ref={ref}>{displayValue}</div>;
};

const HeroHeader: React.FC = () => {
  return (
    <HeroContainer>
      <Content>
        <Title>Everyday Banking Solutions</Title>
        <Tagline>Your Trustworthy Banking Partner</Tagline>
      </Content>
      <StatsContainer>
        <StatCard style={{ animationDelay: '0.2s' }}>
          <StatValue>
            <AnimatedNumber end={1} />
          </StatValue>
          <StatLabel>Loans Offered</StatLabel>
        </StatCard>
        <StatCard style={{ animationDelay: '0.4s' }}>
          <StatValue>
            <AnimatedNumber end={1} />
          </StatValue>
          <StatLabel>Loans Offered</StatLabel>
        </StatCard>
        <StatCard style={{ animationDelay: '0.6s' }}>
          <StatValue>
            <AnimatedNumber end={1} />
          </StatValue>
          <StatLabel>Loans Offered</StatLabel>
        </StatCard>
      </StatsContainer>
    </HeroContainer>
  );
};

export default HeroHeader;
