import React from 'react';
import styled from 'styled-components';
import { Steps, Collapse } from 'antd';
import homeLoanImg from '../../assets/images/services/home-loan.jpg';

const { Panel } = Collapse;

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
`;

const HeroSection = styled.section`
  height: 60vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
              url(${homeLoanImg}) no-repeat center;
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

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const BenefitItem = styled.li`
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
  background: linear-gradient(135deg, #0094d9 0%, #0077b6 100%);
  color: white;
  border: none;
  padding: 15px 40px;
  font-size: 1.1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 119, 182, 0.2);
  }

  &:active {
    transform: translateY(0);
    background-color: #333;
  }
`;

const HomeLoan: React.FC = () => {
  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <Title>Home Loan</Title>
          <Subtitle>Make your dream home a reality with attractive interest rates</Subtitle>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <SectionTitle>Why Choose Our Home Loan?</SectionTitle>
        <Grid>
          <FeatureCard>
            <FeatureTitle>Competitive Rates</FeatureTitle>
            <FeatureDescription>
              Get home loans starting at 8.50% p.a. with flexible
              repayment options up to 30 years.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>Quick Processing</FeatureTitle>
            <FeatureDescription>
              Fast approval process with minimal documentation
              and doorstep service for your convenience.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>High Loan Amount</FeatureTitle>
            <FeatureDescription>
              Finance up to 90% of your property value with
              loan amounts ranging from ₹10 lakhs to ₹5 crores.
            </FeatureDescription>
          </FeatureCard>
        </Grid>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Key Benefits</SectionTitle>
        <BenefitsList>
          <BenefitItem>No Pre-Payment Charges</BenefitItem>
          <BenefitItem>Doorstep Document Collection</BenefitItem>
          <BenefitItem>Quick Disbursement</BenefitItem>
          <BenefitItem>Minimal Processing Fee</BenefitItem>
          <BenefitItem>Balance Transfer Option</BenefitItem>
          <BenefitItem>Top-Up Loan Facility</BenefitItem>
          <BenefitItem>Property Search Services</BenefitItem>
          <BenefitItem>Legal Support</BenefitItem>
        </BenefitsList>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Application Process</SectionTitle>
        <TimelineContainer>
          <Steps
            direction="vertical"
            current={-1}
            items={[
              {
                title: 'Apply Online',
                description: 'Fill the online application form with basic details'
              },
              {
                title: 'Document Submission',
                description: 'Submit required documents for verification'
              },
              {
                title: 'Property Assessment',
                description: 'Technical and legal verification of the property'
              },
              {
                title: 'Loan Approval',
                description: 'Loan sanction and offer letter generation'
              },
              {
                title: 'Disbursement',
                description: 'Loan amount disbursed as per the payment schedule'
              }
            ]}
          />
        </TimelineContainer>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Frequently Asked Questions</SectionTitle>
        <FAQContainer>
          <Collapse>
            <Panel header="What is the maximum loan amount I can get?" key="1">
              The maximum loan amount depends on your income and property value. Generally,
              we finance up to 90% of the property value for properties up to ₹30 lakhs,
              80% for properties up to ₹75 lakhs, and 75% for properties above ₹75 lakhs.
            </Panel>
            <Panel header="What is the processing fee?" key="2">
              The processing fee is 0.5% of the loan amount or ₹10,000, whichever is lower.
              This fee covers the cost of processing your application and property evaluation.
            </Panel>
            <Panel header="Can I prepay my loan?" key="3">
              Yes, you can prepay your home loan partially or fully without any prepayment
              charges if you're paying from your own sources. Terms may vary for balance
              transfer cases.
            </Panel>
            <Panel header="What documents are required?" key="4">
              Required documents include identity proof, address proof, income documents
              (salary slips/ITR), bank statements, property documents, and photographs.
              Additional documents may be required based on the case.
            </Panel>
            <Panel header="How long does the process take?" key="5">
              The typical processing time is 7-10 working days from the submission of all
              required documents. This may vary based on property documentation and verification.
            </Panel>
          </Collapse>
        </FAQContainer>
      </ContentSection>

      <CTASection>
        <SectionTitle>Ready to Own Your Dream Home?</SectionTitle>
        <CTAButton>Apply Now</CTAButton>
      </CTASection>
    </PageContainer>
  );
};

export default HomeLoan;
