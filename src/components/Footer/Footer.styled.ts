import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';

export const FooterWrapper = styled.footer`
  background-color: var(--color-footer-bg);
  border-top: 1px solid var(--color-neutral-border);
  font-family: "Carattere", cursive;
  margin: 0 -2rem;
  padding: 0 2rem;
`;

export const FooterText = styled.span`
  font-family: "Carattere", cursive;
  font-size: 2rem;
  color: var(--color-text-primary);
`;

export const HeartIcon = styled(FaHeart)`
  color: var(--color-red-light-text);
  vertical-align: middle;
  margin-left: 0.4rem;
`;
