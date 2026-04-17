import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft } from 'react-icons/fa';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { getCuisineRecipes } from '../../services/cuisineRecipes';
import { translateCards, type CardTranslation } from '../../services/groq';
import { CACHE_TTL, sessionKey } from '../../services/api';
import noPreview from '../../assets/nopreview.png';
import DietPills from '../../components/DietPills/DietPills';
import CuisinePills from '../../components/CuisinePills/CuisinePills';
import FavoriteButton from '../../components/FavoriteButton/FavoriteButton';
import {
  CardBody,
  CardImageWrapper,
  CardInner,
  CardList,
  ClockIcon,
  CuisinePillsOverlay,
  ViewRecipeButton,
} from '../../components/VeggiePicks/VeggiePicks.styled';
import { CUISINE_ICONS } from '../../utils/constants';
import {
  BackButton,
  CuisineIcon,
  ResultCount,
  ShowMoreButton,
  Title,
  TitleRow,
  Wrapper,
} from './CuisinePage.styled';

const CuisinePage = () => {
  const { cuisine } = useParams<{ cuisine: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const language = i18n.resolvedLanguage ?? 'en';
  const [recipes, setRecipes] = useState<any[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [cardTranslations, setCardTranslations] = useState<
    Map<number, CardTranslation>
  >(new Map());

  useEffect(() => {
    if (!cuisine) return;

    const cached = localStorage.getItem(
      sessionKey('cuisine', cuisine, language)
    );
    if (cached) {
      const {
        recipes: saved,
        totalResults: total,
        timestamp,
      } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        setRecipes(saved);
        setTotalResults(total);
        setLoading(false);
        return;
      }
    }

    setLoading(true);
    getCuisineRecipes(cuisine, 0, language).then(
      ({ recipes: data, totalResults: total }) => {
        setRecipes(data);
        setTotalResults(total);
        localStorage.setItem(
          sessionKey('cuisine', cuisine, language),
          JSON.stringify({
            recipes: data,
            totalResults: total,
            timestamp: Date.now(),
          })
        );
        setLoading(false);
      }
    );
  }, [cuisine, language]);

  const handleShowMore = () => {
    if (!cuisine) return;
    setLoadingMore(true);
    getCuisineRecipes(cuisine, recipes.length, language).then(
      ({ recipes: data, totalResults: total }) => {
        const accumulated = [...recipes, ...data];
        setRecipes(accumulated);
        setTotalResults(total);
        localStorage.setItem(
          sessionKey('cuisine', cuisine, language),
          JSON.stringify({
            recipes: accumulated,
            totalResults: total,
            timestamp: Date.now(),
          })
        );
        setLoadingMore(false);
      }
    );
  };

  useEffect(() => {
    setCardTranslations(new Map());
  }, [language]);

  useEffect(() => {
    if (!recipes.length) return;
    if (language === 'en') {
      setCardTranslations(new Map());
      return;
    }
    translateCards(
      recipes.map((r) => ({
        id: r.id,
        title: r.title,
        summary: r.summary?.replace(/<[^>]+>/g, '') ?? '',
      })),
      language
    ).then(setCardTranslations);
  }, [recipes, language]);

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
      {!loading && (
        <ResultCount>
          {t('search.results', { count: totalResults })}
        </ResultCount>
      )}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <CardList>
            {recipes.map((recipe: any) => {
              const tr = cardTranslations.get(recipe.id);
              const title = tr?.title ?? recipe.title;
              const summary =
                tr?.summary ?? recipe.summary?.replace(/<[^>]+>/g, '');
              return (
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
                        alt={title}
                        onError={(
                          e: React.SyntheticEvent<HTMLImageElement>
                        ) => {
                          e.currentTarget.src = noPreview;
                        }}
                      />
                      <CuisinePillsOverlay>
                        <CuisinePills recipe={recipe} />
                      </CuisinePillsOverlay>
                      <FavoriteButton recipe={recipe} variant="overlay" />
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
                        {title.charAt(0).toUpperCase() + title.slice(1)}
                      </Typography>
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
                      <DietPills recipe={recipe} />
                      <ViewRecipeButton
                        onClick={() => navigate(`/recipe/${recipe.id}`)}
                      >
                        {t('recipe.viewFull')}
                      </ViewRecipeButton>
                    </CardBody>
                  </CardInner>
                </MuiCard>
              );
            })}
          </CardList>
          {hasMore && (
            <ShowMoreButton onClick={handleShowMore} disabled={loadingMore}>
              {loadingMore ? (
                <CircularProgress size={18} />
              ) : (
                t('cuisine.showMore')
              )}
            </ShowMoreButton>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default CuisinePage;
