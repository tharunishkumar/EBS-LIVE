import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Select, notification } from 'antd';
import {
  UserOutlined, MailOutlined, MobileOutlined, BankOutlined,
  DollarOutlined, HomeOutlined, AppstoreOutlined, EnvironmentOutlined,
  SendOutlined, CheckCircleFilled, SafetyCertificateOutlined,
  ThunderboltOutlined, TeamOutlined, StarOutlined, RocketOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import loginBg from '../../assets/login-bg.jpg';

/* ─── Animations ─── */

const pulse = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.2); }
`;

/* ─── Layout ─── */

const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f3f4f6;

  @media (max-width: 968px) { flex-direction: column; }
`;

/* ─── Left — Form Section ─── */

const LeftSection = styled(motion.section)`
  flex: 1;
  background: linear-gradient(150deg, #003494 0%, #0055cc 50%, #0077ff 100%);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 80px 2rem 2rem;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url(${loginBg}) center/cover no-repeat;
    opacity: 0.04;
    z-index: 0;
  }

  @media (max-width: 968px) {
    min-height: auto;
    padding: 80px 1.5rem 2rem;
  }
`;

/* floating particles */
const Particle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: rgba(255,255,255,0.18);
  pointer-events: none;
`;

const GlowOrb = styled.div<{ $size: number; $top: string; $left: string; $delay: string }>`
  position: absolute;
  width: ${p => p.$size}px;
  height: ${p => p.$size}px;
  top: ${p => p.$top};
  left: ${p => p.$left};
  border-radius: 50%;
  background: radial-gradient(circle, rgba(100,200,255,0.12) 0%, transparent 70%);
  animation: ${pulse} 4s ${p => p.$delay} ease-in-out infinite;
  pointer-events: none;
`;

/* ─── Form Card ─── */

const FormCard = styled(motion.div)`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 560px;
  background: rgba(255,255,255,0.97);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  padding: 40px 44px;
  box-shadow: 0 24px 72px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.25);

  @media (max-width: 600px) { padding: 28px 20px; border-radius: 18px; }
`;

const FormTitle = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 1.75rem;
  font-weight: 800;
  text-align: center;
  background: linear-gradient(135deg, #003494 0%, #0077ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 4px;
`;

const FormSub = styled.p`
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 24px;
  line-height: 1.5;
`;

const ProgressBar = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 24px;
  justify-content: center;

  span {
    height: 4px;
    border-radius: 4px;
    &:nth-child(1) { width: 36px; background: linear-gradient(90deg, #003494, #0077ff); }
    &:nth-child(2) { width: 24px; background: linear-gradient(90deg, #0055cc, #0077ff); }
    &:nth-child(3) { width: 16px; background: #dce7ff; }
  }
`;

/* ─── Field ─── */

const FieldGrid = styled.div<{ $cols?: number }>`
  display: grid;
  grid-template-columns: ${p => p.$cols === 2 ? '1fr 1fr' : '1fr'};
  gap: 12px;

  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

const FieldWrap = styled.div`
  margin-bottom: 12px;
`;

const Label = styled.label`
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 5px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const InputWrap = styled.div`
  position: relative;

  .field-icon {
    position: absolute;
    left: 12px; top: 50%;
    transform: translateY(-50%);
    color: #0055cc;
    font-size: 14px;
    z-index: 2;
    pointer-events: none;
  }

  input {
    width: 100%;
    height: 40px;
    padding: 0 14px 0 38px;
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    color: #0f172a;
    background: #f8fafc;
    border: 1.5px solid #e2e8f0;
    border-radius: 10px;
    outline: none;
    transition: all 0.22s ease;

    &::placeholder { color: #94a3b8; }
    &:hover { border-color: #93c5fd; background: #f0f7ff; }
    &:focus {
      border-color: #0077ff;
      background: #fff;
      box-shadow: 0 0 0 3px rgba(0,119,255,0.1);
    }

    /* Remove number arrows */
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button { -webkit-appearance: none; }
  }

  /* antd select override */
  .ant-select {
    width: 100%;

    .ant-select-selector {
      height: 40px !important;
      padding-left: 38px !important;
      border-radius: 10px !important;
      border: 1.5px solid #e2e8f0 !important;
      background: #f8fafc !important;
      font-size: 0.875rem;

      .ant-select-selection-item,
      .ant-select-selection-placeholder { line-height: 38px !important; color: #94a3b8; }
    }

    &.ant-select-focused .ant-select-selector,
    &:hover .ant-select-selector {
      border-color: #0077ff !important;
      box-shadow: 0 0 0 3px rgba(0,119,255,0.1) !important;
      background: #fff !important;
    }
  }
`;

const ErrMsg = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: #ef4444;
  margin: 4px 0 0;
`;

const Divider = styled.div`
  height: 1px;
  background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
  margin: 14px 0;
`;

const SubmitBtn = styled(motion.button)`
  width: 100%;
  height: 48px;
  background: linear-gradient(135deg, #003494 0%, #0077ff 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 10px;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  transition: box-shadow 0.3s ease;
  letter-spacing: 0.02em;

  &:hover { box-shadow: 0 8px 28px rgba(0,71,255,0.4); }
  &:disabled { background: #94a3b8; cursor: not-allowed; box-shadow: none; }
`;

/* ─── Right — Info Section ─── */

const RightSection = styled(motion.div)`
  flex: 1;
  background: linear-gradient(160deg, #f8fafc 0%, #eef4fb 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 3rem 3rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle at 1px 1px, #dde6f0 1px, transparent 0);
    background-size: 36px 36px;
    opacity: 0.5;
  }

  @media (max-width: 968px) { padding: 2rem 1.5rem; }
`;

const RightInner = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 460px;
`;

const SectionLabel = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #0077ff;
  margin-bottom: 8px;
`;

const SectionTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: clamp(1.5rem, 2.5vw, 2.1rem);
  font-weight: 800;
  color: #0f172a;
  line-height: 1.2;
  margin-bottom: 10px;
`;

const SectionSub = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 36px;
`;

const FeatureList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 28px;

  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

const FeatureItem = styled(motion.div)`
  background: #fff;
  border-radius: 16px;
  padding: 22px 20px;
  border: 1px solid #e8f0fb;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
  transition: all 0.25s ease;
  cursor: default;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 28px rgba(0,119,255,0.1);
    border-color: rgba(0,119,255,0.15);
  }

  .fi-icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    background: linear-gradient(135deg, #dbeafe, #eff6ff);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; color: #0077ff;
    margin-bottom: 14px;
  }

  h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 5px;
  }

  p {
    font-family: 'Inter', sans-serif;
    font-size: 0.82rem;
    color: #64748b;
    line-height: 1.55;
    margin: 0;
  }
`;

const InfoBadge = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 20px 24px;
  border: 1px solid #e8f0fb;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);

  h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 14px;
    display: flex; align-items: center; gap: 8px;
    .badge-icon { color: #0077ff; }
  }

  ul {
    list-style: none; padding: 0; margin: 0;
    display: flex; flex-direction: column; gap: 9px;

    li {
      display: flex; align-items: center; gap: 10px;
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem; color: #475569;

      .check { color: #0077ff; font-size: 13px; flex-shrink: 0; }
    }
  }
`;

/* ─── Field component ─── */

interface FProps {
  id: string; label: string; icon: React.ReactNode;
  placeholder: string; type?: string; maxLength?: number;
  optional?: boolean; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Field: React.FC<FProps> = ({ id, label, icon, placeholder, type = 'text', maxLength, optional, value, onChange, error }) => (
  <FieldWrap>
    <Label htmlFor={id}>
      {label}
      {optional && <span style={{ color: '#94a3b8', fontWeight: 400, textTransform: 'none', fontSize: '0.72rem', marginLeft: 4 }}>(optional)</span>}
    </Label>
    <InputWrap>
      <span className="field-icon">{icon}</span>
      <input id={id} name={id} type={type} placeholder={placeholder} maxLength={maxLength} value={value} onChange={onChange} autoComplete="off" />
    </InputWrap>
    {error && <ErrMsg>{error}</ErrMsg>}
  </FieldWrap>
);

/* ─── Main ─── */

const PRODUCT_OPTIONS = ['Personal Loan', 'Business Loan', 'Home Loan', 'Gold Loan', 'Loan Against Property', 'Health Insurance', 'Life Insurance', 'General Insurance', 'Credit Cards'];

const Apply: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fields, setFields] = useState<Record<string, string>>({
    firstName: '', middleName: '', lastName: '', email: '',
    mobileNumber: '', currentCompany: '', monthlySalary: '',
    netTakeHome: '', bankingDetails: '', location: '', productType: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields(f => ({ ...f, [name]: e.target.value }));
    setErrors(err => ({ ...err, [name]: '' }));
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!fields.firstName.trim()) errs.firstName = 'First Name is required';
    if (!fields.lastName.trim()) errs.lastName = 'Last Name is required';
    if (!fields.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = 'Please enter a valid email';
    if (!fields.mobileNumber.trim()) errs.mobileNumber = 'Mobile Number is required';
    else if (!/^[6-9]\d{9}$/.test(fields.mobileNumber)) errs.mobileNumber = 'Enter a valid 10-digit mobile number';
    if (!fields.currentCompany.trim()) errs.currentCompany = 'Company is required';
    if (!fields.location.trim()) errs.location = 'Location is required';
    if (!fields.monthlySalary.trim()) errs.monthlySalary = 'Monthly Salary is required';
    else if (!/^\d+$/.test(fields.monthlySalary)) errs.monthlySalary = 'Enter a valid amount';
    if (!fields.netTakeHome.trim()) errs.netTakeHome = 'Net Take Home is required';
    else if (!/^\d+$/.test(fields.netTakeHome)) errs.netTakeHome = 'Enter a valid amount';
    if (!fields.bankingDetails.trim()) errs.bankingDetails = 'Banking Details are required';
    if (!fields.productType) errs.productType = 'Please select a product type';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    const subject = encodeURIComponent(`${fields.productType} Application – ${fields.firstName} ${fields.lastName}`);
    const body = encodeURIComponent([
      `Product Type: ${fields.productType}`,
      ``,
      `── Personal Details ──`,
      `Name: ${fields.firstName}${fields.middleName ? ' ' + fields.middleName : ''} ${fields.lastName}`,
      `Email: ${fields.email}`,
      `Mobile: ${fields.mobileNumber}`,
      `Location: ${fields.location}`,
      ``,
      `── Financial Details ──`,
      `Current Company: ${fields.currentCompany}`,
      `Monthly Salary: ₹${fields.monthlySalary}`,
      `Net Take Home: ₹${fields.netTakeHome}`,
      `Banking Details: ${fields.bankingDetails}`,
      ``,
      `Please process this application.`,
    ].join('\n'));

    window.open(`mailto:info@ebsgroup.co.in?subject=${subject}&body=${body}`, '_blank');

    notification.success({
      message: 'Opening your mail client…',
      description: 'Your details are pre-filled. Just hit Send to submit your application!',
      duration: 6,
    });

    setFields({ firstName: '', middleName: '', lastName: '', email: '', mobileNumber: '', currentCompany: '', monthlySalary: '', netTakeHome: '', bankingDetails: '', location: '', productType: '' });
    setIsSubmitting(false);
  };

  /* random particles seeded so no re-render jitter */
  const particles = [
    { w: 8, h: 8, top: '15%', left: '10%' }, { w: 5, h: 5, top: '70%', left: '80%' },
    { w: 10, h: 10, top: '40%', left: '90%' }, { w: 6, h: 6, top: '85%', left: '20%' },
    { w: 7, h: 7, top: '25%', left: '55%' }, { w: 4, h: 4, top: '60%', left: '5%' },
    { w: 9, h: 9, top: '10%', left: '75%' }, { w: 5, h: 5, top: '50%', left: '40%' },
  ];

  return (
    <PageContainer>
      {/* ── Left: Form ── */}
      <LeftSection initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {/* decorative orbs */}
        <GlowOrb $size={320} $top="-10%" $left="-15%" $delay="0s" />
        <GlowOrb $size={260} $top="55%" $left="60%" $delay="1.5s" />

        {/* floating particles */}
        {particles.map((p, i) => (
          <Particle
            key={i}
            style={{ width: p.w, height: p.h, top: p.top, left: p.left }}
            animate={{ y: [0, -18, 0], opacity: [0.25, 0.7, 0.25] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          />
        ))}

        <FormCard
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.55, ease: 'easeOut' }}
        >
          <FormTitle>Apply Now</FormTitle>
          <FormSub>Fill in your details to get started with your application</FormSub>
          <ProgressBar><span /><span /><span /></ProgressBar>

          <form onSubmit={handleSubmit} noValidate>
            <FieldGrid $cols={2}>
              <Field id="firstName" label="First Name" icon={<UserOutlined />} placeholder="First name"
                value={fields.firstName} onChange={update('firstName')} error={errors.firstName} />
              <Field id="middleName" label="Middle Name" icon={<UserOutlined />} placeholder="Middle name (optional)" optional
                value={fields.middleName} onChange={update('middleName')} />
            </FieldGrid>

            <Field id="lastName" label="Last Name" icon={<UserOutlined />} placeholder="Last name"
              value={fields.lastName} onChange={update('lastName')} error={errors.lastName} />

            <FieldGrid $cols={2}>
              <Field id="email" label="Email" icon={<MailOutlined />} placeholder="email@example.com" type="email"
                value={fields.email} onChange={update('email')} error={errors.email} />
              <Field id="mobileNumber" label="Mobile Number" icon={<MobileOutlined />} placeholder="10-digit number" maxLength={10}
                value={fields.mobileNumber} onChange={update('mobileNumber')} error={errors.mobileNumber} />
            </FieldGrid>

            <FieldGrid $cols={2}>
              <Field id="currentCompany" label="Current Company" icon={<HomeOutlined />} placeholder="Company name"
                value={fields.currentCompany} onChange={update('currentCompany')} error={errors.currentCompany} />
              <Field id="location" label="Location" icon={<EnvironmentOutlined />} placeholder="City / State"
                value={fields.location} onChange={update('location')} error={errors.location} />
            </FieldGrid>

            <Divider />

            <FieldGrid $cols={2}>
              <Field id="monthlySalary" label="Monthly Salary (₹)" icon={<DollarOutlined />} placeholder="e.g. 50000" type="number"
                value={fields.monthlySalary} onChange={update('monthlySalary')} error={errors.monthlySalary} />
              <Field id="netTakeHome" label="Net Take Home (₹)" icon={<DollarOutlined />} placeholder="e.g. 42000" type="number"
                value={fields.netTakeHome} onChange={update('netTakeHome')} error={errors.netTakeHome} />
            </FieldGrid>

            <Field id="bankingDetails" label="Banking Details" icon={<BankOutlined />} placeholder="Bank name and account number"
              value={fields.bankingDetails} onChange={update('bankingDetails')} error={errors.bankingDetails} />

            {/* Product Type */}
            <FieldWrap>
              <Label htmlFor="productType">Product Type</Label>
              <InputWrap>
                <span className="field-icon"><AppstoreOutlined /></span>
                <Select
                  id="productType"
                  placeholder="Select a product type"
                  value={fields.productType || undefined}
                  onChange={(val: string) => { setFields(f => ({ ...f, productType: val })); setErrors(e => ({ ...e, productType: '' })); }}
                  style={{ width: '100%' }}
                  className="product-select"
                >
                  {PRODUCT_OPTIONS.map(opt => (
                    <Select.Option key={opt} value={opt}>{opt}</Select.Option>
                  ))}
                </Select>
              </InputWrap>
              {errors.productType && <ErrMsg>{errors.productType}</ErrMsg>}
            </FieldWrap>

            <SubmitBtn
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <SendOutlined />
              {isSubmitting ? 'Submitting…' : 'Submit Application'}
            </SubmitBtn>
          </form>
        </FormCard>
      </LeftSection>

      {/* ── Right: Info ── */}
      <RightSection
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.15 }}
      >
        <RightInner>
          <SectionLabel>Why EBS Finance</SectionLabel>
          <SectionTitle>Your Trusted Financial Partner</SectionTitle>
          <SectionSub>
            Discover the advantages of our comprehensive financial solutions — from loans and insurance to credit cards, we've got you covered.
          </SectionSub>

          <FeatureList>
            {[
              { icon: <ThunderboltOutlined />, title: 'Instant Processing', desc: 'Fast approvals with minimal documentation and paperless process.' },
              { icon: <TeamOutlined />, title: 'Expert Advisors', desc: 'Dedicated relationship managers to guide you every step of the way.' },
              { icon: <StarOutlined />, title: 'Best Rates', desc: 'Access competitive interest rates from 15+ trusted partner banks.' },
              { icon: <RocketOutlined />, title: 'Quick Disbursal', desc: 'Money in your account within 24-48 hours of approval.' },
            ].map((item, i) => (
              <FeatureItem
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.45 }}
              >
                <div className="fi-icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </FeatureItem>
            ))}
          </FeatureList>

          <InfoBadge>
            <h4>
              <SafetyCertificateOutlined className="badge-icon" />
              What you'll need to apply
            </h4>
            <ul>
              {[
                'PAN Card & Aadhaar Card',
                'Last 3 months salary slips',
                'Last 6 months bank statements',
                'Current company details & location',
                'Basic banking & account information',
              ].map((item, i) => (
                <li key={i}>
                  <CheckCircleFilled className="check" />
                  {item}
                </li>
              ))}
            </ul>
          </InfoBadge>
        </RightInner>
      </RightSection>
    </PageContainer>
  );
};

export default Apply;
