<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import z from 'zod';
import Step from '@/features/users/components/Step.vue';
import useStepManager from '@/features/users/utils/step-manager';
const route = useRoute();

const manager = useStepManager();

const zodSchema = ref(z.object({
    email: z.string().email(),
    firstname: z.string(),
    lastname: z.string(),
    cuID: z.string().regex(/^[0-9]{8}$/),
    identity_entreprise: z.string()
}))

onMounted(() => {
    //appel api
})


</script>



<template>

    <Step />
    <button @click="manager.previousStep()">Previous</button>
    <button @click="manager.nextStep()">Next</button>


</template>