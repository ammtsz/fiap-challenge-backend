import { z } from "zod"

export const updateUserDto = z.object({
  username: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  role: z.string().optional(),
})

export type UpdateUserDto = z.infer<typeof updateUserDto>
