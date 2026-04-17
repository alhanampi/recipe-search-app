import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useFavorites } from '../../context/FavoritesContext';
import FavoriteButton from '../../components/FavoriteButton/FavoriteButton';
import DietPills from '../../components/DietPills/DietPills';
import CuisinePills from '../../components/CuisinePills/CuisinePills';
import noPreview from '../../assets/nopreview.png';
import {
  CardBody,
  CardImageWrapper,
  CardInner,
  CardList,
  CardTitleRow,
  CuisinePillsOverlay,
  DesktopTitle,
  MobileHide,
  ViewRecipeButton,
} from '../../components/VeggiePicks/VeggiePicks.styled';
import { ClockIcon } from '../../pages/SearchPage/SearchPage.styled';
import { Wrapper, Title, EmptyMessage } from './FavsPage.styled';

const FavsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  return (
    <Wrapper>
      <Title>{t('favs.title')}</Title>
      {favorites.length === 0 ? (
        <EmptyMessage>{t('favs.empty')}</EmptyMessage>
      ) : (
        <CardList>
          {favorites.map((recipe: any) => {
            const title = recipe.title ?? '';
            const summary = recipe.summary?.replace(/<[^>]+>/g, '');
            return (
              <MuiCard
                key={recipe.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease',
                  backgroundColor: 'var(--color-card-bg)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
              >
                <CardInner>
                  <CardTitleRow>
                    {title.charAt(0).toUpperCase() + title.slice(1)}
                  </CardTitleRow>
                  <CardImageWrapper>
                    <img
                      src={recipe.image ?? noPreview}
                      alt={title}
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        e.currentTarget.src = noPreview;
                      }}
                    />
                    <CuisinePillsOverlay>
                      <CuisinePills recipe={recipe} />
                    </CuisinePillsOverlay>
                    <FavoriteButton recipe={recipe} variant="overlay" />
                  </CardImageWrapper>
                  <CardBody>
                    <DesktopTitle>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          fontSize: '1.1rem',
                          textAlign: 'center',
                          borderBottom: '1px solid var(--color-neutral-border)',
                          width: '100%',
                          py: 1.5,
                        }}
                      >
                        {title.charAt(0).toUpperCase() + title.slice(1)}
                      </Typography>
                    </DesktopTitle>
                    <MobileHide>
                      <Typography variant="body2" color="text.secondary">
                        <ClockIcon />
                        {t('veggiePicks.readyIn')} {recipe.readyInMinutes}{' '}
                        {t('veggiePicks.minutes')}
                      </Typography>
                      {summary && (
                        <CardContent sx={{ p: 0 }}>
                          <Typography variant="body2" color="text.secondary">
                            {summary.slice(0, 300)}...
                          </Typography>
                        </CardContent>
                      )}
                    </MobileHide>
                    <DietPills recipe={recipe} />
                    <ViewRecipeButton onClick={() => navigate(`/recipe/${recipe.id}`)}>
                      {t('recipe.viewFull')}
                    </ViewRecipeButton>
                  </CardBody>
                </CardInner>
              </MuiCard>
            );
          })}
        </CardList>
      )}
    </Wrapper>
  );
};

export default FavsPage;
