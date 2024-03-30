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
  year: z.number().int({
    message: "La date de fabrication doit être un entier."
  }).min(1960,{
    message: "Veuillez renseigner une date de fabrication valide."
  }).positive({
    message: "L'année doit etre un nombre positif."
  }).refine(value => value <= new Date().getFullYear(), {
    message: "L'année doit être inférieure ou égales à l'année actuelle."
  }),
  seats: z.number().int().gt(3, {
    message: "Le nombre de siège doit être superieur à 3."
  }).lte(10, {
    message: "Le nombre de siège ne peut pas être supérieur a 10."
  }),
  description: z.string().optional(),
  name: z.string().min(3, {
    message: "Minimun de 3 caracters."
  }).max(255, {
    message: 'Maximun de 255 caracters'
  })
})

export default carSchema