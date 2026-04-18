// components/ComparisonModal.tsx
import React, { RefObject, useState, useEffect } from 'react';
import { Modal, Rate, Button, Tag } from 'antd';
import {
  CloseOutlined,
  StarFilled,
  CheckCircleFilled,
  PercentageOutlined,
  CalendarOutlined,
  WalletOutlined,
  BankOutlined,
  ThunderboltOutlined,
  UserOutlined,
  SwapOutlined,
  GiftOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { DownloadIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Router, useNavigate } from 'react-router-dom';

// Modern color palette
const colors = {
  primary: '#6366f1',
  primaryLight: '#e0e7ff',
  primaryDark: '#4f46e5',
  success: '#10b981',
  successLight: '#d1fae5',
  warning: '#f59e0b',
  warningLight: '#fef3c7',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  }
};

// Styled components
const StyledModal = styled(Modal)`
  .ant-modal-content {
    overflow: hidden;
    border-radius: 24px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    background: ${colors.gray[50]};
  }

  .ant-modal-header {
    padding: 20px 24px;
    border-bottom: 1px solid ${colors.gray[200]};
    background: white;
    border-radius: 24px 24px 0 0;
    
    @media (min-width: 768px) {
      padding: 24px 32px;
    }
  }

  .ant-modal-title {
    font-size: 20px;
    font-weight: 600;
    color: ${colors.gray[900]};
    
    @media (min-width: 768px) {
      font-size: 24px;
    }
  }

  .ant-modal-body {
    padding: 0;
    background: ${colors.gray[50]};
    max-height: 80vh;
    overflow-y: auto;
    
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background: #f0f0f0;
    }
    &::-webkit-scrollbar-thumb {
      background: #bfbfbf;
      border-radius: 3px;
    }
  }

  .ant-modal-close {
    top: 20px;
    right: 20px;
    
    @media (min-width: 768px) {
      top: 24px;
      right: 24px;
    }
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
  gap: 12px;
  padding-right: 32px;
`;

const TitleWithIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  .anticon {
    color: ${colors.primary};
    font-size: 24px;
  }
`;

const DownloadButton = styled(Button)`
  background: ${colors.primary};
  border: none;
  border-radius: 40px;
  height: 30px;
  padding: 0 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;

  &:hover {
    background: ${colors.primaryDark};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${colors.primaryLight};
  }

  @media (min-width: 768px) {
    height: 44px;
    padding: 0 24px;
    font-size: 15px;
  }
`;

const ComparisonContainer = styled.div`
  padding: 20px;
  
  @media (min-width: 768px) {
    padding: 24px 32px 32px;
  }
`;

const CardsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
`;

const CreditCardWrapper = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid ${colors.gray[200]};
  transition: all 0.2s ease;
  position: relative;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.15);
    border-color: ${colors.primaryLight};
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${colors.gray[100]};
  display: flex;
  align-items: center;
  gap: 16px;
  
  @media (min-width: 768px) {
    padding: 24px;
  }
`;

const CardImageWrapper = styled.div`
  width: 90px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 4px;
  border: 1px solid ${colors.gray[200]};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  @media (min-width: 768px) {
    width: 110px;
    height: 70px;
  }
`;

const CardInfo = styled.div`
  flex: 1;
`;

const CardNameText = styled.div`
  font-weight: 600;
  color: ${colors.gray[900]};
  font-size: 16px;
  margin-bottom: 4px;
  line-height: 1.2;
  
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const BestValueTag = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark});
  color: white;
  padding: 4px 12px;
  border-radius: 40px;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 4px 10px ${colors.primaryLight};
  z-index: 1;
  
  @media (min-width: 768px) {
    top: 16px;
    right: 16px;
    padding: 4px 16px;
    font-size: 12px;
  }
`;

const RatingSection = styled.div`
  padding: 16px 20px;
  background: ${colors.gray[50]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  
  @media (min-width: 768px) {
    padding: 16px 24px;
  }
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RatingNumber = styled.span`
  font-weight: 700;
  font-size: 15px;
  color: ${colors.gray[900]};
  
  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const HighlightBadge = styled.div<{ type: 'best' | 'good' }>`
  background: ${props => props.type === 'best' ? colors.successLight : colors.warningLight};
  color: ${props => props.type === 'best' ? colors.success : colors.warning};
  padding: 4px 12px;
  border-radius: 40px;
  font-size: 11px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  
  @media (min-width: 768px) {
    font-size: 12px;
    padding: 4px 16px;
  }
`;

const BenefitSection = styled.div`
  padding: 20px;
  background: ${colors.primaryLight};
  margin: 0;
  
  @media (min-width: 768px) {
    padding: 24px;
  }
`;

const BenefitTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${colors.primary};
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const BenefitText = styled.p`
  color: ${colors.gray[700]};
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  
  @media (min-width: 768px) {
    font-size: 15px;
  }
`;

const DetailsGrid = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  
  @media (min-width: 768px) {
    padding: 24px;
    gap: 20px;
  }
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DetailLabel = styled.span`
  color: ${colors.gray[500]};
  font-size: 11px;
  display: flex;
  align-items: center;
  gap: 4px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  
  @media (min-width: 768px) {
    font-size: 12px;
  }
`;

const DetailValue = styled.span<{ highlight?: boolean }>`
  font-weight: 600;
  color: ${props => props.highlight ? colors.primary : colors.gray[900]};
  font-size: 15px;
  
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const RewardsSection = styled.div`
  padding: 0 20px 20px;
  
  @media (min-width: 768px) {
    padding: 0 24px 24px;
  }
`;

const RewardsLabel = styled.div`
  color: ${colors.gray[500]};
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const RewardItem = styled.div`
  font-size: 13px;
  color: ${colors.gray[700]};
  margin-bottom: 8px;
  display: flex;
  align-items: flex-start;
  gap: 6px;

  &:last-child {
    margin-bottom: 0;
  }

  .anticon {
    margin-top: 3px;
    color: ${colors.success};
    font-size: 12px;
  }
`;

const SuitedForSection = styled.div`
  padding: 0 20px 20px;
  
  @media (min-width: 768px) {
    padding: 0 24px 24px;
  }
`;

const SuitedForLabel = styled.div`
  color: ${colors.gray[500]};
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const StyledTag = styled(Tag)`
  background: ${colors.gray[100]};
  border: none;
  color: ${colors.gray[700]};
  padding: 4px 10px;
  border-radius: 30px;
  font-size: 12px;
  margin: 0;
  
  @media (min-width: 768px) {
    padding: 4px 12px;
    font-size: 13px;
  }
`;

const ActionFooter = styled.div`
  padding: 20px;
  border-top: 1px solid ${colors.gray[100]};
  background: white;
  margin-top: auto;
  
  @media (min-width: 768px) {
    padding: 20px 24px 24px;
  }
`;

const ApplyButton = styled(Button)`
  width: 100%;
  height: 44px;
  border-radius: 40px;
  background: ${colors.primary};
  border: none;
  color: white;
  font-weight: 600;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: ${colors.primaryDark};
    color: white;
  }
  
  @media (min-width: 768px) {
    height: 48px;
    font-size: 16px;
  }
`;

const SummarySection = styled.div`
  margin-top: 24px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  color: white;
  
  @media (min-width: 768px) {
    margin-top: 32px;
    padding: 28px;
    border-radius: 24px;
  }
`;

const SummaryTitle = styled.h3`
  color: white;
  margin: 0 0 12px 0;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  @media (min-width: 768px) {
    font-size: 20px;
    margin-bottom: 16px;
  }
`;

const SummaryText = styled.p`
  margin: 0;
  opacity: 0.95;
  font-size: 14px;
  line-height: 1.6;
  
  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

interface Card {
  id: number;
  name: string;
  image: string;
  joiningFee: string;
  rating: number;
  suitedFor: string[];
  benefit: string;
  benefitIcon: typeof StarFilled | typeof PercentageOutlined | typeof GiftOutlined | typeof SafetyCertificateOutlined;
  creditLimit?: string;
  interestRate?: string;
}

interface CardDetails {
  features: string[];
  rewards: string[];
  fees: {
    joining: string;
    annual: string;
    renewal: string;
  };
  creditLimit?: string;
  interestRate?: string;
}

interface CardDetailsMap {
  [key: string]: CardDetails;
}

export interface ComparisonModalProps {
  isVisible: boolean;
  onClose: () => void;
  selectedCards: string[];
  creditCards: Card[];
  cardDetailsMap: CardDetailsMap;
  onDownloadPDF: () => void;
  compareContentRef: RefObject<HTMLDivElement>;
  title?: string;
  modalWidth?: number | string;
  maxFeatures?: number;
  maxBenefits?: number;
  maxRewards?: number;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isVisible,
  onClose,
  selectedCards,
  creditCards,
  cardDetailsMap,
  onDownloadPDF,
  compareContentRef,
  title = "Compare Credit Cards",
  modalWidth = '95%'
}) => {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const selectedCardsData = creditCards.filter(card => selectedCards.includes(card.name));

  // Determine best rating card for Best Value tag
  const bestValueCard = selectedCardsData.reduce((best, current) => {
    return (current?.rating || 0) > (best?.rating || 0) ? current : best;
  }, selectedCardsData[0]);

  const navigateToApply = () => {
    navigate("/credit-cards");
    onClose();
    setTimeout(() => {
      const element = document.getElementById("apply");
      if (element) {
        const top = element.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 300);
  };

  return (
    <StyledModal
      open={isVisible}
      onCancel={onClose}
      footer={null}
      width={modalWidth}
      title={
        <HeaderContent>
          <TitleWithIcon>
            <SwapOutlined />
            <span>{title}</span>
          </TitleWithIcon>
          <DownloadButton
            type="primary"
            onClick={onDownloadPDF}
            icon={<DownloadIcon size={16} />}
          >
            Download PDF
          </DownloadButton>
        </HeaderContent>
      }
      closeIcon={<CloseOutlined />}
      centered
    >
      <ComparisonContainer ref={compareContentRef}>
        <CardsGrid>
          {selectedCardsData.map((card, index) => {
            const details = cardDetailsMap[card.name];
            const isBestValue = bestValueCard?.name === card.name;

            return (
              <CreditCardWrapper
                key={card.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {isBestValue && (
                  <BestValueTag>
                    <ThunderboltOutlined /> BEST VALUE
                  </BestValueTag>
                )}

                <CardHeader>
                  <CardImageWrapper>
                    <img src={card.image} alt={card.name} />
                  </CardImageWrapper>
                  <CardInfo>
                    <CardNameText>{card.name}</CardNameText>
                  </CardInfo>
                </CardHeader>

                <RatingSection>
                  <RatingWrapper>
                    <Rate
                      disabled
                      defaultValue={card.rating}
                      style={{ fontSize: isMobile ? '14px' : '16px', color: colors.warning }}
                    />
                    <RatingNumber>{card.rating}</RatingNumber>
                  </RatingWrapper>
                  {(details?.fees?.annual === 'Free' || details?.fees?.annual === '₹0' || details?.fees?.annual === '0') && (
                    <HighlightBadge type="best">
                      <SafetyCertificateOutlined /> No Annual Fee
                    </HighlightBadge>
                  )}
                </RatingSection>

                <BenefitSection>
                  <BenefitTitle>
                    <CheckCircleFilled /> KEY BENEFIT
                  </BenefitTitle>
                  <BenefitText>{card.benefit || details?.features?.[0]}</BenefitText>
                </BenefitSection>

                <DetailsGrid>
                  <DetailItem>
                    <DetailLabel>
                      <WalletOutlined /> JOINING FEE
                    </DetailLabel>
                    <DetailValue>
                      {details?.fees?.joining || card.joiningFee || 'N/A'}
                    </DetailValue>
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel>
                      <CalendarOutlined /> ANNUAL FEE
                    </DetailLabel>
                    <DetailValue>{details?.fees?.annual || 'N/A'}</DetailValue>
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel>
                      <BankOutlined /> CREDIT LIMIT
                    </DetailLabel>
                    <DetailValue>{details?.creditLimit || card.creditLimit || 'N/A'}</DetailValue>
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel>
                      <PercentageOutlined /> INTEREST RATE
                    </DetailLabel>
                    <DetailValue>{details?.interestRate || card.interestRate || 'N/A'}</DetailValue>
                  </DetailItem>
                </DetailsGrid>

                <RewardsSection>
                  <RewardsLabel>
                    <GiftOutlined /> REWARDS & OFFERS
                  </RewardsLabel>
                  {details?.rewards?.slice(0, 3).map((reward, i) => (
                    <RewardItem key={i}>
                      <CheckCircleFilled /> {reward}
                    </RewardItem>
                  ))}
                </RewardsSection>

                <SuitedForSection>
                  <SuitedForLabel>
                    <UserOutlined /> SUITED FOR
                  </SuitedForLabel>
                  <TagContainer>
                    {card.suitedFor?.map((item, index) => (
                      <StyledTag key={index}>{item}</StyledTag>
                    ))}
                  </TagContainer>
                </SuitedForSection>

                <ActionFooter>
                  <ApplyButton type="primary" onClick={navigateToApply}>
                    Apply Now
                  </ApplyButton>
                </ActionFooter>
              </CreditCardWrapper>
            );
          })}
        </CardsGrid>

        {selectedCardsData.length > 0 && (
          <SummarySection>
            <SummaryTitle>
              <ThunderboltOutlined /> Quick Summary
            </SummaryTitle>
            <SummaryText>
              {bestValueCard?.name} offers the best overall value with excellent ratings and rewards.
              Compare the features above to find the perfect credit card based on your spending habits
              and fee preferences.
            </SummaryText>
          </SummarySection>
        )}
      </ComparisonContainer>
    </StyledModal>
  );
};

export default ComparisonModal;