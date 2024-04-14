<script setup>

  import { ref } from 'vue';

  import { useAuthStore } from '@/store/auth/authStore';

  import { choffeurLogin } from '@/utils/authentication/index'
  import { useRouter } from 'vue-router';

  import { ErrorObject } from '@/composables/errors/index'

  import InputTextVue from '@/components/InputText.vue';
  import InputPassword from '@/components/InputPassword.vue';
  import Button from '@/components/Button.vue';

  let { setErrors, fieldHasErrors, getFieldErrorMessage } = ErrorObject()

  let router = useRouter()

  let auth = useAuthStore()

  let user_info = ref({
    email: '',
    password: ''
  });


  let handleSubmit = async () => {
    try {
      let user_login = await choffeurLogin(user_info.value)
      if (user_login.status === 200) {
        localStorage.setItem('63vtc', user_login.data.token)
        auth.setUser(user_login.data.user_data, user_login.data.role)
        auth.setAdmin(user_login.data.isAdmin)
        router.push('/dashboard')
      }
    } catch (error) {
      setErrors(error.response.data.errors)
    }
  };

</script>

<template>
  <section class="flex flex-column align-items-center justify-content-center w-12">
    <article class="w-9 container flex border-round">
      <article class="login w-12 flex flex-column m-5 align-items-center">
        <h2 class="text-xl text-center m-0 mb-3">Connectez vous à votre compte</h2>
        <fieldset class="flex flex-column border-none w-10 gap-2">
          <label class="text-sm">Adresse email</label>
          <InputTextVue v-model="user_info.email" :placeholder="'nom@mail.com'" />
          <span v-if="fieldHasErrors('email')" class="text-xxs p_errors">{{ getFieldErrorMessage('email') }}</span>
          <label class="text-sm">Mot de passe</label>
          <InputPassword v-model="user_info.password" />
          <span v-if="fieldHasErrors('password')" class="text-xxs p_errors">{{ getFieldErrorMessage('password') }}</span>
          <span v-if="fieldHasErrors('invalid')" class="text-xxs p_errors">{{ getFieldErrorMessage('invalid') }}</span>
        </fieldset>
        <aside class="mt-4 flex flex-column gap-3">
          <Button :label="'Connexion'" @click="handleSubmit"></Button>
        </aside>
      </article>
    </article>
  </section>
</template>

<style scoped lang="scss">

  @import '../../../../src/assets/styles/global.scss';

  .container{
    background-color: $background-light;
  }

  .sign_in {
    background-color: $accent;
  }

</style>