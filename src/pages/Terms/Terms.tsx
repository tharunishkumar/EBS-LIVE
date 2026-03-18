import React from 'react';
import styled from 'styled-components';
import Footer from '../../components/Footer/Footer';

/* ─── Page Shell ──────────────────────────────────────────────── */
const PageWrapper = styled.div`
  background: #ffffff;
  min-height: 100vh;
`;

/* ─── Header Banner ───────────────────────────────────────────── */
const Banner = styled.div`
  background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f4c75 100%);
  padding: 80px 24px 60px;
  text-align: center;
`;

const BannerEyebrow = styled.p`
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #6ee7b7;
  margin: 0 0 14px;
`;

const BannerTitle = styled.h1`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 16px;
  letter-spacing: -0.02em;
`;

const BannerMeta = styled.p`
  font-size: 0.9rem;
  color: #94a3b8;
  margin: 0;
`;

/* ─── Document ────────────────────────────────────────────────── */
const Document = styled.div`
  max-width: 820px;
  margin: 0 auto;
  padding: 60px 24px 80px;

  @media (max-width: 640px) {
    padding: 40px 20px 60px;
  }
`;

const Intro = styled.p`
  font-size: 1.05rem;
  color: #475569;
  line-height: 1.8;
  padding-bottom: 40px;
  border-bottom: 1px solid #e2e8f0;
  margin: 0 0 48px;
`;

/* ─── Section ─────────────────────────────────────────────────── */
const Section = styled.section`
  margin-bottom: 48px;
  padding-bottom: 48px;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const SectionHeading = styled.h2`
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 16px;
  display: flex;
  align-items: center;
  gap: 10px;

  span.num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background: #064e3b;
    color: #ffffff;
    border-radius: 7px;
    font-size: 0.75rem;
    font-weight: 700;
    flex-shrink: 0;
  }
`;

const Paragraph = styled.p`
  font-size: 0.97rem;
  color: #475569;
  line-height: 1.8;
  margin: 0 0 12px;

  &:last-child { margin-bottom: 0; }

  strong { color: #1e293b; }
`;

const List = styled.ul`
  margin: 12px 0 0;
  padding-left: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ListItem = styled.li`
  font-size: 0.95rem;
  color: #475569;
  line-height: 1.7;
  padding-left: 20px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 10px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #10b981;
    flex-shrink: 0;
  }

  strong { color: #1e293b; }
`;

const Callout = styled.div`
  background: #f0fdf4;
  border-left: 3px solid #10b981;
  border-radius: 0 8px 8px 0;
  padding: 14px 18px;
  margin-top: 16px;
  font-size: 0.92rem;
  color: #065f46;
  line-height: 1.65;
`;

const WarningCallout = styled(Callout)`
  background: #fffbeb;
  border-left-color: #f59e0b;
  color: #92400e;
`;

const ContactLine = styled.p`
  font-size: 0.95rem;
  color: #059669;
  font-weight: 600;
  margin: 10px 0 0;
`;

/* ─── Component ───────────────────────────────────────────────── */
const Terms: React.FC = () => (
  <PageWrapper>
    <Banner>
      <BannerEyebrow>Legal</BannerEyebrow>
      <BannerTitle>Terms &amp; Conditions</BannerTitle>
      <BannerMeta>Effective Date: March 18, 2025 &nbsp;·&nbsp; Everyday Banking Solutions (EBS Financial)</BannerMeta>
    </Banner>

    <Document>
      <Intro>
        Welcome to <strong>Everyday Banking Solutions (EBS Financial)</strong>. By accessing or
        using our website, you agree to be bound by the following terms and conditions. Please read
        them carefully before proceeding.
      </Intro>

      {/* 1 */}
      <Section>
        <SectionHeading><span className="num">1</span>Services</SectionHeading>
        <Paragraph>EBS Financial provides assistance in applying for:</Paragraph>
        <List>
          <ListItem>Credit Cards</ListItem>
          <ListItem>Personal &amp; Business Loans</ListItem>
          <ListItem>Insurance Products</ListItem>
        </List>
        <Callout>
          We act solely as a <strong>Direct Selling Agent (DSA)</strong> and not as a lender or insurer.
        </Callout>
      </Section>

      {/* 2 */}
      <Section>
        <SectionHeading><span className="num">2</span>Eligibility</SectionHeading>
        <Paragraph>By using our services, you confirm that:</Paragraph>
        <List>
          <ListItem>You are at least 18 years old</ListItem>
          <ListItem>All information provided is accurate and complete</ListItem>
        </List>
      </Section>

      {/* 3 */}
      <Section>
        <SectionHeading><span className="num">3</span>No Guarantee of Approval</SectionHeading>
        <Paragraph>
          Submission of an application through our platform does <strong>not</strong> guarantee approval.
          Final approval depends on:
        </Paragraph>
        <List>
          <ListItem>Bank / NBFC / Insurance company policies</ListItem>
          <ListItem>Creditworthiness and documentation</ListItem>
        </List>
        <WarningCallout>
          EBS Financial does not control approval decisions made by partner institutions.
        </WarningCallout>
      </Section>

      {/* 4 */}
      <Section>
        <SectionHeading><span className="num">4</span>User Responsibilities</SectionHeading>
        <Paragraph>You agree to:</Paragraph>
        <List>
          <ListItem>Not provide false or misleading information</ListItem>
          <ListItem>Not misuse the website or its services</ListItem>
          <ListItem>Comply with all applicable laws and regulations</ListItem>
        </List>
      </Section>

      {/* 5 */}
      <Section>
        <SectionHeading><span className="num">5</span>Intellectual Property</SectionHeading>
        <Paragraph>
          All content on this website — including text, logos, and design — is owned by{' '}
          <strong>EBS Financial</strong> and may not be reused or reproduced without prior written
          permission.
        </Paragraph>
      </Section>

      {/* 6 */}
      <Section>
        <SectionHeading><span className="num">6</span>Limitation of Liability</SectionHeading>
        <Paragraph>EBS Financial is not responsible for:</Paragraph>
        <List>
          <ListItem>Rejection of applications by financial institutions</ListItem>
          <ListItem>Delays caused by partner institutions</ListItem>
          <ListItem>Any financial loss arising from third-party services</ListItem>
        </List>
      </Section>

      {/* 7 */}
      <Section>
        <SectionHeading><span className="num">7</span>Third-Party Services</SectionHeading>
        <Paragraph>
          We connect users with financial institutions. Their respective terms, conditions, and
          policies apply separately and independently.
        </Paragraph>
      </Section>

      {/* 8 */}
      <Section>
        <SectionHeading><span className="num">8</span>Privacy</SectionHeading>
        <Paragraph>
          Your use of our website is also governed by our <strong>Privacy Policy</strong>. Please
          review it to understand our data collection and usage practices.
        </Paragraph>
      </Section>

      {/* 9 */}
      <Section>
        <SectionHeading><span className="num">9</span>Termination</SectionHeading>
        <Paragraph>
          We reserve the right to suspend or terminate access to our website if misuse is detected
          or these terms are violated.
        </Paragraph>
      </Section>

      {/* 10 */}
      <Section>
        <SectionHeading><span className="num">10</span>Governing Law</SectionHeading>
        <Paragraph>
          These terms are governed by the <strong>laws of India</strong>. Any disputes arising from
          the use of this website will be subject to the exclusive jurisdiction of courts in{' '}
          <strong>Chennai, Tamil Nadu</strong>.
        </Paragraph>
      </Section>

      {/* 11 */}
      <Section>
        <SectionHeading><span className="num">11</span>Contact</SectionHeading>
        <Paragraph>For any queries or concerns, please reach out to us:</Paragraph>
        <Paragraph><strong>Everyday Banking Solutions (EBS Financial)</strong></Paragraph>
        <List>
          <ListItem>Email: info@ebsgroup.co.in</ListItem>
          <ListItem>Phone: +91 98410 02005</ListItem>
        </List>
        <ContactLine>We're happy to assist you.</ContactLine>
      </Section>
    </Document>

    <Footer />
  </PageWrapper>
);

export default Terms;
