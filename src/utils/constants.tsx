import type { ReactElement } from 'react';
import type { PillColor } from './types';
import {
  GiTomato,
  GiTacos,
  GiSushis,
  GiNoodles,
  GiHamburger,
  GiFriedFish,
  GiHotSpices,
  GiDumpling,
  GiCroissant,
  GiCheeseWedge,
  GiBeerStein,
  GiKebabSpit,
  GiShrimp,
  GiMapleLeaf,
  GiTeapotLeaves,
  GiCoconuts,
  GiPretzel,
  GiBison,
  GiMeat,
} from 'react-icons/gi';
import { MdRiceBowl, MdEnergySavingsLeaf } from 'react-icons/md';
import { LuSalad, LuMilkOff } from 'react-icons/lu';
import { PiBowlFoodBold, PiAvocado } from 'react-icons/pi';
import { TbMeat, TbBreadOff } from 'react-icons/tb';
import { FaLeaf, FaFish } from 'react-icons/fa6';


// ─── Cuisine ────────────────────────────────────────────────────────────────

export const CUISINE_COLORS: Record<string, PillColor> = {
  african:            { bg: 'var(--color-orange-light)',  text: 'var(--color-orange-light-text)' },
  asian:              { bg: 'var(--color-yellow-light)',  text: 'var(--color-yellow-light-text)' },
  american:           { bg: 'var(--color-blue-light)',    text: 'var(--color-blue-light-text)' },
  british:            { bg: 'var(--color-neutral-light)', text: 'var(--color-neutral-light-text)' },
  cajun:              { bg: 'var(--color-red-light)',     text: 'var(--color-red-light-text)' },
  caribbean:          { bg: 'var(--color-cyan-light)',    text: 'var(--color-cyan-light-text)' },
  chinese:            { bg: 'var(--color-yellow-light)',  text: 'var(--color-yellow-light-text)' },
  'eastern european': { bg: 'var(--color-purple-light)', text: 'var(--color-purple-light-text)' },
  european:           { bg: 'var(--color-blue-light)',    text: 'var(--color-blue-light-text)' },
  french:             { bg: 'var(--color-green-dark)',    text: 'var(--color-green-dark-text)' },
  german:             { bg: 'var(--color-yellow-light)',  text: 'var(--color-yellow-light-text)' },
  greek:              { bg: 'var(--color-blue-light)',    text: 'var(--color-blue-light-text)' },
  indian:             { bg: 'var(--color-purple-light)',  text: 'var(--color-purple-light-text)' },
  irish:              { bg: 'var(--color-green-light)',   text: 'var(--color-green-light-text)' },
  italian:            { bg: 'var(--color-red-light)',     text: 'var(--color-red-light-text)' },
  japanese:           { bg: 'var(--color-pink-light)',    text: 'var(--color-pink-light-text)' },
  jewish:             { bg: 'var(--color-yellow-light)',  text: 'var(--color-yellow-light-text)' },
  korean:             { bg: 'var(--color-red-light)',     text: 'var(--color-red-light-text)' },
  'latin american':   { bg: 'var(--color-orange-light)', text: 'var(--color-orange-light-text)' },
  mediterranean:      { bg: 'var(--color-green-light)',   text: 'var(--color-green-light-text)' },
  mexican:            { bg: 'var(--color-orange-light)',  text: 'var(--color-orange-light-text)' },
  'middle eastern':   { bg: 'var(--color-yellow-light)',  text: 'var(--color-yellow-light-text)' },
  nordic:             { bg: 'var(--color-neutral-light)', text: 'var(--color-neutral-light-text)' },
  southern:           { bg: 'var(--color-orange-light)',  text: 'var(--color-orange-light-text)' },
  spanish:            { bg: 'var(--color-red-light)',     text: 'var(--color-red-light-text)' },
  thai:               { bg: 'var(--color-cyan-light)',    text: 'var(--color-cyan-light-text)' },
  vietnamese:         { bg: 'var(--color-green-light)',   text: 'var(--color-green-light-text)' },
};

export const CUISINE_ICONS: Record<string, ReactElement> = {
  african:            <PiBowlFoodBold />,
  asian:              <GiTeapotLeaves />,
  american:           <GiHamburger />,
  british:            <GiCheeseWedge />,
  cajun:              <GiShrimp />,
  caribbean:          <GiCoconuts />,
  chinese:            <GiDumpling />,
  'eastern european': <GiBeerStein />,
  european:           <LuSalad />,
  french:             <GiCroissant />,
  german:             <GiPretzel />,
  greek:              <GiFriedFish />,
  indian:             <GiHotSpices />,
  irish:              <GiBeerStein />,
  italian:            <GiTomato />,
  japanese:           <GiSushis />,
  jewish:             <MdRiceBowl />,
  korean:             <GiNoodles />,
  'latin american':   <GiTacos />,
  mediterranean:      <LuSalad />,
  mexican:            <GiTacos />,
  'middle eastern':   <GiKebabSpit />,
  nordic:             <GiMapleLeaf />,
  southern:           <TbMeat />,
  spanish:            <GiCheeseWedge />,
  thai:               <GiCoconuts />,
  vietnamese:         <GiNoodles />,
};

// ─── Diet ───────────────────────────────────────────────────────────────────

export const DIET_COLORS: Record<string, PillColor> = {
  vegetarian:  { bg: 'var(--color-green-light)',   text: 'var(--color-green-light-text)' },
  vegan:       { bg: 'var(--color-green-dark)',    text: 'var(--color-green-dark-text)' },
  glutenFree:  { bg: 'var(--color-yellow-light)',  text: 'var(--color-yellow-light-text)' },
  dairyFree:   { bg: 'var(--color-blue-light)',    text: 'var(--color-blue-light-text)' },
  ketogenic:   { bg: 'var(--color-purple-light)',  text: 'var(--color-purple-light-text)' },
  paleo:       { bg: 'var(--color-orange-light)',  text: 'var(--color-orange-light-text)' },
  primal:      { bg: 'var(--color-red-light)',     text: 'var(--color-red-light-text)' },
  pescetarian: { bg: 'var(--color-cyan-light)',    text: 'var(--color-cyan-light-text)' },
  lowFodmap:   { bg: 'var(--color-pink-light)',    text: 'var(--color-pink-light-text)' },
  whole30:     { bg: 'var(--color-neutral-light)', text: 'var(--color-neutral-light-text)' },
};

export const DIET_ICONS: Record<string, ReactElement> = {
  vegetarian:  <FaLeaf />,
  vegan:       <MdEnergySavingsLeaf />,
  glutenFree:  <TbBreadOff />,
  dairyFree:   <LuMilkOff />,
  paleo:       <GiBison />,
  primal:      <GiMeat />,
  pescetarian: <FaFish />,
  ketogenic:   <PiAvocado />,
};

export const LANGUAGE_NAMES: Record<string, string> = {
  es: 'Spanish',
  fr: 'French',
  pt: 'Portuguese',
};