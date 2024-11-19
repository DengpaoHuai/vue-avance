<script setup lang="ts">
import { onMounted, onUnmounted, ref, shallowRef } from 'vue';
import Button from 'primevue/button';
import useAuthStore from '@/stores/auth';
import { storeToRefs } from 'pinia';


const { name, email } = storeToRefs(useAuthStore())



const person = ref({
    name: 'John',
    age: 25
})

</script>

<template>
    <main style="height:150vh">
        <RouterLink to="/about">About</RouterLink>
        <a href="/about">About</a>
        <Button label="Click" icon="pi pi-check" @click="() => console.log('clicked')"></Button>
        <Button @click="person.name = 'toto'">
            {{ person.name }}
        </Button>
        Bonjour{{
            name
        }}
        email :
        {{
            email
        }}
        <p>
            {{ person.age }}
        </p>
        <p>hello</p>
    </main>
</template>
