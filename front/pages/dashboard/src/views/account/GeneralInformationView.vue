<script setup>

  import InputText from '@/components/InputText.vue';
  import Calendar from '@/components/Calendar.vue';
  import TextArea from '@/components/TextArea.vue';
  import Button from '@/components/Button.vue';
  import Checkbox from '@/components/Checkbox.vue';

  import { ref } from 'vue';

  import { useAuthStore } from '@/store/auth/authStore';

  import { update as updateAccountInfo, formatData } from '@/utils/account';
  import { ErrorObject } from '@/composables/errors/index'

  let { setErrors, fieldHasErrors, getFieldErrorMessage, getErrors } = ErrorObject();

  let authStore = useAuthStore();

  let current_user = authStore.getUser;

  let account_general = ref({
    last_name: current_user.last_name,
    first_name: current_user.first_name,
    birthday: current_user.birthday || '',
    phone_number: current_user.phone_number || '',
    newsletter: current_user.newsletter,
    description: current_user.description || ''
  });

  let handleSubmit = async () => {
    try {
      let formated_data = formatData(current_user.role, account_general.value)
      let update = await updateAccountInfo(formated_data)
      if (update.status === 200) {
        delete update.data.success
        authStore.updateUser(update.data)
      }
    } catch (error) {
      setErrors(error.response.data.errors)
    }
  };

</script>

<template>
  <article>
    <fieldset class="flex flex-column gap-2 border-none p-0">
      <div class="flex flex-row gap-2">
        <div class="flex flex-column w-4 gap-2">
          <span class="text-sm">Nom *</span>
          <InputText v-model="account_general.last_name"></InputText>
          <span v-if="fieldHasErrors('last_name')" class="text-xxs p_errors">Ce champs doit contenir 3 characters minimun</span>
        </div>
        <div class="flex flex-column w-4 gap-2">
          <span class="text-sm">Prénom *</span>
          <InputText v-model="account_general.first_name"></InputText>
          <span v-if="fieldHasErrors('first_name')" class="text-xxs p_errors">Ce champs doit contenir 3 characters minimun</span>
        </div>
      </div>
      <div class="flex flex-column w-8 gap-2">
        <span class="text-sm">Email *</span>
        <InputText v-model="current_user.email" disabled></InputText>
      </div>
      <div class="flex flex-row gap-2">
        <div class="flex flex-column w-4 gap-2">
          <span class="text-sm">Numéro de téléphone</span>
          <InputText v-model="account_general.phone_number" class="h-full"></InputText>
        </div>
        <div class="flex flex-column w-4 gap-2">
          <span class="text-sm">Date de naissance</span>
          <Calendar v-model="account_general.birthday"></Calendar>
        </div>
      </div>
      <div class="flex flex-column w-8 gap-2" v-if="current_user.role === 'choffer'">
        <span class="text-sm">Description</span>
        <TextArea v-model="account_general.description" :col="1"></TextArea>
      </div>
      <div class="flex gap-2 align-items-center" v-if="current_user.role === 'user'">
        <Checkbox  v-model="account_general.newsletter"/>
        <label class="text-sm">Recevoir les newsletters</label>
      </div>
    </fieldset>
    <aside class="flex gap-2 mt-3">
      <Button :label="'Sauvegarder'" @click="handleSubmit"></Button>
    </aside>
  </article>
</template>

<style lang="scss"></style>