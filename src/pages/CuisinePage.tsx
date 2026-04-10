import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft, FaClock } from 'react-icons/fa';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { getCuisineRecipes } from '../services/cuisineRecipes';
import noPreview from '../assets/nopreview.png';
import DietPills from '../components/DietPills/DietPills';
import CuisinePills from '../components/CuisinePills/CuisinePills';
import {
  CardBody,
  CardImageWrapper,
  CardInner,
  CardList,
  CuisinePillsOverlay,
} from '../components/VeggiePicks/VeggiePicks.styled';
import { CUISINE_ICONS } from '../utils/constants';
import {
  BackButton,
  CuisineIcon,
  ShowMoreButton,
  Title,
  TitleRow,
  Wrapper,
} from './CuisinePage.styled';

const sessionKey = (cuisine: string) => `cuisine_${cuisine.toLowerCase()}_session`;
const CACHE_TTL = 1000 * 60 * 60 * 24;

const CuisinePage = () => {
  const { cuisine } = useParams<{ cuisine: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (!cuisine) return;

    const cached = localStorage.getItem(sessionKey(cuisine));
    if (cached) {
      const { recipes: saved, totalResults: total, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        setRecipes(saved);
        setTotalResults(total);
        setLoading(false);
        return;
      }
    }

    setLoading(true);
    getCuisineRecipes(cuisine, 0).then(({ recipes: data, totalResults: total }) => {
      setRecipes(data);
      setTotalResults(total);
      localStorage.setItem(sessionKey(cuisine), JSON.stringify({ recipes: data, totalResults: total, timestamp: Date.now() }));
      setLoading(false);
    });
  }, [cuisine]);

  const handleShowMore = () => {
    if (!cuisine) return;
    setLoadingMore(true);
    getCuisineRecipes(cuisine, recipes.length).then(({ recipes: data, totalResults: total }) => {
      const accumulated = [...recipes, ...data];
      setRecipes(accumulated);
      setTotalResults(total);
      localStorage.setItem(sessionKey(cuisine), JSON.stringify({ recipes: accumulated, totalResults: total, timestamp: Date.now() }));
      setLoadingMore(false);
    });
  };

  const hasMore = recipes.length < totalResults;

  return (
    <Wrapper>
      <TitleRow>
        <BackButton onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </BackButton>
        <CuisineIcon>{CUISINE_ICONS[cuisine?.toLowerCase() ?? '']}</CuisineIcon>
        <Title>{cuisine} recipes</Title>
      </TitleRow>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <CardList>
            {recipes.map((recipe: any) => (
              <MuiCard
                key={recipe.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease',
                  backgroundColor: 'var(--color-card-bg)',
                  borderRadius: '10px',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
              >
                <CardInner>
                  <CardImageWrapper>
                    <img
                      src={recipe.image ?? noPreview}
                      alt={recipe.title}
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        e.currentTarget.src = noPreview;
                      }}
                    />
                    <CuisinePillsOverlay>
                      <CuisinePills recipe={recipe} />
                    </CuisinePillsOverlay>
                  </CardImageWrapper>
                  <CardBody>
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
                      {recipe.title.charAt(0).toUpperCase() + recipe.title.slice(1)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <FaClock style={{ marginRight: '0.35rem', verticalAlign: 'middle' }} />
                      {t('veggiePicks.readyIn')} {recipe.readyInMinutes} {t('veggiePicks.minutes')}
                    </Typography>
                    {recipe.summary && (
                      <CardContent sx={{ p: 0 }}>
                        <Typography variant="body2" color="text.secondary">
                          {recipe.summary.replace(/<[^>]+>/g, '').slice(0, 300)}...
                        </Typography>
                      </CardContent>
                    )}
                    <DietPills recipe={recipe} />
                  </CardBody>
                </CardInner>
              </MuiCard>
            ))}
          </CardList>
          {hasMore && (
            <ShowMoreButton onClick={handleShowMore} disabled={loadingMore}>
              {loadingMore ? <CircularProgress size={18} /> : t('cuisine.showMore')}
            </ShowMoreButton>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default CuisinePage;
