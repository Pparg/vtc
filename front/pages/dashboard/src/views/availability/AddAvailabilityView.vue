<script setup>

  import { ref } from 'vue';

  import { creation_type_dropdown } from '@/utils/availability.js'

  import Dropdown from '@/components/Dropdown.vue';

  import DayConfig from '../availability/partials/DayConfigView.vue'
  import WeekConfig from '../availability/partials/WeekConfigView.vue'

  let type = ref('single');

</script>

<template>
  <section class="px-3">
    <header class="mt-2">
      <Link :to="{ name: 'availability_overwiew' }">
      <template #content>
        <div class="flex align-items-center gap-2 cursor-pointer">
          <Icon name="arrow-left" />
          <p class="p-0 m-0 text-xs">Retour</p>
        </div>
      </template>
      </Link>
      <div class="flex align-items-center justify-content-between pr-2">
        <h2 class="text-xl">Nouvelle disponibilitées</h2>
      </div>
    </header>
    <article>
      <div class="flex flex-column gap-2" v-if="false">
        <label>Choissisez votre configuration</label>
        <Dropdown v-model="type" :options="creation_type_dropdown" class="w-5" />
      </div>
      <DayConfig v-if="type === 'single'" class="flex flex-column gap-2 mt-3" />
      <WeekConfig v-if="type === 'week'" class="flex flex-column gap-2 mt-3" />
    </article>
  </section>
</template>

<style lang="scss" scoped>
</style>