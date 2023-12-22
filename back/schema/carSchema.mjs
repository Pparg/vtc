import z from 'zod'


let carSchema = z.object({
  model: z.string(80),
  brand: z.string(60),
  year: z.number(2500).positive(),
  seats: z.number().min(3).max(10).positive(),
  description: z.string(),
  name: z.string(255)
})

export default carSchema