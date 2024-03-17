<script setup>

  import { ref } from 'vue'

  import { useRouter } from 'vue-router';

  import { remove as removeAddress} from '@/utils/address.js'
  
  let props = defineProps({
    address_id: {
      type: Number,
      required: true
    }
  });

  let router = useRouter()

  let handleDelete = async () => {
    try {
      let removed_item = await removeAddress(props.address_id)
      if (removed_item.status === 204) {
        router.push({name: 'user_address'})
      }
    } catch (error) {
      console.log(error)
    }
  };

</script>

<template>
  <aside class="flex flex-column gap-3 align-items-center mx-3 mt-5">
    <h3 class="m-0">Suppression d'une addresse sauvegarder</h3>
    <p class="m-0 text-sm">Etes vous sûr de vouloir effacer cette addresse?</p>
    <div class="flex w-12 justify-content-between">
      <Button :label="'Annuler'" type='navigation' :to="{name: 'user_address'}" />
      <Button :label="'Supprimer'" type='danger' @click="handleDelete"/>
    </div>
  </aside>
</template>

<style lang="scss" scoped>

</style>