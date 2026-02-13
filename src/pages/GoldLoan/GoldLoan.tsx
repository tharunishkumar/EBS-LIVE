import React from 'react';
import styled from 'styled-components';
import { Steps, Collapse, Rate } from 'antd';
import goldLoanImg from '../../assets/images/services/gold-loan.jpg';

const { Panel } = Collapse;

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
`;

const HeroSection = styled.section`
  height: 60vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
              url(${goldLoanImg}) no-repeat center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  margin-top: 70px;
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const ContentSection = styled.section`
  padding: 80px 5%;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #1a1a1a;
  margin-bottom: 2rem;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const FeatureCard = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: #1a1a1a;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const RateCard = styled.div`
  background: linear-gradient(135deg, #ffd700 0%, #ffb900 100%);
  padding: 30px;
  border-radius: 10px;
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 30px;
`;

const RateValue = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 10px 0;
`;

const RateDescription = styled.p`
  font-size: 1.1rem;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const FeatureItem = styled.li`
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 15px;
  color: #333;
  font-size: 1.1rem;

  &:before {
    content: "✓";
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: #4CAF50;
    color: white;
    border-radius: 50%;
    flex-shrink: 0;
  }
`;

const TimelineContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
`;

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;

  .ant-collapse {
    background: transparent;
    border: none;
  }

  .ant-collapse-item {
    margin-bottom: 16px;
    border: 1px solid #eee;
    border-radius: 10px !important;
    overflow: hidden;
  }

  .ant-collapse-header {
    font-size: 1.1rem;
    padding: 16px 24px !important;
  }

  .ant-collapse-content {
    border-top: 1px solid #eee;
  }
`;

const CTASection = styled.section`
  background-color: #f8f9fa;
  padding: 60px 5%;
  text-align: center;
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, #ffd700 0%, #ffb900 100%);
  color: #1a1a1a;
  border: none;
  padding: 15px 40px;
  font-size: 1.1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const GoldLoan: React.FC = () => {
  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <Title>Gold Loan</Title>
          <Subtitle>Quick loans against your gold jewelry at competitive rates</Subtitle>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <RateCard>
          <FeatureTitle>Current Gold Loan Interest Rate</FeatureTitle>
          <RateValue>7.5% p.a.</RateValue>
          <RateDescription>*Terms and conditions apply</RateDescription>
        </RateCard>

        <SectionTitle>Why Choose Our Gold Loan?</SectionTitle>
        <Grid>
          <FeatureCard>
            <FeatureTitle>High Value</FeatureTitle>
            <FeatureDescription>
              Get up to 75% of your gold's current market value as loan amount
              with flexible repayment options.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>Quick Processing</FeatureTitle>
            <FeatureDescription>
              Get your loan approved within 30 minutes with minimal
              documentation requirements.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>Secure Storage</FeatureTitle>
            <FeatureDescription>
              Your gold is stored in highly secure bank lockers with
              comprehensive insurance coverage.
            </FeatureDescription>
          </FeatureCard>
        </Grid>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Key Features</SectionTitle>
        <FeaturesList>
          <FeatureItem>Loan up to ₹50 Lakhs</FeatureItem>
          <FeatureItem>Competitive Interest Rates</FeatureItem>
          <FeatureItem>Minimal Documentation</FeatureItem>
          <FeatureItem>Quick Disbursement</FeatureItem>
          <FeatureItem>Flexible Repayment Options</FeatureItem>
          <FeatureItem>No Income Proof Required</FeatureItem>
          <FeatureItem>Transparent Valuation</FeatureItem>
          <FeatureItem>24x7 Customer Support</FeatureItem>
        </FeaturesList>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Loan Process</SectionTitle>
        <TimelineContainer>
          <Steps
            direction="vertical"
            current={-1}
            items={[
              {
                title: 'Visit Branch',
                description: 'Visit our nearest branch with your gold and documents'
              },
              {
                title: 'Gold Assessment',
                description: 'Expert evaluation of your gold\'s purity and value'
              },
              {
                title: 'Documentation',
                description: 'Complete simple documentation process'
              },
              {
                title: 'Loan Approval',
                description: 'Get instant loan approval'
              },
              {
                title: 'Disbursement',
                description: 'Receive loan amount instantly'
              }
            ]}
          />
        </TimelineContainer>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Frequently Asked Questions</SectionTitle>
        <FAQContainer>
          <Collapse>
            <Panel header="What type of gold is accepted?" key="1">
              We accept gold jewelry of 18-24 karat purity. This includes gold ornaments,
              coins, and bars from reputed manufacturers. The gold should be hallmarked
              for easier processing.
            </Panel>
            <Panel header="What is the maximum loan amount available?" key="2">
              You can get up to 75% of your gold's current market value. The maximum
              loan amount can go up to ₹50 lakhs, depending on the quantity and quality
              of gold pledged.
            </Panel>
            <Panel header="What documents are required?" key="3">
              You need to provide:
              - Valid ID proof (Aadhaar/PAN/Passport)
              - Address proof
              - Recent passport size photograph
              - Original gold purchase invoice (if available)
            </Panel>
            <Panel header="How is the gold valued?" key="4">
              Our expert appraisers use advanced testing methods to determine the purity
              of your gold. The loan value is calculated based on the current market rate
              and the purity of your gold.
            </Panel>
            <Panel header="What are the repayment options?" key="5">
              We offer flexible repayment options including:
              - Monthly interest payments with principal at end of tenure
              - EMI payments
              - Bullet payment at end of tenure
              The loan tenure can be up to 24 months.
            </Panel>
          </Collapse>
        </FAQContainer>
      </ContentSection>

      <CTASection>
        <SectionTitle>Get an Instant Gold Loan Today</SectionTitle>
        <CTAButton>Apply Now</CTAButton>
      </CTASection>
    </PageContainer>
  );
};

export default GoldLoan;
