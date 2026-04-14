import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FaClock } from 'react-icons/fa';
import { getVeggie } from '../../services/veggiePicks';
import { translateCards, type CardTranslation } from '../../services/groq';
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
  Title,
  ViewRecipeButton,
  Wrapper,
} from './VeggiePicks.styled';
import DietPills from '../DietPills/DietPills';
import CuisinePills from '../CuisinePills/CuisinePills';

const VeggiePicks = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [veggiePicks, setVeggiePicks] = useState<any[]>([]);
  const [cardTranslations, setCardTranslations] = useState<
    Map<number, CardTranslation>
  >(new Map());
  const language = i18n.resolvedLanguage ?? 'en';
  const isNarrow = useMediaQuery('(max-width:750px)');

  useEffect(() => {
    setCardTranslations(new Map());
    getVeggie(language).then(setVeggiePicks);
  }, [language]);

  useEffect(() => {
    if (!veggiePicks.length) return;
    if (language === 'en') {
      setCardTranslations(new Map());
      return;
    }
    translateCards(
      veggiePicks.map((r: any) => ({
        id: r.id,
        title: r.title,
        summary: r.summary?.replace(/<[^>]+>/g, '') ?? '',
      })),
      language
    ).then(setCardTranslations);
  }, [veggiePicks, language]);

  return (
    <Wrapper>
      <Title>{t('veggiePicks.title')}</Title>
      <CardList>
        {veggiePicks.map((recipe: any) => {
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
                overflow: 'hidden',
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
                  <MobileHide>
                    <Typography variant="body2" color="text.secondary">
                      <FaClock
                        style={{
                          marginRight: '0.35rem',
                          verticalAlign: 'middle',
                        }}
                      />
                      {t('veggiePicks.readyIn')} {recipe.readyInMinutes}{' '}
                      {t('veggiePicks.minutes')}
                    </Typography>
                    {summary && (
                      <CardContent sx={{ p: 0 }}>
                        <Typography variant="body2" color="text.secondary">
                          {!isNarrow && summary.slice(0, 300) + '...'}
                        </Typography>
                      </CardContent>
                    )}
                  </MobileHide>
                  <DietPills recipe={recipe} compact={isNarrow} />
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
    </Wrapper>
  );
};

export default VeggiePicks;
