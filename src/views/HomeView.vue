<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import TheWelcome from '../components/TheWelcome.vue'
import { Button } from 'primevue';


const listener = (e) => {
  console.log(e)
}

onMounted(() => {
  addEventListener('scroll', listener)
})

onUnmounted(() => {
  removeEventListener('scroll', listener)
})

</script>

<template>
  <main style="height:150vh">
    <RouterLink to="/about">About</RouterLink>
    <a href="/about">About</a>
    <Button label="Click" icon="pi pi-check" @click="() => console.log('clicked')"></Button>
    <p>hello</p>
  </main>
</template>
