import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { LeftOutlined, RightOutlined, TrophyOutlined, StarOutlined, CloseOutlined } from '@ant-design/icons';
import { Trophy } from 'lucide-react';
import { colors } from '../../styles/theme';

/* ─── Animations ─── */
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
`;

/* ─── Section ─── */
const AwardsSection = styled.section`
  padding: 80px 0 60px;
  background: ${colors.background.section};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      ${colors.awards.sectionRadialA},
      ${colors.awards.sectionRadialB};
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 50px 0 40px;
  }
`;

/* ─── Container ─── */
const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;

  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;

/* ─── Header ─── */
const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
  animation: ${fadeInUp} 0.8s ease;

  @media (max-width: 768px) {
    margin-bottom: 32px;
  }
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

const Title = styled.h2`
  font-size: clamp(1.8rem, 4vw, 3rem);
  color: ${colors.text.darkAlt};
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 16px;
  
  span {
    background: ${colors.awards.shimmerGradient};
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 4s linear infinite;
  }
`;

const SubTitle = styled.p`
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  color: ${colors.text.gray};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

/* ─── Quick Stats ─── */
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 560px;
  margin: 0 auto 50px;
  animation: ${fadeInUp} 0.8s ease 0.2s both;

  @media (max-width: 480px) {
    gap: 12px;
    margin-bottom: 36px;
  }
`;

const StatCard = styled.div`
  background: ${colors.background.white};
  border: 1px solid ${colors.border.subtleBorder};
  border-radius: 16px;
  padding: 24px 20px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px ${colors.shadow.statCard};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--accent-color, ${colors.badge.accentColor}), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    box-shadow: 0 8px 30px ${colors.shadow.statCardHover};
    border-color: ${colors.border.subtleBorderMid};
    transform: translateY(-4px);

    &::before { opacity: 1; }
  }

  @media (max-width: 480px) {
    padding: 16px 12px;
    border-radius: 12px;
  }
`;

const StatIcon = styled.div<{ color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${p => p.color}12;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 14px;
  font-size: 22px;
  color: ${p => p.color};
  animation: ${float} 3s ease-in-out infinite;

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

const StatValue = styled.div`
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 700;
  color: ${colors.text.darkAlt};
  line-height: 1.2;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: clamp(0.7rem, 1.5vw, 0.85rem);
  color: ${colors.text.gray};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

/* ─── Carousel ─── */
const CarouselSection = styled.div`
  position: relative;
  animation: ${fadeInUp} 0.8s ease 0.4s both;
`;

const CarouselTrack = styled.div`
  overflow: hidden;
  border-radius: 20px;
  position: relative;

  @media (max-width: 480px) {
    border-radius: 14px;
  }
`;

const SlidesContainer = styled.div<{ offset: number }>`
  display: flex;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(${p => p.offset}%);
  will-change: transform;
`;

const Slide = styled.div<{ active: boolean }>`
  min-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 12px;
    gap: 12px;
  }

  @media (max-width: 480px) {
    padding: 8px;
  }
`;

const AwardCard = styled.div<{ featured?: boolean }>`
  background: ${colors.background.white};
  border: 1px solid ${colors.border.subtleBorder};
  border-radius: 20px;
  padding: 28px;
  width: 320px;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  box-shadow: 0 4px 20px ${colors.shadow.statCard};

  ${p => p.featured && `
    border-color: ${colors.awards.cardFeaturedBorder};
    background: ${colors.awards.cardFeaturedBg};
    transform: scale(1.05);
    z-index: 2;
    box-shadow: 0 8px 32px ${colors.awards.cardFeaturedShadow};
  `}

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    background: ${colors.awards.overlayBg};
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: ${p => p.featured ? 'scale(1.08)' : 'scale(1.03)'};
    border-color: ${colors.awards.cardHoverBorder};
    box-shadow: 0 16px 48px ${colors.awards.cardHoverShadow};
    &::before { opacity: 1; }
  }

  @media (max-width: 768px) {
    width: 260px;
    padding: 20px;
    border-radius: 16px;
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 300px;
    padding: 20px;
    border-radius: 14px;
    aspect-ratio: auto;
    height: 300px;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;

  img {
    width: 85%;
    height: 85%;
    object-fit: contain;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    filter: drop-shadow(0 4px 12px ${colors.shadow.cardImage});
  }

  ${AwardCard}:hover & img {
    transform: scale(1.06);
  }
`;

const ClickHint = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.7rem;
  color: ${colors.text.mutedSoft};
  opacity: 0;
  transition: opacity 0.3s ease;
  white-space: nowrap;
  pointer-events: none;

  ${AwardCard}:hover & {
    opacity: 1;
  }
`;

/* ─── Navigation ─── */
const NavControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 36px;

  @media (max-width: 480px) {
    margin-top: 24px;
    gap: 14px;
  }
`;

const NavButton = styled.button`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: ${colors.background.white};
  border: 1px solid ${colors.border.subtleBorderDark};
  box-shadow: 0 2px 10px ${colors.shadow.statCard};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${colors.text.grayDark};
  font-size: 16px;

  &:hover {
    background: ${colors.awards.navHoverBg};
    border-color: ${colors.awards.navHoverBorder};
    color: ${colors.awards.navHoverColor};
    transform: scale(1.05);
    box-shadow: 0 4px 16px ${colors.awards.navHoverShadow};
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 480px) {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    font-size: 14px;
  }
`;

const ProgressBar = styled.div`
  flex: 1;
  max-width: 280px;
  height: 3px;
  background: ${colors.border.subtleBorder};
  border-radius: 4px;
  overflow: hidden;
  position: relative;

  @media (max-width: 480px) {
    max-width: 180px;
    height: 2px;
  }
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background: ${colors.awards.progressGradient};
  border-radius: 4px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  width: ${p => p.progress}%;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${colors.badge.accentColor};
    box-shadow: 0 0 10px ${colors.awards.progressDotGlow};
  }
`;

const SlideCounter = styled.span`
  font-size: 0.85rem;
  color: ${colors.text.mutedSoft};
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  min-width: 60px;
  text-align: center;

  strong {
    color: ${colors.text.darkAlt};
    font-weight: 600;
  }
`;

/* ─── Dot indicators for mobile ─── */
const DotIndicators = styled.div`
  display: none;
  justify-content: center;
  gap: 6px;
  margin-top: 20px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    display: flex;
  }
`;

const Dot = styled.button<{ active: boolean }>`
  width: ${p => p.active ? '24px' : '8px'};
  height: 8px;
  border-radius: 4px;
  border: none;
  background: ${p => p.active
    ? colors.awards.dotActive
    : colors.awards.dotInactive};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    background: ${p => p.active
    ? colors.awards.dotActive
    : colors.awards.dotInactiveHover};
  }
`;

/* ─── Lightbox Modal ─── */
const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${colors.lightbox.overlay};
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.25s ease;
  cursor: pointer;
  padding: 24px;
`;

const LightboxContent = styled.div`
  position: relative;
  background: ${colors.background.white};
  border-radius: 24px;
  padding: 32px;
  max-width: 560px;
  width: 100%;
  max-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${scaleIn} 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
  box-shadow: 0 32px 80px ${colors.shadow.lightboxContent};

  img {
    width: 100%;
    height: auto;
    max-height: 70vh;
    object-fit: contain;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    padding: 20px;
    border-radius: 18px;
    max-width: 95vw;
  }
`;

const LightboxClose = styled.button`
  position: absolute;
  top: -14px;
  right: -14px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${colors.lightbox.closeBtn};
  border: 2px solid ${colors.background.white};
  color: ${colors.background.white};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease;
  z-index: 1;
  box-shadow: 0 4px 12px ${colors.shadow.lightboxCloseBtn};

  &:hover {
    background: ${colors.lightbox.closeBtnHover};
    transform: scale(1.1);
  }

  @media (max-width: 480px) {
    top: -10px;
    right: -10px;
    width: 36px;
    height: 36px;
    font-size: 14px;
  }
`;

const LightboxNav = styled.button<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${p => p.direction === 'left' ? 'left: -20px;' : 'right: -20px;'}
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${colors.background.white};
  border: 1px solid ${colors.border.subtleBorderDark};
  color: ${colors.text.darkAlt};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 16px ${colors.shadow.lightboxNav};

  &:hover {
    background: ${colors.badge.accentColor};
    color: ${colors.background.white};
    transform: translateY(-50%) scale(1.1);
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    ${p => p.direction === 'left' ? 'left: -8px;' : 'right: -8px;'}
    font-size: 12px;
  }
`;

const LightboxCounter = styled.div`
  position: absolute;
  bottom: -36px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  font-variant-numeric: tabular-nums;

  strong {
    color: #ffffff;
  }
`;

/* ─── Component ─── */
const Awards: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const awards = Array.from({ length: 23 }, (_, i) => ({
    id: i + 1,
    image: `/images/awards/${i + 1}.png`,
  }));

  const stats = [
    { icon: <TrophyOutlined />, value: '23+', label: 'Awards Won', color: '#f59e0b' },
    { icon: <StarOutlined />, value: '10+', label: 'Years of Excellence', color: '#6366f1' },
  ];

  // Responsive items per page
  const updateItemsPerPage = useCallback(() => {
    const w = window.innerWidth;
    if (w <= 480) setItemsPerPage(1);
    else if (w <= 900) setItemsPerPage(2);
    else setItemsPerPage(3);
  }, []);

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, [updateItemsPerPage]);

  const totalPages = Math.ceil(awards.length / itemsPerPage);

  // Auto-play (pause when lightbox open)
  useEffect(() => {
    if (lightboxIndex !== null) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }
    autoPlayRef.current = setInterval(() => {
      setCurrentPage(prev => (prev + 1) % totalPages);
    }, 4000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [totalPages, lightboxIndex]);

  const resetAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrentPage(prev => (prev + 1) % totalPages);
    }, 4000);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    resetAutoPlay();
  };

  const handlePrev = () => goToPage((currentPage - 1 + totalPages) % totalPages);
  const handleNext = () => goToPage((currentPage + 1) % totalPages);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const dist = touchStart - touchEnd;
    if (dist > 50) handleNext();
    else if (dist < -50) handlePrev();
  };

  const getCurrentSlideAwards = (pageIndex: number) => {
    const startIdx = pageIndex * itemsPerPage;
    return awards.slice(startIdx, startIdx + itemsPerPage);
  };

  const progress = ((currentPage + 1) / totalPages) * 100;

  // Lightbox handlers
  const openLightbox = (awardId: number) => {
    setLightboxIndex(awardId - 1);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  };

  const lightboxPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + awards.length) % awards.length);
  };

  const lightboxNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % awards.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxPrev();
      if (e.key === 'ArrowRight') lightboxNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex]);

  return (
    <>
      <AwardsSection id="awards">
        <Container>
          {/* Header */}
          <SectionHeader>
            <SectionBadge>
              <Trophy size={16} />
              Recognition
            </SectionBadge>
            <Title>
              Appreciation & <span>Excellence</span>
            </Title>
            <SubTitle>
              Our commitment to quality and innovation has been recognized across the industry
            </SubTitle>
          </SectionHeader>

          {/* Quick Stats */}
          <StatsGrid>
            {stats.map((stat, i) => (
              <StatCard key={i} style={{ '--accent-color': stat.color } as React.CSSProperties}>
                <StatIcon color={stat.color}>{stat.icon}</StatIcon>
                <StatValue>{stat.value}</StatValue>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </StatsGrid>

          {/* Carousel */}
          <CarouselSection>
            <CarouselTrack
              ref={trackRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <SlidesContainer offset={-currentPage * 100}>
                {Array.from({ length: totalPages }).map((_, pageIdx) => (
                  <Slide key={pageIdx} active={pageIdx === currentPage}>
                    {getCurrentSlideAwards(pageIdx).map((award, cardIdx) => (
                      <AwardCard
                        key={award.id}
                        featured={itemsPerPage === 3 && cardIdx === 1}
                        onClick={() => openLightbox(award.id)}
                      >
                        <ImageContainer>
                          <img
                            src={award.image}
                            alt={`Award ${award.id}`}
                            loading="lazy"
                          />
                        </ImageContainer>
                        <ClickHint>Click to view</ClickHint>
                      </AwardCard>
                    ))}
                  </Slide>
                ))}
              </SlidesContainer>
            </CarouselTrack>

            {/* Navigation */}
            <NavControls>
              <NavButton onClick={handlePrev} aria-label="Previous">
                <LeftOutlined />
              </NavButton>
              <SlideCounter>
                <strong>{String(currentPage + 1).padStart(2, '0')}</strong>
                {' / '}
                {String(totalPages).padStart(2, '0')}
              </SlideCounter>
              <ProgressBar>
                <ProgressFill progress={progress} />
              </ProgressBar>
              <NavButton onClick={handleNext} aria-label="Next">
                <RightOutlined />
              </NavButton>
            </NavControls>
          </CarouselSection>
        </Container>
      </AwardsSection>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <LightboxOverlay onClick={closeLightbox}>
          <LightboxContent onClick={(e) => e.stopPropagation()}>
            <LightboxClose onClick={closeLightbox}>
              <CloseOutlined />
            </LightboxClose>
            <LightboxNav direction="left" onClick={lightboxPrev}>
              <LeftOutlined />
            </LightboxNav>
            <img
              src={awards[lightboxIndex].image}
              alt={`Award ${awards[lightboxIndex].id}`}
            />
            <LightboxNav direction="right" onClick={lightboxNext}>
              <RightOutlined />
            </LightboxNav>
            <LightboxCounter>
              <strong>{lightboxIndex + 1}</strong> / {awards.length}
            </LightboxCounter>
          </LightboxContent>
        </LightboxOverlay>
      )}
    </>
  );
};

export default Awards;
