import z from 'zod'

let choferSchema = z.object({
  first_name: z.string().min(3, {
    message: "Minimum de 3 caracteres."
  }).max(60, {
    message: 'Maximun de 60 caracteres.'
  }),
  last_name: z.string().min(3, {
    message: "Minimum de 3 caracteres."
  }).max(60, {
    message: 'Maximun de 60 caracteres.'
  }),
  phone_number: z.string().min(10, {
    message: "Numero invalide."
  }).max(20, {
    message: "Numero invalide."
  }),
  description: z.string().optional().nullable(),
  email: z.string().email({
    message: "Email invalide."
  }).max(255),
  description: z.string().optional(),
  password: z.string().min(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères.'
  }).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\W_]).{8,}$/, {
    message: 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial.',
  })
})

export default choferSchema