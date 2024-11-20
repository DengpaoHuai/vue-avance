<script setup lang="ts">

</script>

<template>
    <div class="greetings">
        <slot name="toto"></slot>
        <h1 class="green">title card</h1>
        <slot></slot>

        <slot name="validate">
            <button>Valider</button>
        </slot>
    </div>
</template>

<style scoped></style>
