import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface LoanCategoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  interestRate: string;
  exploreLink: string;
  gradientFrom?: string;
  gradientTo?: string;
}

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const CardWrapper = styled.div<{ $from: string; $to: string }>`
  background: #ffffff;
  border-radius: 24px;
  padding: 0;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  /* top accent stripe */
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${p => p.$from}, ${p => p.$to});
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 48px rgba(0, 0, 0, 0.12);
    border-color: rgba(0, 119, 255, 0.12);

    &::before { opacity: 1; }
  }
`;

const CardTop = styled.div<{ $from: string; $to: string }>`
  background: linear-gradient(135deg, ${p => p.$from}15 0%, ${p => p.$to}08 100%);
  padding: 28px 28px 20px;
  display: flex;
  align-items: flex-start;
  gap: 18px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
`;

const IconBox = styled.div<{ $from: string; $to: string }>`
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 16px;
  background: linear-gradient(135deg, ${p => p.$from} 0%, ${p => p.$to} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 18px ${p => p.$from}50;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  ${CardWrapper}:hover & {
    transform: scale(1.1) rotate(4deg);
    box-shadow: 0 10px 28px ${p => p.$from}60;
  }

  svg { width: 26px; height: 26px; }
`;

const TitleBlock = styled.div`
  flex: 1;
  padding-top: 4px;
`;

const CardTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 6px;
  line-height: 1.25;
`;

const RateChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: rgba(5, 150, 105, 0.08);
  border: 1px solid rgba(5, 150, 105, 0.18);
  border-radius: 100px;
  padding: 3px 10px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #059669;
`;

const CardBody = styled.div`
  padding: 20px 28px 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Description = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
  line-height: 1.65;
  flex: 1;
`;

const ExploreButton = styled(Link)<{ $from: string; $to: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 44px;
  padding: 0 20px;
  background: linear-gradient(135deg, ${p => p.$from}12 0%, ${p => p.$to}08 100%);
  color: ${p => p.$from};
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
  border: 1.5px solid ${p => p.$from}30;

  svg { transition: transform 0.2s ease; }

  &:hover {
    background: linear-gradient(135deg, ${p => p.$from} 0%, ${p => p.$to} 100%);
    color: #ffffff;
    border-color: transparent;
    box-shadow: 0 6px 18px ${p => p.$from}40;

    svg { transform: translateX(4px); }
  }
`;

const LoanCategoryCard: React.FC<LoanCategoryCardProps> = ({
  icon,
  title,
  description,
  interestRate,
  exploreLink,
  gradientFrom = '#0077ff',
  gradientTo = '#0047ff',
}) => (
  <CardWrapper $from={gradientFrom} $to={gradientTo}>
    <CardTop $from={gradientFrom} $to={gradientTo}>
      <IconBox $from={gradientFrom} $to={gradientTo}>{icon}</IconBox>
      <TitleBlock>
        <CardTitle>{title}</CardTitle>
        <RateChip>From {interestRate} p.a.</RateChip>
      </TitleBlock>
    </CardTop>
    <CardBody>
      <Description>{description}</Description>
      <ExploreButton to={exploreLink} $from={gradientFrom} $to={gradientTo}>
        Explore Options
        <ArrowRight size={15} />
      </ExploreButton>
    </CardBody>
  </CardWrapper>
);

export default LoanCategoryCard;
