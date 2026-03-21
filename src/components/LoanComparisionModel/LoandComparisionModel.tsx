// components/LoanComparisonModal.tsx
import React, { RefObject, useState, useEffect } from 'react';
import { Modal, Rate, Button, Tag, Divider, Tooltip } from 'antd';
import {
    DownloadOutlined,
    CloseOutlined,
    StarFilled,
    CheckCircleFilled,
    InfoCircleOutlined,
    PercentageOutlined,
    CalendarOutlined,
    WalletOutlined,
    BankOutlined,
    ThunderboltOutlined,
    UserOutlined,
    SwapOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { DownloadIcon } from 'lucide-react';

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
  margin-right: 20px;

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

const LoanCard = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid ${colors.gray[200]};
  transition: all 0.2s ease;
  position: relative;

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

const BankLogo = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  object-fit: contain;
  background: white;
  padding: 8px;
  border: 1px solid ${colors.gray[200]};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  @media (min-width: 768px) {
    width: 56px;
    height: 56px;
    border-radius: 16px;
  }
`;

const BankInfo = styled.div`
  flex: 1;
`;

const BankName = styled.div`
  font-weight: 600;
  color: ${colors.gray[900]};
  font-size: 16px;
  margin-bottom: 4px;
  
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const LoanName = styled.div`
  color: ${colors.gray[500]};
  font-size: 13px;
  
  @media (min-width: 768px) {
    font-size: 14px;
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

// Types
export interface LoanItem {
    name: string;
    bankName: string;
    bankLogo: string;
    interestRate: string | number;
    processingFee: string;
    maxAmount: string | number;
    minAmount: string | number;
    tenure: string;
    rating: number;
    benefit: string;
    suitedFor: string[];
    [key: string]: any;
}

export interface LoanComparisonModalProps {
    isVisible: boolean;
    onClose: () => void;
    selectedLoans: string[];
    loans: LoanItem[];
    onDownloadPDF: () => void;
    compareContentRef: RefObject<HTMLDivElement>;
    title?: string;
    modalWidth?: number | string;
    showApplyButton?: boolean;
    onApply?: (loanName: string) => void;
}

export const LoanComparisonModal: React.FC<LoanComparisonModalProps> = ({
    isVisible,
    onClose,
    selectedLoans,
    loans,
    onDownloadPDF,
    compareContentRef,
    title = "Compare Personal Loans",
    modalWidth = '95%',
    showApplyButton = true,
    onApply
}) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const selectedLoansData = loans.filter(loan => selectedLoans.includes(loan.name));

    // Calculate best value loan
    const bestValueLoan = selectedLoansData.reduce((best, current) => {
        const bestRate = parseFloat(String(best.interestRate).replace('%', ''));
        const currentRate = parseFloat(String(current.interestRate).replace('%', ''));
        return currentRate < bestRate ? current : best;
    }, selectedLoansData[0]);

    const formatCurrency = (value: string | number) => {
        const num = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]+/g, '')) : value;
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(num);
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
                        icon={<DownloadIcon />}
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
                    {selectedLoansData.map((loan) => {
                        const isBestValue = bestValueLoan?.name === loan.name;
                        const rateValue = parseFloat(String(loan.interestRate).replace('%', ''));

                        return (
                            <LoanCard key={loan.name}>
                                {isBestValue && (
                                    <BestValueTag>
                                        <ThunderboltOutlined /> BEST VALUE
                                    </BestValueTag>
                                )}

                                <CardHeader>
                                    <BankLogo src={loan.bankLogo} alt={loan.bankName} />
                                    <BankInfo>
                                        <BankName>{loan.bankName}</BankName>
                                        <LoanName>{loan.name}</LoanName>
                                    </BankInfo>
                                </CardHeader>

                                <RatingSection>
                                    <RatingWrapper>
                                        <Rate
                                            disabled
                                            defaultValue={loan.rating}
                                            style={{ fontSize: isMobile ? '14px' : '16px', color: colors.warning }}
                                        />
                                        <RatingNumber>{loan.rating}</RatingNumber>
                                    </RatingWrapper>
                                    {rateValue < 10 && (
                                        <HighlightBadge type="best">
                                            <PercentageOutlined /> Low Interest
                                        </HighlightBadge>
                                    )}
                                </RatingSection>

                                <BenefitSection>
                                    <BenefitTitle>
                                        <CheckCircleFilled /> KEY BENEFIT
                                    </BenefitTitle>
                                    <BenefitText>{loan.benefit}</BenefitText>
                                </BenefitSection>

                                <DetailsGrid>
                                    <DetailItem>
                                        <DetailLabel>
                                            <PercentageOutlined /> INTEREST RATE
                                        </DetailLabel>
                                        <DetailValue highlight={rateValue < 10}>
                                            {loan.interestRate}
                                        </DetailValue>
                                    </DetailItem>

                                    <DetailItem>
                                        <DetailLabel>
                                            <WalletOutlined /> PROCESSING FEE
                                        </DetailLabel>
                                        <DetailValue>{loan.processingFee}</DetailValue>
                                    </DetailItem>

                                    <DetailItem>
                                        <DetailLabel>
                                            <BankOutlined /> MAX AMOUNT
                                        </DetailLabel>
                                        <DetailValue>{formatCurrency(loan.maxAmount)}</DetailValue>
                                    </DetailItem>

                                    <DetailItem>
                                        <DetailLabel>
                                            <CalendarOutlined /> TENURE
                                        </DetailLabel>
                                        <DetailValue>{loan.tenure}</DetailValue>
                                    </DetailItem>
                                </DetailsGrid>

                                <SuitedForSection>
                                    <SuitedForLabel>
                                        <UserOutlined /> SUITED FOR
                                    </SuitedForLabel>
                                    <TagContainer>
                                        {loan.suitedFor.map((item, index) => (
                                            <StyledTag key={index}>{item}</StyledTag>
                                        ))}
                                    </TagContainer>
                                </SuitedForSection>

                                {showApplyButton && onApply && (
                                    <ActionFooter>
                                        <ApplyButton
                                            type="primary"
                                            onClick={() => onApply(loan.name)}
                                        >
                                            Apply Now
                                        </ApplyButton>
                                    </ActionFooter>
                                )}
                            </LoanCard>
                        );
                    })}
                </CardsGrid>

                {selectedLoansData.length > 0 && (
                    <SummarySection>
                        <SummaryTitle>
                            <ThunderboltOutlined /> Quick Summary
                        </SummaryTitle>
                        <SummaryText>
                            {bestValueLoan?.bankName} offers the best overall value with competitive interest rates
                            and great customer ratings. Compare the features above to find your perfect match based
                            on your specific requirements.
                        </SummaryText>
                    </SummarySection>
                )}
            </ComparisonContainer>
        </StyledModal>
    );
};

export default LoanComparisonModal;