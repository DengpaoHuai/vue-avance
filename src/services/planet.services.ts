import type { PlanetResponse } from '@/types/planet.types';

export const getPlanets = async (page = 1): Promise<PlanetResponse> => {
  const response = await fetch('https://swapi.dev/api/planets/?page=' + page);
  const data = await response.json();
  return data;
};
