import React from 'react';
import styled from 'styled-components';
import { Rate } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';

interface PartnerCardProps {
  logo: string;
  name: string;
  interestRate: string;
  processingFee?: string;
  maxAmount?: string;
  tenure?: string;
  benefits: string[];
  rating?: number;
  suitedFor?: string[];
  onApply: () => void;
  onDetails?: () => void;
  compareNode?: React.ReactNode;
}

const CardWrapper = styled.div`
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: grid;
  grid-template-columns: 200px 1fr 180px;
  align-items: center;
  gap: 0;

  &:hover {
    box-shadow: 0 8px 28px rgba(0, 119, 255, 0.10);
    border-color: rgba(0, 119, 255, 0.12);
    transform: translateY(-2px);
  }

  @media (max-width: 900px) {
    grid-template-columns: 160px 1fr 160px;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const LogoSection = styled.div`
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border-right: 1px solid #f1f5f9;
  height: 100%;

  @media (max-width: 700px) {
    border-right: none;
    border-bottom: 1px solid #f1f5f9;
    padding: 20px;
  }
`;

const LogoImage = styled.img`
  width: 100%;
  max-width: 120px;
  height: 60px;
  object-fit: contain;
  filter: grayscale(0.1);
  transition: filter 0.3s ease;

  ${CardWrapper}:hover & {
    filter: none;
  }
`;

const RatingRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

const RatingValue = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
`;

const DetailsSection = styled.div`
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const BankName = styled.h3`
  font-family: 'Poppins', system-ui, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  line-height: 1.3;
`;

const RateRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const RateChip = styled.div<{ $color?: string; $bg?: string }>`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  background: ${p => p.$bg || 'rgba(0, 119, 255, 0.06)'};
  border-radius: 8px;
  padding: 6px 10px;
  border: 1px solid ${p => p.$color ? `${p.$color}20` : 'rgba(0,119,255,0.10)'};
`;

const ChipLabel = styled.span`
  font-size: 10px;
  color: #94a3b8;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ChipValue = styled.span<{ $color?: string }>`
  font-size: 13px;
  font-weight: 700;
  color: ${p => p.$color || '#0066ee'};
  font-variant-numeric: tabular-nums;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const Tag = styled.span`
  background: rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  padding: 3px 8px;
  font-size: 12px;
  color: #475569;
  font-weight: 500;
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 7px;
  font-size: 13px;
  color: #475569;
  line-height: 1.4;

  .anticon {
    color: #22c55e;
    font-size: 13px;
    margin-top: 1px;
    flex-shrink: 0;
  }
`;

const ActionsSection = styled.div`
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
  border-left: 1px solid #f1f5f9;
  height: 100%;
  justify-content: center;

  @media (max-width: 700px) {
    border-left: none;
    border-top: 1px solid #f1f5f9;
    padding: 16px 20px;
  }
`;

const ApplyButton = styled.button`
  width: 100%;
  height: 42px;
  background: linear-gradient(135deg, #0077ff 0%, #0047ff 100%);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 3px 10px rgba(0, 119, 255, 0.25);
  font-family: 'Inter', system-ui, sans-serif;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(0, 119, 255, 0.35);
    background: linear-gradient(135deg, #0066ee 0%, #003fd6 100%);
  }

  &:active {
    transform: translateY(0);
  }
`;

const DetailsButton = styled.button`
  width: 100%;
  height: 38px;
  background: rgba(0, 119, 255, 0.06);
  color: #0066ee;
  border: 1px solid rgba(0, 119, 255, 0.15);
  border-radius: 9px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Inter', system-ui, sans-serif;

  &:hover {
    background: rgba(0, 119, 255, 0.1);
    border-color: rgba(0, 119, 255, 0.25);
  }
`;

const PartnerCard: React.FC<PartnerCardProps> = ({
  logo,
  name,
  interestRate,
  processingFee,
  maxAmount,
  tenure,
  benefits,
  rating,
  suitedFor = [],
  onApply,
  onDetails,
  compareNode,
}) => {
  return (
    <CardWrapper>
      <LogoSection>
        <LogoImage src={logo} alt={name} />
        {rating !== undefined && (
          <RatingRow>
            <Rate value={rating} allowHalf disabled style={{ fontSize: 12 }} />
            <RatingValue>{rating} / 5</RatingValue>
          </RatingRow>
        )}
      </LogoSection>

      <DetailsSection>
        <BankName>{name}</BankName>

        <RateRow>
          <RateChip $bg="rgba(0,119,255,0.06)" $color="#0066ee">
            <ChipLabel>Interest Rate</ChipLabel>
            <ChipValue $color="#0066ee">{interestRate}</ChipValue>
          </RateChip>
          {processingFee && (
            <RateChip $bg="rgba(245,158,11,0.06)" $color="#f59e0b">
              <ChipLabel>Processing Fee</ChipLabel>
              <ChipValue $color="#d97706">{processingFee}</ChipValue>
            </RateChip>
          )}
          {maxAmount && (
            <RateChip $bg="rgba(16,185,129,0.06)" $color="#10b981">
              <ChipLabel>Max Amount</ChipLabel>
              <ChipValue $color="#059669">{maxAmount}</ChipValue>
            </RateChip>
          )}
          {tenure && (
            <RateChip $bg="rgba(139,92,246,0.06)" $color="#8b5cf6">
              <ChipLabel>Tenure</ChipLabel>
              <ChipValue $color="#7c3aed">{tenure}</ChipValue>
            </RateChip>
          )}
        </RateRow>

        {suitedFor.length > 0 && (
          <TagList>
            {suitedFor.map((tag, i) => (
              <Tag key={i}>{tag}</Tag>
            ))}
          </TagList>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {benefits.slice(0, 2).map((b, i) => (
            <BenefitItem key={i}>
              <CheckCircleFilled />
              {b}
            </BenefitItem>
          ))}
        </div>
      </DetailsSection>

      <ActionsSection>
        <ApplyButton onClick={onApply}>Apply Now</ApplyButton>
        {onDetails && (
          <DetailsButton onClick={onDetails}>View Details</DetailsButton>
        )}
        {compareNode}
      </ActionsSection>
    </CardWrapper>
  );
};

export default PartnerCard;
