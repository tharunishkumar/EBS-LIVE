import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Users, Globe2, Target, ShieldCheck, Award, Zap, CheckCircle2 } from 'lucide-react';
import BranchNetwork from './BranchNetwork';
import Footer from '../../components/Footer/Footer';
import SectionHeader from '../../components/ui/SectionHeader';

// Styled Components
const PageWrapper = styled.div`
  overflow-x: hidden;
  background-color: #f8fafc;
  min-height: 100vh;
`;

const HeroSection = styled.div`
  position: relative;
  height: 100vh;
  min-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, transparent 0%, rgba(15, 23, 42, 0.8) 100%);
    pointer-events: none;
  }
`;

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 10;
  text-align: center;
  color: white;
  max-width: 900px;
  padding: 0 24px;

  h1 {
    font-size: clamp(3rem, 6vw, 5rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 24px;
    background: linear-gradient(to right, #ffffff, #93c5fd);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.02em;
  }

  p {
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    color: #cbd5e1;
    margin-bottom: 48px;
    max-width: 600px;
    margin-inline: auto;
    line-height: 1.6;
  }
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const StatItem = styled.div`
  .number {
    font-size: clamp(2.5rem, 4vw, 3.5rem);
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 8px;
    text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
  }
  .label {
    font-size: 1rem;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
  }
`;

const MainContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 20;
  margin-top: -80px;
  padding-bottom: 80px;
`;

// Mission & Vision
const MissionVisionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GlassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  height: 100%;

  .icon-wrapper {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    color: #2563eb;
  }

  h3 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 16px;
  }

  p {
    font-size: 1.1rem;
    color: #475569;
    line-height: 1.6;
  }
`;

// Core Values
const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 100px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ValueCard = styled(motion.div)`
  background: #ffffff;
  padding: 32px 24px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 20px 40px rgba(37, 99, 235, 0.1);
    transform: translateY(-5px);
  }

  .icon {
    width: 56px;
    height: 56px;
    margin: 0 auto 20px;
    border-radius: 14px;
    background: #399cffff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffffff;
  }

  h4 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 12px;
  }

  p {
    font-size: 0.95rem;
    color: #64748b;
    line-height: 1.5;
  }
`;

// Timeline
const TimelineSection = styled.div`
  margin-bottom: 100px;
  padding: 60px 0;
  position: relative;
`;

const TimelineContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    background: #e2e8f0;
    transform: translateX(-50%);

    @media (max-width: 768px) {
      left: 24px;
    }
  }
`;

const TimelineItemWrapper = styled(motion.div) <{ $isEven: boolean }>`
  display: flex;
  justify-content: ${props => props.$isEven ? 'flex-start' : 'flex-end'};
  padding: 40px 0;
  position: relative;
  width: 100%;

  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-left: 64px;
  }

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #3b82f6;
    border: 4px solid #eff6ff;
    z-index: 2;

    @media (max-width: 768px) {
      left: 24px;
    }
  }
`;

const TimelineContent = styled.div<{ $isEven: boolean }>`
  width: calc(50% - 40px);
  background: white;
  padding: 32px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  text-align: ${props => props.$isEven ? 'right' : 'left'};

  @media (max-width: 768px) {
    width: 100%;
    text-align: left;
  }

  .year {
    font-size: 1.5rem;
    font-weight: 800;
    color: #2563eb;
    margin-bottom: 12px;
  }

  p {
    color: #475569;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 12px;
  }
`;

// Founder
const FounderSection = styled.div`
  margin-bottom: 100px;
  background: white;
  border-radius: 32px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  display: grid;
  grid-template-columns: 2fr 3fr;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const FounderImage = styled.div`
  position: relative;
  min-height: 400px;
  
  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, transparent 100%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 32px;
    color: white;

    h3 {
      font-size: 2rem;
      font-weight: 800;
      margin-bottom: 4px;
    }
    span {
      color: #93c5fd;
      font-weight: 600;
    }
  }
`;

const FounderInfo = styled.div`
  padding: 48px;

  @media (max-width: 640px) {
    padding: 32px 24px;
  }

  .quote {
    font-size: 1.5rem;
    font-weight: 300;
    font-style: italic;
    color: #1e293b;
    margin-bottom: 32px;
    border-left: 4px solid #3b82f6;
    padding-left: 20px;
  }

  .bio {
    color: #475569;
    line-height: 1.8;
    margin-bottom: 32px;

    p { margin-bottom: 16px; }
  }
`;

const StatsBadges = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  .badge {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 12px 20px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;

    strong {
      color: #2563eb;
      font-size: 1.25rem;
    }
    span {
      font-size: 0.875rem;
      color: #64748b;
    }
  }
`;

// Leadership
const LeadershipGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LeaderCard = styled(motion.div)`
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;

  .image-wrapper {
    height: 300px;
    background: #f1f5f9;
    overflow: hidden;
    position: relative;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: bottom;
      padding-top: 24px;
      transition: transform 0.5s ease;
    }
  }

  &:hover {
    .image-wrapper img {
      transform: scale(1.05);
    }
  }

  .info {
    padding: 32px;
    flex-grow: 1;

    h3 {
      font-size: 1.5rem;
      font-weight: 800;
      color: #0f172a;
    }
    h4 {
      color: #3b82f6;
      font-weight: 600;
      margin-bottom: 16px;
      font-size: 1rem;
    }
    p {
      color: #475569;
      line-height: 1.6;
      font-size: 0.95rem;
    }
  }
`;

// 3D Particles
const ParticleField = () => {
  const count = 1000;
  const particlesRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const [positions] = React.useState(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return positions;
  });

  useFrame((state) => {
    if (!particlesRef.current) return;
    const time = state.clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      particlesRef.current.geometry.attributes.position.array[i3] += Math.sin(time + i) * 0.001;
      particlesRef.current.geometry.attributes.position.array[i3 + 1] += Math.cos(time + i) * 0.001;
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.rotation.y = mouse.x * 0.1;
    particlesRef.current.rotation.x = -mouse.y * 0.1;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#60a5fa" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
};

// Main Component
const AboutUs: React.FC = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <PageWrapper>
      {/* Hero */}
      <HeroSection>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <ParticleField />
          </Canvas>
        </div>

        <HeroContent
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 variants={fadeUp}>Empowering Financial Futures</motion.h1>
          <motion.p variants={fadeUp}>Building Trust Through Financial Excellence Since 1995</motion.p>

          <StatsGrid variants={fadeUp}>
            <StatItem>
              <div className="number">19+</div>
              <div className="label">Years of Excellence</div>
            </StatItem>
            <StatItem>
              <div className="number">1M+</div>
              <div className="label">Happy Customers</div>
            </StatItem>
            <StatItem>
              <div className="number">50+</div>
              <div className="label">Cities Served</div>
            </StatItem>
          </StatsGrid>
        </HeroContent>
      </HeroSection>

      <MainContainer>
        {/* Mission & Vision */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} style={{ marginTop: '40px' }}>
          <MissionVisionGrid>
            <GlassCard variants={fadeUp}>
              <div className="icon-wrapper"><Target size={32} /></div>
              <h3>Our Mission</h3>
              <p>Our mission is to help people feel confident about their financial future and security. We strive to provide transparent, accessible, and innovative solutions tailored to every individual.</p>
            </GlassCard>
            <GlassCard variants={fadeUp}>
              <div className="icon-wrapper"><Globe2 size={32} /></div>
              <h3>Our Vision</h3>
              <p>To be the most respected and referred Banking solutions company. We visualize a future where every financial decision is empowered by clarity and robust support.</p>
            </GlassCard>
          </MissionVisionGrid>
        </motion.div>

        {/* Core Values */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <SectionHeader title="Our Core Values" accentWord="Values" label="Principles" align="center" />
          <ValuesGrid>
            {[
              { icon: ShieldCheck, title: "Integrity", desc: "We act with honesty and uphold strong moral principles in every decision." },
              { icon: Award, title: "Quality", desc: "We deliver excellence through unmatched attention to detail and standards." },
              { icon: Users, title: "Teamwork", desc: "We achieve more together by fostering collaboration and mutual respect." },
              { icon: Zap, title: "Speed", desc: "We work with agility to provide swift and effective solutions." }
            ].map((v, i) => (
              <ValueCard key={i} variants={fadeUp}>
                <div className="icon"><v.icon size={28} /></div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </ValueCard>
            ))}
          </ValuesGrid>
        </motion.div>

        {/* Journey Timeline */}
        <TimelineSection>
          <SectionHeader title="Our Journey" accentWord="Journey" label="History" align="center" />
          <TimelineContainer>
            {[
              { year: "2005", desc: "Founded with a vision to revolutionize banking.", img: "/images/WhatsApp Image 2025-01-07 at 10.43.37 PM.jpeg" },
              { year: "2009", desc: "Expanded to multibanking and multistate operations; achieved ₹100M turnover.", img: "/images/WhatsApp Image 2025-01-07 at 10.48.27 PM.jpeg" },
              { year: "2015", desc: "Crossed ₹250M turnover, cementing industry leadership.", img: "/images/WhatsApp Image 2025-01-07 at 10.50.35 PM (1).jpeg" },
              { year: "2023", desc: "Surpassed ₹500M turnover with over 100 branches nationwide.", img: "/images/WhatsApp Image 2025-01-07 at 10.50.35 PM.jpeg" }
            ].map((item, i) => (
              <TimelineItemWrapper key={i} $isEven={i % 2 === 0} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
                <TimelineContent $isEven={i % 2 === 0}>
                  <div className="year">{item.year}</div>
                  <p>{item.desc}</p>
                  <img src={item.img} alt={item.year} loading="lazy" />
                </TimelineContent>
              </TimelineItemWrapper>
            ))}
          </TimelineContainer>
        </TimelineSection>

        {/* Why Choose Us */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} style={{ marginBottom: '100px' }}>
          <SectionHeader title="Why Choose EBS Financial" accentWord="Choose" label="Benefits" align="center" />
          <ValuesGrid style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {[
              { title: "19+ Years Experience", desc: "Trusted by millions of customers with their financial needs for over two decades." },
              { title: "Customer-Centric", desc: "Tailored financial solutions designed around your unique needs and goals." },
              { title: "Digital Innovation", desc: "Cutting-edge technology for seamless and secure financial services." }
            ].map((feat, i) => (
              <ValueCard key={i} variants={fadeUp}>
                <div className="icon" style={{ background: '#eff6ff', color: '#2563eb' }}><CheckCircle2 size={28} /></div>
                <h4>{feat.title}</h4>
                <p>{feat.desc}</p>
              </ValueCard>
            ))}
          </ValuesGrid>
        </motion.div>

        {/* Founder Section */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
          <FounderSection>
            <FounderImage>
              <img src="/images/sivakumr.jpeg" alt="A A Sivakumar - Managing Director" />
              <div className="overlay">
                <h3>A A Sivakumar</h3>
                <span>Managing Director</span>
              </div>
            </FounderImage>
            <FounderInfo>
              <div className="quote">"Transforming India's Retail Banking landscape through innovation and excellence"</div>
              <div className="bio">
                <p>A. A. Sivakumar, a distinguished postgraduate in Business Management from Madras University, brings over three decades of rich expertise in the retail banking and insurance sectors. Throughout his illustrious career, he has held pivotal roles in renowned institutions such as Bank of America, ANZ Grindlays Bank, Standard Chartered Bank, and Aviva Life Insurance Company.</p>
                <p>As a visionary leader, Sivakumar has played an instrumental role in revolutionizing the retail banking channel partner business in India. He has fostered a culture that prioritizes integrity, customer-centricity, and operational excellence, driving significant business growth.</p>
              </div>
              <StatsBadges>
                <div className="badge"><strong>30+</strong><span>Years Experience</span></div>
                <div className="badge"><strong>100+</strong><span>Branches</span></div>
                <div className="badge"><strong>₹500M+</strong><span>Turnover</span></div>
              </StatsBadges>
            </FounderInfo>
          </FounderSection>
        </motion.div>

        {/* Leadership Team */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} style={{ marginTop: '100px' }}>
          <SectionHeader title="Leadership Team" accentWord="Leadership" label="Executives" align="center" />
          <LeadershipGrid>
            <LeaderCard variants={fadeUp}>
              <div className="image-wrapper">
                <img src="/images/sunil.jpeg" alt="Sunil - Senior Banking Professional" />
              </div>
              <div className="info">
                <h3>Sunil</h3>
                <h4>Senior Banking Professional</h4>
                <p>A seasoned banking professional with extensive experience at prestigious institutions including Bank of America, ABN AMRO, ANZ Grindlays, and Standard Chartered Bank. Expert in liability sales, wealth management, life insurance, and health insurance. Former Sales Manager at Max NewYork Life Insurance.</p>
              </div>
            </LeaderCard>
            <LeaderCard variants={fadeUp}>
              <div className="image-wrapper">
                <img src="/images/senthil.jpeg" alt="S. Senthil Kumar - Head of Sales Operations" />
              </div>
              <div className="info">
                <h3>S. Senthil Kumar</h3>
                <h4>Head of Sales Operations</h4>
                <p>With over 32 years of industry experience, Senthil Kumar is a distinguished leader in sales and business development. Currently serving at Fullerton India Credit Company Ltd, he has consistently achieved sales excellence and built high-performing teams. His expertise spans personal loans, retail assets, and channel partner management.</p>
              </div>
            </LeaderCard>
          </LeadershipGrid>
        </motion.div>

        {/* Branch Network */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} style={{ marginBottom: '100px' }}>
          <BranchNetwork />
        </motion.div>

      </MainContainer>

      <Footer />
    </PageWrapper>
  );
};

export default AboutUs;
