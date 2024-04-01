<script setup>

  import { computed, ref } from 'vue';

  import { generateDropdownOption, get as getChoferAvailability } from '@/utils/availability.js'

  import Dropdown from '@/components/Dropdown.vue';

  let get_option = ref('week');

  let chofer_availabilities = await getChoferAvailability('week');

  let sorted_availabilities = computed(() => {
    
  });
</script>

<template>
  <section class="px-3">
    <header>
      <div class="flex align-items-center justify-content-between">
        <h2 class="text-xl">Centre de gestion des Disponibilitées</h2>
        <Button :label="'Ajouter des disponibilitées'" :to="{name: 'add_availability'}" />
      </div>
      <p class="text-xs">Visualisez vos disponibilitées selon vos critères.</p>
    </header>
    <article>
      <Dropdown v-model="get_option" :options="generateDropdownOption()" :placeholder="'Sélectionez les disponibilitées souhaitez'" class="w-10" />
    </article>
    <article>

    </article>
  </section>
</template>

<style lang="scss" scoped>
</style>