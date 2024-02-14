import z from 'zod'

let LoginSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères.'
  }).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\W_]).{8,}$/, {
    message: 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial.'
  })
})

export default LoginSchema