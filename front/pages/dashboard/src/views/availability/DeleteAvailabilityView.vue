<script setup>

  import { useRouter } from 'vue-router';

  import { remove as deleteAvailability } from '@/utils/availability';

  import { ErrorObject } from '@/composables/errors/index'

  let props = defineProps({
    availability_id: {
      type: Number,
      required: true
    }
  });

  let { setErrors, fieldHasErrors, getFieldErrorMessage } = ErrorObject()
  
  let router = useRouter()

  let handleDelete = async () => {
    try {
      let request = await deleteAvailability(props.availability_id)
      if (request.status === 204) {
        router.push({ name: 'availability_overwiew'})
      }
    } catch (error) {
      setErrors(error.response.data.errors)
    }
  };

</script>

<template>
  <aside class="flex flex-column gap-3 align-items-center mx-3 mt-5">
    <h3 class="m-0">Suppression d'une disponibilité</h3>
    <p class="m-0 text-sm">Etes vous sûr de vouloir effacer cette disponibilité?</p>
    <p v-if="fieldHasErrors('base')" class="p_errors">{{ getFieldErrorMessage('base') }}</p>
    <div class="flex w-12 justify-content-between">
      <Button :label="'Annuler'" type='navigation' :to="{ name: 'availability_overwiew' }" />
      <Button :label="'Supprimer'" type='danger' @click="handleDelete" />
    </div>
  </aside>
</template>

<style lang="scss" scoped>

</style>