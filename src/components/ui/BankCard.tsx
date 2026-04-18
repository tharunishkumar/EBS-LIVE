import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { ArrowRight, CreditCard } from 'lucide-react';

interface BankCardProps {
  logo: string;
  bankName: string;
  cardCount: number;
  exploreLink: string;
  accentColor?: string;
}

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const CardWrapper = styled.div`
  background: #ffffff;
  border-radius: 20px;
  padding: 32px 28px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #0077ff, #0047ff, #0077ff);
    background-size: 200% auto;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(0, 119, 255, 0.14);
    border-color: rgba(0, 119, 255, 0.15);

    &::before {
      opacity: 1;
      animation: ${shimmer} 2s linear infinite;
    }
  }
`;

const LogoContainer = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 18px;
  background: #f8fafc;
  border: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  transition: transform 0.3s ease;

  ${CardWrapper}:hover & {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 12px;
  }
`;

const BankName = styled.h3`
  font-family: 'Poppins', system-ui, sans-serif;
  font-size: 1.05rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0;
  text-align: center;
  line-height: 1.3;
`;

const CardCountBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(0, 119, 255, 0.07);
  border-radius: 100px;
  padding: 5px 12px;
  color: #0066ee;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid rgba(0, 119, 255, 0.12);
`;

const ExploreButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 44px;
  background: linear-gradient(135deg, #0077ff 0%, #0047ff 100%);
  color: #ffffff;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 119, 255, 0.25);
  letter-spacing: 0.2px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 119, 255, 0.35);
    color: #ffffff;
    background: linear-gradient(135deg, #0066ee 0%, #003fd6 100%);

    svg {
      transform: translateX(3px);
    }
  }

  svg {
    transition: transform 0.2s ease;
  }
`;

const BankCard: React.FC<BankCardProps> = ({
  logo,
  bankName,
  cardCount,
  exploreLink,
}) => {
  return (
    <CardWrapper>
      <LogoContainer>
        <img src={logo} alt={`${bankName} logo`} />
      </LogoContainer>
      <BankName>{bankName}</BankName>
      <CardCountBadge>
        <CreditCard size={13} />
        {cardCount} Card{cardCount !== 1 ? 's' : ''} Available
      </CardCountBadge>
      <ExploreButton to={exploreLink}>
        View Cards
        <ArrowRight size={15} />
      </ExploreButton>
    </CardWrapper>
  );
};

export default BankCard;
