import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Animation variants
export const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const slideVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

// Keyframe animations
const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

// Styled components
export const AnimatedSection = styled(motion.section)`
  position: relative;
`;

export const GradientText = styled.span`
  background: linear-gradient(135deg, #0094d9 0%, #0077b6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
`;

export const GlassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-5px);
  }
`;

export const HoverCard = styled(motion.div)`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::after {
    left: 100%;
  }
`;

export const ShimmerButton = styled(motion.button)`
  position: relative;
  padding: 0.8rem 2rem;
  background: linear-gradient(135deg, #0094d9 0%, #0077b6 100%);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1.1rem;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: ${shimmer} 2s infinite;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 148, 217, 0.3);
  }
`;

export const FloatingElement = styled(motion.div)`
  animation: ${float} 3s ease-in-out infinite;
`;

export const ScrollReveal = styled(motion.div)`
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AnimatedCounter = styled(motion.span)`
  display: inline-block;
  font-weight: bold;
  color: #0094d9;
`;

export const PulseCircle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: rgba(0, 148, 217, 0.2);
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      transform: scale(0.95);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.8;
    }
    100% {
      transform: scale(0.95);
      opacity: 0.5;
    }
  }
`;
