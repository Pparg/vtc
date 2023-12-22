import z from 'zod'

let rideSchema = z.object({
  chofer_id: z.number(),
  car_id: z.number(),
  address_id: z.number(),
  destination_id: z.string(),
  city: z.string(100),
  zip_code: z.string(20),
  date: z.date(),
  hour: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Veuillez fournir une heure valide au format HH:mm.',
  }),
  comments: z.string(),
  distance_km: z.number().positive(),
  estimated_price: z.number().positive(),
  estimed_time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Veuillez fournir une heure valide au format HH:mm.',
  })
})

export default rideSchema