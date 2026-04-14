import { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import { getPopular } from '../../services/topPicks';
import { translateCards, type CardTranslation } from '../../services/groq';
import noPreview from '../../assets/nopreview.png';
import {
  CardTitleBox,
  CardTitleText,
  ClockIcon,
  ClockRow,
  CuisineOverlay,
  ImageWrapper,
  MobileHide,
  StyledCard,
  StyledCardContent,
  SummaryText,
  Title,
  ViewRecipeButton,
  Wrapper,
} from './TopPicks.styled';
import DietPills from '../DietPills/DietPills';
import CuisinePills from '../CuisinePills/CuisinePills';

const TopPicks = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [topPicks, setTopPicks] = useState<any[]>([]);
  const [cardTranslations, setCardTranslations] = useState<Map<number, CardTranslation>>(new Map());
  const language = i18n.resolvedLanguage ?? 'en';

  useEffect(() => {
    setCardTranslations(new Map());
    getPopular(language).then(setTopPicks);
  }, [language]);

  useEffect(() => {
    if (!topPicks.length) return;
    if (language === 'en') { setCardTranslations(new Map()); return; }
    translateCards(
      topPicks.map((r: any) => ({ id: r.id, title: r.title, summary: r.summary?.replace(/<[^>]+>/g, '') ?? '' })),
      language
    ).then(setCardTranslations);
  }, [topPicks, language]);

  return (
    <Wrapper>
      <Title>{t('topPicks.title')}</Title>
      <Splide
        options={{
          perPage: 3,
          gap: '4rem',
          pagination: false,
          rewind: true,
          drag: 'free',
          breakpoints: {
            800: {
              perPage: 2,
              gap: '1rem',
            },
          },
        }}
      >
        {topPicks.map((recipe: any) => {
          const tr = cardTranslations.get(recipe.id);
          const title = tr?.title ?? recipe.title;
          const summary = tr?.summary ?? recipe.summary?.replace(/<[^>]+>/g, '');
          return (
            <SplideSlide key={recipe.id}>
              <StyledCard>
                <CardTitleBox>
                  <CardTitleText>
                    {title.charAt(0).toUpperCase() + title.slice(1)}
                  </CardTitleText>
                </CardTitleBox>
                <ImageWrapper>
                  <CardMedia
                    component="img"
                    image={recipe.image ?? noPreview}
                    alt={title}
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      e.currentTarget.src = noPreview;
                    }}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <CuisineOverlay>
                    <CuisinePills recipe={recipe} />
                  </CuisineOverlay>
                </ImageWrapper>
                <StyledCardContent>
                  <ClockRow>
                    <ClockIcon />
                    {t('topPicks.readyIn')} {recipe.readyInMinutes} {t('topPicks.minutes')}
                  </ClockRow>
                  {summary && (
                    <SummaryText>
                      {summary.slice(0, 150)}...
                    </SummaryText>
                  )}
                </StyledCardContent>
                <MobileHide>
                  <DietPills recipe={recipe} />
                </MobileHide>
                <ViewRecipeButton onClick={() => navigate(`/recipe/${recipe.id}`)}>
                  {t('recipe.viewFull')}
                </ViewRecipeButton>
              </StyledCard>
            </SplideSlide>
          );
        })}
      </Splide>
    </Wrapper>
  );
};

export default TopPicks;
