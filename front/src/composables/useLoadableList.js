
import { ref } from "vue"
import api from "@/utils/api"

export function useLoadableList(config) {
  let store = ref([])
  let current_page = ref(1)
  let total_pages = ref(1)
  let no_results = ref(true)
  let count = ref(0)

  async function getPage() {
    try {
      let request = await api.get(`${config.api}?page=${current_page.value}&per_page=${config.per_page}${config.queries ? config.queries : ''}`)
      if (request.status === 200) {
        store.value = request.data.data
        current_page.value = request.data.current_page
        total_pages.value = request.data.total_pages
        count.value = request.data.total
        if (store.value.length > 0) {
          no_results.value = false
        } else {
          no_results.value = true
        }
      }
    } catch (error) {
      no_results.value = true
      console.log(error)
    }
  }

  let handlePrevious = () => {
    if (current_page.value > 1) {
      current_page.value --
      getPage()
    }
  }
  let handleNext = () => {
    if (current_page.value < total_pages.value) {
      current_page.value++
      getPage()
    }
  }
  let reloadData = () => {
    console.log('reload')
    getPage()
  }

  return {
    getPage,
    no_results,
    handleNext,
    handlePrevious,
    count,
    current_page,
    reloadData,
    store
  }
}
