import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const array = ref(localStorage.getItem('contador') != null ? JSON.parse(localStorage.getItem('contador')):[]);
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment, array }
})
