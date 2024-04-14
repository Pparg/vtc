<script setup>

  import { computed, onMounted, ref, watch } from 'vue';

  import { generateDropdownOption } from '@/utils/availability.js'

  import Dropdown from '@/components/Dropdown.vue';
  import LoadableList from '@/components/LoadableList.vue';

  let get_option = ref('week');

  let getTime = (time) => {
    let array_time = time.split(':')
    return [array_time[0], array_time[1]].join('h')
  };
  let getDate = (date) => {
    let new_date = new Date(date)
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new_date.toLocaleDateString('fr-FR', options);
  };

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
      <Dropdown v-model="get_option" :options="generateDropdownOption()"
        :placeholder="'Sélectionez les disponibilitées souhaitez'" class="w-10" />
    </article>
    <article class="mt-4">
      <LoadableList :queries="`&type=${get_option}`" :api="`/availability`" :key="get_option" :per_page="5">
        <template #content="slotProps">
          <Card>
            <template #title>
              <div class="flex align-items-center justify-content-between">
                <h4 class="p-0 m-0">{{ getDate(slotProps.data.date) }}</h4>
                <aside class="flex flex-row gap-3">
                  <Link :to="{ name: 'edit_availability', params: { availability_id: slotProps.data.id } }">
                  <template #content>
                    <Icon name="pencil" :size="14" :color="'#459ECC'" />
                  </template>
                  </Link>
                  <Link :to="{ name: 'remove_availability', params: { availability_id: slotProps.data.id } }">
                  <template #content>
                    <Icon name="trash" :size="14" :color="'#FF5757'" />
                  </template>
                  </Link>
                </aside>
              </div>
            </template>
            <template #content>
              <div>
                <span>De </span>
                <span>{{ getTime(slotProps.data.start_time) }}</span>
                <span> à </span>
                <span>{{ getTime(slotProps.data.end_time) }}</span>
              </div>
            </template>
          </Card>
        </template>
        <template #no_results>
          <aside class="flex justify-content-center">
            <h3 class="m-0 p-0">Pas de disponibilitée à afficher</h3>
          </aside>
        </template>
      </LoadableList>
    </article>
  </section>
</template>

<style lang="scss" scoped>
</style>