import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft, FaClock } from 'react-icons/fa';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import AppSwitch from '../../components/AppSwitch/AppSwitch';
import { getRecipeById } from '../../services/recipeDetail';
import type { RecipeTranslation } from '../../utils/types';
import noPreview from '../../assets/nopreview.png';
import DietPills from '../../components/DietPills/DietPills';
import CuisinePills from '../../components/CuisinePills/CuisinePills';
import {
  BackButton,
  HeroImage,
  BrokenImageIcon,
  IngredientImage,
  IngredientItem,
  IngredientList,
  InstructionText,
  MetaRow,
  PillsRow,
  SectionTitle,
  TitleRow,
  UnitLabel,
  UnitToggleRow,
  Wrapper,
  RecipeLink
} from './RecipePage.styled';
import { translateRecipe } from '../../services/groq';
import Typography from '@mui/material/Typography';

const IngredientImageWithFallback = ({ src, alt }: { src: string; alt: string }) => {
  const [broken, setBroken] = useState(false);
  if (broken) return <BrokenImageIcon />;
  return (
    <IngredientImage
      src={src}
      alt={alt}
      onError={() => setBroken(true)}
    />
  );
};

const RecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMetric, setIsMetric] = useState(() =>
    localStorage.getItem('unit_preference') === 'metric'
  );

  const handleUnitToggle = () => {
    setIsMetric((v) => {
      const next = !v;
      localStorage.setItem('unit_preference', next ? 'metric' : 'us');
      return next;
    });
  };
  const [translation, setTranslation] = useState<RecipeTranslation | null>(
    null
  );
  const [translating, setTranslating] = useState(false);

  const language = i18n.resolvedLanguage ?? 'en';

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setTranslation(null);
    getRecipeById(Number(id), language).then((data) => {
      setRecipe(data);
      setLoading(false);
    });
  }, [id, language]);

  useEffect(() => {
    if (!recipe || language === 'en') return;
    setTranslating(true);
    translateRecipe(
      recipe.id,
      {
        title: recipe.title,
        summary: recipe.summary?.replace(/<[^>]+>/g, '') ?? '',
        ingredientNames:
          recipe.extendedIngredients?.map((i: any) => i.name) ?? [],
        instructions:
          recipe.analyzedInstructions?.[0]?.steps?.map((s: any) => s.step) ??
          [],
      },
      language
    ).then((data) => {
      setTranslation(data);
      setTranslating(false);
    });
  }, [recipe, language]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!recipe) return null;

  const steps = recipe.analyzedInstructions?.[0]?.steps ?? [];
  const title = translation?.title ?? recipe.title;
  const summary =
    translation?.summary ?? recipe.summary?.replace(/<[^>]+>/g, '');
  const instructions: string[] = translation?.instructions?.length
    ? translation.instructions
    : steps.map((s: any) => s.step);

  return (
    <Wrapper>
      <TitleRow>
        <BackButton onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </BackButton>
        <Typography variant="h2" sx={{ fontSize: '1.8rem' }}>
          {title}
        </Typography>
        <CuisinePills recipe={recipe} overlay={false} />
      </TitleRow>

      <HeroImage
        src={recipe.image ?? noPreview}
        alt={title}
        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          e.currentTarget.src = noPreview;
        }}
      />

      <MetaRow>
        <span>
          <FaClock
            style={{ verticalAlign: 'middle', marginRight: '0.35rem' }}
          />
          {t('topPicks.readyIn')} {recipe.readyInMinutes}{' '}
          {t('topPicks.minutes')}
        </span>
        {recipe.servings && (
          <span>
            {recipe.servings} {t('recipe.servings')}
          </span>
        )}
      </MetaRow>

      <PillsRow>
        <DietPills recipe={recipe} />
      </PillsRow>

      {summary && (
        <>
          <SectionTitle>{t('recipe.summary')}</SectionTitle>
          {translating ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={16} />
            </Box>
          ) : (
            <InstructionText>{summary}</InstructionText>
          )}
        </>
      )}

      {recipe.extendedIngredients?.length > 0 && (
        <>
          <SectionTitle>{t('recipe.ingredients')}</SectionTitle>
          <UnitToggleRow>
            <UnitLabel>{t('recipe.unitUs')}</UnitLabel>
            <AppSwitch
              checked={isMetric}
              onChange={handleUnitToggle}
            />
            <UnitLabel>{t('recipe.unitMetric')}</UnitLabel>
          </UnitToggleRow>
          <IngredientList>
            {recipe.extendedIngredients.map((ing: any, idx: number) => {
              const measures = isMetric
                ? ing.measures?.metric
                : ing.measures?.us;
              const amount = measures?.amount
                ? `${parseFloat(measures.amount.toFixed(2))} ${measures.unitShort}`
                : '';
              const name = translation?.ingredientNames?.[idx] ?? ing.name;
              return (
                <IngredientItem key={ing.id}>
                  {ing.image && (
                    <IngredientImageWithFallback src={`https://spoonacular.com/cdn/ingredients_100x100/${ing.image}`} alt={name} />
                  )}
                  {translating
                    ? ing.original
                    : amount
                      ? `${amount} ${name}`
                      : ing.original}
                </IngredientItem>
              );
            })}
          </IngredientList>
        </>
      )}

      {instructions.length > 0 && (
        <>
          <SectionTitle>{t('recipe.instructions')}</SectionTitle>
          <InstructionText>
            {translating ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={16} />
              </Box>
            ) : (
              <ol>
                {instructions.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            )}
          </InstructionText>
        </>
      )}

      {recipe.sourceUrl && (
        <>
          <SectionTitle>{t('recipe.source')}</SectionTitle>
          <RecipeLink href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
            www.{recipe.sourceName ?? recipe.sourceUrl}
          </RecipeLink>
        </>
      )}
    </Wrapper>
  );
};

export default RecipePage;
