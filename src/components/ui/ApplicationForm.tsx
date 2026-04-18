import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Button, notification } from 'antd';
import {
  UserOutlined, MailOutlined, MobileOutlined, BankOutlined,
  DollarOutlined, HomeOutlined, EnvironmentOutlined, SendOutlined,
  CheckCircleFilled, SafetyCertificateOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { submitLead } from '../../services/leadService';

/* ─── Types ─── */

export interface ApplicationFormConfig {
  formTitle: string;
  formSubtitle?: string;
  productType: string;
  /** Email address that mailto will send to */
  recipientEmail?: string;
  leftPanel: {
    heading: string;
    subtext: string;
    benefits: string[];
  };
  /** Optional gradient override — CSS linear-gradient string */
  accentGradient?: string;
}




/* ─── Animations ─── */

const floatY = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50%       { transform: translateY(-18px) rotate(4deg); }
`;

const shimmerLine = keyframes`
  0%   { transform: translateX(-120%) rotate(-40deg); }
  100% { transform: translateX(120%) rotate(-40deg); }
`;

const pulseRing = keyframes`
  0%, 100% { opacity: 0.18; transform: scale(1); }
  50%       { opacity: 0.35; transform: scale(1.12); }
`;


const fadeSlideIn = keyframes`
  0% { opacity: 0; transform: translateY(16px); }
  100% { opacity: 1; transform: translateY(0); }
`;

/* ─── Styled Components ─── */

const SectionWrapper = styled.section`
  background: linear-gradient(160deg, #eef4fb 0%, #e8f0f9 50%, #f0f5fc 100%);
  padding: 80px 20px;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -40%;
    left: -20%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(0, 119, 182, 0.07) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    right: -15%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(0, 71, 255, 0.05) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }
`;

const FormCard = styled(motion.div)`
  width: 100%;
  max-width: 960px;
  display: flex;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.06);
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftPanel = styled.div<{ gradient?: string }>`
  width: 42%;
  flex-shrink: 0;
  background: ${({ gradient }) => gradient || 'linear-gradient(150deg, #0077b6 0%, #0047a0 60%, #023e8a 100%)'};
  padding: 52px 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;

  /* ── decorative orbs ── */
  .orb-1, .orb-2, .orb-3 {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
  }

  .orb-1 {
    width: 320px; height: 320px;
    top: -100px; right: -80px;
    background: radial-gradient(circle, rgba(100,180,255,0.18) 0%, transparent 70%);
    animation: ${pulseRing} 6s ease-in-out infinite;
  }

  .orb-2 {
    width: 220px; height: 220px;
    bottom: -60px; left: -40px;
    background: radial-gradient(circle, rgba(0,200,255,0.12) 0%, transparent 70%);
    animation: ${pulseRing} 8s ease-in-out infinite 1s;
  }

  .orb-3 {
    width: 140px; height: 140px;
    top: 30%; left: 20%;
    background: radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%);
    animation: ${pulseRing} 10s ease-in-out infinite 2s;
  }

  /* ── shimmer lines ── */
  .sl-1, .sl-2 {
    position: absolute;
    height: 1.5px;
    width: 180px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
    z-index: 0;
    pointer-events: none;
  }
  .sl-1 { top: 22%; right: 8%; animation: ${shimmerLine} 7s linear infinite; }
  .sl-2 { bottom: 28%; left: 4%; animation: ${shimmerLine} 11s linear infinite reverse; }

  /* ── floating glass circles ── */
  .gc-1, .gc-2, .gc-3 {
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.06);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255,255,255,0.14);
    z-index: 0;
    pointer-events: none;
  }
  .gc-1 { width: 100px; height: 100px; top: 12%; left: 12%; animation: ${floatY} 14s ease-in-out infinite; }
  .gc-2 { width: 70px;  height: 70px;  bottom: 18%; right: 18%; animation: ${floatY} 18s ease-in-out infinite reverse; }
  .gc-3 { width: 45px;  height: 45px;  top: 60%; left: 22%; animation: ${floatY} 11s ease-in-out infinite 1.5s; }

  @media (max-width: 768px) {
    width: 100%;
    padding: 36px 28px;
    /* Hide some heavy effects on mobile */
    .orb-3, .sl-1, .sl-2, .gc-1, .gc-2, .gc-3 { display: none; }
  }
`;

const LeftPanelInner = styled.div`
  position: relative;
  z-index: 1;
`;

const FloatingIcon = styled(motion.div)`
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 28px;
  font-size: 26px;
  color: white;

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    font-size: 20px;
    margin-bottom: 16px;
  }
`;

const PanelHeading = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 1.65rem;
  font-weight: 700;
  color: transparent;
  background: linear-gradient(135deg, #ffffff 0%, #b8d8ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.25;
  margin-bottom: 14px;

  @media (max-width: 768px) {
    font-size: 1.35rem;
  }
`;

const PanelSubtext = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.65;
  margin-bottom: 28px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
  }
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.92);
  line-height: 1.5;

  .benefit-icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.18);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
    font-size: 10px;
    color: #fff;
  }

  @media (max-width: 768px) {
    background: rgba(255, 255, 255, 0.12);
    border-radius: 20px;
    padding: 4px 12px 4px 8px;
    font-size: 0.78rem;

    .benefit-icon { width: 16px; height: 16px; }
  }
`;

const TrustBadge = styled.div`
  margin-top: 32px;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.85);

  .trust-icon {
    font-size: 20px;
    color: #fff;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

/* ─── Right (Form) Panel ─── */

const RightPanel = styled.div`
  flex: 1;
  background: #ffffff;
  padding: 52px 44px;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 32px 20px;
  }
`;

const FormHeader = styled.div`
  margin-bottom: 32px;

  h3 {
    font-family: 'Poppins', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 6px;
  }

  p {
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    color: #64748b;
    line-height: 1.6;
  }
`;

const ProgressDots = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 28px;

  span {
    height: 4px;
    border-radius: 2px;
    transition: all 0.3s ease;

    &:nth-child(1) {
      width: 32px;
      background: linear-gradient(90deg, #0077b6, #0047ff);
    }
    &:nth-child(2) {
      width: 24px;
      background: linear-gradient(90deg, #0077b6, #0047ff);
    }
    &:nth-child(3) {
      width: 16px;
      background: #e2e8f0;
    }
  }
`;

const FieldGrid = styled.div<{ cols?: number }>`
  display: grid;
  grid-template-columns: ${({ cols }) => cols === 2 ? '1fr 1fr' : '1fr'};
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FieldLabel = styled.label`
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
`;

const FieldWrapper = styled(motion.div)`
  margin-bottom: 18px;
  animation: ${fadeSlideIn} 0.4s ease both;
`;

const StyledInputWrap = styled.div`
  position: relative;

  .field-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #0077b6;
    font-size: 15px;
    z-index: 2;
    pointer-events: none;
  }

  input {
    width: 100%;
    height: 48px;
    padding: 0 16px 0 42px;
    font-family: 'Inter', sans-serif;
    font-size: 0.93rem;
    color: #0f172a;
    background: #f8fafc;
    border: 1.5px solid #e2e8f0;
    border-radius: 12px;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    -webkit-appearance: none;

    &::placeholder { color: #94a3b8; }

    &:hover {
      border-color: #93c5fd;
      background: #f0f7ff;
    }

    &:focus {
      border-color: #0077b6;
      background: #ffffff;
      box-shadow: 0 0 0 3px rgba(0, 119, 182, 0.1);
    }

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
  }
`;

const ErrorMsg = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  color: #ef4444;
  margin-top: 5px;
  margin-bottom: 0;
`;

const SubmitBtn = styled(Button) <{ $gradient?: string }>`
  && {
    width: 100%;
    height: 52px;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #ffffff;
    background: ${({ $gradient }) => $gradient || 'linear-gradient(135deg, #0077b6 0%, #0047ff 100%)'};
    background-size: 200% auto;
    border: none;
    border-radius: 14px;
    margin-top: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    letter-spacing: 0.02em;

    &:hover:not(:disabled) {
      background-position: right center;
      background: ${({ $gradient }) => $gradient || 'linear-gradient(135deg, #0047ff 0%, #0077b6 100%)'} !important;
      filter: ${({ $gradient }) => $gradient ? 'brightness(1.1)' : 'none'};
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
      color: #ffffff !important;
      border: none !important;
    }

    &:active { transform: translateY(0px); }

    &[disabled] {
      background: #94a3b8 !important;
      color: #ffffff !important;
      border: none !important;
      cursor: not-allowed;
    }

    .anticon { font-size: 17px; }
  }
`;

const Divider = styled.div`
  height: 1px;
  background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
  margin: 22px 0;
`;

/* ─── Helpers ─── */

const fieldVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.05, type: 'spring', stiffness: 120, damping: 18 }
  })
};


/* ─── Field Component ─── */

interface FieldProps {
  label: string;
  name: string;
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  pattern?: RegExp;
  optional?: boolean;
  animIndex?: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Field: React.FC<FieldProps> = ({
  label, icon, placeholder, type = 'text', maxLength, optional,
  animIndex = 0, value, onChange, error, name
}) => (
  <FieldWrapper custom={animIndex} variants={fieldVariant} initial="hidden" animate="visible">
    <FieldLabel htmlFor={name}>
      {label}
      {optional && <span style={{ color: '#94a3b8', fontWeight: 400, textTransform: 'none', marginLeft: 4 }}>(optional)</span>}
    </FieldLabel>
    <StyledInputWrap>
      <span className="field-icon">{icon}</span>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
    </StyledInputWrap>
    {error && <ErrorMsg>{error}</ErrorMsg>}
  </FieldWrapper>
);

/* ─── Main Component ─── */

const ApplicationForm: React.FC<ApplicationFormConfig> = ({
  formTitle,
  formSubtitle = "Fill in your details and we'll get back to you shortly.",
  productType,
  leftPanel,
  accentGradient
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [fields, setFields] = useState<Record<string, string>>({
    firstName: '', middleName: '', lastName: '', email: '',
    mobileNumber: '', currentCompany: '', monthlySalary: '',
    netTakeHome: '', bankingDetails: '', location: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields(f => ({ ...f, [name]: e.target.value }));
    setErrors(err => ({ ...err, [name]: '' }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!fields.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!fields.lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!fields.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) newErrors.email = 'Please enter a valid email';
    if (!fields.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile Number is required';
    else if (!/^[6-9]\d{9}$/.test(fields.mobileNumber)) newErrors.mobileNumber = 'Enter a valid 10-digit mobile number';
    if (!fields.currentCompany.trim()) newErrors.currentCompany = 'Company Name is required';
    if (!fields.location.trim()) newErrors.location = 'Location is required';
    if (!fields.monthlySalary.trim()) newErrors.monthlySalary = 'Monthly Salary is required';
    else if (!/^\d+$/.test(fields.monthlySalary)) newErrors.monthlySalary = 'Enter a valid amount';
    if (!fields.netTakeHome.trim()) newErrors.netTakeHome = 'Net Take Home is required';
    else if (!/^\d+$/.test(fields.netTakeHome)) newErrors.netTakeHome = 'Enter a valid amount';
    if (!fields.bankingDetails.trim()) newErrors.bankingDetails = 'Banking Details are required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await submitLead({
        first_name: fields.firstName.trim(),
        middle_name: fields.middleName?.trim() || undefined,
        last_name: fields.lastName.trim(),
        email_id: fields.email.trim(),
        mobile_no: fields.mobileNumber.trim(),
        company_name: fields.currentCompany.trim(),
        custom_location: fields.location.trim(),
        custom_monthly_salary: fields.monthlySalary.trim(),
        custom_net_take_home: fields.netTakeHome.trim(),
        custom_bank_details: fields.bankingDetails.trim(),
        custom_product_type: productType,
      });

      notification.success({
        message: 'Application Submitted!',
        description:
          `Thank you! Your ${productType} application has been received. Our team will contact you within 24 hours.`,
        duration: 8,
      });

      setFields({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        currentCompany: '',
        monthlySalary: '',
        netTakeHome: '',
        bankingDetails: '',
        location: '',
      });
    } catch (err) {
      notification.error({
        message: 'Submission Failed',
        description:
          'Something went wrong while submitting your application. Please try again or contact us directly.',
        duration: 8,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionWrapper>
      <FormCard
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        {/* ─── Left Panel ─── */}
        <LeftPanel gradient={accentGradient}>
          <div className="orb-1" />
          <div className="orb-2" />
          <div className="orb-3" />
          <div className="sl-1" />
          <div className="sl-2" />
          <div className="gc-1" />
          <div className="gc-2" />
          <div className="gc-3" />
          <LeftPanelInner>
            <FloatingIcon
              animate={{ y: [0, -6, 0], rotate: [0, 4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <SendOutlined />
            </FloatingIcon>

            <PanelHeading>{leftPanel.heading}</PanelHeading>
            <PanelSubtext>{leftPanel.subtext}</PanelSubtext>

            <BenefitsList>
              {leftPanel.benefits.map((b, i) => (
                <BenefitItem key={i}>
                  <span className="benefit-icon"><CheckCircleFilled /></span>
                  {b}
                </BenefitItem>
              ))}
            </BenefitsList>

            <TrustBadge>
              <SafetyCertificateOutlined className="trust-icon" />
              <span>Your data is encrypted and secure. We never share your personal information.</span>
            </TrustBadge>
          </LeftPanelInner>
        </LeftPanel>

        {/* ─── Right Panel (Form) ─── */}
        <RightPanel>
          <FormHeader>
            <h3>{formTitle}</h3>
            <p>{formSubtitle}</p>
          </FormHeader>
          <ProgressDots><span /><span /><span /></ProgressDots>

          <form onSubmit={handleSubmit} noValidate>
            {/* Name row */}
            <FieldGrid cols={2}>
              <Field
                name="firstName" label="First Name" icon={<UserOutlined />}
                placeholder="First name" required animIndex={0}
                value={fields.firstName} onChange={update('firstName')} error={errors.firstName}
              />
              <Field
                name="middleName" label="Middle Name" icon={<UserOutlined />}
                placeholder="Middle name" optional animIndex={1}
                value={fields.middleName} onChange={update('middleName')}
              />
            </FieldGrid>

            <Field
              name="lastName" label="Last Name" icon={<UserOutlined />}
              placeholder="Last name" required animIndex={2}
              value={fields.lastName} onChange={update('lastName')} error={errors.lastName}
            />

            <Divider />

            <Field
              name="email" label="Email Address" icon={<MailOutlined />}
              placeholder="yourname@email.com" type="email" required animIndex={3}
              value={fields.email} onChange={update('email')} error={errors.email}
            />

            <Field
              name="mobileNumber" label="Mobile Number" icon={<MobileOutlined />}
              placeholder="10-digit mobile number" maxLength={10} required animIndex={4}
              value={fields.mobileNumber} onChange={update('mobileNumber')} error={errors.mobileNumber}
            />

            <FieldGrid cols={2}>
              <Field
                name="currentCompany" label="Current Company" icon={<HomeOutlined />}
                placeholder="Company name" required animIndex={5}
                value={fields.currentCompany} onChange={update('currentCompany')} error={errors.currentCompany}
              />
              <Field
                name="location" label="Location" icon={<EnvironmentOutlined />}
                placeholder="City / State" required animIndex={6}
                value={fields.location} onChange={update('location')} error={errors.location}
              />
            </FieldGrid>

            <Divider />

            <FieldGrid cols={2}>
              <Field
                name="monthlySalary" label="Monthly Salary (₹)" icon={<DollarOutlined />}
                placeholder="e.g. 50000" type="number" required animIndex={7}
                value={fields.monthlySalary} onChange={update('monthlySalary')} error={errors.monthlySalary}
              />
              <Field
                name="netTakeHome" label="Net Take Home (₹)" icon={<DollarOutlined />}
                placeholder="e.g. 42000" type="number" required animIndex={8}
                value={fields.netTakeHome} onChange={update('netTakeHome')} error={errors.netTakeHome}
              />
            </FieldGrid>

            <Field
              name="bankingDetails" label="Banking Details" icon={<BankOutlined />}
              placeholder="Bank name and account number" required animIndex={9}
              value={fields.bankingDetails} onChange={update('bankingDetails')} error={errors.bankingDetails}
            />

            <SubmitBtn
              htmlType="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
              icon={<SendOutlined />}
              $gradient={accentGradient}
            >
              {isSubmitting ? 'Submitting…' : 'Submit Application'}
            </SubmitBtn>
          </form>
        </RightPanel>
      </FormCard>
    </SectionWrapper>
  );
};

export default ApplicationForm;
