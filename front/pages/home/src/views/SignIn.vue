<script setup>

  import { ref } from 'vue';

  import { createAccount } from '@/utils/authentication/index'
  import { ErrorObject } from '@/composables/errors/index'

  import { useAuthStore } from '@/store/auth/authStore';
  import { useRouter } from 'vue-router';

  import InputText from '@/components/InputText.vue';
  import InputPassword from '@/components/InputPassword.vue';
  import Button from '@/components/Button.vue';
  import Checkbox from '@/components/Checkbox.vue';

  let { setErrors, fieldHasErrors, getFieldErrorMessage } = ErrorObject()

  let router = useRouter()

  let auth = useAuthStore()

  let user_info = ref({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    newsletter: false,
    has_accepted_terms: false
  });

  let handleSubmit = async () => {
    try {
      let user_login = await createAccount(user_info.value)
      if (user_login.status === 200) {
        localStorage.setItem('63vtc', user_login.data.token)
        auth.setUser(user_login.data.user_data, user_login.data.role)
        auth.setAdmin(user_login.data.isAdmin)
        router.push('/dashboard')
      }
    } catch (error) {
      console.log(error.response.data.errors)
    }
  };

</script>

<template>
  <section class="flex flex-column align-items-center justify-content-center ">
      <article class="w-9 container flex border-round">
        <article class="login w-8 flex flex-column m-5 align-items-center">
          <h2 class="text-xl m-0 mb-3 w-12">Inscrivez-vous</h2>
          <h4 class="text-sm w-12 font-medium">Commander et gérer vos déplacement en quelque clics</h4>
          <fieldset class="flex flex-column border-none w-12 flex flex-column gap-2">
            <div class="flex gap-2 w-12">
              <div class="w-6 flex flex-column gap-2">
                <label class="text-sm">Nom</label>
                <InputText v-model="user_info.last_name" :placeholder="'Doe'"/>
                <span v-if="fieldHasErrors('last_name')" class="text-xxs p_errors">{{ getFieldErrorMessage('last_name') }}</span>
              </div>
              <div class="w-6 flex flex-column gap-2">
                <label class="text-sm">Prenom</label>
                <InputText v-model="user_info.first_name" :placeholder="'John'"/>
                <span v-if="fieldHasErrors('first_name')" class="text-xxs p_errors">{{ getFieldErrorMessage('first_name') }}</span>
              </div>
            </div>
            <label class="text-sm">Adresse email</label>
            <InputText v-model="user_info.email" :placeholder="'nom@mail.com'" />
            <span v-if="fieldHasErrors('email')" class="text-xxs p_errors">{{ getFieldErrorMessage('email') }}</span>
            <label class="text-sm">Mot de passe</label>
            <InputPassword v-model="user_info.password" />
            <span v-if="fieldHasErrors('password')" class="text-xxs p_errors">{{ getFieldErrorMessage('password') }}</span>
            <div class="flex gap-2 align-items-center">
              <Checkbox  v-model="user_info.has_accepted_terms"/>
              <label class="text-sm">Accepter les termes et conditions</label>
            </div>
            <span v-if="fieldHasErrors('has_accepted_terms')" class="text-xxs p_errors">{{ getFieldErrorMessage('has_accepted_terms') }}</span>
            <div class="flex gap-2 align-items-center">
              <Checkbox v-model="user_info.newsletter"/>
              <label class="text-sm">Souscrire à la newsletter</label>
            </div>
          </fieldset>
          <aside class="mt-4 flex flex-column gap-3">
            <Button :label="'Inscription'" @click="handleSubmit"></Button>
          </aside>
        </article>
        <article class="sign_in border-round-lg border-noround-left align-items-center justify-content-between flex flex-column w-4 sign_in p-5">
          <h2 class="text-xl m-0 text-center">Déjà un compte ?</h2>
          <p class="text-sm text-center">Connecter vous et préparer votre prochain déplacement.</p>
          <Button :to="{ name: 'home_login' }" :label="'Connexion'" type="accent"></Button>
        </article>
      </article>
    </section>
</template>

<style lang="scss" scoped>
  @import '../../../../src/assets/styles/global.scss';

  .container{
    background-color: $background-light;
  }

  .sign_in {
    background-color: $accent;
  }

</style>