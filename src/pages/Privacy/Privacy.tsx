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
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
  padding: 80px 24px 60px;
  text-align: center;
`;

const BannerEyebrow = styled.p`
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #93c5fd;
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
    background: #1e3a8a;
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
    background: #3b82f6;
    flex-shrink: 0;
  }

  strong { color: #1e293b; }
`;

const Callout = styled.div`
  background: #f0f7ff;
  border-left: 3px solid #3b82f6;
  border-radius: 0 8px 8px 0;
  padding: 14px 18px;
  margin-top: 16px;
  font-size: 0.92rem;
  color: #1e40af;
  line-height: 1.65;
`;

const ContactLine = styled.p`
  font-size: 0.95rem;
  color: #2563eb;
  font-weight: 600;
  margin: 10px 0 0;
`;

/* ─── Component ───────────────────────────────────────────────── */
const Privacy: React.FC = () => (
    <PageWrapper>
        <Banner>
            <BannerEyebrow>Legal</BannerEyebrow>
            <BannerTitle>Privacy Policy</BannerTitle>
            <BannerMeta>Effective Date: March 18, 2025 &nbsp;·&nbsp; Everyday Banking Solutions (EBS Financial)</BannerMeta>
        </Banner>

        <Document>
            <Intro>
                Everyday Banking Solutions ("EBS Financial", "we", "our", or "us") operates the website{' '}
                <strong>www.everydaybankingsolutions.com</strong> and is committed to protecting your privacy.
                This policy outlines how we collect, use, and safeguard your information.
            </Intro>

            {/* 1 */}
            <Section>
                <SectionHeading><span className="num">1</span>Information We Collect</SectionHeading>
                <Paragraph>We may collect the following types of information:</Paragraph>
                <List>
                    <ListItem><strong>Personal Information:</strong> Name, phone number, email address, address, PAN, Aadhaar (if required), income details</ListItem>
                    <ListItem><strong>Financial Information:</strong> Loan preferences, credit score details (with consent)</ListItem>
                    <ListItem><strong>Technical Data:</strong> IP address, browser type, device info, cookies</ListItem>
                    <ListItem><strong>Usage Data:</strong> Pages visited, time spent, interactions on our website</ListItem>
                </List>
            </Section>

            {/* 2 */}
            <Section>
                <SectionHeading><span className="num">2</span>How We Use Your Information</SectionHeading>
                <Paragraph>We use your information to:</Paragraph>
                <List>
                    <ListItem>Process applications for credit cards, loans, and insurance</ListItem>
                    <ListItem>Connect you with partner banks, NBFCs, and insurance providers</ListItem>
                    <ListItem>Provide customer support</ListItem>
                    <ListItem>Improve our services and website</ListItem>
                    <ListItem>Send updates, offers, or notifications (only with consent)</ListItem>
                </List>
            </Section>

            {/* 3 */}
            <Section>
                <SectionHeading><span className="num">3</span>Role as Direct Selling Agent (DSA)</SectionHeading>
                <Paragraph>EBS Financial acts as a <strong>Direct Selling Agent</strong> for banks, NBFCs, and insurance companies.</Paragraph>
                <Callout>
                    We do not directly provide financial products. All approvals, terms, and disbursals are handled by the respective financial institutions.
                </Callout>
            </Section>

            {/* 4 */}
            <Section>
                <SectionHeading><span className="num">4</span>Data Sharing</SectionHeading>
                <Paragraph>We may share your information with:</Paragraph>
                <List>
                    <ListItem>Partner banks and NBFCs</ListItem>
                    <ListItem>Insurance companies</ListItem>
                    <ListItem>Verification agencies</ListItem>
                    <ListItem>Regulatory authorities (if required by law)</ListItem>
                </List>
                <Callout>We do <strong>not</strong> sell your personal data to third parties.</Callout>
            </Section>

            {/* 5 */}
            <Section>
                <SectionHeading><span className="num">5</span>Data Security</SectionHeading>
                <Paragraph>
                    We implement appropriate technical and organizational measures to protect your data from
                    unauthorized access, misuse, or disclosure.
                </Paragraph>
            </Section>

            {/* 6 */}
            <Section>
                <SectionHeading><span className="num">6</span>Cookies</SectionHeading>
                <Paragraph>
                    Our website uses cookies to enhance user experience and analyze traffic. You can control
                    cookies through your browser settings.
                </Paragraph>
            </Section>

            {/* 7 */}
            <Section>
                <SectionHeading><span className="num">7</span>Your Rights</SectionHeading>
                <Paragraph>You have the right to:</Paragraph>
                <List>
                    <ListItem>Access your data</ListItem>
                    <ListItem>Request correction or deletion</ListItem>
                    <ListItem>Withdraw consent at any time</ListItem>
                </List>
                <Paragraph style={{ marginTop: '16px' }}>To exercise your rights, contact us at:</Paragraph>
                <ContactLine>info@ebsgroup.co.in</ContactLine>
            </Section>

            {/* 8 */}
            <Section>
                <SectionHeading><span className="num">8</span>Third-Party Links</SectionHeading>
                <Paragraph>
                    Our website may contain links to third-party websites. We are not responsible for
                    their privacy practices.
                </Paragraph>
            </Section>

            {/* 9 */}
            <Section>
                <SectionHeading><span className="num">9</span>Updates to This Policy</SectionHeading>
                <Paragraph>
                    We may update this Privacy Policy from time to time. Changes will be posted on this page
                    with a revised effective date.
                </Paragraph>
            </Section>

            {/* 10 */}
            <Section>
                <SectionHeading><span className="num">10</span>Contact Us</SectionHeading>
                <Paragraph><strong>Everyday Banking Solutions (EBS Financial)</strong></Paragraph>
                <List>
                    <ListItem>Email: info@ebsgroup.co.in</ListItem>
                    <ListItem>Phone: +91 98410 02005</ListItem>
                    <ListItem>Address: No. B1 2nd floor, 3rd Cross Street, Minor Trustpuram, Choolaimedu, Chennai-600094</ListItem>
                </List>
            </Section>
        </Document>

        <Footer />
    </PageWrapper>
);

export default Privacy;
