import addressSchema from '../../schema/addressSchema.mjs'
import carSchema from '../../schema/carSchema.mjs'
import choferSchema from '../../schema/choferSchema.mjs'
import notificationSchema from '../../schema/notificationSchema.mjs'
import rideSchema from '../../schema/rideSchema.mjs'
import userSchema from '../../schema/userSchema.mjs'
import roleSchema from '../../schema/roleSchema.mjs'
import loginSchema from '../../schema/loginSchema.mjs'
import {dayConfigSchema, weekConfigSchema, timeRangeSchema} from '../../schema/availabilitySchema.mjs'

let schemas = {
  user: userSchema,
  ride: rideSchema,
  car: carSchema,
  notification: notificationSchema,
  address: addressSchema,
  chofer: choferSchema,
  role: roleSchema,
  login: loginSchema,
  single: dayConfigSchema,
  week: weekConfigSchema,
  time_range: timeRangeSchema,
};

let validateSchema = (name, is_partial = false) => {
  return (req, res, next) => {
    try {
      let schema
      if (name === 'availability') {
        schema = schemas[req.query.type]
      } else {
        schema = schemas[name.toLowerCase()]
      }
      if (!schema) {
        res.errorResponse(500, {
          message: 'Schéma non trouvé.'
        })
      }
      let validated_data = is_partial ? schema.partial().safeParse(req.body) : schema.safeParse(req.body)
      if (validated_data.success) {
        req.data = validated_data.data
        next()
      } else {
        res.errorResponse(400, validated_data.error.errors)
      }
    } catch (error) {
      res.errorResponse(500, {
        message: 'Erreur de validation des données'
      })
    }
  }
}

export default validateSchema