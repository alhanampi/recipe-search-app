import Toolbar from '@mui/material/Toolbar';
import { useTranslation } from 'react-i18next';
import { AboutLink, FooterWrapper, FooterText, HeartIcon } from './Footer.styled';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <FooterWrapper>
      <Toolbar>
        <FooterText>
          Pam @ 2026 with love <HeartIcon />
        </FooterText>
        <AboutLink href="/about">{t('footer.about')}</AboutLink>
      </Toolbar>
    </FooterWrapper>
  );
};

export default Footer;
