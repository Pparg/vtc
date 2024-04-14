<script setup>

  import { ref } from 'vue';
  
  import { useRouter } from 'vue-router';

  import InputHour from '@/components/InputHour.vue';

  import { getAvailability, setEditModel, edit as editAvailability, formatEdit } from '@/utils/availability';

  let props = defineProps({
    availability_id: {
      type: Number,
      required: true
    }
  });
  
  let router = useRouter()

  let availability = await getAvailability(props.availability_id);

  let edited_availability = ref(setEditModel(availability.data.data));

  let handleEdit = async () => {
    try {
      let formated_edit = formatEdit(edited_availability.value)
      let request = await editAvailability(formated_edit)
      if (request.status === 204) {
        router.push({ name: 'availability_overwiew'})
      }
    } catch (error) {
      console.log(error)
    }
  };

</script>

<template>
  <section class="mx-3">
    <header>
      <h3>Edition d'une disponibilitée</h3>
      <p class="p-0 m-0 text-sm">Voici les disponibilitées avec la même date</p>
    </header>
    <article class="flex flex-column gap-3">
      <div class="flex align-items-center justify-content-between">
        <h4 class="m-0 p-0">{{ availability.data.day }}</h4>
        <Button :label="'Sauvegarder'" @click="handleEdit" class="w-max" />
      </div>
      <div v-for="key in Object.keys(edited_availability)" class="flex flex-row align-items-center gap-2">
        <span>De</span>
        <InputHour v-model="edited_availability[key].start" />
        <span>à</span>
        <InputHour v-model="edited_availability[key].end" />
      </div>
    </article>
  </section>
</template>

<style lang="scss" scoped></style>