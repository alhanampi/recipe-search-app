import { useTranslation } from 'react-i18next';
import { SectionTitle } from '../../pages/RecipePage/RecipePage.styled';
import {
  BarFill,
  BarList,
  BarRow,
  BarTrack,
  NutrientLabel,
  NutrientValue,
  PerServing,
  Wrapper,
} from './NutritionChart.styled';

const NUTRIENTS = [
  { key: 'Calories', color: '#f59e0b' },
  { key: 'Fat', color: '#ef4444' },
  { key: 'Saturated Fat', color: '#dc2626' },
  { key: 'Carbohydrates', color: '#3b82f6' },
  { key: 'Sugar', color: '#8b5cf6' },
  { key: 'Fiber', color: '#10b981' },
  { key: 'Protein', color: '#f97316' },
  { key: 'Sodium', color: '#64748b' },
];

interface NutritionChartProps {
  recipe: any;
  selectedServings: number;
}

const NutritionChart = ({ recipe, selectedServings }: NutritionChartProps) => {
  const { t } = useTranslation();
  const apiNutrients: any[] = recipe.nutrition?.nutrients ?? [];

  if (!apiNutrients.length) return null;

  const scale = selectedServings / (recipe.servings ?? 1);

  const items = NUTRIENTS.flatMap(({ key, color }) => {
    const n = apiNutrients.find((x: any) => x.name === key);
    if (!n) return [];
    const pct = Math.min(n.percentOfDailyNeeds * scale, 100);
    const amount = parseFloat((n.amount * scale).toFixed(1));
    return [{ name: n.name, unit: n.unit, pct, amount, color }];
  });

  if (!items.length) return null;

  return (
    <Wrapper>
      <SectionTitle>{t('recipe.nutritionTitle')}</SectionTitle>
      <PerServing>{t('recipe.perServing', { count: selectedServings })}</PerServing>
      <BarList>
        {items.map((item) => (
          <BarRow key={item.name}>
            <NutrientLabel>
              {item.name} ({item.amount} {item.unit})
            </NutrientLabel>
            <BarTrack>
              <BarFill $pct={item.pct} $color={item.color} />
            </BarTrack>
            <NutrientValue>{Math.round(item.pct)}%</NutrientValue>
          </BarRow>
        ))}
      </BarList>
    </Wrapper>
  );
};

export default NutritionChart;
