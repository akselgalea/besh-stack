import { db } from "@/db/db"

const Login = async ({ email, password }: { email: string, password: string }) => {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email)
  })

  return user
}

export { Login }