import type { PlanetResponse } from '@/types/planet.types'

export const getPlanets = async (): Promise<PlanetResponse> => {
  const response = await fetch('https://swapi.dev/api/planets/')
  const data = await response.json()
  return data
}
