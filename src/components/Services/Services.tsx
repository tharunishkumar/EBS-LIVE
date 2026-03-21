import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import loansBackground from '/images/Free_Vector___Collection_of_Financial_investment_Bank_deposit_profit_finance_Manage_money_in_cartoon_style_for_graphic_designer_vector_illustration.jpg';
import creditCardBackground from '/images/Credit_cards.jpg';
import insuranceBackground from '/Premium_Vector___Health_medical_report.jpg';
import { CreditCard, HandHeart, Landmark, ShieldCheck, ChevronUp } from 'lucide-react';
import { colors } from '../../styles/theme';

const ServicesSection = styled(motion.section)`
  padding: 80px 5%;
  background: linear-gradient(180deg, ${colors.background.lightGray} 0%, ${colors.background.white} 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, ${colors.accent.tealLight} 0%, transparent 70%);
    border-radius: 50%;
    opacity: 0.5;
    z-index: 0;
  }
`;

const Container = styled(motion.div)`
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 60px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const SectionBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  border-radius: 100px;
  background: ${colors.badge.bg};
  border: 1px solid ${colors.badge.border};
  color: ${colors.badge.text};
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3rem);
  color: ${colors.text.dark};
  margin-bottom: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
  
  .underline-svg {
    color: ${colors.accent.teal};
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      left: -2px;
      width: 100%;
      background: url('/images/draw/underline.svg') no-repeat bottom/contain;
      z-index: -1;
      
      bottom: -15px;
      height: 20px;
      
      @media (min-width: 481px) and (max-width: 767px) {
        bottom: -15px;
        height: 25px;
      }
      
      @media (min-width: 768px) and (max-width: 1023px) {
        bottom: -25px;
        height: 32px;
      }
      
      @media (min-width: 1024px) {
        bottom: -40px;
        height: 45px;
      }
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 1rem;
    line-height: 1.3;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  color: ${colors.text.gray};
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const CardsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 20px 0;

  @media (max-width: 1200px) {
    gap: 20px;
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 10px;
  }
`;

const ServiceCard = styled(motion.div)`
  border-radius: 24px;
  text-align: left;
  box-shadow: 0 20px 40px ${colors.shadow.cardSoft};
  overflow: hidden;
  cursor: pointer;
  position: relative;
  border: 1px solid ${colors.border.cardBorder};
  height: 420px;
  /* Force GPU compositing layer — prevents corner clipping artifact during animation */
  transform: translateZ(0);
  transition: box-shadow 0.4s ease, border-color 0.4s ease;

  &:hover {
    box-shadow: 0 40px 60px ${colors.shadow.cardHover};
    border-color: transparent;

    .card-sheet {
      transform: translateY(0) translateZ(0);
    }

    .card-image {
      transform: scale(1.09);
    }

    .card-sticky-title {
      opacity: 0;
      transform: translateY(10px);
    }

    /* Hint chevron fades out when sheet is open */
    .hover-hint {
      opacity: 0;
    }
  }

  @media (max-width: 768px) {
    height: auto;
    transform: none;

    &:hover {
      box-shadow: 0 20px 40px ${colors.shadow.cardSoft};
      border-color: ${colors.border.cardBorder};

      .card-sheet { transform: translateY(0); }
      .card-image { transform: scale(1); }
      .card-sticky-title { opacity: 1; transform: translateY(0); }
      .hover-hint { opacity: 0; }
    }
  }
`;

const ImageWrapper = styled.div<{ image: string }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;

  .card-image {
    width: 100%;
    height: 100%;
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
    /* Slower, smoother zoom so it doesn't feel jarring */
    transition: transform 1s ease;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent 30%,
      rgba(5, 35, 35, 0.65) 100%
    );
    z-index: 1;
  }

  /* Mobile: static relative positioning */
  @media (max-width: 768px) {
    position: relative;
    height: 220px;
  }
`;

/* Title pinned at bottom of image (visible by default on desktop) */
const CardStickyTitle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  padding: 24px 28px 20px;
  transition: opacity 0.35s ease, transform 0.35s ease;

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    margin: 0;
    line-height: 1.3;
  }

  /* On mobile: hide this overlay title, use CardContent title instead */
  @media (max-width: 768px) {
    display: none;
  }
`;

/* Bottom sheet that slides up on hover */
const CardSheet = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  transform: translateY(calc(100% - 76px)) translateZ(0);
  transition: transform 0.52s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 3;
  /* GPU layer so the browser clips it against the parent border-radius without artifacts */
  will-change: transform;
  backface-visibility: hidden;

  @media (max-width: 768px) {
    position: relative;
    transform: none !important;
    transition: none;
    will-change: auto;
  }
`;

const CardContent = styled.div`
  padding: 0;
  background: ${colors.background.white};
  position: relative;
  /* Thin teal accent line at the top of the revealed sheet */
  border-top: 3px solid ${colors.accent.teal};
  /* No border-radius — parent overflow:hidden clips corners, avoiding flicker */
`;

/* Animated chevron hint — tells users to hover */
const HoverHint = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${colors.accent.teal};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  opacity: 0.75;
  transition: opacity 0.3s ease;
  flex-shrink: 0;

  svg {
    animation: bounceUp 1.6s ease-in-out infinite;
  }

  @keyframes bounceUp {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }

  /* Hide on mobile — no hover concept */
  @media (max-width: 768px) {
    display: none;
  }
`;

/* The always-visible peek strip — icon + title row */
const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 24px;
  min-height: 73px;
  border-bottom: 1px solid ${colors.border.cardBorder};
`;

/* Body area shown only when sheet is fully open */
const CardBody = styled.div`
  padding: 20px 24px 24px;
`;

const CardIcon = styled.div<{ index: number }>`
  /* Fixed size, no margin — lives inside CardHeader flex row */
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  background: ${props => props.index % 2 === 0 ? colors.accent.tealLight : colors.background.card};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.index % 2 === 0 ? colors.accent.teal : colors.accent.blue};
`;

const CardTitle = styled.h3`
  /* Inside the flex header row — no bottom margin, no standalone spacing */
  font-size: 1.15rem;
  color: ${colors.text.dark};
  margin: 0;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.01em;
`;

const CardDescription = styled.p`
  font-size: 0.95rem;
  color: ${colors.text.gray};
  line-height: 1.6;
  margin: 0 0 18px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 18px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const FeatureItem = styled.li`
  font-size: 0.85rem;
  color: ${colors.text.gray};
  padding: 6px 12px;
  background: ${colors.background.lightGray};
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: '✓';
    color: ${colors.accent.teal};
    font-weight: 600;
  }
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${colors.border.cardBorder};
  padding-top: 20px;
`;

const LearnMore = styled(motion.button)`
  background: transparent;
  color: ${colors.accent.teal};
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0;

  &::after {
    content: '→';
    font-size: 1.2rem;
    transition: transform 0.3s ease;
  }

  &:hover {
    color: ${colors.accent.teal};
    
    &::after {
      transform: translateX(5px);
    }
  }
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Stat = styled.div`
  text-align: right;
`;

const StatValue = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${colors.text.dark};
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: ${colors.text.gray};
`;

const Services: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      image: loansBackground,
      icon: Landmark,
      title: 'Smart Loans',
      description: 'Flexible financing solutions with competitive rates and instant approvals. Your financial goals, our priority.',
      route: '/loans',
      features: ['Personal Loans', 'Business Loans', 'Home Loans'],
      stats: { value: '4.5%', label: 'Starting APR' }
    },
    {
      image: insuranceBackground,
      title: 'Secure Insurance',
      icon: ShieldCheck,
      description: 'Comprehensive protection plans tailored to safeguard what matters most - your health, life, and assets.',
      route: '/insurance',
      features: ['Life Cover Plans', 'Health Plans', 'Asset Protection'],
      stats: { value: '1M+', label: 'Happy Clients' }
    },
    {
      image: creditCardBackground,
      title: 'Credit Cards',
      icon: CreditCard,
      description: 'Exclusive credit cards with unmatched rewards, travel benefits, and lifestyle privileges for discerning users.',
      route: '/credit-cards',
      features: ['Rewards Program', 'Travel Benefits', 'Zero Fees'],
      stats: { value: '2%', label: 'Cashback' }
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <ServicesSection
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Container>
        <SectionHeader
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <SectionBadge>
            <HandHeart size={18} />
            Our Features & Services
          </SectionBadge>
          <Title>
            Financial Solutions <span className="underline-svg">Tailored</span> For You
          </Title>
          <Description>
            Discover a world of financial possibilities with our comprehensive range
            of services designed to meet your unique needs and aspirations.
          </Description>
        </SectionHeader>

        <CardsContainer
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              variants={cardVariants}
              onClick={() => navigate(service.route)}
            >
              {/* Full-bleed background image */}
              <ImageWrapper image={service.image}>
                <div className="card-image" />
              </ImageWrapper>

              {/* Title overlay visible at rest (desktop only) */}
              <CardStickyTitle className="card-sticky-title">
                <h3>{service.title}</h3>
              </CardStickyTitle>

              {/* Sheet that slides up on hover to reveal full content */}
              <CardSheet className="card-sheet">
                <CardContent>
                  {/* Always-visible header peek: icon + title in one clean row */}
                  <CardHeader>
                    <CardIcon index={index}>
                      <service.icon />
                    </CardIcon>
                    <CardTitle>{service.title}</CardTitle>
                    <HoverHint className="hover-hint">
                      <ChevronUp size={16} />
                    </HoverHint>
                  </CardHeader>

                  {/* Revealed on hover */}
                  <CardBody>
                    <CardDescription>{service.description}</CardDescription>

                    <FeatureList>
                      {service.features.map((feature, idx) => (
                        <FeatureItem key={idx}>{feature}</FeatureItem>
                      ))}
                    </FeatureList>

                    <CardFooter>
                      <LearnMore
                        whileHover={{ x: 5 }}
                        whileTap={{ x: 0 }}
                      >
                        Learn More
                      </LearnMore>

                      <Stats>
                        <Stat>
                          <StatValue>{service.stats.value}</StatValue>
                          <StatLabel>{service.stats.label}</StatLabel>
                        </Stat>
                      </Stats>
                    </CardFooter>
                  </CardBody>
                </CardContent>
              </CardSheet>
            </ServiceCard>
          ))}
        </CardsContainer>
      </Container>
    </ServicesSection>
  );
};

export default Services;