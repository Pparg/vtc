<script setup>

import { ref } from 'vue'

import { useRouter } from 'vue-router';

import { get as getNotification, edit as editNotification, dropdown_options } from '@/utils/notifications.js'
import { ErrorObject } from '@/composables/errors/index'

import Dropdown from '@/components/Dropdown.vue';
import Calendar from '@/components/Calendar.vue';
import TextArea from '@/components/TextArea.vue';

let props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

let notification = await getNotification(props.id)

let { setErrors, fieldHasErrors, getFieldErrorMessage, getErrors } = ErrorObject()

let router = useRouter()

let edited_notification = ref({
  title: notification.title,
  content: notification.content,
  type: notification.type,
  publication_date: notification.publication_date
})


let handleSubmit = async () => {
  try {
    let request = await editNotification(props.id, edited_notification.value)
    if (request.status === 204) {
      console.log('here')
      router.push({ name: 'notification_list' })
    }
  } catch (error) {
    setErrors(error.response.data.errors)
  }
};

let max_publication_date = (new Date(new Date().getTime() + (3 * 7 * 24 * 60 * 60 * 1000))).toISOString()

</script>

<template>
  <section class="px-3">
    <header class="mt-2">
      <Link :to="{ name: 'notification_list' }">
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
      {{ edited_notification }}
      <div class="flex flex-column gap-2">
        <label>Titre</label>
        <InputText v-model="edited_notification.title" class="w-10" />
        <span v-if="fieldHasErrors('title')" class="text-xxs p_errors">{{ getFieldErrorMessage('title') }}</span>
      </div>
      <div class="flex flex-column gap-2">
        <label>Contenu de la notification</label>
        <TextArea v-model="edited_notification.content" class="w-10" />
        <span v-if="fieldHasErrors('content')" class="text-xxs p_errors">{{ getFieldErrorMessage('content') }}</span>
      </div>
      <!-- <Dropdown /> -->
      <div class="flex flex-column gap-2">
        <label>Type de notification</label>
        <Dropdown v-model="edited_notification.type" :options="dropdown_options"
          :placeholder="'Selectionnez un type de notification'" class="w-10" />
      </div>
      <div class="flex flex-column gap-2">
        <label>Date de publication</label>
        <Calendar v-model="edited_notification.publication_date" class="w-10" :max="max_publication_date" />
        <span v-if="fieldHasErrors('publication_date')" class="text-xxs p_errors">{{
        getFieldErrorMessage('publication_date') }}</span>
      </div>
      <Button :label="'Sauvegarder'" @click="handleSubmit" class="w-max" />
    </article>
  </section>

</template>

<style lang="scss" scoped></style>