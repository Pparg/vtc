<script setup>

  import { ref } from 'vue';
  
  import { useRouter } from 'vue-router';

  import InputHour from '@/components/InputHour.vue';

  import { getAvailability, setEditModel, edit as editAvailability, formatEdit } from '@/utils/availability';

  import { ErrorObject } from '@/composables/errors/index'


  let props = defineProps({
    availability_id: {
      type: Number,
      required: true
    }
  });
  
  let { setErrors, fieldHasErrors, getFieldErrorMessage, getErrors } = ErrorObject()

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
      setErrors(error.response.data.errors)
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
      <aside v-for="key, index in Object.keys(edited_availability)" class="flex gap-2">
        <div class="flex flex-row align-items-center gap-2">
          <span>De</span>
          <InputHour v-model="edited_availability[key].start" />
          <span>à</span>
          <InputHour v-model="edited_availability[key].end" />
        </div>
        <p v-if="fieldHasErrors(`timeslot_${index}`)" class="p_errors text-xxs">{{ getFieldErrorMessage(`timeslot_${index}`) }}</p>
      </aside>
    </article>
  </section>
</template>

<style lang="scss" scoped></style>