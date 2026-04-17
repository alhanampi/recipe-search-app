import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import { useFavorites } from '../../context/FavoritesContext';
import {
  FavBtn,
  InlineFavBtn,
  StyledDialog,
  IconWrapper,
  IconCircle,
  ModalDivider,
  ActionsBox,
  ConfirmButton,
  CancelButton,
} from './FavoriteButton.styled';

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
      <Btn
        $active={active}
        onClick={handleClick}
        aria-label={active ? 'remove from favorites' : 'add to favorites'}
      >
        {active ? <FaHeart /> : <FaRegHeart />}
      </Btn>

      <StyledDialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        slotProps={{
          backdrop: {
            sx: {
              backdropFilter: 'blur(4px)',
              backgroundColor: 'rgba(0,0,0,0.35)',
            },
          },
        }}
      >
        <IconWrapper>
          <IconCircle>
            <FaHeart style={{ fontSize: '1.4rem', color: '#ef4444' }} />
          </IconCircle>
        </IconWrapper>

        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            mb: 0.75,
            color: 'var(--color-text-primary)',
            fontSize: '1.1rem',
          }}
        >
          {t('favs.removeTitle')}
        </Typography>

        {title && (
          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
              color: 'var(--color-text-muted)',
              mb: 2,
              lineHeight: 1.5,
            }}
          >
            {title}
          </Typography>
        )}

        <ModalDivider />

        <ActionsBox>
          <ConfirmButton
            onClick={handleConfirmRemove}
            fullWidth
            variant="contained"
            disableElevation
          >
            {t('favs.removeConfirm')}
          </ConfirmButton>
          <CancelButton
            onClick={() => setModalOpen(false)}
            fullWidth
            variant="text"
          >
            {t('favs.removeCancel')}
          </CancelButton>
        </ActionsBox>
      </StyledDialog>
    </>
  );
};

export default FavoriteButton;
