import Toolbar from '@mui/material/Toolbar';
import { FooterWrapper, FooterText, HeartIcon } from './Footer.styled';

const Footer = () => {
  return (
    <FooterWrapper>
      <Toolbar>
        <FooterText>
          Pam @ 2026 with love <HeartIcon />
        </FooterText>
      </Toolbar>
    </FooterWrapper>
  );
};

export default Footer;
