<script setup>

  import { ref } from 'vue'

  import { useRouter } from 'vue-router';

  import { remove as removeNotification } from '@/utils/notifications.js'

  let props = defineProps({
    id: {
      type: Number,
      required: true
    }
  });

  let router = useRouter()

  let handleDelete = async (car_id) => {
    try {
      let removed_car = await removeNotification(props.id)
      if (removed_car.status === 204) {
        router.push({ name: 'notification_list' })
      }
    } catch (error) {
      console.log(error)
    }
  };

</script>

<template>
  <aside class="flex flex-column gap-3 align-items-center mx-3 mt-5">
    <h3 class="m-0">Suppression d'une notification</h3>
    <p class="m-0 text-sm">Etes vous sûr de vouloir effacer cette notification?</p>
    <div class="flex w-12 justify-content-between">
      <Button :label="'Annuler'" type='navigation' :to="{ name: 'notification_list' }" />
      <Button :label="'Supprimer'" type='danger' @click="handleDelete" />
    </div>
  </aside>
</template>

<style lang="scss" scoped>
</style>