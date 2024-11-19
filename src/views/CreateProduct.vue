<script setup lang="ts">
import { loginSchema, type LoginFormData } from '@/schemas/auth.schema';
import { login } from '@/services/auth.services';
import { createZodPlugin } from '@formkit/zod'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { handleError } from '@/utils/handleError';
import useAuthStore from '@/stores/auth';

const isLoading = ref(false)
const error = ref<null | string>(null)
const router = useRouter()
const { setTokens } = useAuthStore()

const [zodPlugin, submitHandler] = createZodPlugin(
    loginSchema,
    async (formData: LoginFormData) => {
        login(formData).then((data) => {
            setTokens(data.accessToken, data.refreshToken)
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

        <FormKit type="text" name="email" label="Your email" />
        <FormKit type="password" name="password" label="Your password" />
        <p v-if="error">
            {{
                error
            }}
        </p>
    </FormKit>
</template>