export type User = {
  id: number
  name: string
  lastname: string
  email: string
  emailVerifiedAt: string
  password: string
  createdAt: string
  deletedAt: string
}

export type LoginRequest = {
  email: string
  password: string
}