<script setup>

  import LeftMenu from './src/layout/LeftMenu.vue';
  import TopMenu from './src/layout/TopMenu.vue';

</script>

<template>
  <div class="flex flex-row">
    <LeftMenu />
    <main class="w-full h-screen overflow-y-scroll overflow-x-none">
      <TopMenu />
    </main>
  </div>
</template>

<style lang="scss" scoped>

</style>