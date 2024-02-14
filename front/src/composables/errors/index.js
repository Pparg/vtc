import { ref } from "vue";

export function ErrorObject(){
  let errors = ref({})
  
  function setErrors(response) {
    let tempErrors = {}

    response.forEach(error => {
      let field = error.path[0]
      if (!tempErrors[field]) {
        tempErrors[field] = {
          message: error.message
        }
      } else {
        tempErrors[field].message += ' ' + error.message
      }
    })
    errors.value = {
      ...tempErrors
    }
  }
  
  function fieldHasErrors(field_name) {
    return errors.value[field_name] ? true : false
  }

  function getFieldErrorMessage(field_name) {
    return errors.value[field_name].message
  }

  function getErrors() {
    return errors.value
  }

  return { setErrors, fieldHasErrors, getFieldErrorMessage, getErrors}
}

