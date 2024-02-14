import addressSchema from '../../schema/addressSchema.mjs'
import carSchema from '../../schema/carSchema.mjs'
import choferSchema from '../../schema/choferSchema.mjs'
import eventSchema from '../../schema/eventSchema.mjs'
import notificationSchema from '../../schema/notificationSchema.mjs'
import rideSchema from '../../schema/rideSchema.mjs'
import userSchema from '../../schema/userSchema.mjs'
import roleSchema from '../../schema/roleSchema.mjs'
import loginSchema from '../../schema/loginSchema.mjs'

let schemas = {
  user: userSchema,
  event: eventSchema,
  ride: rideSchema,
  car: carSchema,
  notification: notificationSchema,
  address: addressSchema,
  chofer: choferSchema,
  role: roleSchema,
  login: loginSchema
};

let validateSchema = (name, is_partial = false) => {
  return (req, res, next) => {
    try {
      let schema = schemas[name.toLowerCase()]
      if (!schema) {
        return res.status(500).json({
          message: 'Schéma non trouvé.'
        })
      }
      
      let validated_data = is_partial ? schema.partial().safeParse(req.body) : schema.safeParse(req.body)

      if (validated_data.success) {
        req.data = validated_data.data
        next()
      } else {
        res.status(400).json({
          message: 'Données invalides.',
          errors: validated_data.error.errors
        })
      }
    } catch (error) {
      res.status(500).json({
        message: 'Erreur de validation des données',
        error: error.message
      })
    }
  }
}

export default validateSchema