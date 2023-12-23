import z from 'zod'

let RoleSchema = z.object({
  name: z.string()
})

export default RoleSchema