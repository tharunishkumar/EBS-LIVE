import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ebsLogo from '../Navbar/EBS logo.png';
import { colors } from '../../styles/theme';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const FooterContainer = styled.footer`
  background: ${colors.background.footer};
  color: ${colors.text.grayMid};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${colors.accent.blueBorderLight}, transparent);
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(16px, 4vw, 40px);
`;

const FooterTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: clamp(40px, 5vw, 60px) 0 clamp(32px, 4vw, 48px);
  gap: 32px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }
`;

const LogoArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: ${fadeInUp} 0.6s ease forwards;
`;

const LogoRow = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.85;
  }

  img {
    height: 36px;
    width: auto;
    object-fit: contain;
  }
`;

const LogoText = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${colors.text.heading};
  letter-spacing: -0.3px;
  white-space: nowrap;
`;

const Tagline = styled.p`
  font-size: 0.88rem;
  color: ${colors.text.mutedLight};
  line-height: 1.6;
  max-width: 320px;
  margin: 0;
`;

const CTAArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: 0.1s;
  opacity: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background: ${colors.accent.gradient};
  text-decoration: none;
  box-shadow: 0 4px 16px ${colors.shadow.ctaShadow};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px ${colors.accent.blueShadow};
    color: #fff;
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(3px);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.accent.blueMid};
  background: ${colors.accent.blueFaint};
  border: 1.5px solid ${colors.accent.blueBorderLight};
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;

  &:hover {
    background: ${colors.accent.blueHoverBg};
    border-color: ${colors.accent.blueBorderMid};
    transform: translateY(-2px);
    color: ${colors.accent.blueDark};
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;

const Separator = styled.div`
  height: 1px;
  background: linear-gradient(90deg, transparent, ${colors.border.separatorAlt}, transparent);
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(24px, 3vw, 40px);
  padding: clamp(32px, 4vw, 48px) 0;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
`;

const FooterSection = styled.div`
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: 0.2s;
  opacity: 0;

  h4 {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: ${colors.text.heading};
    margin-bottom: 16px;
    position: relative;

    &::after {
      content: '';
      display: block;
      width: 24px;
      height: 2px;
      background: ${colors.accent.gradient};
      border-radius: 2px;
      margin-top: 8px;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  li a {
    color: ${colors.text.muted};
    text-decoration: none;
    font-size: 0.88rem;
    font-weight: 450;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;

    &:hover {
      color: ${colors.accent.blueMid};
      transform: translateX(3px);
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.85rem;
  color: ${colors.text.muted};
  line-height: 1.6;

  svg {
    width: 16px;
    height: 16px;
    margin-top: 3px;
    flex-shrink: 0;
    color: ${colors.text.mutedLight};
  }

  a {
    color: ${colors.text.muted};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${colors.accent.blueMid};
    }
  }
`;

const SocialRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${colors.accent.blueFaint};
  border: 1px solid ${colors.border.accentBorder};
  color: ${colors.text.muted};
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${colors.accent.gradient};
    color: #fff;
    border-color: transparent;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${colors.shadow.socialHover};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const BottomBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-top: 1px solid ${colors.border.separatorAlt};
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 576px) {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
`;

const Copyright = styled.p`
  font-size: 0.8rem;
  color: ${colors.text.mutedLight};
  margin: 0;
`;

const BottomLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  a {
    font-size: 0.8rem;
    color: ${colors.text.mutedLight};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${colors.accent.blueMid};
    }
  }
`;

const Footer = (): React.ReactElement => {
  return (
    <FooterContainer>
      <FooterContent>
        {/* Top: Logo + CTA */}
        <FooterTop>
          <LogoArea>
            <LogoRow to="/">
              <img src={ebsLogo} alt="EBS - Everyday Banking Solutions" />
              <LogoText>Everyday Banking Solutions</LogoText>
            </LogoRow>
            <Tagline>
              Your trusted partner for loans, insurance, and credit card solutions across India.
            </Tagline>
          </LogoArea>

          <CTAArea>
            <CTAButton to="/apply">
              Get Started
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </CTAButton>
          </CTAArea>
        </FooterTop>

        <Separator />

        {/* Links Grid */}
        <FooterGrid>
          <FooterSection>
            <h4>Loans</h4>
            <ul>
              <li><Link to="/personal-loan">Personal Loan</Link></li>
              <li><Link to="/business-loan">Business Loan</Link></li>
              <li><Link to="/home-loan">Home Loan</Link></li>
              <li><Link to="/gold-loan">Gold Loan</Link></li>
              <li><Link to="/loan-against-property">Loan Against Property</Link></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h4>Insurance</h4>
            <ul>
              <li><Link to="/life-insurance">Life Insurance</Link></li>
              <li><Link to="/health-insurance">Health Insurance</Link></li>
              <li><Link to="/general-insurance">General Insurance</Link></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/credit-cards">Credit Cards</Link></li>
              <li><Link to="/apply">Apply Now</Link></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h4>Contact</h4>
            <ContactInfo>
              <ContactItem>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>
                  No. B1 2nd floor, 3rd Cross Street,<br />
                  Minor Trustpuram, Choolaimedu,<br />
                  Chennai-600094
                </span>
              </ContactItem>
              <ContactItem>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a href="tel:+919841002005">+91 9841002005</a>
              </ContactItem>
              <ContactItem>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <a href="mailto:info@ebsgroup.co.in">info@ebsgroup.co.in</a>
              </ContactItem>

              <SocialRow>
                <SocialIcon href="https://www.facebook.com/share/1BWRZ84uC3/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </SocialIcon>
                <SocialIcon href="https://www.instagram.com/ebs_finserv?igsh=MW55a3FzbGtwYjQ2dg==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </SocialIcon>
                <SocialIcon href="https://www.linkedin.com/company/ebs-finserv/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </SocialIcon>
              </SocialRow>
            </ContactInfo>
          </FooterSection>
        </FooterGrid>

        {/* Bottom Bar */}
        <BottomBar>
          <Copyright>
            © {new Date().getFullYear()} EBS Group. All rights reserved.
          </Copyright>
          <BottomLinks>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </BottomLinks>
        </BottomBar>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
