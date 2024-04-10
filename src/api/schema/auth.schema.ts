import {  z } from 'zod'

const LoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'The field password must contain at least 6 characters')
})

const RegisterSchema = z.object({
  username: z.string().min(4, 'The field username must contain at least 4 characters'),
  email: z.string().email('Invalid email').min(1, 'The field email is required'),
  password: z.string().min(6, 'The field password must contain at least 6 characters'),
  confirmation: z.string().min(6, 'The field password must contain at least 6 characters')
}).required()

const ValidateLogin = (input: any) => {
  return LoginSchema.safeParse(input)
}

const ValidateRegister = (input: any) => {
  return RegisterSchema.safeParse(input)
}


export { ValidateLogin, ValidateRegister }