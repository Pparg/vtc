<script setup>

  import InputText from '@/components/InputText.vue';
  import InputNumber from '@/components/InputNumber.vue';
  import InputPassword from '@/components/InputPassword.vue';
  import Checkbox from '@/components/Checkbox.vue';
  import Button from '@/components/Button.vue';
  import TextArea from '@/components/TextArea.vue';
  import Calendar from '@/components/Calendar.vue';

  import GeneralInformationView from './account/GeneralInformationView.vue';
  import PasswordView from './account/PasswordView.vue'

  import { useAuthStore } from '@/store/auth/authStore';

  import { remove as removeAccount } from '@/utils/account';
  import { ErrorObject } from '@/composables/errors/index'

  import { ref } from 'vue';
  import { useRouter } from 'vue-router';


  let router = useRouter()
  let authStore = useAuthStore();
  
  let current_user = authStore.getUser

  let handleDelete = async () => {
    try {
      let remove = await removeAccount(current_user.id)
      if (remove.status === 201) {
        authStore.logOut()
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  };

  let current_tab = ref('global');

</script>

<template>
  <section class="pl-3 ">
    <header class="flex flex-column gap-3 mb-4">
      <div class="flex align-items-center justify-content-between pr-2">
        <h2 class="text-xl">Information de profil</h2>
        <Button :label="'Supprimer mon compte'" :type="'danger'" @click="handleDelete" v-if="current_user.role === 'user'" />
      </div>
      <nav class="flex list-none">
        <li class="px-2 text-sm cursor-pointer" :class="{'border_active pb-1 font-bold': current_tab === 'global'}" @click="current_tab = 'global'">Information Générales</li>
        <li class="px-2 text-sm cursor-pointer" :class="{ 'border_active pb-1 font-bold': current_tab === 'password' }" @click="current_tab = 'password'">Mot de passe</li>
      </nav>
    </header>
    <GeneralInformationView v-if="current_tab === 'global'" />
    <PasswordView v-if="current_tab === 'password'" />
  </section>
</template>

<style>
  .border_active {
    border-bottom: 2px solid;
  }
</style>