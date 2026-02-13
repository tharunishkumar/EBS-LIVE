import React from 'react';
import styled from 'styled-components';
import { Steps, Collapse, Rate } from 'antd';
import propertyLoanImg from '../../assets/images/services/property-loan.jpg';

const { Panel } = Collapse;

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
`;

const HeroSection = styled.section`
  height: 60vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
              url(${propertyLoanImg}) no-repeat center;
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
  background: linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%);
  padding: 30px;
  border-radius: 10px;
  color: white;
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
    background: #2193b0;
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
  background: linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%);
  color: white;
  border: none;
  padding: 15px 40px;
  font-size: 1.1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(33, 147, 176, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const LoanAgainstProperty: React.FC = () => {
  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <Title>Loan Against Property</Title>
          <Subtitle>Unlock the value of your property with attractive loan options</Subtitle>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <RateCard>
          <FeatureTitle>Loan Against Property Starting at</FeatureTitle>
          <RateValue>9.5% p.a.*</RateValue>
          <RateDescription>*Terms and conditions apply</RateDescription>
        </RateCard>

        <SectionTitle>Why Choose LAP with EBS?</SectionTitle>
        <Grid>
          <FeatureCard>
            <FeatureTitle>High Loan Amount</FeatureTitle>
            <FeatureDescription>
              Get up to 70% of your property's market value as loan amount
              with flexible repayment options up to 15 years.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>Competitive Rates</FeatureTitle>
            <FeatureDescription>
              Enjoy some of the lowest interest rates in the market with
              transparent pricing and no hidden charges.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>Multiple Properties</FeatureTitle>
            <FeatureDescription>
              Residential, commercial, or industrial properties - we accept
              various types of properties as collateral.
            </FeatureDescription>
          </FeatureCard>
        </Grid>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Key Features</SectionTitle>
        <FeaturesList>
          <FeatureItem>Loan up to ₹10 Crore</FeatureItem>
          <FeatureItem>Tenure up to 15 years</FeatureItem>
          <FeatureItem>Quick Processing</FeatureItem>
          <FeatureItem>Minimal Documentation</FeatureItem>
          <FeatureItem>Flexible Repayment Options</FeatureItem>
          <FeatureItem>Part-Payment Facility</FeatureItem>
          <FeatureItem>Balance Transfer Option</FeatureItem>
          <FeatureItem>Doorstep Service</FeatureItem>
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
                title: 'Application',
                description: 'Submit your loan application with basic details'
              },
              {
                title: 'Document Verification',
                description: 'Submit property and income documents'
              },
              {
                title: 'Property Evaluation',
                description: 'Technical and legal assessment of property'
              },
              {
                title: 'Loan Approval',
                description: 'Loan approval and offer letter generation'
              },
              {
                title: 'Disbursement',
                description: 'Property mortgage and loan disbursement'
              }
            ]}
          />
        </TimelineContainer>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Frequently Asked Questions</SectionTitle>
        <FAQContainer>
          <Collapse>
            <Panel header="What types of properties are accepted?" key="1">
              We accept various types of properties including:
              - Residential properties
              - Commercial properties
              - Industrial properties
              - Mixed-use properties
              The property should be legally clear and marketable.
            </Panel>
            <Panel header="What is the maximum loan amount available?" key="2">
              You can get up to 70% of your property's market value as loan amount.
              The maximum loan amount can go up to ₹10 Crore, depending on the
              property value and your repayment capacity.
            </Panel>
            <Panel header="What documents are required?" key="3">
              Required documents include:
              - Property documents
              - Income proof
              - Identity and address proof
              - Bank statements
              - Business/professional proof if self-employed
            </Panel>
            <Panel header="Can I prepay the loan?" key="4">
              Yes, you can make part-payments or fully prepay your loan. Part-payment
              can be made up to 25% of the principal amount annually without any charges.
            </Panel>
            <Panel header="How long is the processing time?" key="5">
              The typical processing time is 7-14 working days, subject to document
              submission and property evaluation. We strive to provide the fastest
              possible service while ensuring thorough verification.
            </Panel>
          </Collapse>
        </FAQContainer>
      </ContentSection>

      <CTASection>
        <SectionTitle>Get Your Property Loan Today</SectionTitle>
        <CTAButton>Apply Now</CTAButton>
      </CTASection>
    </PageContainer>
  );
};

export default LoanAgainstProperty;
