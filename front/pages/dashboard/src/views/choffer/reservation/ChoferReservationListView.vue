<script setup>

  import { ref } from 'vue'

  import PassedReservation from './PassedReservation.vue'
  import PendingReservation from './PendingReservation.vue'

  let current_tab = ref('')

</script>

<template>
  <section class="px-3">
    <header>
      <h2 class="text-xl">Centre de reservation</h2>
      <nav class="flex list-none">
        <li class="px-2 text-sm cursor-pointer" :class="{ 'border_active pb-1 font-bold': current_tab === '' }" @click="current_tab = ''">A venir</li>
        <li class="px-2 text-sm cursor-pointer" :class="{ 'border_active pb-1 font-bold': current_tab === 'passed' }" @click="current_tab = 'passed'">Effectués</li>
      </nav>
    </header>
    <article class="mt-5">
      <PassedReservation v-if="current_tab === 'passed'"/>
      <PendingReservation v-else />
    </article>
  </section>
</template>

<style lang="scss" scoped>
  .border_active {
    border-bottom: 2px solid;
  }
</style>