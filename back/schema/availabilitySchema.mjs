import { z } from "zod";


let availabilitySchema = z.object({
  date: z.string().datetime(),
  start_time: z.string().refine(value => {
    let [hour, minute] = value.split(":").map(Number)
    return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59
  }, {
    message: "L'heure est invalide."
  }),
  end_date: z.string().refine(value => {
    let [hour, minute] = value.split(":").map(Number)
    return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59
  }, {
    message: "L'heure est invalide."
  }),
})

export default availabilitySchema