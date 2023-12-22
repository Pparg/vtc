import z from 'zod'

let addressSchema = z.object({
  address: z.string(),
  city: z.string(),
  zip_code: z.string(50),
  country: z.string(20),
  comment: z.string()
})

export default addressSchema