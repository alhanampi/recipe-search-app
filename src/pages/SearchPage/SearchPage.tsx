import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft, FaClock } from 'react-icons/fa';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { searchRecipes } from '../../services/search';
import { translateCards, type CardTranslation } from '../../services/groq';
import noPreview from '../../assets/nopreview.png';
import DietPills from '../../components/DietPills/DietPills';
import CuisinePills from '../../components/CuisinePills/CuisinePills';
import {
  CardBody,
  CardImageWrapper,
  CardInner,
  CardList,
  CardTitleRow,
  CuisinePillsOverlay,
  DesktopTitle,
  ViewRecipeButton,
} from '../../components/VeggiePicks/VeggiePicks.styled';
import {
  BackButton,
  ResultCount,
  ShowMoreButton,
  Title,
  TitleRow,
  Wrapper,
} from './SearchPage.styled';

const CACHE_TTL = 1000 * 60 * 60 * 24;
const sessionKey = (query: string, language: string) => `search_${query.toLowerCase()}_session_${language}`;

const SearchPage = () => {
  const { query } = useParams<{ query: string }>();
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage ?? 'en';
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [cardTranslations, setCardTranslations] = useState<Map<number, CardTranslation>>(new Map());

  const decoded = query ? decodeURIComponent(query) : '';

  useEffect(() => {
    if (!decoded) return;

    const cached = localStorage.getItem(sessionKey(decoded, language));
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
    searchRecipes(decoded, 0, language).then(({ recipes: data, totalResults: total }) => {
      setRecipes(data);
      setTotalResults(total);
      localStorage.setItem(sessionKey(decoded, language), JSON.stringify({ recipes: data, totalResults: total, timestamp: Date.now() }));
      setLoading(false);
    });
  }, [decoded, language]);

  const handleShowMore = () => {
    setLoadingMore(true);
    searchRecipes(decoded, recipes.length, language).then(({ recipes: data, totalResults: total }) => {
      const accumulated = [...recipes, ...data];
      setRecipes(accumulated);
      setTotalResults(total);
      localStorage.setItem(sessionKey(decoded, language), JSON.stringify({ recipes: accumulated, totalResults: total, timestamp: Date.now() }));
      setLoadingMore(false);
    });
  };

  useEffect(() => {
    setCardTranslations(new Map());
  }, [language]);

  useEffect(() => {
    if (!recipes.length) return;
    if (language === 'en') { setCardTranslations(new Map()); return; }
    translateCards(
      recipes.map((r) => ({ id: r.id, title: r.title, summary: r.summary?.replace(/<[^>]+>/g, '') ?? '' })),
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
        <Title>"{decoded}"</Title>
      </TitleRow>
      {!loading && (
        <ResultCount>
          {totalResults === 0
            ? t('search.noResults')
            : t('search.results', { count: totalResults })}
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
              const summary = tr?.summary ?? recipe.summary?.replace(/<[^>]+>/g, '');
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
                    <CardTitleRow>{title.charAt(0).toUpperCase() + title.slice(1)}</CardTitleRow>
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
                      <Typography variant="body2" color="text.secondary">
                        <FaClock style={{ marginRight: '0.35rem', verticalAlign: 'middle' }} />
                        {t('veggiePicks.readyIn')} {recipe.readyInMinutes} {t('veggiePicks.minutes')}
                      </Typography>
                      {summary && (
                        <CardContent sx={{ p: 0 }}>
                          <Typography variant="body2" color="text.secondary">
                            {summary.slice(0, 300)}...
                          </Typography>
                        </CardContent>
                      )}
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

export default SearchPage;
