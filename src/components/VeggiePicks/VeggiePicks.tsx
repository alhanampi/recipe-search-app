import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { FaClock } from 'react-icons/fa';
import { getVeggie } from '../../services/veggiePicks';
import noPreview from '../../assets/nopreview.png';
import {
  CardBody,
  CardImageWrapper,
  CardInner,
  CardList,
  CuisinePillsOverlay,
  Title,
  Wrapper,
} from './VeggiePicks.styled';
import DietPills from '../DietPills/DietPills';
import CuisinePills from '../CuisinePills/CuisinePills';

const VeggiePicks = () => {
  const { t } = useTranslation();
  const [veggiePicks, setVeggiePicks] = useState([]);

  useEffect(() => {
    getVeggie().then(setVeggiePicks);
  }, []);

  return (
    <Wrapper>
      <Title>{t('veggiePicks.title')}</Title>
      <CardList>
        {veggiePicks.map((recipe: any) => (
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
                  <FaClock
                    style={{ marginRight: '0.35rem', verticalAlign: 'middle' }}
                  />
                  {t('veggiePicks.readyIn')} {recipe.readyInMinutes}{' '}
                  {t('veggiePicks.minutes')}
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
    </Wrapper>
  );
};

export default VeggiePicks;
