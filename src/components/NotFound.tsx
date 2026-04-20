import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0b0f1a;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  padding: 24px;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 60px 48px;
  text-align: center;
  max-width: 520px;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
`;

const ErrorCode = styled.div`
  font-size: 96px;
  font-weight: 700;
  color: #e2e8f0;
  line-height: 1;
  margin-bottom: 16px;
  letter-spacing: -2px;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 600;
  color: #f8fafc;
  margin: 0 0 12px 0;
`;

const Message = styled.p`
  color: #94a3b8;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 32px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
  background: #6366f1;
  color: white;
  padding: 12px 26px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.25s ease;
  border: none;

  &:hover {
    background: #e6e5ee;
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled(Link)`
  background: transparent;
  color: #cbd5f5;
  padding: 12px 26px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.25s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    color: #ffffff;
  }
`;

const SupportText = styled.p`
  margin-top: 32px;
  color: #64748b;
  font-size: 13px;

  a {
    color: #a5b4fc;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const NotFound = () => {
  return (
    <Container>
      <Card>
        <ErrorCode>404</ErrorCode>
        <Title>Page not found</Title>
        <Message>
          The page you’re looking for doesn’t exist or has been moved.
        </Message>

        <ButtonGroup>
          <PrimaryButton to="/">
            Back to home
          </PrimaryButton>
          <SecondaryButton to="/about-us">
            About us
          </SecondaryButton>
        </ButtonGroup>

        <SupportText>
          Need help? Call <a href="tel:+919841002005">+91 98410 02005</a>
        </SupportText>
      </Card>
    </Container>
  );
};

export default NotFound;