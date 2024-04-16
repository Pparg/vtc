import z from 'zod'

let isInRange = (value) => {
  let today = new Date()
  let reservation_date = new Date(value.date);
  let [hour, minute] = value.hour.split(':').map(Number);
  reservation_date.setHours(hour, minute, 0, 0);
  let range = new Date(today.getFullYear(), today.getMonth() + 2, today.getDate())
  return reservation_date > today && reservation_date <= range
}

let rideSchema = z.object({
  departure: z.string().min(1, {
    message: 'Veuillez saisir une addresse de départ.'
  }),
  destination: z.string().min(1, {
    message: 'Veuillez saisir une destination.'
  }),
  date: z.string(),
  hour: z.string().min(1, {
    message: 'Veuillez saisir une heure de prise en charge.'
  }),
  number_of_people: z.number().int().gte(1, {
    message: "Le nombre de passager doit etre supérieur ou égale à 1."
  }).lte(4, {
    message: "Le nombre de passager doit être inférieur à 4."
  }),
  comments: z.string().optional(),
  distance_km: z.number().positive().optional(),
  estimed_time: z.string().optional()
}).refine(value => isInRange(value), {
  message: "La date doit être dans les 2 mois à partir d'ajourd'hui.",
  path: ['date']
})

export default rideSchema