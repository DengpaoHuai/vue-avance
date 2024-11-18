<script setup lang="ts">
import useFetch from '@/composables/useFetch';
import { type Planet } from '@/types/planet.types';

const { data: planets, isLoading, error } = useFetch<Planet>('https://swapi.dev/api/planets/');

</script>


<template>
    <div>
        <div v-if="isLoading">Chargement...</div>
        <div v-if="error">Erreur: {{ error }}</div>
        <h1>Liste des planètes</h1>
        <ul>
            <li v-for="(planet, key) in planets" :key="key">
                {{ planet.name }}
            </li>
        </ul>
    </div>

</template>