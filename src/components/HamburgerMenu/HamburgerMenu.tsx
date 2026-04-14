import { useState } from 'react';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import logo from '../../assets/11401354.png';
import { Logo, LogoWrapper, SiteTitle } from '../Header/Header.styled';
import { ThemeSwitch } from '../AppSwitch/AppSwitch';
import SearchBar from '../SearchBar/SearchBar';
import { LANGUAGES } from '../../utils/constants';
import {
  AboutLink,
  CloseButton,
  MenuButton,
  ModeLabel,
  Overlay,
  OverlayHeader,
  Row,
  Section,
} from './HamburgerMenu.styled';

const HamburgerMenu = () => {
  const { t, i18n } = useTranslation();
  const { mode, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  const handleChange = (e: SelectChangeEvent) => {
    i18n.changeLanguage(e.target.value);
  };

  const close = () => setOpen(false);

  return (
    <>
      <MenuButton onClick={() => setOpen((v) => !v)} aria-label="menu">
        {open ? <FaTimes /> : <FaBars />}
      </MenuButton>

      <Overlay $open={open}>
        <OverlayHeader>
          <LogoWrapper href="/" onClick={close}>
            <Logo src={logo} alt="logo" />
            <SiteTitle>{t('header.title')}</SiteTitle>
          </LogoWrapper>
          <CloseButton onClick={close} aria-label="close menu">
            <FaTimes />
          </CloseButton>
        </OverlayHeader>

        <Section>
          <Row>
            <ThemeSwitch checked={mode === 'dark'} onChange={toggle} />
            <ModeLabel>
              {mode === 'dark' ? t('header.dark') : t('header.light')}
            </ModeLabel>
          </Row>
        </Section>

        <Section>
          <SearchBar onSubmit={close} compact />
        </Section>

        <Section>
          <Select
            value={i18n.resolvedLanguage ?? 'en'}
            onChange={handleChange}
            size="small"
            variant="outlined"
            MenuProps={{
              slotProps: {
                paper: {
                  sx: {
                    backgroundColor: 'var(--color-header-bg)',
                    color: 'var(--color-text-primary)',
                  },
                },
              },
            }}
            sx={{
              width: '100%',
              color: 'var(--color-text-primary)',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--color-neutral-border)',
              },
              '& .MuiSvgIcon-root': { color: 'var(--color-text-primary)' },
            }}
          >
            {LANGUAGES.map(({ code, label }) => (
              <MenuItem key={code} value={code}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </Section>

        <Section>
          <AboutLink href="/about" onClick={close}>
            {t('footer.about')}
          </AboutLink>
        </Section>
      </Overlay>
    </>
  );
};

export default HamburgerMenu;
