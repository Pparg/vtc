<script setup>

  import { ref } from 'vue';

  import LeftMenu from './src/layout/LeftMenu.vue';
  import TopMenu from './src/layout/TopMenu.vue';
  
  let menu_is_open = ref(false);

  let handleToggleMenu = () => {
    menu_is_open.value = !menu_is_open.value
  };

  let closePanel = () => {
    menu_is_open.value = false
  };

</script>

<template>
  <div class="flex flex-row">
    <LeftMenu class="left_menu" v-show="menu_is_open" @closePanel="closePanel" />
    <main class="w-full h-screen overflow-y-scroll overflow-x-none">
      <TopMenu @handleMenu="handleToggleMenu" />
      <router-view v-slot="{Component}">
        <component :is="Component"></component>
      </router-view>
    </main>
  </div>
</template>

<style lang="scss" scoped>

</style>