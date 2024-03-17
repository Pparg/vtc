import z from 'zod'


let carSchema = z.object({
  model: z.string().min(3, {
    message: "Minimum de 3 caracters."
  }).max(60, {
    message: 'Maximum de 60 caracters.'
  }),
  brand: z.string().min(3, {
    message: "Minimun de 3 caracters."
  }).max(80, {
    message: 'Maximun de 80 caracters'
  }),
  year: z.number().int().positive(),
  seats: z.number().int().gt(3),
  description: z.string().optional(),
  name: z.string().min(3, {
    message: "Minimun de 3 caracters."
  }).max(255, {
    message: 'Maximun de 255 caracters'
  })
})

export default carSchema