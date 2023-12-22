import z from 'zod'


let notificationSchema = z.object({
  title: z.string(),
  content: z.string(),
  type: z.string()
})

export default notificationSchema