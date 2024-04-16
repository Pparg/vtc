import z from 'zod'


let notificationSchema = z.object({
  title: z.string().min(1, {
    message: "Veuillez remplir ce champs."
  }),
  content: z.string().min(1, {
    message: "Veuillez remplir ce champs."
  }),
  type: z.string().min(1, {
    message: "Veuillez selectionnez le type de la notification."
  }),
  publication_date: z.string().datetime({
    message: 'Veuillez remplir ce champs.'
  })
})

export default notificationSchema