import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useFavorites } from '../../context/FavoritesContext';
import { FavBtn, InlineFavBtn } from './FavoriteButton.styled';

interface Props {
  recipe: any;
  variant?: 'overlay' | 'inline';
}

const FavoriteButton = ({ recipe, variant = 'overlay' }: Props) => {
  const { t } = useTranslation();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [modalOpen, setModalOpen] = useState(false);

  const active = isFavorite(recipe.id);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (active) {
      setModalOpen(true);
    } else {
      addFavorite(recipe);
    }
  };

  const handleConfirmRemove = () => {
    removeFavorite(recipe.id);
    setModalOpen(false);
  };

  const Btn = variant === 'inline' ? InlineFavBtn : FavBtn;

  const title = recipe.title
    ? recipe.title.charAt(0).toUpperCase() + recipe.title.slice(1)
    : '';

  return (
    <>
      <Btn $active={active} onClick={handleClick} aria-label={active ? 'remove from favorites' : 'add to favorites'}>
        {active ? <FaHeart /> : <FaRegHeart />}
      </Btn>

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        slotProps={{
          backdrop: {
            sx: { backdropFilter: 'blur(4px)', backgroundColor: 'rgba(0,0,0,0.35)' },
          },
          paper: {
            sx: {
              borderRadius: '16px',
              backgroundColor: 'var(--color-card-bg)',
              color: 'var(--color-text-primary)',
              padding: '1.75rem 1.5rem 1.5rem',
              maxWidth: 360,
              width: '100%',
              boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
              border: '1px solid var(--color-neutral-border)',
            },
          },
        }}
      >
        {/* icon */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1.5 }}>
          <Box sx={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            backgroundColor: '#fee2e2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <FaHeart style={{ fontSize: '1.4rem', color: '#ef4444' }} />
          </Box>
        </Box>

        {/* title */}
        <Typography
          variant="h6"
          sx={{ textAlign: 'center', fontWeight: 700, mb: 0.75, color: 'var(--color-text-primary)', fontSize: '1.1rem' }}
        >
          {t('favs.removeTitle')}
        </Typography>

        {/* recipe name */}
        {title && (
          <Typography
            variant="body2"
            sx={{ textAlign: 'center', color: 'var(--color-text-muted)', mb: 2, lineHeight: 1.5 }}
          >
            {title}
          </Typography>
        )}

        {/* divider */}
        <Box sx={{ borderTop: '1px solid var(--color-neutral-border)', mx: -1.5, mb: 1.5 }} />

        {/* actions */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          <Button
            onClick={handleConfirmRemove}
            fullWidth
            variant="contained"
            disableElevation
            sx={{
              backgroundColor: '#ef4444',
              color: '#fff',
              borderRadius: '2rem',
              padding: '0.6rem',
              fontWeight: 700,
              textTransform: 'none',
              fontSize: '0.9rem',
              '&:hover': { backgroundColor: '#dc2626' },
            }}
          >
            {t('favs.removeConfirm')}
          </Button>
          <Button
            onClick={() => setModalOpen(false)}
            fullWidth
            variant="text"
            sx={{
              color: 'var(--color-text-muted)',
              borderRadius: '2rem',
              padding: '1rem',
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '0.9rem',
              '&:hover': { backgroundColor: 'var(--color-neutral-border)' },
            }}
          >
            {t('favs.removeCancel')}
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

export default FavoriteButton;
