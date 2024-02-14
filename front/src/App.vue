<script setup>
  import { RouterLink, RouterView } from 'vue-router'

  import InputText from './components/InputText.vue';
  import InputNumber from './components/InputNumber.vue';
  import Icon from './components/Icon.vue'
  
  import Home from '../pages/home/App.vue'

  import { ref } from 'vue';

  let test = ref('');
  let test2 = ref(0);


</script>

<template>
  <div class="test">
    <RouterView v-slot="{ Component }">
      <component :is="Component" ></component>
    </RouterView>
  </div>

</template>

<style scoped>

</style>
