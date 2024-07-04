<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{ counterStore.count }}</p>
    <button @click="counterStore.increment()">incrementar</button>
    <p>{{ counterStore.doubleCount }}</p>
    <ul>
      <li v-for="(item, indice) in counterStore.array" :key="indice">{{ item }}</li>
    </ul>
    <button @click="addArray()">a</button>
  </div>
</template>
<script>
import { ref } from "vue";
import { useCounterStore } from "../stores/counter";
export default {
  setup() {
    const counterStore = useCounterStore();
    const addArray = () => {      
      counterStore.array.push(counterStore.count);
      localStorage.setItem('contador', JSON.stringify(counterStore.array));
    }
    return {
      counterStore,
      addArray
    };
  },
};
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
