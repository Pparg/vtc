import z from 'zod'


let UserSchema = z.object({
  first_name: z.string().min(3, {
    message: "Minumum de 3 caracters."
  }).max(255, {
    message: 'Maximum de 255 caracters.'
  }),
  last_name: z.string().min(3, {
    message: "Minumum de 3 caracters."
  }).max(255, {
    message: 'Maximum de 255 caracters.'
  }),
  has_accepted_terms: z.boolean().optional(),
  newsletter: z.boolean().optional(),
  birthday: z.date().optional(),
  email: z.string().email().max(255),
  phone_number: z.string().max(20).optional(),
  password: z.string().min(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères.'
  }).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\W_]).{8,}$/, {
    message: 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial.',
  })
})