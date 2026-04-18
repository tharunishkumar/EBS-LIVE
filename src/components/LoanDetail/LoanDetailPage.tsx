import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircleFilled, ArrowLeftOutlined } from '@ant-design/icons';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Footer from '../Footer/Footer';
import ApplicationForm from '../ui/ApplicationForm';

/* ─── Types ─── */

export interface LoanDetailConfig {
  /** Page accent colour (CSS colour string) */
  accentColor: string;
  accentGradient: string;
  /** Hero */
  heroTag: string;
  heroTitle: string;
  heroSubtitle: string;
  heroStats: { value: string; label: string }[];
  /** Rate banner */
  rateValue: string;
  rateLabel: string;
  /** Why choose section */
  whyTitle: string;
  features: { icon: React.ComponentType<any>; title: string; body: string }[];
  /** Key features strip */
  keyFeatures: string[];
  /** Process steps */
  processSteps: { title: string; desc: string }[];
  /** FAQ */
  faqs: { q: string; a: string }[];
  /** Form config */
  formConfig: {
    formTitle: string;
    productType: string;
    leftPanel: { heading: string; subtext: string; benefits: string[] };
  };
}

/* ─── Animations ─── */

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

/* ─── Shared Styled ─── */

const Page = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  font-family: 'Inter', sans-serif;
`;

/* ─── Hero ─── */

const Hero = styled.section<{ $gradient: string }>`
  background: ${p => p.$gradient};
  padding: 100px 5% 80px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -30%; right: -10%;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -25%; left: -8%;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }
`;

const HeroInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(255,255,255,0.75);
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  margin-bottom: 28px;
  transition: color 0.2s;
  &:hover { color: #fff; }
`;

const HeroTag = styled.div<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 100px;
  padding: 6px 16px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 24px;
  margin-left : 10px;

  &::before {
    content: '';
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #86efac;
    flex-shrink: 0;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-family: 'Poppins', sans-serif;
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.15;
  margin-bottom: 20px;
`;

const HeroSub = styled(motion.p)`
  font-size: 1.05rem;
  color: rgba(255,255,255,0.85);
  line-height: 1.7;
  max-width: 600px;
  margin-bottom: 0;
`;

const HeroStats = styled(motion.div)`
  display: flex;
  gap: 40px;
  margin-top: 48px;
  flex-wrap: wrap;
`;

const StatItem = styled.div`
  .value {
    font-family: 'Poppins', sans-serif;
    font-size: 1.9rem;
    font-weight: 800;
    color: #fff;
    line-height: 1;
    margin-bottom: 6px;
  }
  .label {
    font-size: 0.8rem;
    color: rgba(255,255,255,0.7);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
  }
`;

/* ─── Rate Banner ─── */

const RateBanner = styled.div<{ $gradient: string }>`
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  padding: 28px 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const RateDisplay = styled.div<{ $gradient: string }>`
  display: flex;
  align-items: center;
  gap: 14px;

  .label { font-size: 0.95rem; color: #64748b; font-weight: 500; }
  .rate {
    font-family: 'Poppins', sans-serif;
    font-size: 2.2rem;
    font-weight: 800;
    background: ${p => p.$gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .pa { font-size: 0.9rem; color: #94a3b8; align-self: flex-end; padding-bottom: 6px; }
`;

const ApplyNowBtn = styled.button<{ $gradient: string }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 48px;
  padding: 0 28px;
  background: ${p => p.$gradient};
  color: #fff;
  border: none;
  font-family: inherit;
  cursor: pointer;
  border-radius: 14px;
  font-size: 0.925rem;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    color: #fff;
  }
`;

/* ─── Section Shell ─── */

const Section = styled.section`
  padding: 72px 5%;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionLabel = styled.div<{ $color: string }>`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${p => p.$color};
  margin-bottom: 10px;
`;

const SectionTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 12px;
  line-height: 1.2;
`;

const SectionSub = styled.p`
  font-size: 1rem;
  color: #64748b;
  line-height: 1.65;
  max-width: 600px;
  margin-bottom: 48px;
`;

/* ─── Features Grid ─── */

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

const FeatureCard = styled(motion.div) <{ $color: string }>`
  background: #fff;
  border-radius: 20px;
  padding: 32px 28px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 2px 16px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3px;
    background: ${p => p.$color};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 36px rgba(0,0,0,0.10);
    border-color: rgba(0,0,0,0.08);
    &::after { opacity: 1; }
  }

  .feat-icon {
    font-size: 2rem;
    margin-bottom: 18px;
    display: block;
  }

  h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 1.05rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 10px;
  }

  p {
    font-size: 0.875rem;
    color: #64748b;
    line-height: 1.65;
    margin: 0;
  }
`;

/* ─── Key Features Strip ─── */

const KeyFeaturesSection = styled.section<{ $gradient: string }>`
  background: ${p => p.$gradient};
  padding: 60px 5%;
`;

const KeyFeaturesInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const KeyFeatureTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 32px;
  text-align: center;
`;

const FeaturesStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

const FeatureChip = styled.div`
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 14px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;

  .chip-icon {
    width: 32px; height: 32px;
    background: rgba(255,255,255,0.18);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 15px;
    color: #fff;
  }
`;

/* ─── Process ─── */

const ProcessSection = styled.section`
  padding: 72px 5%;
  background: #fff;
`;

const ProcessInner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const ProcessSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0;
  position: relative;
  margin-top: 48px;

  &::before {
    content: '';
    position: absolute;
    top: 28px; left: 10%; right: 10%;
    height: 2px;
    background: #e2e8f0;
    z-index: 0;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    &::before { display: none; }
    gap: 24px;
  }
`;

const ProcessStep = styled(motion.div) <{ $color: string; $index: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 1;
  padding: 0 8px;

  .step-number {
    width: 56px; height: 56px;
    border-radius: 50%;
    background: ${p => p.$index === 0 ? p.$color : '#fff'};
    border: 2px solid ${p => p.$color};
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins', sans-serif;
    font-size: 1.1rem;
    font-weight: 800;
    color: ${p => p.$index === 0 ? '#fff' : p.$color};
    margin-bottom: 16px;
    transition: all 0.3s ease;
    box-shadow: ${p => p.$index === 0 ? `0 4px 16px ${p.$color}50` : 'none'};
  }

  &:hover .step-number {
    background: ${p => p.$color};
    color: #ffffffff;
    box-shadow: 0 4px 16px ${p => p.$color}50;
  }

  h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 0.875rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 6px;
  }

  p {
    font-size: 0.8rem;
    color: #64748b;
    line-height: 1.5;
    margin: 0;
  }
`;

/* ─── FAQ ─── */

const FAQSection = styled.section`
  padding: 72px 5%;
  background: #f8fafc;
`;

const FAQList = styled.div`
  max-width: 800px;
  margin: 48px auto 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FAQItem = styled.div<{ $open: boolean; $color: string }>`
  background: #fff;
  border-radius: 16px;
  border: 1.5px solid ${p => p.$open ? p.$color + '40' : '#f1f5f9'};
  overflow: hidden;
  transition: all 0.25s ease;
  box-shadow: ${p => p.$open ? `0 4px 20px ${p.$color}15` : '0 2px 8px rgba(0,0,0,0.04)'};
`;

const FAQQuestion = styled.button<{ $open: boolean; $color: string }>`
  width: 100%;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;

  span {
    font-family: 'Poppins', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    color: ${p => p.$open ? p.$color : '#0f172a'};
    flex: 1;
    transition: color 0.2s;
  }

  svg {
    flex-shrink: 0;
    color: ${p => p.$open ? p.$color : '#94a3b8'};
    transform: ${p => p.$open ? 'rotate(180deg)' : 'rotate(0deg)'};
    transition: transform 0.3s ease, color 0.2s;
  }
`;

const FAQAnswer = styled(motion.div)`
  padding: 0 24px 20px;
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.75;
`;

/* ─── CTA ─── */

const CTASec = styled.section<{ $gradient: string }>`
  background: ${p => p.$gradient};
  padding: 64px 5%;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%; left: -20%;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }
`;

const CTATitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 800;
  color: #fff;
  margin-bottom: 12px;
`;

const CTASub = styled.p`
  color: rgba(255,255,255,0.8);
  font-size: 1rem;
  margin-bottom: 32px;
`;

const CTABtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 56px;
  padding: 0 36px;
  background: #fff;
  color : #000;
  cursor: pointer;
  border: none;
  border-radius: 16px;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.25s ease;
  position: relative;
  z-index: 1;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.2);
  }
`;

/* ─── FAQ Component ─── */

const FAQAccordion: React.FC<{ faqs: { q: string; a: string }[]; color: string }> = ({ faqs, color }) => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <FAQList>
      {faqs.map((faq, i) => (
        <FAQItem key={i} $open={open === i} $color={color}>
          <FAQQuestion $open={open === i} $color={color} onClick={() => setOpen(open === i ? null : i)}>
            <span>{faq.q}</span>
            <ChevronDown size={18} />
          </FAQQuestion>
          <AnimatePresence>
            {open === i && (
              <FAQAnswer
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {faq.a}
              </FAQAnswer>
            )}
          </AnimatePresence>
        </FAQItem>
      ))}
    </FAQList>
  );
};

/* ─── Main Component ─── */

const LoanDetailPage: React.FC<LoanDetailConfig> = (config) => {
  const {
    accentColor, accentGradient,
    heroTag, heroTitle, heroSubtitle, heroStats,
    rateValue, rateLabel,
    whyTitle, features,
    keyFeatures, processSteps, faqs, formConfig,
  } = config;

  const scrollToForm = () => {
    const el = document.getElementById("application-form");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Page>
      {/* Hero */}
      <Hero $gradient={accentGradient}>
        <HeroInner>
          <BackLink to="/loans"><ArrowLeftOutlined /> Back to Loans</BackLink>
          <HeroTag $color={accentColor}>{heroTag}</HeroTag>
          <HeroTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >{heroTitle}</HeroTitle>
          <HeroSub
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >{heroSubtitle}</HeroSub>
          <HeroStats
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            {heroStats.map((s, i) => (
              <StatItem key={i}>
                <div className="value">{s.value}</div>
                <div className="label">{s.label}</div>
              </StatItem>
            ))}
          </HeroStats>
        </HeroInner>
      </Hero>

      {/* Rate Banner */}
      <RateBanner $gradient={accentGradient}>
        <RateDisplay $gradient={accentGradient}>
          <span className="label">{rateLabel}</span>
          <span className="rate">{rateValue}</span>
          <span className="pa">p.a.*</span>
        </RateDisplay>
        <ApplyNowBtn onClick={scrollToForm} $gradient={accentGradient}>
          Apply Now
          <ArrowRight size={20} />
        </ApplyNowBtn>
      </RateBanner>

      {/* Why Choose Section */}
      <Section>
        <SectionLabel $color={accentColor}>FEATURES</SectionLabel>
        <SectionTitle>{whyTitle}</SectionTitle>
        <SectionSub>Discover what makes our loan offering stand out from the rest.</SectionSub>
        <FeaturesGrid>
          {features.map((f, i) => (
            <FeatureCard
              key={i}
              $color={accentColor}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
            >
              <span className="feat-icon"><f.icon /></span>
              <h4>{f.title}</h4>
              <p>{f.body}</p>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Section>

      {/* Key Features Strip */}
      <KeyFeaturesSection $gradient={accentGradient}>
        <KeyFeaturesInner>
          <KeyFeatureTitle>Everything you need in one loan</KeyFeatureTitle>
          <FeaturesStrip>
            {keyFeatures.map((f, i) => (
              <FeatureChip key={i}>
                <span className="chip-icon"><CheckCircleFilled /></span>
                {f}
              </FeatureChip>
            ))}
          </FeaturesStrip>
        </KeyFeaturesInner>
      </KeyFeaturesSection>

      {/* Process */}
      <ProcessSection>
        <ProcessInner>
          <div style={{ textAlign: 'center' }}>
            <SectionLabel $color={accentColor}>HOW IT WORKS</SectionLabel>
            <SectionTitle>Simple 5-Step Process</SectionTitle>
            <SectionSub style={{ margin: '0 auto' }}>From application to disbursement — we make it fast and transparent.</SectionSub>
          </div>
          <ProcessSteps>
            {processSteps.map((step, i) => (
              <ProcessStep
                key={i}
                $color={accentColor}
                $index={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <div className="step-number">{i + 1}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </ProcessStep>
            ))}
          </ProcessSteps>
        </ProcessInner>
      </ProcessSection>

      {/* FAQ */}
      <FAQSection>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center' }}>
            <SectionLabel $color={accentColor}>FAQ</SectionLabel>
            <SectionTitle>Common Questions</SectionTitle>
          </div>
          <FAQAccordion faqs={faqs} color={accentColor} />
        </div>
      </FAQSection>

      {/* Application Form */}
      <div id="application-form">
        <ApplicationForm
          formTitle={formConfig.formTitle}
          formSubtitle="Fill in your details and our specialists will contact you within 24 hours."
          productType={formConfig.productType}
          recipientEmail="info@ebsgroup.co.in"
          accentGradient={accentGradient}
          leftPanel={formConfig.leftPanel}
        />
      </div>

      {/* CTA */}
      <CTASec $gradient={accentGradient}>
        <CTATitle>Ready to take the next step?</CTATitle>
        <CTASub>Our loan specialists are available Mon–Sat, 9 AM – 6 PM</CTASub>
        <CTABtn href="#application-form">Get Started Today</CTABtn>
      </CTASec>

      <Footer />
    </Page>
  );
};

export default LoanDetailPage;
