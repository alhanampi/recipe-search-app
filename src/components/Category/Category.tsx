import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CUISINE_ICONS } from '../../utils/constants';
import { CuisineButton, CuisineName, Grid, IconCircle, ShowAllButton, Title, Wrapper } from './Category.styled';

const CUISINE_KEYS = Object.entries(CUISINE_ICONS).map(([key, icon]) => ({ key, icon }));

const toCamelKey = (s: string) =>
  s.toLowerCase().replace(/ ([a-z])/g, (_, c) => c.toUpperCase());

const VISIBLE_COUNT = 4;

const Category = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const shuffled = useMemo(
    () => [...CUISINE_KEYS].sort(() => Math.random() - 0.5),
    []
  );

  const visible = showAll ? shuffled : shuffled.slice(0, VISIBLE_COUNT);

  return (
    <Wrapper>
      <Title>{t('category.title')}</Title>
      <Grid>
        {visible.map(({ key, icon }, index) => (
          <CuisineButton
            key={key}
            $animated={showAll && index >= VISIBLE_COUNT}
            onClick={() => navigate(`/${key}`)}
          >
            <IconCircle className="icon-circle">{icon}</IconCircle>
            <CuisineName>{t(`cuisines.${toCamelKey(key)}`, { defaultValue: key })}</CuisineName>
          </CuisineButton>
        ))}
      </Grid>
      <ShowAllButton onClick={() => setShowAll(!showAll)}>
        {showAll ? t('category.showLess') : t('category.showAll')}
      </ShowAllButton>
    </Wrapper>
  );
};

export default Category;
