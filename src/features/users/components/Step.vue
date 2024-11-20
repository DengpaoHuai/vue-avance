<script setup lang="ts">
import { createZodPlugin } from '@formkit/zod';
import type { z } from 'zod';
import useStepManager from '../utils/step-manager';
import { isReactive, ref, toRefs, watch } from 'vue';

const manager = useStepManager();
const currentStep1 = ref([]);

watch(manager.currentStep, (value) => {
    console.log("value");
    console.log(value);
    //currentStep.value = manager.getStep()?.formInputs;
}, {
    immediate: true
})

const [zodPlugin, submitHandler] = createZodPlugin(
    manager.getStep()?.zodSchema as z.ZodObject<any>,
    manager.handleSubmit
)

</script>


<template>

    <FormKit type="form" :plugins="[zodPlugin]" @submit="submitHandler">


        <FormKit v-for="field in currentStep1" :key="field.name" :type="field.type" :name="field.name"
            :label="field.label" />


    </FormKit>

</template>