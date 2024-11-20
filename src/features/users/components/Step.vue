<script setup lang="ts">
import { createZodPlugin } from '@formkit/zod';
import { z } from 'zod';
import useStepManager from '../utils/step-manager';
import { onMounted } from 'vue';

const manager = useStepManager();

onMounted(() => {
    console.log('mounted')
})

const [zodPlugin, submitHandler] = createZodPlugin(
    manager.getStep()?.zodSchema as z.ZodObject<any>,
    manager.handleSubmit
)

</script>


<template>
    <FormKit type="form" :plugins="[zodPlugin]" @submit="submitHandler">
        <FormKit v-for="field in manager.getStep()?.formInputs" :key="field.name" :type="field.type" :name="field.name"
            :label="field.label" />
    </FormKit>
</template>