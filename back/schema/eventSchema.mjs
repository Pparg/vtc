import z from 'zod'

let eventSchema = z.object({
  chofer_id: z.number(),
  car_id: z.number(),
  address_id: z.number(),
  destination: z.string(),
  city: z.string(),
  zip_code: z.string(100),
  date_start: z.date(),
  date_end: z.date(),
  details: z.string(),
  distance_km: z.number().positive(),
  price: z.number().positive
})

export default eventSchema