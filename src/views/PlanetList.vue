<script setup lang="ts">
import useFetch from '@/composables/useFetch';
import usePromise from '@/composables/usePromise';
import { getPlanets } from '@/services/planet.services';
import { type Planet, type PlanetResponse } from '@/types/planet.types';

//const { data: planets, isLoading, error } = useFetch<Planet>('https://swapi.dev/api/planets/');
const { data: planets, isLoading, error } = usePromise(getPlanets)
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
    </div>

</template>