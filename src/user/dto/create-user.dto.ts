import { z } from "zod"

export const CreateUserSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.string(),
})

export type CreateUserDto = z.infer<typeof CreateUserSchema>
