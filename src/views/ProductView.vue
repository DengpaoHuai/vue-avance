<script setup lang="ts">
import usePromise from '@/composables/usePromise';
import { getProducts } from '@/services/products.services';
import { useQuery } from '@tanstack/vue-query';


type Product = {
    _id: string;
    name: string;
    price: number;
    __v: number;
}


const { data } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
})

</script>


<template>
    <div>
        <h1>Product</h1>
    </div>
    <div v-if="data">
        <ul>
            <li v-for="(product, key) in data" :key="key">
                {{ product.name }}
            </li>
        </ul>
    </div>
    <div v-else>
        Loading...
    </div>
</template>