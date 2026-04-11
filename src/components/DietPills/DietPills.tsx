import Chip from '@mui/material/Chip';
import { useTranslation } from 'react-i18next';
import { DIET_COLORS, DIET_ICONS } from '../../utils/constants';
import type { RecipeProps } from '../../utils/types';
import { IconWrapper, PillsWrapper } from './DietPills.styled';

const DIET_KEYS = ['vegetarian', 'vegan', 'glutenFree', 'dairyFree', 'ketogenic', 'paleo', 'primal', 'pescetarian', 'lowFodmap', 'whole30'];

const DietPills = ({ recipe }: RecipeProps) => {
  const { t } = useTranslation();
  const active = DIET_KEYS.filter((key) => recipe[key] === true);

  if (active.length === 0) return null;

  return (
    <PillsWrapper>
      {active.map((diet) => (
        <Chip
          key={diet}
          icon={
            DIET_ICONS[diet] ? (
              <IconWrapper>{DIET_ICONS[diet]}</IconWrapper>
            ) : undefined
          }
          label={t(`diets.${diet}`)}
          size="small"
          sx={{
            backgroundColor: DIET_COLORS[diet]?.bg ?? 'var(--color-neutral-border)',
            color: DIET_COLORS[diet]?.text ?? 'var(--color-neutral-light-text)',
            fontWeight: 600,
            fontSize: '0.7rem',
            '& .MuiChip-icon': {
              color: 'inherit',
              marginLeft: '4px',
              marginRight: '-4px',
            },
          }}
        />
      ))}
    </PillsWrapper>
  );
};

export default DietPills;
