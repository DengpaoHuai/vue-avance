<script setup lang="ts">
import useFetch from '@/composables/useFetch';
import usePromise from '@/composables/usePromise';
import { getPlanets } from '@/services/planet.services';
import { type Planet, type PlanetResponse } from '@/types/planet.types';
import { useQuery } from '@tanstack/vue-query';
import { ref } from 'vue';

const page = ref(1)

//const { data: planets, isLoading, error } = useFetch<Planet>('https://swapi.dev/api/planets/');
//const { data: planets, isLoading, error } = usePromise(getPlanets)
const { data: planets, isLoading, error } = useQuery<PlanetResponse>({
    queryKey: ['planets', page],
    queryFn: () => getPlanets(page.value),
    staleTime: 10000
})
</script>


<template>
    <div>
        <div v-if="isLoading">Chargement...</div>
        <div v-if="error">Erreur: {{ error }}</div>
        <h1>Liste des planètes</h1>
        <ul>
            <li v-for="(planet, key) in planets?.results" :key="key">
                {{ planet.name }}
            </li>
        </ul>
        <button @click="page--">Page précédente</button>
        <button @click="page++">Page suivante</button>

    </div>

</template>