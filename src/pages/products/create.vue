<script setup lang="ts">
import { createZodPlugin } from '@formkit/zod'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { handleError } from '@/utils/handleError';
import { productSchema, useCreateProduct, type CreateProductForm } from '@/features/products/api/useCreateProduct';
import { useQueryClient } from '@tanstack/vue-query';

const isLoading = ref(false)
const error = ref<null | string>(null)
const router = useRouter()

const mutation = useCreateProduct()
const queryClient = useQueryClient();

const [zodPlugin, submitHandler] = createZodPlugin(
    productSchema,
    async (formData: CreateProductForm) => {
        mutation.mutateAsync(formData).then((data) => {
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

        <FormKit type="text" name="name" label="Product name" />
        <FormKit type="number" name="price" label="Product price" />
        <p v-if="error">
            {{
                error
            }}
        </p>

    </FormKit>
</template>