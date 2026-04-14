export interface PillColor {
  bg: string;
  text: string;
}

export interface RecipeProps {
  recipe: Record<string, any>;
}

export interface PagedResult {
  recipes: any[];
  totalResults: number;
}

export interface PagedCache extends PagedResult {
  timestamp: number;
}

export interface RecipeTranslation {
  title: string;
  summary: string;
  ingredientNames: string[];
  instructions: string[];
}

export interface DietPillsProps extends RecipeProps {
  compact?: boolean;
}
