<script setup>

  import InputText from '@/components/InputText.vue';
  import InputNumber from '@/components/InputNumber.vue';
  import InputPassword from '@/components/InputPassword.vue';
  import Checkbox from '@/components/Checkbox.vue';
  import Button from '@/components/Button.vue';
  import TextArea from '@/components/TextArea.vue';

  import { useAuthStore } from '@/store/auth/authStore';

  import { ref } from 'vue';

  let authStore = useAuthStore();
  
  let current_user = authStore.getUser

  let user_info = ref({
    first_name: current_user.first_name,
    last_name: current_user.last_name,
    password: '',
    birthday: current_user.birthday,
    phone_number: current_user.phone_number || '',
    newsletter: current_user.newsletter
  });

  let driver_info = ref({
    description: ''
  })

  let handleSubmit = () => {
    console.log('submit')
  };

  let handleDelete = () => {
    console.log('delete')
  };

  

</script>

<template>
  <section class="pl-3 ">
    <div class="flex align-items-center justify-content-between pr-2">
      <h2 class="text-xl">Information de profil</h2>
      <Button :label="'Supprimer mon compte'" :type="'danger'" @click="handleDelete" v-if="current_user.role === 'user'" ></Button>
    </div>
    <fieldset class="flex flex-column gap-2 border-none p-0">
      <div class="flex flex-row gap-2">
        <div class="flex flex-column w-4 gap-2">
          <span>Nom</span>
          <InputText v-model="user_info.first_name"></InputText>
        </div>
        <div class="flex flex-column w-4 gap-2">
          <span>Prénom</span>
          <InputText v-model="user_info.last_name"></InputText>
        </div>
      </div>
      <div class="flex flex-column w-8 gap-2">
        <span>Email</span>
        <InputText v-model="current_user.email" disabled></InputText>
      </div>
      <div class="flex flex-column w-8 gap-2" v-if="current_user.role === 'user'">
        <span>Mot de passe</span>
        <InputPassword v-model="user_info.password"></InputPassword>
      </div>
      <div class="flex flex-column w-5 gap-2">
        <span>Numéro de téléphone</span>
        <InputText v-model="user_info.phone_number"></InputText>
      </div>
      <div class="flex flex-column w-8 gap-2" v-if="current_user.role === 'choffer' || true">
        <span>Description</span>
        <TextArea v-model="driver_info.description" :col="1"></TextArea>
      </div>
      <div class="flex gap-2 align-items-center" v-if="current_user.role === 'user'">
        <Checkbox  v-model="user_info.newsletter"/>
        <label class="text-sm">Recevoir les newsletters</label>
      </div>
    </fieldset>
    <aside class="flex gap-2 mt-3">
      <Button :label="'Sauvegarder'" @click="handleSubmit"></Button>
    </aside>
  </section>
</template>

<style></style>