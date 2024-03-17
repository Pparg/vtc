<script setup>

  import { ref } from 'vue';

  import { useRouter } from 'vue-router';

  import { formatDate } from '@/utils/moment';
  import { update as updateCar, get as getCar, removeCache as removeCarsCache } from '@/utils/cars'

  import { ErrorObject } from '@/composables/errors/index'

  import InputNumber from '@/components/InputNumber.vue';
  import InputText from '@/components/InputText.vue';
  import TextArea from '@/components/TextArea.vue';
  import Link from '@/components/Link.vue';
  import Icon from '@/components/Icon.vue';
  import Button from '@/components/Button.vue';
  import Card from '@/components/Card.vue';

  let props = defineProps({
    id: {
      type: Number,
      required: true
    }
  });

  let car_info = (await getCar(props.id)).data

  let { setErrors, fieldHasErrors, getFieldErrorMessage, getErrors } = ErrorObject()
  
  let router = useRouter()

  let new_car = ref({
    name: car_info.name,
    model: car_info.model,
    brand: car_info.brand,
    year: car_info.year,
    seats: car_info.seats,
    description: car_info.description
  });

  let handleSubmit = async () => {
    try {
      let add_car = await updateCar(props.id, new_car.value)
      if (add_car.status === 204) {
        removeCarsCache()
        router.push({name: 'list_of_cars'})
      }
    } catch (error) {
      setErrors(error.response.data.errors)
    }
  };

</script>

<template>
  <section class="px-3">
    <header class="mt-2">
      <Link :to="{name: 'list_of_cars'}">
        <template #content>
          <div class="flex align-items-center gap-2 cursor-pointer">
            <Icon name="arrow-left" />
            <p class="p-0 m-0 text-xs">Retour</p>
          </div>
        </template>
      </Link>
      <div class="flex align-items-center justify-content-between pr-2">
        <h2 class="text-xl">Modifier {{ car_info.name }}</h2>
        <Button :label="'Sauvegarder'" @click="handleSubmit"></Button>
      </div>
    </header>
    <article>
      <aside class="flex flex-row gap-2 my-3">
        <Card class="w-6">
          <template #content>
            <div class="flex flex-column gap-2">
              <h5 class="m-0">Date d'ajout :</h5>
              <p class="m-0 text-sm">{{ formatDate(car_info.created_at)}}</p>
            </div>
          </template>
        </Card>
        <Card class="w-6 ">
          <template #content>
            <div class="flex flex-column gap-2">
              <h5 class="m-0">Date de modification :</h5>
              <p class="m-0 text-sm">{{ formatDate(car_info.updated_at) }}</p>
            </div>
          </template>
        </Card>
      </aside>
      <fieldset class="flex flex-column border-none w-10 gap-2">
        <label class="text-sm">Nom</label>
        <InputText v-model="new_car.name"></InputText>
        <span v-if="fieldHasErrors('name')" class="text-xxs p_errors">{{ getFieldErrorMessage('name') }}</span>
        <label class="text-sm">Modele</label>
        <InputText v-model="new_car.model"></InputText>
        <span v-if="fieldHasErrors('model')" class="text-xxs p_errors">{{ getFieldErrorMessage('model') }}</span>
        <label class="text-sm">Marque</label>
        <InputText v-model="new_car.brand"></InputText>
        <span v-if="fieldHasErrors('brand')" class="text-xxs p_errors">{{ getFieldErrorMessage('brand') }}</span>
        <label class="text-sm">Année de fabrication</label>
        <InputNumber v-model="new_car.year"></InputNumber>
        <span v-if="fieldHasErrors('year')" class="text-xxs p_errors">{{ getFieldErrorMessage('year') }}</span>
        <label class="text-sm">Siege</label>
        <InputNumber v-model="new_car.seats"></InputNumber>
        <span v-if="fieldHasErrors('seats')" class="text-xxs p_errors">{{ getFieldErrorMessage('seats') }}</span>
        <label class="text-sm">Description</label>
        <TextArea v-model="new_car.description"></TextArea>
      </fieldset>
    </article>
  </section>
</template>

<style lang="scss" scoped>
</style>