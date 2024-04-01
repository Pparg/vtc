import { z } from "zod";

let isInRange = (value) => {
  let today = new Date()
  let range = new Date(today.getFullYear(), today.getMonth() + 4, today.getDate())
  return new Date(value) >= today && new Date(value) < range
}

let isBefore = (value) => {
  let startTime = new Date(`1970-01-01T${value.start}`);
  let endTime = new Date(`1970-01-01T${value.end}`);
  return startTime < endTime;
}

let isCoherent = (value) => {
  let sortedTimeSlots = value.sort((a, b) => {
    let startTimeA = new Date(`1970-01-01T${a.start}`);
    let startTimeB = new Date(`1970-01-01T${b.start}`);
    return startTimeA - startTimeB;
  });

  for (let i = 0; i < sortedTimeSlots.length - 1; i++) {
    let endTimeA = new Date(`1970-01-01T${sortedTimeSlots[i].end}`);
    let startTimeB = new Date(`1970-01-01T${sortedTimeSlots[i + 1].start}`);
    if (endTimeA >= startTimeB) {
      return false;
    }
  }

  return true;
}

let dayConfigSchema = z.object({
  date: z.string().refine((value) => isInRange(value), {
    message: "La date doit être dans les 4 mois à partir d'aujourd'hui."
  }),
  timeSlots: z.array(
    z.object({
      start: z.string(),
      end: z.string()
    }).refine((value) => isBefore(value), {
      message: "L'heure de fin doit être postérieure à l'heure de début."
    })
  ).refine((value) => isCoherent(value), {
    message: "Les plage horaires ne doivent pas se super poser."
  }),
  multiple: z.boolean(),
  dates: z.array(
    z.object({
      date: z.string().refine((value) => isInRange(value), {
        message: "La date doit être dans les 4 mois à partir d'aujourdh'ui."
      })
    })
  ).optional()
})

let weekConfigSchema = z.object({
  week: z.string(),
  timeSlots: z.array(
    z.object({
      start: z.string(),
      end: z.string()
    }).refine((value) => isBefore(value), {
      message: "L'heure de fin doit être postérieure à l'heure de début."
    })
  ).refine((value) => isCoherent(value), {
    message: "Les plage horaires ne doivent pas se super poser."
  }),
  except: z.array(
    z.object({
      day_position: z.number().nullable()
    })
  ).optional(),
  multiple: z.boolean(),
  weeks: z.array(
    z.object({
      week_number: z.string()
    })
  ).optional()
})

export {weekConfigSchema, dayConfigSchema}