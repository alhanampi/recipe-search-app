import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft } from 'react-icons/fa';
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
  ClockIcon,
  IngredientImage,
  IngredientItem,
  IngredientList,
  InstructionList,
  InstructionStep,
  InstructionText,
  StepNumber,
  MetaRow,
  PillsRow,
  SectionTitle,
  ServingButton,
  ServingsButtonGroup,
  ServingsLabel,
  ServingsRow,
  ServingsSelect,
  InlineFavoriteWrapper,
  TitlePillsRow,
  TitleRow,
  UnitLabel,
  UnitToggleRow,
  Wrapper,
  RecipeLink
} from './RecipePage.styled';
import { translateRecipe } from '../../services/groq';
import Typography from '@mui/material/Typography';
import FavoriteButton from '../../components/FavoriteButton/FavoriteButton';
import NutritionChart from '../../components/NutritionChart/NutritionChart';

const SERVING_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

const UNIT_KEY_MAP: Record<string, string> = {
  tsp: 'tsp', tsps: 'tsps',
  Tbsp: 'tbsp', Tbsps: 'tbsps', tbsp: 'tbsp', tbsps: 'tbsps',
  cup: 'cup', cups: 'cups',
  oz: 'oz', ozs: 'oz',
  lb: 'lb', lbs: 'lbs',
  g: 'g', kg: 'kg', ml: 'ml', l: 'l', L: 'l',
  'fl oz': 'flOz',
  serving: 'serving', servings: 'servings',
  large: 'large', medium: 'medium', small: 'small',
  pinch: 'pinch', pinches: 'pinches',
  clove: 'clove', cloves: 'cloves',
  slice: 'slice', slices: 'slices',
  piece: 'piece', pieces: 'pieces',
  bunch: 'bunch', bunches: 'bunches',
  head: 'head', heads: 'heads',
  stalk: 'stalk', stalks: 'stalks',
  can: 'can', cans: 'cans',
};

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
  const [selectedServings, setSelectedServings] = useState<number | null>(null);
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
    if (!recipe) return;
    setSelectedServings(recipe.servings);
  }, [recipe]);

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
        <InlineFavoriteWrapper>
          <FavoriteButton recipe={recipe} variant="inline" />
        </InlineFavoriteWrapper>
        <Typography
          variant="h2"
          sx={{
            fontSize: '1.8rem',
            flex: 1,
            minWidth: 0,
            '@media (max-width: 600px)': { order: 3, flexBasis: '100%', fontSize: '1.4rem' },
          }}
        >
          {title}
        </Typography>
        <TitlePillsRow>
          <CuisinePills recipe={recipe} overlay={false} />
        </TitlePillsRow>
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
          <ClockIcon />
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
          <ServingsRow>
            <ServingsLabel>{t('recipe.servings')}</ServingsLabel>
            <ServingsButtonGroup>
              {SERVING_OPTIONS.map((n) => (
                <ServingButton
                  key={n}
                  $active={selectedServings === n}
                  onClick={() => setSelectedServings(n)}
                >
                  {n}
                </ServingButton>
              ))}
            </ServingsButtonGroup>
            <ServingsSelect
              value={selectedServings ?? ''}
              onChange={(e) => setSelectedServings(Number(e.target.value))}
            >
              {SERVING_OPTIONS.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </ServingsSelect>
          </ServingsRow>
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
              const rawUnit = measures?.unitShort ?? '';
              const unitKey = UNIT_KEY_MAP[rawUnit];
              const unit = language !== 'en' && unitKey
                ? t(`units.${unitKey}`, { defaultValue: rawUnit })
                : rawUnit;
              const servingScale = (selectedServings ?? recipe.servings) / recipe.servings;
              const scaledAmt = measures?.amount != null
                ? measures.amount * servingScale
                : null;
              const amount = scaledAmt != null
                ? `${parseFloat(scaledAmt.toFixed(2))} ${unit}`
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
          {translating ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={16} />
            </Box>
          ) : (
            <InstructionList>
              {instructions.map((step, idx) => (
                <InstructionStep key={idx}>
                  <StepNumber>{idx + 1}</StepNumber>
                  <InstructionText>{step}</InstructionText>
                </InstructionStep>
              ))}
            </InstructionList>
          )}
        </>
      )}

      <NutritionChart recipe={recipe} selectedServings={selectedServings ?? recipe.servings} />

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
