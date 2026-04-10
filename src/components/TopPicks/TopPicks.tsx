import { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useTranslation } from 'react-i18next';
import CardMedia from '@mui/material/CardMedia';
import { getPopular } from '../../services/topPicks';
import noPreview from '../../assets/nopreview.png';
import {
  CardTitleBox,
  CardTitleText,
  ClockIcon,
  ClockRow,
  CuisineOverlay,
  ImageWrapper,
  StyledCard,
  StyledCardContent,
  SummaryText,
  Title,
  Wrapper,
} from './TopPicks.styled';
import DietPills from '../DietPills/DietPills';
import CuisinePills from '../CuisinePills/CuisinePills';

const TopPicks = () => {
  const { t } = useTranslation();
  const [topPicks, setTopPicks] = useState([]);

  useEffect(() => {
    getPopular().then(setTopPicks);
  }, []);

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
        }}
      >
        {topPicks.map((recipe: any) => (
          <SplideSlide key={recipe.id}>
            <StyledCard>
              <CardTitleBox>
                <CardTitleText>
                  {recipe.title.charAt(0).toUpperCase() + recipe.title.slice(1)}
                </CardTitleText>
              </CardTitleBox>
              <ImageWrapper>
                <CardMedia
                  component="img"
                  height="200"
                  image={recipe.image ?? noPreview}
                  alt={recipe.title}
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = noPreview;
                  }}
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
                {recipe.summary && (
                  <SummaryText>
                    {recipe.summary.replace(/<[^>]+>/g, '').slice(0, 150)}...
                  </SummaryText>
                )}
              </StyledCardContent>
              <DietPills recipe={recipe} />
            </StyledCard>
          </SplideSlide>
        ))}
      </Splide>
    </Wrapper>
  );
};

export default TopPicks;
