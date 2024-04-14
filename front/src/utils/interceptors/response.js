import router from "@/router";

export function handleUnAuthorizeError(error) {
  if (error.response && error.response.status === 403) {
    router.push({ name: 'home_login' })
  }
  return Promise.reject(error)
}