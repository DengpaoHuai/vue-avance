<script setup lang="ts">
import Step from '@/features/users/components/Step.vue';
import useStepManager from '@/features/users/utils/step-manager';

const manager = useStepManager();

</script>

<template>
    <Step :key="manager.currentStep.value" />
    <button @click="manager.previousStep">Previous</button>
    {{ manager.currentStep }}
    <button @click="manager.nextStep">Next</button>
</template>