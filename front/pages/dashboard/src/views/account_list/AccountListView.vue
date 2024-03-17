<script setup>

  import { ref } from 'vue';

  import UsersList from './UsersListView.vue'
  import ChoffersList from './ChoffersListView.vue'

  let current_tab = ref('users');

</script>

<template>
  <section class="px-3 ">
    <header class="flex flex-column mb-4 gap-2">
      <div>
        <h2 class="text-xl">Liste des utilisateurs</h2>
        <p class="text-xs">Cette interface est dédiée au administrateur. Elle permet de trouver la liste des utilisateurs de l'application et toutes les actions liées.</p>
      </div>
      <nav class="flex list-none">
        <li class="px-2 text-sm cursor-pointer" :class="{ 'border_active pb-1 font-bold': current_tab === 'users' }" @click="current_tab = 'users'">Client</li>
        <li class="px-2 text-sm cursor-pointer" :class="{ 'border_active pb-1 font-bold': current_tab === 'choffers' }" @click="current_tab = 'choffers'">Chauffeurs</li>
      </nav>
    </header>
    <UsersList v-if="current_tab === 'users'"/>
    <ChoffersList v-if="current_tab === 'choffers'" />
  </section>
</template>

<style scoped lang="scss">
  .border_active {
    border-bottom: 2px solid;
  }
</style>