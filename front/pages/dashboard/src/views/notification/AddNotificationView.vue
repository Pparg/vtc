<script setup>

  import { ref } from 'vue'

  import Dropdown from '@/components/Dropdown.vue';

  let new_notification = ref({
    title: '',
    content: '',
    type: ''
  })


  let handleSubmit = () => {
    try {
      
    } catch (error) {
      console.log(error)
    }
  };

</script>

<template>
  <section class="px-3">
    <header class="mt-2">
      <Link :to="{name: 'notification_list'}">
        <template #content>
          <div class="flex align-items-center gap-2 cursor-pointer w-max">
            <Icon name="arrow-left" />
            <p class="p-0 m-0 text-xs">Retour</p>
          </div>
        </template>
      </Link>
      <div class="flex align-items-center justify-content-between">
        <h2 class="text-xl">Ajouter une nouvelle notification</h2>
      </div>
    </header>
    <article class="flex flex-column gap-3">
      <div class="flex flex-column gap-2">
        <label>Titre</label>
        <InputText v-model="new_notification.title" class="w-10"/>
      </div>
      <div class="flex flex-column gap-2">
        <label>Contenu de la notification</label>
        <InputText v-model="new_notification.content"  class="w-10"/>
      </div>
      <!-- <Dropdown /> -->
      <div class="flex flex-column gap-2">
        <label>Type de notification</label>
        <InputText v-model="new_notification.type" class="w-10" />
      </div>
      <Button :label="'Sauvegarder'" @click="handleSubmit" class="w-max" />
    </article>
  </section>

</template>

<style lang="scss" scoped>
</style>