import z from 'zod'

let isInRange = (value) => {
  let today = new Date()
  let range = new Date(today.getFullYear(), today.getMonth() + 2, today.getDate())
  return new Date(value) >= today && new Date(value) < range
}

let rideSchema = z.object({
  departure: z.string().min(1, {
    message: 'Veuillez saisir une addresse de départ.'
  }),
  destination: z.string().min(1, {
    message: 'Veuillez saisir une destination.'
  }),
  date: z.string().refine((value) => isInRange(value), {
    message: "La date doit être dans les 2 mois à partir d'ajourd'hui."
  }),
  hour: z.string().min(1, {
    message: 'Veuillez saisir une date.'
  }),
  number_of_people: z.number().int().gte(1, {
    message: "Le nombre de passager doit etre supérieur ou égale à 1."
  }).lte(4, {
    message: "Le nombre de passager doit être inférieur à 4."
  }),
  comments: z.string().optional(),
  distance_km: z.number().positive().optional(),
  estimed_time: z.string().optional()
})

export default rideSchema