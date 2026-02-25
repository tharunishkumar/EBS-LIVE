import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import loansBackground from '/images/Free_Vector___Collection_of_Financial_investment_Bank_deposit_profit_finance_Manage_money_in_cartoon_style_for_graphic_designer_vector_illustration.jpg';
import creditCardBackground from '/images/Credit_cards.jpg';
import insuranceBackground from '/Premium_Vector___Health_medical_report.jpg';
import { CreditCard, HandHeart, Landmark, ShieldCheck } from 'lucide-react';
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
  
  span {
    color: ${colors.accent.teal};
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 5px;
      left: 0;
      width: 100%;
      height: 8px;
      background: ${colors.accent.tealLight};
      z-index: -1;
    }
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
  background: ${colors.background.white};
  border-radius: 24px;
  text-align: left;
  box-shadow: 0 20px 40px ${colors.shadow.cardSoft};
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  cursor: pointer;
  position: relative;
  border: 1px solid ${colors.border.cardBorder};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    transform: scaleX(0);
    transition: transform 0.4s ease;
    transform-origin: left;
    z-index: 2;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 40px 60px ${colors.shadow.cardHover};
    border-color: transparent;

    &::before {
      transform: scaleX(1);
    }
  }

  @media (max-width: 768px) {
    &:hover {
      transform: translateY(-5px);
    }
  }
`;

const ImageWrapper = styled.div<{ image: string }>`
  width: 100%;
  height: 280px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;
  transition: transform 0.6s ease;

  ${ServiceCard}:hover & {
    transform: scale(1.05);
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
      transparent 0%,
      rgba(11, 59, 58, 0.2) 100%
    );
  }

  @media (max-width: 768px) {
    height: 240px;
  }
`;

const CardContent = styled.div`
  padding: 30px;
  background: ${colors.background.white};
  position: relative;
`;

const CardIcon = styled.div<{ index: number }>`
  width: 50px;
  height: 50px;
  background: ${props => props.index % 2 === 0 ? colors.accent.tealLight : colors.background.card};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
  color: ${props => props.index % 2 === 0 ? colors.accent.teal : colors.accent.blue};
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: ${colors.text.dark};
  margin-bottom: 12px;
  font-weight: 700;
  line-height: 1.3;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: ${colors.text.gray};
  line-height: 1.6;
  margin-bottom: 25px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 25px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
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
            Financial Solutions <span>Tailored</span> For You
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
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(service.route)}
            >
              <ImageWrapper image={service.image} />
              <CardContent>
                <CardIcon index={index}>
                  <service.icon />
                </CardIcon>
                <CardTitle>{service.title}</CardTitle>
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
              </CardContent>
            </ServiceCard>
          ))}
        </CardsContainer>
      </Container>
    </ServicesSection>
  );
};

export default Services;