import React from "react";
import styled, { keyframes } from "styled-components";
import { Button, Typography } from "antd";
import creditCardHeroImg from '../../assets/images/cards/AXIS.png';
import creditCardHeroImg2 from '../../assets/images/cards/IDFC.png';
import { use3DTilt } from "../../hooks/use3DTilt";
import { CreditCard, ShieldCheck } from 'lucide-react';
import { useInView } from "react-intersection-observer";
import CountUp from 'react-countup';
import { colors } from "../../styles/theme";

const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeInRight = keyframes`
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.08; transform: scale(1); }
  50% { opacity: 0.15; transform: scale(1.05); }
`;

const highlightSwipe = keyframes`
  0% {
    background-size: 0% 100%;
  }
  100% {
    background-size: 100% 100%;
  }
`;

/* ================= WRAPPER ================= */

const HeroWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(30px, 5vw, 80px);
  padding: clamp(80px, 12vh, 140px) clamp(20px, 6vw, 100px) 0;
  min-height: 100vh;
  background: ${colors.background.hero};
  position: relative;
  overflow: hidden;
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
    padding: 100px clamp(20px, 5vw, 60px) 0;
    gap: 40px;
  }

  @media (max-width: 768px) {
    padding: 80px 20px 0;
    min-height: 100dvh;
    gap: 30px;
  }

  @media (max-width: 480px) {
    padding: 70px 16px 0;
    gap: 16px;
  }
`;

/* ================= BACKGROUND DECORATIONS ================= */

const BgOrb = styled.div<{ size: string; top: string; left: string; color: string; delay?: string }>`
  position: absolute;
  width: ${p => p.size};
  height: ${p => p.size};
  border-radius: 50%;
  background: ${p => p.color};
  top: ${p => p.top};
  left: ${p => p.left};
  opacity: 0.07;
  z-index: 0;
  filter: blur(60px);
  animation: ${pulse} 8s ease-in-out infinite;
  animation-delay: ${p => p.delay || '0s'};
  pointer-events: none;

  @media (max-width: 768px) {
    filter: blur(40px);
    opacity: 0.05;
  }
`;

const GridPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(${colors.border.accentFaint} 1px, transparent 1px),
    linear-gradient(90deg, ${colors.border.accentFaint} 1px, transparent 1px);
  background-size: 60px 60px;
  z-index: 0;
  pointer-events: none;

  @media (max-width: 768px) {
    background-size: 40px 40px;
  }
`;

/* ================= LEFT CONTENT ================= */

const LeftContent = styled.div`
  flex: 1;
  max-width: 620px;
  animation: ${fadeInUp} 0.8s ease forwards;
  position: relative;
  z-index: 10;

  @media (max-width: 1024px) {
    max-width: 560px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  color: ${colors.accent.blueMid};
  font-size: clamp(0.7rem, 1.2vw, 0.85rem);
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 8px;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${colors.accent.blue};
    box-shadow: 0 0 8px ${colors.accent.blueGlow};
  }

  @media (max-width: 480px) {
  &::before {
    width: 6px;
    height: 6px;
  }
}

  @media (max-width: 480px) {
  padding: 6px 14px;
  font-size: clamp(0.45rem, 2vw, 0.55rem);
  letter-spacing: 1px;
  margin-top: 10px;
}
`;

const HeroTitle = styled.h1`
  font-size: clamp(2rem, 4.5vw, 3.6rem) !important;
  font-weight: 800 !important;
  line-height: 1.15 !important;
  margin-bottom: clamp(14px, 2vw, 24px) !important;
  color: ${colors.text.primary};
  letter-spacing: -0.5px;

  .highlight {
    background: linear-gradient(135deg, ${colors.primary.start} 0%, ${colors.primary.end} 50%, ${colors.primary.end} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const Highlight = styled.span`
  position: relative;
  display: inline-block;
  background-image: linear-gradient(
  120deg,
  ${colors.accent.highlightBg} 0%,
  ${colors.accent.highlightBg} 100%
);
  background-repeat: no-repeat;
  background-size: 0% 100%;
  animation: ${highlightSwipe} 1.2s ease forwards;
  animation-delay: 0.8s;
  padding: 0 6px;
  border-radius: 6px;
`;

const HeroText = styled.p`
  font-size: clamp(0.95rem, 1.4vw, 1.2rem);
  color: ${colors.text.secondary};
  margin-bottom: clamp(20px, 3vw, 36px);
  line-height: 1.7;
  max-width: 520px;

  @media (max-width: 1024px) {
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 480px) {
  font-size: clamp(0.75rem, 3.2vw, 0.95rem);
  line-height: 1.55;
  max-width: 100%;
}
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  @media (max-width: 1024px) {
    justify-content: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    width: 100%;

    .ant-btn {
      width: 100%;
      max-width: 280px;
    }
  }
`;

const PrimaryBtn = styled(Button)`
  && {
    height: 52px;
    padding: 0 36px;
    border-radius: 14px;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    color: #fff;

    background: ${colors.accent.gradient};
    box-shadow: 0 8px 24px ${colors.accent.blueShadow};
    transition: transform 0.25s ease, box-shadow 0.25s ease;

    &:hover,
    &:focus {
      background: ${colors.accent.gradient} !important;
      color: #fff !important;
      border: none !important;

      transform: translateY(-2px);
      box-shadow: 0 12px 32px ${colors.accent.blueShadowHover};
    }

    &:active {
      transform: translateY(0);
    }
  }
`;

const SecondaryBtn = styled(Button)`
  && {
    height: 52px;
    padding: 0 36px;
    border-radius: 14px;
    font-size: 1rem;
    font-weight: 600;
    border: 2px solid ${colors.accent.blueBorder};
    color: ${colors.accent.blueMid};
    background: ${colors.accent.blueFaint};
    backdrop-filter: blur(4px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      border-color: ${colors.accent.blue};
      background: ${colors.accent.blueLight};
      color: ${colors.accent.blueDark};
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }
`;

/* ================= POWERED BY ================= */

const PoweredWrapper = styled.div`
  width: 100%;
  flex-basis: 100%;
  overflow: hidden;
  position: relative;
  z-index: 10;
  padding: clamp(30px, 4vw, 50px) clamp(20px, 4vw, 60px) clamp(30px, 4vw, 50px);
  margin-top: clamp(-30px, -3vw, -10px);
  border-top: 1px solid ${colors.border.accentFaint};

  @media (max-width: 768px) {
    padding: 24px 16px 28px;
    margin-top: 16px;
  }

  @media (max-width: 480px) {
    padding: 14px 12px 16px;
    margin-top: 8px;
  }
`;

const PoweredTitle = styled.div`
  font-size: 12px;
  letter-spacing: 3px;
  font-weight: 700;
  color: ${colors.text.mutedLight};
  text-transform: uppercase;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 10px;
    letter-spacing: 2.5px;
    margin-bottom: 14px;
  }
`;

const LogoMarquee = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;

  /* Soft fade edges */
  mask-image: linear-gradient(
    to right,
    transparent,
    black 8%,
    black 92%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 8%,
    black 92%,
    transparent
  );
`;

const LogoTrack = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(60px, 7vw, 100px);
  width: max-content;

  animation: ${scroll} 60s linear infinite;
  will-change: transform;

  img {
    height: clamp(32px, 4vw, 48px);
    transition: opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease;
    flex-shrink: 0;
  }

  img:hover {
    opacity: 1;
    filter: grayscale(0%);
    transform: scale(1.1);
  }

  &:hover {
    animation-play-state: paused;
  }

  /* Tablet */
  @media (max-width: 768px) {
    gap: 50px;

    img {
      height: clamp(34px, 6vw, 44px);
    }
  }

  /* Mobile - Bigger */
  @media (max-width: 480px) {
    gap: 40px;
    animation-duration: 50s; /* slower for better visibility */

    img {
      height: clamp(28px, 7vw, 36px);
    }
  }
`;
/* ================= RIGHT VISUAL ================= */

const RightVisual = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  min-height: clamp(320px, 45vw, 560px);
  max-width: 600px;
  animation: ${fadeInRight} 0.8s ease forwards;
  animation-delay: 0.2s;
  opacity: 0;

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 500px;
    min-height: clamp(280px, 50vw, 420px);
  }

  @media (max-width: 480px) {
    min-height: 180px;
    max-width: 100%;
  }
`;

/* ================= CREDIT CARD IMAGES ================= */

const CardsContainer = styled.div`
  position: relative;
  z-index: 10;
  width: clamp(260px, 35vw, 400px);
  height: clamp(220px, 30vw, 340px);

  @media (max-width: 1024px) {
    width: clamp(240px, 45vw, 360px);
    height: clamp(200px, 35vw, 280px);
  }

  @media (max-width: 480px) {
  width: clamp(150px, 55vw, 220px);
  height: clamp(130px, 35vw, 190px);
}
`;

const CardImage = styled.img<{ $isBack?: boolean }>`
  position: absolute;
  width: 100%;
  border-radius: 16px;
  z-index: ${p => p.$isBack ? 5 : 10};
  filter: drop-shadow(0 20px 40px ${colors.shadow.card});
 transition: transform 0.2s ease-out;
  transform-style: preserve-3d;
  will-change: transform;

  ${p => p.$isBack ? `
    top: -12%;
    left: -8%;
    transform: rotate(-6deg) scale(0.92);
    opacity: 0.85;
  ` : `
    top: 12%;
    left: 8%;
    transform: rotate(3deg);
  `}
`;

/* ================= METRIC BUBBLES ================= */

const Bubble = styled.div<{ $position: 'top-right' | 'bottom-left' }>`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 8px 14px; /* Reduced size */

  border-radius: 18px; /* Modern curve, not full pill */
  background: ${colors.background.glass};

  box-shadow:
    0 6px 18px ${colors.shadow.bubbleOuter},
    0 2px 6px ${colors.shadow.bubbleInner};

  backdrop-filter: blur(10px);
  border: 1px solid ${colors.border.glassBorder};

  z-index: 20;
  animation: ${float} 4s ease-in-out infinite;
  transition: all 0.3s ease;

  ${p =>
    p.$position === 'top-right'
      ? `
    top: 6%;
    right: -3%;
    animation-delay: 0s;
  `
      : `
    bottom: 20%;
    left: -3%;
    animation-delay: 2s;
  `}

  &:hover {
    transform: translateY(-4px);
  }

  @media (max-width: 1024px) {
    ${p =>
    p.$position === 'bottom-left' &&
    `
      bottom: 12%;
    `}
  }

  @media (max-width: 600px) {
    ${p =>
    p.$position === 'bottom-left' &&
    `
      bottom: 4%;
    `}
  }
`;

const BubbleIcon = styled.div<{ color: string }>`
  width: 34px;
  height: 34px;
  border-radius: 12px;

  background: ${p => p.color};
  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  font-size: 16px;
  flex-shrink: 0;
`;

const BubbleText = styled.div`
  .value {
    font-size: 0.95rem;
    font-weight: 700;
    color: ${colors.text.heading};
    line-height: 1.1;
  }

  .label {
    font-size: 0.7rem;
    color: ${colors.text.muted};
    font-weight: 500;
  }
`;

/* ================= STATS ROW ================= */

const StatItem = styled.div`
  position: relative;

  .stat-value {
    font-size: clamp(20px, 3vw, 30px);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.01em;
    display: flex;
    align-items: baseline;
    gap: 2px;

    span {
      background: ${colors.stat.gradient};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      transition: all 0.2s ease;
    }

    .stat-number-highlight {
      background: ${colors.stat.gradientAlt};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 700;
    }

    .stat-suffix {
      font-size: 0.55em;
      font-weight: 600;
      color: ${colors.text.mutedLight};
      margin-left: 2px;
      background: none;
      -webkit-text-fill-color: ${colors.text.mutedLight};
    }
  }

  .stat-label {
    font-size: clamp(0.65rem, 0.9vw, 0.8rem);
    font-weight: 500;
    letter-spacing: 0.01em;
    margin-top: 5px;
    display: inline-block;
    color: ${colors.text.muted};
  }

  &:hover .stat-value span:not(.stat-suffix) {
    background: ${colors.stat.hoverGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 480px) {
    .stat-value {
      font-size: clamp(14px, 4.5vw, 16px);
      gap: 1px;
    }

    .stat-label {
      font-size: clamp(0.6rem, 2.3vw, 0.7rem);
      margin-top: 4px;
    }
  }
`;

const StatsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(32px, 6vw, 80px);
  margin-top: clamp(32px, 5vw, 48px);
  padding-top: clamp(24px, 4vw, 40px);
  border-top: 2px solid ${colors.border.separator};
  position: relative;

  /* Simple decorative element */
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: 0;
    width: 80px;
    height: 2px;
    background: linear-gradient(90deg, ${colors.accent.blue}, transparent);
    border-radius: 2px;
  }

  @media (max-width: 1024px) {
    justify-content: flex-start;
    
    &::before {
      width: 60px;
    }
  }

  @media (max-width: 768px) {
    gap: 40px;
    justify-content: space-between;
  }

  @media (max-width: 480px) {
    gap: 24px;
    margin-top: 16px;
    padding-top: 14px;
  }
`;

const partners = [
  'aditya.png', 'au.jpg', 'Axis_Bank-Logo.png', 'chola.png', 'cs.png',
  'csb.png', 'dbs.jpg', 'eq.png', 'federal.png', 'gc.jpg',
  'hdfc.jpg', 'hero.png', 'icici.jpg', 'idfc.jpg', 'in.png',
  'inb.png', 'indusind.png', 'kotak.jpg', 'sc.jpg', 'sri.png',
  'yes.png'
];

const quadruplePartners = [...partners, ...partners, ...partners, ...partners];

const Hero: React.FC = () => {
  const card1Tilt = use3DTilt();
  const card2Tilt = use3DTilt();
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <>
      <HeroWrapper>
        {/* Background decorations */}
        <GridPattern />
        <BgOrb size="clamp(300px, 40vw, 600px)" top="-10%" left="-10%" color={colors.accent.blue} />
        <BgOrb size="clamp(200px, 30vw, 400px)" top="50%" left="60%" color={colors.accent.purple} delay="3s" />
        <BgOrb size="clamp(150px, 20vw, 300px)" top="70%" left="10%" color={colors.accent.cyan} delay="5s" />

        {/* Left content */}
        <LeftContent>
          <Chip>Empowering Your Financial Journey</Chip>

          <HeroTitle>
            Transform Your{" "}
            <Highlight>Financial Journey</Highlight>
          </HeroTitle>

          <HeroText>
            Discover exclusive financial solutions tailored to your needs. Apply now and elevate your financial journey with EBS Groups.
          </HeroText>

          <ButtonGroup>
            <PrimaryBtn type="primary" size="large" href="/about-us">
              Get Started
            </PrimaryBtn>
          </ButtonGroup>

          <StatsRow ref={ref}>
            <StatItem>
              <div className="stat-value">
                <span>
                  {inView && (
                    <CountUp start={0} end={75} duration={2.5} suffix="+" />
                  )}
                </span>
              </div>
              <div className="stat-label">Cities</div>
            </StatItem>
            <StatItem>
              <div className="stat-value">
                <span>
                  {inView && (
                    <CountUp start={0} end={1250} duration={2.5} suffix="+" />
                  )}
                </span>
              </div>
              <div className="stat-label">Trained Professionals</div>
            </StatItem>
            <StatItem>
              <div className="stat-value">
                <span>
                  {inView && (
                    <CountUp start={0} end={50} duration={2.5} suffix="+" />
                  )}
                </span>
              </div>
              <div className="stat-label">Partners</div>
            </StatItem>
            <StatItem>
              <div className="stat-value">
                <span>
                  {inView && (
                    <CountUp start={0} end={75000} duration={2.5} suffix="Cr+" />
                  )}
                </span>
              </div>
              <div className="stat-label">Loans Disbursed</div>
            </StatItem>
          </StatsRow>
        </LeftContent>


        {/* Right visual */}
        <RightVisual>
          {/* <GradientShape /> */}

          <CardsContainer>
            {/* Back card */}
            <CardImage
              src={creditCardHeroImg2}
              alt="Credit Card Back"
              $isBack
              ref={card1Tilt.ref}
              onMouseMove={card1Tilt.handleMouseMove}
              onMouseLeave={card1Tilt.handleMouseLeave}
            />
            {/* Front card */}
            <CardImage
              src={creditCardHeroImg}
              alt="Credit Card Front"
              ref={card2Tilt.ref}
              onMouseMove={card2Tilt.handleMouseMove}
              onMouseLeave={card2Tilt.handleMouseLeave}
            />
          </CardsContainer>

          {/* Floating metrics */}
          <Bubble $position="top-right">
            <BubbleIcon color={colors.bubble.insurance}>
              <ShieldCheck />
            </BubbleIcon>
            <BubbleText>
              <div className="value">Insurance</div>
              <div className="label">Trusted Protection</div>
            </BubbleText>
          </Bubble>

          <Bubble $position="bottom-left">
            <BubbleIcon color={colors.bubble.loan}>
              <CreditCard />
            </BubbleIcon>
            <BubbleText>
              <div className="value">Loans</div>
              <div className="label">Quick Approval</div>
            </BubbleText>
          </Bubble>
        </RightVisual>

        {/* Powered By - full width below both columns */}
        <PoweredWrapper>
          <PoweredTitle>OUR PARTNERS</PoweredTitle>

          <LogoMarquee>
            <LogoTrack>
              {quadruplePartners.map((logo, index) => (
                <img
                  key={index}
                  src={`/images/partners/${logo}`}
                  alt={logo.replace(/\.[^/.]+$/, "")}
                  loading="lazy"
                />
              ))}
            </LogoTrack>
          </LogoMarquee>
        </PoweredWrapper>
      </HeroWrapper>
    </>
  );
};

export default Hero;