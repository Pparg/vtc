<script setup>

  import { computed, ref } from 'vue'

  import { create as createAvailability, week_days_options, formatModel } from '@/utils/availability.js'

  import Checkbox from '@/components/Checkbox.vue';
  import InputWeek from '@/components/InputWeek.vue'
  import InputHour from '@/components/InputHour.vue';
  import Dropdown from '@/components/Dropdown.vue';

  let week_config = ref({
    week: '',
    timeSlots : [{
      start: '',
      end: ''
    }],
    except: [{
      day_position: null
    }],
    multiple: false,
    weeks: [{
      week_number: ''
    }]
  });

  let addTimeSlot = () => {
    if (week_config.value.timeSlots.length < 2) {
      week_config.value.timeSlots.push({
        start: '',
        end: '',
      })
    }
  }

  let removeTimeSlot = (index) => {
    week_config.value.timeSlots.splice(index, 1)
  };

  let addException = () => {
    if (week_config.value.except.length < 3) {
      week_config.value.except.push({
        day_position: ''
      })
    }
  }

  let removeException = (index) => {
    week_config.value.except.splice(index, 1)
  };

  let removeWeek = (index) => {
    week_config.value.weeks.splice(index, 1)
  }

  let addWeek = () => {
    week_config.value.weeks.push({
      week_number: ''
    })
  };

  let handleSubmit = async () => {
    try {
      let formated_data = formatModel(week_config.value, 'week')
      let request = await createAvailability('week', formated_data)
    } catch (error) {
      console.log(error)
    }
  };

</script>

<template>
  <aside class="mb-5">
    <Button :label="'Sauvegarder'" @click="handleSubmit"></Button>
    <div>
      <label>Semaine :</label>
      <InputWeek v-model="week_config.week" />
    </div>
    <div v-for="(time_slot, index) in week_config.timeSlots" :key="index" class="flex flex-column gap-2">
      <div class="flex align-items-center gap-2">
        <label>Début: </label>
        <InputHour v-model="time_slot.start" />
        <label>Fin: </label>
        <InputHour v-model="time_slot.end" />
      </div>
      <Button @click="removeTimeSlot(index)" :label="'Supprimer'" :type="'danger'" class="w-min" />
    </div>
    <Button :label="'Ajouter une plage horaire'" @click="addTimeSlot" v-if="week_config.timeSlots.length < 2 " class="w-max" />
    <div v-for="(exception, index) in week_config.except" :key="index">
      <div class="flex flex-column gap-2">
        <label>Jour à exclure</label>
        <div class="flex gap-2">
          <Dropdown :options="week_days_options" v-model="exception.day_position" />
          <Button @click="removeException(index)" :label="'Supprimer'" :type="'danger'" class="w-min" />
        </div>
      </div>
    </div>
    <Button @click="addException" :label="'Ajouter un jour a exclure'" class="w-max" />
    <div class="flex align-items-center gap-2">
      <Checkbox v-model="week_config.multiple" />
      <p>Appliquez cette disponibilitée à d'autres semaines</p>
    </div>
    <aside v-if="week_config.multiple" class="flex flex-column gap-2">
      <div v-for="(other_weeks, index) in week_config.weeks" :key="index" class="flex gap-2">
        <InputWeek v-model="other_weeks.week_number" />
        <Button @click="removeWeek(index)" :label="'Supprimer'" :type="'danger'" class="w-min" />
      </div>
      <Button @click="addWeek" :label="'Ajouter une semaine'" class="w-max" />
    </aside>
  </aside>
</template>

<style lang="scss" scoped>
</style>