<script setup>

  import { ref } from 'vue';
  
  import InputHour from '@/components/InputHour.vue';
  import Checkbox from '@/components/Checkbox.vue'
  import Calendar from '@/components/Calendar.vue';

  import { create as createAvailability, formatModel } from '@/utils/availability.js'

  let day_config = ref({
    date: '',
    timeSlots: [{
      start: '',
      end: ''
    }],
    multiple: false,
    dates: [{date: ''}]
  });

  let minDate = () => {
    let current_date = new Date()
    return current_date.toISOString().split('T')[0]
  };

  let maxDate = () => {
    let current_date = new Date()
    let max_date = new Date(current_date.getFullYear(), current_date.getMonth() + 4, 0);
    return max_date.toISOString().split('T')[0]
  };

  let addTimeSlot = () => {
    if (day_config.value.timeSlots.length < 2 ) {
      day_config.value.timeSlots.push({
        start: '',
        end: '',
      })
    }
  }

  let removeTimeSlot = (index) => {
    day_config.value.timeSlots.splice(index, 1)
  };

  let addExtraDate = () => {
    day_config.value.dates.push({
      date: ''
    })
  }

  let removeExtraDate = (index) => {
    day_config.value.dates.splice(index,1)
  };

  let handleSubmit = async () => {
    try {
      let formated_data = formatModel(day_config.value, 'single')
      let request = await createAvailability('single', formated_data)
    } catch (error) {
      console.log(error)
    }
  };

</script>

<template>
  <aside class="mb-5">
    <Button :label="'Sauvegarder'" @click="handleSubmit"></Button>
    <p class="p-0 m-0">Cette configuration prendra le dessus sur les autres configuration. Par exemple si vous avez
      configurer un mois alors les configuration prendrons le dessus</p>
    <div class="flex flex-column gap-2">
      <label>Date: </label>
      <Calendar v-model="day_config.date" :min="minDate()" :max="maxDate() " class="w-8" />
    </div>
    <div v-for="(time_slot, index) in day_config.timeSlots" :key="index" class="flex flex-column gap-2">
      <div class="flex align-items-center gap-2">
        <label>Début: </label>
        <InputHour v-model="time_slot.start" />
        <label>Fin: </label>
        <InputHour v-model="time_slot.end" />
      </div>
      <Button @click="removeTimeSlot(index)" :label="'Supprimer'" :type="'danger'" class="w-min" />
    </div>
    <Button :label="'Ajouter une plage horaire'" @click="addTimeSlot" v-if="day_config.timeSlots.length < 2" class="w-max" />
    <div class="flex align-items-center gap-2">
      <Checkbox v-model="day_config.multiple" />
      <p>Appliquez cette disponibilitée à d'autres dates</p>
    </div>
    <aside v-if="day_config.multiple">
      <div v-for="(other_date, index) in day_config.dates" :key="index" class="flex flex-column gap-2 mb-3">
        <div class="flex flex-column gap-2">
          <label>Date supplémentaire: </label>
          <div class="flex gap-2">
            <Calendar v-model="other_date.date" :min="minDate()" :max="maxDate() " class="w-min" />
            <Button @click="removeExtraDate" :label="'Supprimer'" :type="'danger'" class="w-min" />
          </div>
        </div>
      </div>
      <Button :label="'Ajouter une autre date'" @click="addExtraDate" class="w-max" />
    </aside>
  </aside>
</template>

<style lang="scss" scoped>
</style>