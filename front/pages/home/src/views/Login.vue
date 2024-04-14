<script setup>

  import { ref } from 'vue';

  import { useAuthStore } from '@/store/auth/authStore';

  import { login } from '@/utils/authentication/index'
  import { useRouter } from 'vue-router';

  import { ErrorObject } from '@/composables/errors/index'

  import InputTextVue from '@/components/InputText.vue';
  import InputPassword from '@/components/InputPassword.vue';
  import Button from '@/components/Button.vue';

  let { setErrors, fieldHasErrors, getFieldErrorMessage, getErrors } = ErrorObject()

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
    <article class="container flex flex-column gap-4 w-10 p-3 border-round align-items-center">
      <article class="w-12 flex flex-column align-items-center px-5">
        <h2 class="text-xl text-center m-0 mb-3">Connectez vous à votre compte</h2>
        <fieldset class="flex flex-column border-none w-10  gap-2">
          <label class="text-sm">Adresse email</label>
          <InputTextVue v-model="user_info.email" :placeholder="'nom@mail.com'" />
          <span v-if="fieldHasErrors('email')" class="text-xxs p_errors">{{ getFieldErrorMessage('email') }}</span>
          <label class="text-sm">Mot de passe</label>
          <InputPassword v-model="user_info.password" />
          <span v-if="fieldHasErrors('password')" class="text-xxs  p_errors">{{ getFieldErrorMessage('password') }}</span>
          <span v-if="fieldHasErrors('invalid')" class="text-xxs p_errors">{{ getFieldErrorMessage('invalid') }}</span>
        </fieldset>
        <aside class="mt-4 flex flex-column gap-3">
          <Button :label="'Connexion'" @click="handleSubmit"></Button>
          <div class="flex flex-column align-items-center gap-2">
            <span class="text-xs">Mot de passe oublié ?</span>
            <Link :to="{name: 'choffer_login'}">
              <template #content>
                <span class="text-xs">Vous êtes un chauffeur? C'est par ici</span>
              </template>
            </Link>
          </div>
        </aside>
      </article>
      <article class="border-round-lg align-items-center justify-content-between flex flex-column w-12 sign_in my-2 p-2">
        <h2 class="text-xl m-0 text-center">Nouveaux chez nous ?</h2>
        <p class="text-sm text-center">Creer un compte et simplifiez vos déplacement</p>
        <Button :to="{name: 'home_sign_in'}" :label="'Inscription'" type="accent"></Button>
      </article>
    </article>
  </section>
</template>

<style scoped lang="scss">

  @import '../../../../src/assets/styles/global.scss';
  @import '../../../../src/assets/styles/responsive.scss';

  .container{
    background-color: $background-light;
    .sign_in {
      background-color: $accent;
    }
    @include medium-screen {
      flex-direction: row;
      padding: 8px 0;
      max-width: 900px;
      .sign_in {
        height: 100%;
        max-width: 200px;
      }
    }
  }



</style>