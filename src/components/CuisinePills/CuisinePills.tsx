import Chip from '@mui/material/Chip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';
import { CUISINE_COLORS, CUISINE_ICONS } from '../../utils/constants';
import type { RecipeProps } from '../../utils/types';
import { IconWrapper, PillsWrapper } from './CuisinePills.styled';

const toCamelKey = (s: string) =>
  s.toLowerCase().replace(/ ([a-z])/g, (_, c) => c.toUpperCase());

interface CuisinePillsProps extends RecipeProps {
  overlay?: boolean;
}

const CuisinePills = ({ recipe, overlay = true }: CuisinePillsProps) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width:600px)');
  const cuisines: string[] = recipe.cuisines ?? [];

  if (cuisines.length === 0) return null;

  return (
    <PillsWrapper $overlay={overlay}>
      {cuisines.map((cuisine) => {
        const key = cuisine.toLowerCase();
        const colors = CUISINE_COLORS[key];
        const icon = CUISINE_ICONS[key];
        return (
          <Chip
            key={cuisine}
            icon={icon ? <IconWrapper>{icon}</IconWrapper> : undefined}
            label={t(`cuisines.${toCamelKey(cuisine)}`, { defaultValue: cuisine })}
            sx={{
              backgroundColor: colors?.bg ?? 'var(--color-neutral-light)',
              color: colors?.text ?? 'var(--color-neutral-light-text)',
              fontWeight: 600,
              fontSize: isMobile ? '0.7rem' : '1rem',
              height: 'auto',
              '& .MuiChip-label': { padding: isMobile ? '3px 10px' : '5px 20px' },
              '& .MuiChip-icon': { color: 'inherit', marginLeft: '4px', marginRight: '-8px' },
            }}
          />
        );
      })}
    </PillsWrapper>
  );
};

export default CuisinePills;
