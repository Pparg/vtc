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
  <section class="px-3">
    <header>
      <div class="flex align-items-center justify-content-between">
        <h2 class="text-xl">Centre de reservation</h2>
        <Button :label="'Reserver un déplacement'" :type="'navigation'" :to="{ name: 'new_reservation' }" />
      </div>
    </header>
    <article class="mt-5">
      <LoadableList api="/rides" :per_page="5" ref="$loadable_list">
        <template #content="slotProps">
          <Card>
            <template #title>
              <div class="flex justify-content-between align-items-center">
                <h5 class="m-0">{{ getDate(slotProps.data.date) }} {{ getTime(slotProps.data.hour) }}</h5>
                <aside class="flex flex-row gap-3">
                  <Link :to="{ name: 'edit_reservation', params: { reservation_id: slotProps.data.id } }">
                  <template #content>
                    <Icon name="pencil" :size="14" :color="'#459ECC'" />
                  </template>
                  </Link>
                  <Link :to="{ name: 'remove_reservation', params: { reservation_id: slotProps.data.id } }">
                  <template #content>
                    <Icon name="trash" :size="14" :color="'#FF5757'" />
                  </template>
                  </Link>
                </aside>
              </div>
            </template>
            <template #content>
              <p class="m-0 mt-2 text-sm">{{ slotProps.data.departure }}</p>
              <p class="m-0 mt-2 text-sm">{{ slotProps.data.destination }}</p>
            </template>
          </Card>
        </template>
        <template #no_results>
          <aside class="flex flex-column align-items-center gap-2">
            <h4 class="m-0">Vous n'avez pas encore d'addresses favorites.</h4>
            <p class="m-0 text-sm">Simplifiez vos déplacement.</p>
            <Button :label="'Ajouter une addresse'" :type="'navigation'" :to="{ name: 'new_address' }" />
          </aside>
        </template>
      </LoadableList>
    </article>
  </section>
</template>

<style lang="scss" scoped></style>