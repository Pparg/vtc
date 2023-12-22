import z from 'zod'

let choferSchema = z.object({
  first_name: z.string(60),
  last_name: z.string(60),
  phone_number: z.string(20),
  description: z.string(),
  email: z.string().email().max(255)
})

export default choferSchema