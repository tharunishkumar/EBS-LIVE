import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, CreditCard, Building2, Home, Shield, Landmark, Gem, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import ebsLogo from './EBS logo.png';
import { useUser } from '@/contexts/UserContext';

/* ================= ANIMATIONS ================= */

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-12px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const mobileSlideIn = keyframes`
  from { opacity: 0; transform: translateX(100%); }
  to { opacity: 1; transform: translateX(0); }
`;

const expandDown = keyframes`
  from { opacity: 0; max-height: 0; }
  to { opacity: 1; max-height: 600px; }
`;

/* ================= HEADER ================= */

const StyledHeader = styled.header<{ $scrolled: boolean }>`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: ${p => p.$scrolled
    ? 'rgba(255, 255, 255, 0.92)'
    : 'rgba(255, 255, 255, 0.6)'};
  backdrop-filter: blur(${p => p.$scrolled ? '24px' : '12px'});
  -webkit-backdrop-filter: blur(${p => p.$scrolled ? '24px' : '12px'});
  border-bottom: 1px solid ${p => p.$scrolled
    ? 'rgba(0, 119, 255, 0.08)'
    : 'rgba(255, 255, 255, 0.2)'};
  box-shadow: ${p => p.$scrolled
    ? '0 4px 32px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.03)'
    : 'none'};
`;

const NavbarContainer = styled.div`
  max-width: 1360px;
  margin: 0 auto;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(16px, 3vw, 40px);
  gap: 24px;
`;

/* ================= LOGO ================= */

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  flex-shrink: 0;

  img {
    height: 38px;
    width: auto;
    object-fit: contain;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const LogoText = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #0f172a;
  letter-spacing: -0.3px;
  white-space: nowrap;

  @media (max-width: 250px) {
    display: none;
  }
`;

/* ================= DESKTOP NAV ================= */

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 968px) {
    display: none;
  }
`;

const NavItem = styled.div`
  position: relative;
`;

const NavLinkStyled = styled(Link) <{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 16px;
  font-size: 14.5px;
  font-weight: 550;
  letter-spacing: -0.1px;
  color: ${p => p.$active ? '#0066ee' : '#334155'};
  text-decoration: none;
  border-radius: 10px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &:hover {
    color: #0066ee;
    background: rgba(0, 119, 255, 0.06);
  }

  ${p => p.$active && css`
    background: rgba(0, 119, 255, 0.08);

    &::after {
      content: '';
      position: absolute;
      bottom: 2px;
      left: 50%;
      transform: translateX(-50%);
      width: 20px;
      height: 2.5px;
      border-radius: 2px;
      background: linear-gradient(135deg, #0077ff, #0047ff);
    }
  `}

  svg {
    width: 14px;
    height: 14px;
    transition: transform 0.3s ease;
  }
`;

const NavButtonWrapper = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  border-radius: 10px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &:hover {
    background: rgba(0, 119, 255, 0.06);
  }

  ${p => p.$active && css`
    background: rgba(0, 119, 255, 0.08);
  `}
`;

const NavButtonLabel = styled(Link) <{ $active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 4px 8px 16px;
  font-size: 14.5px;
  font-weight: 550;
  letter-spacing: -0.1px;
  color: ${p => p.$active ? '#0066ee' : '#334155'};
  text-decoration: none;
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
  transition: color 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    color: #0066ee;
  }
`;

const ChevronToggle = styled.button<{ $open?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 10px 8px 4px;
  border: none;
  background: none;
  cursor: pointer;
  color: inherit;
  border-radius: 0 10px 10px 0;

  svg {
    width: 14px;
    height: 14px;
    will-change: transform;
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    transform: rotate(${p => p.$open ? '180deg' : '0deg'});
  }
`;

/* ================= DROPDOWN ================= */

const DropdownPortal = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 250px;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(0, 119, 255, 0.08);
  border-radius: 16px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 8px;
  opacity: ${p => p.$visible ? 1 : 0};
  visibility: ${p => p.$visible ? 'visible' : 'hidden'};
  transform: translateX(-50%) ${p => p.$visible ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.97)'};
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1001;
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 500;
  color: #475569;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 119, 255, 0.06);
    color: #0066ee;
    transform: translateX(4px);
  }

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    opacity: 0.6;
  }

  &:hover svg {
    opacity: 1;
  }
`;

const DropdownSubTitle = styled.div`
  padding: 10px 14px 6px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: #1e78f5ff;

  &:not(:first-child) {
    margin-top: 4px;
    border-top: 1px solid rgba(0, 0, 0, 0.04);
    padding-top: 12px;
  }
`;

const MegaDropdownPortal = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 520px;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(0, 119, 255, 0.08);
  border-radius: 16px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 12px;
  opacity: ${p => p.$visible ? 1 : 0};
  visibility: ${p => p.$visible ? 'visible' : 'hidden'};
  transform: translateX(-50%) ${p => p.$visible ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.97)'};
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1001;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
`;

/* ================= RIGHT ACTIONS ================= */

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  @media (max-width: 968px) {
    display: none;
  }
`;

const AboutUsBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #0077ff 0%, #0047ff 100%);
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(0, 119, 255, 0.25);
  letter-spacing: -0.1px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(0, 119, 255, 0.35);
    background: linear-gradient(135deg, #0066ee 0%, #003fd6 100%);
    color: #fff;
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 15px;
    height: 15px;
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(3px);
  }
`;

/* ================= MOBILE ================= */

const MobileMenuBtn = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.2s ease;
  color: #0f172a;
  flex-shrink: 0;

  &:hover {
    background: rgba(0, 119, 255, 0.06);
    border-color: rgba(0, 119, 255, 0.15);
  }

  @media (max-width: 968px) {
    display: flex;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const MobileOverlay = styled.div<{ $open: boolean }>`
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  z-index: 998;
  opacity: ${p => p.$open ? 1 : 0};
  visibility: ${p => p.$open ? 'visible' : 'hidden'};
  transition: all 0.3s ease;

  @media (max-width: 968px) {
    display: block;
  }
`;

const MobileDrawer = styled.div<{ $open: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  z-index: 9999;
  transform: translateX(${p => p.$open ? '0' : '100%'});
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  box-shadow: ${p => p.$open ? '-24px 0 80px rgba(0, 0, 0, 0.1)' : 'none'};

  @media (max-width: 968px) {
    display: flex;
    flex-direction: column;
  }
`;

const MobileDrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

const MobileCloseBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: rgba(0, 0, 0, 0.02);
  cursor: pointer;
  color: #475569;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 119, 255, 0.06);
    border-color: rgba(0, 119, 255, 0.15);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const MobileNavContent = styled.div`
  flex: 1;
  padding: 12px 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const MobileNavItem = styled(Link) <{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 550;
  color: ${p => p.$active ? '#0066ee' : '#334155'};
  background: ${p => p.$active ? 'rgba(0, 119, 255, 0.07)' : 'transparent'};
  text-decoration: none;
  transition: all 0.2s ease;
  margin-bottom: 6px;

  &:hover, &:active {
    background: rgba(0, 119, 255, 0.06);
    color: #0066ee;
  }

  svg {
    width: 20px;
    height: 20px;
    opacity: 0.5;
  }
`;

const MobileNavButtonWrapper = styled.div<{ $active?: boolean; $open?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 12px;
  background: ${p => p.$active || p.$open ? 'rgba(0, 119, 255, 0.07)' : 'rgba(0, 0, 0, 0.02)'};
  transition: all 0.2s ease;
  overflow: hidden;
  border: 1px solid ${p => p.$active || p.$open ? 'rgba(0, 119, 255, 0.12)' : 'rgba(0, 0, 0, 0.04)'};
  margin-bottom: 6px;
`;

const MobileNavButtonLabel = styled(Link) <{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  padding: 14px 8px 14px 16px;
  font-size: 15px;
  font-weight: 550;
  color: ${p => p.$active ? '#0066ee' : '#334155'};
  text-decoration: none;
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
  transition: color 0.2s ease;

  &:hover, &:active {
    color: #0066ee;
  }

  svg {
    width: 20px;
    height: 20px;
    opacity: 0.5;
  }
`;

const MobileChevronToggle = styled.button<{ $open?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 14px;
  margin: 6px 8px 6px 0;
  border: none;
  border-radius: 8px;
  background: ${p => p.$open ? 'rgba(0, 119, 255, 0.12)' : 'rgba(0, 0, 0, 0.04)'};
  cursor: pointer;
  color: ${p => p.$open ? '#0066ee' : '#64748b'};
  font-family: inherit;
  transition: all 0.2s ease;
  border-left: 1px solid rgba(0, 0, 0, 0.06);

  &:active {
    background: rgba(0, 119, 255, 0.15);
    color: #0066ee;
  }

  svg {
    width: 16px;
    height: 16px;
    will-change: transform;
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0.7;
    transform: rotate(${p => p.$open ? '180deg' : '0deg'});
  }
`;

const MobileSubItems = styled.div<{ $open: boolean }>`
  overflow: hidden;
  max-height: ${p => p.$open ? '800px' : '0'};
  opacity: ${p => p.$open ? 1 : 0};
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  padding-left: 20px;
`;

const MobileSubLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 16px;
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 500;
  color: #64748b;
  text-decoration: none;
  transition: all 0.2s ease;
  border-left: 2px solid transparent;

  &:hover, &:active {
    color: #0066ee;
    background: rgba(0, 119, 255, 0.04);
    border-left-color: #0077ff;
  }
`;

const MobileSubHeader = styled.div`
  padding: 10px 16px 4px;
  font-size: 10.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: #1e78f5ff;

  &:not(:first-child) {
    margin-top: 4px;
  }
`;

const MobileFooter = styled.div`
  padding: 16px 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`;

const MobileAboutBtn = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 48px;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #0077ff 0%, #0047ff 100%);
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(0, 119, 255, 0.25);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 24px rgba(0, 119, 255, 0.35);
    color: #fff;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(0, 0, 0, 0.04);
  margin: 6px 16px;
`;

/* ================= COMPONENT ================= */

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<string[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { loading } = useUser();
  let dropdownTimeout: ReturnType<typeof setTimeout>;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenSubMenus([]);
  };

  const toggleSubMenu = (key: string) => {
    setOpenSubMenus(prev =>
      prev.includes(key)
        ? prev.filter(item => item !== key)
        : [...prev, key]
    );
  };

  const openDropdown = (key: string) => {
    clearTimeout(dropdownTimeout);
    setActiveDropdown(key);
  };

  const closeDropdown = () => {
    dropdownTimeout = setTimeout(() => setActiveDropdown(null), 150);
  };

  /* ---------- DATA ---------- */

  const cardItems = [
    { key: 'axis-bank', label: 'Axis Bank Credit Cards', path: '/cards/axis-bank' },
    { key: 'hdfc-bank', label: 'HDFC Bank Credit Cards', path: '/cards/hdfc-bank' },
    { key: 'icici-bank', label: 'ICICI Bank Credit Cards', path: '/cards/icici-bank' },
    { key: 'idfc-bank', label: 'IDFC Bank Credit Cards', path: '/cards/idfc-bank' },
    { key: 'indusind-bank', label: 'IndusInd Bank Credit Cards', path: '/cards/indusind-bank' },
  ];

  const loansData = {
    personal: [
      { key: 'personal-banking', label: 'Banking Partners', path: '/personal-loan/banking-partners' },
      { key: 'personal-nbfc', label: 'NBFC Partners', path: '/personal-loan/nbfc-partners' },
      { key: 'personal-fintech', label: 'Fintech Partners', path: '/personal-loan/fintech-partners' },
    ],
    business: [
      { key: 'business-banking', label: 'Banking Partners', path: '/business-loan/banking-partners' },
      { key: 'business-nbfc', label: 'NBFC Partners', path: '/business-loan/nbfc-partners' },
      { key: 'business-fintech', label: 'Fintech Partners', path: '/business-loan/fintech-partners' },
    ],
    lap: [
      { key: 'lap-banking', label: 'Banking Partners', path: '/loan-against-property/banking-partners' },
      { key: 'lap-nbfc', label: 'NBFC Partners', path: '/loan-against-property/nbfc-partners' },
      { key: 'lap-fintech', label: 'Fintech Partners', path: '/loan-against-property/fintech-partners' },
    ],
    homeLoan: [
      { key: 'home-loan-banking', label: 'Banking Partners', path: '/home-loan/banking-partners' },
      { key: 'home-loan-nbfc', label: 'NBFC Partners', path: '/home-loan/nbfc-partners' },
    ],
    goldLoan: [
      { key: 'gold-loan-banking', label: 'Banking Partners', path: '/gold-loan/banking-partners' },
    ],
  };

  const insuranceItems = [
    { key: 'health', label: 'Health Insurance', path: '/health-insurance' },
    { key: 'life', label: 'Life Insurance', path: '/life-insurance' },
    { key: 'general', label: 'General Insurance', path: '/general-insurance' },
  ];

  return (
    <>
      <StyledHeader $scrolled={scrolled}>
        <NavbarContainer>
          {/* Logo */}
          <LogoLink to="/" onClick={handleHomeClick}>
            <img src={ebsLogo} alt="EBS Finance" />
            <LogoText>Everyday Banking Solutions</LogoText>
          </LogoLink>

          {/* Desktop Navigation */}
          <NavLinks>
            <NavLinkStyled to="/" onClick={handleHomeClick} $active={location.pathname === '/'}>
              Home
            </NavLinkStyled>

            {/* Cards Dropdown */}
            <NavItem
              onMouseEnter={() => openDropdown('cards')}
              onMouseLeave={closeDropdown}
            >
              <NavButtonWrapper $active={location.pathname.includes('cards')}>
                <NavButtonLabel to="/credit-cards" $active={location.pathname.includes('cards')} onClick={() => setActiveDropdown(null)}>
                  Cards
                </NavButtonLabel>
                <ChevronToggle $open={activeDropdown === 'cards'}>
                  <ChevronDown />
                </ChevronToggle>
              </NavButtonWrapper>
              <DropdownPortal $visible={activeDropdown === 'cards'}>
                {cardItems.map(item => (
                  <DropdownItem key={item.key} to={item.path} onClick={() => setActiveDropdown(null)}>
                    <CreditCard />
                    {item.label}
                  </DropdownItem>
                ))}
              </DropdownPortal>
            </NavItem>

            {/* Loans Mega Dropdown */}
            <NavItem
              onMouseEnter={() => openDropdown('loans')}
              onMouseLeave={closeDropdown}
            >
              <NavButtonWrapper $active={location.pathname.includes('loan')}>
                <NavButtonLabel to="/loans" $active={location.pathname.includes('loan')} onClick={() => setActiveDropdown(null)}>
                  Loans
                </NavButtonLabel>
                <ChevronToggle $open={activeDropdown === 'loans'}>
                  <ChevronDown />
                </ChevronToggle>
              </NavButtonWrapper>
              <MegaDropdownPortal $visible={activeDropdown === 'loans'}>
                <div>
                  <DropdownSubTitle>Personal Loans</DropdownSubTitle>
                  {loansData.personal.map(item => (
                    <DropdownItem key={item.key} to={item.path} onClick={() => setActiveDropdown(null)}>{item.label}</DropdownItem>
                  ))}
                  <DropdownSubTitle>Business Loan</DropdownSubTitle>
                  {loansData.business.map(item => (
                    <DropdownItem key={item.key} to={item.path} onClick={() => setActiveDropdown(null)}>{item.label}</DropdownItem>
                  ))}
                  <DropdownSubTitle>Gold Loan</DropdownSubTitle>
                  {loansData.goldLoan.map(item => (
                    <DropdownItem key={item.key} to={item.path} onClick={() => setActiveDropdown(null)}>{item.label}</DropdownItem>
                  ))}
                </div>
                <div>
                  <DropdownSubTitle>Loan Against Property</DropdownSubTitle>
                  {loansData.lap.map(item => (
                    <DropdownItem key={item.key} to={item.path} onClick={() => setActiveDropdown(null)}>{item.label}</DropdownItem>
                  ))}
                  <DropdownSubTitle>Home Loan</DropdownSubTitle>
                  {loansData.homeLoan.map(item => (
                    <DropdownItem key={item.key} to={item.path} onClick={() => setActiveDropdown(null)}>{item.label}</DropdownItem>
                  ))}
                </div>
              </MegaDropdownPortal>
            </NavItem>

            {/* Insurance Dropdown */}
            <NavItem
              onMouseEnter={() => openDropdown('insurance')}
              onMouseLeave={closeDropdown}
            >
              <NavButtonWrapper $active={location.pathname.includes('insurance')}>
                <NavButtonLabel to="/insurance" $active={location.pathname.includes('insurance')} onClick={() => setActiveDropdown(null)}>
                  Insurance
                </NavButtonLabel>
                <ChevronToggle $open={activeDropdown === 'insurance'}>
                  <ChevronDown />
                </ChevronToggle>
              </NavButtonWrapper>
              <DropdownPortal $visible={activeDropdown === 'insurance'}>
                {insuranceItems.map(item => (
                  <DropdownItem key={item.key} to={item.path} onClick={() => setActiveDropdown(null)}>
                    <ShieldCheck />
                    {item.label}
                  </DropdownItem>
                ))}
              </DropdownPortal>
            </NavItem>
          </NavLinks>

          {/* Desktop Actions */}
          <ActionButtons>
            {/* <Link to="/login"><button>Login</button></Link> */}
            {/* <Link to="/login?signup=true"><button>Create Account</button></Link> */}
            <AboutUsBtn to="/about-us">
              About Us <ArrowRight />
            </AboutUsBtn>
          </ActionButtons>

          {/* Mobile Menu Button */}
          <MobileMenuBtn
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </MobileMenuBtn>
        </NavbarContainer>
      </StyledHeader>

      {/* Mobile Overlay */}
      <MobileOverlay $open={isMobileMenuOpen} onClick={closeMobileMenu} />

      {/* Mobile Drawer */}
      <MobileDrawer $open={isMobileMenuOpen}>
        <MobileDrawerHeader>
          <LogoLink to="/" onClick={handleHomeClick}>
            <img src={ebsLogo} alt="EBS Finance" style={{ height: 32 }} />
            <LogoText>Everyday Banking Solutions</LogoText>
          </LogoLink>
          <MobileCloseBtn onClick={closeMobileMenu}>
            <X />
          </MobileCloseBtn>
        </MobileDrawerHeader>

        <MobileNavContent>
          {/* Home */}
          <MobileNavItem
            to="/"
            onClick={handleHomeClick}
            $active={location.pathname === '/'}
          >
            <Home />
            Home
          </MobileNavItem>

          {/* Cards */}
          <MobileNavButtonWrapper
            $active={location.pathname.includes('cards')}
            $open={openSubMenus.includes('cards')}
          >
            <MobileNavButtonLabel to="/credit-cards" onClick={closeMobileMenu} $active={location.pathname.includes('cards')}>
              <CreditCard /> Cards
            </MobileNavButtonLabel>
            <MobileChevronToggle $open={openSubMenus.includes('cards')} onClick={() => toggleSubMenu('cards')}>
              <ChevronDown />
            </MobileChevronToggle>
          </MobileNavButtonWrapper>
          <MobileSubItems $open={openSubMenus.includes('cards')}>
            {cardItems.map(item => (
              <MobileSubLink key={item.key} to={item.path} onClick={closeMobileMenu}>
                {item.label}
              </MobileSubLink>
            ))}
          </MobileSubItems>

          {/* Loans */}
          <MobileNavButtonWrapper
            $active={location.pathname.includes('loan')}
            $open={openSubMenus.includes('loans')}
          >
            <MobileNavButtonLabel to="/loans" onClick={closeMobileMenu} $active={location.pathname.includes('loan')}>
              <Landmark /> Loans
            </MobileNavButtonLabel>
            <MobileChevronToggle $open={openSubMenus.includes('loans')} onClick={() => toggleSubMenu('loans')}>
              <ChevronDown />
            </MobileChevronToggle>
          </MobileNavButtonWrapper>
          <MobileSubItems $open={openSubMenus.includes('loans')}>
            <MobileSubHeader>Personal Loans</MobileSubHeader>
            {loansData.personal.map(item => (
              <MobileSubLink key={item.key} to={item.path} onClick={closeMobileMenu}>
                {item.label}
              </MobileSubLink>
            ))}
            <MobileSubHeader>Business Loan</MobileSubHeader>
            {loansData.business.map(item => (
              <MobileSubLink key={item.key} to={item.path} onClick={closeMobileMenu}>
                {item.label}
              </MobileSubLink>
            ))}
            <MobileSubHeader>Loan Against Property</MobileSubHeader>
            {loansData.lap.map(item => (
              <MobileSubLink key={item.key} to={item.path} onClick={closeMobileMenu}>
                {item.label}
              </MobileSubLink>
            ))}
            <MobileSubHeader>Home Loan</MobileSubHeader>
            {loansData.homeLoan.map(item => (
              <MobileSubLink key={item.key} to={item.path} onClick={closeMobileMenu}>
                {item.label}
              </MobileSubLink>
            ))}
            <MobileSubHeader>Gold Loan</MobileSubHeader>
            {loansData.goldLoan.map(item => (
              <MobileSubLink key={item.key} to={item.path} onClick={closeMobileMenu}>
                {item.label}
              </MobileSubLink>
            ))}
          </MobileSubItems>

          {/* Insurance */}
          <MobileNavButtonWrapper
            $active={location.pathname.includes('insurance')}
            $open={openSubMenus.includes('insurance')}
          >
            <MobileNavButtonLabel to="/insurance" onClick={closeMobileMenu} $active={location.pathname.includes('insurance')}>
              <ShieldCheck /> Insurance
            </MobileNavButtonLabel>
            <MobileChevronToggle $open={openSubMenus.includes('insurance')} onClick={() => toggleSubMenu('insurance')}>
              <ChevronDown />
            </MobileChevronToggle>
          </MobileNavButtonWrapper>
          <MobileSubItems $open={openSubMenus.includes('insurance')}>
            {insuranceItems.map(item => (
              <MobileSubLink key={item.key} to={item.path} onClick={closeMobileMenu}>
                {item.label}
              </MobileSubLink>
            ))}
          </MobileSubItems>
        </MobileNavContent>

        <MobileFooter>
          <MobileAboutBtn to="/about-us" onClick={closeMobileMenu}>
            <Users />
            About Us
          </MobileAboutBtn>
        </MobileFooter>
      </MobileDrawer>
    </>
  );
};

export default Navbar;
