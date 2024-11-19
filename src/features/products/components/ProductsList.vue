<script setup lang="ts">
import { useDeleteProduct } from '../api/delete-product';
import { useProducts } from '../api/useProducts';
const { data, suspense } = useProducts();
await suspense();



const mutation = useDeleteProduct();

const deleteItem = (id: string) => {
    mutation.mutateAsync(id);
}

</script>


<template>
    <div>
        <h1>Product</h1>
    </div>
    <div v-if="data">
        <ul>
            <li v-for="(product, key) in data" :key="key">
                {{ product.name }}
                <button @click="() => deleteItem(product._id)">
                    delete item
                </button>
            </li>
        </ul>
    </div>
</template>