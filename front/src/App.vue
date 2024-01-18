<script setup>
  import { RouterLink, RouterView } from 'vue-router'

  import InputText from './components/InputText.vue';
  import InputNumber from './components/InputNumber.vue';
  import Icon from './components/Icon.vue'
  
  import { ref } from 'vue';


  let test = ref('');
  let test2 = ref(0);


</script>

<template>
  <main>
    hello
  </main>
</template>

<style scoped>

  body{
    border: 1px solid red;
  }

  /* main {
    border: 1px solid;
  } */

</style>
