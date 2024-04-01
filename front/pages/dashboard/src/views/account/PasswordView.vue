<script setup>

  import Button from '@/components/Button.vue';
  import InputPassword from '@/components/InputPassword.vue';

  import { ref } from 'vue';

  import { useAuthStore } from '@/store/auth/authStore';

  import { updatePassword } from '@/utils/account';
  import { ErrorObject } from '@/composables/errors/index'

  let { setErrors, fieldHasErrors, getFieldErrorMessage, getErrors } = ErrorObject();

  let authStore = useAuthStore();

  let current_user = authStore.getUser;

  let password_info = ref({
    current_password: '',
    new_password: '',
    validation_password: ''
  });

  let verification_error = ref(false)

  let show_sucess_message = ref(false)

  let handleSubmit = async (event) => {
    if (password_info.value.validation_password !== password_info.value.new_password) {
      verification_error.value = true
      show_sucess_message = false
    } else {
      try {
        verification_error.value = false
        let update_password = await updatePassword({password: password_info.value.new_password, current_password: password_info.value.current_password})
        if (update_password.status === 201) {
          password_info.value = {
            current_password: '',
            new_password: '',
            validation_password: ''
          }
          show_sucess_message.value = true
          setTimeout(()=> {
            show_sucess_message.value = false
          }, 2000)
        }
      } catch (error) {
        show_sucess_message.value = false
        setErrors(error.response?.data?.errors)
      }
    }
  };
</script>

<template>
  <article>
    <fieldset class="flex flex-column gap-2 border-none p-0">
      <div class="flex flex-column w-8 gap-2" v-if="['user', 'chofer'].includes(current_user.role)">
        <span class="text-sm">Mot de passe actuel</span>
        <InputPassword v-model="password_info.current_password"></InputPassword>
        <p v-if="fieldHasErrors('base')" class="text-xxs p_errors m-0">{{ getFieldErrorMessage('base')}}</p>
      </div>
      <div class="flex flex-column w-8 gap-2" v-if="['user', 'chofer'].includes(current_user.role)">
        <span class="text-sm">Nouveau mot de passe</span>
        <InputPassword v-model="password_info.new_password"></InputPassword>
      </div>
      <div class="flex flex-column w-8 gap-2" v-if="['user', 'chofer'].includes(current_user.role)">
        <span class="text-sm">Confirmez le nouveau mot de passe</span>
        <InputPassword v-model="password_info.validation_password"></InputPassword>
        <p v-if="verification_error" class="text-xxs p_errors">Le mot de passe est incorecte</p>
      </div>
      <p class="text-sm p_errors" v-if="fieldHasErrors('password')">{{ getFieldErrorMessage('password') }}</p>
      <aside class="flex flex-column gap-2 mt-3">
        <p class="m-0 text-xs p_valid" v-if="show_sucess_message">Votre mot de passe a était enregistrée.</p>
        <Button class="w-min" :label="'Sauvegarder'" @click="handleSubmit"></Button>
      </aside>
    </fieldset>
  </article>
</template>

<style lang="scss">

</style>