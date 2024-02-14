<script setup>
  import Icon from '@/components/Icon.vue';
  import Avatar from '@/components/Avatar.vue';
  import Link from '@/components/Link.vue';

</script>

<template>
  <header class="w-3 h-screen left_menu flex flex-column">
    <Link :to="{name: 'home'}">
      <template #content>
        <h2 class="m-0 text-center pt-2">63 VTC</h2>
      </template>
    </Link>
    <nav class="flex-1">
      <ul class="list-none p-0 ml-3 mt-5 flex flex-column gap-4">
        <li class="flex flex-row align-items-center gap-2 cursor-pointer">
          <Icon :name="'home'"></Icon>
          <p class="p-0 m-0">Accueil</p>
        </li>
        <li class="flex flex-row align-items-center gap-2 cursor-pointer">
          <Icon :name="'car'"></Icon>
          <p class="p-0 m-0">Mes courses</p>
        </li>
        <li class="flex flex-row align-items-center gap-2 cursor-pointer">
          <Icon :name="'calendar'"></Icon>
          <p class="p-0 m-0">Mes événements</p>
        </li>
        <li class="flex flex-row align-items-center gap-2 cursor-pointer">
          <Icon :name="'bookmark'"></Icon>
          <p class="p-0 m-0">Mes addresses</p>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss">
  
  @import '../../../../src/assets/styles/global.scss';

  .left_menu {
    background-color: $background-light;
    border-right: 1px solid $border;
  }
</style>