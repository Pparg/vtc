<script setup>

  import { ref } from 'vue'; 

  import { useRouter } from 'vue-router';
  import { ErrorObject } from '@/composables/errors/index'

  import { createChofferAccount } from '@/utils/account'

  import InputPassword from '@/components/InputPassword.vue';

  let new_choffer = ref({
    last_name: '',
    first_name: '',
    email: '',
    phone_number: '',
    password: ''
  });

  let { setErrors, fieldHasErrors, getFieldErrorMessage } = ErrorObject()
  let router = useRouter()


  let handleSubmit = async () => {
    try {
      let request = await createChofferAccount(new_choffer.value)
      if (request.status === 200) {
        router.push({ name: 'list_of_users', query: { chofers: true}})
      }
    } catch (error) {
      setErrors(error.response.data.errors)
    }
  };

</script>

<template>
  <section class="px-3 mt-4">
    <Link :to="{ name: 'list_of_users', query: { chofers: true}}">
      <template #content>
        <div class="flex align-items-center gap-2 cursor-pointer">
          <Icon name="arrow-left" />
          <p class="p-0 m-0 text-xs">Retour</p>
        </div>
      </template>
    </Link>
    <header class="flex flex-column align-items-center gap-2 my-3 justify-content-between">
      <h2 class="text-xl m-0 w-12">Ajouter un nouveau chauffeur</h2>
    </header>
    <article class="flex flex-column gap-3 container">
      <div class="flex flex-column gap-2">
        <label class="text-sm">Nom</label>
        <InputText v-model="new_choffer.last_name" />
        <span v-if="fieldHasErrors('last_name')" class="text-xxs p_errors">{{ getFieldErrorMessage('last_name')}}</span>
      </div>
      <div class="flex flex-column gap-2">
        <label class="text-sm">Prénom</label>
        <InputText v-model="new_choffer.first_name" />
        <span v-if="fieldHasErrors('first_name')" class="text-xxs p_errors">{{ getFieldErrorMessage('first_name')
          }}</span>
      </div>
      <div class="flex flex-column gap-2">
        <label class="text-sm">Email</label>
        <InputText v-model="new_choffer.email" />
        <span v-if="fieldHasErrors('email')" class="text-xxs p_errors">{{ getFieldErrorMessage('email') }}</span>
        <span v-if="fieldHasErrors('base')" class="text-xxs p_errors">{{ getFieldErrorMessage('base') }}</span>
      </div>
      <div class="flex flex-column gap-2">
        <label>Mot de passe</label>
        <InputPassword v-model="new_choffer.password" />
        <span v-if="fieldHasErrors('password')" class="text-xxs p_errors">{{ getFieldErrorMessage('password') }}</span>
      </div>
      <div class="flex flex-column gap-2">
        <label class="text-sm">Numéro de téléphone</label>
        <InputText class="text-sm" v-model="new_choffer.phone_number" :placeholder="'06xxxxxxxx'" />
        <span v-if="fieldHasErrors('phone_number')" class="text-xxs p_errors">{{ getFieldErrorMessage('phone_number')
          }}</span>
      </div>
      <Button :label="'Sauvegarder'" @click="handleSubmit" />
    </article>
  </section>
</template>

<style lang="scss" scoped>
@import '../../../../../src/assets/styles/responsive.scss';

.container {
  @include medium-screen {
    max-width: 800px;
  }
}

</style>