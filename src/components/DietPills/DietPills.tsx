import Chip from '@mui/material/Chip';
import { useTranslation } from 'react-i18next';
import { DIET_COLORS, DIET_ICONS } from '../../utils/constants';
import { IconWrapper, PillsWrapper } from './DietPills.styled';
import { DIET_KEYS } from '../../utils/constants';
import type { DietPillsProps } from '../../utils/types';

const DietPills = ({ recipe, compact = false }: DietPillsProps) => {
  const { t } = useTranslation();
  const active = DIET_KEYS.filter((key) => recipe[key] === true);

  if (active.length === 0) return null;

  return (
    <PillsWrapper $compact={compact}>
      {active.map((diet) => (
        <Chip
          key={diet}
          icon={
            !compact && DIET_ICONS[diet] ? (
              <IconWrapper>{DIET_ICONS[diet]}</IconWrapper>
            ) : undefined
          }
          label={t(`diets.${diet}`)}
          size="small"
          sx={{
            backgroundColor:
              DIET_COLORS[diet]?.bg ?? 'var(--color-neutral-border)',
            color: DIET_COLORS[diet]?.text ?? 'var(--color-neutral-light-text)',
            fontWeight: 600,
            fontSize: compact ? '0.55rem' : '0.7rem',
            height: compact ? '18px' : undefined,
            '& .MuiChip-label': compact ? { padding: '0 6px' } : undefined,
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
