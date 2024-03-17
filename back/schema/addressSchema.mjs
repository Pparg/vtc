import z from 'zod'

let addressSchema = z.object({
  address: z.string(),
  city: z.string(),
  zip_code: z.string(50),
  country: z.string(20),
  comment: z.string().optional(),
  name: z.string().max(200, {
    message: 'Maximun de 200 caracters.'
  }).optional(),
  longitude: z.number(),
  latitude: z.number()
})

export default addressSchema