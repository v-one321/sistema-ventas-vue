<template>
    <div>
        <h1>Formulario proveedores</h1>
        <h1>{{ counterStore.count }}</h1>
        <button @click="counterStore.increment()">incrementar</button>
        <h1>{{contador}}</h1>
        <button @click=contador++>incrementar</button>
    </div>
</template>
<script setup>
import {ref} from 'vue'
    import { useCounterStore } from '@/stores/counter'
    const counterStore = useCounterStore();
    const contador = ref(0);
</script>
<style>
    
</style>