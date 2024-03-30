import z from 'zod'


let UserSchema = z.object({
  first_name: z.string().min(3, {
    message: "Minumum de 3 caracteres."
  }).max(255, {
    message: 'Maximum de 255 caracteres.'
  }),
  last_name: z.string().min(3, {
    message: "Minumum de 3 caracters."
  }).max(255, {
    message: 'Maximum de 255 caracteres.'
  }),
  has_accepted_terms: z.boolean().refine((value) => value , {
    message: 'Vous devez accepter les termes et conditions.'
  }),
  newsletter: z.boolean().optional(),
  birthday: z.string().datetime().optional().nullable(),
  email: z.string().email({
    message: 'Email invalide.'
  }).max(255),
  phone_number: z.string().max(20).optional().nullable(),
  password: z.string().min(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères.'
  }).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\W_]).{8,}$/, {
    message: 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial.',
  })
})

export default UserSchema