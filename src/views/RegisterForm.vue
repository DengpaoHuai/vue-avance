<script setup lang="ts">
import { registerSchema, type RegisterFormData } from '@/schemas/auth.schema';
import { login, register } from '@/services/auth.services';
import { createZodPlugin } from '@formkit/zod'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { handleError } from '@/utils/handleError';

const isLoading = ref(false)
const error = ref<null | string>(null)
const router = useRouter()

const [zodPlugin, submitHandler] = createZodPlugin(
    registerSchema,
    async (formData: RegisterFormData) => {
        register(formData).then(() => {
            router.push('/')
        }).catch((err) => {
            error.value = handleError(err)
        }).finally(() => {
            isLoading.value = false
        })
    }
)
</script>

<template>
    <h1>Validation from Zod schema</h1>
    <FormKit type="form" :plugins="[zodPlugin]" @submit="submitHandler">

        <FormKit type="text" name="name" label="Your name" />
        <FormKit type="text" name="email" label="Your email" />
        <FormKit type="password" name="password" label="Your password" />
        <p v-if="error">
            {{
                error
            }}
        </p>
    </FormKit>
</template>