import { ref } from "vue";

export function ErrorObject(){
  let errors = ref({})
  
  function setErrors(response) {
    errors.value = response
  }
  
  function fieldHasErrors(field_name) {
    return errors.value[field_name] ? true : false
  }

  function getFieldErrorMessage(field_name) {
    return errors.value[field_name]
  }

  function getErrors() {
    return errors.value
  }

  return { setErrors, fieldHasErrors, getFieldErrorMessage, getErrors}
}

