<script setup>

  import { ref } from 'vue';

  import { useAuthStore } from '@/store/auth/authStore';

  import { login } from '@/utils/authentication/index'
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
      let user_login = await login(user_info.value)
      if (user_login.status === 200) {
        localStorage.setItem('63vtc', user_login.data.token)
        auth.setUser(user_login.data.user_data)
        auth.setAdmin(user_login.data.isAdmin)
        router.push('/dashboard')
      }
    } catch (error) {
      console.log(error)
      setErrors(error.response.data.errors)
    }
  };

</script>

<template>
  <section class="flex flex-column align-items-center justify-content-center w-12">
    <article class="w-9 container flex border-round">
      <article class="login w-8 flex flex-column m-5 align-items-center">
        <h2 class="text-xl text-center m-0 mb-3">Connectez vous à votre compte</h2>
        <fieldset class="flex flex-column border-none w-10 flex flex-column gap-2">
          <label class="text-sm">Adresse email</label>
          <InputTextVue v-model="user_info.email" :placeholder="'nom@mail.com'" />
          <span v-if="fieldHasErrors('email')" class="text-xxs p_errors">{{ getFieldErrorMessage('email') }}</span>
          <label class="text-sm">Mot de passe</label>
          <InputPassword v-model="user_info.password" />
          <span v-if="fieldHasErrors('password')" class="text-xxs p_errors">{{ getFieldErrorMessage('password') }}</span>
        </fieldset>
        <aside class="mt-4 flex flex-column gap-3">
          <Button :label="'Connexion'" @click="handleSubmit"></Button>
          <span class="text-xs">Mot de passe oublié ?</span>
        </aside>
      </article>
      <article class="sign_in border-round-lg border-noround-left align-items-center justify-content-between flex flex-column w-4 sign_in p-5">
        <h2 class="text-xl m-0 text-center">Nouveaux chez nous ?</h2>
        <p class="text-sm text-center">Creer un compte et simplifiez vos déplacement</p>
        <Button :to="{name: 'home_sign_in'}" :label="'Inscription'" type="accent"></Button>
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