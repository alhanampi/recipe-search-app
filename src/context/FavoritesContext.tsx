import { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'dishcovery_favorites';

interface FavoritesContextValue {
  favorites: any[];
  isFavorite: (id: number) => boolean;
  addFavorite: (recipe: any) => void;
  removeFavorite: (id: number) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<any[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (id: number) => favorites.some((r) => r.id === id);

  const addFavorite = (recipe: any) => {
    setFavorites((prev) =>
      prev.some((r) => r.id === recipe.id) ? prev : [...prev, recipe]
    );
  };

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
};
