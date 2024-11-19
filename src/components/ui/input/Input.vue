<script setup lang="ts">

const props = defineProps<{
    modelValue: string;
}>()


defineEmits<{
    'update:modelValue': (value: string) => void;
}>()

</script>

<template>
    <div>
        <input :value="props.modelValue" @input="$emit('update:modelValue', $event.target.value)">
    </div>

</template>

<style scoped>
input {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
}

span {
    color: red;
}
</style>