<script setup>
  
  import LoadableList from '@/components/LoadableList.vue';

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
  <LoadableList api="/rides/chofer" :per_page="5" ref="$loadable_list">
    <template #content="slotProps">
      <Card>
        <template #title>
          <h4 class="pb-4 m-0">{{ getDate(slotProps.data.date) }} {{ getTime(slotProps.data.hour) }}</h4>
        </template>
        <template #content>
          <aside>
            <h4 class="m-0">Client: {{ slotProps.data.user.last_name }} {{ slotProps.data.user.first_name }}</h4>
            <p class="m-0 mt-2 text-sm">Depart: {{ slotProps.data.departure }}</p>
            <p class="m-0 mt-2 text-sm">Arrivée: {{ slotProps.data.destination }}</p>
          </aside>
        </template>
      </Card>
    </template>
    <template #no_results>
      <aside class="flex flex-column align-items-center gap-2">
        <h4 class="m-0">Aucune reservation à venir.</h4>
      </aside>
    </template>
  </LoadableList>
</template>

<style></style>