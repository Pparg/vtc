<script setup>

  import LeftMenu from './src/layout/LeftMenu.vue';
  import TopMenu from './src/layout/TopMenu.vue';

</script>

<template>
  <div class="flex flex-row">
    <LeftMenu />
    <main class="w-full h-screen overflow-y-scroll overflow-x-none">
      <TopMenu />
      <router-view v-slot="{Component}">
        <component :is="Component"></component>
      </router-view>
    </main>
  </div>
</template>

<style lang="scss" scoped>

</style>