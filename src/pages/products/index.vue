<script setup lang="ts">
import ProductsList from '@/features/products/components/ProductsList.vue';
import ProductsListSkeleton from '@/features/products/components/ProductsListSkeleton.vue';

</script>


<template>
    <Suspense>
        <ProductsList></ProductsList>
        <template #fallback>
            <ProductsListSkeleton></ProductsListSkeleton>
        </template>
    </Suspense>
</template>