import Chip from '@mui/material/Chip';
import { CUISINE_COLORS, CUISINE_ICONS } from '../../utils/constants';
import type { RecipeProps } from '../../utils/types';
import { IconWrapper, PillsWrapper } from './CuisinePills.styled';

const CuisinePills = ({ recipe }: RecipeProps) => {
  const cuisines: string[] = recipe.cuisines ?? [];

  if (cuisines.length === 0) return null;

  return (
    <PillsWrapper>
      {cuisines.map((cuisine) => {
        const key = cuisine.toLowerCase();
        const colors = CUISINE_COLORS[key];
        const icon = CUISINE_ICONS[key];
        return (
          <Chip
            key={cuisine}
            icon={icon ? <IconWrapper>{icon}</IconWrapper> : undefined}
            label={cuisine}
            sx={{
              backgroundColor: colors?.bg ?? 'var(--color-neutral-light)',
              color: colors?.text ?? 'var(--color-neutral-light-text)',
              fontWeight: 600,
              fontSize: '1rem',
              height: 'auto',
              '& .MuiChip-label': { padding: '5px 20px' },
              '& .MuiChip-icon': { color: 'inherit', marginLeft: '4px', marginRight: '-8px' },
            }}
          />
        );
      })}
    </PillsWrapper>
  );
};

export default CuisinePills;
