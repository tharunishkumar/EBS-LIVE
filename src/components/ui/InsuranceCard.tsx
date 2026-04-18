import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface InsuranceCardProps {
  image: string;
  title: string;
  description: string;
  benefits: string[];
  exploreLink: string;
}

const CardWrapper = styled.div`
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(0, 119, 255, 0.12);
    border-color: rgba(0, 119, 255, 0.14);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;

    ${CardWrapper}:hover & {
      transform: scale(1.06);
    }
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 40%,
      rgba(15, 23, 42, 0.65) 100%
    );
  }
`;

const ImageTitle = styled.div`
  position: absolute;
  bottom: 16px;
  left: 20px;
  right: 20px;
  z-index: 2;

  h3 {
    font-family: 'Poppins', system-ui, sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
    text-shadow: 0 2px 4px rgba(0,0,0,0.25);
  }
`;

const Content = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`;

const Description = styled.p`
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
  line-height: 1.65;
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13.5px;
  color: #334155;
  font-weight: 500;

  svg {
    color: #22c55e;
    flex-shrink: 0;
  }
`;

const ExploreButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 44px;
  background: linear-gradient(135deg, #0077ff 0%, #0047ff 100%);
  color: #ffffff;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
  box-shadow: 0 3px 12px rgba(0, 119, 255, 0.25);
  margin-top: auto;

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

const InsuranceCard: React.FC<InsuranceCardProps> = ({
  image,
  title,
  description,
  benefits,
  exploreLink,
}) => {
  return (
    <CardWrapper>
      <ImageWrapper>
        <img src={image} alt={title} />
        <ImageTitle><h3>{title}</h3></ImageTitle>
      </ImageWrapper>
      <Content>
        <Description>{description}</Description>
        <BenefitsList>
          {benefits.map((benefit, i) => (
            <BenefitItem key={i}>
              <CheckCircle size={15} />
              {benefit}
            </BenefitItem>
          ))}
        </BenefitsList>
        <ExploreButton to={exploreLink}>
          Explore Plans
          <ArrowRight size={15} />
        </ExploreButton>
      </Content>
    </CardWrapper>
  );
};

export default InsuranceCard;
