import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ArrowRight, CreditCard, Sparkles } from "lucide-react";

import axisCard from "../../assets/images/cards/AXIS.png";
import hdfcCard from "../../assets/images/cards/HDFC.png";
import iciciCard from "../../assets/images/cards/ICICI.png";
import idfcCard from "../../assets/images/cards/IDFC.png";
import yesbankCard from "../../assets/images/cards/YESBANK.png";

const colors = {
  primary: "#0F172A",
  secondary: "#475569",
  accent: "#2563EB",
  accent2: "#06B6D4",
  background: "#F8FAFC",
  border: "#E2E8F0",
  cardBg: "#FFFFFF",
  gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
};

const Section = styled.section`
  padding: 90px 5%;
  background: ${colors.background};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${colors.accent}, transparent);
  }
`;

const Container = styled.div`
  max-width: 1300px;
  margin: auto;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const TitleWrapper = styled.div`
  display: inline-block;
  position: relative;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 800;
  color: ${colors.primary};
  margin: 0;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Underline = styled.div`
  position: absolute;
  bottom: -8px;
  left: 10%;
  width: 80%;
  height: 4px;
  border-radius: 10px;
  background: linear-gradient(90deg, ${colors.accent}, ${colors.accent2});
  animation: glowUnderline 2s ease-in-out infinite;

  @keyframes glowUnderline {
    0%, 100% {
      opacity: 0.8;
      transform: scaleX(1);
    }
    50% {
      opacity: 1;
      transform: scaleX(1.05);
    }
  }
`;

const Subtitle = styled.p`
  color: ${colors.secondary};
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 400;
`;

const BankGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }

  @media (max-width: 450px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const Card = styled.div`
  background: ${colors.cardBg};
  border-radius: 24px;
  padding: 32px 22px;
  border: 1px solid rgba(37, 99, 235, 0.1);
  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;

  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${colors.accent}, ${colors.accent2});
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), 
                rgba(37, 99, 235, 0.1), 
                transparent 50%);
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 
      0 20px 40px -15px rgba(37, 99, 235, 0.3),
      0 0 0 1px rgba(37, 99, 235, 0.1) inset;
    border-color: transparent;

    &::before {
      transform: translateX(0);
    }

    &::after {
      opacity: 1;
    }
  }

  @media (max-width: 700px) {
    padding: 24px 16px;
  }
`;

const LogoWrapper = styled.div`
  width: 100%;
  height: 100px;
  margin-bottom: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-height: 80px;
    max-width: 160px;
    object-fit: contain;
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  ${Card}:hover & img {
    transform: scale(1.1) translateY(-5px);
    filter: drop-shadow(0 10px 15px rgba(37, 99, 235, 0.2));
  }
`;

const BankName = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${colors.primary};
  margin: 0 0 8px 0;
  text-align: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, ${colors.accent}, ${colors.accent2});
    transition: width 0.3s ease;
  }

  ${Card}:hover &::after {
    width: 50%;
  }
`;

const CardCount = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #EEF2FF, #E0E7FF);
  padding: 8px 16px;
  border-radius: 30px;
  margin: 12px 0 20px 0;
  transition: all 0.3s ease;
  border: 1px solid rgba(37, 99, 235, 0.1);

  svg {
    color: ${colors.accent};
    transition: transform 0.3s ease;
  }

  span {
    font-size: 14px;
    font-weight: 600;
    color: ${colors.accent};
    letter-spacing: 0.3px;
  }

  ${Card}:hover & {
    background: linear-gradient(135deg, #E0E7FF, #D6E0FF);
    border-color: rgba(37, 99, 235, 0.2);
    transform: scale(1.05);

    svg {
      transform: rotate(-10deg);
    }
  }
`;

const ExploreButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  background: linear-gradient(135deg, ${colors.accent}, ${colors.accent2});
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: 0.3px;
  width: fit-content;
  min-width: 140px;
  position: relative;
  overflow: hidden;

  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s ease;
  }

  svg {
    width: 18px;
    transition: all 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);

    &::before {
      left: 100%;
    }

    svg {
      transform: translateX(6px) scale(1.2);
    }
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 10px rgba(37, 99, 235, 0.3);
  }

  @media (max-width: 700px) {
    padding: 10px 20px;
    font-size: 14px;
    min-width: 120px;
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: ${colors.primary};
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 4px 10px rgba(255, 215, 0, 0.3);
  z-index: 2;

  svg {
    width: 14px;
    height: 14px;
  }
`;

interface BankCardProps {
  logo: string;
  name: string;
  cardCount: number;
  link: string;
  popular?: boolean;
  onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const BankCard: React.FC<BankCardProps> = ({
  logo,
  name,
  cardCount,
  link,
  popular = false,
  onMouseMove
}) => (
  <Card onMouseMove={onMouseMove}>
    {popular && (
      <Badge>
        <Sparkles size={12} />
        Popular
      </Badge>
    )}
    <LogoWrapper>
      <img src={logo} alt={name} loading="lazy" />
    </LogoWrapper>

    <BankName>{name}</BankName>

    <CardCount>
      <CreditCard size={16} />
      <span>{cardCount} Cards</span>
    </CardCount>

    <ExploreButton to={link}>
      Explore Cards
      <ArrowRight />
    </ExploreButton>
  </Card>
);

const BankGridComponent: React.FC = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--x', `${x}%`);
    e.currentTarget.style.setProperty('--y', `${y}%`);
  };

  const bankPartners = [
    { logo: axisCard, name: "Axis Bank", cardCount: 10, link: "/cards/axis-bank", popular: true },
    { logo: hdfcCard, name: "HDFC Bank", cardCount: 8, link: "/cards/hdfc-bank" },
    { logo: iciciCard, name: "ICICI Bank", cardCount: 9, link: "/cards/icici-bank", popular: true },
    { logo: idfcCard, name: "IDFC First Bank", cardCount: 6, link: "/cards/idfc-bank" },
    { logo: yesbankCard, name: "IndusInd Bank", cardCount: 5, link: "/cards/indusind-bank" },
  ];

  return (
    <Section>
      <Container>
        <Header>
          <TitleWrapper>
            <Title>Compare Credit Cards from Top Banks</Title>
            <Underline />
          </TitleWrapper>
          <Subtitle>
            Discover the best credit cards with rewards, cashback, and travel benefits
            tailored just for you.
          </Subtitle>
        </Header>

        <BankGrid>
          {bankPartners.map((bank) => (
            <BankCard
              key={bank.name}
              logo={bank.logo}
              name={bank.name}
              cardCount={bank.cardCount}
              link={bank.link}
              popular={bank.popular}
              onMouseMove={handleMouseMove}
            />
          ))}
        </BankGrid>
      </Container>
    </Section>
  );
};

export default BankGridComponent;