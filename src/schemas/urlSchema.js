import { z } from 'zod'

const UrlSchema = z.object({
  url: z.string({
    required_error: 'La URL es obligatoria',
    invalid_type_error: 'La URL debe ser una cadena de texto'
  })
    .url('La URL proporcionada no es válida')
    .max(2048, 'La URL no debe exceder los 2048 caracteres')
    .trim(),

  code: z.string({
    required_error: 'El código es obligatorio',
    invalid_type_error: 'El código debe ser una cadena de texto'
  })
    .min(3, 'El código debe tener al menos 3 caracteres')
    .max(50, 'El código no debe exceder los 50 caracteres')
    .trim()
    .toLowerCase()
    .regex(
      /^[a-z0-9-]+$/,
      'El código solo puede contener letras minúsculas, números y guiones'
    ),

  description: z.string({
    required_error: 'La descripción es obligatoria',
    invalid_type_error: 'La descripción debe ser una cadena de texto'
  })
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(500, 'La descripción no debe exceder los 500 caracteres')
    .trim()
})

export function validateUrl (object) {
  return UrlSchema.safeParse(object)
}

export function validatePartialUrl (object) {
  return UrlSchema.partial().safeParse(object)
}
