import axios from 'axios';
import { CACHE_TTL } from './api';
import { LANGUAGE_NAMES } from '../utils/constants';
import type { RecipeTranslation } from '../utils/types';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

// ─── Full recipe translation (RecipePage) ────────────────────────────────────

export const translateRecipe = async (
  recipeId: number,
  payload: RecipeTranslation,
  language: string
): Promise<RecipeTranslation | null> => {
  const cacheKey = `groq_recipe_${recipeId}_${language}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TTL) return data;
  }

  const languageName = LANGUAGE_NAMES[language] ?? language;

  const { data } = await axios.post(
    GROQ_URL,
    {
      model: GROQ_MODEL,
      temperature: 0.1,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: `You are a culinary translator. Translate the provided recipe fields to ${languageName}. Return a JSON object with exactly the same keys and structure as the input. Translate each item in array fields. Do not add explanations.`,
        },
        { role: 'user', content: JSON.stringify(payload) },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GROQ_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const translated: RecipeTranslation = JSON.parse(
    data.choices[0].message.content
  );
  localStorage.setItem(
    cacheKey,
    JSON.stringify({ data: translated, timestamp: Date.now() })
  );
  return translated;
};

// ─── Card batch translation (listing pages) ───────────────────────────────────

export interface CardTranslation {
  id: number;
  title: string;
  summary: string;
}

export const translateCards = async (
  recipes: { id: number; title: string; summary: string }[],
  language: string
): Promise<Map<number, CardTranslation>> => {
  const result = new Map<number, CardTranslation>();
  const toFetch: typeof recipes = [];

  for (const r of recipes) {
    const cacheKey = `groq_card_${r.id}_${language}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        result.set(r.id, data);
        continue;
      }
    }
    toFetch.push(r);
  }

  if (toFetch.length === 0) return result;

  const languageName = LANGUAGE_NAMES[language] ?? language;

  const { data } = await axios.post(
    GROQ_URL,
    {
      model: GROQ_MODEL,
      temperature: 0.1,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: `You are a culinary translator. Translate the provided recipe cards to ${languageName}. Return a JSON object with key "cards" containing an array with the same length and order as the input, each with "id", "title", and "summary" fields. Do not add explanations.`,
        },
        { role: 'user', content: JSON.stringify({ cards: toFetch }) },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GROQ_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const translated: { cards: CardTranslation[] } = JSON.parse(
    data.choices[0].message.content
  );

  for (const card of translated.cards) {
    const cacheKey = `groq_card_${card.id}_${language}`;
    localStorage.setItem(
      cacheKey,
      JSON.stringify({ data: card, timestamp: Date.now() })
    );
    result.set(card.id, card);
  }

  return result;
};
