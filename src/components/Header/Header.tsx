import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import logo from '../../assets/11401354.png';
import { Logo, LogoWrapper } from './Header.styled';
import AppSwitch from '../AppSwitch/AppSwitch';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
  { code: 'fr', label: 'Français' },
];

const ThemeSwitch = styled(AppSwitch)(() => ({
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent('#fff')}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.7 5.8 5.8 0 006.6 6.7z"/></svg>')`,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent('#fff')}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
}));

const Header = () => {
  const { t, i18n } = useTranslation();
  const { mode, toggle } = useTheme();

  const handleChange = (e: SelectChangeEvent) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
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
        <LogoWrapper>
          <Logo src={logo} alt="logo" />
          <Typography
            variant="h6"
            component="h1"
            sx={{
              fontWeight: 500,
              fontFamily: '"Carattere", cursive',
              fontSize: '3rem',
              color: 'var(--color-text-primary)',
            }}
          >
            {t('header.title')}
          </Typography>
        </LogoWrapper>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
