import { defineStore } from "pinia";
import { ref } from 'vue'

export const useSidebarStore = defineStore('sidebar', () => {
  const collapse = ref(false);

  function handleCollapse(a){
    collapse.value = !collapse.value;
  }

  return {collapse, handleCollapse};
})