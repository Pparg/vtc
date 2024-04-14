<script setup>

  import { ref } from 'vue';

  import { useRouter } from 'vue-router';

  import { getAvailability, setDeleteModel, formatDelete, remove as deleteAvailability } from '@/utils/availability';

  import Checkbox from '@/components/Checkbox.vue';

  let props = defineProps({
    availability_id: {
      type: Number,
      required: true
    }
  });

  let router = useRouter()

  let availability = await getAvailability(props.availability_id);

  let getTime = (time) => {
    let array_time = time.split(':')
    return [array_time[0], array_time[1]].join('h')
  };

  let deleted_availability = ref(setDeleteModel(availability.data.data));

  let handleDelete = async () => {
    try {
      let removed_availability = formatDelete(deleted_availability.value)
      let request = await deleteAvailability(removed_availability)
      if (request.status === 204) {
        router.push({ name: 'availability_overwiew'})
      }
    } catch (error) {
      console.log(error)
    }
  };

</script>

<template>
  <section class="mx-3 mt-4 flex flex-column gap-3">
    {{ deleted_availability }}
    <header class="flex flex-column gap-2">
      <h3 class="m-0">Suppresion d'une disponibilitée</h3>
      <p class="p-0 m-0 text-sm">Voici les disponibilitées avec la même date</p>
    </header>
    <article class="flex flex-column gap-3">
      <div class="flex flex-column gap-2">
        <h4 class="m-0">{{ availability.data.day }}</h4>
        <p class="p-0 m-0 text-sm">Choissisez les plages horaires a supprimer</p>
      </div>
      <div v-for="time_range in availability.data.data" class="flex flex-row align-items-center gap-2">
        <Checkbox v-model="deleted_availability[time_range.id]" />
        <span>De</span>
        <span>{{ getTime(time_range.start_time) }}</span>
        <span>à</span>
        <span>{{ getTime(time_range.end_time) }}</span>
      </div>
      <Button :label="'Supprimer'" :type="'danger'" @click="handleDelete" />
    </article>
  </section>
</template>

<style lang="scss" scoped>

</style>