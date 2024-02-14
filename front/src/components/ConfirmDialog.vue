<script setup>

  import { ref } from 'vue';

  let props = defineProps({
     
  });

</script>

<template>
  <aside>
    <slot name="title" />
    <slot name="content" />
  </aside>
</template>

<style lang="scss">

</style>