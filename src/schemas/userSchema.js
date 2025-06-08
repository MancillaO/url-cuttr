import { z } from 'zod'

const UserSchema = z.object({
  username: z.string({
    required_error: 'El nombre de usuario es obligatorio',
    invalid_type_error: 'El nombre de usuario debe ser una cadena de texto'
  })
    .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
    .max(50, 'El nombre de usuario no debe exceder los 50 caracteres')
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9_]+$/, 'El nombre de usuario solo puede contener letras minúsculas, números y guiones bajos'),

  email: z.string({
    required_error: 'El correo electrónico es obligatorio',
    invalid_type_error: 'El correo electrónico debe ser una cadena de texto'
  })
    .email('El correo electrónico no es válido')
    .max(150, 'El correo electrónico no debe exceder los 150 caracteres')
    .trim(),

  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(100, 'La contraseña no debe exceder los 100 caracteres')
    .trim()

})

export function validateUser (object) {
  return UserSchema.safeParse(object)
}

export function validatePartialUser (object) {
  return UserSchema.partial().safeParse(object)
}
