<script setup>

  import { ref } from 'vue'

  import { useRouter } from 'vue-router';

  import { remove as removeReservation } from '@/utils/rides.js'

  let props = defineProps({
    reservation_id: {
      type: Number,
      required: true
    }
  });

  let router = useRouter()

  let handleDelete = async () => {
    try {
      let removed_item = await removeReservation(props.reservation_id)
      if (removed_item.status === 204) {
        router.push({ name: 'user_reservation' })
      }
    } catch (error) {
      console.log(error)
    }
  };

</script>

<template>
  <aside class="flex flex-column gap-3 align-items-center mx-3 mt-5">
    <h3 class="m-0">Suppression d'une reservation</h3>
    <p class="m-0 text-sm">Etes vous sûr de vouloir effacer cette reservation?</p>
    <div class="flex w-12 justify-content-between">
      <Button :label="'Annuler'" type='navigation' :to="{ name: 'user_reservation' }" />
      <Button :label="'Supprimer'" type='danger' @click="handleDelete" />
    </div>
  </aside>
</template>

<style lang="scss" scoped></style>