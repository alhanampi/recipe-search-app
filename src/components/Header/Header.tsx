import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import { FaHeart } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import logo from '../../assets/11401354.png';
import { Controls, FavsLink, Logo, LogoWrapper, SiteTitle } from './Header.styled';
import { ThemeSwitch } from '../AppSwitch/AppSwitch';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import { LANGUAGES } from '../../utils/constants';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { mode, toggle } = useTheme();

  const handleChange = (e: SelectChangeEvent) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          backgroundColor: 'var(--color-header-bg)',
          borderBottom: '1px solid var(--color-neutral-border)',
          transition: 'background-color 0.3s ease',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <LogoWrapper href="/">
            <Logo src={logo} alt="logo" />
            <SiteTitle>{t('header.title')}</SiteTitle>
          </LogoWrapper>

          <Controls>
            <FavsLink href="/favs">
              <FaHeart />
              {t('favs.link')}
            </FavsLink>
            <ThemeSwitch checked={mode === 'dark'} onChange={toggle} />
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
                minWidth: 130,
                ml: 1,
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
          </Controls>

          <HamburgerMenu />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
