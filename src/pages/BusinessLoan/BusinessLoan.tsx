import React from 'react';
import styled from 'styled-components';

const BusinessLoanContainer = styled.div`
  padding: 2rem;
`;

const BusinessLoan: React.FC = () => {
  return (
    <BusinessLoanContainer>
      <h1>Business Loan</h1>
      {/* Add your business loan content here */}
    </BusinessLoanContainer>
  );
};

export default BusinessLoan;
